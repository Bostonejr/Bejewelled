/**
 * The Bejewelled design system, ported from the Claude Design bundle
 * (bejewelled-design-system-90056384). Fourteen primitives — the ones the
 * website actually uses.
 *
 * Deviations from the source are limited to three kinds, each annotated at the
 * component: hover/press state moved from React state to CSS so components can
 * stay on the server; accessibility corrections (see docs/PLAN.md §9 gap #07);
 * and responsive behaviour, which the desktop-only design does not define
 * (gap #01).
 */

export {Badge} from './Badge'
export {Button} from './Button'
export {Card} from './Card'
export {Eyebrow} from './Eyebrow'
export {Input} from './Input'
export {Logo} from './Logo'
export {NumberedItem} from './NumberedItem'
export {ProjectRow} from './ProjectRow'
export {SectionHeading} from './SectionHeading'
export {Select} from './Select'
export {StatBlock} from './StatBlock'
export {Tabs} from './Tabs'
export {Tag} from './Tag'
export {Textarea} from './Textarea'

export type {Stat} from './StatBlock'
export type {Tab} from './Tabs'
