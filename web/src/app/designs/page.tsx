import {Suspense} from 'react'
import {notFound} from 'next/navigation'

import {CtaBand} from '@/components/chrome'
import {DesignsControls} from '@/components/designs/DesignsControls'
import {ProjectRow} from '@/components/ds'
import {ProjectCard} from '@/components/project/ProjectCard'
import {PageHeader} from '@/components/sections'
import {twoDigit} from '@/lib/numbering'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {DESIGNS_PAGE_QUERY} from '@/sanity/queries'
import {getSiteSettings} from '@/sanity/settings'

/**
 * The designs index — filter chips, a Plates/Index toggle, and the portfolio.
 *
 * The filter and the view live in the query string (?sector=…&view=…) rather
 * than in React state, so the grid stays server-rendered and a filtered view
 * can be linked to. Only the controls are a client component.
 *
 * Record numbers come from each project's position in the FULL portfolio
 * order, computed before filtering. Filter to Commercial and the visible
 * records still read 02, 06, 09 — their real numbers — rather than renumbering
 * themselves 01, 02, 03. Numbering is a record system here, not decoration.
 */

export async function generateMetadata() {
  const {data} = await sanityFetch({query: DESIGNS_PAGE_QUERY, stega: false})
  return buildMetadata({
    seo: data?.page?.seo,
    fallbackTitle: data?.page?.title ?? 'Designs',
    fallbackDescription: data?.page?.intro,
    path: '/designs',
  })
}

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<{sector?: string; view?: string}>
}) {
  const [{sector, view}, {data}, settings] = await Promise.all([
    searchParams,
    sanityFetch({query: DESIGNS_PAGE_QUERY}),
    getSiteSettings(),
  ])

  if (!data?.page) notFound()

  const {page, sectors, projects} = data

  const numbered = projects.map((project, index) => ({
    ...project,
    number: twoDigit(index),
  }))

  const activeSector =
    sector && sectors.some((s) => s.slug === sector) ? sector : null
  const shown = activeSector
    ? numbered.filter((project) => project.sectorSlug === activeSector)
    : numbered

  // String() strips the stega encoding sanityFetch wraps around every value;
  // without it a comparison against a literal never matches.
  const activeView: 'plates' | 'index' =
    view === 'index' || view === 'plates'
      ? view
      : String(page.defaultView) === 'index'
        ? 'index'
        : 'plates'

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow ?? ''}
        title={page.title ?? ''}
        intro={page.intro}
      />

      <section className="wrap">
        {/* useSearchParams needs a Suspense boundary or the whole route opts
            out of static rendering. */}
        <Suspense fallback={<div className="mt-14 h-[46px]" />}>
          <DesignsControls
            sectors={sectors.flatMap((s) =>
              s.title && s.slug ? [{title: s.title, slug: s.slug}] : [],
            )}
            allLabel={page.allFilterLabel ?? 'All'}
            activeSector={activeSector}
            view={activeView}
          />
        </Suspense>
      </section>

      <section className="wrap pt-10">
        {shown.length === 0 ? (
          <p className="type-body measure text-text-muted">
            No projects in this sector yet.
          </p>
        ) : activeView === 'plates' ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {shown.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                number={project.number}
                variant="plate"
                headingLevel={2}
              />
            ))}
          </div>
        ) : (
          <div className="border-t border-line-rule">
            {shown.map((project) => (
              <ProjectRow
                key={project._id}
                number={project.number}
                client={project.client ?? ''}
                scope={project.scopeOfWorks ?? undefined}
                location={project.location ?? undefined}
                status={project.status ?? undefined}
                href={`/designs/${project.slug}`}
              />
            ))}
          </div>
        )}
      </section>

      <CtaBand ctaBand={settings.ctaBand} />
    </>
  )
}
