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
