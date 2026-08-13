import {StackIcon} from '@sanity/icons/Stack'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * A label/value pair on a hairline — the drawing-record device the design uses
 * for the leadership credentials on Home and the contact details on Contact.
 * The label is small uppercase mono; the value is body copy.
 */
export const fieldRow = defineType({
  name: 'fieldRow',
  title: 'Record row',
  type: 'object',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: `Set in small uppercase mono — "Certificate of registration", "Digital address". ${COPY}`,
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'text',
      rows: 2,
      description: `Line breaks are preserved, so a postal address can sit across two lines. ${COPY}`,
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
