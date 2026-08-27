import { business, hero } from "@/content/site";
import { heroPhoto } from "@/content/media";
import Photo from "./Photo";

/**
 * The headline runs the full measure and the photograph is a wide band
 * beneath it.
 *
 * It used to be a split — argument left, photo right — which made the photo a
 * sidebar and capped the year at column width. 1987 is the thesis of the
 * whole page, so it gets the page's full width; the photograph then gets to
 * be a photograph rather than a decorative column. The two are stacked, so a
 * missing photo still leaves a working hero and launch is never blocked on
 * photography.
 *
 * The three credentials beneath are each checkable, and each is something no
 * competitor site states at all.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <p className="label">{hero.eyebrow}</p>

        <h1 className="hero-h1">
          <span className="hero-h1-lead">{hero.headingLead}</span>
          <span className="hero-year">{hero.headingYear}</span>
        </h1>

        <div className="hero-meta">
          <p className="hero-lede">
            {hero.lede.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </p>

          <div>
            <div className="hero-cta">
              <a className="btn btn-call" href={business.phone.href}>
                {hero.callLabel}{" "}
                <span className="num">{business.phone.display}</span>
              </a>
              <a className="btn btn-secondary" href="/epikoinonia">
                {hero.quoteLabel}
              </a>
            </div>
            <p className="hero-hours">{hero.hours}</p>
          </div>
        </div>

        <div className="hero-media">
          <Photo
            img={heroPhoto}
            sizes="100vw"
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
    </section>
  );
}
