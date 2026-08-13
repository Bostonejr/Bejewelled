import type {MetadataRoute} from 'next'

import {client} from '@/sanity/client'
import {siteUrl} from '@/sanity/env'
import {PROJECT_SLUGS_QUERY} from '@/sanity/queries'

/**
 * The sitemap.
 *
 * The plain client rather than sanityFetch: this runs without a request to
 * read draft mode from, exactly like generateStaticParams. The CDN is bypassed
 * so a newly published project appears here on the first crawl rather than
 * after the edge cache turns over.
 *
 * Only published projects are listed, which the client's `published`
 * perspective handles — a draft has no public URL to point a crawler at.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, siteUrl).toString()

  const staticRoutes: MetadataRoute.Sitemap = [
    {url: url('/'), changeFrequency: 'monthly', priority: 1},
    {url: url('/services'), changeFrequency: 'yearly', priority: 0.8},
    {url: url('/construction'), changeFrequency: 'yearly', priority: 0.8},
    {url: url('/designs'), changeFrequency: 'monthly', priority: 0.9},
    {url: url('/contact'), changeFrequency: 'yearly', priority: 0.7},
  ]

  let slugs: (string | null)[] = []
  try {
    slugs = await client.withConfig({useCdn: false}).fetch(PROJECT_SLUGS_QUERY)
  } catch (error) {
    // A sitemap missing its project URLs is a far smaller problem than a build
    // or a request that fails outright because Sanity was briefly unreachable.
    console.error('[sitemap] could not load project slugs', error)
  }

  return [
    ...staticRoutes,
    ...(slugs ?? []).flatMap((slug) =>
      slug
        ? [
            {
              url: url(`/designs/${slug}`),
              changeFrequency: 'yearly' as const,
              priority: 0.6,
            },
          ]
        : [],
    ),
  ]
}
