# Design plan — Γ. & Ν. ΤΣΟΠΟΥΡΟΓΛΟΥ

Gate 1 deliverable per CLAUDE.md §10. No code yet.

---

## 0. Verified before proposing

**Greek glyph coverage** — queried the Google Fonts CSS API with a modern UA and read the declared subsets. Result:

| Face | Subsets | Verdict |
|---|---|---|
| Alegreya Sans | latin, latin-ext, greek, **greek-ext**, cyrillic, vietnamese | ✅ all weights 400–900 carry greek + greek-ext |
| Fira Sans | latin, latin-ext, greek, **greek-ext**, cyrillic, vietnamese | ✅ all weights 400–900 |
| Source Sans 3 | latin, greek, greek-ext, cyrillic | ✅ |
| IBM Plex Sans | latin, greek, cyrillic | ✅ (no greek-ext) |
| Commissioner, Manrope, Literata, Inter, Ubuntu, Roboto Condensed | greek present | ✅ |
| **Archivo, Anton, Oswald, Barlow Condensed** | latin only | ❌ **eliminated** |

That last row matters: Anton / Oswald / Barlow Condensed are the reflex picks for a heavy construction display face and **none of them have Greek at all**. They would have silently fallen back to a system font on the one string that has to look right — ΤΣΟΠΟΥΡΟΓΛΟΥ.

Subset presence is a gate, not proof of quality. Rendering `ΤΣΟΠΟΥΡΟΓΛΟΥ` and `ΕΚΒΡΑΧΙΣΜΟΙ` at 64px+ in the chosen face is the first thing built at gate 2.

**Contrast** — every pair below is a computed WCAG ratio, not an eyeball.

---

## 1. Token critique — what I ruled out and why

Brainstormed, then killed against the brief's banned-defaults list:

| Rejected direction | Why |
|---|---|
| Safety yellow + black | Explicitly banned. It's the category default, so it's not a choice. |
| Cream `#F4F1EA` + serif + terracotta `#D97757` | Explicitly banned. |
| Near-black + one acid accent | Explicitly banned. |
| Concrete grey + blue "trust" accent | The B2B-services default. No relationship to soil. |
| Photographic hero with dark scrim + white text | Requires a good photo. We have stock now and phone photos later — neither carries a full-bleed hero. Structurally fragile. |
| Big-number stat block (`39` over `ΧΡΟΝΙΑ`) | Brief bans it, and it goes stale every January. |
| Rounded cards + soft shadows | The SaaS default. Nothing about cut earth or a JCB is soft. |

What survived, and where it comes from: **the palette is a soil profile.** When you dig a trench in Chalkidiki you get a visible section — dark topsoil at the top, warm subsoil, pale marl and limestone below, olive scrub above the cut. That is a real thing this specific business looks at every working day, and it is nobody's brand template.

---

## 2. Color tokens

All ratios computed. `soil-950` is a **warm** near-black (brown-biased), not neutral.

### Ramp

```
--soil-950  #1E1712   turned earth, wet     dark surfaces, body ink on light
--soil-900  #2A211A                          dark surface elevation +1
--soil-800  #3B2F25                          headings on light
--soil-700  #4E3F32                          secondary ink on light
--soil-600  #6B5847   subsoil                muted text on light  (5.50 AA)
--soil-400  #9A8877   dust                   muted text ON DARK ONLY (5.19 AA)
--marl-200  #D9D8D2   limestone dust         decorative hairlines only
--marl-100  #E9E8E2   cut marl               default page background
--marl-50   #F5F4F0                          raised cards on marl-100
--scrub-700 #4A5740   olive scrub            secondary accent, section eyebrows
--scrub-500 #6E7C58                          on dark surfaces (3.95, large only)
--oxide-700 #8A3319   iron oxide             focus ring, CTA hover
--oxide-600 #A03D22   iron oxide             THE call CTA, on light surfaces
--oxide-500 #B8542F                          THE call CTA, on dark surfaces
--border    #7A786F                          functional borders (inputs, controls)
```

### Verified ratios

| Pair | Ratio | Level |
|---|---|---|
| soil-950 on marl-100 (body) | **14.42** | AAA |
| soil-800 on marl-100 (headings) | **10.56** | AAA |
| soil-600 on marl-100 (muted) | **5.50** | AA |
| marl-100 on soil-950 (inverted) | **14.42** | AAA |
| soil-400 on soil-950 (muted, dark) | **5.19** | AA |
| white on oxide-600 (CTA label) | **6.59** | AA |
| white on oxide-500 (CTA on dark) | **4.83** | AA |
| oxide-600 on marl-100 (link) | **5.37** | AA |
| scrub-700 on marl-100 | **6.27** | AA |
| oxide-700 focus ring on marl-50 | **7.43** | pass |
| `--border` #7A786F on marl-50 / marl-100 | 4.02 / **3.61** | ≥3:1 UI pass |

### Three failures caught now, with the fix baked in

1. `soil-400 #9A8877` on `marl-100` is **2.78 — fails.** So soil-400 is a dark-surface-only token. Muted text on light is always `soil-600`. Writing this into the token names (`--text-muted-on-dark`) prevents the mistake at build time.
2. `oxide-600` fill on `soil-950` ground is **2.68** — the button's *edge* disappears against the dark hero even though its white label reads fine. Hence the separate `oxide-500` (3.66 against soil-950, passes the 3:1 non-text requirement). The call button changes fill by surface; its shape, label and size never change.
3. `marl-200` on `marl-100` is **1.16.** It is decorative only. Any border a user must perceive — input fields, the sticky bar's top edge — uses `--border #7A786F`.

---

## 3. Typography

**One family: Alegreya Sans.** Weights 400 / 500 / 700 / 900, `subsets: ['greek','latin']`, self-hosted through `next/font/google` (no render-blocking third-party request, no CLS).

Why one family and why this one:

- Huerta Tipográfica draw Greek as a first-class script, not as a Latin afterthought with bolted-on glyphs. Greek + greek-ext at every weight, confirmed above.
- It's humanist — slightly calligraphic, a little irregular. It reads as a person, which suits two brothers, and it dodges the geometric-grotesque default that makes every contractor site look like a SaaS landing page.
- Weight 900 is genuinely heavy. `ΤΣΟΠΟΥΡΟΓΛΟΥ` at 900 has the mass a display face needs without importing a second file.
- One family, two subsets, four weights.

> **Correction after gate 2.** I estimated ~40KB for the fonts. Measured on the
> real build it is **87KB** — 8 preloaded woff2 files (4 weights × greek +
> latin). The Greek subsets are ~17KB each; Greek has a lot of glyphs. Still
> one family and still far lighter than four page-builder sites, but the
> number in the original plan was wrong. Dropping weight 500 would save ~22KB
> and is the first thing to measure at gate 7.

Contrast in the design comes from **weight, scale and case** — not from a second typeface. The 1987 numerals in the hero are set in Alegreya Sans 900 with negative tracking; if the rendering test at gate 2 shows the digits are weak at 120px, they get redrawn as inline SVG (zero extra network cost, full control) rather than pulling in a display font.

### Greek typography rules (hard)

- **Never `text-transform: uppercase` on Greek.** Greek drops the tonos in uppercase (`Μεταμόρφωση` → `ΜΕΤΑΜΟΡΦΩΣΗ`, not `ΜΕΤΑΜΌΡΦΩΣΗ`) and browser handling of that, plus final sigma and dialytika, is not uniformly reliable. Every uppercase string is authored literally in `content.ts`. This also means the client can read exactly what will appear.
- Body `line-height: 1.6`. Greek lowercase has more accent traffic above the x-height than Latin; 1.5 crowds it.
- Greek copy runs 10–15% longer than the English equivalent. Every headline is line-broken and tested at 320px, not designed at 1440px and hoped for.
- `letter-spacing: 0.06em` on uppercase Greek labels. Greek caps are wide and need the air.

### Scale (mobile-first, rem, `clamp()` between the two ends)

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `display` | 44px / 0.95 / -0.02em | 88px | the 1987 numerals |
| `h1` | 30px / 1.15 | 46px | one per page |
| `h2` | 24px / 1.2 | 32px | section heads |
| `h3` | 19px / 1.3 | 21px | card titles |
| `body` | 17px / 1.6 | 18px | ≥17px — the audience is 40+ on a phone |
| `small` | 15px / 1.5 | 15px | captions, legal |
| `label` | 13px / 1.4 / 0.06em caps | 13px | eyebrows, ΠΡΙΝ/ΜΕΤΑ |

Body never goes below 17px anywhere on the site, including the footer.

---

## 4. Space, shape, motion

- **Spacing:** 4px base — 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Section padding `48px` mobile → `96px` desktop.
- **Radius:** `0` on photos, cards and section blocks. `2px` on buttons and inputs only, so they read as controls. Nothing on this site is rounder than 2px — cut earth and steel plate have corners.
- **Elevation:** no shadows. Separation comes from a flat surface change (`marl-50` on `marl-100`) plus a 1px `--border` line where a boundary must be felt. Shadows on a `marl` palette go muddy and cost paint time on cheap phones.
- **Tap targets:** 48px minimum, 56px for the sticky call bar and any `tel:` link.
- **Focus:** `outline: 3px solid var(--oxide-700); outline-offset: 2px` — 7.43 contrast, never removed, visible on every interactive element.
- **Motion:** transitions on `opacity`/`transform` only, ≤150ms. No scroll-triggered reveals, no counters, no parallax. Everything inside `@media (prefers-reduced-motion: reduce)` collapses to none.

---

## 5. Signature element — «Η τομή» (the cut)

The one moment, and it comes from the trade rather than from a design trend.

Dig a trench and you expose a section: layered bands of different-colored ground, with an irregular edge where the bucket went through. That is the site's structural motif.

**In the hero, once, in full.** The lower half of the hero is a soil profile — four horizontal strata in descending steps of the soil ramp, each 28–40px, the topmost with an irregular hand-drawn edge (a static inline SVG path, ~500 bytes, no library). The numerals **1987** sit in the bottom stratum. Bedrock. Everything above it — the services, the machines, the villages — is sitting on top of that layer.

**Everywhere else, reduced to one line.** Section boundaries get a single irregular cut edge, 12px tall, in the next step of the ramp. Same SVG path, different scale. That's it. Used at most three times per page.

This is the restraint the brief asks for: full stratigraphy exactly once, on the homepage hero. If it appeared on every page it would be a gimmick within thirty seconds.

**Hero copy structure** (wording is a gate-2 conversation, but the shape is the proposal):

```
ΧΩΜΑΤΟΥΡΓΙΚΕΣ ΕΡΓΑΣΙΕΣ · ΧΑΛΚΙΔΙΚΗ         <- label, scrub-700

h1:   Σκάβουμε σε αυτά τα χώματα
      από το 1987                          <- "1987" at display scale, INLINE,
                                              inside the sentence, sitting in
                                              the bedrock stratum

lede: Εκσκαφές, καθαρισμοί οικοπέδων, βόθροι, εκβραχισμοί.
      Βάση μας η Μεταμόρφωση και ο οικισμός Δασκάλων.

[ ΤΗΛΕΦΩΝΟ 697 355 7903 ]   <- oxide-500, 56px, tel:
[ Ζητήστε προσφορά ]         <- outlined, secondary
```

The year is a clause in a sentence, not a statistic in a box. `αυτά τα χώματα` — *this* soil — is the whole positioning in two words: a firm in Polychrono, 40km away, cannot say it about Metamorfosi. It also reads as ordinary spoken Greek, which is the register this audience trusts.

> Note: the h1 above needs `Μεταμόρφωση` and `Χαλκιδική` for the target queries. Resolving that against keeping the sentence plain is a gate-2 decision — the likely answer is that the lede carries the village names, as drafted.

**Wordmark (proposal, not final — they have no logo).** Typographic only:

```
Γ. & Ν. ΤΣΟΠΟΥΡΟΓΛΟΥ                    <- Alegreya Sans 900, 0.02em
ΧΩΜΑΤΟΥΡΓΙΚΑ · ΜΕΤΑΜΟΡΦΩΣΗ ΧΑΛΚΙΔΙΚΗΣ   <- 500, 0.08em, scrub-700
```

Thirteen characters of surname is a real constraint below 380px; the mobile lockup drops to `ΤΣΟΠΟΥΡΟΓΛΟΥ` alone. No icon, no excavator silhouette, no monogram.

---

## 6. Photo treatment — designed for bad phone photos

The research is decisive: this category runs on Viber-forwarded snapshots. So the gallery must make amateur photos look deliberate instead of needing a photographer.

**The move: present them as a work log, not a portfolio.** Every image sits in a hard-edged frame with a caption slug beneath it in uppercase label type:

```
ΜΕΤΑΜΟΡΦΩΣΗ · ΚΑΘΑΡΙΣΜΟΣ ΟΙΚΟΠΕΔΟΥ · 2024
```

Consistent framing plus a factual caption reads as documentation. The same photo with no caption in a soft rounded card reads as a bad photo. Nothing else changes — **no filters, no unifying color grade.** Grading someone's job site to look moody is the same lie as using stock.

- Fixed **4:3** frame, `object-fit: cover`. Every image in the manifest declares its own aspect; the layout never assumes landscape. Portrait phone photos (3:4) get their own slot type rather than being crushed.
- **Before/after is the primary format**, since no competitor has it. Desktop: side by side sharing one hard 2px `soil-950` seam. Mobile: stacked, same seam, `ΠΡΙΝ` / `ΜΕΤΑ` in a solid `soil-950` block, always top-left, never moving. No slider — a drag interaction on a village 4G connection for a 60-year-old is worse than just showing both.
- `next/image`, AVIF/WebP, explicit `sizes`, `priority` on the hero only.
- Descriptive Greek `alt` on every image, written into the manifest as a required field so it can't be forgotten.

---

## 7. Page architecture

### Shared furniture

- **Header:** 56px. Wordmark left, one `tel:` icon-button right, menu button. The menu is a full-screen panel — 16 routes will not fit a horizontal bar at any mobile width.
- **Sticky call bar:** 56px + `env(safe-area-inset-bottom)`, `oxide-500` fill, top edge in `--border`, `<a href="tel:+306973557903">` with the number visible as text. Present at every scroll position on every page. `body` carries matching bottom padding so it never covers a form's submit button. Real anchor, no JS.
- **Footer:** business name, Μεταμόρφωση Χαλκιδικής, both numbers, email, the eight services, the five areas, privacy link, `[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]` ΑΦΜ slot.

### Layout concept per page type

| Page | Concept |
|---|---|
| `/` | Hero (full stratigraphy) → 8 service cards, 2-up mobile → before/after strip → areas with Μεταμόρφωση + Δασκάλων visually promoted, not just listed first → «Γιατί εμάς» as four flat statements (1987 / πτυχίο 1990 / 24 ώρες / τρεις τσάπες) → contact + form |
| `/ypiresies/[slug]` ×8 | h1 = the service + Χαλκιδική. What the job involves in plain Greek → which machine does it and why that matters → where he does it → 2–3 photos of *that* work → call. Long enough to be a real page, short enough to be true. |
| `/perioxes/[slug]` ×5 | **Not a template loop.** Μεταμόρφωση / Δασκάλων: home ground, priority dispatch, he knows the plots. Ψακούδια / Βατοπέδι: coastal — beach cleaning, holiday-home plot clearing before the season. Νικήτη: its own paragraph. Each page's body is hand-written into `content.ts` per area; the shared component is layout only. If an area's copy can't be made genuinely distinct, that page doesn't ship. |
| `/exoplismos` | One row per machine: photo, name, what size job it takes. The three-excavator range is the argument — big enough for a site, small enough for a garden — with his real repeat-customer story as the proof. |
| `/erga` | Before/after grid. **Ships unpublished until real photos exist.** |
| `/etaireia` | The 1987 story, the two brothers, the licence, the same village. Longest prose on the site. No stock people. |
| `/epikoinonia` | Phone and landline first, at display scale, above the form. The form is the secondary path. Four fields + consent checkbox + honeypot. |
| `/politiki-aporritou` | Plain text page, EU/GDPR. |

---

## 8. Four decisions I need a ruling on

**1. `output: 'export'` has to go.** A static export cannot host the Resend route, and the API key must stay server-side. Recommendation: default Next.js on Vercel — every content page still statically prerendered at build (identical delivery, identical Lighthouse), plus one Route Handler at `/api/prosfora`. This is the only way §5's working form and §7's static export can both be honored.

**2. Drop `aggregateRating` from the schema.** Google's structured-data policy prohibits self-serving review markup for `LocalBusiness` — a business marking up ratings about itself, especially ratings collected somewhere else. The 5.0★ is real, but marking it up risks a manual action against the exact rankings we're building for. Recommendation: omit `aggregateRating`, keep the rest of the LocalBusiness schema, and present the review themes as ordinary designed content with a link to the Maps listing. **Your call — flagging it because §7 left it conditional on your confirmation.**

**3. Never state a number of years, only «από το 1987».** «39 χρόνια» is wrong in four months and every competitor's site has this bug. If you want a computed figure I'll derive it at build time, but the recommendation is the year alone.

**4. Gallery and equipment pages are gated on real photos.** Per §6b they can't ship with stock. Recommendation: a single `HAS_REAL_PHOTOS` flag in `content.ts` that removes both routes from the nav and the sitemap and sets `noindex` while false — so launch isn't blocked, and turning them on later is one boolean.

---

## 9. Gate 2 — built, and what changed

### Where the two missing facts landed

Both were placed by function, not dropped into a badge row.

**Πτυχίο χειριστή από το 1990** sits in the bedrock, immediately under the
year, in label type at `soil-400`. It reads as a footnote to the founding
claim because that is what it is: 1987 founded, 1990 licensed — one
continuity, two dates. The 168px/13px scale gap keeps them from competing.
No competitor site mentions operator licensing at all.

**24ωρη διαθεσιμότητα** sits directly under the phone button, because that is
the reason to call *now*: «Σηκώνουμε τηλέφωνο όλο το 24ωρο, κάθε μέρα.»
Spoken register rather than «24/7 διαθεσιμότητα» — this audience trusts the
way a person talks. Worth his sign-off on the wording.

### Corrections made while building

- **Strata as a CSS gradient read as banding, not ground.** Replaced with one
  inline SVG carrying four strata, each with its own irregular lower edge and
  its own phase so no two boundaries are parallel. This is the difference
  between the signature element working and looking like a rendering bug.
- **`max-width` on the same box as `.wrap` broke the lede.** `.wrap` sets
  `margin-inline: auto`; a narrower `max-width` on the same element then
  centred the text in the viewport instead of aligning it. The measure moved
  to an inner element, and is only applied from 768px up.
- **The ghost button's border failed contrast.** `soil-600` on `soil-950` is
  2.62 — under the 3:1 minimum for a control boundary. Now `soil-400` (5.19).
- **Full-width call button on mobile.** The primary action takes the whole
  row below 520px.

### Verified on the real build

- `documentElement.scrollWidth` equals the viewport at 320 and 390 — no
  horizontal overflow. Checked with `scripts/overflow-audit.mjs`.
- 8 preloaded woff2 = 4 weights × greek + latin. The Greek unicode-range
  (`U+370-3FF`) and polytonic (`U+1F??`) are both served.
- `lang="el"`, single h1, `/` prerendered static.
- Greek copy guard passes over all source.

### A trap worth writing down

`msedge --window-size=320,900 --screenshot` does **not** render a 320px
viewport. Edge refuses to open a window under ~500px, renders the page wide,
and crops the image — which looks exactly like a horizontal-overflow bug and
is not one. I chased a phantom for one round. `scripts/shot.mjs` uses CDP
`Emulation.setDeviceMetricsOverride`, which is the only honest way to see a
narrow viewport. Use it for every mobile check from here on.

### Open for a ruling

1. **Next.js 16.3.2, not 15.** `create-next-app@latest` installs 16; the
   brief's "15" predates it. Same App Router, current stable, Vercel default.
   Reverting is `npm i next@15` and is cheap now, expensive later.
2. **Alegreya Sans is warm and slightly calligraphic.** It reads as a person,
   which suits two brothers. If you want colder and more technical, **Fira
   Sans** also carries greek + greek-ext at every weight and is a one-line
   swap. Cheap to change now.
3. **First load is 273KB** — 87KB fonts, 174KB Next/React runtime, 6KB HTML,
   5KB CSS. None of the JS is ours; it is the framework floor for a page with
   no interactivity. Options exist at gate 7 if Lighthouse needs them.

---

## 10. Gate 3 — rest of the homepage

Sections built in brief order: hero → υπηρεσίες → **[έργα omitted]** → περιοχές →
γιατί εμάς → επικοινωνία. Plus header, full-screen nav panel, sticky call bar,
footer.

### The four rulings, implemented

**Versions pinned exact** — every dependency, not just Next. A site touched
rarely is exactly the case where a caret range drifts under you.

**Weight 500 dropped.** Labels, the wordmark tagline and the ghost button now
use 400.

**Fonts split into two `next/font` instances**, purely to control preload.

> **Correction.** I reported the subset split as greek 75% / latin 24%. It is
> the reverse: **greek ~5.3KB per weight, latin ~16.9KB**. I had inferred it
> from file sizes and guessed wrong; `scripts/` now maps every file to its
> weight and unicode-range from the built CSS instead of inferring.
>
> Which makes the instruction more right than either of us thought — latin is
> the expensive subset. Preload is now **4 files / 32.5KB, down from 8 /
> 87KB (−64%)**.

The one latin file still preloaded is weight 900, because ASCII digits live in
the latin subset and "1987" at 168px is the LCP element. Rather than buy a
second latin file for the phone number at weight 700, every prominent number
(sticky bar, both call buttons, the contact block) is set in the display
instance at 900 — reusing the file already on the wire. Heavier numerals are
also the right call for a phone number.

**`/erga` and `/exoplismos` gated** behind `HAS_REAL_PHOTOS` in `content.ts`.
Verified: 0 links to either route in the rendered HTML, and the nav panel
lists four items rather than six.

### Also changed

- **Desktop nav.** A hamburger at 1280px hides navigation that fits fine, so
  inline links appear at ≥940px and the trigger hides. The sticky call bar —
  a mobile pattern — hides there too, and the header goes `position: sticky`
  so the number stays reachable at any scroll position either way.
- **Cut divider on every section transition.** The plan said "at most three
  per page"; that number was arbitrary and left one of four transitions flat.
  Consistency of the motif matters more than the count.

### Verified, not assumed

- **Overflow:** `scrollWidth` equals the viewport at 320 / 390 / 768 / 1280.
- **Nav panel:** 11/11 accessibility checks pass — `aria-expanded` flips,
  `role="dialog"` + `aria-modal`, body scroll locks and restores, focus moves
  into the panel and returns to the trigger, Escape closes.
  `npm run nav-test` re-runs it.
- **HTML:** one h1, `lang="el"`, 7 real `tel:` links, no gated routes.
- **First load: 222KB**, down from 273KB at gate 2.

### The measure bug, now fixed at the root

`max-width` on an element that also carries `.wrap` gets centred by `.wrap`'s
`margin-inline: auto` instead of aligned. This bit twice — the hero lede at
gate 2 and every section lede at gate 3. There is now one `.measure` class,
a comment on `.wrap` forbidding the combination, and no `max-width` anywhere
on a `.wrap` element.

### Guard rules corrected twice

Both times mine were too broad, and both times the guard caught it on real
copy rather than in review:

1. `Ϊ Ϋ` are valid — dialytika IS retained on Greek capitals, unlike tonos.
2. `Έργα` is valid — an accented capital is correct in **title case**. The
   tonos is dropped only when the whole word is uppercase.

The rule now fires only on an accented capital with an uppercase Greek letter
beside it. `scripts/check-greek.test.mjs` pins all nine cases, and
`prebuild` runs both, so the guard now blocks a build instead of advising.

### Known, expected

Links to `/ypiresies/*`, `/perioxes/*`, `/etaireia` and `/epikoinonia` 404
until gates 4–6. The quote form is a link to `/epikoinonia` for now; it is
wired to Resend at gate 6.

---

## 11. Palette rebuild — ΣΤΑΘΜΗ

The soil-profile palette was intellectually sound and landed as mud. Brown as
the dominant surface is now banned. Sections 2 and 4 above are superseded for
colour; everything else in this document still holds.

### Tokens

```
--field       #ffffff   page ground
--raised      #f1f3f1   gravel — alternating sections, cards
--stone       #e4e8e6   the strata graphic
--deep        #111716   footer only
--ink         #15191a   17.71 / 15.88 / 14.32 on the three light surfaces
--ink-muted   #434b4c    8.94 /  8.01 /  7.23 — AAA on all three
--line        #7c8583   functional boundary  3.79 / 3.40 / 3.07
--line-hair   #dce0de   decorative separator only (1.33)
--accent      #0a6136   instrument green — 7.56 on field, white label 7.56
--accent-hover #08512d  white label  9.44
--accent-press #064124  white label 11.74
```

Built from the green line a laser level throws across a plot — the instrument
that separates a licensed operator from a man with a digger. Body text is
14–18:1 against AAA's 7, because the audience reads this outdoors in
Chalkidiki sun; `--ink-muted` is held to AAA too, which is stricter than the
spec and is the token most likely to fail in daylight.

### Structural decisions

- **Three light surfaces, not two.** Rhythm comes from alternating field and
  raised. Only the footer is dark. This is what actually delivers "light" —
  the previous palette depended on a dark band for rhythm, which is how it
  drifted muddy.
- **One CTA colour everywhere.** A lightened variant for dark grounds cannot
  work: the label fails on a mid-tone fill (3.7–4.0 against both white and
  ink). On the footer the button gains a 1px `--field` ring instead — ring
  vs deep 18.14, ring vs fill 7.56.
- **Elevation is a drawn line.** No shadows on static content, ever. Two
  weights by function: `--line` (≥3:1, interactive panels and controls) and
  `--line-hair` (separators where content self-identifies). The one shadow on
  the site is the nav overlay, which genuinely floats.
- **«Η τομή» became «Η στάθμη».** The cut survives but is drawn rather than
  dug: a compact strata strip under a dead-straight ink rule with a short
  accent segment at its left, the way a laser level marks a grade. Section
  boundaries carry the reduced form.

### Craft

Spacing is a 4px scale (`--s-1` … `--s-11`) with section rhythm at
`clamp(4.5rem, 9vw, 8rem)` — roughly double the previous build. Type is a real
scale, ratio 1.22 mobile / 1.28 desktop, every step carrying its own
line-height, tracking and measure. Buttons have a full state matrix with a
physical press: a 2px shelf at rest that collapses as the button drops 2px.
Motion is three moments — header rule on scroll, nav panel entry, button
press — all inside `prefers-reduced-motion`.

### Verified on the rebuild

- Contrast: every pair computed; all pass, body 14–18:1.
- Overflow: `scrollWidth` equals viewport at 320 / 390 / 768 / 1280.
- Nav: 11/11 accessibility checks.
- Layout: `scripts/layout-probe.mjs` reads computed styles at each breakpoint.
- Button states: `scripts/button-states.mjs` photographs all six by forcing
  pseudo-classes over CDP.
- First load 222KB; one h1; zero gated-route links.

### A CSS-ordering bug, three times

Equal-specificity rules declared *after* a media block win on source order and
silently kill it. This has now bitten `.nav-trigger`, the `.section-lede`
measure, and `.grid-3` — each time invisible in review and each time caught by
a probe rather than a screenshot. `layout-probe.mjs` exists for exactly this
and should be run at every breakpoint after any layout change.

---

## 12. Gate 4 — the eight service pages

`/ypiresies` plus `/ypiresies/[slug]` × 8, all prerendered as static HTML.

**Not a template loop.** Each page has its own copy: what the job involves,
which machine does it and why that matters, and a numbered «Τι να μας πείτε
όταν τηλεφωνήσετε» list. That last block is the conversion lever — the phone
is the goal, and a caller who already knows the four things worth saying has a
better call than one who doesn't.

Page shape: head (breadcrumb, h1, lede, call) → includes + machines →
what-to-say + where → related → call band. Four alternating surfaces, level
line on each boundary.

**Honest boundaries where they exist.** `/ypiresies/vothroi` says plainly that
he builds βόθρους and does not empty or unblock them — the client confirmed
building only, and the line stops wrong calls before they cost anyone time.

**Claims removed rather than guessed.** A drafted line saying site visits are
free was cut: he never said it. The εκβραχισμοί page describes the outcome
without naming a technique, because the technique was never confirmed. Both
are now questions 5 and 8 in PLACEHOLDERS.md.

**Refactor:** header, footer, sticky bar and scroll state moved from
`page.tsx` into `layout.tsx` — 14 more routes are coming and they should not
each re-assemble the furniture.

**New guard:** `services.ts` asserts at build time that every `related` slug
exists and that nothing lists itself. Mutation-tested — a deliberate bad slug
fails the build with a named error, which is the only way to know a guard
works.

### Verified

- 10 routes: all 200, exactly one h1 each, distinct title tags carrying the
  service keyword + Χαλκιδική.
- A bogus slug returns 404.
- All 8 internal service links resolve 200.
- Overflow clean at 320 / 390 / 768 / 1280 on a service page.
- Layout probe correct at both breakpoints on a service page.
- Nav 11/11 on a service page.
- Greek guard clean across 21 files.

### Deliverable added

`PLACEHOLDERS.md` — every unconfirmed item as a checklist, split into blocking
launch / needed before copy is final / nice to have. Gate 4 surfaced five new
questions, all recorded rather than answered.
