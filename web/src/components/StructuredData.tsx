import type {SiteSettings} from '@/content/site'
import {siteUrl} from '@/sanity/env'

/**
 * JSON-LD for the practice.
 *
 * `ProfessionalService` rather than `Organization`: this is a practice bidding
 * for public work in a specific city, and the type carries the address,
 * telephone and area served that a local search result is built from. Every
 * value comes from siteSettings, so the structured data cannot drift from the
 * footer that a reader sees.
 *
 * The legal name is used for `legalName` and the brand name for `name` —
 * they are different strings on purpose (docs/PLAN.md gap #13).
 */
export function StructuredData({settings}: {settings: SiteSettings}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': new URL('/#practice', siteUrl).toString(),
    name: settings.brandName,
    legalName: settings.legalName,
    slogan: settings.tagline,
    url: siteUrl,
    telephone: settings.phones,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.addressLines.join(' ').replace(/,\s*$/, ''),
      addressLocality: 'Kumasi',
      addressCountry: 'GH',
    },
    areaServed: {'@type': 'Country', name: 'Ghana'},
    knowsAbout: [
      'Architectural design',
      'Structural engineering',
      'Project management',
      'Building construction',
    ],
    logo: new URL('/brand/logo-lockup.png', siteUrl).toString(),
  }

  return (
    <script
      type="application/ld+json"
      // The object is built here from typed fields, never from user input, so
      // there is nothing to escape and nothing a visitor can inject.
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  )
}
