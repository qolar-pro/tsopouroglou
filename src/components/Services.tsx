import { services, servicesSection } from "@/content/site";
import { servicePhoto } from "@/content/media";
import Band from "./Band";
import ArrowIcon from "./ArrowIcon";
import Photo from "./Photo";

/**
 * The services are a list, not a deck of cards: photograph, a rule, the name,
 * a line. Losing the card border and the tinted fill lets the photographs
 * carry the section, which is the point — one competitor runs twelve service
 * cards that all share the SAME stock photograph, which reads worse than no
 * photographs at all.
 */
export default function Services() {
  return (
    <Band label={servicesSection.eyebrow} id="ypiresies">
      <h2 className="h2">{servicesSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{servicesSection.lede}</span>
      </p>

      <ul className="items items-4">
        {services.map((s) => (
          <li key={s.slug}>
            <a className="item" href={`/ypiresies/${s.slug}`}>
              {servicePhoto[s.slug] && (
                <Photo
                  img={servicePhoto[s.slug]}
                  sizes="(min-width: 900px) 22vw, (min-width: 560px) 45vw, 92vw"
                  frame="css"
                />
              )}
              {!servicePhoto[s.slug] && (
                <span className="item-spacer" aria-hidden="true" />
              )}
              <span className="item-title">{s.title}</span>
              <span className="item-body">{s.card}</span>
            </a>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "var(--s-7)" }}>
        <a className="btn-quiet" href="/ypiresies">
          {servicesSection.cta}
          <ArrowIcon />
        </a>
      </p>
    </Band>
  );
}
