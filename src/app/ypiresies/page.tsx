import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import { services, servicesPage } from "@/content/services";
import { erga, servicePhoto } from "@/content/media";
import Photo from "@/components/Photo";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";
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
  alternates: pageAlternates("/ypiresies"),
};

export default function ServicesAndWork() {
  return (
    <main>
      <PageHero
        label={servicesPage.eyebrow}
        title={<h1 className="h1">Τι κάνουμε, και τι έχουμε κάνει</h1>}
        lede="Οκτώ δουλειές. Πιο κάτω, φωτογραφίες από δικά μας εργοτάξια — η ίδια δουλειά, όχι σε λόγια."
        photo={erga[0].img}
        priority
      />

      <Band label={servicesPage.eyebrow} id="ypiresies">
        <h2 className="h2">Οι οκτώ δουλειές</h2>

        <div className="svc-split">
          {services.slice(0, 2).map((s) => (
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

          {/* No spacer needed any more: the list form does not reserve a
              photo slot, so a service without one simply has no picture
              instead of a blank hole in a grid row. */}
          <ul className="svc-rest">
            {services.slice(2).map((s) => (
              <li key={s.slug}>
                <a href={`/ypiresies/${s.slug}`}>
                  <span className="svc-rest-name">{s.title}</span>
                  <span className="svc-rest-body">{s.card}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
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

        {/* Columns, not a grid. Most of these are vertical phone
            photographs and a uniform grid cropped every one to landscape. */}
        <div className="shots">
          {erga.map((project) => (
            <figure key={project.id} className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img.src}
                alt={project.img.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{project.title}</figcaption>
            </figure>
          ))}
        </div>
      </Band>

      <CallBand />
    </main>
  );
}
