import {notFound} from 'next/navigation'

import {CtaBand} from '@/components/chrome'
import {Button, Card, SectionHeading} from '@/components/ds'
import {DeepBand, PageHeader} from '@/components/sections'
import {twoDigit} from '@/lib/numbering'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {SERVICES_PAGE_QUERY} from '@/sanity/queries'
import {getSiteSettings} from '@/sanity/settings'

/**
 * Services — header, the discipline blocks, the blue band pointing at
 * Construction, and the sector cards.
 *
 * Exact values from the design: each service block sits under a 3px
 * --line-accent rule with 56px of padding, splitting into an auto-fit grid at
 * minmax(320px, 1fr) with a 64px gap; the number is mono at --text-lg in gold,
 * the h2 caps at 16ch, and the covered-items list is a stack of hairline rows
 * with a small gold ▪ marker.
 *
 * The ▪ is the design's own marker rather than a list-style bullet, which is
 * why the rows are a grid and not a <ul> with markers — but they are still a
 * list, so the markup says so and the marker is hidden from screen readers.
 */

export async function generateMetadata() {
  const {data} = await sanityFetch({query: SERVICES_PAGE_QUERY, stega: false})
  return buildMetadata({
    seo: data?.seo,
    fallbackTitle: data?.title ?? 'Services',
    fallbackDescription: data?.intro,
    path: '/services',
  })
}

export default async function ServicesPage() {
  const [{data}, settings] = await Promise.all([
    sanityFetch({query: SERVICES_PAGE_QUERY}),
    getSiteSettings(),
  ])

  if (!data) notFound()

  const services = data.services ?? []
  const sectors = data.sectorsBlock?.items ?? []

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow ?? ''}
        title={data.title ?? ''}
        intro={data.intro}
      />

      <section className="wrap pt-18">
        {services.map((service, index) => (
          <div
            key={service?.title ?? index}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-16 border-t-[3px] border-line-accent py-14"
          >
            <div>
              <div className="font-mono text-lg tabular-nums text-text-accent">
                {twoDigit(index)}
              </div>
              <h2 className="type-h2 mt-[18px] max-w-[16ch]">{service?.title}</h2>
              <div className="mt-7 font-mono text-2xs uppercase tracking-[0.14em] text-text-muted">
                {service?.tag}
              </div>
            </div>

            <div>
              <p className="type-body-lg measure text-text-body">
                {service?.description}
              </p>

              {service?.items?.length ? (
                <ul className="mt-9 list-none border-t border-line-hairline">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-line-hairline py-[14px]"
                    >
                      <span
                        aria-hidden
                        className="text-[10px] leading-[1.6] text-gold-500"
                      >
                        ▪
                      </span>
                      <span className="type-body text-text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      {data.constructionBand ? (
        <DeepBand>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-end gap-16">
            <SectionHeading
              eyebrow={data.constructionBand.eyebrow}
              title={data.constructionBand.title}
              tone="inverse"
            />
            <p className="type-body-lg max-w-[56ch] pb-1.5 text-text-on-deep-muted">
              {data.constructionBand.body}
            </p>
          </div>

          {data.constructionBand.cta?.label && data.constructionBand.cta?.href ? (
            <div className="mt-14">
              <Button href={data.constructionBand.cta.href} variant="accent">
                {data.constructionBand.cta.label}
              </Button>
            </div>
          ) : null}
        </DeepBand>
      ) : null}

      {sectors.length ? (
        <section className="wrap pt-24">
          <SectionHeading
            eyebrow={data.sectorsBlock?.eyebrow}
            title={data.sectorsBlock?.title}
          />

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
            {sectors.map((sector, index) => (
              <Card key={sector?.title ?? index} padding="p-7">
                <div className="font-mono text-xs tracking-[0.12em] tabular-nums text-text-accent">
                  {twoDigit(index)}
                </div>
                <h3 className="type-h3 mt-4">{sector?.title}</h3>
                <p className="type-body-sm mt-[10px] text-text-muted">{sector?.body}</p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBand ctaBand={settings.ctaBand} />
    </>
  )
}
