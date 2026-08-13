import {Button, Eyebrow} from '@/components/ds'
import {SanityImage} from '@/components/SanityImage'
import type {HOME_PAGE_QUERY_RESULT} from '@/sanity/types.generated'

type Hero = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>['hero']>

/**
 * The split hero. Ported from the first <section> of the Home screen.
 *
 * Exact values: an auto-fit grid at minmax(min(100%, 420px), 1fr) so the two
 * halves stack below roughly 840px, 640px minimum height, 88px above and 40px
 * below the copy, a hairline along the bottom edge, and a heading that scales
 * on clamp(52px, 6.4vw, 88px) at 1.02 line-height.
 *
 * The blueprint grid behind the copy is two 1px linear-gradients on a 56px
 * pitch at 4.5% ink — the drafting-paper reference the whole design is built
 * on. It stays an inline style: as a Tailwind arbitrary value it would be a
 * hundred unreadable characters, and it is one fixed decoration, not a variant.
 *
 * With no photograph the right half renders as a --surface-plate field, which
 * is the design's own empty state (docs/PLAN.md gap #17).
 */
export function Hero({hero}: {hero: Hero}) {
  const buttons = hero.ctas ?? []

  return (
    <section className="grid min-h-[640px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] border-b border-line-hairline">
      <div
        className="flex flex-col justify-center px-6 pt-22 pb-10 md:px-14"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(26,26,26,.045) 1px,transparent 1px),linear-gradient(to bottom,rgba(26,26,26,.045) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      >
        <div className="max-w-[640px]">
          {hero.eyebrow ? <Eyebrow tone="muted">{hero.eyebrow}</Eyebrow> : null}

          <h1 className="mt-[26px] font-display font-normal text-[clamp(52px,6.4vw,88px)] leading-[1.02] tracking-tight text-ink-900">
            {hero.title}
          </h1>

          {hero.body ? (
            <p className="type-body-lg mt-7 max-w-[54ch] text-text-body">{hero.body}</p>
          ) : null}

          {buttons.length ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {buttons.map((button, index) =>
                button?.label && button?.href ? (
                  <Button
                    key={button.href}
                    href={button.href}
                    size="lg"
                    variant={index === 0 ? 'primary' : 'secondary'}
                  >
                    {button.label}
                  </Button>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative min-h-[640px] bg-surface-plate">
        <SanityImage
          image={hero.image}
          priority
          sizes="(max-width: 840px) 100vw, 50vw"
        />
      </div>
    </section>
  )
}
