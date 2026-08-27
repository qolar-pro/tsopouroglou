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

**A second pass caught what the first missed.** `ergotaxio.jpg` still had the
phone gallery's back-arrow and a burned-in "2023 · 20 Ιουλίου" on it, and it
was live in the Έργα gallery that way — the left strip is now cropped off and
both machines are kept. Five more (`ekskafi-oikopedou`, `ekskafi-vathia`,
`fortosi-kormon`, `metafora-dentron`, `themelia-jcb`) still carried black
letterbox bars from the video frames they were taken from; those are trimmed.
`object-fit: cover` was hiding most of it at most viewports, which is exactly
why it survived a visual review.

The share card at `/opengraph-image` is built from `ergotaxio` — his own site,
two of his own machines.

## Where they are

| Slot | Photo |
|---|---|
| Hero | `ekskafi-oikopedou` — deep dig beside a house |
| Ποιοι είμαστε | `cheiristis` — the operator in the cab |
| Έργα gallery (on `/ypiresies`) | 12 photographs, each with a sentence |
| Στόλος | 6 machines |
| Service pages | 5 of 8 |

## Which pages are text-only right now

Counted off the rendered HTML, not off the manifest:

| Route | Images |
|---|---|
| `/ypiresies` | 12 |
| `/` | 8 |
| `/exoplismos` | 6 |
| `/etaireia` | 1 |
| `/ypiresies/vothroi` | **0** |
| `/ypiresies/ekvrachismoi` | **0** |
| `/ypiresies/katharismos-paralias` | **0** |
| `/perioxes` | **0** |
| `/perioxes/metamorfosi` | **0** |
| `/perioxes/nikiti` | **0** |
| `/perioxes/vatopedi` | **0** |
| `/perioxes/psakoudia` | **0** |
| `/epikoinonia` | **0** |

Nine of fourteen routes carry no photograph. The redesign made every one of
them read as a deliberate list rather than as an empty box, so none of it
looks broken — but the pages that are supposed to prove he does the work are
the ones with nothing to look at.

`/epikoinonia` is fine as it is: it is a phone number and a form, and a photo
there would be decoration.

## 📷 The shot list, in priority order

Everything below is one phone photo per line. No equipment, no planning — the
next few jobs would produce all of it.

**1. The three service pages with nothing on them.** Highest value per photo,
because each one is a page that currently argues in words only.
  - a finished **βόθρος** — the excavation, or the chamber before it is covered
  - an **εκβραχισμός** — the hammer on rock, or broken rock loaded out
  - a **καθαρισμός παραλίας** — the machine on sand. This is the one that
    matters most commercially: uncontested keyword, real seasonal demand,
    no competitor covers it, and right now it has no picture.

**2. One photo per area — five photos.** Each area page has genuinely
distinct copy and nothing to look at. A recognisable frame of the place
(a plot, a yard, the coast at Ψακούδια or Βατοπέδι) makes the page about
somewhere real rather than about a keyword. It also guards against the thin
-content filter these pages exist to avoid.
  - Μεταμόρφωση / Δασκάλων (home ground — the shared page)
  - Νικήτη
  - Βατοπέδι
  - Ψακούδια

**3. Before/after pairs** — see below. Still the one format nobody in this
market has.

**4. The two brothers together** — one frame, the strongest image the site
could have.

**5. The rest of the fleet.** Six machines are shown; the confirmed list has
more, and two of the six reuse a job photo that is really about something
else. Missing outright: the **τρακτέρ**, and the three τσάπες as three
distinct machines rather than one.

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
