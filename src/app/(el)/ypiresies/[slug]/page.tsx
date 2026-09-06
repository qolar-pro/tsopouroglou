import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  dict,
  href,
  alternates,
  SERVICE_IDS,
  SERVICE_SLUG,
  type ServiceId,
} from "@/content/i18n";
import { abs, pageOpenGraph } from "@/content/site-config";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { ServiceDetailPage } from "@/components/pages";

/**
 * Greek service pages. The body is shared with the three translations — one
 * implementation, four languages. See components/pages.tsx.
 *
 * The Greek slug IS the id, so this lookup is really a membership test — but
 * it still goes through SERVICE_SLUG so that if a Greek slug is ever changed
 * it resolves by the same rule as every other language.
 */
export function generateStaticParams() {
  return SERVICE_IDS.map((id) => ({ slug: SERVICE_SLUG.el[id] }));
}

const idFor = (slug: string): ServiceId | undefined =>
  SERVICE_IDS.find((id) => SERVICE_SLUG.el[id] === slug);

export async function generateMetadata({
  params,
}: PageProps<"/ypiresies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const id = idFor(slug);
  if (!id) return {};
  const s = dict("el").services[id];
  const route = { page: "service", id } as const;
  const alt = alternates(route);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
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
    openGraph: pageOpenGraph(s.metaTitle, s.metaDescription),
  };
}

export default async function Page({ params }: PageProps<"/ypiresies/[slug]">) {
  const { slug } = await params;
  const id = idFor(slug);
  if (!id) notFound();

  const t = dict("el");
  const route = { page: "service", id } as const;

  return (
    <>
      <JsonLd
        data={serviceSchema({
          id,
          name: t.services[id].title,
          description: t.services[id].metaDescription,
          url: href("el", route),
          language: "el",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: t.navLabels.home, path: href("el", { page: "home" }) },
          { name: t.navLabels.services, path: href("el", { page: "services" }) },
          { name: t.services[id].title, path: href("el", route) },
        ])}
      />
      <ServiceDetailPage lang="el" id={id} />
    </>
  );
}
