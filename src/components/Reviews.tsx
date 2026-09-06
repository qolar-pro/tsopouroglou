import { business, reviewsSection, reviews } from "@/content/site";
import { CHROME, type Locale } from "@/content/i18n";
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
 * Each is a card with its own frame: an avatar disc of the author's initials,
 * their name, five stars, and the quote — so it is obvious at a glance that
 * these are separate people saying separate things, and how many of them
 * there are.
 *
 * THE COUNT IS THE POINT. The rating line now reads "5,0 · 21 κριτικές στο
 * Google", because a bare 5.0 says nothing about how many people it took to
 * get there — and the count is the number that moved (10 → 21). Fourteen are
 * quoted; the other seven are counted but not quoted, because we do not have
 * their text. See reviewsSection.count.
 *
 * Nothing here is written by us and no dates are shown: the source gives only
 * relative times ("πριν από 3 εβδομάδες"), which are wrong within a month.
 *
 * Still the competitor gap the research found — none of the four ranking
 * sites shows its Google reviews at all.
 *
 * NOTE: the schema carries NO aggregateRating (gate 1 ruling — Google
 * prohibits self-serving review markup for LocalBusiness). Displaying the
 * rating as ordinary text is a different thing and is fine. Do not "fix" the
 * inconsistency by adding it to the JSON-LD.
 */
export default function Reviews({ lang = "el" }: { lang?: Locale }) {
  const c = CHROME[lang];
  const isGreek = lang === "el";

  return (
    <Band
      label={c.reviewsEyebrow}
      id={isGreek ? "kritikes" : "reviews"}
      tone="tone"
    >
      <div className="rating">
        <Stars size={20} />
        <span className="rating-score num">
          {isGreek ? reviewsSection.rating : reviewsSection.ratingLatin}
        </span>
        <span className="rating-count">
          <span className="num">{reviewsSection.count}</span> {c.reviewsNoun}{" "}
          {c.reviewsOnGoogle}
        </span>
      </div>
      <h2 className="h2" style={{ marginTop: "var(--s-3)" }}>
        {c.reviewsHeading}
      </h2>
      <p className="lede">
        <span className="measure-prose">{c.reviewsLede}</span>
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
              {/*
                The quotes stay in the language they were written in on every
                locale. Translating a customer's review would make it no
                longer their words — and `lang` on the blockquote is what
                stops a screen reader on /en reading Greek with English
                pronunciation rules.
              */}
              <blockquote lang={/[\u0370-\u03FF]/.test(r.text) ? "el" : "en"}>
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
          {c.reviewsCta}
          <ArrowIcon />
        </a>
      </p>
    </Band>
  );
}
