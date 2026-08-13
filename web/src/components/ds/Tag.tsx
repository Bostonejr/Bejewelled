'use client'

import type {ReactNode} from 'react'

/**
 * Ported from components/core/Tag.jsx.
 *
 * Gap #07 in docs/PLAN.md: the original was a <span role="button">, which is
 * not focusable and not operable by keyboard. This is a real <button>.
 */

export function Tag({
  selected = false,
  onClick,
  children,
  className = '',
}: {
  selected?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'inline-flex items-center px-3 py-1.5 rounded-md border border-solid',
        'font-text text-xs font-medium tracking-wide uppercase',
        'cursor-pointer transition-control',
        selected
          ? 'border-line-strong bg-ink-900 text-text-on-inverse'
          : 'border-line-rule bg-transparent text-text-body hover:border-line-accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
