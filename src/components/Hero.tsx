import { business, hero } from "@/content/site";
import { erga } from "@/content/media";

/**
 * The homepage hero — a full-bleed photograph with the argument over it.
 *
 * It was a framed dark panel with the photo below, which meant a full screen
 * of type before any proof that he owns a machine. For a trade business the
 * photograph IS the argument, so it goes first and everything sits on it.
 *
 * The photo is the one genuinely wide frame in the whole set. Every other
 * photograph is 4:3 or 3:4 from a phone and loses its subject at this crop —
 * which is exactly why the gallery below stopped cropping them at all.
 *
 * 1987 stays at full display scale. It is the single most valuable fact on
 * the page, and the scrim is weighted to the bottom specifically so it can
 * hold there against sunlit soil.
 */
export default function Hero() {
  const shot = erga.find((e) => e.id === "ergotaxio") ?? erga[0];

  return (
    <section className="bleed">
      <div className="bleed-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.img.src} alt={shot.img.alt} fetchPriority="high" />
      </div>
      <div className="bleed-scrim" aria-hidden="true" />

      <div className="bleed-inner">
        <div className="wrap">
          <p className="label">{hero.eyebrow}</p>

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
    </section>
  );
}
