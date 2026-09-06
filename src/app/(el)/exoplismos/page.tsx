import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { gated } from "@/content/pages";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";
import CallBand from "@/components/CallBand";
import Photo from "@/components/Photo";
import { stolos, erga } from "@/content/media";

const page = gated.exoplismos;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: pageAlternates("/exoplismos"),
  // Gated on real photography. Publishing stock excavators as his work would
  // be a lie to his customers — CLAUDE.md §6b.
  ...(HAS_REAL_PHOTOS ? {} : { robots: { index: false, follow: false } }),
};

export default function Page() {
  /**
   * The hero used stolos[0], which is also the first machine in the list
   * below — the same photograph twice on one page. A frame from a job site
   * instead: it shows the machines in use rather than repeating the portrait
   * of one of them.
   */
  const heroShot = erga.find((e) => e.id === "ergotaxio")?.img ?? stolos[0].img;

  return (
    <main>
      <PageHero
        label={page.eyebrow}
        title={<h1 className="h1">{page.h1}</h1>}
        lede={page.lede}
        photo={heroShot}
        priority
      />

      <Band label="ΜΗΧΑΝΗΜΑΤΑ">
        <h2 className="h2">Με τι δουλεύουμε</h2>

        {/* The machine list is text, so it is honest without photos.
            Only the photographs are gated. */}
        <ul className="fleet">
          {stolos.map((m) => (
            <li key={m.name}>
              <Photo
                img={m.img}
                sizes="(min-width: 1000px) 30vw, (min-width: 560px) 45vw, 92vw"
                frame="css"
              />
              <p className="fleet-name">{m.name}</p>
              <p className="fleet-note">{m.note}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* The full confirmed list stays as text. The photographs label
          only the machines identifiable without guessing. */}
      <Band label="ΚΑΤΑΛΟΓΟΣ" tone="tone">
        <h2 className="h2">Όλα τα μηχανήματα</h2>
        <ul className="check-list">
          {gated.exoplismos.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Band>

      <CallBand />
    </main>
  );
}
