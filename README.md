# Bejewelled

The website for Bejewelled Enterprise — a Ghanaian architectural, engineering and
construction practice in Kumasi and Accra.

The design is a 1:1 port of the Claude Design project *Bejewelled Website Design*
imported to `.design-src/` as a fidelity
reference. Every visible string is a Sanity field.

## Layout

| Path | What it is |
|---|---|
| `web/` | Next.js 16 · React 19 · Tailwind v4 · next-sanity. The site. |
| `studio/` | Sanity Studio, standalone. The content model and the editing interface. |
| `scripts/` | One-off seeding: the design's copy, and `Project Images/` → Sanity. |
| `docs/PLAN.md` | The build plan — gap ledger, content model, phase sequence. |
| `.design-src/` | The imported design. Reference only; never imported by the apps. |
| `Project Images/` | 116 MB of source photographs, gitignored. Already uploaded. |

## Running it

```bash
npm run dev          # the site, http://localhost:3000
npm run dev:studio   # the Studio, http://localhost:3333
npm run build        # production build of the site
npm run typegen      # regenerate web/src/sanity/types.generated.ts from the schema
```

Run `npm run typegen` after any change to `studio/schemaTypes/` **or** to the GROQ
in `web/src/sanity/queries.ts` — the generated types are what keeps the two in step.

## Environment

`web/.env.local` (gitignored):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=0xf46qxf
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-01
SANITY_API_READ_TOKEN=…        # server only — Live Content and draft mode
RESEND_API_KEY=…               # server only — the enquiry form
ENQUIRY_TO=…                   # inbox the enquiries reach
ENQUIRY_FROM=…                 # verified sender, "Bejewelled <enquiries@…>"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.env` at the repo root holds `SANITY_API_WRITE_TOKEN`, used by `scripts/` and by
nothing else. Neither file is committed.

While any of `RESEND_API_KEY` / `ENQUIRY_TO` / `ENQUIRY_FROM` is empty the enquiry
route returns a stubbed success in development and a clear 503 in production — it
never silently drops an enquiry.

Mail must go through a provider that accepts a **server-side** call. Web3Forms, the
original choice, does not: its free tier answers a server call with `403 "Use our API
in client side"` and its access key is public by design, which defeats the point of
having `/api/contact` at all.

## Seeding

```bash
npm run seed:content            # sectors + the seven page singletons
npm run seed:projects           # Project Images/ → Sanity
npm run seed:projects -- --dry-run
```

Both are idempotent: they leave existing documents alone unless passed `--force`,
and Sanity deduplicates uploaded assets by content hash.

## Two things worth knowing before editing CSS

1. **The token sheets in `web/src/styles/tokens/` must stay unlayered.** Their
   `:root` custom properties collide by name with Tailwind v4's theme namespace
   (`--radius-md`, `--text-2xs`, `--shadow-sm`, `--ease-standard`, `--font-display`).
   Unlayered CSS outranks `@layer theme`, which is the only reason the design's
   values win. Move those `@import`s into a layer and every colliding token
   silently resolves to Tailwind's default instead.

2. **`base.css` must stay layered** (`layer(base)`), for the mirror-image reason:
   an unlayered `p { margin: 0 }` outranks every Tailwind margin utility, and
   `mt-6` on a paragraph silently does nothing.

Both are explained at the point of use in `web/src/app/globals.css`.

## Numbering

The brand numbers everything `01`, `02`, `03`. There is no number field anywhere in
the content model — numbers are derived from position at render time by
`web/src/lib/numbering.ts`. Reorder a list in the Studio and everything below it
renumbers, including the previous/next links on project pages.
