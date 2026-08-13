import {WrenchIcon} from '@sanity/icons/Wrench'
import {defineField, defineType} from 'sanity'

import {
  ALT_TEXT,
  COPY,
  EYEBROW,
  IMAGE_OPTIONS,
  NUMBERING,
  altRequiredWithImage,
} from '../brandCopy'
import {pageHeaderFields, singletonPreview} from '../parts'

/**
 * Construction — header, a full-width site photograph, the four stages on the
 * blue band, the two-column comparison table, and the capability list.
 */
export const constructionPage = defineType({
  name: 'constructionPage',
  title: 'Construction page',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'stages', title: 'Stages'},
    {name: 'comparison', title: 'Comparison'},
    {name: 'capability', title: 'Capability'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    ...pageHeaderFields({group: 'header', titleMax: 80}),

    defineField({
      name: 'heroImage',
      title: 'Site photograph',
      type: 'image',
      group: 'header',
      options: IMAGE_OPTIONS,
      description:
        'Works in progress under supervision, natural daylight. Runs the full width of the column at 520px tall.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: ALT_TEXT,
          validation: (rule) => rule.max(160).custom(altRequiredWithImage),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description:
            'Printed below the frame in small uppercase mono — "Site works under supervision · Kumasi".',
          validation: (rule) => rule.max(120),
        }),
      ],
    }),

    defineField({
      name: 'stagesBlock',
      title: 'Stages',
      type: 'object',
      group: 'stages',
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
          title: 'Stages',
          of: [{type: 'numberedItem'}],
          description: `${NUMBERING} Each carries a 3px gold top rule.`,
          validation: (rule) => rule.required().min(2).max(8),
        }),
      ],
    }),

    defineField({
      name: 'comparison',
      title: 'The difference on site',
      type: 'object',
      group: 'comparison',
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
          name: 'leftLabel',
          type: 'string',
          title: 'Left column heading',
          initialValue: 'The conventional chain',
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'rightLabel',
          type: 'string',
          title: 'Right column heading',
          initialValue: 'The Bejewelled way',
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [{type: 'comparisonRow'}],
          validation: (rule) => rule.required().min(1).max(10),
        }),
      ],
    }),

    defineField({
      name: 'capability',
      title: 'What we take on',
      type: 'object',
      group: 'capability',
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
          name: 'note',
          type: 'text',
          title: 'Note',
          rows: 3,
          description: `The small paragraph beside the heading — classification and registrations. ${COPY}`,
          validation: (rule) => rule.required().max(300),
        }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Capabilities',
          of: [{type: 'numberedItem'}],
          description: NUMBERING,
          validation: (rule) => rule.required().min(2).max(12),
        }),
      ],
    }),

    defineField({name: 'seo', title: 'Search & social', type: 'seo', group: 'meta'}),
  ],

  preview: singletonPreview('Construction page'),
})
