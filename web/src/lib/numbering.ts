/**
 * The brand's two-digit numbering, in one place.
 *
 * "01, 02, 03 is a visual system, not decoration" — design system readme. The
 * corollary, and the reason this file exists rather than a `number` field in
 * Sanity: an editor never types one. Numbers are derived from position at
 * render time, so inserting an item at position three renumbers everything
 * below it, everywhere it appears. See docs/PLAN.md §5.4.
 */

/** `0` → "01", `9` → "10". Zero-based index in, one-based label out. */
export const twoDigit = (index: number): string =>
  String(index + 1).padStart(2, '0')

/**
 * A project's record number: its position in the full portfolio order.
 *
 * Passed the ordered list of every project id, so a card in Selected Works, a
 * row in the Designs index and the project's own detail page all print the same
 * number. A project missing from the list (unpublished, or fetched before the
 * order was) falls back to "01" rather than rendering "NaN".
 */
export function recordNumber(order: string[], id: string): string {
  const index = order.indexOf(id)
  return twoDigit(index < 0 ? 0 : index)
}
