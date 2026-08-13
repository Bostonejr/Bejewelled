'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {isActiveRoute, type NavItem} from '@/content/site'

/**
 * The desktop nav. Ported from the <nav> inside the design's <header>.
 *
 * Exact values: 28px gap, --type-eyebrow at --tracking-eyebrow, uppercase, 5px
 * padding below the text, and a 2px bottom border that is --line-accent (gold)
 * when active and transparent when idle — so the row never shifts by a pixel
 * between states.
 *
 * One addition the design does not specify: idle links lift from --text-muted
 * to --text-heading on hover. The design file has no nav hover state at all,
 * which leaves the primary navigation with no pointer feedback. This borrows
 * the active state's own colour rather than introducing a device, and the gold
 * rule still belongs to the active item alone.
 */
export function SiteNav({items}: {items: NavItem[]}) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="hidden min-w-0 flex-wrap items-center gap-7 md:flex"
    >
      {items.map((item) => {
        const active = isActiveRoute(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={[
              'type-eyebrow transition-control border-b-2 pb-[5px]',
              active
                ? 'border-line-accent text-text-heading'
                : 'border-transparent text-text-muted hover:text-text-heading',
            ].join(' ')}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
