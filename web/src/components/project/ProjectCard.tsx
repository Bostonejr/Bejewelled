import {Badge, Card} from '@/components/ds'
import {SanityImage} from '@/components/SanityImage'
import type {SanityImageWithMeta} from '@/sanity/image'

/**
 * The project plate. Appears in two places with two small differences, both of
 * them the design's:
 *
 *   · `featured` — Selected Works on Home. 220px image, the sector printed top
 *     right, location alone in the footer.
 *   · `plate` — the Designs grid. 240px image, a status Badge top right, and
 *     location and sector at either end of the footer.
 *
 * Everything else is shared, which is why this is one component: card padding
 * 0, the image bleeding to the card's top corners, the mono record number in
 * gold, an h3 client name, the scope in muted body, and a hairline footer.
 *
 * The number is derived from the project's position in portfolio order and
 * passed in — it is never stored on the project (docs/PLAN.md §5.4).
 */

export type ProjectCardData = {
  slug: string | null
  client: string | null
  scopeOfWorks: string | null
  location: string | null
  status: string | null
  sector: string | null
  mainImage: SanityImageWithMeta | null
}

export function ProjectCard({
  project,
  number,
  variant = 'featured',
  headingLevel = 3,
}: {
  project: ProjectCardData
  number: string
  variant?: 'featured' | 'plate'
  /**
   * On Home the cards sit under "Recent commissions", an h2, so they are h3.
   * On the designs index they ARE the page's content and follow the h1
   * directly, so they are h2 — otherwise the document skips a level. Same
   * type, same size: `.type-h3` sets the appearance, the tag sets the
   * structure, and the two are allowed to differ.
   */
  headingLevel?: 2 | 3
}) {
  const plate = variant === 'plate'
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <Card href={`/designs/${project.slug}`} interactive padding="p-0">
      <div
        className={[
          'relative overflow-hidden rounded-t-md bg-surface-plate',
          plate ? 'h-60' : 'h-55',
        ].join(' ')}
      >
        <SanityImage
          image={project.mainImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 380px"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs tracking-[0.12em] text-text-accent">
            {number}
          </span>
          {plate ? (
            project.status ? (
              <Badge tone={project.status === 'Completed' ? 'success' : 'neutral'}>
                {project.status}
              </Badge>
            ) : null
          ) : (
            <span className="font-mono text-2xs uppercase tracking-[0.14em] text-text-muted">
              {project.sector}
            </span>
          )}
        </div>

        <Heading className="type-h3 mt-[14px] text-text-heading">
          {project.client}
        </Heading>
        <p className="type-body-sm mt-2 text-text-muted">{project.scopeOfWorks}</p>

        <div className="mt-[18px] flex justify-between gap-4 border-t border-line-hairline pt-[14px] font-mono text-2xs uppercase tracking-[0.12em] text-text-muted">
          <span>{project.location}</span>
          {plate ? <span>{project.sector}</span> : null}
        </div>
      </div>
    </Card>
  )
}
