/**
 * Site chrome — the frame every screen sits inside. Ported from the fixed
 * <aside>, sticky <header> and ink <footer> in `Bejewelled Website.dc.html`,
 * plus the shared CTA band.
 *
 * The mobile behaviour of the rail, header and menu is derived rather than
 * transcribed: the design is desktop-only (gap #01 in docs/PLAN.md). Each
 * derivation is annotated at the component and reuses tokens the design system
 * already defines — no new colours, radii or type sizes.
 */

export {CtaBand} from './CtaBand'
export {MobileMenu} from './MobileMenu'
export {SheetRail} from './SheetRail'
export {SiteFooter} from './SiteFooter'
export {SiteHeader} from './SiteHeader'
export {SiteNav} from './SiteNav'
