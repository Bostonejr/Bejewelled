import Image from 'next/image'

import {urlFor, type SanityImageWithMeta} from '@/sanity/image'

/**
 * A Sanity image rendered through next/image, with the three things that
 * always have to travel with one on this site:
 *
 *   · the editor's hotspot, so a crop never decapitates a building;
 *   · the LQIP blur Sanity generates on upload, so a 3 MB exterior render
 *     resolves rather than pops;
 *   · a `sizes` hint, without which next/image serves the largest candidate to
 *     a phone.
 *
 * Slots in this design are fixed-height plates (640px hero, 560px project
 * primary, 320px secondaries, 280px map), so `fill` with an
 * `object-cover`/`object-position` pair is the honest fit — the frame is the
 * design's, the crop is the editor's.
 *
 * When there is no asset the component renders nothing and lets the caller's
 * --surface-plate ground show through. Four photographs have no source yet
 * (docs/PLAN.md gap #17), and an empty plate is the design's own placeholder.
 */
export function SanityImage({
  image,
  sizes,
  priority = false,
  className = '',
}: {
  image?: SanityImageWithMeta | null
  sizes: string
  priority?: boolean
  className?: string
}) {
  const assetId = image?.asset?._id ?? image?.asset?._ref
  if (!assetId) return null

  const hotspot = image?.hotspot
  const lqip = image?.asset?.metadata?.lqip ?? undefined

  return (
    <Image
      // The builder only needs an id to resolve a URL; hotspot and crop are
      // applied by the object form, so pass the whole image through.
      src={urlFor({...image, asset: {_ref: assetId, _type: 'reference'}}).url()}
      alt={image?.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip}
      className={['object-cover', className].filter(Boolean).join(' ')}
      style={
        hotspot?.x != null && hotspot?.y != null
          ? {objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`}
          : undefined
      }
    />
  )
}

/**
 * The mono caption that sits BELOW a frame in this design, never over it.
 * Returns nothing when there is no caption, so callers can drop it in
 * unconditionally.
 */
export function ImageCaption({caption}: {caption?: string | null}) {
  if (!caption) return null
  return (
    <div className="mt-3 font-mono text-2xs uppercase tracking-[0.12em] text-text-muted">
      {caption}
    </div>
  )
}
