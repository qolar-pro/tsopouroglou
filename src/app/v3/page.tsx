import type { Metadata } from "next";
import Image from "next/image";
import {
  business,
  hero,
  services,
  servicesSection,
  areasSection,
  whySection,
} from "@/content/site";
import { areaLinks } from "@/content/areas";
import { erga, servicePhoto } from "@/content/media";
import "./v3.css";

/**
 * v3 — the winning half of each version, combined. THROWAWAY, for comparison.
 *
 * The reasoning per section is in v3.css. In short: v2 won the hero, the
 * service hierarchy and the gallery; v1 won the palette, the scale of 1987,
 * the chapter rule, the area rows and the closing panel.
 *
 * noindex and disallowed in robots. Delete src/app/v3 to scrap it.
 */
export const metadata: Metadata = {
  title: "v3 — συνδυασμός",
  robots: { index: false, follow: false },
};

const LEAD = services.slice(0, 2);
const REST = services.slice(2);

export default function V3() {
  // The one genuinely wide photograph on the site — the only one that can
  // take a full-bleed crop without losing its subject.
  const heroShot = erga.find((e) => e.id === "ergotaxio") ?? erga[0];

  return (
    <main className="v3">
      <p className="v3-flag">
        Συνδυασμός των δύο σχεδιάσεων — δοκιμαστική σελίδα.{" "}
        <a href="/">Τρέχουσα</a> · <a href="/v2">v2</a>
      </p>

      {/* ---------- HERO: v2's full bleed, v1's year ---------- */}
      <section className="v3-hero">
        <div className="v3-hero-img">
          <Image
            src={heroShot.img.src}
            alt={heroShot.img.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="v3-hero-scrim" />

        <div className="v3-hero-inner">
          <div className="v3-wrap">
            <p className="v3-eyebrow">{hero.eyebrow}</p>

            <h1>
              <span className="v3-hero-lead">{hero.headingLead}</span>
              <span className="v3-hero-year">{hero.headingYear}</span>
            </h1>

            <p className="v3-hero-lede">{hero.lede.join(" ")}</p>

            <div className="v3-cta">
              <a className="v3-btn v3-btn-call" href={business.phone.href}>
                {hero.callLabel} {business.phone.display}
              </a>
              <a className="v3-btn v3-btn-ghost" href="/epikoinonia">
                Πείτε μας τι χρειάζεστε
              </a>
            </div>

            <ul className="v3-trust">
              {hero.credentials.map((c) => (
                <li key={c.key}>
                  <b>{c.key}</b>
                  {c.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES: v2's hierarchy ---------- */}
      <section className="v3-section">
        <div className="v3-wrap">
          <p className="v3-rule">
            <span>{servicesSection.eyebrow}</span>
          </p>
          <div className="v3-head">
            <h2 className="v3-h2">{servicesSection.heading}</h2>
            <p className="v3-lede">{servicesSection.lede}</p>
          </div>

          <div className="v3-services">
            {LEAD.map((s) => {
              const img = servicePhoto[s.slug];
              return (
                <a
                  key={s.slug}
                  className="v3-svc-lead"
                  href={`/ypiresies/${s.slug}`}
                >
                  {img && (
                    <figure>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={900}
                        height={675}
                        sizes="(min-width: 800px) 45vw, 92vw"
                      />
                    </figure>
                  )}
                  <h3>{s.title}</h3>
                  <p>{s.card}</p>
                </a>
              );
            })}

            <ul className="v3-svc-list">
              {REST.map((s) => (
                <li key={s.slug}>
                  <a href={`/ypiresies/${s.slug}`}>
                    <span className="v3-svc-name">{s.title}</span>
                    <span className="v3-svc-body">{s.card}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY: v2's masonry ---------- */}
      <section className="v3-section v3-section--raised">
        <div className="v3-wrap">
          <p className="v3-rule">
            <span>ΕΡΓΑ</span>
          </p>
          <div className="v3-head">
            <h2 className="v3-h2">Δουλειές μας</h2>
            <p className="v3-lede">
              Φωτογραφίες από δικά μας εργοτάξια στη Χαλκιδική. Καμία δεν είναι
              από το ίντερνετ.
            </p>
          </div>

          <div className="v3-gallery">
            {erga.map((p) => (
              <figure key={p.id} className="v3-shot">
                <Image
                  src={p.img.src}
                  alt={p.img.alt}
                  width={900}
                  height={1200}
                  sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 92vw"
                  style={{ height: "auto" }}
                />
                <figcaption>{p.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AREAS: v1's rows ---------- */}
      <section className="v3-section">
        <div className="v3-wrap">
          <p className="v3-rule">
            <span>{areasSection.eyebrow}</span>
          </p>
          <div className="v3-head">
            <h2 className="v3-h2">{areasSection.heading}</h2>
            <p className="v3-lede">{areasSection.lede}</p>
          </div>

          <ul className="v3-places">
            {areaLinks.map((a) => (
              <li key={a.name}>
                <a className="v3-place" href={a.href}>
                  <span className="v3-place-name">{a.name}</span>
                  <span className="v3-place-body">{a.card}</span>
                  {a.priority ? (
                    <span className="v3-place-flag">
                      {areasSection.priorityLabel}
                    </span>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- WHY: v1's facts ---------- */}
      <section className="v3-section v3-section--raised">
        <div className="v3-wrap">
          <p className="v3-rule">
            <span>{whySection.eyebrow}</span>
          </p>
          <div className="v3-head">
            <h2 className="v3-h2">{whySection.heading}</h2>
          </div>

          <ul className="v3-facts">
            {whySection.items.map((item) => (
              <li key={item.key} className="v3-fact">
                <span className="v3-fact-figure" aria-hidden="true">
                  {item.figure}
                </span>
                <h3 className="v3-fact-title">{item.title}</h3>
                <p className="v3-fact-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CLOSE: v1's dark panel ---------- */}
      <section className="v3-close">
        <div className="v3-wrap">
          <h2 className="v3-h2">Καλέστε για εκτίμηση</h2>
          <p className="v3-lede">
            Πείτε μας τι δουλειά είναι και πού. Θα σας πούμε τι χρειάζεται και
            πόσο κάνει.
          </p>
          <a className="v3-close-number" href={business.phone.href}>
            {business.phone.display}
          </a>
          <p className="v3-close-note">{business.hoursNote}</p>
        </div>
      </section>
    </main>
  );
}
