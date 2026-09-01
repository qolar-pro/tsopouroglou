import { erga, ergaExcluding, servicePhoto } from "@/content/media";
import { services } from "@/content/site";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";

/**
 * Έργα — the strongest few, in the same masonry treatment as the full
 * gallery.
 *
 * This was a horizontal scroll rail. The rail worked, but it cropped every
 * photograph to a single shape to make the row line up, and most of his
 * photographs are vertical — so a deep trench or a lifted root arrived
 * looking like a landscape snapshot of nothing in particular.
 *
 * Columns let each photograph keep the shape it was taken in. Nothing moves
 * on its own and there is no JavaScript.
 */
export default function ErgaStrip() {
  /**
   * The teaser must not repeat the two service photographs shown directly
   * above it, nor the hero at the top of the page. Seeing the same picture
   * twice on one screen reads as though we ran out of them.
   */
  const usedAbove = [
    ...services.slice(0, 2).map((s) => servicePhoto[s.slug]).filter(Boolean),
    ...(erga.find((e) => e.id === "ergotaxio")
      ? [erga.find((e) => e.id === "ergotaxio")!.img]
      : []),
  ];
  const shots = ergaExcluding(usedAbove).slice(0, 6);

  return (
    <Band label="ΕΡΓΑ" id="erga" tone="tone">
      <h2 className="h2">Τι έχουμε παραδώσει</h2>
      <p className="lede">
        <span className="measure-prose">
          Ολοκληρωμένα έργα σε οικόπεδα, αυλές και ακτές της Χαλκιδικής. Όλες
          οι φωτογραφίες είναι δικές μας.
        </span>
      </p>

      <div className="shots">
        {shots.map((project) => (
          <figure key={project.id} className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.img.src}
              alt={project.img.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
                <span>{project.title}</span>
              </figcaption>
          </figure>
        ))}
      </div>

      <p style={{ marginTop: "var(--s-5)" }}>
        <a className="btn-quiet" href="/ypiresies#erga">
          Όλα τα έργα
          <ArrowIcon />
        </a>
      </p>
    </Band>
  );
}
