import { reviewsSection, business } from "@/content/site";
import { dict, type Locale } from "@/content/i18n";
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
export default function WhyUs({ lang = "el" }: { lang?: Locale }) {
  const t = dict(lang);
  const isGreek = lang === "el";
  return (
    <Band label={t.whySection.eyebrow} id="giati-emas">
      <h2 className="h2">{t.whySection.heading}</h2>

      {/* The full Κριτικές section moved to /etaireia. A one-line version
          stays here so the homepage does not lose the social proof. */}
      <p className="rating-line">
        <span className="rating-score num">
          {isGreek ? reviewsSection.rating : reviewsSection.ratingLatin}
        </span>
        <span>
          <span className="num">{reviewsSection.count}</span>{" "}
          {t.reviewsSection.reviewsNoun} {t.reviewsSection.onGoogle}.{" "}
          <a
            className="inline-link"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.reviewsSection.cta}
            <ArrowIcon />
          </a>
        </span>
      </p>

      <ul className="facts">
        {t.whySection.items.map((item) => (
          <li key={item.figure} className="fact">
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
