import type { Metadata } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { gated } from "@/content/pages";
import CallBand from "@/components/CallBand";
import LevelLine from "@/components/LevelLine";

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
          <ul className="check-list">
            {gated.exoplismos.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {!HAS_REAL_PHOTOS && (
            <p className="note measure-prose" style={{ marginTop: "var(--s-6)" }}>
              {gated.placeholderNotice}
            </p>
          )}
        </div>
      </section>

      <CallBand />
    </main>
  );
}
