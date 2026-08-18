function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET',
)

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-02-01'

/** Server only. Absent in the browser bundle by design. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? ''

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/**
 * GA4 measurement id.
 *
 * This is the same property Firebase Analytics would have reported to —
 * Firebase creates a linked GA4 property and hands back its measurement id —
 * so it reaches the same reports without shipping the Firebase SDK to every
 * visitor.
 *
 * Empty disables analytics outright, and it is deliberately left unset in
 * development so local page views never pollute the practice's reports. Only
 * apphosting.yaml sets it.
 */
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? ''
