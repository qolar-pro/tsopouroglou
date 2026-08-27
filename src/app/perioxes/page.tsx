import type { Metadata } from "next";
import { areaLinks, areasPage } from "@/content/areas";
import ArrowIcon from "@/components/ArrowIcon";
import LevelLine from "@/components/LevelLine";
import CallBand from "@/components/CallBand";

export const metadata: Metadata = {
  title: areasPage.metaTitle,
  description: areasPage.metaDescription,
  alternates: { canonical: "/perioxes" },
};

/**
 * Reads `areaLinks`, the same list the homepage and footer use.
 *
 * It previously read `publishedAreas` — the routing list — which excludes
 * Δασκάλων because Δασκάλων has no page of its own. The result was a place
 * he actually serves being missing from the page whose entire job is to list
 * the places he serves. Every list of areas anywhere on the site now comes
 * from one source.
 */
export default function AreasIndex() {
  const home = areaLinks.filter((a) => a.priority);
  const rest = areaLinks.filter((a) => !a.priority);

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
              <li key={a.name}>
                <a className="card" href={a.href}>
                  <span className="area-flag">{areasPage.priorityLabel}</span>
                  <h2 className="area-name">{a.name}</h2>
                  <p className="area-body">{a.card}</p>
                </a>
              </li>
            ))}
          </ul>

          <ul className="grid grid-3" style={{ marginTop: "var(--s-3)" }}>
            {rest.map((a) => (
              <li key={a.name}>
                <a className="card" href={a.href}>
                  <h2 className="area-name area-name-sm">{a.name}</h2>
                  <p className="area-body">{a.card}</p>
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
