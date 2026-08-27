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
}: {
  img: Img;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className="photo" style={{ aspectRatio: RATIO[img.aspect] }}>
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
