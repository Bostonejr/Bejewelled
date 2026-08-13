import type {ComponentProps} from 'react'

import {controlClasses, FieldHint, FieldLabel} from './field'

/**
 * Ported from components/forms/Select.jsx.
 *
 * The native arrow is suppressed for a hand-drawn 8px chevron — two hairline
 * borders rotated 45°. No icon library, in keeping with the design system's
 * rule that icons are supporting and never decorative.
 */

export function Select({
  id,
  label,
  hint,
  error,
  required = false,
  options,
  placeholder,
  className = '',
  ...rest
}: {
  id: string
  label?: string
  hint?: string
  error?: string
  options: string[]
  placeholder?: string
} & Omit<ComponentProps<'select'>, 'id' | 'className'> & {className?: string}) {
  const describedBy = error || hint ? `${id}-hint` : undefined

  return (
    <div className={['block', className].filter(Boolean).join(' ')}>
      {label ? (
        <FieldLabel htmlFor={id} required={required}>
          {label}
        </FieldLabel>
      ) : null}

      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClasses(error)} appearance-none pr-[38px]`}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute right-3.5 top-1/2 -mt-[3px] h-2 w-2',
            'border-r border-b border-solid border-text-muted',
            '-translate-y-1/2 rotate-45',
          ].join(' ')}
        />
      </div>

      <FieldHint id={`${id}-hint`} error={error} hint={hint} />
    </div>
  )
}
