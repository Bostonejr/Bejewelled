import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * One cell of the practice record on Home — "30+ / Completed projects".
 *
 * Gap #04 in docs/PLAN.md: these were hardcoded in the design, which is how a
 * site ends up claiming thirty projects while showing five. They are fields
 * now, so the claim and the portfolio can be kept honest with each other.
 */
export const statItem = defineType({
  name: 'statItem',
  title: 'Statistic',
  type: 'object',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Figure',
      type: 'string',
      description:
        'Set in the display serif at 32px — "30+", "20+", "4", "2013". Keep it to a few characters.',
      validation: (rule) => rule.required().max(8),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: `Set in small uppercase mono beneath the figure. ${COPY}`,
      validation: (rule) => rule.required().max(40),
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
