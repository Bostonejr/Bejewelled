import Link from 'next/link'

import {Logo} from '@/components/ds'
import type {SiteSettings} from '@/content/site'

/**
 * The ink footer. Ported from the <footer> in `Bejewelled Website.dc.html`.
 *
 * Exact values: --surface-inverse ground, 128px top margin, 96px/32px vertical
 * padding, a four-column auto-fit grid at minmax(220px, 1fr) with a 56px gap,
 * a 56px gap before the --line-inverse rule, a 66px dark lockup, gold-200
 * column labels at 0.14em tracking, and a mono bottom row at --text-2xs.
 *
 * The column labels are gold-200 rather than a mid gold because they sit on an
 * ink field: per the design system readme, the mid golds miss 4.5:1 at 12px.
 *
 * One addition: footer links lighten to --text-on-inverse on hover. The design
 * gives them no hover state, which leaves a column of links with no pointer
 * feedback; this reuses the colour already in the column rather than adding
 * one.
 *
 * Gap #20: the registration line on the right of the bottom row is behind
 * `showRegistrationLine`, off by default. Dropped, the row's justify-between
 * leaves the copyright alone on the left, which is where the design already
 * puts it — no layout of its own is needed for the switched-off state.
 */
export function SiteFooter({settings}: {settings: SiteSettings}) {
  const {
    legalName,
    footerStatement,
    footerColumns,
    officeColumnTitle,
    addressLines,
    digitalAddress,
    phones,
    showRegistrationLine,
    registrationLine,
  } = settings

  return (
    <footer className="mt-32 bg-surface-inverse pt-24 pb-8 text-text-on-inverse">
      <div className="wrap">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-14 border-b border-line-inverse pb-14">
          <div>
            <Logo variant="lockup" on="dark" height={66} />
            <p className="type-body-sm mt-6 max-w-[34ch] text-text-on-inverse-muted">
              {footerStatement}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="type-label tracking-[0.14em] text-gold-200">
                {column.title}
              </div>
              <div className="mt-[18px] flex flex-col gap-3 type-body-sm text-text-on-inverse-muted">
                {column.items.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="transition-control hover:text-text-on-inverse"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label}>{item.label}</span>
                  ),
                )}
              </div>
            </div>
          ))}

          <div>
            <div className="type-label tracking-[0.14em] text-gold-200">
              {officeColumnTitle}
            </div>
            <address className="type-body-sm mt-[18px] leading-[1.9] text-text-on-inverse-muted not-italic">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block font-mono text-xs">
                Digital Address: {digitalAddress}
              </span>
              <span className="block">{phones.join(' • ')}</span>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-6 font-mono text-2xs tracking-[0.1em] text-ink-300">
          <span>
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </span>
          {showRegistrationLine ? <span>{registrationLine}</span> : null}
        </div>
      </div>
    </footer>
  )
}
