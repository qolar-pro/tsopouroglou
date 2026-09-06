import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import { areaLinks, areasPage, widerAreas, coverageSection } from "@/content/areas";
import Band from "@/components/Band";
import { erga } from "@/content/media";
import PageHero from "@/components/PageHero";
import CallBand from "@/components/CallBand";

export const metadata: Metadata = {
  title: areasPage.metaTitle,
  description: areasPage.metaDescription,
  alternates: pageAlternates("/perioxes"),
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
      <PageHero
        label={areasPage.eyebrow}
        title={<h1 className="h1">{areasPage.h1}</h1>}
        lede={areasPage.lede}
        photo={erga.find((e) => e.id === "ekskafi-oikopedou")?.img}
        priority
      />

      <Band label="ΟΙ ΠΕΡΙΟΧΕΣ">
        <h2 className="h2">Πού ερχόμαστε</h2>

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

      {/*
        The wider coverage, named but not linked.

        These five villages have no page of their own on purpose — operations
        are identical everywhere, so a page each would be five near-duplicates
        of the four real area pages, and near-duplicates get filtered. Named
        here and in areaServed they are findable in search without that risk.

        The municipality framing is the point of the opening paragraph: a
        plot owner who does not know which village his land counts as still
        knows "Σιθωνία" or "Χαλκιδική".
      */}
      <Band label={coverageSection.eyebrow} tone="tone">
        <h2 className="h2">{coverageSection.heading}</h2>
        <p className="lede">
          <span className="measure-prose">{coverageSection.body}</span>
        </p>

        <h3 className="footer-heading" style={{ marginTop: "var(--s-6)" }}>
          {coverageSection.listHeading}
        </h3>
        <ul className="items items-4">
          {widerAreas.map((a) => (
            <li key={a.name}>
              <span className="item">
                <span className="item-title">{a.name}</span>
                <span className="item-body">{a.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "var(--s-6)" }}>
          <span className="measure-prose">{coverageSection.closing}</span>
        </p>
      </Band>

      <CallBand />
    </main>
  );
}
