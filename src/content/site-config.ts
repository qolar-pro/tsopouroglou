/**
 * One place for anything that changes when the real domain is registered.
 *
 * `xomatourgika-tsopouroglou.gr` is NOT registered yet. Every canonical URL,
 * OG tag, sitemap entry and JSON-LD @id derives from SITE_URL, so registering
 * it — or choosing a different name — is a one-line edit here, not a
 * find-and-replace across the site.
 */
const PRODUCTION_URL = "https://xomatourgika-tsopouroglou.gr";

/**
 * An env var that exists but is EMPTY is not the same as one that is unset,
 * and `??` only catches the second.
 *
 * This broke the first Vercel deploy. `NEXT_PUBLIC_SITE_URL` was present with
 * a blank value — trivially easy to do by adding the key in the dashboard and
 * leaving the field empty — so the fallback never fired, SITE_URL became "",
 * and `new URL("")` threw. The stack pointed at metadataBase in layout.tsx,
 * eleven files from the actual cause.
 */
const env = (name: string) => {
  const v = process.env[name]?.trim();
  return v ? v.replace(/\/+$/, "") : undefined;
};

/**
 * Preview deployments get their own origin.
 *
 * The production domain does not exist yet, so without this every canonical,
 * og:image and JSON-LD @id on a preview points at a host that fails to
 * resolve — which makes the share card untestable and the preview impossible
 * to check properly. Vercel marks preview deployments noindex, so pointing
 * them at themselves costs nothing in search.
 *
 * PRODUCTION IS NEVER a *.vercel.app URL: a canonical pointing at the
 * deployment host instead of the real domain would split the site's ranking
 * signals across two origins. Only an explicit override, or the real domain.
 */
export const SITE_URL = (() => {
  const explicit = env("NEXT_PUBLIC_SITE_URL");
  if (explicit) return explicit;

  const previewHost = env("VERCEL_URL");
  if (process.env.VERCEL_ENV === "preview" && previewHost) {
    return `https://${previewHost}`;
  }

  return PRODUCTION_URL;
})();

// Fail here, with the reason, rather than eleven files away inside a
// `new URL()` that reports only "Invalid URL".
try {
  new URL(SITE_URL);
} catch {
  throw new Error(
    `site-config: SITE_URL is not a valid absolute URL (got ${JSON.stringify(SITE_URL)}). ` +
      `Check NEXT_PUBLIC_SITE_URL — an empty value in the Vercel dashboard is the usual cause.`
  );
}

/** Absolute URL for a site-relative path. */
export const abs = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * The share card, as a metadata `images` entry.
 *
 * `app/opengraph-image.tsx` populates og:image automatically — but ONLY for
 * routes that do not declare an `openGraph` block of their own. Next replaces
 * that field wholesale rather than deep-merging it, so a page that sets
 * `openGraph: { title, description }` silently drops the inherited image.
 *
 * That is exactly what happened: the twelve dynamic service and area pages —
 * the ones most likely to be shared, because they name a specific job in a
 * specific village — went out with no card while the five static ones had
 * one. Every page now builds its openGraph through `pageOpenGraph` so the
 * image cannot be forgotten again, and scripts/check-meta.mjs fails the
 * check if any route ships without it.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

/** The openGraph block every page should use. */
export const pageOpenGraph = (
  title: string,
  description: string,
  type: "website" | "article" = "article"
) => ({
  type,
  locale: "el_GR" as const,
  title,
  description,
  images: [OG_IMAGE],
});

/**
 * When the site's CONTENT last changed. Bump this when copy, services, areas
 * or photos change — not on every deploy.
 *
 * The sitemap previously stamped `new Date()`, so every build told Google
 * that all nineteen pages had just changed. Google only trusts <lastmod> if
 * it is consistently accurate, and a value that is always "now" is
 * consistently wrong — it trains the crawler to ignore the field, which
 * costs the one signal that would matter when a page genuinely does change.
 */
export const CONTENT_UPDATED = "2026-09-01T00:00:00.000Z";

/**
 * The `alternates` block every page should use.
 *
 * Next replaces `alternates` wholesale rather than deep-merging it — the same
 * trap that silently dropped og:image from twelve routes. So a page setting
 * only `{ canonical }` throws away the hreflang map inherited from the
 * layout, and the Greek pages stopped advertising the English and Serbian
 * translations at all. hreflang has to be reciprocal or Google treats the
 * translations as unrelated thin pages rather than alternates of one site.
 *
 * Build alternates through here and both survive.
 */
export const pageAlternates = (canonical: string) => ({
  canonical,
  languages: {
    el: abs("/"),
    en: abs("/en"),
    "sr-Latn": abs("/sr"),
    "x-default": abs("/"),
  },
});
