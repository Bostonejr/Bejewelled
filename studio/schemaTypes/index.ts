import type {SchemaTypeDefinition} from 'sanity'

import {project} from './documents/project'
import {sector} from './documents/sector'
import {comparisonRow} from './objects/comparisonRow'
import {cta} from './objects/cta'
import {ctaBand} from './objects/ctaBand'
import {fieldRow} from './objects/fieldRow'
import {figure} from './objects/figure'
import {footerColumn} from './objects/footerColumn'
import {linkItem} from './objects/linkItem'
import {numberedItem} from './objects/numberedItem'
import {seo} from './objects/seo'
import {serviceBlock} from './objects/serviceBlock'
import {statItem} from './objects/statItem'
import {constructionPage} from './singletons/constructionPage'
import {contactPage} from './singletons/contactPage'
import {designsPage} from './singletons/designsPage'
import {homePage} from './singletons/homePage'
import {projectPage} from './singletons/projectPage'
import {servicesPage} from './singletons/servicesPage'
import {siteSettings} from './singletons/siteSettings'

/**
 * Document types that exist exactly once. Their ids equal their type names, so
 * a query can fetch one by id without a filter and the Studio can pin them.
 * The Studio config uses this set to hide "create" and "delete" for them, and
 * structure.ts uses it to keep them out of the generic document list.
 */
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'homePage',
  'servicesPage',
  'constructionPage',
  'designsPage',
  'projectPage',
  'contactPage',
])

/** Document types an editor creates freely. */
export const COLLECTION_TYPES = ['project', 'sector'] as const

/**
 * Every schema type in the Bejewelled content model — see docs/PLAN.md §5.
 *
 * Objects come first so the document types that reference them resolve without
 * a forward declaration.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  cta,
  ctaBand,
  figure,
  linkItem,
  footerColumn,
  numberedItem,
  statItem,
  fieldRow,
  comparisonRow,
  serviceBlock,

  // collections
  sector,
  project,

  // singletons
  siteSettings,
  homePage,
  servicesPage,
  constructionPage,
  designsPage,
  projectPage,
  contactPage,
]
