import { business, reviewsSection, reviews } from "@/content/site";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";

function Stars() {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Κριτικές — the real reviews, as their authors wrote them.
 *
 * Not paraphrased any more: the client supplied the actual text and asked for
 * it on the page. Nothing here is written by us, and no dates are shown —
 * the source only gives relative times, which are wrong within a month.
 *
 * Set as newspaper columns rather than boxes: fourteen bordered cards read as
 * a wall to be skipped, fourteen short quotes with a rule above each read as
 * something to browse. Still the competitor gap the research found — none of
 * the four ranking sites shows its Google reviews at all.
 */
export default function Reviews() {
  return (
    <Band label={reviewsSection.eyebrow} id="kritikes">
      <div className="rating">
        <Stars />
        <span className="rating-score num">{reviewsSection.rating}</span>
        <span className="rating-count">στο Google</span>
      </div>
      <h2 className="h2" style={{ marginTop: "var(--s-3)" }}>
        {reviewsSection.heading}
      </h2>
      <p className="lede">
        <span className="measure-prose">{reviewsSection.lede}</span>
      </p>

      <ul className="reviews">
        {reviews.map((r) => (
          <li key={r.author}>
            <figure className="review">
              <blockquote>
                <p>{r.text}</p>
              </blockquote>
              <figcaption>{r.author}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "var(--s-4)" }}>
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
    </Band>
  );
}
