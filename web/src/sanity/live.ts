import {defineLive} from 'next-sanity/live'

import {client} from './client'
import {readToken} from './env'

/**
 * Live Content API. `<SanityLive />` must render in the root layout or
 * content changes never reach an open page.
 */
export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken,
})
