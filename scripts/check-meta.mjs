/**
 * Asserts the head tags that only exist to be read by machines.
 *
 *   node scripts/check-meta.mjs [origin]
 *
 * Every one of these is invisible in a browser and invisible in review. The
 * site shipped for six gates with no og:image at all, and then — once the
 * card existed — with the card missing from exactly the twelve dynamic
 * routes, because Next replaces the `openGraph` field wholesale instead of
 * deep-merging it. Nothing on screen changes when this breaks. Only a link
 * pasted into Viber looks wrong, which is where this business gets shared.
 *
 * Requires the dev server (or `npm run serve`) on the origin given.
 */
const ORIGIN = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

/** Kept in step with sitemap.ts by the coverage check at the bottom. */
const ROUTES = [
  "/",
  "/ypiresies",
  "/perioxes",
  "/etaireia",
  "/epikoinonia",
  "/exoplismos",
  "/politiki-aporritou",
  "/ypiresies/ekskafes",
  "/ypiresies/katharismos-oikopedon",
  "/ypiresies/vothroi",
  "/ypiresies/ekvrachismoi",
  "/ypiresies/katharismos-paralias",
  "/ypiresies/metafores-chomaton",
  "/ypiresies/choma-kipou",
  "/ypiresies/syndeseis-nerou-apocheteusi",
  "/perioxes/metamorfosi",
  "/perioxes/nikiti",
  "/perioxes/vatopedi",
  "/perioxes/psakoudia",
];

const one = (html, re) => html.match(re)?.[1]?.trim() ?? null;

const CHECKS = [
  {
    id: "title",
    get: (h) => one(h, /<title>([^<]+)<\/title>/),
    ok: (v) => v && v.length > 10,
    msg: "no <title>",
  },
  {
    id: "description",
    get: (h) => one(h, /<meta name="description" content="([^"]*)"/),
    ok: (v) => v && v.length > 40,
    msg: "missing or stub meta description",
  },
  {
    id: "canonical",
    get: (h) => one(h, /<link rel="canonical" href="([^"]*)"/),
    ok: (v) => v && v.startsWith("http"),
    msg: "no canonical",
  },
  {
    id: "og:image",
    get: (h) => one(h, /<meta property="og:image" content="([^"]*)"/),
    ok: (v) => Boolean(v),
    // The single most fragile tag on the site — see the header comment.
    msg: "no og:image (a shared link renders as a bare grey box)",
  },
  {
    id: "og:title",
    get: (h) => one(h, /<meta property="og:title" content="([^"]*)"/),
    ok: (v) => Boolean(v),
    msg: "no og:title",
  },
  {
    id: "twitter:image",
    get: (h) => one(h, /<meta name="twitter:image" content="([^"]*)"/),
    ok: (v) => Boolean(v),
    // twitter:card is summary_large_image site-wide; without an image that
    // renders worse than declaring nothing at all.
    msg: "twitter:card is large but there is no twitter:image",
  },
  {
    id: "lang",
    get: (h) => one(h, /<html[^>]*lang="([^"]*)"/),
    ok: (v) => v === "el",
    msg: 'lang is not "el"',
  },
  {
    id: "h1",
    get: (h) => (h.match(/<h1[\s>]/g) ?? []).length,
    ok: (n) => n === 1,
    msg: "must be exactly one <h1>",
  },
];

/**
 * JSON-LD checks.
 *
 * Structured data is the most invisible thing on the site: it renders
 * nothing, and a typo that makes it unparseable looks identical to a page
 * that is working. Google simply drops it. So every route's blocks must
 * parse, and the LocalBusiness node must keep the properties that do the
 * local-search work — sameAs above all, which is what tells Google this site
 * and his Google Business Profile are one business.
 */
const LD_RE = /<script type="application\/ld\+json">(.*?)<\/script>/gs;

function ldBlocks(html) {
  return [...html.matchAll(LD_RE)].map((m) => m[1]);
}

const failures = [];
let checked = 0;

for (const route of ROUTES) {
  let html;
  try {
    const res = await fetch(ORIGIN + route);
    if (!res.ok) {
      failures.push([route, "http", `returned ${res.status}`]);
      continue;
    }
    html = await res.text();
  } catch (e) {
    console.error(
      `\n✗ cannot reach ${ORIGIN}${route} — is the server up?\n  ${e.message}\n`
    );
    process.exit(1);
  }
  for (const c of CHECKS) {
    checked++;
    const value = c.get(html);
    if (!c.ok(value)) failures.push([route, c.id, `${c.msg} (got ${JSON.stringify(value)})`]);
  }

  // ---- JSON-LD ----
  const blocks = ldBlocks(html);
  checked++;
  if (blocks.length === 0) {
    failures.push([route, "json-ld", "no JSON-LD on this route"]);
    continue;
  }

  const parsed = [];
  for (const b of blocks) {
    checked++;
    try {
      parsed.push(JSON.parse(b));
    } catch (e) {
      failures.push([route, "json-ld", `block does not parse: ${e.message}`]);
    }
  }

  const biz = parsed.find((d) => d["@type"] === "GeneralContractor");
  checked++;
  if (!biz) {
    failures.push([route, "localbusiness", "no GeneralContractor node — it is site-wide, so every route should carry it"]);
  } else {
    for (const key of ["sameAs", "image", "logo", "description", "geo", "areaServed", "openingHoursSpecification"]) {
      checked++;
      if (!biz[key]) failures.push([route, "localbusiness", `missing "${key}"`]);
    }
    checked++;
    // Ruled out at gate 1: Google prohibits self-serving review markup for a
    // LocalBusiness, and a manual action would cost the exact rankings this
    // site exists to win.
    if (biz.aggregateRating) {
      failures.push([route, "localbusiness", "aggregateRating must NOT be present — self-serving review markup"]);
    }
  }

  // Detail pages are the ones that can win a breadcrumb in the SERP.
  if (/^\/(ypiresies|perioxes)\/./.test(route)) {
    checked++;
    if (!parsed.some((d) => d["@type"] === "BreadcrumbList")) {
      failures.push([route, "breadcrumb", "detail page has no BreadcrumbList"]);
    }
  }
}

// The route list above is hand-maintained; if the sitemap grows past it, this
// guard would quietly stop covering the new pages.
const sitemap = await (await fetch(ORIGIN + "/sitemap.xml")).text();
const inSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1]).pathname.replace(/\/$/, "") || "/"
);
const uncovered = inSitemap.filter((p) => !ROUTES.includes(p));
if (uncovered.length) {
  failures.push(["sitemap", "coverage", `in sitemap but unchecked: ${uncovered.join(", ")}`]);
}

if (failures.length === 0) {
  console.log(
    `✓ Meta guard: ${checked} checks across ${ROUTES.length} routes clean.`
  );
  process.exit(0);
}

console.error(`✗ Meta guard: ${failures.length} problem(s).\n`);
for (const [route, id, msg] of failures) {
  console.error(`  ${route}  [${id}]`);
  console.error(`    ${msg}\n`);
}
process.exit(1);
