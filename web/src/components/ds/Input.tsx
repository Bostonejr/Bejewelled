import type {ComponentProps} from 'react'

import {controlClasses, FieldHint, FieldLabel} from './field'

/** Ported from components/forms/Input.jsx. */

export function Input({
  id,
  label,
  hint,
  error,
  required = false,
  className = '',
  ...rest
}: {
  id: string
  label?: string
  hint?: string
  error?: string
} & Omit<ComponentProps<'input'>, 'id' | 'className'> & {className?: string}) {
  const describedBy = error || hint ? `${id}-hint` : undefined

  return (
    <div className={['block', className].filter(Boolean).join(' ')}>
      {label ? (
        <FieldLabel htmlFor={id} required={required}>
          {label}
        </FieldLabel>
      ) : null}
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={controlClasses(error)}
        {...rest}
      />
      <FieldHint id={`${id}-hint`} error={error} hint={hint} />
    </div>
  )
}
