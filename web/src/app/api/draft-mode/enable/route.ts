import {defineEnableDraftMode} from 'next-sanity/draft-mode'

import {client} from '@/sanity/client'
import {readToken} from '@/sanity/env'

/**
 * The door the Presentation tool opens to preview unpublished content.
 *
 * next-sanity validates the signed URL Sanity sends before enabling draft
 * mode, so this cannot be turned on by guessing the address. The read token is
 * attached here and nowhere near the browser bundle.
 *
 * It matters for this site specifically: ten of the eleven project records are
 * drafts, so without this the practice cannot see what any of them will look
 * like before committing to publish.
 */
export const {GET} = defineEnableDraftMode({
  client: client.withConfig({token: readToken}),
})
