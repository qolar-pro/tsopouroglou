import { erga, SHOW_PLACEHOLDER_MEDIA } from "@/content/media";
import { HAS_REAL_PHOTOS } from "@/content/site";
import BeforeAfter from "./BeforeAfter";
import LevelLine from "./LevelLine";
import ArrowIcon from "./ArrowIcon";

/**
 * Έργα — a swipeable strip of projects, each with its own explanation.
 *
 * This is the "slideshow with text explaining each picture", built as a
 * scroll-snap rail rather than an autoplaying carousel: it swipes natively on
 * a phone, needs no JavaScript, never moves on its own, and never hides a
 * project behind a timer the reader did not ask for.
 *
 * Before/after is kept rather than replaced. The competitor research is
 * unambiguous — none of the four ranking sites has it, despite all four
 * selling visible physical change — so it is the one format that is both the
 * most persuasive available and uncontested. The description alongside it is
 * what the slideshow idea was really after.
 */
export default function ErgaStrip() {
  if (!HAS_REAL_PHOTOS && !SHOW_PLACEHOLDER_MEDIA) return null;

  return (
    <section className="section surface-field" id="erga">
      <LevelLine />
      <div className="wrap section-head">
        <p className="label">ΕΡΓΑ</p>
        <h2 className="h2">Πριν και μετά</h2>
        <p className="lede">
          <span className="measure">
            Η δουλειά μας φαίνεται καλύτερα σε δύο φωτογραφίες παρά σε δέκα
            προτάσεις. Σύρετε για να τις δείτε όλες.
          </span>
        </p>
      </div>

      <ul className="rail">
        {erga.map((pair) => (
          <li key={pair.id} className="rail-item">
            <article className="project">
              <BeforeAfter pair={pair} />
              <h3 className="project-title">{pair.title}</h3>
              <p className="project-desc">{pair.description}</p>
            </article>
          </li>
        ))}
      </ul>

      <div className="wrap">
        <p style={{ marginTop: "var(--s-6)" }}>
          <a className="btn-quiet" href="/erga">
            Όλα τα έργα
            <ArrowIcon />
          </a>
        </p>
      </div>
    </section>
  );
}
