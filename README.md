# Χωματουργικά Τσοπούρογλου — tsopouroglou.gr

Greek-language site for **ΓΡΗΓΟΡΙΟΣ & ΝΙΚΟΛΑΟΣ ΤΣΟΠΟΥΡΟΓΛΟΥ**, a family
earthworks business in Μεταμόρφωση, Χαλκιδική, working the same ground since
1987.

Built mobile-first: the audience is mostly on a phone, mostly over 40, on a
village connection. The phone number is the conversion event, so it is
reachable from every scroll position on every page.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · Resend for the
quote form · deployed on Vercel. Every dependency is pinned exactly — this is a
site that gets touched rarely, and a silent minor bump is not worth the risk.

Not `output: "export"`: a static export cannot host the Resend route handler
and the API key must stay server-side. Every content page is still prerendered
at build, so delivery is identical.

## Running it

```bash
npm install
npm run dev        # localhost:3000, pinned
npm run build && npm run serve   # production build, same port
```

Copy `.env.example` to `.env.local` for the form. Without a key the form
returns 503 and the UI tells the visitor to phone instead — which is the
correct fallback for this business.

## Editing content

All copy lives in `src/content/` and nothing else needs touching:

| File | What |
|---|---|
| `site.ts` | business facts, homepage sections, reviews |
| `services.ts` | the eight services, one record each |
| `areas.ts` | the areas served |
| `media.ts` | every image path, alt text and aspect ratio |
| `site-config.ts` | domain, email routing, sitemap freshness date |

Photographs go in `public/erga/` and are referenced from `media.ts`. **Real
photos only** — every image on the site is the client's own work. Stock
excavators presented as his fleet would be a straightforward lie to his
customers, so the build refuses to ship them.

## Checks

These exist because each one caught something real that no amount of looking
at the page would have.

```bash
npm run check        # Greek copy guard — accents, city names, stale year counts
npm run contrast     # WCAG ratios, parsed from the actual tokens
npm run check:media  # no placeholder images in a production build
npm run check:meta   # 393 checks: titles, canonicals, OG, JSON-LD, breadcrumbs
npm run nav-test     # the navigation panel's accessibility behaviour
npm run touch-nav    # real touch input, not a synthetic click
npm run overflow     # horizontal overflow at a given width
```

`check`, `contrast` and `check:media` run automatically on every build.
`check:meta`, `nav-test`, `touch-nav` and `overflow` need a server running.

## Notes

- Greek uppercase is authored literally, never with `text-transform` — the
  browser gets tonos and final sigma wrong.
- Never state a number of years. `«από το 1987»` only; a count goes stale
  every January and the guard enforces it.
- No `aggregateRating` in the schema. Google prohibits self-serving review
  markup for a LocalBusiness, and a manual action would cost the exact
  rankings this site exists to win.
