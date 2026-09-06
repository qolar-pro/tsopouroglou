import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import { services, servicesPage } from "@/content/services";
import {
  erga,
  servicePhoto,
  allServicePhotos,
  ergaExcluding,
} from "@/content/media";
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
  /**
   * The hero photograph, and the gallery that must not repeat it.
   *
   * The page showed its own hero again a screen later, and five service
   * photographs a second time in the gallery. Repetition here reads as though
   * we ran out of pictures — which undercuts the one claim the section makes,
   * that every photograph is his own work.
   *
   * A wide frame for the hero, because it is the only crop shape that suits
   * one; the vertical phone photographs stay in the masonry where they keep
   * their shape.
   */
  const heroShot = erga.find((e) => e.id === "themelia-jcb") ?? erga[0];
  const gallery = ergaExcluding([
    ...allServicePhotos,
    ...(heroShot ? [heroShot.img] : []),
  ]);

  return (
    <main>
      <PageHero
        label={servicesPage.eyebrow}
        title={<h1 className="h1">Τι κάνουμε, και τι έχουμε κάνει</h1>}
        lede="Οκτώ δουλειές με δικά μας μηχανήματα. Πιο κάτω, έργα που έχουμε ήδη παραδώσει στη Χαλκιδική."
        photo={heroShot?.img}
        priority
      />

      <Band label={servicesPage.eyebrow} id="ypiresies">
        <h2 className="h2">Τι αναλαμβάνουμε</h2>
        <p className="lede">
          <span className="measure-prose">
            Οκτώ δουλειές, με δικά μας μηχανήματα και δικά μας φορτηγά. Από
            το πρώτο σκάψιμο μέχρι να παραδοθεί ο χώρος καθαρός.
          </span>
        </p>

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

          {/* The remaining six carry a photograph too, at a smaller size.
              Every service has one now, and this is the page where a
              visitor is choosing between them — a name and a line is
              thinner than it needs to be when a picture exists. */}
          <ul className="svc-grid">
            {services.slice(2).map((s) => (
              <li key={s.slug}>
                <a className="svc-mini" href={`/ypiresies/${s.slug}`}>
                  {servicePhoto[s.slug] && (
                    <Photo
                      img={servicePhoto[s.slug]}
                      sizes="(min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw"
                      frame="css"
                    />
                  )}
                  <span className="svc-mini-name">{s.title}</span>
                  <span className="svc-mini-body">{s.card}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ---- The evidence ---- */}
      <Band label="ΕΡΓΑ" id="erga" tone="tone">
        <h2 className="h2">Δουλειές που έχουμε παραδώσει</h2>
        <p className="lede">
          <span className="measure-prose">
            Ολοκληρωμένα έργα σε οικόπεδα, αυλές και ακτές της Χαλκιδικής.
            Όλες οι φωτογραφίες είναι δικές μας — καμία από το ίντερνετ.
          </span>
        </p>

        {/* Columns, not a grid. Most of these are vertical phone
            photographs and a uniform grid cropped every one to landscape. */}
        <div className="shots">
          {gallery.map((project) => (
            <figure key={project.id} className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img.src}
                alt={project.img.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>{project.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Band>

      <CallBand />
    </main>
  );
}
