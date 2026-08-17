import {siteDefaults, type SiteSettings} from '@/content/site'
import {sanityFetch} from '@/sanity/live'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries'

/**
 * Site settings, with the design's own copy behind them.
 *
 * The chrome renders on every route, so it must never render empty. If the
 * singleton has not been seeded, or an editor clears a field, each value falls
 * back to the string transcribed from the design file rather than to nothing.
 * That keeps a half-finished edit from blanking the footer of the whole site.
 *
 * Arrays fall back only when absent or empty — an editor who deliberately
 * removes every social link gets no social links, not the defaults back.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const {data} = await sanityFetch({query: SITE_SETTINGS_QUERY})
  if (!data) return siteDefaults

  const list = <T,>(value: readonly T[] | null | undefined, fallback: T[]): T[] =>
    value && value.length > 0 ? [...value] : fallback

  return {
    brandName: data.brandName ?? siteDefaults.brandName,
    legalName: data.legalName ?? siteDefaults.legalName,
    tagline: data.tagline ?? siteDefaults.tagline,
    railLabel: data.railLabel ?? siteDefaults.railLabel,

    nav: list(
      data.nav
        ?.filter((item) => item?.label && item?.href)
        .map((item) => ({label: item.label!, href: item.href!})),
      siteDefaults.nav,
    ),

    phones: list(data.phones, siteDefaults.phones),
    addressLines: list(data.addressLines, siteDefaults.addressLines),
    digitalAddress: data.digitalAddress ?? siteDefaults.digitalAddress,
    // The two credential switches are the one pair of fields where an absent
    // value must not fall back to "render it". They default off in the schema
    // and off here, so an unseeded or older singleton hides the credentials
    // rather than publishing claims nobody has turned on.
    showRegistrationLine: data.showRegistrationLine ?? siteDefaults.showRegistrationLine,
    registrationLine: data.registrationLine ?? siteDefaults.registrationLine,
    showCredentialStrip: data.showCredentialStrip ?? siteDefaults.showCredentialStrip,
    credentialStrip: list(data.credentialStrip, siteDefaults.credentialStrip),

    footerStatement: data.footerStatement ?? siteDefaults.footerStatement,
    footerColumns: list(
      data.footerColumns
        ?.filter((column) => column?.title)
        .map((column) => ({
          title: column.title!,
          items:
            column.items
              ?.filter((item) => item?.label)
              .map((item) => ({label: item.label!, href: item.href ?? undefined})) ?? [],
        })),
      siteDefaults.footerColumns,
    ),
    officeColumnTitle: data.officeColumnTitle ?? siteDefaults.officeColumnTitle,

    ctaBand: {
      heading: data.ctaBand?.heading ?? siteDefaults.ctaBand.heading,
      body: data.ctaBand?.body ?? siteDefaults.ctaBand.body,
      button: {
        label: data.ctaBand?.button?.label ?? siteDefaults.ctaBand.button.label,
        href: data.ctaBand?.button?.href ?? siteDefaults.ctaBand.button.href,
      },
    },
  }
}
