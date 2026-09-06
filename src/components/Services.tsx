import { servicePhoto } from "@/content/media";
import { dict, href, SERVICE_IDS, type Locale } from "@/content/i18n";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";
import Photo from "./Photo";

/**
 * Two services lead with a photograph; the other seven are a typographic list.
 *
 * Nine identical cards gave every job the same weight and forced a blank
 * spacer wherever a photograph was missing. Hierarchy is both better design
 * and more honest: εκσκαφές and καθαρισμός οικοπέδων are the two he is most
 * often called for, so they are the two that get the picture.
 *
 * The photograph is keyed by the SERVICE ID, not by the localised slug — the
 * same picture of the same machine belongs to the same job in four languages.
 */
const LEAD = SERVICE_IDS.slice(0, 2);
const REST = SERVICE_IDS.slice(2);

export default function Services({ lang = "el" }: { lang?: Locale }) {
  const t = dict(lang);

  return (
    <Band label={t.servicesSection.eyebrow} id="ypiresies">
      <h2 className="h2">{t.servicesSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{t.servicesSection.lede}</span>
      </p>

      <div className="svc-split">
        {LEAD.map((id) => (
          <a
            key={id}
            className="svc-lead"
            href={href(lang, { page: "service", id })}
          >
            {servicePhoto[id] && (
              <Photo
                img={servicePhoto[id]}
                sizes="(min-width: 800px) 45vw, 92vw"
                frame="css"
              />
            )}
            <span className="svc-lead-title">{t.services[id].title}</span>
            <span className="svc-lead-body">{t.services[id].card}</span>
          </a>
        ))}

        <ul className="svc-rest">
          {REST.map((id) => (
            <li key={id}>
              <a href={href(lang, { page: "service", id })}>
                <span className="svc-rest-name">{t.services[id].title}</span>
                <span className="svc-rest-body">{t.services[id].card}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: "var(--s-7)" }}>
        <a className="btn-quiet" href={href(lang, { page: "services" })}>
          {t.servicesSection.cta}
          <ArrowIcon />
        </a>
      </p>
    </Band>
  );
}
