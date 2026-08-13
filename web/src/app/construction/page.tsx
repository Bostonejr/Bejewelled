import {Fragment} from 'react'
import {notFound} from 'next/navigation'

import {CtaBand} from '@/components/chrome'
import {Eyebrow, SectionHeading} from '@/components/ds'
import {ImageCaption, SanityImage} from '@/components/SanityImage'
import {DeepBand, PageHeader} from '@/components/sections'
import {twoDigit} from '@/lib/numbering'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {CONSTRUCTION_PAGE_QUERY} from '@/sanity/queries'
import {getSiteSettings} from '@/sanity/settings'

/**
 * Construction — header, a full-width site photograph, the four stages on the
 * blue band, the comparison table, and the capability list.
 *
 * Exact values: the photograph is a 520px plate with its caption below the
 * frame in mono; the stages sit on an auto-fit grid at minmax(240px, 1fr) with
 * a 32px gap, each under a 3px gold rule; the comparison table is 1fr / 1fr
 * with 40px of inner padding and the right column on --paper-050; the
 * capability rows are a 40px / 1fr grid on hairlines.
 *
 * Gap #01 — the comparison table. A fixed two-column table is unreadable on a
 * phone, so below 768px it becomes a single column and each cell carries the
 * column label it lost. The --paper-050 ground still marks which half is
 * which. No new colours or type sizes: the labels are the table's own headings,
 * moved.
 */

export async function generateMetadata() {
  const {data} = await sanityFetch({query: CONSTRUCTION_PAGE_QUERY, stega: false})
  return buildMetadata({
    seo: data?.seo,
    fallbackTitle: data?.title ?? 'Construction',
    fallbackDescription: data?.intro,
    path: '/construction',
  })
}

export default async function ConstructionPage() {
  const [{data}, settings] = await Promise.all([
    sanityFetch({query: CONSTRUCTION_PAGE_QUERY}),
    getSiteSettings(),
  ])

  if (!data) notFound()

  const stages = data.stagesBlock?.items ?? []
  const rows = data.comparison?.rows ?? []
  const capabilities = data.capability?.items ?? []
  const leftLabel = data.comparison?.leftLabel ?? ''
  const rightLabel = data.comparison?.rightLabel ?? ''

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow ?? ''}
        title={data.title ?? ''}
        intro={data.intro}
        titleWidth="20ch"
      />

      <section className="wrap pt-14">
        <div className="relative h-[520px] bg-surface-plate">
          <SanityImage
            image={data.heroImage}
            sizes="(max-width: 1240px) 100vw, 1128px"
          />
        </div>
        <ImageCaption caption={data.heroImage?.caption} />
      </section>

      {stages.length ? (
        <DeepBand>
          <SectionHeading
            eyebrow={data.stagesBlock?.eyebrow}
            title={data.stagesBlock?.title}
            tone="inverse"
          />

          <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
            {stages.map((stage, index) => (
              <div
                key={stage?.title ?? index}
                className="border-t-[3px] border-line-accent pt-6"
              >
                <div className="font-mono text-sm tabular-nums text-gold-400">
                  {twoDigit(index)}
                </div>
                <h3 className="type-h3 mt-[14px] text-text-on-inverse">
                  {stage?.title}
                </h3>
                <p className="type-body-sm mt-[14px] text-text-on-deep-muted">
                  {stage?.body}
                </p>
              </div>
            ))}
          </div>
        </DeepBand>
      ) : null}

      {rows.length ? (
        <section className="wrap pt-24">
          <SectionHeading
            eyebrow={data.comparison?.eyebrow}
            title={data.comparison?.title}
          />

          <div className="mt-12 grid grid-cols-1 border-t border-line-rule md:grid-cols-2">
            {/* On mobile each cell repeats its label, so the header row goes. */}
            <div className="hidden py-8 pr-10 md:block md:border-r md:border-line-hairline">
              <div className="type-label tracking-[0.14em] text-text-muted">
                {leftLabel}
              </div>
            </div>
            <div className="hidden bg-paper-050 py-8 pl-10 md:block">
              <div className="type-label tracking-[0.14em] text-text-accent">
                {rightLabel}
              </div>
            </div>

            {rows.map((row, index) => (
              <Fragment key={index}>
                <div className="border-t border-line-hairline py-6 md:border-r md:border-line-hairline md:pr-10">
                  <div className="type-label mb-2 tracking-[0.14em] text-text-muted md:hidden">
                    {leftLabel}
                  </div>
                  <p className="type-body text-text-muted">{row?.conventional}</p>
                </div>
                <div className="border-t border-line-hairline bg-paper-050 px-6 py-6 md:px-0 md:pl-10">
                  <div className="type-label mb-2 tracking-[0.14em] text-text-accent md:hidden">
                    {rightLabel}
                  </div>
                  <p className="type-body text-text-body">{row?.bejewelled}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      ) : null}

      {capabilities.length ? (
        <section className="wrap pt-24">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-16">
            <div>
              {data.capability?.eyebrow ? (
                <Eyebrow>{data.capability.eyebrow}</Eyebrow>
              ) : null}
              <h2 className="type-h2 mt-[14px] max-w-[14ch]">
                {data.capability?.title}
              </h2>
              <p className="type-body-sm mt-8 max-w-[34ch] text-text-muted">
                {data.capability?.note}
              </p>
            </div>

            <div className="border-t border-line-hairline">
              {capabilities.map((item, index) => (
                <div
                  key={item?.title ?? index}
                  className="grid grid-cols-[40px_minmax(0,1fr)] items-baseline gap-6 border-b border-line-hairline py-[22px]"
                >
                  <div className="font-mono text-xs tracking-[0.12em] tabular-nums text-text-accent">
                    {twoDigit(index)}
                  </div>
                  <div>
                    <div className="font-display text-md text-text-heading">
                      {item?.title}
                    </div>
                    <div className="type-body-sm mt-1.5 text-text-muted">
                      {item?.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand ctaBand={settings.ctaBand} />
    </>
  )
}
