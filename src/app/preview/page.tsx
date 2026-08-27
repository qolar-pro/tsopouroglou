import type { Metadata } from "next";
import Image from "next/image";
import { business, hero, services, servicesSection } from "@/content/site";
import { areaLinks } from "@/content/areas";
import { heroPhoto, servicePhoto } from "@/content/media";
import "./preview.css";

/**
 * THROWAWAY comparison page. Delete this directory once a direction is
 * chosen — nothing on the real site imports any of it.
 *
 * Three candidate replacements for the editorial rail, each rendering the
 * SAME hero, the same Υπηρεσίες section and the same Περιοχές list, so the
 * only variable is composition.
 */
export const metadata: Metadata = {
  title: "Preview — τρεις επιλογές",
  robots: { index: false, follow: false },
};

const FOUR = services.slice(0, 4);

function Items() {
  return (
    <ul className="pv-items">
      {FOUR.map((s) => {
        const img = servicePhoto[s.slug];
        return (
          <li key={s.slug}>
            {img ? (
              <span className="pv-photo">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 900px) 22vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </span>
            ) : (
              <span className="pv-photo" aria-hidden="true" />
            )}
            <span className="pv-item-title">{s.title}</span>
            <span className="pv-item-body">{s.card}</span>
          </li>
        );
      })}
    </ul>
  );
}

function HeroShot() {
  return (
    <span className="pv-heroshot">
      <Image
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </span>
  );
}

function Cta() {
  return (
    <div className="pv-cta">
      <a className="btn btn-call" href={business.phone.href}>
        {hero.callLabel} <span className="num">{business.phone.display}</span>
      </a>
      <a className="btn btn-secondary" href="/epikoinonia">
        {hero.quoteLabel}
      </a>
    </div>
  );
}

function Marker({ tag, title, note }: { tag: string; title: string; note: string }) {
  return (
    <div className="pv-marker">
      <div className="wrap">
        <h2>
          {tag} — {title}
        </h2>
        <p>{note}</p>
      </div>
    </div>
  );
}

export default function Preview() {
  return (
    <main>
      {/* ================= A — CENTRED ================= */}
      <Marker
        tag="A"
        title="Κεντραρισμένο"
        note="No rail. One centred measure; the section label becomes a centred eyebrow. Symmetric by construction — nothing can drift right. Body copy inside the grid stays left-aligned, because centred paragraphs stop being readable past two lines."
      />
      <div className="va">
        <section className="pv-hero">
          <div className="wrap">
            <p className="pv-label">{hero.eyebrow}</p>
            <h1>
              <span className="pv-hero-lead">{hero.headingLead}</span>
              <span className="pv-hero-year">{hero.headingYear}</span>
            </h1>
            <Cta />
            <HeroShot />
          </div>
        </section>

        <section className="pv-band">
          <div className="wrap">
            <p className="pv-label">{servicesSection.eyebrow}</p>
            <h2 className="pv-h2">{servicesSection.heading}</h2>
            <p className="pv-lede">{servicesSection.lede}</p>
            <Items />
          </div>
        </section>
      </div>

      {/* ================= B — FRAMED PANEL ================= */}
      <Marker
        tag="B"
        title="Πλαίσιο"
        note="Each section is a bordered sheet with a title block across its top — label left, sheet number right. The left/right relationship becomes part of a frame rather than a margin, which is what makes it read as designed. The metaphor comes from the trade: a site plan has a title block."
      />
      <div className="vb">
        <section className="pv-hero">
          <div className="wrap">
            <div className="pv-panel">
              <div className="pv-titleblock">
                <span className="pv-label">{hero.eyebrow}</span>
                <span className="pv-index">01</span>
              </div>
              <div className="pv-inner">
                <h1>
                  <span className="pv-hero-lead">{hero.headingLead}</span>
                  <span className="pv-hero-year">{hero.headingYear}</span>
                </h1>
                <Cta />
                <HeroShot />
              </div>
            </div>
          </div>
        </section>

        <section className="pv-band">
          <div className="wrap">
            <div className="pv-panel">
              <div className="pv-titleblock">
                <span className="pv-label">{servicesSection.eyebrow}</span>
                <span className="pv-index">02</span>
              </div>
              <div className="pv-inner">
                <h2 className="pv-h2">{servicesSection.heading}</h2>
                <p className="pv-lede">{servicesSection.lede}</p>
                <Items />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= C — SPLIT PANEL ================= */}
      <Marker
        tag="C"
        title="Διπλή στήλη"
        note="A panel with a genuine two-column interior and a hairline down the middle. Symmetric because the split is centred in the container rather than offset from it — equal margins either side, equal weight both halves. Closest to what is there now, but balanced."
      />
      <div className="vc">
        <section className="pv-hero">
          <div className="wrap">
            <h1>
              <span className="pv-hero-lead">{hero.headingLead}</span>
              <span className="pv-hero-year">{hero.headingYear}</span>
            </h1>
            <Cta />
            <HeroShot />
          </div>
        </section>

        <section className="pv-band">
          <div className="wrap">
            <div className="pv-panel">
              <div className="pv-split">
                <div>
                  <p className="pv-label">{servicesSection.eyebrow}</p>
                  <h2 className="pv-h2">{servicesSection.heading}</h2>
                  <p className="pv-lede">{servicesSection.lede}</p>
                  <p className="pv-lede" style={{ fontSize: "var(--t-small)" }}>
                    {areaLinks.map((a) => a.name).join(" · ")}
                  </p>
                </div>
                <div>
                  <Items />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
