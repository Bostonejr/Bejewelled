import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineField, defineType} from 'sanity'

import {ALT_TEXT, COPY, IMAGE_OPTIONS, altRequiredWithImage} from '../brandCopy'
import {pageHeaderFields, singletonPreview} from '../parts'

/**
 * Contact — the header, the enquiry form's copy, and the details column.
 *
 * `serviceOptions` fills the "Service required" dropdown. It lives here rather
 * than being read off the Services page so the wording of an enquiry option
 * can differ from the wording of a service — but the two are worth checking
 * against each other when either changes.
 *
 * This is the one page with no closing call-to-action band: the whole page is
 * the call to action.
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'form', title: 'Enquiry form'},
    {name: 'details', title: 'Details & map'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    ...pageHeaderFields({group: 'header', titleMax: 90, intro: false}),

    defineField({
      name: 'formIntro',
      title: 'Form introduction',
      type: 'text',
      group: 'form',
      rows: 3,
      description: `The paragraph above the first field. ${COPY}`,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'serviceOptions',
      title: 'Service options',
      type: 'array',
      group: 'form',
      of: [{type: 'string'}],
      description:
        'Fills the "Service required" dropdown. Worth keeping in step with the Services page.',
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: 'phoneNote',
      title: 'Telephone note',
      type: 'string',
      group: 'form',
      description:
        'The small mono line beside the send button — "Or call 0244 037 166".',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'successHeading',
      title: 'Success heading',
      type: 'string',
      group: 'form',
      initialValue: 'Thank you.',
      description: 'Replaces the form in place once an enquiry is sent.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'successBody',
      title: 'Success message',
      type: 'text',
      group: 'form',
      rows: 3,
      description: `State how quickly you will respond, and give the number to call if the project is urgent. ${COPY}`,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'successButtonLabel',
      title: 'Reset button label',
      type: 'string',
      group: 'form',
      initialValue: 'Send another enquiry',
      validation: (rule) => rule.required().max(40),
    }),

    defineField({
      name: 'contactFields',
      title: 'Contact details',
      type: 'array',
      group: 'details',
      of: [{type: 'fieldRow'}],
      description:
        'The record rows to the right of the form. Line breaks in a value are preserved, so an address can run across two lines.',
      validation: (rule) => rule.required().min(1).max(8),
    }),
    defineField({
      name: 'mapImage',
      title: 'Map or office photograph',
      type: 'image',
      group: 'details',
      options: IMAGE_OPTIONS,
      description: 'Sits below the details at 280px tall.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: ALT_TEXT,
          validation: (rule) => rule.max(160).custom(altRequiredWithImage),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description:
            'Printed below the frame in small uppercase mono — the address and digital address.',
          validation: (rule) => rule.max(120),
        }),
      ],
    }),

    defineField({name: 'seo', title: 'Search & social', type: 'seo', group: 'meta'}),
  ],

  preview: singletonPreview('Contact page'),
})
