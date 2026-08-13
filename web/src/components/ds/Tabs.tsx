'use client'

/** Ported from components/navigation/Tabs.jsx. */

export type Tab = {value: string; label: string}

export function Tabs({
  tabs,
  value,
  onChange,
  className = '',
}: {
  tabs: Tab[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      className={['flex gap-8 border-b border-solid border-line-hairline', className]
        .filter(Boolean)
        .join(' ')}
    >
      {tabs.map((tab) => {
        const on = tab.value === value
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={() => onChange(tab.value)}
            className={[
              'cursor-pointer border-0 border-b-2 border-solid bg-none pb-4 -mb-px',
              'type-eyebrow transition-control',
              on
                ? 'border-b-line-accent text-text-heading'
                : 'border-b-transparent text-text-muted',
            ].join(' ')}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
