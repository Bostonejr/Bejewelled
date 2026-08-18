import type {Metadata} from 'next'

import {urlFor, type SanityImageWithMeta} from '@/sanity/image'
import {siteUrl} from '@/sanity/env'

type Seo =
  | {
      title?: string | null
      description?: string | null
      noIndex?: boolean | null
      image?: SanityImageWithMeta | null
    }
  | null
  | undefined

/**
 * Turns a page's `seo` object into Next metadata, falling back to the page's
 * own heading and introduction.
 *
 * The fallback chain matters more than it looks: an editor who never opens the
 * "Search & social" tab still gets a sensible title and description, drawn from
 * copy they did write.
 *
 * The sharing image falls back to `app/opengraph-image.png` — the brand lockup
 * on an ink plate — and that fallback has to be applied *here*, not inherited.
 * Next treats `openGraph` as a unit: a page that returns one replaces the root
 * layout's outright rather than merging field by field, and Next's
 * `opengraph-image` file convention only covers `/`. Both were tried; both
 * left every route except the home page with no `og:image` at all, project
 * pages included — and those are the ones that get pasted into WhatsApp.
 *
 * So every page gets an explicit absolute image, and a page that sets its own
 * in the Studio's "Search & social" tab overrides it.
 *
 * Descriptions are trimmed to 200 characters at a word boundary. A page
 * introduction is written to be read on the page, not in a search result, and
 * an untrimmed one gets cut mid-word by the engine instead.
 */
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
  absoluteTitle = false,
}: {
  seo: Seo
  fallbackTitle: string
  fallbackDescription?: string | null
  path: string
  /** Home only: bypass the "%s — Bejewelled" template in the root layout. */
  absoluteTitle?: boolean
}): Metadata {
  const title = seo?.title || fallbackTitle
  const description = trim(seo?.description || fallbackDescription || '')
  const url = new URL(path, siteUrl).toString()

  const ogImage = seo?.image?.asset
    ? urlFor(seo.image).width(1200).height(630).fit('crop').url()
    : new URL('/opengraph-image.png', siteUrl).toString()

  return {
    title: absoluteTitle ? {absolute: title} : title,
    description: description || undefined,
    alternates: {canonical: url},
    robots: seo?.noIndex ? {index: false, follow: false} : undefined,
    openGraph: {
      type: 'website',
      url,
      title,
      description: description || undefined,
      images: [{url: ogImage, width: 1200, height: 630}],
    },
  }
}

function trim(text: string, max = 200): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`
}
