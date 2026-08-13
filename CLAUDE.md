# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The marketing site for Bejewelled Enterprise, a Ghanaian architecture/engineering/construction
practice in Kumasi. Two independent npm projects — `web/` (Next.js) and `studio/` (Sanity Studio) —
plus root-level seed scripts. There are **no npm workspaces**; each has its own `package.json` and
`node_modules`, and the root scripts shell into them with `--prefix`.

## Commands

Run from the repo root:

```bash
npm run dev            # site  → http://localhost:3000
npm run dev:studio     # Studio → http://localhost:3333  (needs `npx sanity login` first)
npm run build          # production build of the site
npm run lint           # eslint over web/
npm run typegen        # schema.json + web/src/sanity/types.generated.ts
npm run seed:content   # sectors + the seven page singletons
npm run seed:projects  # Project Images/ → Sanity   (add -- --dry-run first)
```

Typechecking is per-project and is not wired to a root script:

```bash
cd web && npx tsc --noEmit
cd studio && npx tsc --noEmit
```

**There is no test suite.** Verification in this repo means: `next build`, `tsc --noEmit`,
`sanity build`, and driving the running site in a browser. Don't claim a change is verified on a
compile alone.

Both seed scripts are idempotent — they skip existing documents unless passed `--force`, and Sanity
deduplicates uploaded assets by content hash.

## The design is the source of truth

`.design-src/` holds the imported Claude Design project: `Bejewelled Website.dc.html` (all six
screens, the authoritative markup and copy) and `_ds_bundle.js` (the 21 component implementations
with their exact padding, hover and focus values). It is a **fidelity reference, never imported by
the apps**.

When a layout question comes up, read the design file rather than guessing. Two standing corrections:

- The `ui_kits/website/` components inside `_ds_bundle.js` are **stale** — they contain an
  `About.jsx` and a `home/services/portfolio/about/contact` nav that do not exist. The real routing
  is `home/services/construction/designs/project/contact`, and there is no About page (leadership
  lives in the lower third of Home).
- Where the design system readme and the design HTML disagree, **the HTML wins** — it is the
  artefact. (Header height is 76px, not the readme's 72/56.)

`docs/PLAN.md` carries a 19-item gap ledger: every place the design, the brief and reality don't
line up, and how each was resolved. Deviations from the design are annotated at the component that
makes them and cite their gap number. Follow that convention.

## Two CSS layering rules that pull in opposite directions

Both are load-bearing and both fail **silently**. See `web/src/app/globals.css`.

| Sheet | Must be | Break it and… |
|---|---|---|
| `styles/tokens/{colors,typography,spacing,elevation,motion}.css` | **unlayered** | Their `:root` names collide with Tailwind v4's theme namespace (`--radius-md`, `--text-2xs`, `--shadow-sm`, `--ease-standard`, `--font-display`). Tailwind emits its own values in `@layer theme`; only unlayered CSS overrides them. Layered, every colliding token resolves to Tailwind's default. |
| `styles/tokens/base.css` | **`layer(base)`** | It's a reset. Unlayered, `p{margin:0}` and `h1–h4{margin:0}` outrank `@layer utilities`, and every Tailwind `mt-*` on a paragraph or heading silently does nothing. |

`@theme inline` (not plain `@theme`) is required in the bridge, or opacity modifiers like
`bg-ink-900/60` stop resolving.

After any structural change to `globals.css`, compile and read the output:

```bash
cd web && npx @tailwindcss/cli -i src/app/globals.css -o /tmp/out.css
```

Tailwind emits utilities **indented** inside `@layer utilities` — `grep -c '^\.'` returns ~2 and
looks like total failure. Use `grep -cE '^\s+\.'`.

Never hand-edit the token sheets; they are verbatim copies and a re-import overwrites them. Change
the Claude Design project instead.

## Sanity data flow

```
studio/schemaTypes/**  →  sanity schema extract  →  studio/schema.json
web/src/sanity/queries.ts  ─────┬──────────────→  sanity typegen generate
                                └──────────────→  web/src/sanity/types.generated.ts
```

- **Run `npm run typegen` after editing GROQ, not just after editing the schema.** Query result types
  are derived from the query strings, and `defineQuery` is what makes them visible to the extractor —
  a plain template literal comes back as `any`.
- `web/src/sanity/types.generated.ts` is generated. Never hand-edit it.
- **Singleton document ids equal their type names** (`homePage`, `siteSettings`, …), so a query
  fetches one by `_id` with no filter and `structure.ts` can pin it. `SINGLETON_TYPES` in
  `studio/schemaTypes/index.ts` is what removes their create/duplicate/delete actions.
- `getSiteSettings()` (`web/src/sanity/settings.ts`) merges the singleton over `siteDefaults`
  (`web/src/content/site.ts`, the design's copy transcribed). The chrome renders on every route, so
  it must never render empty — a cleared field falls back rather than blanking the footer sitewide.

### Two type traps

**Stega.** `sanityFetch` wraps every string in `StegaString` for the Presentation tool.
`StegaString<string>` is assignable to `string`, but `StegaString<"plates">` is **not** assignable to
`"plates"` — so a component prop type lifted straight off `*_QUERY_RESULT` is rejected by the data
the fetch returns wherever the schema has an options list. Either widen the field to `string` in a
structural prop type, or compare with `String(value) === 'literal'`.

**No request, no `sanityFetch`.** It reads `draftMode()`, so it cannot be used in
`generateStaticParams` or `sitemap.ts`. Use the plain `client` with `.withConfig({useCdn: false})`
there.

### Icons

`@sanity/icons` v5 removed root named exports. Import per-icon subpaths —
`import {HomeIcon} from '@sanity/icons/Home'`. The root import typechecks clean and fails at bundle
time.

## Numbering is derived, never stored

The brand numbers everything `01`, `02`, `03` — "a visual system, not decoration". **There is no
number field anywhere in the content model, and adding one would be a regression.** Numbers come
from `web/src/lib/numbering.ts` at render time:

- `twoDigit(index)` for array items — reorder the array in the Studio and everything below renumbers.
- `recordNumber(order, id)` for projects, where `order` is the full ordered project id list. This is
  why a card in Selected Works, a row in the designs index and the project's own page always print
  the same number — and why filtering the designs index does **not** renumber the visible records.

## Brand law worth knowing before writing copy

Enforced as field descriptions throughout `studio/schemaTypes/` (see `brandCopy.ts`):

- Ghanaian/British spelling — *recognised*, *programme*, *centred*. The practice writes
  **"wholistic"**, not holistic. Don't "correct" it.
- No emoji. Exclamation marks appear in the tagline and nowhere else.
- **"Bejewelled"** in nav, marketing and titles; **"Bejewelled Enterprise"** in the copyright line,
  the registration strip and the project record line. Separate fields, not interchangeable.
- Gold is the only interactive colour. Blue is a field and annotation colour, never interactive. On
  a blue field, eyebrows are `gold-200` — the mid golds fail 4.5:1 at 12px.
- Motion: a fade plus a 12–16px rise on scroll-in, and nothing else. No parallax, scale or carousels.
  `motion.css` zeroes every duration under `prefers-reduced-motion`, so reference the duration tokens
  rather than literals.

## Environment

`web/.env.local` holds the Sanity project id/dataset/apiVersion, `SANITY_API_READ_TOKEN`,
`WEB3FORMS_ACCESS_KEY` and `NEXT_PUBLIC_SITE_URL`. `.env` at the root holds
`SANITY_API_WRITE_TOKEN`, used by `scripts/` and nothing else. Both are gitignored.

While `WEB3FORMS_ACCESS_KEY` is empty, `/api/contact` returns a stubbed success in development and a
clear 503 in production — it never silently drops an enquiry. That route's rate limiter is
**in-process**: a `429` while testing usually means a previous test used up the 5/hour, and
restarting the dev server clears it.

## Also present

- `web/AGENTS.md` (included by `web/CLAUDE.md`) is auto-generated by `next dev` and carries Next.js
  16-specific guidance. It is regenerated on each dev run; commit it with your work rather than
  reverting it.
- `sessions/` holds dated handoff files from previous sessions — read the most recent one before
  resuming work.
- `Project Images/` is 116 MB of source photography, gitignored and already uploaded to Sanity.
