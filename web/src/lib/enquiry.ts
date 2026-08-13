/**
 * The enquiry contract, shared by the form and the route handler.
 *
 * One module so the two can never drift: the client validates to give
 * immediate feedback, the server validates because the client can be bypassed,
 * and both produce the same message for the same mistake. A visitor who fixes
 * what the field told them to fix does not then get a different complaint back
 * from the server.
 *
 * Which fields are required comes from the design, not from what would be
 * convenient: it marks Full name and Email with the red asterisk and nothing
 * else.
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

export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const trimmed = (field: EnquiryField) => (values[field] ?? '').trim()

  if (!trimmed('name')) errors.name = 'Please tell us your name.'
  if (!trimmed('email')) {
    errors.email = 'We need an email address to reply to.'
  } else if (!EMAIL.test(trimmed('email'))) {
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
