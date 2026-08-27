import Image from "next/image";
import type { Img } from "@/content/media";

/**
 * Every content image renders through here, so framing stays consistent.
 *
 * Consistent frames plus a factual caption are what make ordinary phone
 * photographs read as a work record rather than as bad photography — which
 * matters more here than anywhere, because phone photos are all this trade
 * ever produces. No filters and no colour grading: grading someone's job site
 * to look moody is its own kind of dishonesty.
 *
 * 4:5 is the default because these come in both orientations and it crops
 * neither one badly.
 */
const RATIO: Record<Img["aspect"], string> = {
  "4:3": "4 / 3",
  "3:4": "3 / 4",
  "4:5": "4 / 5",
  wide: "16 / 9",
};

export default function Photo({
  img,
  sizes = "(min-width: 960px) 33vw, 100vw",
  priority = false,
  frame = "img",
}: {
  img: Img;
  sizes?: string;
  priority?: boolean;
  /**
   * "img" pins the frame to the file's own aspect, inline.
   *
   * "css" omits the inline style so a stylesheet can set the ratio instead —
   * needed wherever the frame is responsive (the hero photo is 4:3 on a
   * phone and 21:9 on a desktop). An inline style would win over the media
   * query and silently ignore it, which is exactly the kind of override that
   * looks like a broken layout rather than a bug.
   */
  frame?: "img" | "css";
}) {
  return (
    <figure
      className="photo"
      style={frame === "img" ? { aspectRatio: RATIO[img.aspect] } : undefined}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </figure>
  );
}
