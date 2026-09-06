import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  dict,
  href,
  alternates,
  AREA_IDS,
  AREA_SLUG,
  type AreaId,
} from "@/content/i18n";
import { abs, pageOpenGraph } from "@/content/site-config";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { AreaDetailPage } from "@/components/pages";

/**
 * Greek area pages. The body is shared with the three translations.
 *
 * Area slugs are identical in every language — a village does not get a
 * different name because the sentence around it changed language.
 */
export function generateStaticParams() {
  return AREA_IDS.map((id) => ({ slug: AREA_SLUG.el[id] }));
}

const idFor = (slug: string): AreaId | undefined =>
  AREA_IDS.find((id) => AREA_SLUG.el[id] === slug);

export async function generateMetadata({
  params,
}: PageProps<"/perioxes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const id = idFor(slug);
  if (!id) return {};
  const a = dict("el").areas[id];
  const route = { page: "area", id } as const;
  const alt = alternates(route);
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: {
      canonical: href("el", route),
      languages: {
        el: abs(alt.el),
        en: abs(alt.en),
        "sr-Latn": abs(alt.sr),
        mk: abs(alt.mk),
        "x-default": abs(alt.el),
      },
    },
    openGraph: pageOpenGraph(a.metaTitle, a.metaDescription),
  };
}

export default async function Page({ params }: PageProps<"/perioxes/[slug]">) {
  const { slug } = await params;
  const id = idFor(slug);
  if (!id) notFound();

  const t = dict("el");
  const route = { page: "area", id } as const;

  return (
    <>
      {/* Service pages carried a BreadcrumbList and area pages did not — the
          same trail, half-marked. Breadcrumbs surface in the SERP itself, so
          the area pages were giving that up for nothing. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: t.navLabels.home, path: href("el", { page: "home" }) },
          { name: t.navLabels.areas, path: href("el", { page: "areas" }) },
          { name: t.areas[id].name, path: href("el", route) },
        ])}
      />
      <AreaDetailPage lang="el" id={id} />
    </>
  );
}
