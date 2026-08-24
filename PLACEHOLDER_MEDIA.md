# PLACEHOLDER_MEDIA — every dummy image, and what replaces it

## 🔴 BLOCKING PRE-LAUNCH

**The site does not go live with these.** CLAUDE.md §6b, and it is not a
formality: this is a trade business whose entire pitch is *look at what we've
done*. Publishing stand-in images as his work is a lie to his customers, and
the kind a local competitor would notice in a village where everyone knows
everyone.

Nothing here is a stock photograph. They are generated, obviously-fake
placeholders that say in Greek which photo belongs in the slot — so the layout
can be judged without anything that could be mistaken for a job he did.

---

## How the swap works

One file: **`src/content/media.ts`**. Every image path on the site routes
through it.

1. Drop real files into `/public/erga/` or `/public/exoplismos/`
2. Change `src` in `media.ts`, and write a real Greek `alt` for each
3. `HAS_REAL_PHOTOS = true` in `src/content/site.ts`
4. `SHOW_PLACEHOLDER_MEDIA = false` in `src/content/media.ts`

Nothing else changes. Frames are already 4:3 and 3:4 — the ratios a phone
produces, not cinematic crops that would break on arrival.

### Two flags, deliberately separate

| Flag | Governs |
|---|---|
| `HAS_REAL_PHOTOS` | **Publication** — indexing, sitemap, nav |
| `SHOW_PLACEHOLDER_MEDIA` | **Preview only** — whether dummies render |

Separate so layout can be reviewed without ever putting the gallery on a path
to being indexed. Turning previews on cannot publish anything: `/erga` and
`/exoplismos` stay `noindex, nofollow`, stay out of the sitemap, and stay out
of the nav while `HAS_REAL_PHOTOS` is false. **Verified.**

`npm run check:media` fails the build if placeholders are on in a production
deploy, or if both flags are true. Mutation-tested both ways.

---

## What to photograph

Phone photos are fine — the category norm, and one ranking competitor's whole
gallery is Viber-forwarded snapshots. Landscape (4:3) unless noted.

### Έργα — before/after pairs · 12 images

The primary format. **No competitor has before/after**, despite all four
selling visible physical change. It is the single most persuasive thing this
business can show, and the gallery is designed around it.

Both halves of a pair must be **the same spot from the same angle**. That is
the whole trick — and it means taking the "before" shot *before starting*,
which is the easy thing to forget.

| # | Pair | Place | Files |
|---|---|---|---|
| 1 | Καθαρισμός οικοπέδου | Μεταμόρφωση | `erga-oikopedo-{prin,meta}.svg` |
| 2 | Εκσκαφή θεμελίων | Οικισμός Δασκάλων | `erga-themelia-{prin,meta}.svg` |
| 3 | Στρώσιμο χώματος σε αυλή | Ψακούδια | `erga-avli-{prin,meta}.svg` |
| 4 | Κατασκευή βόθρου | Νικήτη | `erga-vothros-{prin,meta}.svg` |
| 5 | Καθαρισμός παραλίας | Βατοπέδι | `erga-paralia-{prin,meta}.svg` |
| 6 | Εκβραχισμός | Μεταμόρφωση | `erga-vrachos-{prin,meta}.svg` |

The places are **suggestions matched to the service**, not records of real
jobs. Use whatever he actually has, and correct the captions in `media.ts`.
Each caption also carries a `year` currently set to `[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]`.

### Στόλος — one per machine · 8 images

Only machines he confirmed owning. No page names anything outside this list.

`stolos-tsapa-megali` · `stolos-tsapa-mesaia` · `stolos-tsapa-mikri` ·
`stolos-fortotis` · `stolos-fortiga` · `stolos-jcb` · `stolos-diavolaki` ·
`stolos-trakter`

The three excavators matter commercially — big enough for a site, small enough
for a garden. Photographing them **at work** rather than parked in a row makes
that legible.

### Ποιοι είμαστε — 1 image, portrait (3:4)

`etaireia-adelfia` — Γρηγόρης and Νικόλαος on site. Portrait, because phones
shoot people vertically. The most valuable photo on the site and the one most
likely to be skipped: the whole page is about two brothers, and right now
there is no picture of them.

---

## Not needed

**No hero photograph.** The hero is typographic by design — 1987 at display
scale on the level line. It does not depend on photography arriving, which is
deliberate: a photo-led hero would have been fragile against exactly this
delay.

**No stock backgrounds or textures.** §6b permits them, but the palette and
the level-line motif carry the design without any. Nothing to remove later.

---

## Regenerating

`npm run placeholders` rewrites all 21 from `scripts/make-placeholders.mjs`.
Edit that script to change labels or add slots.
