import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HomeIcon} from '@sanity/icons/Home'
import {CaseIcon} from '@sanity/icons/Case'
import {TagIcon} from '@sanity/icons/Tag'
import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {WrenchIcon} from '@sanity/icons/Wrench'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

/**
 * The sidebar, arranged like the site rather than like a database.
 *
 * Pages sit at the top in route order — Home, Services, Construction, Designs,
 * Contact — followed by the project detail template, then the two collections,
 * then settings. Each page singleton opens straight into its own form: an
 * editor never sees a list containing one item.
 *
 * Projects and Sectors are drag-orderable, and that order is load-bearing.
 * Record numbers, the Designs index, the previous/next links and the featured
 * fallback on Home are all derived from it (docs/PLAN.md §5.4).
 */

/** A singleton whose document id equals its type name. */
function singleton(
  S: StructureBuilder,
  type: string,
  title: string,
  icon: React.ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Bejewelled')
    .items([
      singleton(S, 'homePage', 'Home', HomeIcon),
      singleton(S, 'servicesPage', 'Services', CaseIcon),
      singleton(S, 'constructionPage', 'Construction', WrenchIcon),
      singleton(S, 'designsPage', 'Designs', ThLargeIcon),
      singleton(S, 'contactPage', 'Contact', EnvelopeIcon),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        icon: DocumentsIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'sector',
        title: 'Sectors',
        icon: TagIcon,
        S,
        context,
      }),

      S.divider(),

      singleton(S, 'projectPage', 'Project page template', DocumentTextIcon),
      singleton(S, 'siteSettings', 'Site settings', CogIcon),
    ])
