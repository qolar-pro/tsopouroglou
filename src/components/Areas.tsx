import { areaLinks } from "@/content/areas";
import { areasSection } from "@/content/site";
import Band from "./Band";

/**
 * The areas are rows, not cards. A place name and one sentence is a list, so
 * it looks like one — and a list can hold five places at a glance where five
 * boxes could not.
 *
 * Priority response in Μεταμόρφωση and Δασκάλων is his real edge over anyone
 * driving in from Polychrono or Nea Moudania. He asked for it to be explicit,
 * so home ground keeps its flag; it is now a third column on the row rather
 * than a differently-shaped card.
 */
export default function Areas() {
  return (
    <Band label={areasSection.eyebrow} id="perioxes" tone="tone">
      <h2 className="h2">{areasSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{areasSection.lede}</span>
      </p>

      <ul className="places">
        {areaLinks.map((a) => (
          <li key={a.name}>
            <a className="place" href={a.href}>
              <span className="place-name">{a.name}</span>
              <span className="place-body">{a.card}</span>
              {a.priority ? (
                <span className="place-flag">{areasSection.priorityLabel}</span>
              ) : (
                <span aria-hidden="true" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </Band>
  );
}
