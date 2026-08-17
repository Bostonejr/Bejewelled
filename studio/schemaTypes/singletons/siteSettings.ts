import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

import {COPY, IMAGE_OPTIONS, NO_EMOJI} from '../brandCopy'
import {singletonPreview} from '../parts'

/**
 * Everything that appears on more than one page: the chrome, the practice's
 * details, and the defaults the rest of the site falls back to.
 *
 * Gap #13 in docs/PLAN.md: the practice has two names and they are not
 * interchangeable. "Bejewelled" is used in navigation, marketing and page
 * titles; "Bejewelled Enterprise" in the copyright line, the registration
 * strip and the project record line. They are separate fields so an edit
 * cannot quietly collapse the distinction.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'contact', title: 'Contact details'},
    {name: 'chrome', title: 'Navigation & footer'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand name',
      type: 'string',
      group: 'identity',
      description:
        'Used in navigation, marketing copy and page titles. "Bejewelled".',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'legalName',
      title: 'Legal name',
      type: 'string',
      group: 'identity',
      description:
        'Used in the copyright line, the registration strip and the project record line. "Bejewelled Enterprise".',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identity',
      description: `The one place an exclamation mark is allowed. ${NO_EMOJI}`,
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'railLabel',
      title: 'Sheet rail label',
      type: 'string',
      group: 'identity',
      description:
        'The small vertical line of type running up the fixed rail on the left of every screen. Hidden on phones.',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'phones',
      title: 'Telephone numbers',
      type: 'array',
      group: 'contact',
      of: [{type: 'string'}],
      description:
        'The first is the one printed in the header. Write them as they are dialled locally — "0244 037 166".',
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: 'addressLines',
      title: 'Registered address',
      type: 'array',
      group: 'contact',
      of: [{type: 'string'}],
      description: 'One line per line of the address, in postal order.',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'digitalAddress',
      title: 'Ghana Post digital address',
      type: 'string',
      group: 'contact',
      description: 'For example AK-361-7399.',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'showRegistrationLine',
      title: 'Show the registration line',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
      description:
        'Off hides the registration line from the bottom of the footer sitewide. The wording below is kept either way, so turning it back on restores it unchanged.',
    }),
    defineField({
      name: 'registrationLine',
      title: 'Registration line',
      type: 'string',
      group: 'contact',
      description: `Printed along the bottom of the footer. Registration number, year, and Ministry of Works and Housing classification. ${COPY}`,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'showCredentialStrip',
      title: 'Show the credential strip',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
      description:
        'Off hides the ink band of credentials under the hero on Home. The claims below are kept either way, so turning it back on restores the strip unchanged.',
    }),
    defineField({
      name: 'credentialStrip',
      title: 'Credential strip',
      type: 'array',
      group: 'contact',
      of: [{type: 'string'}],
      description:
        'The band of small uppercase mono claims across the ink strip on Home — registration, Ministry classification, Public Procurement Authority, Architects Registration Council. Four reads best; the strip divides evenly at any count.',
      validation: (rule) => rule.required().min(1).max(6),
    }),

    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'array',
      group: 'chrome',
      of: [{type: 'linkItem'}],
      description:
        'The header links, in order. Every item needs a destination here, unlike the footer columns.',
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(7)
          .custom((items) =>
            Array.isArray(items) &&
            items.every((item) => (item as {href?: string})?.href)
              ? true
              : 'Every navigation item needs a destination',
          ),
    }),
    defineField({
      name: 'footerStatement',
      title: 'Footer statement',
      type: 'text',
      group: 'chrome',
      rows: 3,
      description: `The short paragraph under the logo in the footer. ${COPY}`,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      group: 'chrome',
      of: [{type: 'footerColumn'}],
      description:
        'The two middle columns. The logo column and the registered-office column are built from the fields above.',
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'officeColumnTitle',
      title: 'Office column heading',
      type: 'string',
      group: 'chrome',
      initialValue: 'Registered office',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'ctaBand',
      title: 'Closing call to action',
      type: 'ctaBand',
      group: 'chrome',
      description:
        'Appears at the foot of every page except Contact. Edited here once.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'defaultSeo',
      title: 'Default search & social',
      type: 'seo',
      group: 'meta',
      description:
        'Used by any page that has not set its own. The sharing image here is the one most links to the site will show.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default sharing image',
      type: 'image',
      group: 'meta',
      options: IMAGE_OPTIONS,
      description:
        'Landscape, at least 1200 × 630. Shown when the home page is shared.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'meta',
      of: [{type: 'linkItem'}],
      description:
        'Optional. Full https:// addresses. Left empty, no social links are rendered.',
    }),
  ],

  preview: singletonPreview('Site settings'),
})
