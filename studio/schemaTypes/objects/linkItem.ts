import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * A label with an optional destination. Used for the header nav (where the
 * destination is required, enforced at the field that holds the array) and for
 * the footer columns, where the Disciplines column is a list of plain words
 * rather than links — exactly as the design renders it.
 */
export const linkItem = defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: COPY,
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Links to',
      type: 'string',
      description:
        'Leave blank to render as plain text rather than a link. Otherwise an internal path starting with / or a full https:// address.',
      validation: (rule) =>
        rule.custom((value) =>
          !value ||
          (typeof value === 'string' &&
            (value.startsWith('/') || /^https?:\/\//.test(value)))
            ? true
            : 'Must start with / for a page on this site, or https:// for an external link',
        ),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
    prepare: ({title, subtitle}) => ({
      title,
      subtitle: subtitle || 'Plain text (no link)',
    }),
  },
})
