import {SplitVerticalIcon} from '@sanity/icons/SplitVertical'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * One row of the two-column table on Construction — the conventional chain on
 * the left in --text-muted, the Bejewelled way on the right on a --paper-050
 * ground. Below 768px the pair stacks into labelled halves rather than
 * squeezing two columns onto a phone (gap #01).
 */
export const comparisonRow = defineType({
  name: 'comparisonRow',
  title: 'Comparison row',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: 'conventional',
      title: 'The conventional chain',
      type: 'text',
      rows: 2,
      description: `What normally happens when design, engineering and construction sit with separate firms. ${COPY}`,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'bejewelled',
      title: 'The Bejewelled way',
      type: 'text',
      rows: 2,
      description: `The answering statement. Keep the two roughly the same length — they sit side by side. ${COPY}`,
      validation: (rule) => rule.required().max(240),
    }),
  ],
  preview: {
    select: {title: 'bejewelled', subtitle: 'conventional'},
  },
})
