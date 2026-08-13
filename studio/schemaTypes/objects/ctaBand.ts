import {RocketIcon} from '@sanity/icons/Rocket'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * The closing band that ends every screen except Contact — heading, a line of
 * address and telephone, and one large primary button. Edited once in Site
 * settings and rendered on five pages.
 */
export const ctaBand = defineType({
  name: 'ctaBand',
  title: 'Closing call to action',
  type: 'object',
  icon: RocketIcon,
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: COPY,
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'body',
      title: 'Supporting line',
      type: 'string',
      description: `The address and telephone line beneath the heading. ${COPY}`,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'cta',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'body'},
  },
})
