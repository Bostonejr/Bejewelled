import {TagIcon} from '@sanity/icons/Tag'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

import {COPY} from '../brandCopy'

/**
 * The controlled list behind the filter chips on the Designs page.
 *
 * Gap #07 in docs/PLAN.md: the design derived these from free text typed onto
 * each project, so one typo would silently grow a sixth filter chip that
 * matched a single record. They are documents now — projects reference them,
 * the list is drag-orderable, and renaming one updates every project at once.
 */
export const sector = defineType({
  name: 'sector',
  title: 'Sector',
  type: 'document',
  icon: TagIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: `Residential, Commercial, Educational, Industrial, Healthcare. ${COPY}`,
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in the filter link. Generated from the name and then fixed — changing the name later will not break a shared URL.',
      options: {source: 'title', maxLength: 60},
      validation: (rule) => rule.required(),
    }),
    orderRankField({type: 'sector'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
