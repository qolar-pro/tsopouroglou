import { dict, href, AREA_IDS, type Locale } from "@/content/i18n";
import Band from "./Band";

/**
 * The areas are rows, not cards. A place name and one sentence is a list, so
 * it looks like one — and a list can hold nine places at a glance where nine
 * boxes could not.
 *
 * Priority response in Μεταμόρφωση and Δασκάλων is his real edge over anyone
 * driving in from further out. He asked for it to be explicit, so home ground
 * keeps its flag as a third column on the row.
 *
 * Δασκάλων has no page of its own — honest copy would have duplicated
 * Μεταμόρφωση — but it is a place he works, so it keeps its name here and
 * points at the Μεταμόρφωση page. The five wider villages sit below as plain
 * rows: named, findable, and not pretending to be pages.
 */
export default function Areas({ lang = "el" }: { lang?: Locale }) {
  const t = dict(lang);

  const rows = [
    {
      name: t.areas.metamorfosi.name,
      card: t.areas.metamorfosi.card,
      href: href(lang, { page: "area", id: "metamorfosi" }),
      priority: true,
    },
    {
      name: t.daskalon.name,
      card: t.daskalon.card,
      href: href(lang, { page: "area", id: "metamorfosi" }),
      priority: true,
    },
    ...AREA_IDS.filter((id) => id !== "metamorfosi").map((id) => ({
      name: t.areas[id].name,
      card: t.areas[id].card,
      href: href(lang, { page: "area", id }),
      priority: false,
    })),
  ];

  return (
    <Band label={t.areasSection.eyebrow} id="perioxes" tone="tone">
      <h2 className="h2">{t.areasSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{t.areasSection.lede}</span>
      </p>

      <ul className="places">
        {rows.map((a) => (
          <li key={a.name}>
            <a className="place" href={a.href}>
              <span className="place-name">{a.name}</span>
              <span className="place-body">{a.card}</span>
              {a.priority ? (
                <span className="place-flag">{t.areasSection.priorityLabel}</span>
              ) : (
                <span aria-hidden="true" />
              )}
            </a>
          </li>
        ))}

        {/* Named, not linked — they have no pages by design. */}
        {t.widerAreas.map((a) => (
          <li key={a.name}>
            <span className="place">
              <span className="place-name">{a.name}</span>
              <span className="place-body">{a.note}</span>
              <span aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>
    </Band>
  );
}
