'use client'

import {usePathname} from 'next/navigation'

import {SHEET_COUNT, sheetNumber} from '@/content/site'

/**
 * "Sheet 02 / 05" — the drawing marker at the top right of every inner page.
 *
 * Derived from the route rather than passed in, for the same reason the number
 * at the foot of the sheet rail is: the two are the same number, and a page
 * that hardcoded its own would eventually disagree with the rail.
 */
export function SheetMarker() {
  return (
    <div className="font-mono text-2xs uppercase tracking-[0.14em] whitespace-nowrap text-text-muted">
      Sheet {sheetNumber(usePathname())} / {SHEET_COUNT}
    </div>
  )
}
