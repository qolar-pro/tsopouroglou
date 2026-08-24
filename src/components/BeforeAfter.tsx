import Photo from "./Photo";
import type { BeforeAfter as Pair } from "@/content/media";

/**
 * Before/after, the primary gallery format — no competitor has it despite
 * selling visible physical change.
 *
 * Side by side sharing one hard seam; stacked on a phone. ΠΡΙΝ / ΜΕΤΑ sit in
 * the same corner every time. No slider: a drag interaction on village 4G for
 * a 60-year-old is worse than simply showing both.
 *
 * The caption is what makes ordinary phone photos read as a work record
 * rather than as bad photography.
 */
export default function BeforeAfter({ pair }: { pair: Pair }) {
  return (
    <figure className="ba">
      <div className="ba-pair">
        <div className="ba-side">
          <span className="ba-label">ΠΡΙΝ</span>
          <Photo img={pair.before} sizes="(min-width: 760px) 33vw, 50vw" />
        </div>
        <div className="ba-side">
          <span className="ba-label">ΜΕΤΑ</span>
          <Photo img={pair.after} sizes="(min-width: 760px) 33vw, 50vw" />
        </div>
      </div>
      <figcaption className="ba-caption">
        {pair.place} · {pair.work} · {pair.year}
      </figcaption>
    </figure>
  );
}
