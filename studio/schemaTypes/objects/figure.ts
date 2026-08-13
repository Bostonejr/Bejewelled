import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

import {ALT_TEXT, COPY, IMAGE_OPTIONS} from '../brandCopy'

/**
 * A photograph with the two strings that always travel with it.
 *
 * Captions in this design sit BELOW the frame in mono --text-muted, never over
 * the image — see docs/PLAN.md gap #06.
 */
export const figure = defineType({
  name: 'figure',
  title: 'Photograph',
  type: 'image',
  icon: ImageIcon,
  options: IMAGE_OPTIONS,
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: ALT_TEXT,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: `Optional. Printed below the frame in small uppercase mono. ${COPY}`,
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    select: {media: 'asset', title: 'alt', subtitle: 'caption'},
  },
})
