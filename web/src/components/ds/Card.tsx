import Link from 'next/link'
import type {ReactNode} from 'react'

/**
 * Ported from components/core/Card.jsx.
 *
 * The border does the work — no shadow at rest. Hover takes the border to gold
 * and introduces --shadow-sm. A featured card gains a 3px gold rule on its top
 * edge, never on the left edge alone.
 */

type Props = {
  featured?: boolean
  interactive?: boolean
  /** Tailwind padding utility. The design uses p-0 for image cards, p-8 (32px) otherwise. */
  padding?: string
  href?: string
  children: ReactNode
  className?: string
}

const base = [
  'block bg-surface-card rounded-md',
  'border border-solid border-line-hairline',
  'shadow-none transition-card',
].join(' ')

export function Card({
  featured = false,
  interactive = false,
  padding = 'p-8',
  href,
  children,
  className = '',
}: Props) {
  const classes = [
    base,
    padding,
    featured ? 'border-t-[3px] border-t-line-accent' : '',
    interactive ? 'cursor-pointer hover:border-line-accent hover:shadow-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
