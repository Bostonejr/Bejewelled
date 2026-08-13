// v2 moved both of these to the package root: the default export is deprecated
// in favour of the named `createImageUrlBuilder`, and the old
// '@sanity/image-url/lib/types/types' subpath for the source type is gone.
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from './env'

const builder = createImageUrlBuilder({projectId, dataset})

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}

/**
 * An image as the queries in queries.ts return it.
 *
 * Written with `| null` rather than `?:` throughout, and with `_id` alongside
 * `_ref`, because that is the shape TypeGen produces: GROQ projections yield
 * null for a missing field, never undefined, and `asset->` dereferences to a
 * document with an `_id`. A type using optionals here looks tidier and then
 * fails to accept a single real query result.
 *
 * `metadata.lqip` is the base64 preview Sanity generates on upload — it feeds
 * next/image's `placeholder="blur"` so a 3 MB exterior render resolves instead
 * of popping in.
 */
export type SanityImageWithMeta = {
  asset?: {
    _ref?: string
    _id?: string
    metadata?: {
      lqip?: string | null
      dimensions?: {
        width?: number | null
        height?: number | null
        aspectRatio?: number | null
      } | null
    } | null
  } | null
  hotspot?: {x?: number; y?: number} | null
  crop?: unknown
  alt?: string | null
  caption?: string | null
}
