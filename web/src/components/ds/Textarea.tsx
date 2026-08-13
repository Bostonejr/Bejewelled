import type {ComponentProps} from 'react'

import {controlClasses, FieldHint, FieldLabel} from './field'

/** Ported from components/forms/Textarea.jsx. */

export function Textarea({
  id,
  label,
  hint,
  error,
  required = false,
  rows = 5,
  className = '',
  ...rest
}: {
  id: string
  label?: string
  hint?: string
  error?: string
} & Omit<ComponentProps<'textarea'>, 'id' | 'className'> & {className?: string}) {
  const describedBy = error || hint ? `${id}-hint` : undefined

  return (
    <div className={['block', className].filter(Boolean).join(' ')}>
      {label ? (
        <FieldLabel htmlFor={id} required={required}>
          {label}
        </FieldLabel>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${controlClasses(error)} resize-y`}
        {...rest}
      />
      <FieldHint id={`${id}-hint`} error={error} hint={hint} />
    </div>
  )
}
