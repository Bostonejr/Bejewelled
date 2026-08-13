/**
 * The ink band of registrations under the hero.
 *
 * Exact values: --surface-inverse ground, an auto-fit grid at minmax(220px,
 * 1fr), 22px of vertical padding, small uppercase mono at --text-xs and 0.12em
 * in --ink-200, and 1px --line-inverse dividers.
 *
 * The first cell carries no left divider and no left padding so the row starts
 * flush with the column — the same rule StatBlock follows.
 */
export function CredentialStrip({items}: {items: string[]}) {
  if (!items.length) return null

  return (
    <section className="bg-surface-inverse text-text-on-inverse">
      <div className="wrap">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {items.map((item, index) => (
            <div
              key={item}
              className={[
                'py-[22px] pr-6 font-mono text-xs uppercase tracking-[0.12em] text-ink-200',
                index === 0 ? 'pl-0' : 'border-l border-line-inverse pl-6',
              ].join(' ')}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
