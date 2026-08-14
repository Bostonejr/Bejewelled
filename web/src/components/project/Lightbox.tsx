'use client'

import Image from 'next/image'
import {useCallback, useEffect, useRef} from 'react'

import {twoDigit} from '@/lib/numbering'
import {urlFor, type SanityImageWithMeta} from '@/sanity/image'

/**
 * The expanded view for a project's photographs.
 *
 * Gap #01 again — the design has no lightbox, so nothing here is transcribed.
 * Every value is taken from the design system's own Dialog
 * (`components/feedback/Dialog.jsx` in `_ds_bundle.js`) so the expanded view is
 * the same object the system already describes:
 *
 *   · the veil is --overlay-veil over --blur-veil at z-100, dismissed by a
 *     click, exactly as Dialog does it;
 *   · the frame is --surface-raised on a --line-hairline border with a
 *     --border-accent gold top rule, --radius-md and --shadow-lg — Dialog's
 *     panel, holding a photograph instead of prose;
 *   · the caption stays BELOW the frame in mono, never over the image, which
 *     is the rule everywhere else on the site;
 *   · the counter is the brand's two-digit numbering from lib/numbering, so an
 *     expanded plate is numbered by the same system as everything else.
 *
 * Dialog's close control is an IconButton, and this design system ships no
 * icons the rest of the site uses — the mobile menu already settled that by
 * drawing its own hairline trigger and a text "Close" in --text-accent. The
 * same two devices are reused here rather than introducing a third.
 *
 * Motion law: opacity only. The design permits a fade plus a small rise and
 * nothing else, so the expanded view fades — it does not zoom out of the
 * thumbnail, and the image never scales. motion.css zeroes the duration under
 * prefers-reduced-motion, so referencing the token gets that for free.
 *
 * The photograph is `object-contain`, not `object-cover`: the plates on the
 * page are fixed-height frames showing the editor's hotspot crop, and the
 * entire point of expanding one is to see the whole photograph.
 */
export function Lightbox({
  figures,
  index,
  onIndexChange,
  onClose,
}: {
  figures: SanityImageWithMeta[]
  index: number
  onIndexChange: (next: number) => void
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const count = figures.length
  const figure = figures[index]

  const step = useCallback(
    (delta: number) => onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange],
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (count > 1 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault()
        step(event.key === 'ArrowRight' ? 1 : -1)
        return
      }
      if (event.key !== 'Tab') return

      // Keep Tab inside the dialog. Same approach as the mobile menu sheet.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]',
      )
      if (!focusable?.length) return

      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, step, count])

  // Focus moves into the dialog on open, not on every step — moving it again
  // when the photograph changes would drag a screen reader back to the top of
  // the dialog mid-sentence.
  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('button')?.focus()
  }, [])

  const assetId = figure?.asset?._id ?? figure?.asset?._ref
  const dimensions = figure?.asset?.metadata?.dimensions
  const lqip = figure?.asset?.metadata?.lqip ?? undefined

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Expanded photograph"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--overlay-veil)] p-6 [backdrop-filter:var(--blur-veil)]"
    >
      <div
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full w-full max-w-[1128px] flex-col rounded-md border border-line-hairline border-t-[length:var(--border-accent)] border-t-line-accent bg-surface-raised shadow-lg"
      >
        <div className="flex items-center justify-between gap-6 px-5 py-4">
          <div className="font-mono text-2xs tracking-[0.14em] text-text-muted">
            {count > 1 ? `${twoDigit(index)} / ${twoDigit(count - 1)}` : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="type-eyebrow cursor-pointer text-text-accent"
          >
            Close
          </button>
        </div>

        {/* --surface-sunken, not --surface-plate. The plate blue is the ground
            an unloaded photograph shows on the page, but here it becomes the
            letterbox either side of a contained image, and a blueprint-blue
            bar against a photograph reads as part of the picture. The sunken
            paper tone is what the system already uses for a recessed area. */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-surface-sunken">
          {assetId ? (
            <Image
              // Deliberately not the hotspot crop: `fit('max')` from urlFor
              // plus object-contain shows the whole frame the editor uploaded.
              src={urlFor({
                ...figure,
                asset: {_ref: assetId, _type: 'reference'},
              })
                .width(2000)
                .url()}
              alt={figure?.alt ?? ''}
              width={dimensions?.width ?? 1600}
              height={dimensions?.height ?? 1200}
              placeholder={lqip ? 'blur' : 'empty'}
              blurDataURL={lqip}
              sizes="(max-width: 1180px) 100vw, 1128px"
              /* The cap is the viewport less the overlay's 24px padding and
                 the two control rows — measured rather than a round 70vh, so a
                 tall screen uses its height and a short one still keeps both
                 rows on screen. The width is capped at the photograph's own
                 pixels as well: object-contain scales up as readily as down,
                 and an enlarged photograph is a worse expanded view than a
                 small one. (`w-auto` cannot do that job — as a flex item it
                 resolves to zero and the image disappears.) */
              style={{maxWidth: dimensions?.width ?? undefined}}
              className="mx-auto h-auto max-h-[calc(100vh-9rem)] w-full object-contain"
            />
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-6 px-5 py-4">
          <div className="font-mono text-2xs uppercase tracking-[0.12em] text-text-muted">
            {figure?.caption ?? ''}
          </div>

          {count > 1 ? (
            <div className="flex shrink-0 items-center gap-5">
              <button
                type="button"
                onClick={() => step(-1)}
                className="type-eyebrow cursor-pointer whitespace-nowrap text-text-muted transition-control hover:text-text-heading"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="type-eyebrow cursor-pointer whitespace-nowrap text-text-muted transition-control hover:text-text-heading"
              >
                Next →
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
