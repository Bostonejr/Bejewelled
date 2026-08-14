/**
 * The enquiry contract, shared by the form and the route handler.
 *
 * One module so the two can never drift: the client validates to give
 * immediate feedback, the server validates because the client can be bypassed,
 * and both produce the same message for the same mistake. A visitor who fixes
 * what the field told them to fix does not then get a different complaint back
 * from the server.
 *
 * Required fields: Full name, Email, Telephone and Service required. The design
 * marks only the first two, and the practice asked for the other two on top of
 * it — a deliberate departure, because an enquiry the practice cannot ring back
 * about, or cannot route to a discipline, costs them more than the extra two
 * fields cost the visitor. Organisation and the message stay optional.
 *
 * REQUIRED is the single source of that decision: the asterisks in the form,
 * the `required` attributes, and the checks below all read from it, so a field
 * cannot end up starred but unvalidated or validated but unstarred.
 */

export type EnquiryField =
  | 'name'
  | 'organisation'
  | 'email'
  | 'telephone'
  | 'service'
  | 'message'

export type Enquiry = Record<EnquiryField, string>

export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export const EMPTY_ENQUIRY: Enquiry = {
  name: '',
  organisation: '',
  email: '',
  telephone: '',
  service: '',
  message: '',
}

/** Length caps, so a malformed or hostile submission never reaches the inbox. */
export const MAX_LENGTH: Record<EnquiryField, number> = {
  name: 120,
  organisation: 160,
  email: 160,
  telephone: 40,
  service: 80,
  message: 4000,
}

/**
 * Deliberately permissive. A stricter pattern rejects valid addresses far more
 * often than it catches invalid ones, and the only reliable test of an email
 * address is sending to it.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The required set, and the message each empty field gets. Ordered as the form
 * is, so the "first invalid field" the form focuses is the topmost one.
 */
export const REQUIRED: ReadonlyArray<readonly [EnquiryField, string]> = [
  ['name', 'Please tell us your name.'],
  ['email', 'We need an email address to reply to.'],
  ['telephone', 'Please give us a number we can reach you on.'],
  ['service', 'Please choose the service you need.'],
]

const REQUIRED_FIELDS = new Set(REQUIRED.map(([field]) => field))

export const isRequired = (field: EnquiryField): boolean =>
  REQUIRED_FIELDS.has(field)

export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const trimmed = (field: EnquiryField) => (values[field] ?? '').trim()

  for (const [field, message] of REQUIRED) {
    if (!trimmed(field)) errors[field] = message
  }

  if (!errors.email && !EMAIL.test(trimmed('email'))) {
    errors.email = 'That does not look like an email address.'
  }

  for (const [field, max] of Object.entries(MAX_LENGTH) as [
    EnquiryField,
    number,
  ][]) {
    if (trimmed(field).length > max) {
      errors[field] = `Please keep this under ${max} characters.`
    }
  }

  return errors
}

/** The shape /api/contact always answers with, success or failure. */
export type EnquiryResponse = {
  success: boolean
  message: string
  errors?: EnquiryErrors
}
