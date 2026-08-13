import type {ReactNode} from 'react'

/**
 * Ported from components/editorial/NumberedItem.jsx.
 *
 * The 01 / 02 / 03 pattern, marked by a 3px gold rule on the top edge. The
 * number is never typed by an editor — callers derive it from position. See
 * docs/PLAN.md §5.4.
 */

export function NumberedItem({
  number,
  title,
  tone = 'light',
  children,
  className = '',
}: {
  number: string
  title: ReactNode
  tone?: 'light' | 'inverse'
  children?: ReactNode
  className?: string
}) {
  const inverse = tone === 'inverse'

  return (
    <div
      className={[
        'grid grid-cols-[auto_1fr] gap-6 pt-6',
        'border-t-[3px] border-solid border-line-accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'font-mono text-sm leading-[1.6] tabular-nums',
          inverse ? 'text-gold-400' : 'text-text-accent',
        ].join(' ')}
      >
        {number}
      </div>
      <div>
        <h3
          className={['type-h3', inverse ? 'text-text-on-inverse' : 'text-text-heading'].join(
            ' ',
          )}
        >
          {title}
        </h3>
        {children ? (
          <div
            className={[
              'type-body measure mt-3',
              inverse ? 'text-text-on-inverse-muted' : 'text-text-body',
            ].join(' ')}
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  )
}
