import {notFound} from 'next/navigation'

import {CtaBand} from '@/components/chrome'
import {
  AboutBlock,
  CredentialStrip,
  DisciplinesBand,
  Hero,
  Leadership,
  SelectedWorks,
} from '@/components/home'
import {sanityFetch} from '@/sanity/live'
import {HOME_PAGE_QUERY} from '@/sanity/queries'
import {getSiteSettings} from '@/sanity/settings'
import {buildMetadata} from '@/sanity/metadata'

/**
 * Home, in the design's order: split hero → credential strip → About Us with
 * the practice record → the blue disciplines band → Selected Works →
 * Leadership → the shared closing band.
 *
 * Every section renders only if its content exists, so a half-seeded dataset
 * shows a shorter page rather than a broken one.
 */

export async function generateMetadata() {
  const [{data}, settings] = await Promise.all([
    sanityFetch({query: HOME_PAGE_QUERY, stega: false}),
    getSiteSettings(),
  ])
  return buildMetadata({
    seo: data?.seo,
    fallbackTitle: `${settings.brandName} — ${settings.tagline}`,
    fallbackDescription: data?.hero?.body,
    path: '/',
    absoluteTitle: true,
  })
}

export default async function HomePage() {
  const [{data}, settings] = await Promise.all([
    sanityFetch({query: HOME_PAGE_QUERY}),
    getSiteSettings(),
  ])

  if (!data) notFound()

  return (
    <>
      {data.hero ? <Hero hero={data.hero} /> : null}

      {settings.showCredentialStrip ? (
        <CredentialStrip items={settings.credentialStrip} />
      ) : null}

      {data.about ? <AboutBlock about={data.about} /> : null}

      {data.disciplines ? <DisciplinesBand disciplines={data.disciplines} /> : null}

      {data.works ? (
        <SelectedWorks works={data.works} projectOrder={data.projectOrder ?? []} />
      ) : null}

      {data.leadership ? <Leadership leadership={data.leadership} /> : null}

      <CtaBand ctaBand={settings.ctaBand} />
    </>
  )
}
