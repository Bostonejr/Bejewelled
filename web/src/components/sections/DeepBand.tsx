import type {ReactNode} from 'react'

/**
 * The deep blue field — Home's disciplines, Services' construction pointer,
 * Construction's four stages.
 *
 * Blue is a field and annotation colour in this system and never an
 * interactive one: the only accent inside this band is gold. Eyebrows on it are
 * gold-200 rather than a mid gold, which is a contrast requirement, not taste
 * — the mid golds miss 4.5:1 at 12px on --surface-deep.
 *
 * Exact values: 96px above, 96px of vertical padding, the standard column
 * inside.
 */
export function DeepBand({children}: {children: ReactNode}) {
  return (
    <section className="mt-24 bg-surface-deep py-24">
      <div className="wrap">{children}</div>
    </section>
  )
}
