import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areaPages, areaBySlug, areasPage } from "@/content/areas";
import { services } from "@/content/services";
import { business } from "@/content/site";
import { pageOpenGraph } from "@/content/site-config";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";
import ArrowIcon from "@/components/ArrowIcon";
import CallBand from "@/components/CallBand";

export function generateStaticParams() {
  return areaPages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/perioxes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/perioxes/${area.slug}` },
    // Reserve mechanism: an area whose copy cannot yet be made genuinely
    // distinct stays out of the index rather than shipping thin.
    ...(area.needsInput ? { robots: { index: false, follow: true } } : {}),
    openGraph: pageOpenGraph(area.metaTitle, area.metaDescription),
  };
}

export default async function AreaPage({
  params,
}: PageProps<"/perioxes/[slug]">) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const others = areaPages.filter((a) => a.slug !== area.slug && !a.needsInput);

  return (
    <main>
      <PageHero
        label={areasPage.eyebrow}
        title={<h1 className="h1">{area.h1}</h1>}
        lede={area.lede}
      >
        <nav className="breadcrumb" aria-label="Διαδρομή">
          <a href="/perioxes">{areasPage.backToAll}</a>
        </nav>
      </PageHero>

      {/* The spine: home ground argues from presence, outer areas from
          capability. Same component, genuinely different content. */}
      <Band label="ΕΠΙ ΤΟΠΟΥ">
        <div className="detail-cols">
          {area.blocks.map((b) => (
            <div key={b.heading}>
              <h2 className="h3">{b.heading}</h2>
              <p className="detail-body">{b.body}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Every area gets the full list — confirmed: no area-specific mix. */}
      <Band label="ΥΠΗΡΕΣΙΕΣ" tone="tone">
        <h2 className="h2">{areasPage.servicesHeading}</h2>
        <p className="lede">
          <span className="measure-prose">{areasPage.servicesBody}</span>
        </p>
        <ul className="places">
          {services.map((s) => (
            <li key={s.slug}>
              <a className="place" href={`/ypiresies/${s.slug}`}>
                <span className="place-name">{s.title}</span>
                <span className="place-body">{s.card}</span>
                <span className="place-flag" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <Band label="ΑΛΛΕΣ ΠΕΡΙΟΧΕΣ">
        <h2 className="h2">{areasPage.otherAreasHeading}</h2>
        <ul className="places">
          {others.map((a) => (
            <li key={a.slug}>
              <a className="place" href={`/perioxes/${a.slug}`}>
                <span className="place-name">{a.name}</span>
                <span className="place-body">{a.card}</span>
                <span className="place-flag" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <CallBand />
    </main>
  );
}
