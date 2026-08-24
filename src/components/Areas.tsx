import { areaLinks } from "@/content/areas";
import { areasSection } from "@/content/site";
import LevelLine from "./LevelLine";

/**
 * Priority response in Μεταμόρφωση and Δασκάλων is his real edge over anyone
 * driving in from Polychrono or Nea Moudania. He asked for it to be explicit,
 * so home ground gets a different card treatment and a flag — not merely a
 * place at the top of the list.
 */
export default function Areas() {
  const priority = areaLinks.filter((a) => a.priority);
  const rest = areaLinks.filter((a) => !a.priority);

  return (
    <section className="section surface-field" id="perioxes">
      <LevelLine />

      <div className="wrap section-head">
        <p className="label">{areasSection.eyebrow}</p>
        <h2 className="h2">{areasSection.heading}</h2>
        <p className="lede">
          <span className="measure">{areasSection.lede}</span>
        </p>
      </div>

      <div className="wrap">
        <ul className="grid grid-2">
          {priority.map((a) => (
            <li key={a.name}>
              <a className="card" href={a.href}>
                <span className="area-flag">{areasSection.priorityLabel}</span>
                <h3 className="area-name">{a.name}</h3>
                <p className="area-body">{a.card}</p>
              </a>
            </li>
          ))}
        </ul>

        <ul className="grid grid-3" style={{ marginTop: "var(--s-3)" }}>
          {rest.map((a) => (
            <li key={a.name}>
              <a className="card" href={a.href}>
                <h3 className="area-name area-name-sm">{a.name}</h3>
                <p className="area-body">{a.card}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
