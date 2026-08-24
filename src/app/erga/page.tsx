import type { Metadata } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { gated } from "@/content/pages";
import CallBand from "@/components/CallBand";
import LevelLine from "@/components/LevelLine";

const page = gated.erga;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/erga" },
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
          {HAS_REAL_PHOTOS ? (
            <p className="detail-body">{/* Gallery lands with the photos. */}</p>
          ) : (
            <p className="note measure-prose">{gated.placeholderNotice}</p>
          )}
        </div>
      </section>

      <CallBand />
    </main>
  );
}
