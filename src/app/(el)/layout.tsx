import type { Metadata } from "next";
import { seo, business } from "@/content/site";
import HeaderScrollState from "@/components/HeaderScrollState";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyCallBar from "@/components/StickyCallBar";
import { SITE_URL, abs, pageOpenGraph } from "@/content/site-config";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/next";
import { fontVars } from "../fonts";
import "../globals.css";

/**
 * THE GREEK ROOT LAYOUT.
 *
 * There are two root layouts, in route groups: this one for the nineteen
 * Greek routes, and (intl)/[lang] for /en and /sr. Route groups do not appear
 * in the URL, so every Greek path is exactly what it was.
 *
 * WHY THE SPLIT. A root layout owns <html>, and <html lang> was hardcoded to
 * "el" for the whole app — so /en and /sr, which are written in English and
 * Serbian, declared themselves as Greek to Google and to every screen reader.
 * A layout cannot read the current locale (root layouts get no params), so
 * the only way to vary the attribute is to have more than one root layout.
 * This is the documented pattern — see the "multiple root layouts" note in
 * next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md.
 *
 * The cost is that navigating between Greek and a translation is a full page
 * load rather than a client transition. That is fine: the only such links are
 * in the language switcher, which is plain anchors anyway, and switching
 * language is a once-per-visit action.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    /**
     * hreflang has to be reciprocal. If the Greek pages do not point at the
     * translations, Google sees three unrelated pages instead of one site in
     * three languages, and may treat the English and Serbian pages as thin
     * duplicates rather than alternates.
     */
    languages: {
      el: abs("/"),
      en: abs("/en"),
      "sr-Latn": abs("/sr"),
      "x-default": abs("/"),
    },
  },
  title: seo.title,
  description: seo.description,
  openGraph: {
    ...pageOpenGraph(seo.title, seo.description, "website"),
    siteName: business.legalName,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function GreekRootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="el" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Furniture lives here, not per page. */}
        {/* LocalBusiness, site-wide. No aggregateRating — gate 1 ruling. */}
        <JsonLd data={localBusinessSchema()} />
        <HeaderScrollState />
        <SiteHeader lang="el" />
        {children}
        <SiteFooter lang="el" />
        <StickyCallBar lang="el" />
        {/*
          Vercel Web Analytics. Cookieless by design, which is the entire
          reason it is here rather than GA: CLAUDE.md §7b rules out anything
          that sets a cookie without consent, and skipping the consent banner
          is worth more on this audience than any metric it could collect.
        */}
        <Analytics />
      </body>
    </html>
  );
}
