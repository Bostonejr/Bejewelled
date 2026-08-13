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
 * The form could post straight to Web3Forms — their documentation suggests it.
 * Going through a route handler buys four things that matter for a practice
 * whose enquiries are tender-shaped:
 *
 *   · the access key stays a server environment variable and never enters the
 *     JavaScript bundle;
 *   · submissions are validated here, so a malformed one never reaches the
 *     inbox and cannot be waved through by editing the page's JavaScript;
 *   · a per-IP rate limit sits on top of Web3Forms' own throttling;
 *   · the browser sees one stable JSON contract, so changing provider later
 *     touches this file and nothing else.
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
 * infrastructure — Web3Forms throttles as well, and the honeypot below turns
 * away the traffic this is actually aimed at. Swap in a shared store if the
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
   * and before Web3Forms is called at all — and answered with a plain 400
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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    /**
     * No key configured. In development that is the normal state before the
     * practice has created one, and stubbing success lets the form's success
     * state be built and reviewed. In production it is a misconfiguration, and
     * silently swallowing an enquiry would be far worse than an honest error.
     */
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[contact] WEB3FORMS_ACCESS_KEY is not set — returning a stub success')
      return json(
        {success: true, message: 'Stubbed in development — no email was sent.'},
        200,
      )
    }
    console.error('[contact] WEB3FORMS_ACCESS_KEY is not set — enquiry not delivered')
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
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry — ${values.name}${
          values.organisation ? `, ${values.organisation}` : ''
        }`,
        from_name: 'Bejewelled Website',
        replyto: values.email,
        name: values.name,
        organisation: values.organisation,
        email: values.email,
        telephone: values.telephone,
        service: values.service,
        message: values.message,
      }),
    })

    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean
      message?: string
    }

    if (!response.ok || !result.success) {
      // The provider's own wording is logged but not shown: it is written for
      // a developer, not for someone trying to commission a building.
      console.error('[contact] Web3Forms rejected the submission', result.message)
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
    console.error('[contact] Web3Forms request failed', error)
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
