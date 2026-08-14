import Link from 'next/link'
import type {ComponentProps, ReactNode} from 'react'

/**
 * Ported from components/core/Button.jsx in the design system bundle.
 *
 * The original tracked hover and press in React state, which would force every
 * button on the site into a client component. The states are pure CSS here —
 * identical values, no hydration.
 */

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs', // 8px 16px, --text-xs
  md: 'px-6 py-3 text-sm', // 12px 24px, --text-sm
  lg: 'px-8 py-4 text-base', // 16px 32px, --text-base
}

const variants: Record<Variant, string> = {
  primary:
    'bg-action-primary text-text-on-inverse border-transparent hover:bg-action-primary-hover',
  accent:
    'bg-action-accent text-text-on-accent border-transparent hover:bg-action-accent-hover',
  secondary:
    'bg-transparent text-text-heading border-line-strong hover:bg-paper-200',
  // Deviation from the bundle: ghost is `bd: 'transparent'` there, which leaves
  // a transparent fill, a transparent border and gold text — visually a run of
  // uppercase label copy, indistinguishable from the eyebrows sitting a few
  // lines above it, with nothing to say it is pressable until the pointer is
  // already on it. The rule is --line-accent, the same gold the nav's active
  // item and the section rules use, so the affordance is the system's own
  // device rather than a new one, and gold stays the only interactive colour.
  ghost:
    'bg-transparent text-text-accent border-line-accent hover:bg-gold-50',
}

// The bundle sets `whiteSpace: 'nowrap'`, which is what pushed "Our
// construction approach" 19px off the right edge of a 320px screen. Wrapping
// is identical wherever there is room for the label — a w-auto inline-flex
// still sizes to max-content — and only differs where nowrap would have
// overflowed, so `text-center` carries the second line.
const base = [
  'inline-flex items-center justify-center gap-[10px]',
  'font-text font-medium tracking-wide uppercase text-center',
  'rounded-md border border-solid',
  'cursor-pointer transition-control',
  'active:translate-y-px', // press: down 1px. No scale, no ripple.
  'disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0',
].join(' ')

type BaseProps = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps &
  Omit<ComponentProps<'button'>, 'className' | 'children'> & {href?: undefined}

type LinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, 'className' | 'children' | 'href'> & {
    href: string
  }

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    ...rest
  } = props

  const classes = [
    base,
    sizes[size],
    variants[variant],
    fullWidth ? 'w-full' : 'w-auto',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in rest && rest.href) {
    const {href, ...linkRest} = rest as LinkProps
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  const {type = 'button', ...buttonRest} = rest as ButtonProps
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
