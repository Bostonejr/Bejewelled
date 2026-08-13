import type {ReactNode} from 'react'

/**
 * Shared label and hint, lifted from the identical private helpers in
 * components/forms/{Input,Textarea,Select}.jsx.
 */

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="type-label mb-2 block tracking-[0.1em] text-text-muted">
      {children}
      {required ? (
        <span className="ml-1 text-status-error" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  )
}

export function FieldHint({
  id,
  error,
  hint,
}: {
  id: string
  error?: string
  hint?: string
}) {
  if (!error && !hint) return null
  return (
    <div
      id={id}
      className={['mt-2 text-xs leading-normal', error ? 'text-status-error' : 'text-text-muted']
        .filter(Boolean)
        .join(' ')}
    >
      {error || hint}
    </div>
  )
}

/**
 * The border colour moves between rest, focus and error — and the design
 * system's focus ring is left alone.
 *
 * The bundle is inconsistent here: `Input.jsx` draws `outline: 1px solid
 * var(--gold-500)` on focus, while `Textarea.jsx` and `Select.jsx` set
 * `outline: 'none'` and rely on the 1px border change alone. A 1px border
 * shifting from --line-rule to gold is a weak focus indicator and, on the two
 * that suppress the outline, the only one.
 *
 * The design system settles its own inconsistency: `base.css` declares
 * `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px }`
 * as system-wide law. So no `outline-none` here — that rule applies, all three
 * controls get the same keyboard focus ring the rest of the site uses, and the
 * gold border change stays on top of it.
 */
export const controlClasses = (error?: string) =>
  [
    'w-full rounded-md border border-solid bg-paper-000 px-3.5 py-3',
    'type-body text-text-heading transition-control',
    'disabled:bg-paper-200',
    error ? 'border-status-error' : 'border-line-rule focus:border-gold-500',
  ].join(' ')
