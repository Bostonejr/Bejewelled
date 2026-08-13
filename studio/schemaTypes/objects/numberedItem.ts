import {NumberIcon} from '@sanity/icons/Number'
import {defineField, defineType} from 'sanity'

import {COPY, NUMBERING} from '../brandCopy'

/**
 * The workhorse of this design: a two-digit number, a title, a paragraph. It
 * carries the four disciplines on Home, the four construction stages, the six
 * capability rows and the sector cards on Services.
 *
 * There is deliberately no number field — see docs/PLAN.md §5.4. The number is
 * `String(index + 1).padStart(2, '0')` at render time, so reordering the array
 * renumbers everything below it.
 */
export const numberedItem = defineType({
  name: 'numberedItem',
  title: 'Numbered item',
  type: 'object',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: `${NUMBERING} ${COPY}`,
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: COPY,
      validation: (rule) => rule.required().max(400),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'body'},
  },
})
