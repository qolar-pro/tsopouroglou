import { ergaFeatured, SHOW_PLACEHOLDER_MEDIA } from "@/content/media";
import { HAS_REAL_PHOTOS } from "@/content/site";
import BeforeAfter from "./BeforeAfter";
import LevelLine from "./LevelLine";
import ArrowIcon from "./ArrowIcon";

/**
 * Homepage Έργα strip — section 3 of the brief's running order.
 *
 * Absent entirely unless there is something honest to show. It renders for a
 * layout preview, and for real photos; never with nothing.
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
            προτάσεις.
          </span>
        </p>
      </div>
      <div className="wrap">
        <ul className="erga-grid">
          {ergaFeatured.map((pair) => (
            <li key={pair.id}>
              <BeforeAfter pair={pair} />
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "var(--s-7)" }}>
          <a className="btn-quiet" href="/erga">
            Όλα τα έργα
            <ArrowIcon />
          </a>
        </p>
      </div>
    </section>
  );
}
