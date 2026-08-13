import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

import {COPY, EYEBROW} from '../brandCopy'
import {singletonPreview} from '../parts'

/**
 * The furniture of the project detail template — every string on that page
 * that is not the project's own.
 *
 * In the design these were literals in the markup, which meant the four field
 * labels, the record line and the standard closing paragraph could only be
 * changed in code. They are fields now, edited once and applied to every
 * project.
 */
export const projectPage = defineType({
  name: 'projectPage',
  title: 'Project page template',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'chrome', title: 'Labels', default: true},
    {name: 'commission', title: 'The commission'},
  ],
  fields: [
    defineField({
      name: 'backLabel',
      title: 'Back link',
      type: 'string',
      group: 'chrome',
      initialValue: '← All designs',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'recordLine',
      title: 'Record line',
      type: 'string',
      group: 'chrome',
      description:
        'The small mono line at the top right of every project page. Uses the legal name — "Project record · Bejewelled Enterprise".',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'fieldLabels',
      title: 'Field strip labels',
      type: 'object',
      group: 'chrome',
      description: 'The four cells beneath the heading, in order.',
      fields: [
        defineField({
          name: 'client',
          type: 'string',
          title: 'Client',
          initialValue: 'Client',
          validation: (rule) => rule.required().max(30),
        }),
        defineField({
          name: 'scope',
          type: 'string',
          title: 'Scope of works',
          initialValue: 'Scope of works',
          validation: (rule) => rule.required().max(30),
        }),
        defineField({
          name: 'location',
          type: 'string',
          title: 'Location',
          initialValue: 'Location',
          validation: (rule) => rule.required().max(30),
        }),
        defineField({
          name: 'status',
          type: 'string',
          title: 'Status',
          initialValue: 'Status',
          validation: (rule) => rule.required().max(30),
        }),
      ],
    }),
    defineField({
      name: 'prevLabel',
      title: 'Previous record label',
      type: 'string',
      group: 'chrome',
      initialValue: '← Previous record',
      description: 'The record number is appended automatically.',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'nextLabel',
      title: 'Next record label',
      type: 'string',
      group: 'chrome',
      initialValue: 'Next record',
      description: 'The record number and arrow are appended automatically.',
      validation: (rule) => rule.required().max(40),
    }),

    defineField({
      name: 'commissionEyebrow',
      title: 'Commission eyebrow',
      type: 'string',
      group: 'commission',
      initialValue: 'The Commission',
      description: EYEBROW,
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'defaultCommissionBody',
      title: 'Standard closing paragraph',
      type: 'text',
      group: 'commission',
      rows: 4,
      description: `Printed after each project's own commission text, unless that project supplies its own second paragraph. ${COPY}`,
      validation: (rule) => rule.required().max(600),
    }),
  ],

  preview: singletonPreview('Project page template'),
})
