import {
  SEGMENT,
  SERVICE_SLUG,
  AREA_SLUG,
  SERVICE_IDS,
  AREA_IDS,
  localeRoot,
  type Locale,
  type PageKey,
  type ServiceId,
  type AreaId,
} from "./locales";

/**
 * The one place a URL is built, and the one place a URL is read.
 *
 * Because slugs are translated, no path on this site is a literal any more:
 * `/ypiresies/ekskafes` in Greek is `/en/services/excavation`,
 * `/sr/usluge/iskopi` and `/mk/uslugi/iskopi`. Every link therefore goes
 * through `href()`, and every incoming request through `resolve()`.
 *
 * The two are exact inverses, and the test at the bottom of this file proves
 * it for every locale and every entity at build time. That property is what
 * makes translated slugs safe: get it wrong and links point at 404s in three
 * languages nobody on the team reads.
 */

export type Route =
  | { page: "home" }
  | { page: "services" }
  | { page: "service"; id: ServiceId }
  | { page: "areas" }
  | { page: "area"; id: AreaId }
  | { page: "fleet" }
  | { page: "about" }
  | { page: "contact" }
  | { page: "faq" }
  | { page: "privacy" };

/** Join path parts under the locale root, always leading-slashed. */
const join = (locale: Locale, ...parts: string[]) => {
  const base = locale === "el" ? "" : `/${locale}`;
  const tail = parts.filter(Boolean).join("/");
  return tail ? `${base}/${tail}` : base || "/";
};

/** Build the URL for a route in a locale. */
export function href(locale: Locale, route: Route): string {
  switch (route.page) {
    case "home":
      return localeRoot(locale);
    case "service":
      return join(locale, SEGMENT[locale].services, SERVICE_SLUG[locale][route.id]);
    case "area":
      return join(locale, SEGMENT[locale].areas, AREA_SLUG[locale][route.id]);
    default:
      return join(locale, SEGMENT[locale][route.page]);
  }
}

/**
 * Read a path back into a route.
 *
 * `segments` is what the catch-all route hands us: the path AFTER the locale
 * prefix, already split. Returns null for anything unknown, which the page
 * turns into a real 404 rather than an empty render.
 */
export function resolve(locale: Locale, segments: string[]): Route | null {
  if (segments.length === 0) return { page: "home" };

  const seg = SEGMENT[locale];
  const [first, second, ...rest] = segments;
  if (rest.length > 0) return null;

  if (first === seg.services) {
    if (!second) return { page: "services" };
    const id = SERVICE_IDS.find((s) => SERVICE_SLUG[locale][s] === second);
    return id ? { page: "service", id } : null;
  }

  if (first === seg.areas) {
    if (!second) return { page: "areas" };
    const id = AREA_IDS.find((a) => AREA_SLUG[locale][a] === second);
    return id ? { page: "area", id } : null;
  }

  // Everything else is a single segment; a second one is not a page.
  if (second) return null;

  for (const key of ["fleet", "about", "contact", "faq", "privacy"] as const) {
    if (first === seg[key]) return { page: key };
  }

  return null;
}

/**
 * Every route that exists, for one locale.
 *
 * Drives generateStaticParams, the sitemap and the hreflang map, so a page
 * cannot exist in one of those three and be missing from the others.
 */
export function allRoutes(): Route[] {
  return [
    { page: "home" },
    { page: "services" },
    ...SERVICE_IDS.map((id) => ({ page: "service", id }) as const),
    { page: "areas" },
    ...AREA_IDS.map((id) => ({ page: "area", id }) as const),
    { page: "fleet" },
    { page: "about" },
    { page: "contact" },
    { page: "faq" },
    { page: "privacy" },
  ];
}

/** The path segments after the locale prefix — what generateStaticParams needs. */
export function routeSegments(locale: Locale, route: Route): string[] {
  const url = href(locale, route);
  const base = locale === "el" ? "" : `/${locale}`;
  const tail = url.slice(base.length);
  return tail.split("/").filter(Boolean);
}

/**
 * The same route in every language — the hreflang map for a page.
 *
 * This is why routes are ids rather than paths: the English service page can
 * say which Serbian URL is its own translation, and Google reads the four as
 * one page in four languages instead of four unrelated pages.
 */
export function alternates(route: Route): Record<Locale, string> {
  return {
    el: href("el", route),
    en: href("en", route),
    sr: href("sr", route),
    mk: href("mk", route),
  };
}

/* ------------------------------------------------------------------ */
/* Build-time proof that href() and resolve() are inverses.            */
/*                                                                     */
/* Cheap to run, and it catches the failure mode that would otherwise   */
/* ship silently: a slug that builds one way and reads back another, so */
/* the sitemap advertises a URL the router answers with a 404.         */
/* ------------------------------------------------------------------ */
{
  const LOCALES_TO_CHECK: Locale[] = ["el", "en", "sr", "mk"];
  for (const locale of LOCALES_TO_CHECK) {
    for (const route of allRoutes()) {
      const segments = routeSegments(locale, route);
      const back = resolve(locale, segments);
      if (!back) {
        throw new Error(
          `paths.ts: "${href(locale, route)}" builds but does not resolve back ` +
            `(${locale}, ${JSON.stringify(route)}).`
        );
      }
      const same =
        back.page === route.page &&
        ("id" in route ? "id" in back && back.id === route.id : !("id" in back));
      if (!same) {
        throw new Error(
          `paths.ts: "${href(locale, route)}" resolves to ${JSON.stringify(back)}, ` +
            `expected ${JSON.stringify(route)}.`
        );
      }
    }
  }
}
