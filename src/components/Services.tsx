import { services, servicesSection } from "@/content/site";
import { servicePhoto, SHOW_PLACEHOLDER_MEDIA } from "@/content/media";
import { HAS_REAL_PHOTOS } from "@/content/site";
import LevelLine from "./LevelLine";
import ArrowIcon from "./ArrowIcon";
import Photo from "./Photo";

/**
 * Service cards: photograph on top, text beneath.
 *
 * One competitor runs twelve service cards that all share the SAME stock
 * photograph — which reads worse than no photographs at all. Each card here
 * gets its own image of that work, for the same reason each service page got
 * its own copy.
 */
export default function Services() {
  const showPhoto = HAS_REAL_PHOTOS || SHOW_PLACEHOLDER_MEDIA;

  return (
    <section className="section surface-raised" id="ypiresies">
      <LevelLine />

      <div className="wrap section-head">
        <p className="label">{servicesSection.eyebrow}</p>
        <h2 className="h2">{servicesSection.heading}</h2>
        <p className="lede">
          <span className="measure">{servicesSection.lede}</span>
        </p>
      </div>

      <div className="wrap">
        <ul className="grid grid-4">
          {services.map((s) => (
            <li key={s.slug}>
              <a className="card card-media" href={`/ypiresies/${s.slug}`}>
                {showPhoto && servicePhoto[s.slug] && (
                  <Photo
                    img={servicePhoto[s.slug]}
                    sizes="(min-width: 960px) 25vw, (min-width: 560px) 50vw, 100vw"
                  />
                )}
                <span className="card-body-wrap">
                  <h3 className="card-title">{s.title}</h3>
                  <p className="card-body">{s.card}</p>
                  <span className="card-more" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </span>
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
      </div>
    </section>
  );
}
