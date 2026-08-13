import Image from 'next/image'

/**
 * Ported from components/core/Logo.jsx.
 *
 * Gap #02 in docs/PLAN.md: the original also declared an `ink` variant
 * pointing at logo-lockup-ink.png, which does not exist in the design project.
 * It is a print-only variant with no web use, so it is dropped rather than
 * shipped as a broken image.
 *
 * Clear space around any mark equals the monogram's cap height. Minimum
 * lockup width 120px. Never recolour, never place on gold, never add effects.
 */

const files = {
  lockup: {light: '/brand/logo-lockup.png', dark: '/brand/logo-lockup-light.png'},
  mark: {light: '/brand/logo-mark.png', dark: '/brand/logo-mark-light.png'},
  wordmark: {light: '/brand/logo-wordmark.png', dark: '/brand/logo-wordmark.png'},
} as const

/** Intrinsic pixel dimensions of the source PNGs, for aspect ratio. */
const intrinsic = {
  lockup: {width: 614, height: 417},
  mark: {width: 614, height: 317},
  wordmark: {width: 614, height: 89},
} as const

export function Logo({
  variant = 'lockup',
  on = 'light',
  height = 40,
  priority = false,
  className = '',
}: {
  variant?: keyof typeof files
  on?: 'light' | 'dark'
  height?: number
  priority?: boolean
  className?: string
}) {
  const {width: iw, height: ih} = intrinsic[variant]
  const width = Math.round((height * iw) / ih)

  return (
    <Image
      src={files[variant][on]}
      alt="Bejewelled"
      width={width}
      height={height}
      priority={priority}
      className={['h-auto w-auto', className].filter(Boolean).join(' ')}
      style={{height, width: 'auto'}}
    />
  )
}
