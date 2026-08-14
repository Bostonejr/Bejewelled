'use client'

import {useRef, useState} from 'react'

import {Button, Input, Select, Textarea} from '@/components/ds'
import {
  EMPTY_ENQUIRY,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryResponse,
} from '@/lib/enquiry'

/**
 * The enquiry form, and the success state that replaces it in place.
 *
 * Ported from the Contact screen: a 24px stack, the four short fields on an
 * auto-fit grid at minmax(240px, 1fr), then the service select and the message,
 * then the send button beside the telephone note. The success state is the
 * design's — a 3px gold top rule, an h2, a paragraph capped at 52 characters a
 * line, and a ghost button to send another.
 *
 * Validation runs on the client for immediate feedback and again on the server
 * because the client can be bypassed; both use the same module, so the same
 * mistake produces the same sentence in both places. Errors are announced
 * through an aria-live region, and focus moves to the first field at fault so a
 * keyboard or screen-reader user is taken to the problem rather than told about
 * it and left where they were.
 */

const FIELD_ORDER: EnquiryField[] = [
  'name',
  'organisation',
  'email',
  'telephone',
  'service',
  'message',
]

export function EnquiryForm({
  intro,
  serviceOptions,
  phoneNote,
  successHeading,
  successBody,
  successButtonLabel,
}: {
  intro?: string | null
  serviceOptions: string[]
  phoneNote?: string | null
  successHeading?: string | null
  successBody?: string | null
  successButtonLabel?: string | null
}) {
  const [values, setValues] = useState<Enquiry>(EMPTY_ENQUIRY)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [formError, setFormError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const set = (field: EnquiryField) => (value: string) => {
    setValues((current) => ({...current, [field]: value}))
    // Clear a field's error as soon as it is touched: leaving it lit while the
    // visitor is fixing it reads as the fix not working.
    setErrors((current) =>
      current[field] ? {...current, [field]: undefined} : current,
    )
  }

  const focusFirstError = (found: EnquiryErrors) => {
    const first = FIELD_ORDER.find((field) => found[field])
    if (first) {
      formRef.current
        ?.querySelector<HTMLElement>(`#enquiry-${first}`)
        ?.focus()
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const found = validateEnquiry(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      focusFirstError(found)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...values,
          // The honeypot. Always empty for a person; a bot that fills every
          // input it finds will populate it and be turned away server-side.
          botcheck: '',
        }),
      })

      const result = (await response.json().catch(() => null)) as EnquiryResponse | null

      if (result?.success) {
        setStatus('sent')
        return
      }

      setStatus('idle')
      if (result?.errors) {
        setErrors(result.errors)
        focusFirstError(result.errors)
      }
      setFormError(
        result?.message ??
          'We could not send that just now. Please try again, or call 0244 037 166.',
      )
    } catch {
      setStatus('idle')
      setFormError(
        'We could not reach the server. Please check your connection, or call 0244 037 166.',
      )
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t-[3px] border-line-accent pt-8">
        <h2 className="type-h2">{successHeading}</h2>
        <p className="type-body-lg mt-5 max-w-[52ch] text-text-body">{successBody}</p>
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() => {
              setValues(EMPTY_ENQUIRY)
              setErrors({})
              setStatus('idle')
            }}
          >
            {successButtonLabel}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6">
      {intro ? (
        <div className="type-body max-w-[56ch] text-text-body">{intro}</div>
      ) : null}

      {/* Honeypot: off-screen rather than display:none, which some bots skip,
          and taken out of the tab order and the accessibility tree so no
          person can reach it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="enquiry-botcheck">Leave this field empty</label>
        <input id="enquiry-botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
        <Input
          id="enquiry-name"
          label="Full name"
          placeholder="Your name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(event) => set('name')(event.target.value)}
        />
        <Input
          id="enquiry-organisation"
          label="Organisation"
          placeholder="Company or institution"
          autoComplete="organization"
          value={values.organisation}
          error={errors.organisation}
          onChange={(event) => set('organisation')(event.target.value)}
        />
        <Input
          id="enquiry-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => set('email')(event.target.value)}
        />
        <Input
          id="enquiry-telephone"
          label="Telephone"
          type="tel"
          placeholder="024 000 0000"
          autoComplete="tel"
          value={values.telephone}
          error={errors.telephone}
          onChange={(event) => set('telephone')(event.target.value)}
        />
      </div>

      <Select
        id="enquiry-service"
        label="Service required"
        placeholder="Select a service"
        options={serviceOptions}
        value={values.service}
        error={errors.service}
        onChange={(event) => set('service')(event.target.value)}
      />

      <Textarea
        id="enquiry-message"
        label="About the project"
        placeholder="Location, type of building, and where the project stands today."
        rows={6}
        value={values.message}
        error={errors.message}
        onChange={(event) => set('message')(event.target.value)}
      />

      {/* Always in the DOM so a screen reader is already watching it when a
          message arrives; an aria-live region added at the same moment as its
          content is frequently not announced. */}
      <div role="status" aria-live="polite" className="min-h-0">
        {formError ? (
          <p className="type-body-sm text-status-error">{formError}</p>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-6">
        <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </Button>
        {phoneNote ? (
          <span className="font-mono text-2xs uppercase tracking-[0.12em] text-text-muted">
            {phoneNote}
          </span>
        ) : null}
      </div>
    </form>
  )
}
