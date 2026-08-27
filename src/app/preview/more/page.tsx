import type { Metadata } from "next";
import Image from "next/image";
import { business, hero, services, servicesSection } from "@/content/site";
import { heroPhoto, servicePhoto } from "@/content/media";
import "./more.css";

/**
 * THROWAWAY, round two. Delete src/app/preview once a direction is chosen.
 *
 * D, E and F, each rendering the same hero and the same Υπηρεσίες section as
 * round one, so all five can be compared on identical content.
 */
export const metadata: Metadata = {
  title: "Preview 2 — D, E, F",
  robots: { index: false, follow: false },
};

const FOUR = services.slice(0, 4);

function Items() {
  return (
    <ul className="pv2-items">
      {FOUR.map((s) => {
        const img = servicePhoto[s.slug];
        return (
          <li key={s.slug}>
            {img ? (
              <span className="pv2-photo">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 900px) 22vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </span>
            ) : (
              <span className="pv2-spacer" aria-hidden="true" />
            )}
            <span className="pv2-item-title">{s.title}</span>
            <span className="pv2-item-body">{s.card}</span>
          </li>
        );
      })}
    </ul>
  );
}

function HeroShot() {
  return (
    <span className="pv2-heroshot">
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

function HeroType() {
  return (
    <h1>
      <span className="pv2-hero-lead">{hero.headingLead}</span>
      <span className="pv2-hero-year">{hero.headingYear}</span>
    </h1>
  );
}

function Cta() {
  return (
    <div className="pv2-cta">
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
    <div className="pv2-marker">
      <div className="wrap">
        <h2>
          {tag} — {title}
        </h2>
        <p>{note}</p>
      </div>
    </div>
  );
}

export default function PreviewMore() {
  return (
    <main>
      {/* ================= D ================= */}
      <Marker
        tag="D"
        title="Πλαίσιο + κέντρο"
        note="B's frame with A's symmetry inside it. The label and the sheet number stay at the edges of the title block, where they read as part of the frame; the heading and lede are centred in the panel, where they read as content. Nothing can drift right, and the section still has an edge."
      />
      <div className="vd pv2-centre">
        <section className="pv2-band pv2-hero">
          <div className="wrap">
            <div className="pv2-panel">
              <div className="pv2-titleblock">
                <span className="pv2-label">{hero.eyebrow}</span>
                <span className="pv2-index">01</span>
              </div>
              <div className="pv2-inner">
                <div className="pv2-head">
                  <HeroType />
                  <Cta />
                </div>
                <HeroShot />
              </div>
            </div>
          </div>
        </section>

        <section className="pv2-band">
          <div className="wrap">
            <div className="pv2-panel">
              <div className="pv2-titleblock">
                <span className="pv2-label">{servicesSection.eyebrow}</span>
                <span className="pv2-index">02</span>
              </div>
              <div className="pv2-inner">
                <div className="pv2-head">
                  <h2 className="pv2-h2">{servicesSection.heading}</h2>
                  <p className="pv2-lede">{servicesSection.lede}</p>
                </div>
                <Items />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= E ================= */}
      <Marker
        tag="E"
        title="Γραμμή κεφαλαίου"
        note="Fully symmetric like A, but the label is inset INTO a full-width hairline instead of floating above the heading. The divider stops being a border and becomes the design — which is the thing A was missing — and it costs no asymmetry at all. The quietest of the five."
      />
      <div className="ve pv2-centre">
        <section className="pv2-hero">
          <div className="wrap">
            <HeroType />
            <Cta />
            <HeroShot />
          </div>
        </section>

        <section className="pv2-band">
          <div className="wrap">
            <p className="pv2-rule">
              <span className="pv2-label">{servicesSection.eyebrow}</span>
            </p>
            <h2 className="pv2-h2">{servicesSection.heading}</h2>
            <p className="pv2-lede">{servicesSection.lede}</p>
            <Items />
          </div>
        </section>
      </div>

      {/* ================= F ================= */}
      <Marker
        tag="F"
        title="Σχέδιο"
        note="B taken all the way — corner ticks, a double frame, and a title block with real cells instead of one strip. Closest to the language the trade already reads: a stamped drawing. The most distinctive of the five, and the one with the most to get wrong, so judge it at full size."
      />
      <div className="vf pv2-centre">
        <section className="pv2-band pv2-hero">
          <div className="wrap">
            <div className="pv2-sheet">
              <div className="pv2-frame">
                <div className="pv2-titleblock">
                  <span className="pv2-cell pv2-cell-num">01</span>
                  <span className="pv2-cell">{hero.eyebrow}</span>
                  <span className="pv2-cell">ΑΠΟ ΤΟ 1987</span>
                </div>
                <div className="pv2-inner">
                  <div className="pv2-head">
                    <HeroType />
                    <Cta />
                  </div>
                  <HeroShot />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pv2-band">
          <div className="wrap">
            <div className="pv2-sheet">
              <div className="pv2-frame">
                <div className="pv2-titleblock">
                  <span className="pv2-cell pv2-cell-num">02</span>
                  <span className="pv2-cell">{servicesSection.eyebrow}</span>
                  <span className="pv2-cell">ΟΚΤΩ ΥΠΗΡΕΣΙΕΣ</span>
                </div>
                <div className="pv2-inner">
                  <div className="pv2-head">
                    <h2 className="pv2-h2">{servicesSection.heading}</h2>
                    <p className="pv2-lede">{servicesSection.lede}</p>
                  </div>
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
