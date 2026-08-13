import {Button, Eyebrow} from '@/components/ds'

/**
 * 404, in the design's own language: an eyebrow, an h1, a sentence, and the
 * two buttons the hero uses. No illustration, no apology in six sizes.
 *
 * The sheet rail shows 01 here, matching the design's `SHEETS[route] || '01'`
 * fallback for an unrecognised route.
 */
export const metadata = {
  title: 'Page not found',
  robots: {index: false, follow: true},
}

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <Eyebrow tone="muted">Error 404</Eyebrow>
      <h1 className="type-h1 mt-4">This page does not exist.</h1>
      <p className="type-body-lg measure mt-7 text-text-body">
        The address may have changed, or the record may have been withdrawn. The
        designs index lists every published project.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button href="/designs" size="lg" variant="primary">
          View the designs
        </Button>
        <Button href="/" size="lg" variant="secondary">
          Back to home
        </Button>
      </div>
    </section>
  )
}
