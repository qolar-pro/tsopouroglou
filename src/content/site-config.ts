/**
 * One place for anything that changes when the real domain is registered.
 *
 * `xomatourgika-tsopouroglou.gr` is NOT registered yet. Every canonical URL,
 * OG tag, sitemap entry and JSON-LD @id derives from SITE_URL, so registering
 * it — or choosing a different name — is a one-line edit here, not a
 * find-and-replace across the site.
 *
 * NEXT_PUBLIC_SITE_URL overrides it, so Vercel preview deployments can carry
 * their own origin without touching source.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://xomatourgika-tsopouroglou.gr";

/** Absolute URL for a site-relative path. */
export const abs = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Sender for the quote form.
 *
 * The real domain isn't registered, so the pipeline runs on a temporary
 * verified sender. Swap FROM_EMAIL when the .gr is live and verified in
 * Resend — see PLACEHOLDERS.md.
 */
export const FROM_EMAIL =
  process.env.RESEND_FROM ?? "Ιστοσελίδα <noreply@blancographics.xyz>";

/** Where quote requests land. */
export const TO_EMAIL =
  process.env.RESEND_TO ?? "gregorestsopouroglou@gmail.com";

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
