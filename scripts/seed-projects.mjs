/**
 * Uploads `Project Images/` into Sanity and creates the portfolio records.
 *
 *   npm run seed:projects              safe to re-run — leaves existing documents alone
 *   npm run seed:projects -- --force   rewrites the documents (assets are always reused)
 *   npm run seed:projects -- --dry-run lists what it would do and uploads nothing
 *
 * Two kinds of record are created, and the difference matters:
 *
 *   · PHOTOGRAPHED — one per folder in `Project Images/`. The photographs are
 *     uploaded and attached. Only Komfo Anokye Teaching Hospital Credit Union
 *     also appears in the company profile, so only it gets a scope, location,
 *     sector and commission note, and only it is published. The other four are
 *     created as DRAFTS with their photographs and nothing else: their scope of
 *     works, location and sector are facts this repository does not contain,
 *     and inventing them would put fiction on a tender-facing website. The
 *     Studio will show each as invalid until those fields are filled in, which
 *     is the correct signal.
 *
 *   · PROFILE-ONLY — the six projects listed in the company profile that have
 *     no photographs. Created as DRAFTS, complete except for images, ready to
 *     publish the moment a photograph arrives. This is the option chosen in
 *     docs/PLAN.md §9.15(c).
 *
 * Assets are deduplicated by Sanity on upload, so re-running never creates a
 * second copy of the same photograph.
 */

import {createReadStream} from 'node:fs'
import {readdir, stat} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {client, orderRanks, summarise} from './lib/sanity.mjs'

const force = process.argv.includes('--force')
const dryRun = process.argv.includes('--dry-run')

const IMAGES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'Project Images',
)

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff'])

/**
 * The only photographed folder that also appears in the company profile.
 * Everything here is transcribed from `.design-src/Bejewelled Website.dc.html`.
 */
const PHOTOGRAPHED_METADATA = {
  'Komfo Anokye Teaching Hospital (KATH) Credit Union': {
    client: 'Komfo Anokye Teaching Hospital Credit Union',
    scopeOfWorks: 'Office complex including a banking hall',
    location: 'Bantama, Kumasi',
    sector: 'commercial',
    status: 'Completed',
    note: 'An office complex incorporating a banking hall for the Komfo Anokye Teaching Hospital Credit Union at Bantama, Kumasi. The works are complete and handed over.',
  },
}

/**
 * The six profile projects with no photographs, transcribed from the design
 * file's PROJECTS array minus the KATH record above.
 */
const PROFILE_ONLY = [
  {
    title: 'State Housing Company Limited',
    client: 'State Housing Company Limited',
    scopeOfWorks: 'Construction of 16 No. Town Houses',
    location: 'Osu, Accra',
    sector: 'residential',
    status: 'Completed',
    note: 'A residential commission of sixteen town houses for State Housing Company Limited, delivered at Osu, Accra. The works are complete and handed over.',
  },
  {
    title: 'Word of Faith Outreach Center',
    client: 'Word of Faith Outreach Center',
    scopeOfWorks: 'Pre-school block',
    location: 'Daban, Kumasi',
    sector: 'educational',
    status: 'Completed',
    note: 'A pre-school block for the Word of Faith Outreach Center at Daban, Kumasi. The works are complete and handed over.',
  },
  {
    title: 'Presbyterian University Ghana',
    client: 'Presbyterian University Ghana',
    scopeOfWorks: 'Renovation and extension of a three-storey lecture block',
    location: 'Kumasi City Campus',
    sector: 'educational',
    status: 'Completed',
    note: 'Renovation and extension of a three-storey lecture block for Presbyterian University Ghana at the Kumasi City Campus. The works are complete and handed over.',
  },
  {
    title: 'Hadsbak Enterprise',
    client: 'Hadsbak Enterprise',
    scopeOfWorks: 'Factory and office space',
    location: 'Nwamase, Kumasi',
    sector: 'industrial',
    status: 'Completed',
    note: 'Factory and office space for Hadsbak Enterprise at Nwamase, Kumasi. The works are complete and handed over.',
  },
  {
    title: 'La Petite Chemist',
    client: 'La Petite Chemist',
    scopeOfWorks: 'Pharmacy building',
    location: 'Ahodwo, Kumasi',
    sector: 'commercial',
    status: 'Completed',
    note: 'A pharmacy building for La Petite Chemist at Ahodwo, Kumasi. The works are complete and handed over.',
  },
  {
    title: 'Signetcare Medical Services',
    client: 'Signetcare Medical Services',
    scopeOfWorks: 'Clinic extension',
    location: 'Asokwa, Kumasi',
    sector: 'healthcare',
    status: 'Completed',
    note: 'A clinic extension for Signetcare Medical Services at Asokwa, Kumasi. The works are complete and handed over.',
  },
]

/* --------------------------------------------------------------- helpers */

/** "Komfo Anokye Teaching Hospital (KATH) Credit Union" → "komfo-anokye-…-union" */
const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Natural order, so "Img_6" sorts before "Img_10". */
const naturally = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})

/**
 * The primary photograph, matched case-insensitively.
 * Four folders name it `main.jpg`; `Agogo Makro` uses `Main.jpg`.
 */
const isMain = (filename) => /^main\./i.test(filename)

async function readFolder(folderName) {
  const dir = path.join(IMAGES_DIR, folderName)
  const entries = await readdir(dir)

  const images = entries
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort(naturally.compare)

  return {
    dir,
    main: images.find(isMain) ?? null,
    gallery: images.filter((name) => !isMain(name)),
  }
}

const assetCache = new Map()

async function uploadImage(dir, filename) {
  const filePath = path.join(dir, filename)
  if (assetCache.has(filePath)) return assetCache.get(filePath)

  if (dryRun) {
    const {size} = await stat(filePath)
    console.log(`    would upload ${filename} (${(size / 1024 / 1024).toFixed(1)} MB)`)
    return {_id: `dry-run-${slugify(filename)}`}
  }

  // Sanity hashes the bytes and returns the existing asset if it has seen them
  // before, so this is idempotent without a manifest of our own.
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  })
  assetCache.set(filePath, asset)
  return asset
}

const imageValue = (assetId, alt) => ({
  _type: 'image',
  asset: {_type: 'reference', _ref: assetId},
  alt,
})

async function upsert(doc) {
  if (dryRun) return {id: doc._id, created: true}
  const existing = await client.getDocument(doc._id)
  if (existing && !force) return {id: doc._id, created: false}
  await client.createOrReplace(doc)
  return {id: doc._id, created: !existing}
}

/* ------------------------------------------------------------------- run */

async function main() {
  console.log(
    `Seeding projects into ${client.config().projectId}/${client.config().dataset}` +
      (dryRun ? '  [--dry-run: nothing will be written]' : '') +
      (force ? '  [--force: existing documents will be overwritten]' : ''),
  )

  const folders = (await readdir(IMAGES_DIR, {withFileTypes: true}))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(naturally.compare)

  const ranks = orderRanks(folders.length + PROFILE_ONLY.length)
  const results = []
  const needsFacts = []
  let rankIndex = 0

  for (const folderName of folders) {
    const {dir, main, gallery} = await readFolder(folderName)
    const slug = slugify(folderName)
    const metadata = PHOTOGRAPHED_METADATA[folderName]

    console.log(
      `\n  ${folderName}` +
        `\n    ${main ? '1 primary' : 'NO PRIMARY IMAGE'} + ${gallery.length} further photograph(s)`,
    )

    const mainAsset = main ? await uploadImage(dir, main) : null
    const galleryAssets = []
    for (const filename of gallery) {
      galleryAssets.push({filename, asset: await uploadImage(dir, filename)})
    }

    /**
     * Alt text is seeded with the project's own name, which is true of every
     * one of these photographs and better than nothing, but it is not a
     * description. Reported at the end for review in the Studio.
     */
    const altBase = metadata?.client ?? folderName

    const doc = {
      // Unknown facts stay absent rather than guessed. A published record on a
      // tender-facing site has to be true.
      _id: metadata ? `project-${slug}` : `drafts.project-${slug}`,
      _type: 'project',
      title: folderName,
      slug: {_type: 'slug', current: slug},
      orderRank: ranks[rankIndex++],
      ...(mainAsset ? {mainImage: imageValue(mainAsset._id, altBase)} : {}),
      ...(galleryAssets.length
        ? {
            gallery: galleryAssets.map(({filename, asset}) => ({
              _key: slugify(filename),
              ...imageValue(asset._id, altBase),
              _type: 'figure',
            })),
          }
        : {}),
      ...(metadata
        ? {
            client: metadata.client,
            scopeOfWorks: metadata.scopeOfWorks,
            location: metadata.location,
            sector: {_type: 'reference', _ref: `sector-${metadata.sector}`},
            status: metadata.status,
            note: metadata.note,
          }
        : {}),
    }

    if (!metadata) needsFacts.push(folderName)
    results.push(await upsert(doc))
  }

  console.log('')
  for (const project of PROFILE_ONLY) {
    const slug = slugify(project.title)
    results.push(
      await upsert({
        _id: `drafts.project-${slug}`,
        _type: 'project',
        title: project.title,
        slug: {_type: 'slug', current: slug},
        client: project.client,
        scopeOfWorks: project.scopeOfWorks,
        location: project.location,
        sector: {_type: 'reference', _ref: `sector-${project.sector}`},
        status: project.status,
        note: project.note,
        orderRank: ranks[rankIndex++],
      }),
    )
  }

  console.log('')
  summarise('projects', results)

  console.log(
    '\nBefore these appear on the site, in the Studio:' +
      `\n  · ${needsFacts.length} photographed project(s) are drafts with no scope of works,` +
      '\n    location or sector — those facts are not in this repository and were not' +
      '\n    invented. Fill them in and publish:' +
      needsFacts.map((name) => `\n      – ${name}`).join('') +
      `\n  · ${PROFILE_ONLY.length} profile-only project(s) are drafts awaiting photographs.` +
      '\n  · Alt text on every uploaded photograph is currently the project name.' +
      '\n    Replace it with a description of what the photograph actually shows.' +
      '\n  · Two folder names read as misspellings — "Dekyi Appartments Gazebo" and' +
      '\n    "Agogo Makro". They were seeded verbatim; correcting the title in the' +
      '\n    Studio is safe, because the slug is pinned and the URL will not change.',
  )
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
