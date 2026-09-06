import type { Metadata } from "next";
import { dict, href, alternates } from "@/content/i18n";
import { abs } from "@/content/site-config";
import { HomePage } from "@/components/pages";

/**
 * The Greek home page.
 *
 * The body is shared with /en, /sr and /mk — see components/pages.tsx. This
 * file supplies only what is route-specific: the canonical and the hreflang
 * map. Title and description are inherited from the layout.
 */
export const metadata: Metadata = (() => {
  const alt = alternates({ page: "home" });
  return {
    alternates: {
      canonical: href("el", { page: "home" }),
      languages: {
        el: abs(alt.el),
        en: abs(alt.en),
        "sr-Latn": abs(alt.sr),
        mk: abs(alt.mk),
        "x-default": abs(alt.el),
      },
    },
  };
})();

export default function Home() {
  return <HomePage lang="el" />;
}
