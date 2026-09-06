import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  dict,
  resolve,
  allRoutes,
  routeSegments,
  alternates,
  href,
  isTranslated,
  OG_LOCALE,
  TRANSLATED,
  type Route,
  type Translated,
} from "@/content/i18n";
import { abs, OG_IMAGE } from "@/content/site-config";
import {
  JsonLd,
  localBusinessSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import {
  HomePage,
  ServicesIndexPage,
  ServiceDetailPage,
  AreasIndexPage,
  AreaDetailPage,
  AboutPage,
  ContactPage,
  FleetPage,
  FaqPage,
  PrivacyPage,
} from "@/components/pages";

/**
 * EVERY TRANSLATED PAGE, in one route.
 *
 * The slugs are translated — /en/services/excavation, /sr/usluge/iskopi,
 * /mk/uslugi/iskopi — so the path segments differ per language and a folder
 * per page would mean three parallel trees of nineteen folders each. An
 * optional catch-all with generateStaticParams enumerating every valid path
 * gives the same fifty-seven static pages from one file, and makes it
 * impossible for the languages to drift apart structurally.
 *
 * `dynamicParams` is off, so anything not enumerated is a real 404 rather
 * than an empty render from a bad param.
 *
 * The page BODIES are shared with the Greek routes (components/pages.tsx).
 * This file only decides which one, and supplies metadata and JSON-LD.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED.flatMap((lang) =>
    allRoutes().map((route) => {
      const path = routeSegments(lang, route);
      // The locale root (/en) has no trailing segments. An optional catch-all
      // wants that as undefined, not as an empty array.
      return path.length ? { lang, path } : { lang, path: undefined };
    })
  );
}

/** Params → a locale and a route, or null if either is unknown. */
async function read(params: Promise<{ lang: string; path?: string[] }>) {
  const { lang, path } = await params;
  if (!isTranslated(lang)) return null;
  const route = resolve(lang, path ?? []);
  return route ? ({ lang, route } as { lang: Translated; route: Route }) : null;
}

/** Per-page title and description, from that page's own copy. */
function metaFor(lang: Translated, route: Route) {
  const t = dict(lang);
  switch (route.page) {
    case "home":
      return { title: t.seo.title, description: t.seo.description };
    case "services":
      return {
        title: t.servicesPage.metaTitle,
        description: t.servicesPage.metaDescription,
      };
    case "service":
      return {
        title: t.services[route.id].metaTitle,
        description: t.services[route.id].metaDescription,
      };
    case "areas":
      return {
        title: t.areasPage.metaTitle,
        description: t.areasPage.metaDescription,
      };
    case "area":
      return {
        title: t.areas[route.id].metaTitle,
        description: t.areas[route.id].metaDescription,
      };
    case "fleet":
      return { title: t.fleet.metaTitle, description: t.fleet.metaDescription };
    case "about":
      return { title: t.about.metaTitle, description: t.about.metaDescription };
    case "contact":
      return {
        title: t.contact.metaTitle,
        description: t.contact.metaDescription,
      };
    case "faq":
      return {
        title: t.faqPage.metaTitle,
        description: t.faqPage.metaDescription,
      };
    case "privacy":
      return {
        title: t.privacy.metaTitle,
        description: t.privacy.metaDescription,
      };
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[[...path]]">): Promise<Metadata> {
  const found = await read(params);
  if (!found) return {};
  const { lang, route } = found;
  const { title, description } = metaFor(lang, route);

  /**
   * hreflang, per PAGE rather than per site.
   *
   * Because routes are ids, the English septic-tank page can name the Greek,
   * Serbian and Macedonian septic-tank URLs exactly. That is what makes
   * Google treat the four as one page in four languages instead of four
   * unrelated pages competing with each other — and it only works because
   * every language really does have this page now.
   */
  const alt = alternates(route);

  return {
    title,
    description,
    alternates: {
      canonical: href(lang, route),
      languages: {
        el: abs(alt.el),
        en: abs(alt.en),
        "sr-Latn": abs(alt.sr),
        mk: abs(alt.mk),
        "x-default": abs(alt.el),
      },
    },
    openGraph: {
      type: route.page === "home" ? "website" : "article",
      locale: OG_LOCALE[lang],
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TranslatedPage({
  params,
}: PageProps<"/[lang]/[[...path]]">) {
  const found = await read(params);
  if (!found) notFound();
  const { lang, route } = found;
  const t = dict(lang);

  /** Breadcrumbs in the reader's language, pointing at that language's URLs. */
  const crumbs = (() => {
    const home = { name: t.navLabels.home, path: href(lang, { page: "home" }) };
    switch (route.page) {
      case "service":
        return [
          home,
          { name: t.navLabels.services, path: href(lang, { page: "services" }) },
          {
            name: t.services[route.id].title,
            path: href(lang, { page: "service", id: route.id }),
          },
        ];
      case "area":
        return [
          home,
          { name: t.navLabels.areas, path: href(lang, { page: "areas" }) },
          {
            name: t.areas[route.id].name,
            path: href(lang, { page: "area", id: route.id }),
          },
        ];
      case "home":
        return null;
      default:
        return [
          home,
          { name: metaFor(lang, route).title, path: href(lang, route) },
        ];
    }
  })();

  return (
    <>
      {/* The same business entity as the Greek pages — same @id — with only
          the human-readable description localised. */}
      <JsonLd data={localBusinessSchema({ description: t.seo.description })} />
      {crumbs && <JsonLd data={breadcrumbSchema(crumbs)} />}
      {route.page === "service" && (
        <JsonLd
          data={serviceSchema({
            id: route.id,
            name: t.services[route.id].title,
            description: t.services[route.id].metaDescription,
            url: href(lang, route),
            language: lang,
          })}
        />
      )}
      {route.page === "faq" && (
        <JsonLd
          data={faqSchema({
            url: href(lang, route),
            language: lang,
            faqs: t.faqs,
          })}
        />
      )}

      {route.page === "home" && <HomePage lang={lang} />}
      {route.page === "services" && <ServicesIndexPage lang={lang} />}
      {route.page === "service" && (
        <ServiceDetailPage lang={lang} id={route.id} />
      )}
      {route.page === "areas" && <AreasIndexPage lang={lang} />}
      {route.page === "area" && <AreaDetailPage lang={lang} id={route.id} />}
      {route.page === "fleet" && <FleetPage lang={lang} />}
      {route.page === "about" && <AboutPage lang={lang} />}
      {route.page === "contact" && <ContactPage lang={lang} />}
      {route.page === "faq" && <FaqPage lang={lang} />}
      {route.page === "privacy" && <PrivacyPage lang={lang} />}
    </>
  );
}
