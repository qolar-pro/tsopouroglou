import { business, reviewsSection, reviews } from "@/content/site";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** Initials for the avatar disc. Two words at most, Greek or Latin. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Κριτικές — the real Google reviews, as their authors wrote them.
 *
 * These were bare paragraphs with a name underneath, which read as text
 * dropped on the page rather than as testimony. Each is now a card with its
 * own frame: an avatar disc of the author's initials, their name, five stars,
 * and the quote — so it is obvious at a glance that these are separate people
 * saying separate things, and how many of them there are.
 *
 * Nothing here is written by us and no dates are shown: the source gives only
 * relative times ("πριν από 3 εβδομάδες"), which are wrong within a month.
 *
 * Still the competitor gap the research found — none of the four ranking
 * sites shows its Google reviews at all.
 */
export default function Reviews() {
  return (
    <Band label={reviewsSection.eyebrow} id="kritikes" tone="tone">
      <div className="rating">
        <Stars size={20} />
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
              <div className="review-head">
                <span className="review-avatar" aria-hidden="true">
                  {initials(r.author)}
                </span>
                <div>
                  <figcaption className="review-author">{r.author}</figcaption>
                  <Stars />
                </div>
              </div>
              <blockquote>
                <p>{r.text}</p>
              </blockquote>
            </figure>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "var(--s-6)" }}>
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
