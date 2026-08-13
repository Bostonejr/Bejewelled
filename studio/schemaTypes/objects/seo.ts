import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

import {COPY, IMAGE_OPTIONS} from '../brandCopy'

/**
 * Per-page search and social metadata. Every field is optional: left blank,
 * the page falls back to its own heading and intro, then to the defaults in
 * Site settings.
 */
export const seo = defineType({
  name: 'seo',
  title: 'Search & social',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Search title',
      type: 'string',
      description: `Overrides the page heading in search results and browser tabs. Aim for under 60 characters. ${COPY}`,
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'description',
      title: 'Search description',
      type: 'text',
      rows: 3,
      description: `One or two sentences, 150 to 160 characters. ${COPY}`,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Sharing image',
      type: 'image',
      options: IMAGE_OPTIONS,
      description:
        'Shown when the page is shared on social media or messaging apps. Landscape, at least 1200 × 630.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description: 'Leave off unless the page is deliberately unlisted.',
    }),
  ],
})
