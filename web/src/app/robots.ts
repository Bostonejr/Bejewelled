import type {MetadataRoute} from 'next'

import {siteUrl} from '@/sanity/env'

/**
 * `/dev/` is the component gallery, and `/api/` is the enquiry proxy — neither
 * is content. The gallery already sets `robots: noindex` on its own page, but
 * that only stops indexing after a crawl; this stops the crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{userAgent: '*', allow: '/', disallow: ['/api/', '/dev/']}],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}
