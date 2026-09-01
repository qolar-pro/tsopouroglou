import { services, servicesSection } from "@/content/site";
import { servicePhoto } from "@/content/media";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";
import Photo from "./Photo";

/**
 * Two services lead with a photograph; the other six are a typographic list.
 *
 * Eight identical cards gave every job the same weight and forced a blank
 * spacer wherever a photograph was missing. Hierarchy is both better design
 * and more honest: εκσκαφές and καθαρισμός οικοπέδων are the two he is most
 * often called for, so they are the two that get the picture.
 */
const LEAD = services.slice(0, 2);
const REST = services.slice(2);

export default function Services() {
  return (
    <Band label={servicesSection.eyebrow} id="ypiresies">
      <h2 className="h2">{servicesSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{servicesSection.lede}</span>
      </p>

      <div className="svc-split">
        {LEAD.map((s) => (
          <a key={s.slug} className="svc-lead" href={`/ypiresies/${s.slug}`}>
            {servicePhoto[s.slug] && (
              <Photo
                img={servicePhoto[s.slug]}
                sizes="(min-width: 800px) 45vw, 92vw"
                frame="css"
              />
            )}
            <span className="svc-lead-title">{s.title}</span>
            <span className="svc-lead-body">{s.card}</span>
          </a>
        ))}

        <ul className="svc-rest">
          {REST.map((s) => (
            <li key={s.slug}>
              <a href={`/ypiresies/${s.slug}`}>
                <span className="svc-rest-name">{s.title}</span>
                <span className="svc-rest-body">{s.card}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: "var(--s-7)" }}>
        <a className="btn-quiet" href="/ypiresies">
          {servicesSection.cta}
          <ArrowIcon />
        </a>
      </p>
    </Band>
  );
}
