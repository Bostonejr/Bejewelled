import type {ReactNode} from 'react'

/** Ported from components/core/Badge.jsx. Pills are reserved for status chips. */

type Tone =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inverse'
  | 'deep'

const tones: Record<Tone, string> = {
  neutral: 'bg-paper-200 text-text-body',
  accent: 'bg-gold-100 text-gold-700',
  success: 'bg-[#E6EFE4] text-status-success',
  warning: 'bg-gold-100 text-gold-700',
  error: 'bg-[#F5E5E2] text-status-error',
  info: 'bg-blue-100 text-blue-700',
  inverse: 'bg-ink-800 text-text-on-inverse',
  deep: 'bg-blue-800 text-text-on-deep',
}

export function Badge({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: Tone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
        'font-text text-2xs font-medium tracking-wide uppercase',
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
