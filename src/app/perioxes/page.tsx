import type { Metadata } from "next";
import { publishedAreas, areasPage, areaLinks } from "@/content/areas";
import ArrowIcon from "@/components/ArrowIcon";
import LevelLine from "@/components/LevelLine";
import CallBand from "@/components/CallBand";

export const metadata: Metadata = {
  title: areasPage.metaTitle,
  description: areasPage.metaDescription,
  alternates: { canonical: "/perioxes" },
};

export default function AreasIndex() {
  const home = publishedAreas.filter((a) => a.homeGround);
  const rest = publishedAreas.filter((a) => !a.homeGround);

  return (
    <main>
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">{areasPage.eyebrow}</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {areasPage.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{areasPage.lede}</span>
          </p>
        </div>
      </section>

      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap">
          <ul className="grid grid-2">
            {home.map((a) => (
              <li key={a.slug}>
                <a className="card" href={`/perioxes/${a.slug}`}>
                  <span className="area-flag">ΒΑΣΗ ΜΑΣ</span>
                  <h2 className="area-name">{a.name}</h2>
                  <p className="area-body">{a.lede}</p>
                </a>
              </li>
            ))}
          </ul>

          <ul className="grid grid-3" style={{ marginTop: "var(--s-3)" }}>
            {rest.map((a) => (
              <li key={a.slug}>
                <a className="card" href={`/perioxes/${a.slug}`}>
                  <h2 className="area-name area-name-sm">{a.name}</h2>
                  <span className="card-more" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Δασκάλων has no page of its own; its name still appears. */}
          <p className="small" style={{ marginTop: "var(--s-6)" }}>
            {areaLinks
              .filter((l) => l.priority)
              .map((l) => l.name)
              .join(" και ")}{" "}
            μοιράζονται την ίδια σελίδα — είναι και τα δύο η βάση μας.
          </p>
        </div>
      </section>

      <CallBand />
    </main>
  );
}
