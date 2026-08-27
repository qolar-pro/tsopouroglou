# Photos — what is in, and what is still worth shooting

**Placeholders are gone.** Every image on the site is Γρηγόρης's own
photograph of his own work, which is what CLAUDE.md §6b required before
anything could be published. `/erga` content and `/exoplismos` are live.

15 photographs are in use, from 16 supplied. One was a video-editor
screenshot duplicating another and was dropped.

## What was done to them

Nine arrived as phone screenshots with UI on them — status bars, video player
controls, gallery navigation. Those were cropped off. Nothing else was
touched: **no filters and no colour grading**, because grading someone's job
site to look moody is its own kind of dishonesty, and the design was built so
ordinary phone photos read as a work record rather than as bad photography.

Originals live in the chat; working copies are in `/public/erga/`.

## Where they are

| Slot | Photo |
|---|---|
| Hero | `ekskafi-oikopedou` — deep dig beside a house |
| Ποιοι είμαστε | `cheiristis` — the operator in the cab |
| Έργα gallery (on `/ypiresies`) | 12 photographs, each with a sentence |
| Στόλος | 6 machines |
| Service pages | 5 of 8 |

## 🔴 Still worth asking for

### 1. Before/after pairs — the one real gap
**Not one photograph is a before/after pair.** You only get those by shooting
the "before" *before starting*, which is the easy thing to forget once a job
is underway.

This matters more than it sounds: none of the four ranking competitor sites
has before/after, despite all four selling visible physical change. It was
the one uncontested format available, and the gallery was originally built
around it. It is now single photographs with descriptions instead.

**Ask:** on the next few jobs, one frame before the machine moves and one
from the same spot when finished. Two photos, same angle. That is all.

### 2. No βόθρος, no εκβραχισμός, no beach
Three service pages render with no photograph rather than a stand-in:
`/ypiresies/vothroi`, `/ypiresies/ekvrachismoi`,
`/ypiresies/katharismos-paralias`.

Καθαρισμός παραλίας is the notable one — it is an uncontested keyword with
real seasonal demand that no competitor covers, and it has no picture.

### 3. Machine names are not confirmed against the photos
The fleet page labels only what is unambiguous — the JCB and the CAT are
branded, the wheel loader is obvious. The excavators are **not** labelled
μεγάλη / μεσαία / μικρή, because that cannot be told from a photograph and
guessing would be inventing. Confirmed list still appears as text.

**Ask:** which machine is which, so the fleet page can name them properly.

### 4. A photograph of both brothers
`cheiristis` shows one man in a cab. The Ποιοι είμαστε page is about *two*
brothers. One picture of the pair would be the strongest image on the site.

## Swapping or adding

One file: `src/content/media.ts`. Drop files into `/public/erga/`, point
`src` at them, write a real Greek `alt`. Frames are 4:3, 3:4 and 4:5 — the
ratios a phone produces.

`npm run check:media` still guards the flags and fails a production build
that has placeholders enabled.
