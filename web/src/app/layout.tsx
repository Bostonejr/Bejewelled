import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {Archivo, IBM_Plex_Mono, Marcellus} from 'next/font/google'
import {VisualEditing} from 'next-sanity/visual-editing'

import {SheetRail, SiteFooter, SiteHeader} from '@/components/chrome'
import {ImageProtection} from '@/components/ImageProtection'
import {StructuredData} from '@/components/StructuredData'
import {SanityLive} from '@/sanity/live'
import {getSiteSettings} from '@/sanity/settings'
import {siteUrl} from '@/sanity/env'

import './globals.css'

/**
 * The three brand faces, self-hosted.
 *
 * The design system loaded these from fonts.googleapis.com at runtime — a
 * render-blocking third-party request and a guaranteed layout shift. Same
 * faces, same weights, served from our own origin. The CSS variables below
 * are what tokens/typography.css consumes.
 */
const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400', // headings are regular weight only; the brand never bolds a serif
  variable: '--font-marcellus',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bejewelled — Ideas well expressed!',
    template: '%s — Bejewelled',
  },
  description:
    'Bejewelled is a Ghanaian architectural, engineering and construction practice based in Kumasi, delivering a wholistic service from first design conversation to post-contract close-out.',
}

export default async function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const [settings, {isEnabled: isDraftMode}] = await Promise.all([
    getSiteSettings(),
    draftMode(),
  ])

  return (
    <html
      lang="en-GB"
      className={`${marcellus.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="type-eyebrow sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-text-on-inverse"
        >
          Skip to content
        </a>

        <SheetRail label={settings.railLabel} />

        {/* The 44px rail is fixed, so the sheet is inset by its width. Below
            768px the rail becomes a 6px bar across the top and the inset
            follows it (gap #01). */}
        <div className="mt-1.5 md:mt-0 md:ml-11">
          <SiteHeader
            brandName={settings.brandName}
            nav={settings.nav}
            phone={settings.phones[0]}
          />
          <main id="main">{children}</main>
          <SiteFooter settings={settings} />
        </div>

        <StructuredData settings={settings} />
        {/* Blocks right-click, drag-off and the mobile long-press sheet on
            photographs. A deterrent, not protection — see the component. */}
        <ImageProtection />
        <SanityLive />
        {/* Click-to-edit overlays, only ever mounted inside the Studio's
            Presentation tool. Never shipped to a visitor. */}
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  )
}
