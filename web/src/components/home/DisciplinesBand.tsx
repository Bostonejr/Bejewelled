import Link from 'next/link'

import {DeepBand} from '@/components/sections'
import {Button, NumberedItem, SectionHeading} from '@/components/ds'
import {twoDigit} from '@/lib/numbering'
import type {HOME_PAGE_QUERY_RESULT} from '@/sanity/types.generated'

type Disciplines = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>['disciplines']>

/**
 * The four core disciplines on the deep blue field.
 *
 * Exact values: heading and intro on an auto-fit grid at minmax(320px, 1fr)
 * with a 64px gap aligned to their baselines, the items 64px below on the same
 * grid with a 56px gap, and the buttons 64px below that.
 *
 * The second action is a link with a translucent paper underline, not a second
 * button — the design gives a band one button and one link, never two buttons.
 *
 * Numbers come from position, never from a field (docs/PLAN.md §5.4).
 */
export function DisciplinesBand({disciplines}: {disciplines: Disciplines}) {
  const items = disciplines.items ?? []

  return (
    <DeepBand>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-end gap-16">
        <SectionHeading
          eyebrow={disciplines.eyebrow}
          title={disciplines.title}
          tone="inverse"
        />
        <p className="type-body-lg max-w-[56ch] pb-1.5 text-text-on-deep-muted">
          {disciplines.intro}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-14">
        {items.map((item, index) => (
          <NumberedItem
            key={item?.title ?? index}
            number={twoDigit(index)}
            title={item?.title}
            tone="inverse"
          >
            {item?.body}
          </NumberedItem>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-3">
        {disciplines.cta?.label && disciplines.cta?.href ? (
          <Button href={disciplines.cta.href} variant="accent">
            {disciplines.cta.label}
          </Button>
        ) : null}

        {disciplines.secondaryLink?.label && disciplines.secondaryLink?.href ? (
          <Link
            href={disciplines.secondaryLink.href}
            className="type-eyebrow inline-flex items-center border-b border-b-[rgba(246,244,239,.45)] px-1 py-3 text-paper-100 transition-control hover:border-b-paper-100"
          >
            {disciplines.secondaryLink.label}
          </Link>
        ) : null}
      </div>
    </DeepBand>
  )
}
