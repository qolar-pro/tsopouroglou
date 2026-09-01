import type { Metadata } from "next";
import Image from "next/image";
import { business, hero, services, servicesSection } from "@/content/site";
import { areaLinks } from "@/content/areas";
import { erga, servicePhoto } from "@/content/media";
import "./v2.css";

/**
 * v2 — an alternative homepage, for comparison only. THROWAWAY.
 *
 * Built from a suggested redesign direction, keeping the parts that are right
 * and refusing the parts that would break the build or undo settled
 * decisions. The reasoning is in v2.css; the short version:
 *
 *   TAKEN    charcoal + warm sand instead of white + green; a full-bleed hero
 *            photograph; an asymmetric gallery instead of a uniform grid;
 *            services with real hierarchy rather than eight identical cards.
 *
 *   REFUSED  safety yellow (banned by name in the brief — it is the default
 *            every construction template reaches for, so it is not a choice);
 *            any stated number of years (the copy guard fails the build on
 *            it, and it is wrong every January); cinematic 21:9 crops of 4:3
 *            phone photographs; a quote form, which no longer exists.
 *
 * noindex, and disallowed in robots.txt. Delete src/app/v2 to scrap it.
 */
export const metadata: Metadata = {
  title: "v2 — εναλλακτική σχεδίαση",
  robots: { index: false, follow: false },
};

/** The two services that lead, and the six that list. */
const LEAD = services.slice(0, 2);
const REST = services.slice(2);

export default function V2() {
  const heroShot = erga.find((e) => e.id === "ergotaxio") ?? erga[0];

  return (
    <main className="v2">
      <p className="v2-flag">
        Εναλλακτική σχεδίαση για σύγκριση — δεν είναι η ζωντανή σελίδα.{" "}
        <a href="/">Δείτε την τρέχουσα</a>
      </p>

      {/* ---------- HERO ---------- */}
      <section className="v2-hero">
        <div className="v2-hero-img">
          <Image
            src={heroShot.img.src}
            alt={heroShot.img.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="v2-hero-scrim" />

        <div className="v2-hero-inner">
          <div className="v2-wrap">
            <p className="v2-eyebrow">{hero.eyebrow}</p>

            <h1>
              {hero.headingLead}
              <span className="v2-hero-year">{hero.headingYear}</span>
            </h1>

            <p className="v2-hero-lede">{hero.lede.join(" ")}</p>

            <div className="v2-cta">
              <a className="v2-btn v2-btn-primary" href={business.phone.href}>
                ΚΑΛΕΣΤΕ ΤΩΡΑ {business.phone.display}
              </a>
              <a className="v2-btn v2-btn-ghost" href="/epikoinonia">
                Πείτε μας τι χρειάζεστε
              </a>
            </div>

            {/* Each of these is checkable. No invented counters, and no
                number of years — only the year itself. */}
            <ul className="v2-trust">
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

      {/* ---------- SERVICES ---------- */}
      <section className="v2-section">
        <div className="v2-wrap">
          <div className="v2-head">
            <p className="v2-eyebrow">{servicesSection.eyebrow}</p>
            <h2 className="v2-h2">{servicesSection.heading}</h2>
            <p className="v2-lede">{servicesSection.lede}</p>
          </div>

          <div className="v2-services">
            {LEAD.map((s) => {
              const img = servicePhoto[s.slug];
              return (
                <a
                  key={s.slug}
                  className="v2-svc-lead"
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

            <ul className="v2-svc-list">
              {REST.map((s) => (
                <li key={s.slug}>
                  <a href={`/ypiresies/${s.slug}`}>
                    <span className="v2-svc-name">{s.title}</span>
                    <span className="v2-svc-body">{s.card}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="v2-section v2-section--deep">
        <div className="v2-wrap">
          <div className="v2-head">
            <p className="v2-eyebrow">ΕΡΓΑ</p>
            <h2 className="v2-h2">Δουλειές μας</h2>
            <p className="v2-lede">
              Φωτογραφίες από δικά μας εργοτάξια στη Χαλκιδική. Καμία δεν είναι
              από το ίντερνετ.
            </p>
          </div>

          {/* Columns, not a grid: every photograph keeps its own shape
              instead of being cropped to a common one. */}
          <div className="v2-gallery">
            {erga.map((p) => (
              <figure key={p.id} className="v2-shot">
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

      {/* ---------- AREAS ---------- */}
      <section className="v2-section v2-section--ink">
        <div className="v2-wrap">
          <div className="v2-head">
            <p className="v2-eyebrow">ΠΟΥ ΔΟΥΛΕΥΟΥΜΕ</p>
            <h2 className="v2-h2">Χαλκιδική, με βάση τη Μεταμόρφωση</h2>
          </div>

          <ul className="v2-areas">
            {areaLinks.map((a) => (
              <li key={a.name}>
                <p className="v2-area-name">{a.name}</p>
                <p className="v2-area-body">{a.card}</p>
                {a.priority && (
                  <span className="v2-area-flag">ΠΡΟΤΕΡΑΙΟΤΗΤΑ</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CLOSE ---------- */}
      <section className="v2-close">
        <div className="v2-wrap">
          <h2 className="v2-h2">Καλέστε για εκτίμηση</h2>
          <a className="v2-close-number" href={business.phone.href}>
            {business.phone.display}
          </a>
          <p className="v2-close-note">{business.hoursNote}</p>
        </div>
      </section>
    </main>
  );
}
