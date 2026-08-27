import type { Metadata } from "next";
import { areaLinks, areasPage } from "@/content/areas";
import Band from "@/components/Band";
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
  return (
    <main>
      <Band label={areasPage.eyebrow} head>
        <h1 className="h1">{areasPage.h1}</h1>
        <p className="lede">
          <span className="measure-prose">{areasPage.lede}</span>
        </p>

        <ul className="places">
          {areaLinks.map((a) => (
            <li key={a.name}>
              <a className="place" href={a.href}>
                <span className="place-name">{a.name}</span>
                <span className="place-body">{a.card}</span>
                {a.priority ? (
                  <span className="place-flag">{areasPage.priorityLabel}</span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <CallBand />
    </main>
  );
}
