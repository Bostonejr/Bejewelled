import Link from 'next/link'

import {SectionHeading} from '@/components/ds'
import {ProjectCard, type ProjectCardData} from '@/components/project/ProjectCard'
import {recordNumber} from '@/lib/numbering'

/**
 * Structural rather than derived from HOME_PAGE_QUERY_RESULT.
 *
 * sanityFetch wraps every string in StegaString so the Presentation tool can
 * map rendered text back to the field that produced it. A StegaString is
 * assignable to `string`, but not to a narrow literal union like the project
 * status — so a prop type lifted straight off the generated result rejects the
 * very data the fetch returns. Widening `status` to `string` is the whole fix.
 */
type Works = {
  eyebrow: string | null
  title: string | null
  linkLabel: string | null
  featured: (ProjectCardData & {_id: string})[] | null
}

/**
 * Selected Works — three project plates under a heading that shares a 2px
 * --line-strong rule with a link to the full portfolio.
 *
 * Exact values: 96px above, 24px between the heading row and its rule, an
 * auto-fit card grid at minmax(300px, 1fr) with a 24px gap, 40px below the
 * rule. The SectionHeading drops its own rule here because the section rule
 * already does that work.
 *
 * Each card's record number is its position in the FULL portfolio order, not
 * its position among the three shown — so a featured card and the project's own
 * page always print the same number.
 *
 * The section disappears entirely when there are no projects rather than
 * rendering an empty grid under a heading.
 */
export function SelectedWorks({
  works,
  projectOrder,
}: {
  works: Works
  projectOrder: string[]
}) {
  const featured = works.featured ?? []
  if (!featured.length) return null

  return (
    <section className="wrap pt-24">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-line-strong pb-6">
        <SectionHeading eyebrow={works.eyebrow} title={works.title} rule={false} />
        <Link
          href="/designs"
          className="type-eyebrow border-b border-gold-200 pb-[3px] text-text-accent transition-control hover:border-gold-500 hover:text-gold-700"
        >
          {works.linkLabel}
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {featured.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            number={recordNumber(projectOrder, project._id)}
            variant="featured"
          />
        ))}
      </div>
    </section>
  )
}
