import {createClient} from '@sanity/client'
import {LexoRank} from 'lexorank'

/**
 * Shared plumbing for the seed scripts.
 *
 * Run them with `npm run seed:content` / `npm run seed:projects` from the repo
 * root — those pass `--env-file=.env`, which is where the write token lives.
 * The token is never read by the apps; only these scripts touch it.
 */

const {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_WRITE_TOKEN} = process.env

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_WRITE_TOKEN) {
  console.error(
    'Missing Sanity credentials. Expected SANITY_PROJECT_ID, SANITY_DATASET and\n' +
      'SANITY_API_WRITE_TOKEN in .env at the repo root. Run these scripts through\n' +
      'npm (npm run seed:content), which passes --env-file=.env for you.',
  )
  process.exit(1)
}

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_WRITE_TOKEN,
  apiVersion: '2026-02-01',
  useCdn: false,
})

/**
 * Order ranks in the format @sanity/orderable-document-list expects.
 *
 * Two genNext() steps per document, exactly as the plugin's own "reset order"
 * routine does it, so a rank seeded here and a rank the Studio writes after a
 * drag sort against each other correctly.
 */
export function orderRanks(count) {
  const ranks = []
  let rank = LexoRank.min()
  for (let i = 0; i < count; i++) {
    rank = rank.genNext().genNext()
    ranks.push(rank.toString())
  }
  return ranks
}

/** `01`, `02`, … — the brand's numbering, never stored, always derived. */
export const twoDigit = (index) => String(index + 1).padStart(2, '0')

export function summarise(label, results) {
  const created = results.filter((r) => r.created).length
  const updated = results.length - created
  console.log(
    `  ${label}: ${results.length} (${created} created, ${updated} already present)`,
  )
}
