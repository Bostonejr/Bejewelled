import type {Metadata} from 'next'

import {
  Badge,
  Button,
  Card,
  Eyebrow,
  Input,
  Logo,
  NumberedItem,
  ProjectRow,
  SectionHeading,
  Select,
  StatBlock,
  Textarea,
} from '@/components/ds'
import {ViewToggle} from './ViewToggle'

export const metadata: Metadata = {
  title: 'Design system',
  robots: {index: false, follow: false},
}

function Row({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className="border-t border-solid border-line-hairline pt-8 pb-16">
      <div className="type-label mb-8 text-text-muted">{title}</div>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  return (
    <div className="wrap py-24">
      <Eyebrow tone="muted">Verification</Eyebrow>
      <h1 className="type-h1 mt-4 mb-16">Design system</h1>

      <Row title="Button — 4 variants × 3 sizes">
        <div className="flex flex-col gap-6">
          {(['primary', 'accent', 'secondary', 'ghost'] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {variant} {size}
                </Button>
              ))}
              <Button variant={variant} disabled>
                Disabled
              </Button>
              <Button variant={variant} href="/dev/ds">
                As link
              </Button>
            </div>
          ))}
        </div>
      </Row>

      <Row title="Badge — 8 tones">
        <div className="flex flex-wrap gap-3">
          {(
            ['neutral', 'accent', 'success', 'warning', 'error', 'info', 'inverse', 'deep'] as const
          ).map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
      </Row>

      <Row title="Tag and Tabs — interactive">
        <ViewToggle />
      </Row>

      <Row title="Card — rest, interactive, featured">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <h3 className="type-h3">At rest</h3>
            <p className="type-body-sm mt-2 text-text-muted">
              Hairline border, no shadow. The border does the work.
            </p>
          </Card>
          <Card interactive href="/dev/ds">
            <h3 className="type-h3">Interactive</h3>
            <p className="type-body-sm mt-2 text-text-muted">
              Hover takes the border to gold and adds shadow-sm.
            </p>
          </Card>
          <Card featured>
            <h3 className="type-h3">Featured</h3>
            <p className="type-body-sm mt-2 text-text-muted">
              A 3px gold rule on the top edge, never the left alone.
            </p>
          </Card>
        </div>
      </Row>

      <Row title="Eyebrow — 3 tones, the third on its own field">
        <div className="flex flex-col gap-4">
          <Eyebrow>Accent — the default</Eyebrow>
          <Eyebrow tone="muted">Muted</Eyebrow>
          <div className="bg-surface-deep p-6">
            <Eyebrow tone="inverse">Inverse — gold-200, which clears 4.5:1 at 12px</Eyebrow>
          </div>
        </div>
      </Row>

      <Row title="SectionHeading — light and inverse">
        <div className="grid gap-10 md:grid-cols-2">
          <SectionHeading
            eyebrow="What We Do"
            title="Four core disciplines"
            intro="One accountable team covers the whole of a commission — design, engineering, management and construction."
          />
          <div className="bg-surface-deep p-8">
            <SectionHeading
              eyebrow="The Wholistic Approach"
              title="Four stages, one team"
              tone="inverse"
              intro="Construction is delivered and supervised by the same team that drew it."
            />
          </div>
        </div>
      </Row>

      <Row title="StatBlock — the practice record">
        <StatBlock
          columns={2}
          stats={[
            {value: '30+', label: 'Completed projects'},
            {value: '20+', label: 'Years of leadership'},
            {value: '4', label: 'Core disciplines'},
            {value: '2013', label: 'Registered'},
          ]}
        />
      </Row>

      <Row title="NumberedItem — light and inverse">
        <div className="grid gap-8 md:grid-cols-2">
          <NumberedItem number="01" title="Architectural Services">
            Concept design, spatial planning and full architectural documentation, grounded in our
            philosophy of designing genuinely livable, human-centred spaces.
          </NumberedItem>
          <div className="bg-surface-deep p-8">
            <NumberedItem number="02" title="Engineering Services" tone="inverse">
              Coordinated structural and engineering input that translates design intent into safe,
              buildable and durable solutions.
            </NumberedItem>
          </div>
        </div>
      </Row>

      <Row title="ProjectRow — the index view, now a keyboard-reachable link">
        <div className="border-t border-solid border-line-rule">
          <ProjectRow
            number="01"
            client="State Housing Company Limited"
            scope="Construction of 16 No. Town Houses"
            location="Osu, Accra"
            href="/dev/ds"
          />
          <ProjectRow
            number="02"
            client="Komfo Anokye Teaching Hospital Credit Union"
            scope="Office complex including a banking hall"
            location="Bantama, Kumasi"
            status="Ongoing"
            href="/dev/ds"
          />
        </div>
      </Row>

      <Row title="Form controls — rest, error, disabled">
        <div className="grid max-w-3xl gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input id="ds-name" label="Full name" placeholder="Your name" required />
            <Input
              id="ds-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              error="Enter a valid email address."
            />
          </div>
          <Input id="ds-disabled" label="Disabled" placeholder="Not editable" disabled />
          <Select
            id="ds-service"
            label="Service required"
            placeholder="Select a service"
            options={[
              'Architectural Services',
              'Engineering Services',
              'Project Management',
              'Construction',
              'Full wholistic service',
            ]}
          />
          <Textarea
            id="ds-about"
            label="About the project"
            rows={6}
            placeholder="Location, type of building, and where the project stands today."
            hint="The more detail, the more useful our first reply."
          />
        </div>
      </Row>

      <Row title="Logo — lockup, mark, wordmark, on paper and on ink">
        <div className="flex flex-wrap items-end gap-10">
          <Logo variant="lockup" height={66} />
          <Logo variant="mark" height={66} />
          <Logo variant="wordmark" height={24} />
        </div>
        <div className="mt-8 flex flex-wrap items-end gap-10 bg-surface-inverse p-8">
          <Logo variant="lockup" on="dark" height={66} />
          <Logo variant="mark" on="dark" height={66} />
        </div>
      </Row>

      <Row title="Type scale — the composed roles">
        <div className="flex flex-col gap-5">
          <div className="type-display">Display 68</div>
          <div className="type-h1">Heading 1 — 54</div>
          <div className="type-h2">Heading 2 — 42</div>
          <div className="type-h3">Heading 3 — 26</div>
          <p className="type-body-lg measure">
            Body large, 18px at 1.65, capped at 68 characters. We believe architecture is more than
            the design of buildings — it is a tool for creating livable spaces and solving everyday
            environmental problems.
          </p>
          <p className="type-body measure">Body, 16px at 1.65.</p>
          <p className="type-body-sm text-text-muted">Body small, 14px at 1.5.</p>
          <div className="type-eyebrow text-text-accent">Eyebrow — 12px, 0.24em</div>
          <div className="type-label text-text-muted">Label — 11px mono</div>
        </div>
      </Row>
    </div>
  )
}
