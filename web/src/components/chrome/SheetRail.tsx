'use client'

import {usePathname} from 'next/navigation'

import {sheetNumber} from '@/content/site'

/**
 * The fixed 44px left rail — the device that frames every screen as a drawing
 * sheet. Ported from the <aside> at the top of `Bejewelled Website.dc.html`.
 *
 * Exact values from the design: 44px wide, --paper-050 ground, 1px
 * --line-hairline right edge, 18px vertical padding, a 7px gold square at the
 * top, the vertical rail label centred, and the sheet number at the foot.
 *
 * Client component for one reason: the sheet number is derived from the route.
 *
 * Gap #01 (docs/PLAN.md) — the design is desktop-only and a 44px rail would eat
 * a phone screen. Below 768px it collapses to a 6px gold bar across the top:
 * the same mark, the same colour, no new visual language. The label and sheet
 * number are decorative, so they simply go.
 */
export function SheetRail({label}: {label: string}) {
  const sheetNo = sheetNumber(usePathname())

  return (
    <>
      {/* Mobile: the rail reduced to its gold mark. */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-1.5 bg-gold-500 md:hidden"
      />

      {/* Desktop: the full sheet rail. Decorative — the label repeats the
          brand name and the sheet number is a drawing convention, so neither
          belongs in the accessibility tree. */}
      <aside
        aria-hidden
        className="fixed inset-y-0 left-0 z-[60] hidden w-11 flex-col items-center justify-between border-r border-line-hairline bg-paper-050 py-[18px] md:flex"
      >
        <div className="h-[7px] w-[7px] bg-gold-500" />

        <div className="rotate-180 font-mono text-[10px] uppercase tracking-[0.24em] whitespace-nowrap text-ink-300 [writing-mode:vertical-rl]">
          {label}
        </div>

        <div className="font-mono text-[10px] tracking-[0.14em] text-text-accent">
          {sheetNo}
        </div>
      </aside>
    </>
  )
}
