/**
 * Chrome content, transcribed verbatim from `Bejewelled Website.dc.html`.
 *
 * This is a *fallback*, not the source of truth. The shape below mirrors the
 * `siteSettings` singleton in docs/PLAN.md §5.2 field for field, so when the
 * Sanity schema lands the chrome components keep their prop types and the
 * layout swaps `siteDefaults` for a `sanityFetch`. Until then the site renders
 * the design's own copy rather than empty slots.
 *
 * Brand law that bites here (design system readme):
 *   · "Bejewelled" in nav, marketing and titles; "Bejewelled Enterprise" in the
 *     copyright line, the registration strip and the project record line.
 *   · Ghanaian/British spelling — recognised, programme, centred.
 *   · Exclamation marks appear in the tagline and nowhere else.
 */

export type NavItem = {label: string; href: string}
export type FooterLink = {label: string; href?: string}
export type FooterColumn = {title: string; items: FooterLink[]}

export type SiteSettings = {
  brandName: string
  legalName: string
  tagline: string
  /** The vertical text running up the fixed sheet rail. */
  railLabel: string
  nav: NavItem[]
  /** Shown in the header; the first number is the one the design prints. */
  phones: string[]
  addressLines: string[]
  digitalAddress: string
  /** Whether the registration line prints at the foot of every page. */
  showRegistrationLine: boolean
  registrationLine: string
  /** Whether the ink band under the hero on Home renders at all. */
  showCredentialStrip: boolean
  /** The ink band of registrations under the hero on Home. */
  credentialStrip: string[]
  footerStatement: string
  footerColumns: FooterColumn[]
  officeColumnTitle: string
  ctaBand: {
    heading: string
    body: string
    button: {label: string; href: string}
  }
}

export const siteDefaults: SiteSettings = {
  brandName: 'Bejewelled',
  legalName: 'Bejewelled Enterprise',
  tagline: 'Ideas well expressed!',
  railLabel: 'Bejewelled Enterprise · Kumasi, Ghana',

  // Nav order is the client's, not the design's: Designs leads because the work
  // is the argument. It is deliberately independent of the sheet numbers below,
  // which stay in the design's route order — a sheet number is the drawing's
  // own number, not its position in the menu.
  nav: [
    {label: 'Home', href: '/'},
    {label: 'Designs', href: '/designs'},
    {label: 'Construction', href: '/construction'},
    {label: 'Services', href: '/services'},
    {label: 'Contact', href: '/contact'},
  ],

  phones: ['0244 037 166', '0274 271 421'],
  addressLines: ['Plot 41A, Block J, Apire,', 'Kumasi, Ghana'],
  digitalAddress: 'AK-361-7399',

  // The two credential switches default off, and so do their counterparts in
  // the Studio schema. The practice asked for the claims to be held back until
  // they are ready to stand behind them in public; the copy below is kept
  // verbatim so flipping either switch in Site settings restores the design's
  // own wording with no re-typing.
  showRegistrationLine: false,
  registrationLine:
    'Registered 2013 · BN433602013 · Ministry of Works and Housing K3, D3',

  // Transcribed verbatim: the strip uses "Works & Housing" while the footer
  // registration line above uses "Works and Housing". That is the design file,
  // not a slip in the transcription.
  showCredentialStrip: false,
  credentialStrip: [
    'Registered 2013 · BN433602013',
    'Ministry of Works & Housing K3, D3',
    'Public Procurement Authority',
    'Architects Registration Council',
  ],

  footerStatement:
    'Designing livable spaces. Solving everyday environmental problems. Delivering a wholistic service to every client.',

  footerColumns: [
    {
      // Same destinations as the header nav and deliberately in the same
      // order — the two are one navigation shown twice.
      title: 'Practice',
      items: [
        {label: 'Designs', href: '/designs'},
        {label: 'Construction', href: '/construction'},
        {label: 'Services', href: '/services'},
        {label: 'Contact', href: '/contact'},
      ],
    },
    {
      // No hrefs: the design renders these as <span>, not links.
      title: 'Disciplines',
      items: [
        {label: 'Architectural Services'},
        {label: 'Engineering Services'},
        {label: 'Project Management'},
        {label: 'Construction'},
      ],
    },
  ],

  officeColumnTitle: 'Registered office',

  ctaBand: {
    heading: "Let's build something lasting, together.",
    body: 'Plot 41A, Block J, Apire, Kumasi, Ghana · 0244 037 166 • 0274 271 421',
    button: {label: 'Start a conversation', href: '/contact'},
  },
}

/**
 * The sheet number printed at the foot of the rail and in the "Sheet 02 / 05"
 * marker on every inner page.
 *
 * **This list must stay in the same order as `nav` above.** The design's own
 * router numbered home/services/construction/designs/contact 01–05 because that
 * was its menu order; the numbering was never independent of the menu, it just
 * happened to match. Once the nav was reordered the two disagreed — Designs sat
 * second in the menu and printed "Sheet 04" — so the numbers follow the menu,
 * which is what a visitor counting down the nav expects.
 *
 * A project detail page takes the Designs number, because it is part of the
 * designs set. Anything unrouted (404) falls back to 01, matching the design's
 * `SHEETS[route] || '01'`.
 */
const SHEETS: ReadonlyArray<readonly [RegExp, string]> = [
  [/^\/$/, '01'],
  [/^\/designs(\/|$)/, '02'],
  [/^\/construction(\/|$)/, '03'],
  [/^\/services(\/|$)/, '04'],
  [/^\/contact(\/|$)/, '05'],
]

export const SHEET_COUNT = '05'

export function sheetNumber(pathname: string): string {
  return SHEETS.find(([pattern]) => pattern.test(pathname))?.[1] ?? '01'
}

/** True when `href` is the section the current pathname sits inside. */
export function isActiveRoute(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}
