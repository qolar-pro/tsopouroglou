import { whySection } from "@/content/site";
import LevelLine from "./LevelLine";

/**
 * Four flat statements, not a badge row and not a counter strip. Each one is
 * a fact the reader could go and check — which is what the heading claims.
 * 1987 and the 1990 licence come from the client, the 24-hour availability
 * from his verified Google profile, the three excavators from his own list.
 */
export default function WhyUs() {
  return (
    <section className="section surface-raised" id="giati-emas">
      <LevelLine />

      <div className="wrap section-head">
        <p className="label">{whySection.eyebrow}</p>
        <h2 className="h2">{whySection.heading}</h2>
      </div>

      <div className="wrap">
        <ul className="why-list">
          {whySection.items.map((item) => (
            <li key={item.key} className="why-item">
              <h3 className="why-title">{item.title}</h3>
              <p className="why-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
