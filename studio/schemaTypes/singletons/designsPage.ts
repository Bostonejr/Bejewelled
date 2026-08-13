import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineField, defineType} from 'sanity'

import {pageHeaderFields, singletonPreview} from '../parts'

/**
 * The Designs index. The projects themselves live under Projects; this page
 * holds only its own header and the two controls above the grid.
 */
export const designsPage = defineType({
  name: 'designsPage',
  title: 'Designs page',
  type: 'document',
  icon: ThLargeIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'controls', title: 'Filters & view'},
    {name: 'meta', title: 'Search & social'},
  ],
  fields: [
    ...pageHeaderFields({group: 'header', titleMax: 90}),

    defineField({
      name: 'allFilterLabel',
      title: 'Label for the "everything" filter',
      type: 'string',
      group: 'controls',
      initialValue: 'All',
      description:
        'The first filter chip, which clears the sector filter. The rest of the chips come from the Sectors list.',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'defaultView',
      title: 'Default view',
      type: 'string',
      group: 'controls',
      options: {
        list: [
          {title: 'Plates — image cards', value: 'plates'},
          {title: 'Index — record rows', value: 'index'},
        ],
        layout: 'radio',
      },
      initialValue: 'plates',
      description: 'Which of the two views a visitor sees first. They can switch.',
      validation: (rule) => rule.required(),
    }),

    defineField({name: 'seo', title: 'Search & social', type: 'seo', group: 'meta'}),
  ],

  preview: singletonPreview('Designs page'),
})
