import {Eyebrow} from '@/components/ds'
import {SanityImage} from '@/components/SanityImage'
import type {HOME_PAGE_QUERY_RESULT} from '@/sanity/types.generated'

type Leadership = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>['leadership']>

/**
 * The Principal Architect — portrait on the left, name, role, biography and
 * credential rows on the right.
 *
 * Exact values: 96px above, an auto-fit grid at minmax(320px, 1fr) with a 64px
 * gap, a 520px portrait plate, the role line in mono at --text-sm and 0.08em in
 * gold, and credential rows on a minmax(0,1fr) / minmax(0,1.1fr) grid with 18px
 * of padding between hairlines.
 *
 * Gap #17: there is no substitute for a portrait of a specific person, so when
 * one has not been supplied the section renders as a single full-width text
 * column rather than showing an empty blue plate where a face should be.
 */
export function Leadership({leadership}: {leadership: Leadership}) {
  const hasPortrait = Boolean(leadership.portrait?.asset)
  const credentials = leadership.credentials ?? []

  return (
    <section className="wrap pt-24">
      <div
        className={
          hasPortrait
            ? 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-16'
            : ''
        }
      >
        {hasPortrait ? (
          <div className="relative h-[520px] bg-surface-plate">
            <SanityImage
              image={leadership.portrait}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : null}

        <div>
          {leadership.eyebrow ? <Eyebrow>{leadership.eyebrow}</Eyebrow> : null}

          <h2 className="type-h2 mt-[14px]">{leadership.name}</h2>

          <div className="mt-[10px] font-mono text-sm tracking-[0.08em] text-text-accent">
            {leadership.roleLine}
          </div>

          <p className="type-body measure mt-7 text-text-body">{leadership.bio}</p>

          {credentials.length ? (
            <div className="mt-10 border-t border-line-hairline">
              {credentials.map((credential) => (
                <div
                  key={credential?.label}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 border-b border-line-hairline py-[18px]"
                >
                  <div className="type-label text-text-muted">{credential?.label}</div>
                  <div className="type-body-sm text-text-body">{credential?.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
