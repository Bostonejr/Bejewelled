import {ArrowRightIcon} from '@sanity/icons/ArrowRight'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * A button or link. `href` takes an internal path or a full external URL; the
 * front end renders the first as a client-side <Link> and the second as a
 * plain anchor.
 */
export const cta = defineType({
  name: 'cta',
  title: 'Button',
  type: 'object',
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: `Set in uppercase by the design, so write it in sentence case here — "View the designs", not "VIEW THE DESIGNS". ${COPY}`,
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Links to',
      type: 'string',
      description:
        'An internal path starting with / — /services, /designs, /contact — or a full external address starting with https://',
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === 'string' &&
            (value.startsWith('/') || /^https?:\/\//.test(value))
              ? true
              : 'Must start with / for a page on this site, or https:// for an external link',
          ),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
