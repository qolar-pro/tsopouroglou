import { business, hero } from "@/content/site";

/**
 * «Η τομή» survives the palette change, but Στάθμη draws the cut rather than
 * digging it. The strata are three pale bands — field, raised, stone — with
 * an ink level line across the top carrying a short accent segment at its
 * left, the way a laser level marks a grade across a plot.
 *
 * Same idea as before, inverted in value: the year lands on stone in ink at
 * 14.32:1 instead of on bedrock in white.
 */
function LevelProfile() {
  return (
    <svg
      className="hero-profile"
      viewBox="0 0 1200 30"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* A compact profile strip, not a full band. Spread over 88px the
          earlier waves read as a smear; kept tight under the line they read
          as strata. Deepest first so shallower bands overpaint. */}
      <path
        fill="var(--color-stone)"
        d="M0,0 H1200 V21 C1020,24 880,18 730,22 C580,26 430,19 290,23 C190,25 90,20 0,24 Z"
      />
      <path
        fill="var(--color-raised)"
        d="M0,0 H1200 V12 C1060,15 900,9 760,13 C620,17 470,10 320,14 C200,16 100,11 0,15 Z"
      />
      {/* The level line itself — dead straight, because a level is. */}
      <rect x="0" y="0" width="1200" height="2.5" fill="var(--color-line)" />
      <rect x="0" y="0" width="150" height="2.5" fill="var(--color-accent)" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="wrap label">{hero.eyebrow}</p>

        {/*
          One h1, one spoken sentence. "1987" is a clause inside it, set at
          display scale — not a statistic in a box. Both spans are phrasing
          content, so the heading stays valid and a screen reader reads it
          straight through.
        */}
        <h1 className="hero-h1">
          <span className="wrap hero-h1-lead">{hero.headingLead}</span>
          <span className="hero-strata">
            <LevelProfile />
            <span className="wrap hero-year">{hero.headingYear}</span>
          </span>
        </h1>
      </div>

      <div className="hero-bottom">
        {/* Credibility, placed against the founding claim: 1987 founded,
            1990 licensed. Same continuity, subordinated in scale. */}
        <p className="wrap label hero-licence">{hero.licence}</p>

        <p className="wrap hero-lede">
          <span className="measure">
            {hero.lede.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </span>
        </p>

        <div className="wrap hero-cta">
          <a className="btn btn-call btn-block" href={business.phone.href}>
            {hero.callLabel}{" "}
            <span className="num">{business.phone.display}</span>
          </a>
          <a className="btn btn-secondary btn-block" href="/epikoinonia">
            {hero.quoteLabel}
          </a>
        </div>

        {/* Urgency, under the phone because it is the reason to call now. */}
        <p className="wrap hero-hours">{hero.hours}</p>
      </div>
    </section>
  );
}
