import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

import {
  ALT_TEXT,
  COPY,
  EYEBROW,
  IMAGE_OPTIONS,
  NUMBERING,
  altRequiredWithImage,
} from '../brandCopy'
import {singletonPreview} from '../parts'

/**
 * The home page, section by section, in the order the design lays them out:
 * split hero → credential strip (from Site settings) → About Us with the
 * practice record → the blue disciplines band → Selected Works → Leadership.
 *
 * Sections are nested objects rather than flat prefixed fields so the Studio
 * form reads like the page and the GROQ query reads like the design.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'About & record'},
    {name: 'disciplines', title: 'Disciplines'},
    {name: 'works', title: 'Selected works'},
    {name: 'leadership', title: 'Leadership'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: EYEBROW,
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Heading',
          description: `The largest type on the site — it scales between 52 and 88px. Four words or fewer. ${COPY}`,
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 4,
          description: `The paragraph under the heading, capped at 54 characters a line by the design. ${COPY}`,
          validation: (rule) => rule.required().max(500),
        }),
        defineField({
          name: 'ctas',
          type: 'array',
          title: 'Buttons',
          of: [{type: 'cta'}],
          description:
            'Two at most. The first is solid ink, the second outlined — that pairing is the design, not a choice made here.',
          validation: (rule) => rule.max(2),
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Hero photograph',
          options: IMAGE_OPTIONS,
          description:
            'Fills the right half of the screen at a minimum of 640px tall. A completed building in warm natural daylight, three-quarter view. Until one is supplied the column renders as a plain plate.',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: ALT_TEXT,
              validation: (rule) => rule.max(160).custom(altRequiredWithImage),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'about',
      title: 'About us',
      type: 'object',
      group: 'about',
      fields: [
        defineField({
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: EYEBROW,
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'statement',
          type: 'text',
          title: 'Statement',
          rows: 4,
          description: `Set large in the display serif above the 56px rule — the practice's philosophy in one sentence. ${COPY}`,
          validation: (rule) => rule.required().max(400),
        }),
        defineField({
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 5,
          description: `The supporting paragraph below the rule. ${COPY}`,
          validation: (rule) => rule.required().max(700),
        }),
        defineField({name: 'cta', type: 'cta', title: 'Button'}),
        defineField({
          name: 'recordLabel',
          type: 'string',
          title: 'Record heading',
          initialValue: 'Practice record',
          description: 'The small label above the figures.',
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'stats',
          type: 'array',
          title: 'Practice record',
          of: [{type: 'statItem'}],
          description:
            'Laid out in two columns. Four reads best. Keep these honest against the portfolio below.',
          validation: (rule) => rule.required().min(2).max(6),
        }),
      ],
    }),

    defineField({
      name: 'disciplines',
      title: 'Disciplines band',
      type: 'object',
      group: 'disciplines',
      description: 'The deep blue band. Blue is a field colour here, never interactive.',
      fields: [
        defineField({
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: `${EYEBROW} Rendered in gold-200 on this band — the mid golds miss contrast at 12px on blue.`,
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
          name: 'intro',
          type: 'text',
          title: 'Introduction',
          rows: 3,
          description: COPY,
          validation: (rule) => rule.required().max(400),
        }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Disciplines',
          of: [{type: 'numberedItem'}],
          description: NUMBERING,
          validation: (rule) => rule.required().min(2).max(6),
        }),
        defineField({name: 'cta', type: 'cta', title: 'Button'}),
        defineField({
          name: 'secondaryLink',
          type: 'cta',
          title: 'Secondary link',
          description: 'Rendered as an underlined link beside the button, not a second button.',
        }),
      ],
    }),

    defineField({
      name: 'works',
      title: 'Selected works',
      type: 'object',
      group: 'works',
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
          name: 'linkLabel',
          type: 'string',
          title: 'Link to the full portfolio',
          description:
            'The small gold link on the right of the rule. If it quotes a number of projects, keep that number true.',
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'featuredProjects',
          type: 'array',
          title: 'Featured projects',
          of: [{type: 'reference', to: [{type: 'project'}]}],
          description:
            'Three cards. Left empty, the first three projects in portfolio order are shown instead.',
          validation: (rule) => rule.max(3).unique(),
        }),
      ],
    }),

    defineField({
      name: 'leadership',
      title: 'Leadership',
      type: 'object',
      group: 'leadership',
      fields: [
        defineField({
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: EYEBROW,
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: 'roleLine',
          type: 'string',
          title: 'Role line',
          description:
            'Set in mono beneath the name — "Architect, AGIA · Principal Architect".',
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: 'bio',
          type: 'text',
          title: 'Biography',
          rows: 5,
          description: COPY,
          validation: (rule) => rule.required().max(700),
        }),
        defineField({
          name: 'portrait',
          type: 'image',
          title: 'Portrait',
          options: IMAGE_OPTIONS,
          description:
            'On site or in the studio, 520px tall. There is no substitute for this one — until it is supplied the section renders without its image column rather than with a placeholder.',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: ALT_TEXT,
              validation: (rule) => rule.max(160).custom(altRequiredWithImage),
            }),
          ],
        }),
        defineField({
          name: 'credentials',
          type: 'array',
          title: 'Credentials',
          of: [{type: 'fieldRow'}],
          description: 'Label and value on hairlines — registrations and classifications.',
          validation: (rule) => rule.required().min(1).max(8),
        }),
      ],
    }),

    defineField({name: 'seo', title: 'Search & social', type: 'seo', group: 'meta'}),
  ],

  preview: singletonPreview('Home page'),
})
