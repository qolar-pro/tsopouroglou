import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderScrollState from "@/components/HeaderScrollState";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyCallBar from "@/components/StickyCallBar";
import { SITE_URL } from "@/content/site-config";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/next";
import { T, TRANSLATED, LOCALE_TAG, type Translated } from "@/content/i18n";
import { fontVars } from "../../fonts";
import "../../globals.css";

/**
 * THE TRANSLATED ROOT LAYOUT — /en and /sr.
 *
 * The second of two root layouts (the other is (el)/layout.tsx). It exists
 * for one reason: <html lang> must say what the page is actually written in.
 * It said "el" on both translated pages, which told Google the English page
 * was Greek and made every screen reader read English aloud with Greek
 * pronunciation rules.
 *
 * Because this root layout sits under the [lang] dynamic segment, it receives
 * the locale in params — which a top-level root layout never can.
 *
 * The furniture is rendered here with the locale passed down, so the header,
 * footer, nav panel and call bar are translated too. Previously they were
 * Greek on every route, which meant a Serbian visitor read a Serbian page
 * inside a Greek frame.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED.map((lang) => ({ lang }));
}

const isTranslated = (v: string): v is Translated =>
  (TRANSLATED as readonly string[]).includes(v);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function IntlRootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isTranslated(lang)) notFound();

  const t = T[lang];

  return (
    <html lang={LOCALE_TAG[lang]} className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/*
          The same business entity as the Greek pages — same @id, so Google
          reads all three as one business rather than three. Only the
          human-readable description is localised.
        */}
        <JsonLd data={localBusinessSchema({ description: t.metaDescription })} />
        <HeaderScrollState />
        <SiteHeader lang={lang} />
        {children}
        <SiteFooter lang={lang} />
        <StickyCallBar lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
