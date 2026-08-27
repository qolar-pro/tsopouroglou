import type { Metadata } from "next";
import { services, servicesPage } from "@/content/services";
import { erga, servicePhoto } from "@/content/media";
import Photo from "@/components/Photo";
import ArrowIcon from "@/components/ArrowIcon";
import LevelLine from "@/components/LevelLine";
import CallBand from "@/components/CallBand";

/**
 * Υπηρεσίες + Έργα, merged.
 *
 * They were two routes and should not have been: the photographs ARE the
 * proof of the services, so splitting "what we do" from "what we have done"
 * made the reader hop between pages to assemble one argument. /erga 301s
 * here.
 *
 * The page reads as one claim in two registers — the eight jobs as a
 * promise, then twelve of his own sites as the evidence.
 */
export const metadata: Metadata = {
  title: "Υπηρεσίες και έργα — Χωματουργικά Χαλκιδική | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  description:
    "Εκσκαφές, καθαρισμοί οικοπέδων, βόθροι, εκβραχισμοί, καθαρισμοί παραλίας, μεταφορές χωμάτων, χώμα κήπου, συνδέσεις νερού — και φωτογραφίες από δικά μας εργοτάξια. Μεταμόρφωση Χαλκιδικής, από το 1987. Τηλ. 697 355 7903.",
  alternates: { canonical: "/ypiresies" },
};

export default function ServicesAndWork() {
  return (
    <main>
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">{servicesPage.eyebrow}</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            Τι κάνουμε, και τι έχουμε κάνει
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">
              Οκτώ δουλειές. Πιο κάτω, φωτογραφίες από δικά μας εργοτάξια —
              η ίδια δουλειά, όχι σε λόγια.
            </span>
          </p>
        </div>
      </section>

      {/* ---- The eight services ---- */}
      <section className="section surface-raised">
        <LevelLine />
        <div className="wrap">
          <ul className="grid grid-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a className="card card-media" href={`/ypiresies/${s.slug}`}>
                  {servicePhoto[s.slug] && (
                    <Photo
                      img={servicePhoto[s.slug]}
                      sizes="(min-width: 560px) 50vw, 100vw"
                    />
                  )}
                  <span className="card-body-wrap">
                    <h2 className="card-title">{s.title}</h2>
                    <p className="card-body">{s.card}</p>
                    <span className="card-more" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- The evidence ---- */}
      <section className="section surface-field" id="erga">
        <LevelLine />
        <div className="wrap section-head">
          <p className="label">ΕΡΓΑ</p>
          <h2 className="h2">Δουλειές μας</h2>
          <p className="lede">
            <span className="measure">
              Όλες οι φωτογραφίες είναι από δικά μας εργοτάξια στη Χαλκιδική.
              Καμία δεν είναι από το ίντερνετ.
            </span>
          </p>
        </div>

        <div className="wrap">
          <ul className="erga-grid">
            {erga.map((project) => (
              <li key={project.id}>
                <article className="project">
                  <Photo
                    img={project.img}
                    sizes="(min-width: 760px) 46vw, 100vw"
                  />
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallBand />
    </main>
  );
}
