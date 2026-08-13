import type {ElementType, ReactNode} from 'react'

/**
 * Ported from components/editorial/Eyebrow.jsx.
 *
 * The wide-tracked uppercase label that heads every section — the brand's
 * signature device. On a blue field the tone is gold-200, not gold-400: the
 * mid golds do not clear 4.5:1 at 12px.
 */

type Tone = 'accent' | 'muted' | 'inverse'

const tones: Record<Tone, string> = {
  accent: 'text-text-accent',
  muted: 'text-text-muted',
  inverse: 'text-gold-200',
}

export function Eyebrow({
  tone = 'accent',
  as: Tag = 'div',
  children,
  className = '',
}: {
  tone?: Tone
  as?: ElementType
  children: ReactNode
  className?: string
}) {
  return (
    <Tag className={['type-eyebrow', tones[tone], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
