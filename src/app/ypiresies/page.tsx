import type { Metadata } from "next";
import { services, servicesPage } from "@/content/services";
import ArrowIcon from "@/components/ArrowIcon";
import LevelLine from "@/components/LevelLine";
import CallBand from "@/components/CallBand";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  alternates: { canonical: "/ypiresies" },
};

export default function ServicesIndex() {
  return (
    <main>
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">{servicesPage.eyebrow}</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {servicesPage.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{servicesPage.lede}</span>
          </p>
        </div>
      </section>

      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap">
          <ul className="grid grid-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a className="card" href={`/ypiresies/${s.slug}`}>
                  <h2 className="card-title">{s.title}</h2>
                  <p className="card-body">{s.card}</p>
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
