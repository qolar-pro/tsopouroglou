import { business, reviewsSection } from "@/content/site";
import LevelLine from "./LevelLine";
import ArrowIcon from "./ArrowIcon";

function Stars() {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Κριτικές.
 *
 * No quote cards and no names, deliberately. The brief allows paraphrasing
 * the themes and forbids reproducing any review verbatim or inventing a
 * testimonial — and we do not have the review text, so Greek sentences in
 * quote marks attributed to customers would be fabrication.
 *
 * The honest version is stronger anyway: saying "we don't copy them here,
 * read them where we can't edit them" makes the constraint the trust signal.
 * It also fills the gap the research found — none of the four ranking
 * competitor sites shows its Google reviews at all.
 */
export default function Reviews() {
  return (
    <section className="section surface-field" id="kritikes">
      <LevelLine />

      <div className="wrap section-head">
        <p className="label">{reviewsSection.eyebrow}</p>

        <div className="rating">
          <Stars />
          <span className="rating-score num">{reviewsSection.rating}</span>
          <span className="rating-count">
            {reviewsSection.count} κριτικές στο Google
          </span>
        </div>

        <h2 className="h2" style={{ marginTop: "var(--s-4)" }}>
          {reviewsSection.heading}
        </h2>
        <p className="lede">
          <span className="measure">{reviewsSection.lede}</span>
        </p>
      </div>

      <div className="wrap">
        <ul className="themes">
          {reviewsSection.themes.map((t) => (
            <li key={t.key} className="theme">
              <h3 className="theme-title">{t.title}</h3>
              <p className="theme-body">{t.body}</p>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "var(--s-7)" }}>
          <a
            className="btn-quiet"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {reviewsSection.cta}
            <ArrowIcon />
          </a>
        </p>
      </div>
    </section>
  );
}
