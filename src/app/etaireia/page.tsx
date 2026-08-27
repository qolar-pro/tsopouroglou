import type { Metadata } from "next";
import { etaireia } from "@/content/pages";
import LevelLine from "@/components/LevelLine";
import CallBand from "@/components/CallBand";
import Reviews from "@/components/Reviews";
import Photo from "@/components/Photo";
import { etaireiaPhoto } from "@/content/media";

export const metadata: Metadata = {
  title: etaireia.metaTitle,
  description: etaireia.metaDescription,
  alternates: { canonical: "/etaireia" },
};

export default function Etaireia() {
  return (
    <main>
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">{etaireia.eyebrow}</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {etaireia.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{etaireia.lede}</span>
          </p>
        </div>
      </section>

      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap about-cols">
          <div className="about-photo">
            <Photo img={etaireiaPhoto} sizes="(min-width: 860px) 38vw, 100vw" />
          </div>
          <div>
          {etaireia.blocks.map((b) => (
            <div key={b.heading} className="prose-block">
              <h2 className="h3">{b.heading}</h2>
              <p className="detail-body measure-prose">{b.body}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Κριτικές merged in from the homepage: what people say about them
          belongs with who they are, and it shortens the nav. */}
      <Reviews />

      <CallBand />
    </main>
  );
}
