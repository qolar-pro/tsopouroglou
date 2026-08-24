import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceBySlug, servicesPage } from "@/content/services";
import { business } from "@/content/site";
import LevelLine from "@/components/LevelLine";
import ArrowIcon from "@/components/ArrowIcon";
import CallBand from "@/components/CallBand";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ypiresies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/ypiresies/${service.slug}` },
    openGraph: {
      type: "article",
      locale: "el_GR",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/ypiresies/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => serviceBySlug(r))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <main>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Αρχική", path: "/" },
          { name: "Υπηρεσίες", path: "/ypiresies" },
          { name: service.title, path: `/ypiresies/${service.slug}` },
        ])}
      />
      {/* ---- Head ---- */}
      <section className="section surface-field page-head">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Διαδρομή">
            <a href="/ypiresies">{servicesPage.backToAll}</a>
          </nav>

          <p className="label" style={{ marginTop: "var(--s-5)" }}>
            {servicesPage.eyebrow}
          </p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {service.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{service.lede}</span>
          </p>

          <div className="band-cta">
            <a className="btn btn-call" href={business.phone.href}>
              ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---- What it involves + which machine ---- */}
      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap detail-cols">
          <div>
            <h2 className="h3">{service.includesHeading}</h2>
            <ul className="check-list">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="h3">{service.machinesHeading}</h2>
            <p className="detail-body">{service.machines}</p>
            {service.note && <p className="note">{service.note}</p>}
          </div>
        </div>
      </section>

      {/* ---- What to have ready, and where ---- */}
      <section className="section surface-field">
        <LevelLine />
        <div className="wrap detail-cols">
          <div>
            <h2 className="h3">{service.askHeading}</h2>
            <ol className="ask-list">
              {service.ask.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="h3">{servicesPage.areasHeading}</h2>
            <p className="detail-body">{servicesPage.areasBody}</p>
          </div>
        </div>
      </section>

      {/* ---- Related ---- */}
      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap">
          <h2 className="h2">{servicesPage.relatedHeading}</h2>
          <ul className="grid grid-3" style={{ marginTop: "var(--s-6)" }}>
            {related.map((r) => (
              <li key={r.slug}>
                <a className="card" href={`/ypiresies/${r.slug}`}>
                  <h3 className="card-title">{r.title}</h3>
                  <p className="card-body">{r.card}</p>
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
