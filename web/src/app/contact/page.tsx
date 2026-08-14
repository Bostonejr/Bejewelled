import {notFound} from 'next/navigation'

import {EnquiryForm} from '@/components/contact/EnquiryForm'
import {ImageCaption, SanityImage} from '@/components/SanityImage'
import {PageHeader} from '@/components/sections'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {CONTACT_PAGE_QUERY} from '@/sanity/queries'

/**
 * Contact — the enquiry form on the left, the practice's details and the
 * office plate on the right.
 *
 * Exact values: 56px below the header, an auto-fit grid at minmax(340px, 1fr)
 * with a 64px gap aligned to the top, record rows on hairlines with their line
 * breaks preserved, and a 280px map plate with its caption below the frame.
 *
 * This is the one screen with no closing call-to-action band — the whole page
 * is the call to action.
 */

export async function generateMetadata() {
  const {data} = await sanityFetch({query: CONTACT_PAGE_QUERY, stega: false})
  return buildMetadata({
    seo: data?.seo,
    fallbackTitle: data?.title ?? 'Contact',
    fallbackDescription: data?.formIntro,
    path: '/contact',
  })
}

export default async function ContactPage() {
  const {data} = await sanityFetch({query: CONTACT_PAGE_QUERY})
  if (!data) notFound()

  const contactFields = data.contactFields ?? []

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow ?? ''}
        title={data.title ?? ''}
        titleWidth="24ch"
      />

      <section className="wrap pt-14 pb-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-16">
          <EnquiryForm
            intro={data.formIntro}
            serviceOptions={(data.serviceOptions ?? []).map(String)}
            phoneNote={data.phoneNote}
            successHeading={data.successHeading}
            successBody={data.successBody}
            successButtonLabel={data.successButtonLabel}
          />

          <div>
            {contactFields.length ? (
              <div className="border-t border-line-rule">
                {contactFields.map((field) => (
                  <div
                    key={field?.label}
                    className="border-b border-line-hairline py-6"
                  >
                    <div className="type-label tracking-[0.14em] text-text-muted">
                      {field?.label}
                    </div>
                    {/* whitespace-pre-line: a registered address is written
                        across two lines in the Studio and must stay that way. */}
                    <div className="type-body mt-2.5 whitespace-pre-line text-text-heading">
                      {field?.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="relative mt-10 h-[280px] bg-surface-plate">
              <SanityImage
                image={data.mapImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <ImageCaption caption={data.mapImage?.caption} />
          </div>
        </div>
      </section>
    </>
  )
}
