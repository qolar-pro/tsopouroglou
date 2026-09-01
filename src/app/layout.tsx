import type { Metadata } from "next";
import { Alegreya_Sans } from "next/font/google";
import { seo, business } from "@/content/site";
import HeaderScrollState from "@/components/HeaderScrollState";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyCallBar from "@/components/StickyCallBar";
import { SITE_URL, abs, pageOpenGraph } from "@/content/site-config";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/**
 * One family, split into two instances purely to control what gets preloaded.
 *
 * Measured: the latin subset is ~16.9KB per weight, greek only ~5.3KB —
 * latin is the expensive one. And ASCII digits live in the LATIN subset (its
 * unicode-range starts U+0000–00FF), so dropping latin entirely would make
 * "1987" at 208px — the LCP element — render in a fallback and swap.
 *
 * So: weight 900 keeps latin preloaded, because that is the year and the
 * wordmark. Weights 400 and 700 preload greek only; their latin glyphs (the
 * email, "JCB", small digits) load on demand, and next/font's metric-matched
 * fallback keeps the swap from shifting layout.
 *
 * 8 preloaded files / 87KB  →  4 preloaded files / 32.5KB.
 *
 * Weight 500 is gone entirely (labels and the ghost button now use 400).
 */
const alegreyaDisplay = Alegreya_Sans({
  variable: "--font-alegreya-display",
  subsets: ["greek", "latin"],
  weight: ["900"],
  display: "swap",
});

const alegreyaSans = Alegreya_Sans({
  variable: "--font-alegreya",
  subsets: ["greek"],
  weight: ["400", "700"],
  display: "swap",
});

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="el"
      className={`${alegreyaSans.variable} ${alegreyaDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Furniture lives here, not per page — 14 more routes are coming. */}
        {/* LocalBusiness, site-wide. No aggregateRating — gate 1 ruling. */}
        <JsonLd data={localBusinessSchema()} />
        <HeaderScrollState />
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyCallBar />
        {/*
          Vercel Web Analytics. Cookieless by design, which is the entire
          reason it is here rather than GA: CLAUDE.md §7b rules out anything
          that sets a cookie without consent, and skipping the consent banner
          is worth more on this audience than any metric it could collect.
          No personal data, nothing to disclose beyond what the privacy page
          already says.
        */}
        <Analytics />
      </body>
    </html>
  );
}
