import {defineField} from 'sanity'

import {COPY, EYEBROW} from './brandCopy'

/**
 * The masthead every inner page opens with: an eyebrow, an h1, and a rule.
 * Services, Construction, Designs and Contact all use it, so it is defined
 * once here rather than transcribed four times.
 *
 * The "Sheet 02 / 05" marker to the right of the heading is deliberately not a
 * field — it is derived from the route, like the number in the sheet rail.
 */
export function pageHeaderFields(options: {
  group?: string
  titleMax?: number
  intro?: boolean
} = {}) {
  const {group, titleMax = 90, intro = true} = options

  const fields = [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group,
      description: EYEBROW,
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      group,
      description: `The h1. Set in the display serif — keep it short enough to hold its line. ${COPY}`,
      validation: (rule) => rule.required().max(titleMax),
    }),
  ]

  if (!intro) return fields

  return [
    ...fields,
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      group,
      rows: 4,
      description: `The large paragraph beneath the rule. ${COPY}`,
      validation: (rule) => rule.required().max(800),
    }),
  ]
}

/** A singleton never needs a title field, but the Studio list wants one. */
export function singletonPreview(title: string) {
  return {
    select: {},
    prepare: () => ({title}),
  }
}
