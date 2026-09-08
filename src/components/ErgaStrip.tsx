import Image from "next/image";
import { erga, ergaExcluding, servicePhoto } from "@/content/media";
import { dict, SERVICE_IDS, type Locale } from "@/content/i18n";
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
export default function ErgaStrip({ lang = "el" }: { lang?: Locale }) {
  const t = dict(lang);
  /**
   * The teaser must not repeat the two service photographs shown directly
   * above it, nor the hero at the top of the page. Seeing the same picture
   * twice on one screen reads as though we ran out of them.
   */
  const usedAbove = [
    ...SERVICE_IDS.slice(0, 2).map((id) => servicePhoto[id]).filter(Boolean),
    ...(erga.find((e) => e.id === "ergotaxio")
      ? [erga.find((e) => e.id === "ergotaxio")!.img]
      : []),
  ];
  const shots = ergaExcluding(usedAbove).slice(0, 6);

  return (
    <Band label={t.ergaSection.eyebrow} id="erga" tone="tone">
      <h2 className="h2">{t.ergaSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{t.ergaSection.lede}</span>
      </p>

      <div className="shots">
        {shots.map((project) => (
          <figure key={project.id} className="shot">
            {/* Intrinsic width/height rather than `fill`, because `.shot img`
                is width:100% / height:auto — every photograph keeps its own
                shape, which is the entire point of the columns layout. Next
                still emits a srcset and modern formats from these. */}
            <Image
              src={project.img.src}
              alt={project.img.alt}
              width={project.img.w}
              height={project.img.h}
              sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 92vw"
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
