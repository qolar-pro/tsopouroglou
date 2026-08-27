import { business, hero } from "@/content/site";
import { heroPhoto } from "@/content/media";
import Photo from "./Photo";

/**
 * The homepage hero — the same dark panel every other route now opens with,
 * but with the year at full display size.
 *
 * Centred, and inside a frame. The previous version ran the headline flush
 * left across the full container while the sections beside it sat in a rail,
 * so the page had two different left edges. One frame, one centre line.
 *
 * 1987 stays the thesis: it is the first thing legible at any distance, and
 * the three credentials below it are each independently checkable — the
 * founding year, the licence year, and the machines he owns.
 */
export default function Hero() {
  return (
    <section className="band band--panel band--ink page-hero">
      <div className="wrap">
        <div className="panel">
          <div className="panel-title">
            <span className="band-label">{hero.eyebrow}</span>
            <span className="panel-index">ΑΠΟ ΤΟ 1987</span>
          </div>

          <div className="panel-body band-body">
            <h1 className="hero-h1">
              <span className="hero-h1-lead">{hero.headingLead}</span>
              <span className="hero-year">{hero.headingYear}</span>
            </h1>

            <p className="lede">
              {hero.lede.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </p>

            <div className="band-cta">
              <a className="btn btn-call" href={business.phone.href}>
                {hero.callLabel}{" "}
                <span className="num">{business.phone.display}</span>
              </a>
              <a className="btn btn-secondary" href="/epikoinonia">
                {hero.quoteLabel}
              </a>
            </div>

            <p className="hero-hours">{hero.hours}</p>

            <div className="hero-media">
              <Photo
                img={heroPhoto}
                sizes="(min-width: 1200px) 1100px, 100vw"
                priority
                frame="css"
              />
            </div>

            <ul className="creds">
              {hero.credentials.map((c) => (
                <li key={c.key}>
                  <span className="creds-key">{c.key}</span>
                  <span className="creds-value">{c.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
