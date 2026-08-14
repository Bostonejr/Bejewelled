import {NextResponse} from 'next/server'

import {
  EMPTY_ENQUIRY,
  validateEnquiry,
  type Enquiry,
  type EnquiryField,
  type EnquiryResponse,
} from '@/lib/enquiry'

/**
 * The enquiry proxy.
 *
 * Going through a route handler rather than posting to the mail provider from
 * the page buys four things that matter for a practice whose enquiries are
 * tender-shaped:
 *
 *   · the API key stays a server environment variable and never enters the
 *     JavaScript bundle;
 *   · submissions are validated here, so a malformed one never reaches the
 *     inbox and cannot be waved through by editing the page's JavaScript;
 *   · a per-IP rate limit sits in front of the provider;
 *   · the browser sees one stable JSON contract, so changing provider touches
 *     this file and nothing else.
 *
 * That last point was cashed in. The provider was Web3Forms, which answers a
 * server-side call with `403 {"message": "This method is not allowed. Use our
 * API in client side ... (Pro plan is required)"}` — their free tier is
 * browser-only by design, and their access key is meant to be public. Keeping
 * it would have meant either paying for Pro and whitelisting an egress IP that
 * Vercel does not guarantee, or shipping the key in the page and giving up the
 * three guarantees above. Resend is a server-side API with a secret key, so the
 * route kept its shape and only the send below changed.
 */

export const runtime = 'nodejs'

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5

/**
 * A first line of defence, not a guarantee.
 *
 * This map lives in the memory of one server instance: it resets on deploy and
 * is not shared between instances, so a determined flood across a scaled-out
 * deployment gets through it. That is an accepted trade for zero
 * infrastructure — Resend enforces its own account-level limits as well, and
 * the honeypot below turns away the traffic this is actually aimed at. Swap in
 * a shared store if the
 * site ever runs on more than one instance and this starts to matter.
 */
const attempts = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((at) => now - at < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(ip, recent)
    return true
  }

  recent.push(now)
  attempts.set(ip, recent)

  // Opportunistic sweep so a long-running instance does not accumulate an
  // entry per IP that ever visited.
  if (attempts.size > 5000) {
    for (const [key, times] of attempts) {
      if (times.every((at) => now - at >= WINDOW_MS)) attempts.delete(key)
    }
  }

  return false
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

const json = (body: EnquiryResponse, status: number) =>
  NextResponse.json(body, {status})

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return json({success: false, message: 'Could not read that submission.'}, 400)
  }

  const body = (payload ?? {}) as Record<string, unknown>

  /**
   * The honeypot. A hidden field no person can see or tab into; anything that
   * fills it is automated. Rejected before validation, before the rate limit,
   * and before the mail provider is called at all — and answered with a plain 400
   * rather than a message that would tell a bot what gave it away.
   */
  if (typeof body.botcheck === 'string' && body.botcheck.trim() !== '') {
    return json({success: false, message: 'Could not read that submission.'}, 400)
  }

  const values: Enquiry = {...EMPTY_ENQUIRY}
  for (const field of Object.keys(EMPTY_ENQUIRY) as EnquiryField[]) {
    const value = body[field]
    values[field] = typeof value === 'string' ? value.trim() : ''
  }

  const errors = validateEnquiry(values)
  if (Object.keys(errors).length > 0) {
    return json(
      {success: false, message: 'Please check the highlighted fields.', errors},
      422,
    )
  }

  if (rateLimited(clientIp(request))) {
    return json(
      {
        success: false,
        message:
          'That is several enquiries in a short time. Please try again later, or call 0244 037 166.',
      },
      429,
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_TO
  const from = process.env.ENQUIRY_FROM

  if (!apiKey || !to || !from) {
    /**
     * Not configured. In development that is the normal state before the
     * practice has an account, and stubbing success lets the form's success
     * state be built and reviewed. In production it is a misconfiguration, and
     * silently swallowing an enquiry would be far worse than an honest error.
     */
    const missing = [
      !apiKey && 'RESEND_API_KEY',
      !to && 'ENQUIRY_TO',
      !from && 'ENQUIRY_FROM',
    ].filter(Boolean)

    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[contact] ${missing.join(', ')} not set — returning a stub success`)
      return json(
        {success: true, message: 'Stubbed in development — no email was sent.'},
        200,
      )
    }
    console.error(`[contact] ${missing.join(', ')} not set — enquiry not delivered`)
    return json(
      {
        success: false,
        message:
          'The enquiry form is not available at the moment. Please call 0244 037 166.',
      },
      503,
    )
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Replying to the notification replies to the enquirer, not to the
        // sending domain — the practice answers from their own mail client
        // without copying the address across by hand.
        reply_to: values.email,
        subject: `New enquiry — ${values.name}${
          values.organisation ? `, ${values.organisation}` : ''
        }`,
        text: enquiryText(values),
      }),
    })

    if (!response.ok) {
      // The provider's own wording is logged but not shown: it is written for
      // a developer, not for someone trying to commission a building.
      const detail = await response.text().catch(() => '')
      console.error('[contact] Resend rejected the send', response.status, detail)
      return json(
        {
          success: false,
          message:
            'We could not send that just now. Please try again, or call 0244 037 166.',
        },
        502,
      )
    }

    return json({success: true, message: 'Your enquiry has been received.'}, 200)
  } catch (error) {
    console.error('[contact] Resend request failed', error)
    return json(
      {
        success: false,
        message:
          'We could not send that just now. Please try again, or call 0244 037 166.',
      },
      502,
    )
  }
}

/**
 * Plain text, not HTML. The recipient is a practice reading enquiries on a
 * phone, every value is already length-capped and the body is the visitor's
 * own words — a text part cannot carry markup into their mail client, so
 * there is nothing to escape and nothing to get wrong.
 */
function enquiryText(values: Enquiry): string {
  const rows: [string, string][] = [
    ['Name', values.name],
    ['Organisation', values.organisation],
    ['Email', values.email],
    ['Telephone', values.telephone],
    ['Service required', values.service],
  ]

  const details = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')

  const message = values.message
    ? `\n\nAbout the project\n-----------------\n${values.message}`
    : ''

  const site = process.env.NEXT_PUBLIC_SITE_URL
  return `${details}${message}\n\n--\nSent from the enquiry form${site ? ` at ${site}` : ''}`
}
