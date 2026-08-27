import type { Metadata } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { gated } from "@/content/pages";
import CallBand from "@/components/CallBand";
import LevelLine from "@/components/LevelLine";
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
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">{page.eyebrow}</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {page.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{page.lede}</span>
          </p>
        </div>
      </section>

      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap">
          {/* The machine list is text, so it is honest without photos.
              Only the photographs are gated. */}
          <ul className="fleet">
            {stolos.map((m) => (
              <li key={m.name}>
                <Photo img={m.img} sizes="(min-width: 960px) 33vw, 50vw" />
                <p className="fleet-name">{m.name}</p>
                <p className="fleet-note">{m.note}</p>
              </li>
            ))}
          </ul>

          {/* The full confirmed list stays as text. The photographs label
              only the machines identifiable without guessing. */}
          <h2 className="h3" style={{ marginTop: "var(--s-8)" }}>
            Ολα τα μηχανηματα
          </h2>
          <ul className="check-list">
            {gated.exoplismos.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CallBand />
    </main>
  );
}
