import {Eyebrow} from '@/components/ds'

import {SheetMarker} from './SheetMarker'

/**
 * The masthead Services, Construction, Designs and Contact all open with:
 * eyebrow, h1 and sheet marker sharing a baseline over a 2px --line-strong
 * rule, with the introduction below it.
 *
 * Exact values from the design: 72px above, 28px between the heading block and
 * the rule, a 40px gap, and 32px from the rule to the introduction.
 *
 * `titleWidth` is the one thing that varies — the design caps each heading at a
 * different character count so it breaks where the designer wanted it to.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  titleWidth = '22ch',
}: {
  eyebrow: string
  title: string
  intro?: string | null
  titleWidth?: string
}) {
  return (
    <section className="wrap pt-18">
      <div className="flex flex-wrap items-end justify-between gap-10 border-b-2 border-line-strong pb-7">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="type-h1 mt-4" style={{maxWidth: titleWidth}}>
            {title}
          </h1>
        </div>
        <SheetMarker />
      </div>

      {intro ? (
        <p className="type-body-lg measure mt-8 text-text-body">{intro}</p>
      ) : null}
    </section>
  )
}
