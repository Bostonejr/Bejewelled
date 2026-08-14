import {Button} from '@/components/ds'
import type {SiteSettings} from '@/content/site'

/**
 * The closing CTA band, shared by every screen except Contact. Ported from the
 * `showCta` section in `Bejewelled Website.dc.html`.
 *
 * Exact values: 96px above, a 2px --line-strong top rule, an auto-fit grid at
 * minmax(280px, 1fr) with a 40px gap, 56px of vertical padding, --type-h2, and
 * body copy at --text-muted 14px below the heading.
 *
 * The button is a direct grid child in the design, as it is here — grid items
 * are blockified, so the large primary button fills its column rather than
 * shrinking to its label. That is the design's own render, not a liberty.
 *
 * The design shows this band on every route but Contact. Pages opt in by
 * rendering it, rather than the layout guessing from the pathname.
 */
export function CtaBand({ctaBand}: {ctaBand: SiteSettings['ctaBand']}) {
  return (
    <section className="wrap pt-24">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-center gap-10 border-t-2 border-line-strong py-14">
        <div>
          <h2 className="type-h2">{ctaBand.heading}</h2>
          <p className="type-body mt-[14px] text-text-muted">{ctaBand.body}</p>
        </div>
        <Button href={ctaBand.button.href} variant="primary" size="lg">
          {ctaBand.button.label}
        </Button>
      </div>
    </section>
  )
}
