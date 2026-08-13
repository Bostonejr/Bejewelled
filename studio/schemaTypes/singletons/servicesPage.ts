import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

import {COPY, EYEBROW, NUMBERING} from '../brandCopy'
import {pageHeaderFields, singletonPreview} from '../parts'

/**
 * Services — header, three discipline blocks, the blue band pointing at
 * Construction, and the sector cards.
 *
 * "Sheet 02 / 05" is derived from the route, not stored.
 */
export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'services', title: 'Services'},
    {name: 'construction', title: 'Construction band'},
    {name: 'sectors', title: 'Sectors'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    ...pageHeaderFields({group: 'header', titleMax: 90}),

    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      of: [{type: 'serviceBlock'}],
      description: NUMBERING,
      validation: (rule) => rule.required().min(1).max(6),
    }),

    defineField({
      name: 'constructionBand',
      title: 'Construction band',
      type: 'object',
      group: 'construction',
      description:
        'The deep blue band. Construction is the fourth discipline but has a page of its own, because it is the part clients ask about most.',
      fields: [
        defineField({
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: `${EYEBROW} In the design this reads "Discipline 04" — if you reorder the services above, check it still agrees with them.`,
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Heading',
          description: COPY,
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 4,
          description: COPY,
          validation: (rule) => rule.required().max(500),
        }),
        defineField({name: 'cta', type: 'cta', title: 'Button'}),
      ],
    }),

    defineField({
      name: 'sectorsBlock',
      title: 'Sectors',
      type: 'object',
      group: 'sectors',
      fields: [
        defineField({
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: EYEBROW,
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Heading',
          description: COPY,
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Sector cards',
          of: [{type: 'numberedItem'}],
          description: `${NUMBERING} These are the marketing cards on this page. The filter chips on the Designs page come from the Sectors list in the sidebar instead — the two are separate on purpose.`,
          validation: (rule) => rule.required().min(2).max(8),
        }),
      ],
    }),

    defineField({name: 'seo', title: 'Search & social', type: 'seo', group: 'meta'}),
  ],

  preview: singletonPreview('Services page'),
})
