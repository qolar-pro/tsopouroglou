import type { Metadata } from "next";
import { dict, href, alternates } from "@/content/i18n";
import { abs, pageOpenGraph } from "@/content/site-config";
import { FaqPage } from "@/components/pages";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";

/**
 * Greek route. The body is shared with the three translations — one
 * implementation, four languages. See components/pages.tsx.
 */
export const metadata: Metadata = (() => {
  const t = dict("el");
  const title = t.faqPage.metaTitle;
  const description = t.faqPage.metaDescription;
  const alt = alternates({ page: "faq" });
  return {
    title,
    description,
    alternates: {
      canonical: href("el", { page: "faq" }),
      languages: {
        el: abs(alt.el),
        en: abs(alt.en),
        "sr-Latn": abs(alt.sr),
        mk: abs(alt.mk),
        "x-default": abs(alt.el),
      },
    },
    openGraph: pageOpenGraph(title, description),
  };
})();

export default function Page() {
  return (
    <>
      <JsonLd
        data={faqSchema({
          url: href("el", { page: "faq" }),
          language: "el",
          faqs: dict("el").faqs,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict("el").navLabels.home, path: href("el", { page: "home" }) },
          { name: dict("el").faqPage.h1, path: href("el", { page: "faq" }) },
        ])}
      />
      <FaqPage lang="el" />
    </>
  );
}
