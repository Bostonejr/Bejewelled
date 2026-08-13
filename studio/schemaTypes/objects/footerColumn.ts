import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * One column of the ink footer — a gold-200 uppercase heading over a stack of
 * labels. The logo column and the registered-office column are built from
 * their own fields in Site settings; these are the two in between.
 *
 * The heading is gold-200 rather than a mid gold because it sits on an ink
 * field: the mid golds miss 4.5:1 at 12px.
 */
export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer column',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Column heading',
      type: 'string',
      description: `One word if possible — "Practice", "Disciplines". ${COPY}`,
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'linkItem'}],
      validation: (rule) => rule.required().min(1).max(8),
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items'},
    prepare: ({title, items}) => ({
      title,
      subtitle: `${items?.length ?? 0} item${items?.length === 1 ? '' : 's'}`,
    }),
  },
})
