import Link from 'next/link'

import {Badge} from './Badge'

/**
 * Ported from components/editorial/ProjectRow.jsx — the index view of the
 * designs page.
 *
 * Gap #07 in docs/PLAN.md: the original was a clickable <div>, unreachable by
 * keyboard. This is a link.
 *
 * Gap #01: the design's fixed 48px/1fr/260px/150px grid has no mobile state.
 * Below 768px the record stacks, which keeps the hairline rhythm intact
 * without inventing a new layout.
 */

export function ProjectRow({
  number,
  client,
  scope,
  location,
  status = 'Completed',
  href,
}: {
  number: string
  client: string
  scope?: string
  location?: string
  status?: string
  href: string
}) {
  return (
    <Link
      href={href}
      className={[
        'grid gap-6 items-start py-6',
        'grid-cols-[32px_1fr] md:grid-cols-[48px_1fr_260px_150px]',
        'border-b border-solid border-line-hairline',
        'bg-transparent hover:bg-paper-050',
        '[transition:background-color_var(--duration-fast)_var(--ease-standard)]',
      ].join(' ')}
    >
      <div className="font-mono text-sm tabular-nums text-text-accent">{number}</div>

      <div>
        <div className="font-display text-md text-text-heading">{client}</div>
        {scope ? (
          <div className="type-body-sm mt-1.5 text-text-muted">{scope}</div>
        ) : null}
      </div>

      {location ? (
        <div className="col-start-2 md:col-start-auto">
          <div className="type-label tracking-[0.1em] text-text-muted">Location</div>
          <div className="type-body-sm mt-1 text-text-body">{location}</div>
        </div>
      ) : (
        <div className="hidden md:block" />
      )}

      <div className="col-start-2 md:col-start-auto">
        <Badge tone={status === 'Completed' ? 'success' : 'accent'}>{status}</Badge>
      </div>
    </Link>
  )
}
