import Link from 'next/link'

import {Button, Logo} from '@/components/ds'
import type {NavItem} from '@/content/site'

import {MobileMenu} from './MobileMenu'
import {SiteNav} from './SiteNav'

/**
 * The sticky header. Ported from the <header> in `Bejewelled Website.dc.html`.
 *
 * Exact values: sticky at top, --paper-100 ground, --shadow-inset-rule as the
 * bottom hairline, the 1240px column with 56px gutters, 76px minimum height,
 * 8px of vertical padding, 24px gap, a 48px lockup, and a 20px gap between the
 * phone number and the small primary button.
 *
 * Header height is 76px per the design file, not the 72/56px the design system
 * readme quotes — the artefact wins (gap #10). The readme's scroll-condensed
 * state is dropped with it: the design has no such behaviour.
 *
 * Below 1024px the nav, phone and button give way to the MobileMenu trigger.
 * The design's own header is a plain justify-between row, which pushes the nav
 * hard up against the lockup and leaves a wide gap before the phone number. The
 * three-part row below keeps the lockup and the phone/button group at their
 * natural widths and centres the nav in whatever is left, which is what the
 * design's proportions read as. Gap #01 — the design is desktop-only, so the
 * breakpoint is ours: 1024px, because the five nav labels plus the lockup and
 * the action group do not fit inside the 56px gutters below that and the row
 * wrapped to two lines.
 */
export function SiteHeader({
  brandName,
  nav,
  phone,
}: {
  brandName: string
  nav: NavItem[]
  phone: string
}) {
  return (
    <header className="sticky top-0 z-40 bg-paper-100 shadow-inset-rule">
      <div className="wrap flex min-h-[76px] items-center gap-6 py-2">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${brandName} — home`}
        >
          <Logo variant="lockup" height={48} priority />
        </Link>

        <SiteNav items={nav} />

        <div className="ml-auto hidden shrink-0 items-center gap-5 lg:flex">
          {/* The design renders this as a <span>. A tel: link is identical at
              rest and saves a phone user transcribing the number by hand. */}
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="font-mono text-xs tracking-[0.08em] whitespace-nowrap text-text-muted transition-control hover:text-text-accent"
          >
            {phone}
          </a>
          <Button href="/contact" size="sm" variant="primary">
            Get in touch
          </Button>
        </div>

        <MobileMenu items={nav} phone={phone} />
      </div>
    </header>
  )
}
