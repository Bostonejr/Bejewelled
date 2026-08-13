import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /**
   * The CDN is right for every runtime fetch. Static generation and the seed
   * script override it with `.withConfig({useCdn: false})` so they never read
   * a stale edge copy.
   */
  useCdn: true,
  perspective: 'published',
})
