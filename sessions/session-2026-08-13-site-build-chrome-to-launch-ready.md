# Session — 2026-08-13 — Chrome, schemas, all six screens, contact form, SEO

> **Read first:** `README.md` (running it, env, the two CSS layering rules), `docs/PLAN.md` (the
> 19-item gap ledger and content model), and the previous handoff
> `sessions/session-2026-08-13-design-import-and-ds-port.md` (design import, token port, the 14 DS
> primitives). This file continues directly from that one.
>
> `web/AGENTS.md` + `web/CLAUDE.md` are Next.js 16 agent guidance shipped by create-next-app — they
> are genuinely useful for this Next version, and were kept deliberately. There is still no
> `CLAUDE.md` at the repo root.

---

## 1. What this session was

**Starting point:** chrome not built, `studio/schemaTypes/index.ts` exporting `[]`, an empty Sanity
dataset, and `web/src/app/page.tsx` a throwaway placeholder. Tasks 1–2 of the previous plan done,
3–8 pending.

**Goal:** finish the build — site chrome, the Sanity content model, all six screens, the contact
form, and the SEO/a11y pass.

**Outcome:** all six screens are built and driven by Sanity, the dataset is populated (12 content
documents + 11 project records + 41 photographs), the enquiry form works end to end, and both apps
build and typecheck clean. Deploy is the only phase not done, and it needs the user's accounts.

**Constraints carried over:** reproduce the design exactly; everything editable in Sanity, not code;
identify gaps rather than paper over them.

---

## 2. What was built / changed

### Site chrome ✅ verified visually at 1440px and 390px
`web/src/components/chrome/` — `SheetRail`, `SiteHeader`, `SiteNav`, `MobileMenu`, `SiteFooter`,
`CtaBand`. Wired into `layout.tsx` with a skip link.

Measured against the design in the browser and confirmed exact: rail 44px / `--paper-050` / 18px
padding / z-60; header 76px min-height, sticky, `--shadow-inset-rule`, 56px gutters, 24px gap, 28px
nav gap, active link `--type-eyebrow` at 2.88px tracking with a 2px gold bottom rule; footer 128px
top margin, 96/32px padding, 4-column auto-fit at 56px gap, 66px dark lockup, gold-200 labels.

Mobile behaviour is **derived, not transcribed** (gap #01 — the design is desktop-only). Each
derivation reuses tokens the design system already owns and is annotated at the component: the rail
collapses to a 6px gold top bar, the nav gives way to a hamburger drawn from `--line-strong`
hairlines, and the menu sheet uses the `--overlay-veil` + `--blur-veil` pair the readme specifies,
with numbered rows on hairlines.

Two small additions the design does not specify, both annotated: nav and footer links get a hover
state (they had none at all), and the header phone number is a `tel:` link — visually identical at
rest.

### ⚠️ Bug found and fixed: the base reset was killing every margin utility
`base.css` was imported **unlayered**. Unlayered CSS outranks every cascade layer, so
`p { margin: 0 }` and `h1,h2,h3,h4 { margin: 0 }` silently beat Tailwind's `mt-*` utilities, which
Tailwind emits inside `@layer utilities`. Symptom: the footer statement and the CTA band paragraph
sat flush against the element above them; `mt-6` computed to `0px`.

Fix in `web/src/app/globals.css`: `@import "../styles/tokens/base.css" layer(base);`

This is the **mirror image** of gotcha 1 from the previous session and the two must not be confused —
they pull in opposite directions and both are load-bearing:

| Sheet | Must be | Why |
|---|---|---|
| `colors/typography/spacing/elevation/motion.css` | **unlayered** | Their `:root` names collide with Tailwind's theme namespace (`--radius-md`, `--text-2xs`, `--shadow-sm`, `--ease-standard`, `--font-display`). Tailwind emits its own values in `@layer theme`; only unlayered CSS overrides them. Layer these and every colliding token resolves to Tailwind's default. |
| `base.css` | **`layer(base)`** | It is a reset, declares no custom properties, and unlayered it outranks the utilities it is supposed to lose to. |

Verified after the change that `--radius-md: 4px`, `--text-2xs: 11px`, `--gold-500: #b88840` and
`--ease-standard` still compute to the design's values — the fix did not regress the collision.

### Sanity content model ✅ schema builds, typechecks, extracts
`studio/schemaTypes/` — 11 objects, 2 collections, 7 singletons. `structure.ts` pins pages in route
order, then drag-orderable Projects and Sectors, then the project template and settings.
`sanity.config.ts` removes create/duplicate/delete for singletons so a second Home page cannot be
made.

**There is no number field anywhere in the model.** Numbers are derived from position at render time
by `web/src/lib/numbering.ts` (§5.4 of the plan). `recordNumber()` takes the full ordered project id
list, so a card on Home, a row in the index and the project's own page always print the same number —
and filtering the designs index does *not* renumber, because these are record numbers, not positions
in a filtered view.

`altRequiredWithImage` in `brandCopy.ts`: alt text is required **once there is an image**, not
unconditionally. A plain `.required()` would have marked four documents invalid on day one over the
four photographs that do not exist yet.

### All six screens ✅ built, ✅ visually checked in the browser
| Route | Component location |
|---|---|
| `/` | `web/src/components/home/` — 6 sections |
| `/services` | inline in `web/src/app/services/page.tsx` |
| `/construction` | inline in `web/src/app/construction/page.tsx` |
| `/designs` | + `web/src/components/designs/DesignsControls.tsx` |
| `/designs/[slug]` | `web/src/app/designs/[slug]/page.tsx` |
| `/contact` | + `web/src/components/contact/EnquiryForm.tsx` |

Shared: `components/sections/{PageHeader,DeepBand,SheetMarker}`, `components/project/ProjectCard`,
`components/SanityImage`.

The designs filter and Plates/Index toggle live in the **URL query string**, not React state. The
grid stays a server component, a filtered view can be linked to, and the back button works; only the
two controls ship JavaScript. `Tag` and `Tabs` are used exactly as ported — the handler pushes a
query string instead of calling `setState`.

The `SheetMarker` ("Sheet 02 / 05") is derived from the route like the rail's number, so the two can
never disagree.

### Projects seeded ✅ verified — 41 photographs, 11 records
`scripts/seed-projects.mjs`. Case-insensitive `Main.jpg` match confirmed working, natural sort
confirmed (`Img_6` before `Img_10`), Sanity's content-hash dedupe makes re-runs idempotent.

⚠️ **A deliberate departure from the stated plan, and the most important thing in this file.** The
plan said publish the five photographed projects. Only **one** of them — Komfo Anokye Teaching
Hospital Credit Union — has a scope of works, location and sector anywhere in this repository; the
other four folders are photographs and a folder name. Those facts were **not invented**, so:

- **Published (1):** Komfo Anokye Teaching Hospital Credit Union — 6 photographs, full record.
- **Drafts with photographs, no facts (4):** Agogo Makro, Dekyi Appartments Gazebo, Gaze, Konkromase.
  The Studio shows each as invalid until scope/location/sector are filled in, which is the correct
  signal.
- **Drafts with facts, no photographs (6):** the profile-only projects, per plan §9.15(c).

### Contact form ✅ tested end to end
`web/src/app/api/contact/route.ts` + `web/src/components/contact/EnquiryForm.tsx` +
`web/src/lib/enquiry.ts` (validation shared by both, so client and server never disagree).

Every path exercised live against the running server:

| Case | Result |
|---|---|
| Valid submission | `200 {"success":true}` (dev stub — no key set) |
| Honeypot filled | `400`, generic message, Web3Forms never called |
| Missing name | `422` + field error |
| Malformed email | `422` + field error |
| Over-length field | `422` + field error |
| Malformed JSON | `400` |
| 6th post in an hour | `429` |
| Empty submit in the browser | errors shown, focus moved to the first bad field |
| Full submit in the browser | form replaced in place by the design's success state, 3px gold rule |

### SEO + a11y ✅
`sitemap.ts`, `robots.ts`, `StructuredData.tsx` (JSON-LD `ProfessionalService`), `not-found.tsx`,
`buildMetadata()` in `sanity/metadata.ts` with a title/description fallback chain, per-page
`generateMetadata`.

Audited every route in the browser: one h1 each, no heading skips, one banner + one main landmark,
zero images without alt, zero unnamed links or buttons, every form control labelled, `lang="en-GB"`,
canonical set, no horizontal overflow at 390px.

### Bugs fixed this session
| Bug | Root cause | Fix |
|---|---|---|
| `mt-*` dead on every `<p>` and `<h1>–<h4>` | unlayered `base.css` outranks `@layer utilities` | `layer(base)` on the import — `globals.css` |
| Prev/next both linked to the current page | wrap-around degenerates with one project; the design shipped 7 hardcoded records and never met the case | Drop the block below 2 projects — `designs/[slug]/page.tsx` |
| `/designs` skipped h1→h3 | cards are the page's primary content with no h2 between | `headingLevel` prop on `ProjectCard`; h2 on the index, h3 under "Recent commissions" on Home |
| Form controls had **no focus ring** | `controlClasses` set a blanket `outline-none`, killing the design system's own `:focus-visible` rule | Removed — `components/ds/field.tsx`. See §6 gotcha 3 |
| `generateStaticParams` failed the build | `sanityFetch` reads `draftMode()`, which has no request at build time | Use the plain `client` with `useCdn: false` |
| `@sanity/image-url` deprecation warning | v2 deprecated the default export | Named `createImageUrlBuilder` — `sanity/image.ts` |
| Studio `tsc` could not find `process` | no `@types/node` | Added to `studio` devDependencies |
| `sanity schema extract` failed on re-run | refuses to overwrite without `--force` | `--force` added to the `typegen` script |

---

## 3. Files touched

**Nothing is committed.** Branch `main`, still one commit behind (`799f2c7`). ~133 untracked paths
excluding `node_modules`, `.next/`, `studio/dist/`.

New this session (previous-session files not relisted):

| Path | Purpose |
|---|---|
| `README.md` | **New, root.** Layout, commands, env, the two CSS layering rules, the numbering rule |
| `scripts/lib/sanity.mjs` | Shared client, lexorank order ranks, summary helper |
| `scripts/seed-content.mjs` | 5 sectors + 7 singletons, the design's copy verbatim |
| `scripts/seed-projects.mjs` | `Project Images/` → Sanity; 41 uploads, 11 records |
| `studio/schemaTypes/**` | 11 objects, 2 collections, 7 singletons, `brandCopy.ts`, `parts.ts` |
| `studio/structure.ts` | Pinned pages, orderable collections |
| `studio/sanity.config.ts` | **Replaced.** Singleton guards + `presentationTool` |
| `web/src/components/chrome/**` | 6 chrome components + barrel |
| `web/src/components/{home,sections,designs,contact,project}/**` | Page sections |
| `web/src/components/{SanityImage,StructuredData}.tsx` | Image + JSON-LD |
| `web/src/content/site.ts` | Transcribed chrome copy — the fallback behind `siteSettings` |
| `web/src/lib/{numbering,enquiry}.ts` | Derived numbering; shared enquiry validation |
| `web/src/sanity/{queries,settings,metadata}.ts` | 8 GROQ queries, settings merge, metadata builder |
| `web/src/sanity/types.generated.ts` | **Generated — do not hand-edit.** Moved here from `web/sanity.types.ts` |
| `web/src/app/**` | 6 routes + `api/contact` + `api/draft-mode/enable` + sitemap/robots/404 |
| `web/src/app/globals.css` | **Edited.** `layer(base)` on base.css; `--shadow-inset-rule` bridged |
| `web/src/app/layout.tsx` | **Edited.** Chrome, skip link, `getSiteSettings()`, JSON-LD, `VisualEditing` |
| `web/src/components/ds/{field,ProjectCard}.tsx` | Focus ring restored; heading level prop |

Removed: `web/README.md`, `web/public/{next,vercel,file,globe,window}.svg` (create-next-app
boilerplate, verified unreferenced first).

**Build status:** `web` ✅ `next build` + `tsc --noEmit` clean, 13 routes.
`studio` ✅ `sanity build` + `tsc --noEmit` clean. No test suite exists.

---

## 4. Current state ⚠️

### Nothing is committed
All work is untracked. The user was told the tree is theirs to review — **do not commit without
asking.**

### A dev server is running in the background
```bash
# log
cat "$LOCALAPPDATA/Temp/claude/devlog.txt"
# find and kill (Windows / Git Bash)
netstat -ano | findstr :3000
taskkill //PID <pid> //F
# restart
cd D:/Projects/Bejewelled/web && npx next dev
```
Confirmed responding 200 on every route at end of session.

⚠️ The contact route's **rate limiter is in-process** — restarting the dev server is how you clear it.
A `429` while testing usually means an earlier test used up the 5/hour, not a bug.

### Live credentials on disk (gitignored, never commit)
| File | Contains |
|---|---|
| `web/.env.local` | project id `0xf46qxf`, dataset `production`, apiVersion `2026-02-01`, live `SANITY_API_READ_TOKEN`, **empty** `WEB3FORMS_ACCESS_KEY`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000` |
| `.env` (root) | live `SANITY_API_WRITE_TOKEN` — scripts only |

Both tokens were minted by the MCP in the previous session and appear in that transcript. Rotate at
https://www.sanity.io/manage/project/0xf46qxf if that matters.

### Sanity dataset is now populated
| Type | Count | State |
|---|---|---|
| `sector` | 5 | published |
| singletons | 7 | published |
| `project` | 11 | **1 published, 10 drafts** |
| image assets | 41 | uploaded (116 MB) |

⚠️ **The schema manifest is NOT deployed.** `sanity schema deploy` failed —
`SANITY_API_WRITE_TOKEN` has create/update grants but not `sanity.project/deploySchema`. Nothing on
the site depends on it; it is needed for Studio-side tooling. Fix: `npx sanity login` as the project
owner, then `npm run typegen && npx sanity schema deploy` from `studio/`.

### Still shipping that probably shouldn't
- `web/src/app/dev/ds/` — the component gallery. `noindex` set and `Disallow: /dev/` in robots.txt.
  Kept deliberately (it is the fastest way to eyeball all 14 primitives) — delete before launch if
  unwanted.
- `@tailwindcss/cli` in `web` devDependencies — used to compile and inspect `globals.css` when
  verifying the layering rules. Genuinely useful for that; removable otherwise.

### `Project Images/` is uploaded and gitignored
116 MB, 41 files, still on disk. Safe to archive off the working tree now.

---

## 5. Verification done

| Claim | How | Result |
|---|---|---|
| `web` compiles + typechecks | `next build`, `tsc --noEmit` | ✅ 13 routes |
| `studio` compiles + typechecks | `sanity build`, `tsc --noEmit` | ✅ |
| Chrome matches the design | read computed styles in Chrome against the design HTML | ✅ rail/header/footer/CTA all exact |
| Mobile chrome at 390px | same-origin iframe at 390px | ✅ rail→6px bar, nav→hamburger, gutters 56→24px, no overflow |
| Mobile menu | opened it, read the DOM | ✅ veil `rgba(17,17,17,.62)` + `blur(10px)`, scroll locked, focus moved, Escape wired |
| Comparison table stacks | iframe at 390px | ✅ labelled pairs, `--paper-050` retained |
| Margin fix | recomputed `marginTop` after the change | ✅ 24px / 14px / 24px where they were 0 |
| Token collision not regressed | read computed `:root` after the layer change | ✅ `--radius-md` 4px, `--text-2xs` 11px, `--gold-500` #b88840 |
| Seed idempotence | `--dry-run` then real run | ✅ 11 records, 41 assets, correct main-image and sort matching |
| Project page images | measured plate heights in Chrome | ✅ 560 + 5 × 320, all 6 loaded |
| Contact form | 8 cases live against the dev server + 2 in the browser | ✅ table in §2 |
| Every route responds | `curl` all 8 including 404 | ✅ |
| sitemap + robots | fetched and read | ✅ 6 URLs, correct disallows |
| a11y audit | scripted DOM audit on every route | ✅ headings, landmarks, alt, names, labels, overflow |
| Colour contrast | computed WCAG ratios for 15 real pairs | ⚠️ 12 pass, 3 fail — see §7 |

**Not verified:**
- ❌ **Still no side-by-side against the Claude Design preview.** Everything is measured against
  `Bejewelled Website.dc.html` and `_ds_bundle.js`, which is rigorous but is not the same as looking
  at the two renders together. Unchanged top risk from the previous session.
- ❌ Keyboard focus ring not *seen*. The Chrome window was never OS-focused, so `:focus` could not
  match and every focus probe was inconclusive. Settled from the CSS instead (`outline-none` gone,
  `:focus-visible` rule confirmed present in the served stylesheet) — sound, but not the same as
  tabbing through the site.
- ❌ Studio never launched (`sanity dev` not run — needs CLI auth). Structure, singleton guards and
  Presentation are compile-verified only.
- ❌ Presentation tool never opened. `presentationTool` and `/api/draft-mode/enable` are wired but
  untested.
- ❌ No Lighthouse run.
- ❌ No real enquiry delivered — there is no Web3Forms key yet.

---

## 6. Gotchas

**1. The two layering rules pull in opposite directions.** See the table in §2. Recompile
`globals.css` and inspect the output after any change to its structure:
```bash
cd web && npx @tailwindcss/cli -i src/app/globals.css -o /tmp/out.css
```

**2. Tailwind utilities are emitted indented inside `@layer utilities`.** `grep -c '^\.' out.css`
returns ~2 and looks like total failure. Use `grep -cE '^\s+\.'`. (Carried over — still true.)

**3. `outline-none` silently disables the design system's focus ring.** `base.css` declares
`:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px }` as system-wide law,
but `outline-none` sits in `@layer utilities` and wins. The DS bundle is itself inconsistent here —
`Input.jsx` draws a 1px gold outline on focus while `Textarea.jsx` and `Select.jsx` set
`outline: 'none'`. Resolved in favour of the system-wide rule. Don't reintroduce `outline-none`.

**4. TypeGen result types do not match what `sanityFetch` returns.** `sanityFetch` wraps every string
in `StegaString` for the Presentation tool. `StegaString<string>` is assignable to `string`, but
`StegaString<"plates">` is **not** assignable to `"plates"` — so a component prop type lifted straight
off `*_QUERY_RESULT` rejects the data the fetch returns wherever the schema has an options list.
Two fixes, both used: widen the field to `string` in a structural prop type
(`SelectedWorks.tsx`), or `String(value) === 'literal'` when comparing (`designs/page.tsx`).

**5. `sanityFetch` cannot be used in `generateStaticParams` or `sitemap.ts`.** It reads `draftMode()`,
which needs a request. Use the plain `client` with `.withConfig({useCdn: false})`.

**6. Generated types moved.** `web/sanity.types.ts` → `web/src/sanity/types.generated.ts`, so it is
importable as `@/sanity/types.generated`. Configured in `studio/sanity-typegen.json`.

**7. Run `npm run typegen` after editing GROQ, not just after editing the schema.** The query result
types come from the query strings in `web/src/sanity/queries.ts`, and `defineQuery` is what makes
them visible to the extractor — a plain template literal comes back as `any`.

**8. `@sanity/icons` v5 has no root named exports.** `import {HomeIcon} from '@sanity/icons/Home'`.
The root import typechecks clean and then fails at bundle time. (Carried over — confirmed true.)

**9. `Agogo Makro/Main.jpg` has a capital M.** The seed script matches `/^main\./i`. (Carried over.)

**10. The design has no About page.** The `_ds_bundle.js` ui_kit's `About.jsx` and its
`home/services/portfolio/about/contact` nav are **stale**. The authoritative routing is in
`Bejewelled Website.dc.html`: `home/services/construction/designs/project/contact`. (Carried over.)

**11. Brand copy rules.** Ghanaian/British spelling; the practice writes **"wholistic"**, not
holistic; no emoji; exclamation marks only in the tagline; two-digit numbering is a system;
"Bejewelled" for marketing/nav, "Bejewelled Enterprise" for legal/copyright. These are now enforced
as field descriptions throughout `studio/schemaTypes/`. (Carried over.)

**12. Blue is never interactive.** Gold is the only accent. On a blue field eyebrows are `gold-200` —
the mid golds fail 4.5:1 at 12px. (Carried over.)

**13. `StatBlock` puts a stray left rule at the start of every row after the first.** It special-cases
only `i === 0`, so in the 2-column layout on Home, cell 3 gets a left border and left padding that
cell 1 does not. Confirmed against `_ds_bundle.js` — **this is the design system's own behaviour and
the port is faithful.** Left as-is deliberately; changing it would be changing the design.

---

## 7. Next steps / open items

### Assistant, in order
1. **Colour contrast.** Three of the design system's own token pairs miss WCAG AA on the paper ground.
   These are design-system values used sitewide, so they were reported rather than changed. The
   minimal darkening that fixes each — 2.5% to 7.5%, visually imperceptible:

   | Token | Now | Ratio | Needs | Suggested | New ratio |
   |---|---|---|---|---|---|
   | `--ink-400` (`--text-muted`) | `#75746C` | 4.27 | 4.5 | `#717068` | 4.53 |
   | `--gold-600` (`--text-accent`) | `#9C7134` | 3.96 | 4.5 | `#906930` | 4.51 |
   | `--gold-500` (rules, focus ring) | `#B88840` | 2.88 | 3.0 | `#B3853E` | 3.02 |

   `--text-muted` and `--text-accent` carry the eyebrows, mono labels and record numbers — small
   text, so the 4.5 threshold applies. Note the design system readme already fixed the same problem
   on the blue field (gold-200 eyebrows) but not on paper. **Needs a decision:** these edits belong
   in the Claude Design project so a re-import does not undo them.

2. **Tab through the site in a focused browser window** and confirm the gold focus ring actually
   appears on every control. The CSS is right; it has not been seen.

3. **Launch the Studio** (`npm run dev:studio`, needs `sanity login`) and confirm the pinned
   structure, the singleton guards, and drag-ordering all behave.

4. **Open the Presentation tool** and confirm click-to-edit against `http://localhost:3000`.

5. **Lighthouse** on all six screens once deployed.

### User owes
1. **Scope of works, location and sector for four projects** — Agogo Makro, Dekyi Appartments Gazebo,
   Gaze, Konkromase. They are drafts in the Studio with their photographs already attached; fill the
   three fields and publish. **This is the single biggest blocker to the portfolio looking finished.**
2. **Web3Forms access key** → `WEB3FORMS_ACCESS_KEY` in `web/.env.local`, plus the inbox enquiries
   should reach.
3. **Four photographs** with no source: home hero, portrait of Rosemary Dwamena, site works in
   progress, Apire office/map. Every slot renders as a plain `--surface-plate` field until supplied;
   the Leadership section renders as a single text column rather than showing an empty plate where a
   face should be. Construction's caption, for whoever adds the photograph:
   *"Site works under supervision · Kumasi"*.
4. **Alt text review.** All 41 uploaded photographs currently carry the project name as alt text —
   true, but not a description.
5. **`sanity login`** as project owner, then `npx sanity schema deploy` from `studio/`.
6. **Decide whether to commit** the current tree.
7. **Deploy** (task #7): Vercel, env vars including a real `NEXT_PUBLIC_SITE_URL`, add the deployed
   origin as a Sanity CORS origin, set `SANITY_STUDIO_PREVIEW_URL` before `sanity deploy`.
8. Optionally correct two folder-name spellings in the Studio — "Dekyi **Appartments** Gazebo",
   "Agogo **Makro**". Seeded verbatim per instruction; slugs are pinned, so renaming the title will
   not break a URL.
