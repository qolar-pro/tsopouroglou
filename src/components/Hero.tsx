import { business, hero } from "@/content/site";
import { heroPhoto, SHOW_PLACEHOLDER_MEDIA } from "@/content/media";
import { HAS_REAL_PHOTOS } from "@/content/site";
import Photo from "./Photo";

/**
 * Split hero: the argument on the left, a photograph on the right.
 *
 * Research pattern — nearly every construction site that reads as serious
 * opens on a photograph, and the ones that read as cheap open on text alone.
 * But a full-bleed photo hero is hostage to having a good photo, and we have
 * none yet. Split solves both: the image is a column, not the ground, so if
 * it is absent the text column simply takes the full width and the hero still
 * works. Launch is never blocked on photography.
 *
 * 1987 stays inline in the sentence at display scale — the thesis, not a
 * stat block. The three credentials beneath it are each checkable, and each
 * is something no competitor site states.
 */
export default function Hero() {
  const showPhoto = HAS_REAL_PHOTOS || SHOW_PLACEHOLDER_MEDIA;

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="label">{hero.eyebrow}</p>

          <h1 className="hero-h1">
            <span className="hero-h1-lead">{hero.headingLead}</span>
            <span className="hero-year">{hero.headingYear}</span>
          </h1>

          <p className="hero-lede">
            <span className="measure">
              {hero.lede.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </span>
          </p>

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

        {showPhoto && (
          <div className="hero-media">
            <Photo
              img={heroPhoto}
              sizes="(min-width: 1000px) 44vw, 100vw"
              priority
            />
          </div>
        )}
      </div>

      {/* Three checkable facts, on the level line that closes the hero. */}
      <div className="hero-creds">
        <ul className="wrap creds">
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
