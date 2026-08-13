import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

import {COPY, NUMBERING} from '../brandCopy'

/**
 * One of the three discipline blocks on the Services page: a 3px gold top
 * rule, the derived number, an h2, a mono tag, a paragraph and a bulleted list
 * on hairlines.
 *
 * No number field — see docs/PLAN.md §5.4.
 */
export const serviceBlock = defineType({
  name: 'serviceBlock',
  title: 'Service',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: `${NUMBERING} ${COPY}`,
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: `The short mono line under the title — "Concept · Documentation", "Structural · Buildability". Separate terms with a middle dot. ${COPY}`,
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: COPY,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: 'items',
      title: 'What it covers',
      type: 'array',
      of: [{type: 'string'}],
      description: `The bulleted list beneath the description. One line each, no full stops. ${COPY}`,
      validation: (rule) => rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'tag'},
  },
})
