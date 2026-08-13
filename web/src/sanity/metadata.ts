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
 * copy they did write. Only the sharing image has no fallback here — the
 * layout's metadataBase supplies the site default.
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
    : undefined

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
      images: ogImage ? [{url: ogImage, width: 1200, height: 630}] : undefined,
    },
  }
}

function trim(text: string, max = 200): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`
}
