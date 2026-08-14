'use client'

import {useCallback, useRef, useState} from 'react'

import {ImageCaption, SanityImage} from '@/components/SanityImage'
import type {SanityImageWithMeta} from '@/sanity/image'

import {Lightbox} from './Lightbox'

type PlateProps = {
  figure?: SanityImageWithMeta | null
  index: number
  height: string
  sizes: string
  priority?: boolean
  expandLabel: string
  /** Total plates, so the button can say which of them this is. */
  count: number
  triggerRef: (node: HTMLButtonElement | null) => void
  onOpen: (index: number) => void
}

/**
 * One plate. Declared at module scope, not inside ProjectPlates: a component
 * defined during render is a new type on every render, so React unmounts and
 * remounts the subtree each time — which would tear down every <img> and
 * restart the loads on each open and close of the expanded view.
 */
function Plate({
  figure,
  index,
  height,
  sizes,
  priority = false,
  expandLabel,
  count,
  triggerRef,
  onOpen,
}: PlateProps) {
  const hasImage = Boolean(figure?.asset?._id ?? figure?.asset?._ref)

  // Gap #17 — four photographs have no source yet. An empty plate is the
  // design's own placeholder and there is nothing to expand, so it stays a
  // div: a button that opens an empty dialog is a worse answer than no button.
  if (!hasImage) {
    return <div className={`relative ${height} bg-surface-plate`} />
  }

  /**
   * "Expand photograph 3 of 12 — Gaze". The position leads because every
   * photograph a project owns currently carries the project name as its alt
   * text, so a dozen buttons all reading "Expand photograph: Gaze" would give
   * a screen reader nothing to tell them apart. Caption first when there is
   * one, since a real caption does distinguish.
   */
  const describedBy = figure?.caption ?? figure?.alt
  const position = count > 1 ? ` ${index + 1} of ${count}` : ''
  const label = `${expandLabel}${position}${describedBy ? ` — ${describedBy}` : ''}`

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={label}
      className={[
        `relative block w-full ${height} cursor-pointer overflow-hidden`,
        'border border-transparent bg-surface-plate transition-card',
        'hover:border-line-accent hover:shadow-sm',
      ].join(' ')}
    >
      <SanityImage image={figure} sizes={sizes} priority={priority} />
    </button>
  )
}

/**
 * A project's photographs: the 560px primary plate, the two 320px secondaries
 * beside it, and the rest of the folder below (gap #06).
 *
 * The layout is the design's, unchanged — this file exists because every plate
 * is now a button that opens the expanded view, and that needs state. The
 * plates were previously inline in the route; the sections, their padding and
 * their classes are carried over exactly, so nothing moves by a pixel.
 *
 * The affordance is the design system's own: an interactive Card is
 * `hover:border-line-accent hover:shadow-sm` over `transition-card`, so a plate
 * that can be opened picks up the same gold hairline. Gold stays the only
 * interactive colour and no new device is introduced. The plates carry a
 * transparent border at rest so the hover state cannot shift the layout.
 *
 * One ordered list backs the whole thing — primary first, then the folder in
 * order — so the expanded view's "03 / 12" counts photographs of the project,
 * not photographs of whichever block was clicked.
 */
export function ProjectPlates({
  mainImage,
  gallery,
  expandLabel = 'Expand photograph',
}: {
  mainImage?: SanityImageWithMeta | null
  gallery: SanityImageWithMeta[]
  expandLabel?: string
}) {
  const figures: SanityImageWithMeta[] = [
    ...(mainImage ? [mainImage] : []),
    ...gallery,
  ]

  const [openAt, setOpenAt] = useState<number | null>(null)
  const triggersRef = useRef(new Map<number, HTMLButtonElement>())

  const close = useCallback(() => {
    // Return focus to the plate that was opened, so a keyboard user lands back
    // where they were rather than at the top of the document.
    const trigger = openAt != null ? triggersRef.current.get(openAt) : undefined
    setOpenAt(null)
    trigger?.focus()
  }, [openAt])

  const registerTrigger = (index: number) => (node: HTMLButtonElement | null) => {
    if (node) triggersRef.current.set(index, node)
    else triggersRef.current.delete(index)
  }

  const plate = (
    props: Omit<PlateProps, 'onOpen' | 'triggerRef' | 'expandLabel' | 'count'>,
  ) => (
    <Plate
      {...props}
      expandLabel={expandLabel}
      count={figures.length}
      triggerRef={registerTrigger(props.index)}
      onOpen={setOpenAt}
    />
  )

  const secondaries = gallery.slice(0, 2)
  const remainder = gallery.slice(2)
  // The primary plate occupies index 0 whenever it exists, so the folder's
  // first photograph is index 1 — not 0 — in the expanded view's order.
  const galleryOffset = mainImage ? 1 : 0

  return (
    <>
      <section className="wrap pt-14">
        {plate({
          figure: mainImage,
          index: 0,
          height: 'h-[560px]',
          sizes: '(max-width: 1240px) 100vw, 1128px',
          priority: true,
        })}
        <ImageCaption caption={mainImage?.caption} />

        {secondaries.length ? (
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {secondaries.map((figure, i) => (
              <div key={figure?.asset?._id ?? i}>
                {plate({
                  figure,
                  index: galleryOffset + i,
                  height: 'h-[320px]',
                  sizes: '(max-width: 768px) 100vw, 50vw',
                })}
                <ImageCaption caption={figure?.caption} />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* Gap #06 — the folder usually holds more than the design has slots for.
          Same plate ground, same square corners, same mono caption below the
          frame. The design extended, not reinterpreted. */}
      {remainder.length ? (
        <section className="wrap pt-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {remainder.map((figure, i) => (
              <div key={figure?.asset?._id ?? i}>
                {plate({
                  figure,
                  index: galleryOffset + 2 + i,
                  height: 'h-[320px]',
                  sizes: '(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 360px',
                })}
                <ImageCaption caption={figure?.caption} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {openAt != null ? (
        <Lightbox
          figures={figures}
          index={openAt}
          onIndexChange={setOpenAt}
          onClose={close}
        />
      ) : null}
    </>
  )
}
