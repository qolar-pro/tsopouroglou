import type { Metadata } from "next";
import { services, servicesPage } from "@/content/services";
import { erga, servicePhoto } from "@/content/media";
import Photo from "@/components/Photo";
import ArrowIcon from "@/components/ArrowIcon";
import Band from "@/components/Band";
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
      <Band label={servicesPage.eyebrow} head>
        <h1 className="h1">Τι κάνουμε, και τι έχουμε κάνει</h1>
        <p className="lede">
          <span className="measure-prose">
            Οκτώ δουλειές. Πιο κάτω, φωτογραφίες από δικά μας εργοτάξια — η
            ίδια δουλειά, όχι σε λόγια.
          </span>
        </p>

        <ul className="items items-3">
          {services.map((s) => (
            <li key={s.slug}>
              <a className="item" href={`/ypiresies/${s.slug}`}>
                {servicePhoto[s.slug] && (
                  <Photo
                    img={servicePhoto[s.slug]}
                    sizes="(min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw"
                    frame="css"
                  />
                )}
              {!servicePhoto[s.slug] && (
                <span className="item-spacer" aria-hidden="true" />
              )}
                <span className="item-title">{s.title}</span>
                <span className="item-body">{s.card}</span>
                <span className="item-more" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      {/* ---- The evidence ---- */}
      <Band label="ΕΡΓΑ" id="erga" tone="tone">
        <h2 className="h2">Δουλειές μας</h2>
        <p className="lede">
          <span className="measure-prose">
            Όλες οι φωτογραφίες είναι από δικά μας εργοτάξια στη Χαλκιδική.
            Καμία δεν είναι από το ίντερνετ.
          </span>
        </p>

        <ul className="erga-grid">
          {erga.map((project) => (
            <li key={project.id}>
              <article className="project">
                <Photo
                  img={project.img}
                  sizes="(min-width: 1000px) 28vw, (min-width: 620px) 44vw, 92vw"
                  frame="css"
                />
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </Band>

      <CallBand />
    </main>
  );
}
