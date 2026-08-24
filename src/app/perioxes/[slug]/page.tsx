import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areaPages, areaBySlug, areasPage } from "@/content/areas";
import { services } from "@/content/services";
import { business } from "@/content/site";
import LevelLine from "@/components/LevelLine";
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
    openGraph: {
      type: "article",
      locale: "el_GR",
      title: area.metaTitle,
      description: area.metaDescription,
    },
  };
}

export default async function AreaPage({
  params,
}: PageProps<"/perioxes/[slug]">) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const others = areaPages.filter(
    (a) => a.slug !== area.slug && !a.needsInput
  );

  return (
    <main>
      <section className="section surface-field page-head">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Διαδρομή">
            <a href="/perioxes">{areasPage.backToAll}</a>
          </nav>

          <p className="label" style={{ marginTop: "var(--s-5)" }}>
            {areasPage.eyebrow}
          </p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {area.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{area.lede}</span>
          </p>

          <div className="band-cta">
            <a className="btn btn-call" href={business.phone.href}>
              ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
            </a>
          </div>
        </div>
      </section>

      {/* The spine: home ground argues from presence, outer areas from
          capability. Same component, genuinely different content. */}
      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap detail-cols">
          {area.blocks.map((b) => (
            <div key={b.heading}>
              <h2 className="h3">{b.heading}</h2>
              <p className="detail-body">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Every area gets the full list — confirmed: no area-specific mix. */}
      <section className="section surface-field">
        <LevelLine />
        <div className="wrap">
          <h2 className="h2">{areasPage.servicesHeading}</h2>
          <p className="lede" style={{ marginTop: "var(--s-4)" }}>
            <span className="measure">{areasPage.servicesBody}</span>
          </p>
          <ul className="grid grid-4" style={{ marginTop: "var(--s-6)" }}>
            {services.map((s) => (
              <li key={s.slug}>
                <a className="card" href={`/ypiresies/${s.slug}`}>
                  <h3 className="card-title">{s.title}</h3>
                  <span className="card-more" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap">
          <h2 className="h2">{areasPage.otherAreasHeading}</h2>
          <ul className="grid grid-3" style={{ marginTop: "var(--s-6)" }}>
            {others.map((a) => (
              <li key={a.slug}>
                <a className="card" href={`/perioxes/${a.slug}`}>
                  <h3 className="card-title">{a.name}</h3>
                  <span className="card-more" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallBand />
    </main>
  );
}
