import Image from "next/image";
import type { Img } from "@/content/media";

/**
 * Every content image on the site renders through here, so a placeholder can
 * never appear un-marked. The ribbon is applied by the component rather than
 * baked into the file — a real photo dropped into a placeholder slot by
 * mistake would still be flagged until `placeholder` is set false.
 *
 * Frames are fixed 4:3 or 3:4 with object-cover. The layout must fit what a
 * phone actually produces; designing for cinematic crops would break the day
 * real photos arrive.
 */
export default function Photo({
  img,
  sizes = "(min-width: 960px) 33vw, 100vw",
  priority = false,
}: {
  img: Img;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`photo photo-${img.aspect === "3:4" ? "portrait" : "landscape"}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
      {img.placeholder && (
        <span className="photo-ribbon" aria-hidden="true">
          ΔΕΙΓΜΑ — ΟΧΙ ΠΡΑΓΜΑΤΙΚΗ ΦΩΤΟΓΡΑΦΙΑ
        </span>
      )}
    </figure>
  );
}
