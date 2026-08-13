/**
 * Ported from components/editorial/StatBlock.jsx.
 *
 * The 30+ / 20+ / 4 / 2013 figure row. The first cell carries no left border
 * and no left padding, so the block starts flush with the column edge.
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

  return (
    <div
      className={['grid border-t border-solid', line, className].filter(Boolean).join(' ')}
      style={{gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`}}
    >
      {stats.map((stat, i) => (
        <div
          key={`${stat.label}-${i}`}
          className={[
            'py-6 pr-6',
            i === 0 ? 'pl-0' : `pl-6 border-l border-solid ${line}`,
          ].join(' ')}
        >
          <div
            className={[
              'font-display text-3xl leading-[1.05] tabular-nums',
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
