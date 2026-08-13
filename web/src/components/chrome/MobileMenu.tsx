'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useRef, useState} from 'react'

import {Button} from '@/components/ds'
import {isActiveRoute, type NavItem} from '@/content/site'

/**
 * The mobile navigation sheet.
 *
 * Gap #01 (docs/PLAN.md): the design has no mobile state, so nothing here is
 * transcribed — it is derived. Every part comes from something the design
 * system already owns:
 *
 *   · the veil is --overlay-veil over --blur-veil, the pair the design system
 *     readme specifies for exactly this;
 *   · the rows are the design's own numbered-list device (two-digit numbers,
 *     hairline separators) used on the capability and credential lists;
 *   · the active row carries the gold rule the desktop nav gives the active
 *     item, moved to the left edge because the rows are stacked;
 *   · the trigger is drawn from --line-strong hairlines rather than an icon
 *     font, since the design uses no icons anywhere.
 *
 * Motion law: fade only. The design permits a fade plus a small rise and
 * nothing else — no slide, no scale — and every duration zeroes under
 * prefers-reduced-motion via motion.css.
 */
export function MobileMenu({
  items,
  phone,
  ctaLabel = 'Get in touch',
  ctaHref = '/contact',
}: {
  items: NavItem[]
  phone: string
  ctaLabel?: string
  ctaHref?: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  // Navigating closes the sheet. Comparing on pathname rather than wiring
  // onClick to each link also covers back/forward.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // While the sheet is open: lock the page behind it, close on Escape, and
  // keep Tab inside the panel.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        triggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px]"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden className="block h-px w-5 bg-line-strong" />
        <span aria-hidden className="block h-px w-5 bg-line-strong" />
        <span aria-hidden className="block h-px w-5 bg-line-strong" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-[var(--overlay-veil)] [backdrop-filter:var(--blur-veil)]"
          />

          <div
            ref={panelRef}
            id="mobile-menu"
            className="absolute inset-x-0 top-0 border-b border-line-hairline bg-paper-100 px-6 pt-6 pb-8 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-2xs uppercase tracking-[0.14em] text-text-muted">
                Menu
              </div>
              <button
                type="button"
                onClick={close}
                className="type-eyebrow cursor-pointer text-text-accent"
              >
                Close
              </button>
            </div>

            <div className="mt-6 border-t border-line-hairline">
              {items.map((item, index) => {
                const active = isActiveRoute(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'grid grid-cols-[40px_minmax(0,1fr)] items-baseline gap-6 border-b border-line-hairline py-[18px] pl-3 transition-control',
                      active
                        ? 'border-l-2 border-l-line-accent text-text-heading'
                        : 'border-l-2 border-l-transparent text-text-body',
                    ].join(' ')}
                  >
                    <span className="font-mono text-xs tracking-[0.12em] text-text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-md">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href={ctaHref} size="sm" variant="primary">
                {ctaLabel}
              </Button>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="font-mono text-xs tracking-[0.08em] whitespace-nowrap text-text-muted transition-control hover:text-text-accent"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
