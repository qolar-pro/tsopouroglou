import { services, servicesSection } from "@/content/site";
import LevelLine from "./LevelLine";
import ArrowIcon from "./ArrowIcon";

export default function Services() {
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
              {/* Whole card is the link — a text-sized target is a poor one
                  for the audience this is built for. */}
              <a className="card" href={`/ypiresies/${s.slug}`}>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-body">{s.card}</p>
                <span className="card-more" aria-hidden="true">
                  <ArrowIcon />
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
