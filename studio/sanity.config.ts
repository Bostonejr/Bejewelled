import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {SINGLETON_TYPES, schemaTypes} from './schemaTypes'
import {structure} from './structure'

/**
 * Where the Presentation tool loads the site from. Set
 * SANITY_STUDIO_PREVIEW_URL to the deployed origin before running
 * `sanity deploy`, or the deployed Studio will try to preview localhost.
 */
const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000'

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
