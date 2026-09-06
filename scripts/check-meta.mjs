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

/**
 * THE ROUTE LIST IS THE SITEMAP.
 *
 * It used to be hand-maintained here, with a coverage check at the bottom
 * comparing it against the sitemap. That was one list too many: adding a page
 * meant editing two files, and the guard only complained AFTER the omission
 * already existed. With four languages and twenty-one pages each, a
 * hand-kept list of eighty-four paths would be wrong within a week.
 *
 * Fetching the sitemap makes the guard cover, by construction, exactly what
 * the site advertises to Google — which is the thing we actually care about.
 */
const sitemapXml = await (await fetch(ORIGIN + "/sitemap.xml")).text();
const ROUTES = [
  ...new Set(
    [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/"
    )
  ),
];
if (ROUTES.length < 20) {
  console.error(
    `
✗ sitemap returned only ${ROUTES.length} URLs — is the server up and built?
`
  );
  process.exit(1);
}

const one = (html, re) => html.match(re)?.[1]?.trim() ?? null;

/**
 * BCP-47 each route must declare. Mirrors LOCALE_TAG in content/i18n.
 *
 * Derived from the path's first segment, so it covers every page in every
 * language rather than just the three landing pages. This check used to
 * assert "el" everywhere — it did not merely miss the bug where the English
 * pages declared themselves Greek, it asserted it, and would have reported
 * the fix as the failure.
 */
const expectedLang = (route) => {
  const first = route.split("/").filter(Boolean)[0];
  if (first === "en") return "en";
  if (first === "sr") return "sr-Latn";
  if (first === "mk") return "mk";
  return "el";
};

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
    id: "hreflang",
    get: (h) => (h.match(/<link rel="alternate" hrefLang=/gi) ?? []).length,
    // el, en, sr-Latn, mk, x-default — reciprocal on EVERY route, not just
    // the landing pages: each page names its own translations, which is what
    // makes Google read the four as one page rather than four rivals.
    ok: (n) => n >= 5,
    // Next replaces `alternates` wholesale instead of deep-merging, so a page
    // that sets only { canonical } silently drops the whole hreflang map.
    // That happened: every Greek page stopped advertising the translations.
    msg: "fewer than 4 hreflang links — did this page set alternates without pageAlternates()?",
  },
  {
    id: "lang",
    get: (h) => one(h, /<html[^>]*lang="([^"]*)"/),
    /**
     * PER ROUTE, not "el" everywhere.
     *
     * This check used to assert lang === "el" on every route, /en and /sr
     * included — so the guard did not merely miss the bug where the English
     * page declared itself Greek, it asserted it. Any fix would have been
     * reported as the failure.
     *
     * A guard that encodes the defect as the expectation is worse than no
     * guard, because it actively defends it. The expectation now comes from
     * the route.
     */
    ok: (v, route) => v === expectedLang(route),
    msg: (route) => `lang is not "${expectedLang(route)}"`,
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
    // `ok` and `msg` may depend on the route — lang does, since /en and /sr
    // must NOT declare Greek. Both accept the route as a second argument and
    // msg may be a function.
    if (!c.ok(value, route)) {
      const msg = typeof c.msg === "function" ? c.msg(route) : c.msg;
      failures.push([route, c.id, `${msg} (got ${JSON.stringify(value)})`]);
    }
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
  if (
    /^\/(ypiresies|perioxes)\/./.test(route) ||
    /^\/(en|sr|mk)\/[^/]+\/./.test(route)
  ) {
    checked++;
    if (!parsed.some((d) => d["@type"] === "BreadcrumbList")) {
      failures.push([route, "breadcrumb", "detail page has no BreadcrumbList"]);
    }
  }
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
