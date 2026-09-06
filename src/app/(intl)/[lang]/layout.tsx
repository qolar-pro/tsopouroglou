import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderScrollState from "@/components/HeaderScrollState";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyCallBar from "@/components/StickyCallBar";
import { SITE_URL } from "@/content/site-config";
import { Analytics } from "@vercel/analytics/next";
import { TRANSLATED, LOCALE_TAG, isTranslated } from "@/content/i18n";
import { fontVars } from "../../fonts";
import "../../globals.css";

/**
 * THE TRANSLATED ROOT LAYOUT — /en, /sr and /mk, and everything under them.
 *
 * The second of two root layouts (the other is (el)/layout.tsx). It exists
 * for one reason: <html lang> must say what the page is actually written in.
 * It said "el" on every translated page, which told Google the English pages
 * were Greek and made screen readers read English and Serbian aloud with
 * Greek pronunciation rules.
 *
 * Because this root layout sits under the [lang] dynamic segment, it receives
 * the locale in params — which a top-level root layout never can.
 *
 * The furniture is rendered here with the locale passed down, so the header,
 * footer, nav panel and call bar are translated too.
 *
 * NO LocalBusiness JSON-LD here. It is emitted by the page, so that the
 * translated description matches the page's own language and so the home
 * page does not carry two copies of the same node.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function IntlRootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isTranslated(lang)) notFound();

  return (
    <html lang={LOCALE_TAG[lang]} className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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
