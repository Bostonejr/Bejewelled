import type {ReactNode} from 'react'

import {Eyebrow} from './Eyebrow'

/** Ported from components/editorial/SectionHeading.jsx. */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  rule = true,
  level = 2,
  className = '',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'inverse'
  rule?: boolean
  level?: 2 | 3
  className?: string
}) {
  const inverse = tone === 'inverse'
  const centred = align === 'center'
  const Heading = level === 3 ? 'h3' : 'h2'

  return (
    <header
      className={[
        centred ? 'text-center max-w-[62ch] mx-auto' : 'text-left',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <>
          <Eyebrow tone={inverse ? 'inverse' : 'accent'}>{eyebrow}</Eyebrow>
          <div className="h-3" />
        </>
      ) : null}

      <Heading
        className={['type-h2', inverse ? 'text-text-on-inverse' : 'text-text-heading'].join(
          ' ',
        )}
      >
        {title}
      </Heading>

      {rule ? (
        <div
          className={[
            'h-0.5 w-14 mt-6',
            inverse ? 'bg-gold-500' : 'bg-line-strong',
            centred ? 'mx-auto' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ) : null}

      {intro ? (
        <p
          className={[
            'type-body-lg measure mt-6',
            inverse ? 'text-text-on-inverse-muted' : 'text-text-body',
            centred ? 'mx-auto' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {intro}
        </p>
      ) : null}
    </header>
  )
}
