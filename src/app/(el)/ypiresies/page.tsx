import type { Metadata } from "next";
import { dict, href, alternates } from "@/content/i18n";
import { abs, pageOpenGraph } from "@/content/site-config";
import { ServicesIndexPage } from "@/components/pages";

/**
 * Greek route. The body is shared with the three translations — one
 * implementation, four languages. See components/pages.tsx.
 */
export const metadata: Metadata = (() => {
  const t = dict("el");
  const title = t.servicesPage.metaTitle;
  const description = t.servicesPage.metaDescription;
  const alt = alternates({ page: "services" });
  return {
    title,
    description,
    alternates: {
      canonical: href("el", { page: "services" }),
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
      <ServicesIndexPage lang="el" />
    </>
  );
}
