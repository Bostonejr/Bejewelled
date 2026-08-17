# Bejewelled Website — Build Plan

**Source of truth:** Claude Design project `701da384-a368-4c18-a470-3a09dffbe175` — "Bejewelled Website Design"
**Imported:** 2026-08-13 → `.design-src/` (design HTML, DS bundle, token CSS, 5 logo PNGs)

---

## 1. What was imported

| Artefact | Local path | Role |
|---|---|---|
| `Bejewelled Website.dc.html` (704 lines) | `.design-src/` | **The design.** Full markup for all 6 screens + the data that drives them |
| `_ds_bundle.js` (2 499 lines) | `.design-src/` | 21 component implementations — exact padding, hover, press, focus behaviour |
| `tokens/*.css` (7 files) | recorded below | colours, type, spacing, elevation, motion, base reset |
| `logo-lockup.png`, `logo-lockup-light.png`, `logo-mark.png`, `logo-mark-light.png`, `logo-wordmark.png` | `.design-src/assets/` | brand marks, transparent background |
| `readme.md` | quoted throughout | brand voice + visual law |

The design renders **6 screens** off one hash router: `home`, `services`, `construction`, `designs`, `project`, `contact`. There is **no About page** — the leadership/credentials content lives in the lower third of Home. This matches your brief exactly.

### The nine image slots in the design

| Slot | Screen | Content |
|---|---|---|
| `bj-hero` | Home | Hero photograph, three-quarter view, natural daylight |
| `p.slotA` ×3 | Home | Featured project thumbnails |
| `bj-principal` | Home | Portrait — Principal Architect |
| `bj-constr-hero` | Construction | Site works in progress |
| `p.slotA` ×n | Designs | Project card thumbnails |
| `project.slotA/B/C` | Project | Primary + 2 secondary photographs |
| `bj-contact-map` | Contact | Map or photograph of the Apire office |

---

## 2. Framework decision

**Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Sanity v4 (standalone Studio).**

| Requirement | Why this stack |
|---|---|
| "exactly as Claude Design made it" | The design is 100% CSS-custom-property driven. Tailwind v4's `@theme` is itself CSS variables — the tokens port **verbatim**, no translation layer, no rounding drift |
| Sanity-controlled designs + content | `next-sanity` v11 `defineLive` gives real-time content without cache plumbing; Presentation tool gives click-to-edit |
| SEO for a Kumasi practice bidding public tenders | Server components render real HTML; `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD `ProfessionalService` |
| 116 MB of project photography | Sanity CDN handles transforms + AVIF/WebP; `next/image` handles sizing + LQIP blur |
| Functional contact form | Route Handler proxying Web3Forms — keeps the key server-side and lets us validate + rate-limit |
| Client edits everything without code | Singleton documents per page + a `project` collection; every string on the site is a field |

**Rejected:** Astro (you want React), plain Vite SPA (kills SEO), embedded Studio (Sanity's own guidance — slow builds, no auto-updates, no TypeGen watch).

---

## 3. Repository structure

```
Bejewelled/
├── web/                                  # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx                # Rail + Header + Footer + fonts + SanityLive
│   │   │   ├── page.tsx                  # Home
│   │   │   ├── services/page.tsx
│   │   │   ├── construction/page.tsx
│   │   │   ├── designs/page.tsx
│   │   │   ├── designs/[slug]/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── api/contact/route.ts      # Web3Forms proxy
│   │   │   ├── api/draft-mode/enable/route.ts
│   │   │   ├── sitemap.ts  robots.ts  not-found.tsx
│   │   ├── components/
│   │   │   ├── ds/                       # 1:1 ports of the Claude Design primitives
│   │   │   │   ├── Button.tsx  Card.tsx  Badge.tsx  Tag.tsx  Tabs.tsx
│   │   │   │   ├── Input.tsx  Textarea.tsx  Select.tsx  Logo.tsx
│   │   │   │   ├── Eyebrow.tsx  SectionHeading.tsx  StatBlock.tsx
│   │   │   │   └── NumberedItem.tsx  ProjectRow.tsx
│   │   │   ├── chrome/  SheetRail  SiteHeader  MobileMenu  SiteFooter  CtaBand
│   │   │   ├── home/ services/ construction/ designs/ project/ contact/
│   │   │   └── SanityImage.tsx           # hotspot + LQIP + next/image
│   │   ├── sanity/  client.ts  live.ts  image.ts  queries.ts  token.ts
│   │   └── styles/
│   │       ├── tokens/                   # verbatim copies of the DS token files
│   │       └── globals.css               # @theme bridge + type-role classes
│   ├── public/brand/                     # the 5 logo PNGs
│   └── sanity.types.ts                   # generated
├── studio/                               # Sanity Studio (Vite, auto-updating)
│   ├── schemaTypes/{documents,objects,shared}/
│   ├── structure.ts                      # singletons pinned, projects drag-orderable
│   └── sanity.config.ts  sanity.cli.ts
├── scripts/seed-projects.mjs             # uploads Project Images/ → Sanity
├── docs/PLAN.md
└── .design-src/                          # imported design, git-ignored reference
```

---

## 4. Porting the design system

### 4.1 Tokens — single source, zero drift

`web/src/styles/tokens/` gets **byte-identical copies** of `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `base.css`. When the Claude Design project changes, re-running the import overwrites these files and the whole site follows.

`globals.css` bridges them into Tailwind:

```css
@import "tailwindcss";
@import "./tokens/colors.css";      /* --gold-500, --ink-800, --surface-deep … */
@import "./tokens/typography.css";  /* --text-3xl, --type-h2, --tracking-eyebrow … */
/* … spacing, elevation, motion, base */

@theme inline {
  --color-gold-50:  var(--gold-50);   /* → bg-gold-50, text-gold-50, border-gold-50 */
  --color-gold-500: var(--gold-500);
  --color-ink-900:  var(--ink-900);
  --color-paper-100: var(--paper-100);
  --color-blue-800: var(--blue-800);
  --color-surface-deep: var(--surface-deep);
  --color-line-hairline: var(--line-hairline);
  /* …every ramp + alias, mechanically generated */

  --font-display: var(--font-marcellus), Georgia, serif;
  --font-text:    var(--font-archivo), "Helvetica Neue", Arial, sans-serif;
  --font-mono:    var(--font-plex-mono), ui-monospace, Menlo, monospace;

  --spacing-11: 128px;  --radius-md: 4px;  --radius-pill: 999px;
  --shadow-sm: 0 1px 3px rgba(26,26,26,.07), 0 1px 1px rgba(26,26,26,.04);
  --ease-standard: cubic-bezier(.22,.61,.36,1);
}
```

`@theme inline` is required so the `var()` indirection resolves — with plain `@theme` Tailwind would emit the literal `var(--gold-500)` string into every utility and opacity modifiers (`bg-ink-900/60`) would break.

**Composite tokens** (`--type-h1`, `--type-body-lg`, `--type-eyebrow`) are CSS `font:` shorthands with no Tailwind equivalent. They get thin component classes, used everywhere a heading or eyebrow appears:

```css
@layer components {
  .type-display { font: var(--type-display); letter-spacing: var(--tracking-tight); }
  .type-h1 { font: var(--type-h1); }  .type-h2 { font: var(--type-h2); }
  .type-h3 { font: var(--type-h3); }
  .type-body-lg { font: var(--type-body-lg); }  .type-body { font: var(--type-body); }
  .type-body-sm { font: var(--type-body-sm); }
  .type-eyebrow { font: var(--type-eyebrow); letter-spacing: var(--tracking-eyebrow);
                  text-transform: uppercase; }
  .type-label { font: var(--type-label); letter-spacing: .12em; text-transform: uppercase; }
}
```

### 4.2 Fonts

`tokens/fonts.css` `@import`s Google Fonts at runtime — a render-blocking third-party request and a layout shift. Replaced with `next/font/google` (Marcellus 400, Archivo variable 300–700 + italic, IBM Plex Mono 400/500), self-hosted, `display: swap`, exposed as `--font-marcellus` / `--font-archivo` / `--font-plex-mono` and wired into `--font-display` / `--font-text` / `--font-mono` above. Same faces, same weights, zero network cost.

### 4.3 Components

Each of the 14 primitives the design actually uses is ported from `_ds_bundle.js` with its **exact** values. Extracted specs, for the record:

- **Button** — `sm 8/16px @12px · md 12/24px @14px · lg 16/32px @16px`; uppercase, `--tracking-wide`, `--radius-md`, 1px border; `primary` ink-900→ink-700 on hover, `accent` gold-500→gold-600, `secondary` transparent→paper-200 with `--line-strong` border, `ghost` transparent→gold-50 with gold text; press = `translateY(1px)`; renders `<a>` when `href` is set.
- **Card** — `--surface-card`, 1px `--line-hairline`, `--radius-md`, **no shadow at rest**; interactive hover → border `--line-accent` + `--shadow-sm`; `featured` adds a 3px gold top rule; transition on border-color + box-shadow only, `--duration-fast`.
- **Badge** — pill, 4/10px, `--text-2xs`, uppercase, `--tracking-wide`; success `#E6EFE4`/`--status-success`.
- **Tag** — 6/12px, `--radius-md`; selected = ink-900 fill + `--line-strong`; hover border → gold.
- **Tabs** — `gap: --space-6`, 1px bottom hairline, active tab 2px gold underline with `margin-bottom:-1px`.
- **Input / Textarea / Select** — 12/14px padding, `--paper-000` ground, border `--line-rule` → `--gold-500` on focus → `--status-error` on error; mono uppercase label with red `*`; Select suppresses the native arrow for a hand-drawn 8px chevron at `right:14px`.
- **Eyebrow** — `accent` / `muted` / `inverse` (gold-200 on blue, per the accessibility note in the readme).
- **SectionHeading** — eyebrow → 12px gap → `--type-h2` → optional 56×2px rule (`--line-strong`, or gold-500 when inverse) → optional intro.
- **StatBlock** — grid, top hairline, display serif at `--text-3xl`/1.05 in `--text-accent`, mono uppercase label; first cell has no left border or left padding.
- **NumberedItem** — 3px gold top rule, `auto 1fr` grid, mono number, h3, body capped at `--layout-text-max`.
- **ProjectRow** — `48px 1fr 260px 150px` grid, hover ground `--paper-050`.
- **Logo** — `lockup` / `mark` / `wordmark` × `light` / `dark`.

**Motion law, enforced globally:** fade + 12–16 px rise on scroll-in over `--duration-reveal` 700 ms with `--ease-standard`; nothing else. No parallax, no scale, no carousels. All durations collapse to `0ms` under `prefers-reduced-motion` — already in `motion.css`.

---

## 5. Sanity content model

Two collections, six page singletons, one settings singleton. Every visible string is a field.

### 5.1 Collections

**`project`** — the designs/portfolio
| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "Agogo Makro" — from the folder name |
| `slug` | slug | auto from title, async uniqueness check |
| `client` | string | falls back to `title` if blank |
| `scopeOfWorks` | string | "Construction of 16 No. Town Houses" |
| `location` | string | "Osu, Accra" |
| `sector` | reference → `sector` | drives the filter chips |
| `status` | string (radio) | `Completed` / `Ongoing` / `On hold` |
| `year` | number | optional, for ordering + record line |
| `mainImage` | image + `alt` + `caption` | hotspot on, **required** — the card thumbnail and the `slotA` hero |
| `gallery[]` | array of `figure` | the rest of the folder |
| `note` | text | the "The Commission" paragraph |
| `commissionBody` | portable text | optional richer second paragraph; defaults to the standard wholistic-service sentence |
| `orderRank` | string | drag-to-order in Studio |
| `seo` | `seo` object | |

**`sector`** — `title`, `slug`, `orderRank`. A controlled list (Residential, Commercial, Educational, Industrial, Healthcare) so the filter chips stay stable and reorderable instead of being scraped from free text.

### 5.2 Page singletons

- **`siteSettings`** — brand name, legal name, tagline, phone numbers, address lines, digital address, registration line, MoWH classification, nav items (label + route + order), rail label, footer columns, `ctaBand` (heading, body, button), default SEO + OG image, social links.
- **`homePage`** — hero (eyebrow / title / body / two CTAs / image); credential strip (4 items); about block (eyebrow, statement, body, CTA); `stats[]` (value + label); disciplines band (eyebrow, title, intro, 4 numbered items, 2 CTAs); selected works (eyebrow, title, link label, `featuredProjects[]` max 3); leadership (eyebrow, name, role line, bio, portrait, `credentials[]`).
- **`servicesPage`** — header + sheet label + intro; `services[]` (title, tag, description, `items[]`); construction band; sectors block with `sectors[]`.
- **`constructionPage`** — header + intro; hero image + caption; stages block with `stages[]`; comparison block (two column labels + `rows[]` of `conventional` / `bejewelled`); capability block (note + `items[]`).
- **`designsPage`** — eyebrow, title, intro, `defaultView` (`plates` | `index`), all-filter label.
- **`contactPage`** — header; form intro; `serviceOptions[]`; success heading + body; phone note; `contactFields[]` (label + value); map image + caption.

### 5.3 Objects

`seo` · `cta` (label + internal route **or** external URL) · `figure` (image, alt, caption) · `numberedItem` · `statItem` · `fieldRow` (label, value) · `comparisonRow`.

### 5.4 The numbering rule

The brand numbers everything `01`, `02`, `03` — "a visual system, not decoration". **Editors never type a number.** Numbers are derived at render time from position in the ordered array or the ordered project list: `String(index + 1).padStart(2, "0")`. Add a project at position 3 and everything below renumbers, including the prev/next record links on the detail page.

### 5.5 Studio ergonomics

- `structure.ts` pins the seven singletons at the top (Home, Services, Construction, Designs, Contact, Sectors, Site Settings) and puts Projects below as a drag-orderable list via `@sanity/orderable-document-list`.
- Every document and object gets a `@sanity/icons` icon.
- Presentation tool wired to the Next.js app for click-to-edit against a live preview.
- Field descriptions carry the brand law where it bites: "Ghanaian/British spelling — *recognised*, *programme*, *centred*. The practice writes **wholistic**, not holistic." "No emoji. Exclamation marks only in the tagline."

---

## 6. Project Images → Sanity

`scripts/seed-projects.mjs` walks `Project Images/`, and for each folder:

1. Folder name → `title` + `slug` (`agogo-makro`, `dekyi-appartments-gazebo`, `gaze`, `komfo-anokye-teaching-hospital-kath-credit-union`, `konkromase`).
2. Case-insensitive match on `main.*` → `mainImage`. *(`Agogo Makro` uses a capital `Main.jpg` — the match must not be case-sensitive.)*
3. Every remaining image → `gallery[]`, sorted naturally so `Img_6` precedes `Img_10`.
4. Upload via `client.assets.upload('image', stream)`, dedupe on SHA-1 so re-running is idempotent.
5. Create the document as a **draft** with `orderRank` set — you publish after reviewing.

116 MB / 39 images, well inside Sanity's asset allowance. Originals stay in the repo but move to `.gitignore` once uploaded.

**One mapping to confirm.** Only `Komfo Anokye Teaching Hospital (KATH) Credit Union` overlaps with the seven projects listed in the company profile. The other four folders (Agogo Makro, Dekyi Appartments Gazebo, Gaze, Konkromase) are new, and six profile projects have no photographs. See §9, decision 2.

---

## 7. Page-by-page build

Routes drop the design's hash router for real paths: `/`, `/services`, `/construction`, `/designs`, `/designs/[slug]`, `/contact`.

| Screen | Sections, in design order |
|---|---|
| **Home** | Split hero on a 56 px blueprint grid + full-bleed photo · ink credential strip (4 cells, 1px inverse dividers) · About Us two-column with 56×2 px rule + StatBlock · **blue `--surface-deep` band** with 4 NumberedItems · Selected Works (2px ink rule, 3 project cards) · Leadership split with credential rows |
| **Services** | Header + "Sheet 02 / 05" · three service blocks, each with a **3px gold top rule**, mono number, h2, tag, description, `▪` bullet list on hairlines · blue band → Construction · Sectors card grid |
| **Construction** | Header + "Sheet 03 / 05" · full-width site photo + mono caption · blue band "Four stages, one team" · two-column comparison table (right column on `--paper-050`) · Capability list, `40px 1fr` rows |
| **Designs** | Header + intro · sector Tag filter row + Plates/Index Tabs · **Plates**: card grid, 240px image, mono number + status Badge, h3, scope, hairline footer with location + sector · **Index**: ProjectRow list |
| **Project** | "← All designs" · number + h1 + record line · 4-cell field strip (Client / Scope of works / Location / Status) · 560 px primary photo + two 320 px secondaries · The Commission two-column · prev/next record links |
| **Contact** | Header + "Sheet 05 / 05" · form left, contact fields + map right · success state replaces the form in place |

Every screen except Contact ends with the shared CTA band, then the ink footer.

**Chrome:** the fixed 44 px left sheet rail (gold square, vertical `railLabel`, sheet number) and the sticky 76 px header with `--shadow-inset-rule`, gold 2px underline on the active nav item, phone number, and a `sm` primary "Get in touch" button.

---

## 8. Contact form

**Flow:** client form → `POST /api/contact` → Web3Forms `https://api.web3forms.com/submit` → your inbox.

The Route Handler proxy (rather than posting from the browser) buys four things:
- `WEB3FORMS_ACCESS_KEY` stays a server env var, out of the JS bundle.
- Server-side validation — required fields, email shape, length caps — so a malformed submission never reaches your inbox.
- IP rate limit (5/hour) on top of Web3Forms' own throttling.
- A stable JSON contract, so swapping providers later touches one file.

**Payload sent to Web3Forms:**

| Key | Value |
|---|---|
| `access_key` | server env var |
| `subject` | `"New enquiry — {name}, {organisation}"` |
| `from_name` | `"Bejewelled Website"` |
| `replyto` | submitter's email |
| `name`, `organisation`, `email`, `telephone`, `service`, `message` | form fields |
| `botcheck` | honeypot — a hidden field; any value means bot, rejected before Web3Forms is called |

Response is `{ success, message }`. On success the form is replaced in place by the design's exact success state — 3px gold top rule, "Thank you.", "Your enquiry has been received. We will respond within two working days. If the project is urgent, call 0244 037 166 directly." and a ghost "Send another enquiry" button.

Validation styling uses the DS error tokens (`--status-error` border, hint text) that already exist in `Input`/`Textarea`/`Select`. Errors are announced with `aria-live`, and `Select`'s options come from `contactPage.serviceOptions` so they never drift from the services page.

---

## 9. Gaps and loopholes — and how each is closed

These are the places where the design, your brief, and reality don't line up. Each has a decision attached.

### Closed by construction

1. **No mobile design exists.** The design is desktop-only: fixed 56 px gutters, a 44 px rail that would eat a phone screen, a `1fr 1fr` comparison table, a `48px 1fr 260px 150px` ProjectRow. I derive responsive behaviour from the brand law rather than inventing a new visual language: gutters step `56px → 24px` under 768 px; the rail collapses to a 6 px gold top bar; the header becomes a lockup + hamburger with the `--overlay-veil` + `--blur-veil` sheet the readme already specifies for the mobile menu; the comparison table stacks into labelled pairs; ProjectRow becomes a two-line stacked record. **No new colours, radii, or type sizes are introduced.**

2. **`logo-lockup-ink.png` is referenced by `Logo.jsx` but does not exist in the project.** The `ink` variant is print-only and unused on the web — the `ink` branch is dropped from the ported component rather than shipping a broken `<img>`.

3. **The logo is a raster PNG.** Fine at the sizes used (48 px header, 66 px footer, 2× on retina). Flagged in the design readme too: a vector master is needed for print and large-format. Not a blocker.

4. **Hardcoded "All 30+ projects" and the 30+/20+/4/2013 stats.** These become `homePage.stats[]` and an editable link label. Otherwise the site claims thirty projects while showing five.

5. **`featured: [all[0], all[1], all[3]]`** — a hardcoded index triplet that breaks the moment the project list changes. Becomes `homePage.featuredProjects[]`, max 3, falling back to the first three by order.

6. **Only three image slots on the project page, but folders hold 4–12 photographs.** The design's exact layout is kept — 560 px primary, two 320 px secondaries — and the remaining gallery images extend below it in the same language: `--surface-plate` grounds, `--radius-none`, mono `--text-muted` captions below the frame, never over it. Faithful, not padded out.

7. **Sector filters were derived from free-text project strings.** A typo would silently create a sixth filter chip. Replaced with a `sector` reference to a controlled, orderable list.

8. **Numbering was hardcoded per project.** Now derived from order (§5.4).

9. **Accessibility slips in the design.** `ProjectRow` is a clickable `<div>` — keyboard users can't reach it; becomes an `<a>`. Filter `Tag` is a `<span role="button">`; becomes a real `<button>`. The prev/next project links duplicate `border-right` twice in one style attribute. All corrected without changing a pixel.

10. **`base.css` styles every `<a>` gold with a gold-200 underline.** Correct for prose, wrong for nav links, footer links, cards, and buttons — the design overrides it inline nine times. Scoped to a `.prose` context instead, with nav/footer/card links opting out by default.

11. **Google Fonts `@import`** — replaced with `next/font`, §4.2.

12. **Header height:** the readme says 72 px (56 px condensed); the design HTML says `min-height: 76px`. The design HTML wins — it's the actual artefact — and the condensed state is dropped since the design has no scroll-condense behaviour.

13. **Two names, two contexts.** "Bejewelled" in nav, marketing, and titles; "Bejewelled Enterprise" in the copyright line, the registration strip, and the project record line. Both live in `siteSettings` so the distinction can't be lost in an edit.

20. **The design prints the credentials in three places; the practice wants them held back for now.** The ink strip under the hero, the credential rows under the biography, and the registration line at the foot of every page. Rather than delete three pieces of the design — which would mean re-typing the claims to restore them — each is put behind its own switch: `siteSettings.showCredentialStrip`, `siteSettings.showRegistrationLine`, `homePage.leadership.showCredentials`. All three default **off**, in the schema, in `siteDefaults`, and in the seed script, so an unset or unseeded field hides the claims rather than publishing ones nobody turned on. The copy stays in place either way; turning a switch on in the Studio restores the design's own wording untouched. Each switch sits directly above the field it governs, and none of the content fields were made optional — the claims are still validated, just not printed.

### Needs your decision

14. **Sanity project.** None exists yet. I'll create one via the Sanity MCP — I need to know which organisation, or whether you already have a project ID to reuse.

15. **Which projects go live.** Five folders have photographs; the company profile lists seven projects, only one of which overlaps. Options: **(a)** ship the five photographed projects only; **(b)** ship all eleven, with the six profile-only ones as text records with a placeholder plate; **(c)** ship the five, and keep the six as unpublished drafts in Sanity to add photos later. My recommendation is **(c)** — the portfolio looks complete and honest, and the profile projects are already loaded for when photographs arrive.

16. **Web3Forms access key.** You create it at web3forms.com against the receiving inbox; it's a 30-second signup. Until it arrives the form is built and the proxy stubs a success response in development.

17. **The three photographs the CMS can't source.** `bj-hero` (Home hero), `bj-principal` (portrait of Rosemary Dwamena), `bj-constr-hero` (site works in progress), plus `bj-contact-map`. None are in `Project Images/`. Until supplied, they fall back to the highest-quality project exteriors, and each is a Sanity image field you can swap without code. The portrait has no substitute — that section renders without the image column until you provide one.

18. **Two folder names read as typos:** "Dekyi **Appartments** Gazebo" (→ Apartments) and "Agogo **Makro**". I'll seed them exactly as the folders are named, per your instruction, and you can correct the title in Sanity in ten seconds — the slug is generated once and pinned, so fixing the display name won't break the URL.

19. **Visual editing / Presentation tool.** Adds click-to-edit-on-preview. Worth it, but it's the piece most likely to need fiddling. Scheduled last (Phase 7) so it can't hold up launch.

---

## 10. Sequencing

| Phase | Work | Verification |
|---|---|---|
| **0** | Scaffold `web/` + `studio/`; commit the imported design under `.design-src/` | Both dev servers boot |
| **1** | Token port + `@theme` bridge + fonts + the 14 DS primitives | Component gallery route renders every variant; values diffed against `_ds_bundle.js` |
| **2** | Chrome — rail, sticky header, mobile menu, footer, CTA band | Matches the design at 1440 px; sane at 390 px |
| **3** | Sanity schemas + Studio structure + singleton seeding of all design copy | Studio shows the seven singletons; every string on the site is editable |
| **4** | Home, Services, Construction — static-content pages | Side-by-side against the Claude Design preview |
| **5** | `seed-projects.mjs`; Designs index with filters + Plates/Index toggle; project detail with prev/next | 5 projects live with real photographs, filters correct |
| **6** | Contact form + Web3Forms proxy + validation + rate limit | A real test enquiry lands in the inbox |
| **7** | SEO (metadata, sitemap, robots, JSON-LD `ProfessionalService`), a11y audit, Lighthouse, Presentation tool, Vercel deploy + CORS | Lighthouse ≥ 95 across the board; keyboard-only pass on all six screens |

---

## 11. What I need from you

1. Sanity organisation (or an existing project ID).
2. Decision on §9.15 — which projects go live.
3. Web3Forms access key, and the inbox enquiries should reach.
4. Eventually: hero photograph, portrait of the Principal Architect, a site-works photograph, and an office photo or map for Contact.

Nothing on that list blocks Phases 0–5.
