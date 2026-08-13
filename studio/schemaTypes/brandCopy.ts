/**
 * Brand law, surfaced where an editor can actually trip over it.
 *
 * These strings come from the design system readme. They are field
 * descriptions rather than validation rules on purpose — a spellchecker in the
 * schema would fight the editor over proper nouns and quoted material. The
 * rules that CAN be enforced mechanically (numbering, the two brand names) are
 * enforced structurally instead: there is no number field anywhere in this
 * model, and `brandName` / `legalName` are separate fields in siteSettings.
 */

export const SPELLING =
  'Ghanaian/British spelling — recognised, programme, centred. The practice writes "wholistic", not holistic.'

export const NO_EMOJI =
  'No emoji. Exclamation marks belong in the tagline and nowhere else.'

export const COPY = `${SPELLING} ${NO_EMOJI}`

export const NUMBERING =
  'Numbered 01, 02, 03 automatically from its position in this list. Reorder the list to renumber — never type a number into the text.'

export const EYEBROW =
  'The small wide-tracked uppercase label above the heading. Two or three words.'

export const ALT_TEXT =
  'Describes the photograph for screen readers and for anyone the image fails to load for. Say what is in it, not that it is a photo.'

/** Applied to every image field so the Studio always offers hotspot cropping. */
export const IMAGE_OPTIONS = {hotspot: true} as const

/**
 * Alt text is required once there IS an image, and only then.
 *
 * A plain `.required()` would mark four documents invalid on day one: the home
 * hero, the portrait of the Principal Architect, the construction site
 * photograph and the Apire office are not in `Project Images/` and have to be
 * supplied later (docs/PLAN.md gap #17). Those slots render as plain plates
 * until then, and an empty slot should not read as an error. The moment an
 * asset is dropped in, alt text becomes mandatory.
 */
export const altRequiredWithImage = (
  alt: unknown,
  context: {parent?: unknown},
): true | string => {
  const parent = context.parent as {asset?: unknown} | undefined
  if (!parent?.asset) return true
  return typeof alt === 'string' && alt.trim().length > 0
    ? true
    : 'Alt text is required once a photograph is added'
}
