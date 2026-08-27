import type { Metadata } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { gated } from "@/content/pages";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";
import CallBand from "@/components/CallBand";
import Photo from "@/components/Photo";
import { stolos } from "@/content/media";

const page = gated.exoplismos;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/exoplismos" },
  // Gated on real photography. Publishing stock excavators as his work would
  // be a lie to his customers — CLAUDE.md §6b.
  ...(HAS_REAL_PHOTOS ? {} : { robots: { index: false, follow: false } }),
};

export default function Page() {
  return (
    <main>
      <PageHero
        label={page.eyebrow}
        title={<h1 className="h1">{page.h1}</h1>}
        lede={page.lede}
        photo={stolos[0].img}
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
