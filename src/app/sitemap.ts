import type { MetadataRoute } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { abs, CONTENT_UPDATED } from "@/content/site-config";
import { LOCALES, allRoutes, href, alternates, type Route } from "@/content/i18n";

/**
 * Every page, in every language, with its translations declared alongside it.
 *
 * Built from `allRoutes()` — the same list that drives generateStaticParams
 * and the hreflang map — so a page cannot exist in the router and be missing
 * from the sitemap, which is the usual way translated pages go unindexed.
 *
 * `alternates.languages` on each entry is the sitemap-side half of hreflang.
 * Google wants the relationship declared in both the page head and the
 * sitemap; the head alone is weaker, and for a site whose whole point is
 * being found in four languages that is not a corner to cut.
 *
 * The fleet page is gated on HAS_REAL_PHOTOS in all four languages — the rule
 * that his machines page shows his machines or nothing. A photograph is not
 * more honest in Serbian.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // See CONTENT_UPDATED: a build timestamp here is a lie told every deploy.
  const lastModified = new Date(CONTENT_UPDATED);

  const routes = allRoutes().filter(
    (r) => HAS_REAL_PHOTOS || r.page !== "fleet"
  );

  const priorityFor = (route: Route, isGreek: boolean) => {
    // Greek is the primary market and the origin of every ranking signal the
    // site already has, so it leads; the translations sit just below.
    const base =
      route.page === "home"
        ? 1
        : route.page === "services" || route.page === "areas"
          ? 0.8
          : route.page === "privacy"
            ? 0.2
            : 0.7;
    return isGreek ? base : Math.max(0.1, Math.round((base - 0.1) * 10) / 10);
  };

  return LOCALES.flatMap((locale) =>
    routes.map((route) => {
      const alt = alternates(route);
      return {
        url: abs(href(locale, route)),
        lastModified,
        changeFrequency:
          route.page === "privacy" ? ("yearly" as const) : ("monthly" as const),
        priority: priorityFor(route, locale === "el"),
        alternates: {
          languages: {
            el: abs(alt.el),
            en: abs(alt.en),
            "sr-Latn": abs(alt.sr),
            mk: abs(alt.mk),
            "x-default": abs(alt.el),
          },
        },
      };
    })
  );
}
