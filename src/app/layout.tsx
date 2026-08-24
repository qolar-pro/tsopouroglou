import type { Metadata } from "next";
import { Alegreya_Sans } from "next/font/google";
import { seo, business } from "@/content/site";
import HeaderScrollState from "@/components/HeaderScrollState";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyCallBar from "@/components/StickyCallBar";
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
  metadataBase: new URL("https://xomatourgika-tsopouroglou.gr"),
  title: seo.title,
  description: seo.description,
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: business.legalName,
    title: seo.title,
    description: seo.description,
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
        <HeaderScrollState />
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyCallBar />
      </body>
    </html>
  );
}
