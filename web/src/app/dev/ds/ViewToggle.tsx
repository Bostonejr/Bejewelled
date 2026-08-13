'use client'

import {useState} from 'react'

import {Tabs, Tag} from '@/components/ds'

const SECTORS = ['All', 'Residential', 'Commercial', 'Educational', 'Industrial', 'Healthcare']

export function ViewToggle() {
  const [sector, setSector] = useState('All')
  const [view, setView] = useState('plates')

  return (
    <div className="flex flex-wrap items-end justify-between gap-8">
      <div className="flex flex-wrap gap-2.5">
        {SECTORS.map((s) => (
          <Tag key={s} selected={s === sector} onClick={() => setSector(s)}>
            {s}
          </Tag>
        ))}
      </div>
      <Tabs
        tabs={[
          {value: 'plates', label: 'Plates'},
          {value: 'index', label: 'Index'},
        ]}
        value={view}
        onChange={setView}
      />
    </div>
  )
}
