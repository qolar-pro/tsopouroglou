import { whySection, reviewsSection, business } from "@/content/site";
import ArrowIcon from "./ArrowIcon";
import LevelLine from "./LevelLine";

/**
 * Four facts, each of which happens to be a number — so each is set as one.
 *
 * These are not invented counters ("500+ έργα"), which the brief bans and
 * which every competitor uses. 1987, 1990, 24 and 3 are all checkable: the
 * founding year, the licence year, the hours on his Google profile, and the
 * machines he owns. That is what makes setting them large honest.
 */
export default function WhyUs() {
  return (
    <section className="section surface-raised" id="giati-emas">
      <LevelLine />

      <div className="wrap section-head">
        <h2 className="h2">{whySection.heading}</h2>
      </div>

      <div className="wrap">
        {/* The full Κριτικές section moved to /etaireia. A one-line version
            stays here so the homepage does not lose the social proof. */}
        <p className="rating-line">
          <span className="rating-score num">{reviewsSection.rating}</span>
          <span>
            στο Google.{" "}
            <a
              className="inline-link"
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Δείτε τις κριτικές
              <ArrowIcon />
            </a>
          </span>
        </p>

        <ul className="why-grid">
          {whySection.items.map((item) => (
            <li key={item.key} className="why-card">
              <span className="why-figure" aria-hidden="true">
                {item.figure}
              </span>
              <div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
