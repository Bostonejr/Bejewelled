import {defineQuery} from 'next-sanity'

/**
 * Every GROQ query the site issues.
 *
 * `defineQuery` is what makes `npm run typegen` able to see these — it tags the
 * string so the extractor can generate a result type per query into
 * `web/sanity.types.ts`. A query written as a plain template literal is
 * invisible to it and comes back as `any`.
 */

/**
 * Images are always fetched with their asset dereferenced, because two things
 * downstream need it: `metadata.lqip` is the base64 blur next/image shows while
 * the real file loads, and `metadata.dimensions` supplies the intrinsic aspect
 * ratio so a slot reserves its space before the bytes arrive.
 */
const IMAGE = /* groq */ `{
  alt,
  caption,
  hotspot,
  crop,
  asset->{_id, metadata{lqip, dimensions{width, height, aspectRatio}}}
}`

/** Enough of a project to draw a card or an index row. */
const PROJECT_CARD = /* groq */ `{
  _id,
  "slug": slug.current,
  "client": coalesce(client, title),
  scopeOfWorks,
  location,
  status,
  "sector": sector->title,
  mainImage ${IMAGE}
}`

/**
 * The ids of every project in portfolio order.
 *
 * This is how the record numbers stay honest. Numbers are never stored (see
 * docs/PLAN.md §5.4) — a component finds a project's position in this list and
 * renders `String(index + 1).padStart(2, "0")`. Fetching it alongside a page
 * means a card on Home shows the same number as the same project's detail page.
 */
const PROJECT_ORDER = /* groq */ `*[_type == "project" && defined(slug.current)] | order(orderRank asc)._id`

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    brandName,
    legalName,
    tagline,
    railLabel,
    phones,
    addressLines,
    digitalAddress,
    registrationLine,
    credentialStrip,
    nav[]{label, href},
    footerStatement,
    footerColumns[]{title, items[]{label, href}},
    officeColumnTitle,
    ctaBand{heading, body, button{label, href}},
    defaultSeo{title, description, noIndex, image ${IMAGE}},
    ogImage ${IMAGE},
    socialLinks[]{label, href}
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    hero{eyebrow, title, body, ctas[]{label, href}, image ${IMAGE}},
    about{
      eyebrow,
      statement,
      body,
      cta{label, href},
      recordLabel,
      stats[]{value, label}
    },
    disciplines{
      eyebrow,
      title,
      intro,
      items[]{title, body},
      cta{label, href},
      secondaryLink{label, href}
    },
    works{
      eyebrow,
      title,
      linkLabel,
      "featured": select(
        count(featuredProjects) > 0 => featuredProjects[]->${PROJECT_CARD},
        *[_type == "project" && defined(slug.current)] | order(orderRank asc)[0...3]${PROJECT_CARD}
      )
    },
    leadership{
      eyebrow,
      name,
      roleLine,
      bio,
      portrait ${IMAGE},
      credentials[]{label, value}
    },
    seo{title, description, noIndex, image ${IMAGE}},
    "projectOrder": ${PROJECT_ORDER}
  }
`)

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage"][0]{
    eyebrow,
    title,
    intro,
    services[]{title, tag, description, items},
    constructionBand{eyebrow, title, body, cta{label, href}},
    sectorsBlock{eyebrow, title, items[]{title, body}},
    seo{title, description, noIndex, image ${IMAGE}}
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0]{
    eyebrow,
    title,
    formIntro,
    serviceOptions,
    phoneNote,
    successHeading,
    successBody,
    successButtonLabel,
    contactFields[]{label, value},
    mapImage ${IMAGE},
    seo{title, description, noIndex, image ${IMAGE}}
  }
`)

export const DESIGNS_PAGE_QUERY = defineQuery(`
  {
    "page": *[_id == "designsPage"][0]{
      eyebrow,
      title,
      intro,
      allFilterLabel,
      defaultView,
      seo{title, description, noIndex, image ${IMAGE}}
    },
    "sectors": *[_type == "sector"] | order(orderRank asc){
      title,
      "slug": slug.current
    },
    "projects": *[_type == "project" && defined(slug.current)] | order(orderRank asc){
      ...${PROJECT_CARD},
      "sectorSlug": sector->slug.current
    }
  }
`)

/**
 * One project, plus the template strings that surround it and the full
 * portfolio order — the order supplies both this project's record number and
 * the previous/next links, which wrap around at either end exactly as the
 * design's router does.
 */
export const PROJECT_QUERY = defineQuery(`
  {
    "project": *[_type == "project" && slug.current == $slug][0]{
      _id,
      "slug": slug.current,
      "client": coalesce(client, title),
      title,
      scopeOfWorks,
      location,
      status,
      year,
      "sector": sector->title,
      note,
      commissionBody,
      mainImage ${IMAGE},
      gallery[] ${IMAGE},
      seo{title, description, noIndex, image ${IMAGE}}
    },
    "template": *[_id == "projectPage"][0]{
      backLabel,
      recordLine,
      fieldLabels{client, scope, location, status},
      prevLabel,
      nextLabel,
      commissionEyebrow,
      defaultCommissionBody
    },
    "order": *[_type == "project" && defined(slug.current)] | order(orderRank asc){
      _id,
      "slug": slug.current,
      "client": coalesce(client, title)
    }
  }
`)

/** Slugs for generateStaticParams. */
export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`)

export const CONSTRUCTION_PAGE_QUERY = defineQuery(`
  *[_id == "constructionPage"][0]{
    eyebrow,
    title,
    intro,
    heroImage ${IMAGE},
    stagesBlock{eyebrow, title, items[]{title, body}},
    comparison{
      eyebrow,
      title,
      leftLabel,
      rightLabel,
      rows[]{conventional, bejewelled}
    },
    capability{eyebrow, title, note, items[]{title, body}},
    seo{title, description, noIndex, image ${IMAGE}}
  }
`)
