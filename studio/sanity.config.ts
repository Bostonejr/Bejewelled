import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {SINGLETON_TYPES, schemaTypes} from './schemaTypes'
import {structure} from './structure'

/**
 * Where the Presentation tool loads the site from.
 *
 * This used to default to localhost and rely on SANITY_STUDIO_PREVIEW_URL
 * being set before `sanity deploy`. It never was, and the first deployed
 * Studio previewed http://localhost:3000 — blank for everyone but a developer
 * with the dev server running. A remembered environment variable is the wrong
 * mechanism for something that breaks silently and only for other people.
 *
 * `sanity dev` builds with NODE_ENV=development and previews the local site;
 * `sanity build`/`sanity deploy` build for production and preview the live
 * one. SANITY_STUDIO_PREVIEW_URL still overrides both, for previewing against
 * a branch deploy.
 */
const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://bejewelledbuild.com'
    : 'http://localhost:3000')

export default defineConfig({
  name: 'default',
  title: 'Bejewelled',

  projectId: '0xf46qxf',
  dataset: 'production',

  plugins: [
    structureTool({structure}),

    /**
     * Live preview with click-to-edit. Ten of the eleven project records are
     * drafts, so being able to see one before publishing it is not a luxury
     * here — it is how the practice checks a record reads correctly with its
     * photographs in place.
     */
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        preview: '/',
        previewMode: {enable: '/api/draft-mode/enable'},
      },
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    /**
     * Singletons are reachable only through their pinned sidebar entries, so
     * they are removed from the "create new document" menu. Without this an
     * editor can make a second Home page that nothing renders.
     */
    templates: (prev) =>
      prev.filter((template) => !SINGLETON_TYPES.has(template.schemaType)),
  },

  document: {
    /**
     * A singleton cannot be created, duplicated or deleted — only edited,
     * published and reverted. Deleting one would take a whole page's copy with
     * it and leave the route rendering nothing.
     */
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({action}) =>
            ['publish', 'discardChanges', 'restore'].includes(action ?? ''),
          )
        : prev,
  },
})
