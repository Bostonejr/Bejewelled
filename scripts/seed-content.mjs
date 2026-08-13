/**
 * Loads the design's copy into Sanity: the five sectors and the seven page
 * singletons.
 *
 *   npm run seed:content            safe to re-run — never touches an existing document
 *   npm run seed:content -- --force overwrites, discarding edits made in the Studio
 *
 * Every string below is transcribed from `.design-src/Bejewelled Website.dc.html`,
 * which is the authoritative artefact. Ghanaian/British spelling and the
 * practice's "wholistic" are reproduced as written — do not correct them.
 *
 * Images are deliberately left empty. Four photographs have no source yet (home
 * hero, the portrait of the Principal Architect, site works in progress, the
 * Apire office) and those slots render as plain plates until they arrive.
 * Project photographs are handled by seed-projects.mjs.
 */

import {client, orderRanks, summarise} from './lib/sanity.mjs'

const force = process.argv.includes('--force')

/* ---------------------------------------------------------------- sectors */

const SECTORS = ['Residential', 'Commercial', 'Educational', 'Industrial', 'Healthcare']

/* -------------------------------------------------------------- home page */

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    eyebrow: 'Architecture · Engineering · Project Management · Construction',
    title: 'Ideas well expressed!',
    body: 'Bejewelled is a Ghanaian architectural, engineering and construction practice based in Kumasi. We believe architecture is more than the design of buildings — it is a tool for creating livable spaces and solving everyday environmental problems.',
    ctas: [
      {_key: 'hero-designs', _type: 'cta', label: 'View the designs', href: '/designs'},
      {_key: 'hero-contact', _type: 'cta', label: 'Get in touch', href: '/contact'},
    ],
  },
  about: {
    eyebrow: 'About Us',
    statement:
      'Every commission is approached with one philosophy at its core: spaces that respond to how people actually live and work, environments that are comfortable, efficient and enduring.',
    body: 'This is why we structure our practice as a wholistic service. From the first design conversation through pre-contract planning, engineering coordination, site construction and post-contract close-out, our clients work with one accountable team rather than a series of disconnected consultants.',
    cta: {_type: 'cta', label: 'All services in detail', href: '/services'},
    recordLabel: 'Practice record',
    stats: [
      {_key: 'stat-1', _type: 'statItem', value: '30+', label: 'Completed projects'},
      {_key: 'stat-2', _type: 'statItem', value: '20+', label: 'Years of leadership'},
      {_key: 'stat-3', _type: 'statItem', value: '4', label: 'Core disciplines'},
      {_key: 'stat-4', _type: 'statItem', value: '2013', label: 'Registered'},
    ],
  },
  disciplines: {
    eyebrow: 'What We Do',
    title: 'Four core disciplines',
    intro:
      'One accountable team covers the whole of a commission — design, engineering, management and construction — so nothing is lost between consultants.',
    items: [
      {
        _key: 'd-1',
        _type: 'numberedItem',
        title: 'Architectural Services',
        body: 'Concept design, spatial planning and full architectural documentation, grounded in our philosophy of designing genuinely livable, human-centred spaces.',
      },
      {
        _key: 'd-2',
        _type: 'numberedItem',
        title: 'Engineering Services',
        body: 'Coordinated structural and engineering input that translates design intent into safe, buildable and durable solutions.',
      },
      {
        _key: 'd-3',
        _type: 'numberedItem',
        title: 'Project Management',
        body: 'Pre-contract and post-contract oversight — budgeting, scheduling, procurement and site coordination.',
      },
      {
        _key: 'd-4',
        _type: 'numberedItem',
        title: 'Construction',
        body: 'Direct construction delivery, executed to the standards set at design stage.',
      },
    ],
    cta: {_type: 'cta', label: 'Our services', href: '/services'},
    secondaryLink: {_type: 'cta', label: 'Construction approach →', href: '/construction'},
  },
  works: {
    eyebrow: 'Selected Works',
    title: 'Recent commissions',
    linkLabel: 'All 30+ projects',
    // Left empty on purpose: the front end falls back to the first three
    // projects in portfolio order, which is right until someone chooses
    // otherwise. Gap #05 — the design hardcoded the index triplet [0, 1, 3].
    featuredProjects: [],
  },
  leadership: {
    eyebrow: 'Leadership',
    name: 'Rosemary Dwamena',
    roleLine: 'Architect, AGIA · Principal Architect',
    bio: 'Rosemary Dwamena is a registered Architect with over twenty years of experience in architectural design, project management and construction supervision. She leads every commission the practice undertakes, from the first design conversation through to handover.',
    credentials: [
      {
        _key: 'c-1',
        _type: 'fieldRow',
        label: 'Certificate of registration',
        value: 'BN433602013, issued 22 August 2013',
      },
      {
        _key: 'c-2',
        _type: 'fieldRow',
        label: 'Ministry of Works and Housing',
        value: 'Classification K3, D3',
      },
      {
        _key: 'c-3',
        _type: 'fieldRow',
        label: 'Public Procurement Authority',
        value: 'Registered',
      },
      {
        _key: 'c-4',
        _type: 'fieldRow',
        label: 'Architects Registration Council',
        value: 'Registered',
      },
    ],
  },
}

/* ---------------------------------------------------------- services page */

const servicesPage = {
  _id: 'servicesPage',
  _type: 'servicesPage',
  eyebrow: 'Services',
  title: 'A wholistic service, discipline by discipline',
  intro:
    'Bejewelled delivers architectural and engineering services, project management and construction to institutional, commercial and residential clients across Ghana. Each discipline below can be commissioned on its own, but they are designed to work together — as one team, under one line of accountability.',
  services: [
    {
      _key: 's-1',
      _type: 'serviceBlock',
      title: 'Architectural Services',
      tag: 'Concept · Documentation',
      description:
        'Concept design, spatial planning and full architectural documentation for institutional, commercial, industrial and residential buildings, grounded in our philosophy of designing genuinely livable, human-centred spaces.',
      items: [
        'Concept and schematic design',
        'Spatial planning and space programming',
        'Full architectural documentation',
        'Statutory drawings and permit support',
        'Detail design and material specification',
      ],
    },
    {
      _key: 's-2',
      _type: 'serviceBlock',
      title: 'Engineering Services',
      tag: 'Structural · Buildability',
      description:
        'Coordinated structural and engineering input that translates design intent into safe, buildable and durable solutions, integrated from the earliest stages of a project.',
      items: [
        'Structural design and coordination',
        'Building services coordination',
        'Buildability and constructability review',
        'Technical documentation for construction',
        'Engineering support during site works',
      ],
    },
    {
      _key: 's-3',
      _type: 'serviceBlock',
      title: 'Project Management',
      tag: 'Pre- and post-contract',
      description:
        'Pre-contract and post-contract oversight — budgeting, scheduling, procurement and site coordination — that keeps projects on programme and accountable to our clients from start to finish.',
      items: [
        'Budgeting and cost planning',
        'Programme and scheduling',
        'Procurement and tender administration',
        'Site coordination and progress reporting',
        'Post-contract close-out and handover',
      ],
    },
  ],
  constructionBand: {
    eyebrow: 'Discipline 04',
    title: 'Construction',
    body: 'Direct construction delivery, executed to the standards set at design stage. Construction has its own page, because the way we build is the part of our service clients ask about most.',
    cta: {_type: 'cta', label: 'Our construction approach', href: '/construction'},
  },
  sectorsBlock: {
    eyebrow: 'Sectors',
    title: 'Who we build for',
    items: [
      {
        _key: 'sec-1',
        _type: 'numberedItem',
        title: 'Institutional',
        body: 'Universities, schools, churches and public sector clients.',
      },
      {
        _key: 'sec-2',
        _type: 'numberedItem',
        title: 'Commercial',
        body: 'Offices, banking halls, retail and pharmacy buildings.',
      },
      {
        _key: 'sec-3',
        _type: 'numberedItem',
        title: 'Industrial',
        body: 'Factories, warehousing and associated office space.',
      },
      {
        _key: 'sec-4',
        _type: 'numberedItem',
        title: 'Residential',
        body: 'Individual houses and multi-unit housing schemes.',
      },
    ],
  },
}

/* ------------------------------------------------------ construction page */

const constructionPage = {
  _id: 'constructionPage',
  _type: 'constructionPage',
  eyebrow: 'Construction',
  title: 'We build what we draw',
  intro:
    'Most projects lose something between the drawing and the building. Bejewelled carries construction in-house so the intent set at design stage survives to handover — one accountable team through pre-contract planning, engineering coordination, site works and post-contract close-out.',
  // The photograph is missing; the caption travels with it, so both wait.
  // Design's caption, for whoever adds it: "Site works under supervision · Kumasi".
  stagesBlock: {
    eyebrow: 'The Wholistic Approach',
    title: 'Four stages, one team',
    items: [
      {
        _key: 'st-1',
        _type: 'numberedItem',
        title: 'Pre-contract planning',
        body: 'Budget, programme and procurement route are settled before anyone breaks ground, so the build starts from a decision rather than an assumption.',
      },
      {
        _key: 'st-2',
        _type: 'numberedItem',
        title: 'Engineering coordination',
        body: 'Structural and services input is resolved against the architecture, not after it — the drawings that reach site are already buildable.',
      },
      {
        _key: 'st-3',
        _type: 'numberedItem',
        title: 'Site construction',
        body: 'Construction is delivered and supervised by the same team that drew it, holding the standards set at design stage.',
      },
      {
        _key: 'st-4',
        _type: 'numberedItem',
        title: 'Post-contract close-out',
        body: 'Snagging, documentation and handover are completed properly, and we remain accountable for the building after the client moves in.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Why One Team',
    title: 'The difference on site',
    leftLabel: 'The conventional chain',
    rightLabel: 'The Bejewelled way',
    rows: [
      {
        _key: 'cmp-1',
        _type: 'comparisonRow',
        conventional: 'Design, engineering and construction sit with separate firms.',
        bejewelled: 'One accountable team from the first conversation to close-out.',
      },
      {
        _key: 'cmp-2',
        _type: 'comparisonRow',
        conventional: 'Drawings are reinterpreted at every handover between consultants.',
        bejewelled: 'Design intent is carried through by the people who drew it.',
      },
      {
        _key: 'cmp-3',
        _type: 'comparisonRow',
        conventional: 'Cost and programme are argued about after the fact.',
        bejewelled: 'Budget and programme are set pre-contract and tracked against.',
      },
      {
        _key: 'cmp-4',
        _type: 'comparisonRow',
        conventional: 'Responsibility is divided when a defect appears.',
        bejewelled: 'One point of accountability through handover and beyond.',
      },
    ],
  },
  capability: {
    eyebrow: 'Capability',
    title: 'What we take on',
    note: 'Classified K3, D3 by the Ministry of Works and Housing and registered with the Public Procurement Authority for public sector works.',
    items: [
      {
        _key: 'cap-1',
        _type: 'numberedItem',
        title: 'New build construction',
        body: 'Institutional, commercial, industrial and residential buildings from foundation to finishes.',
      },
      {
        _key: 'cap-2',
        _type: 'numberedItem',
        title: 'Renovation and extension',
        body: 'Works to occupied and ageing buildings, including multi-storey teaching blocks.',
      },
      {
        _key: 'cap-3',
        _type: 'numberedItem',
        title: 'Factory and industrial space',
        body: 'Production and warehouse space with associated office accommodation.',
      },
      {
        _key: 'cap-4',
        _type: 'numberedItem',
        title: 'Healthcare and clinical works',
        body: 'Clinic buildings and extensions delivered around live operations.',
      },
      {
        _key: 'cap-5',
        _type: 'numberedItem',
        title: 'Residential developments',
        body: 'Single houses through to multi-unit town house schemes.',
      },
      {
        _key: 'cap-6',
        _type: 'numberedItem',
        title: 'Fit-out and finishing works',
        body: 'Interior fit-out, external works and site infrastructure.',
      },
    ],
  },
}

/* ----------------------------------------------------------- designs page */

const designsPage = {
  _id: 'designsPage',
  _type: 'designsPage',
  eyebrow: 'Designs & Portfolio',
  title: 'Selected works, 2013 to date',
  intro:
    'Over thirty completed commissions across residential, commercial, educational, industrial and healthcare work. The records below are drawn from the company profile; each carries its scope, location and status.',
  allFilterLabel: 'All',
  defaultView: 'plates',
}

/* --------------------------------------------------- project page template */

const projectPage = {
  _id: 'projectPage',
  _type: 'projectPage',
  backLabel: '← All designs',
  recordLine: 'Project record · Bejewelled Enterprise',
  fieldLabels: {
    client: 'Client',
    scope: 'Scope of works',
    location: 'Location',
    status: 'Status',
  },
  prevLabel: '← Previous record',
  nextLabel: 'Next record',
  commissionEyebrow: 'The Commission',
  defaultCommissionBody:
    'Bejewelled carried the commission as a wholistic service: design and documentation, engineering coordination, pre-contract planning and site delivery under one accountable team, through to post-contract close-out.',
}

/* ----------------------------------------------------------- contact page */

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  eyebrow: 'Contact',
  title: "Let's build something lasting, together.",
  formIntro:
    'Tell us about the commission. We will come back to you with the next practical step — a site visit, a brief conversation, or the company profile if you are still comparing practices.',
  serviceOptions: [
    'Architectural Services',
    'Engineering Services',
    'Project Management',
    'Construction',
    'Full wholistic service',
  ],
  phoneNote: 'Or call 0244 037 166',
  successHeading: 'Thank you.',
  successBody:
    'Your enquiry has been received. We will respond within two working days. If the project is urgent, call 0244 037 166 directly.',
  successButtonLabel: 'Send another enquiry',
  contactFields: [
    {
      _key: 'cf-1',
      _type: 'fieldRow',
      label: 'Registered address',
      value: 'Plot 41A, Block J, Apire\nKumasi, Ghana',
    },
    {_key: 'cf-2', _type: 'fieldRow', label: 'Digital address', value: 'AK-361-7399'},
    {
      _key: 'cf-3',
      _type: 'fieldRow',
      label: 'Telephone',
      value: '0244 037 166 • 0274 271 421',
    },
    {
      _key: 'cf-4',
      _type: 'fieldRow',
      label: 'Practice',
      value: 'Bejewelled Enterprise · Registered 2013',
    },
  ],
  mapImage: {
    _type: 'image',
    caption: 'Plot 41A, Block J, Apire · Digital Address AK-361-7399',
  },
}

/* ---------------------------------------------------------- site settings */

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  brandName: 'Bejewelled',
  legalName: 'Bejewelled Enterprise',
  tagline: 'Ideas well expressed!',
  railLabel: 'Bejewelled Enterprise · Kumasi, Ghana',
  phones: ['0244 037 166', '0274 271 421'],
  addressLines: ['Plot 41A, Block J, Apire,', 'Kumasi, Ghana'],
  digitalAddress: 'AK-361-7399',
  registrationLine:
    'Registered 2013 · BN433602013 · Ministry of Works and Housing K3, D3',
  credentialStrip: [
    'Registered 2013 · BN433602013',
    'Ministry of Works & Housing K3, D3',
    'Public Procurement Authority',
    'Architects Registration Council',
  ],
  nav: [
    {_key: 'nav-home', _type: 'linkItem', label: 'Home', href: '/'},
    {_key: 'nav-services', _type: 'linkItem', label: 'Services', href: '/services'},
    {
      _key: 'nav-construction',
      _type: 'linkItem',
      label: 'Construction',
      href: '/construction',
    },
    {_key: 'nav-designs', _type: 'linkItem', label: 'Designs', href: '/designs'},
    {_key: 'nav-contact', _type: 'linkItem', label: 'Contact', href: '/contact'},
  ],
  footerStatement:
    'Designing livable spaces. Solving everyday environmental problems. Delivering a wholistic service to every client.',
  footerColumns: [
    {
      _key: 'fc-practice',
      _type: 'footerColumn',
      title: 'Practice',
      items: [
        {_key: 'fl-1', _type: 'linkItem', label: 'Services', href: '/services'},
        {_key: 'fl-2', _type: 'linkItem', label: 'Construction', href: '/construction'},
        {_key: 'fl-3', _type: 'linkItem', label: 'Designs', href: '/designs'},
        {_key: 'fl-4', _type: 'linkItem', label: 'Contact', href: '/contact'},
      ],
    },
    {
      _key: 'fc-disciplines',
      _type: 'footerColumn',
      title: 'Disciplines',
      // No hrefs: the design renders this column as plain text, not links.
      items: [
        {_key: 'fd-1', _type: 'linkItem', label: 'Architectural Services'},
        {_key: 'fd-2', _type: 'linkItem', label: 'Engineering Services'},
        {_key: 'fd-3', _type: 'linkItem', label: 'Project Management'},
        {_key: 'fd-4', _type: 'linkItem', label: 'Construction'},
      ],
    },
  ],
  officeColumnTitle: 'Registered office',
  ctaBand: {
    _type: 'ctaBand',
    heading: "Let's build something lasting, together.",
    body: 'Plot 41A, Block J, Apire, Kumasi, Ghana · 0244 037 166 • 0274 271 421',
    button: {_type: 'cta', label: 'Start a conversation', href: '/contact'},
  },
  defaultSeo: {
    _type: 'seo',
    title: 'Bejewelled — Ideas well expressed!',
    description:
      'Bejewelled is a Ghanaian architectural, engineering and construction practice based in Kumasi, delivering a wholistic service from first design conversation to post-contract close-out.',
    noIndex: false,
  },
}

/* ------------------------------------------------------------------- run */

const SINGLETONS = [
  siteSettings,
  homePage,
  servicesPage,
  constructionPage,
  designsPage,
  projectPage,
  contactPage,
]

async function upsert(doc) {
  const existing = await client.getDocument(doc._id)
  if (existing && !force) return {id: doc._id, created: false}
  await client.createOrReplace(doc)
  return {id: doc._id, created: !existing}
}

async function main() {
  console.log(
    `Seeding ${client.config().projectId}/${client.config().dataset}` +
      (force ? '  [--force: existing documents will be overwritten]' : ''),
  )

  const ranks = orderRanks(SECTORS.length)
  const sectorResults = []
  for (const [index, title] of SECTORS.entries()) {
    const slug = title.toLowerCase()
    sectorResults.push(
      await upsert({
        _id: `sector-${slug}`,
        _type: 'sector',
        title,
        slug: {_type: 'slug', current: slug},
        orderRank: ranks[index],
      }),
    )
  }
  summarise('sectors', sectorResults)

  const singletonResults = []
  for (const doc of SINGLETONS) singletonResults.push(await upsert(doc))
  summarise('singletons', singletonResults)

  const skipped = [...sectorResults, ...singletonResults].filter((r) => !r.created)
  if (skipped.length && !force) {
    console.log(
      `\n  ${skipped.length} document(s) already existed and were left alone.` +
        '\n  Re-run with `npm run seed:content -- --force` to overwrite them.',
    )
  }

  console.log(
    '\nStill to supply, in the Studio:' +
      '\n  · Home  → hero photograph, portrait of the Principal Architect' +
      '\n  · Construction → site photograph (caption: "Site works under supervision · Kumasi")' +
      '\n  · Contact → map or photograph of the Apire office',
  )
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
