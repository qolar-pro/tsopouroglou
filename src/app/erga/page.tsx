import type { Metadata } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { gated } from "@/content/pages";
import CallBand from "@/components/CallBand";
import LevelLine from "@/components/LevelLine";
import BeforeAfter from "@/components/BeforeAfter";
import { erga, SHOW_PLACEHOLDER_MEDIA } from "@/content/media";

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
          {(HAS_REAL_PHOTOS || SHOW_PLACEHOLDER_MEDIA) && (
            <ul className="erga-grid">
              {erga.map((pair) => (
                <li key={pair.id}>
                  <BeforeAfter pair={pair} />
                </li>
              ))}
            </ul>
          )}
          {!HAS_REAL_PHOTOS && (
            <p className="note measure-prose" style={{ marginTop: "var(--s-7)" }}>
              {gated.placeholderNotice}
            </p>
          )}
        </div>
      </section>

      <CallBand />
    </main>
  );
}
