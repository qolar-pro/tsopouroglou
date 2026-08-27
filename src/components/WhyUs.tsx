import { whySection, reviewsSection, business } from "@/content/site";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";

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
    <Band label={whySection.eyebrow} id="giati-emas">
      <h2 className="h2">{whySection.heading}</h2>

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

      <ul className="facts">
        {whySection.items.map((item) => (
          <li key={item.key} className="fact">
            <span className="fact-figure" aria-hidden="true">
              {item.figure}
            </span>
            <h3 className="fact-title">{item.title}</h3>
            <p className="fact-body">{item.body}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}
