import {Button, Eyebrow, StatBlock} from '@/components/ds'
import type {HOME_PAGE_QUERY_RESULT} from '@/sanity/types.generated'

type About = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>['about']>

/**
 * About Us — the philosophy statement on the left, the practice record on the
 * right.
 *
 * Exact values: 96px above, an auto-fit grid at minmax(340px, 1fr) with a 64px
 * gap aligned to the top, the statement set in the display serif at --text-2xl
 * on 1.28, a 56 × 2px --line-strong rule with 36px either side, and the record
 * column opening on a hairline.
 *
 * The figures run in two columns regardless of how many there are — the design
 * fixes that, not the data.
 */
export function AboutBlock({about}: {about: About}) {
  const stats = (about.stats ?? []).flatMap((stat) =>
    stat?.value && stat?.label ? [{value: stat.value, label: stat.label}] : [],
  )

  return (
    <section className="wrap pt-24">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-16">
        <div>
          {about.eyebrow ? <Eyebrow>{about.eyebrow}</Eyebrow> : null}

          <p className="mt-6 font-display text-2xl leading-[1.28] text-text-heading">
            {about.statement}
          </p>

          <div className="my-9 h-0.5 w-14 bg-line-strong" />

          <p className="type-body measure text-text-body">{about.body}</p>

          {about.cta?.label && about.cta?.href ? (
            <div className="mt-7">
              <Button href={about.cta.href} variant="ghost">
                {about.cta.label}
              </Button>
            </div>
          ) : null}
        </div>

        <div className="border-t border-line-hairline pt-5">
          <div className="type-label tracking-[0.14em] text-text-muted">
            {about.recordLabel}
          </div>
          {stats.length ? (
            <div className="mt-6">
              <StatBlock stats={stats} columns={2} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
