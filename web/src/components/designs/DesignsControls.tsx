'use client'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useCallback} from 'react'

import {Tabs, Tag} from '@/components/ds'

/**
 * The filter chips and the Plates/Index toggle above the designs grid.
 *
 * The design held both in React state. They live in the URL here instead, so a
 * filtered view can be linked to, the back button works, and — the reason that
 * matters most for this site — the grid itself stays a server component. Only
 * these two controls ship JavaScript.
 *
 * The Tag and Tabs primitives are used exactly as ported, onClick and all; the
 * handler pushes a query string rather than calling setState. Nothing about
 * their appearance or behaviour changes.
 *
 * Filtering to a sector that is already active clears the filter, which is what
 * pressing a pressed toggle should do.
 */
export function DesignsControls({
  sectors,
  allLabel,
  activeSector,
  view,
}: {
  sectors: {title: string; slug: string}[]
  allLabel: string
  activeSector: string | null
  view: 'plates' | 'index'
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const push = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams)
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) params.delete(key)
        else params.set(key, value)
      }
      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname, {scroll: false})
    },
    [pathname, router, searchParams],
  )

  return (
    <div className="mt-14 flex flex-wrap items-end justify-between gap-8">
      <div className="flex flex-wrap gap-2.5">
        <Tag selected={activeSector === null} onClick={() => push({sector: null})}>
          {allLabel}
        </Tag>

        {sectors.map((sector) => (
          <Tag
            key={sector.slug}
            selected={activeSector === sector.slug}
            onClick={() =>
              push({sector: activeSector === sector.slug ? null : sector.slug})
            }
          >
            {sector.title}
          </Tag>
        ))}
      </div>

      <Tabs
        tabs={[
          {value: 'plates', label: 'Plates'},
          {value: 'index', label: 'Index'},
        ]}
        value={view}
        onChange={(next) => push({view: next})}
      />
    </div>
  )
}
