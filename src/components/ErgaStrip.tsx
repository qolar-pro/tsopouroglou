import { ergaFeatured } from "@/content/media";
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
  return (
    <Band label="ΕΡΓΑ" id="erga" tone="tone">
      <h2 className="h2">Δουλειές μας</h2>
      <p className="lede">
        <span className="measure-prose">
          Φωτογραφίες από δικά μας εργοτάξια — όχι από το ίντερνετ.
        </span>
      </p>

      <div className="shots">
        {ergaFeatured.map((project) => (
          <figure key={project.id} className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.img.src}
              alt={project.img.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{project.title}</figcaption>
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
