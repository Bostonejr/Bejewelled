import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'

import {Eyebrow} from '@/components/ds'
import {ImageCaption, SanityImage} from '@/components/SanityImage'
import {twoDigit} from '@/lib/numbering'
import {client} from '@/sanity/client'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {PROJECT_QUERY, PROJECT_SLUGS_QUERY} from '@/sanity/queries'

/**
 * A project record.
 *
 * The design's exact layout is kept — a 560px primary plate over two 320px
 * secondaries — and the rest of the folder continues below it in the same
 * language rather than being dropped or padded into a different grid. Most
 * folders hold four to twelve photographs and the design has slots for three
 * (docs/PLAN.md gap #06).
 *
 * The record number and the previous/next links both come from the full
 * portfolio order, which wraps at either end exactly as the design's router
 * does: the last record's "next" is the first.
 */

export async function generateStaticParams() {
  /**
   * The plain client, not sanityFetch.
   *
   * sanityFetch reads draftMode() so it can serve drafts inside the
   * Presentation tool, and generateStaticParams runs at build time with no
   * request to read it from — Next fails the build rather than guessing. The
   * CDN is bypassed too: a build should never prerender against a stale edge
   * copy of the slug list.
   */
  const slugs = await client
    .withConfig({useCdn: false})
    .fetch(PROJECT_SLUGS_QUERY)
  return (slugs ?? []).map((slug) => ({slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const {data} = await sanityFetch({query: PROJECT_QUERY, params: {slug}, stega: false})
  const project = data?.project
  if (!project) return {}

  return buildMetadata({
    seo: project.seo,
    fallbackTitle: project.client ?? project.title ?? 'Project',
    fallbackDescription: project.note,
    path: `/designs/${slug}`,
  })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const {data} = await sanityFetch({query: PROJECT_QUERY, params: {slug}})

  const project = data?.project
  if (!project) notFound()

  const template = data.template
  const order = data.order ?? []
  const index = order.findIndex((entry) => entry._id === project._id)
  const position = index < 0 ? 0 : index

  /**
   * The design's router wraps at both ends rather than hiding the link, so the
   * last record's "next" is the first — and that is kept.
   *
   * Below two published projects the wrap degenerates: with one project, both
   * links point back at the page you are already on. The whole block is
   * dropped in that case rather than printing two links to nowhere. The design
   * never met this state because it shipped with seven hardcoded records.
   */
  const hasSiblings = order.length > 1
  const previousIndex = (position - 1 + order.length) % order.length
  const nextIndex = (position + 1) % order.length
  const previous = hasSiblings ? order[previousIndex] : null
  const next = hasSiblings ? order[nextIndex] : null

  const gallery = project.gallery ?? []
  const secondaries = gallery.slice(0, 2)
  const remainder = gallery.slice(2)

  // The four-cell record strip. A cell with no value is dropped rather than
  // printed empty — an unfinished draft shows three cells, not a blank one.
  const fields: {label: string; value: string}[] = (
    [
      [template?.fieldLabels?.client, project.client],
      [template?.fieldLabels?.scope, project.scopeOfWorks],
      [template?.fieldLabels?.location, project.location],
      [template?.fieldLabels?.status, project.status],
    ] as const
  ).flatMap(([label, value]) => (label && value ? [{label, value}] : []))

  return (
    <>
      <section className="wrap pt-10">
        <Link
          href="/designs"
          className="type-eyebrow text-text-muted transition-control hover:text-text-heading"
        >
          {template?.backLabel ?? '← All designs'}
        </Link>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-end gap-16 border-b-2 border-line-strong pb-8">
          <div>
            <div className="font-mono text-lg tracking-[0.12em] tabular-nums text-text-accent">
              {twoDigit(position)}
            </div>
            <h1 className="type-h1 mt-[18px]">{project.client ?? project.title}</h1>
          </div>
          <div className="font-mono text-2xs uppercase tracking-[0.14em] text-text-muted md:text-right">
            {template?.recordLine}
          </div>
        </div>
      </section>

      {fields.length ? (
        <section className="wrap pt-8">
          <div className="grid grid-cols-2 border-t border-b border-line-hairline md:grid-cols-4">
            {fields.map(({label, value}) => (
              <div key={label} className="border-l border-line-hairline px-6 py-6">
                <div className="type-label text-text-muted">{label}</div>
                <div className="type-body-sm mt-2 text-text-body">{value}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="wrap pt-14">
        <div className="relative h-[560px] bg-surface-plate">
          <SanityImage
            image={project.mainImage}
            priority
            sizes="(max-width: 1240px) 100vw, 1128px"
          />
        </div>
        <ImageCaption caption={project.mainImage?.caption} />

        {secondaries.length ? (
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {secondaries.map((figure, i) => (
              <div key={figure?.asset?._id ?? i}>
                <div className="relative h-[320px] bg-surface-plate">
                  <SanityImage
                    image={figure}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <ImageCaption caption={figure?.caption} />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* Gap #06 — the folder usually holds more than the design has slots for.
          Same plate ground, same square corners, same mono caption below the
          frame. The design extended, not reinterpreted. */}
      {remainder.length ? (
        <section className="wrap pt-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {remainder.map((figure, i) => (
              <div key={figure?.asset?._id ?? i}>
                <div className="relative h-[320px] rounded-none bg-surface-plate">
                  <SanityImage
                    image={figure}
                    sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 360px"
                  />
                </div>
                <ImageCaption caption={figure?.caption} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="wrap pt-18">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-16">
          <div>
            {template?.commissionEyebrow ? (
              <Eyebrow>{template.commissionEyebrow}</Eyebrow>
            ) : null}
            {project.sector ? (
              <h2 className="type-h2 mt-[14px] max-w-[14ch]">{project.sector} work</h2>
            ) : null}
          </div>

          <div>
            <p className="type-body-lg measure text-text-body">{project.note}</p>

            {project.commissionBody?.length ? (
              <div className="type-body measure mt-6 space-y-4 text-text-body">
                <PortableText value={project.commissionBody} />
              </div>
            ) : template?.defaultCommissionBody ? (
              <p className="type-body measure mt-6 text-text-body">
                {template.defaultCommissionBody}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {previous && next ? (
        <section className="wrap pt-18">
          <div className="grid grid-cols-1 border-t border-line-rule md:grid-cols-2">
            <Link
              href={`/designs/${previous.slug}`}
              className="border-b border-line-hairline py-8 transition-control hover:bg-paper-050 md:border-b-0 md:border-r md:pr-10"
            >
              <div className="type-label tracking-[0.14em] text-text-muted">
                {template?.prevLabel} {twoDigit(previousIndex)}
              </div>
              <div className="mt-3 font-display text-lg text-text-heading">
                {previous.client}
              </div>
            </Link>

            <Link
              href={`/designs/${next.slug}`}
              className="py-8 transition-control hover:bg-paper-050 md:pl-10 md:text-right"
            >
              <div className="type-label tracking-[0.14em] text-text-muted">
                {template?.nextLabel} {twoDigit(nextIndex)} →
              </div>
              <div className="mt-3 font-display text-lg text-text-heading">
                {next.client}
              </div>
            </Link>
          </div>
        </section>
      ) : null}
    </>
  )
}
