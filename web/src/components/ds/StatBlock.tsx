import type {CSSProperties} from 'react'

/**
 * Ported from components/editorial/StatBlock.jsx.
 *
 * The 30+ / 20+ / 4 / 2013 figure row. The first cell carries no left border
 * and no left padding, so the block starts flush with the column edge.
 *
 * Two narrow-screen derivations (gap #01 — the design is desktop-only). Both
 * are inert at and above 640px, where the design's values are restored exactly:
 *
 *   · `columns` is a maximum, not a mandate. The design fixes two columns and
 *     that is right wherever two columns fit; at 320px they leave about 88px of
 *     text per cell, which is narrower than "2013" at --text-3xl. Below 400px
 *     the block runs in one column, where the full 42px figure fits with room
 *     to spare — so the type size is never touched. Stacked, the left rule and
 *     left indent come off every cell too: they divide columns, and there are
 *     no columns to divide.
 *   · A figure must never break across lines. The sitewide
 *     `overflow-wrap: break-word` in globals.css was breaking "2013" to
 *     "201 / 3" — a wrong number, not merely an ugly one — so the figure opts
 *     back out with `overflow-wrap: normal`. That guard stays at every width:
 *     a number that does not fit should overhang visibly, not silently read as
 *     a different number.
 */

export type Stat = {value: string; label: string}

export function StatBlock({
  stats,
  tone = 'light',
  columns,
  className = '',
}: {
  stats: Stat[]
  tone?: 'light' | 'inverse'
  columns?: number
  className?: string
}) {
  const inverse = tone === 'inverse'
  const cols = columns || stats.length || 1
  const line = inverse ? 'border-line-inverse' : 'border-line-hairline'

  // Written out rather than composed, because Tailwind extracts class names
  // statically — `min-[400px]:${line}` would never be generated.
  const cellRule = inverse
    ? 'min-[400px]:border-l min-[400px]:border-solid min-[400px]:border-line-inverse min-[400px]:pl-6'
    : 'min-[400px]:border-l min-[400px]:border-solid min-[400px]:border-line-hairline min-[400px]:pl-6'

  return (
    <div
      className={[
        'grid grid-cols-1 border-t border-solid',
        'min-[400px]:[grid-template-columns:repeat(var(--stat-cols),minmax(0,1fr))]',
        line,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{'--stat-cols': cols} as CSSProperties}
    >
      {stats.map((stat, i) => (
        <div
          key={`${stat.label}-${i}`}
          className={[
            'py-6 pr-6 pl-0',
            i === 0 ? '' : cellRule,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div
            className={[
              'font-display text-3xl leading-[1.05] tabular-nums [overflow-wrap:normal]',
              inverse ? 'text-gold-400' : 'text-text-accent',
            ].join(' ')}
          >
            {stat.value}
          </div>
          <div
            className={[
              'type-label mt-3 tracking-[0.1em]',
              inverse ? 'text-text-on-inverse-muted' : 'text-text-muted',
            ].join(' ')}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
