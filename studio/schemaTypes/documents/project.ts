import {DocumentsIcon} from '@sanity/icons/Documents'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

import {ALT_TEXT, COPY, IMAGE_OPTIONS} from '../brandCopy'

/**
 * A project record — the portfolio.
 *
 * The record number (01, 02, 03) is NOT stored here. It is derived from the
 * project's position in the ordered list at render time, so inserting a
 * project at position three renumbers everything below it, including the
 * previous/next links at the foot of each detail page. See docs/PLAN.md §5.4.
 *
 * Drag to reorder under Projects in the sidebar; the order drives the record
 * numbers, the Designs index and the featured selection fallback on Home.
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentsIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'record', title: 'Record', default: true},
    {name: 'photographs', title: 'Photographs'},
    {name: 'commission', title: 'The commission'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      group: 'record',
      description: `How the project is referred to internally — usually the site or scheme name. ${COPY}`,
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'record',
      description:
        'The web address: /designs/your-slug. Generated once from the title and then pinned — correcting the title later will not break a link someone has already shared.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'record',
      description: `The name printed as the heading on the project page — "Komfo Anokye Teaching Hospital Credit Union". Leave blank to fall back to the project title. ${COPY}`,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'scopeOfWorks',
      title: 'Scope of works',
      type: 'string',
      group: 'record',
      description: `As it would read on a drawing — "Construction of 16 No. Town Houses", "Office complex including a banking hall". ${COPY}`,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'record',
      description: `Suburb and city — "Bantama, Kumasi". ${COPY}`,
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'reference',
      group: 'record',
      to: [{type: 'sector'}],
      description:
        'Drives the filter chips on the Designs page. Add a new sector under Sectors rather than typing one here.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'record',
      options: {
        list: [
          {title: 'Completed', value: 'Completed'},
          {title: 'Ongoing', value: 'Ongoing'},
          {title: 'On hold', value: 'On hold'},
        ],
        layout: 'radio',
      },
      initialValue: 'Completed',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'record',
      description: 'Optional. The year of completion or handover.',
      validation: (rule) => rule.min(1990).max(new Date().getFullYear() + 5),
    }),

    defineField({
      name: 'mainImage',
      title: 'Primary photograph',
      type: 'image',
      group: 'photographs',
      options: IMAGE_OPTIONS,
      description:
        'The card thumbnail on Home and Designs, and the large 560px plate at the top of the project page. A frontal or three-quarter exterior view in natural daylight.',
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
          description: 'Optional. Printed below the frame in small uppercase mono.',
          validation: (rule) => rule.max(120),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Further photographs',
      type: 'array',
      group: 'photographs',
      of: [{type: 'figure'}],
      description:
        'The first two appear as the pair of 320px plates beneath the primary photograph, exactly as the design lays them out. Any beyond that continue below in the same language rather than being dropped.',
      options: {layout: 'grid'},
    }),

    defineField({
      name: 'note',
      title: 'The commission',
      type: 'text',
      group: 'commission',
      rows: 4,
      description: `The opening paragraph on the project page, set at --type-body-lg. Say what was built, for whom, where, and whether it is complete. ${COPY}`,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: 'commissionBody',
      title: 'Second paragraph',
      type: 'array',
      group: 'commission',
      of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: []}],
      description: `Optional. Left empty, the page prints the standard wholistic-service sentence used across the portfolio. ${COPY}`,
    }),

    defineField({
      name: 'seo',
      title: 'Search & social',
      type: 'seo',
      group: 'meta',
    }),

    orderRankField({type: 'project'}),
  ],

  preview: {
    select: {
      title: 'client',
      fallbackTitle: 'title',
      scope: 'scopeOfWorks',
      location: 'location',
      media: 'mainImage',
    },
    prepare: ({title, fallbackTitle, scope, location, media}) => ({
      title: title || fallbackTitle,
      subtitle: [scope, location].filter(Boolean).join(' · '),
      media,
    }),
  },
})
