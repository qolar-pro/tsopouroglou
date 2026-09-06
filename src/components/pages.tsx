import { business } from "@/content/site";
import {
  erga,
  servicePhoto,
  allServicePhotos,
  ergaExcluding,
  etaireiaPhoto,
  stolos,
  SHOW_PLACEHOLDER_MEDIA,
} from "@/content/media";
import { HAS_REAL_PHOTOS } from "@/content/site";
import {
  dict,
  href,
  SERVICE_IDS,
  AREA_IDS,
  type Locale,
  type ServiceId,
  type AreaId,
} from "@/content/i18n";
import Band from "./Band";
import PageHero from "./PageHero";
import CallBand from "./CallBand";
import ArrowIcon from "./ArrowIcon";
import Photo from "./Photo";
import Reviews from "./Reviews";
import Hero from "./Hero";
import Services from "./Services";
import ErgaStrip from "./ErgaStrip";
import Areas from "./Areas";
import WhyUs from "./WhyUs";
import ContactBlock from "./ContactBlock";

/**
 * EVERY PAGE BODY, ONCE.
 *
 * The Greek routes and the three translated ones render these same
 * components. That is the point: the brief asked for the translations to be
 * the site, not a summary of it, and the only way to guarantee that over time
 * is for there to be one implementation. If the Greek services page gains a
 * section, all four gain it in the same commit — there is no second copy to
 * forget.
 *
 * Each takes a `lang`, reads its strings from `dict(lang)` and builds every
 * link through `href(lang, route)`, so no path is hardcoded anywhere.
 *
 * The route files are then thin: metadata, JSON-LD, and one of these.
 */

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export function HomePage({ lang }: { lang: Locale }) {
  return (
    <main>
      <Hero lang={lang} />
      <Services lang={lang} />
      <ErgaStrip lang={lang} />
      <Areas lang={lang} />
      <WhyUs lang={lang} />
      <ContactBlock lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Services index — the nine jobs, then the photographs as the proof.  */
/* ------------------------------------------------------------------ */

export function ServicesIndexPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  /**
   * The hero photograph, and the gallery that must not repeat it.
   *
   * The page used to show its own hero again a screen later, and five service
   * photographs a second time in the gallery. Repetition reads as though we
   * ran out of pictures — which undercuts the one claim the section makes,
   * that every photograph is his own work.
   */
  const heroShot = erga.find((e) => e.id === "themelia-jcb") ?? erga[0];
  const gallery = ergaExcluding([
    ...allServicePhotos,
    ...(heroShot ? [heroShot.img] : []),
  ]);

  return (
    <main>
      <PageHero
        label={t.servicesPage.eyebrow}
        title={<h1 className="h1">{t.servicesPage.h1}</h1>}
        lede={t.servicesPage.lede}
        photo={heroShot?.img}
        priority
      />

      <Band label={t.servicesPage.eyebrow} id="ypiresies">
        <h2 className="h2">{t.servicesSection.heading}</h2>
        <p className="lede">
          <span className="measure-prose">{t.servicesPage.body}</span>
        </p>

        <div className="svc-split">
          {SERVICE_IDS.slice(0, 2).map((id) => (
            <a
              key={id}
              className="svc-lead"
              href={href(lang, { page: "service", id })}
            >
              {servicePhoto[id] && (
                <Photo
                  img={servicePhoto[id]}
                  sizes="(min-width: 800px) 45vw, 92vw"
                  frame="css"
                />
              )}
              <span className="svc-lead-title">{t.services[id].title}</span>
              <span className="svc-lead-body">{t.services[id].card}</span>
            </a>
          ))}

          {/* The remaining seven carry a photograph too, at a smaller size.
              This is the page where a visitor is choosing between them — a
              name and a line is thinner than it needs to be when a picture
              exists. */}
          <ul className="svc-grid">
            {SERVICE_IDS.slice(2).map((id) => (
              <li key={id}>
                <a
                  className="svc-mini"
                  href={href(lang, { page: "service", id })}
                >
                  {servicePhoto[id] && (
                    <Photo
                      img={servicePhoto[id]}
                      sizes="(min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw"
                      frame="css"
                    />
                  )}
                  <span className="svc-mini-name">{t.services[id].title}</span>
                  <span className="svc-mini-body">{t.services[id].card}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ---- The evidence ---- */}
      <Band label={t.ergaSection.eyebrow} id="erga" tone="tone">
        <h2 className="h2">{t.ergaSection.galleryHeading}</h2>
        <p className="lede">
          <span className="measure-prose">{t.ergaSection.galleryLede}</span>
        </p>

        {/* Columns, not a grid. Most of these are vertical phone photographs
            and a uniform grid cropped every one to landscape. */}
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

      <CallBand lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* One service                                                         */
/* ------------------------------------------------------------------ */

/**
 * Related services, by id.
 *
 * These were per-service `related` slugs in the Greek content file. They are
 * structural, not linguistic — the septic tank page relates to excavation in
 * every language — so they live here as ids rather than four times over.
 */
const RELATED: Record<ServiceId, ServiceId[]> = {
  ekskafes: ["ekvrachismoi", "metafores-chomaton", "syndeseis-nerou-apocheteusi"],
  "katharismos-oikopedon": ["ekskafes", "metafores-chomaton", "choma-kipou"],
  vothroi: ["ekskafes", "syndeseis-nerou-apocheteusi", "ekvrachismoi"],
  ekvrachismoi: ["ekskafes", "metafores-chomaton", "vothroi"],
  katedafiseis: ["ekvrachismoi", "katharismos-oikopedon", "metafores-chomaton"],
  "katharismos-paralias": ["katharismos-oikopedon", "metafores-chomaton", "choma-kipou"],
  "metafores-chomaton": ["ekskafes", "katharismos-oikopedon", "choma-kipou"],
  "choma-kipou": ["metafores-chomaton", "katharismos-oikopedon", "ekskafes"],
  "syndeseis-nerou-apocheteusi": ["ekskafes", "vothroi", "metafores-chomaton"],
};

export function ServiceDetailPage({
  lang,
  id,
}: {
  lang: Locale;
  id: ServiceId;
}) {
  const t = dict(lang);
  const s = t.services[id];
  const photo = servicePhoto[id];
  const showPhoto = (HAS_REAL_PHOTOS || SHOW_PLACEHOLDER_MEDIA) && photo;

  return (
    <main>
      <PageHero
        label={t.servicesPage.eyebrow}
        title={<h1 className="h1">{s.h1}</h1>}
        lede={s.lede}
        photo={showPhoto ? photo : undefined}
        priority
      >
        <nav className="breadcrumb" aria-label={t.servicesPage.backToAll}>
          <a href={href(lang, { page: "services" })}>
            {t.servicesPage.backToAll}
          </a>
        </nav>
      </PageHero>

      {/* ---- What it involves + which machine ---- */}
      <Band label={s.includesHeading}>
        <div className="detail-cols">
          <div>
            <h2 className="h3">{s.includesHeading}</h2>
            <ul className="check-list">
              {s.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="h3">{s.machinesHeading}</h2>
            <p className="detail-body">{s.machines}</p>
            {s.note && <p className="note">{s.note}</p>}
          </div>
        </div>
      </Band>

      {/* ---- What to have ready, and where ---- */}
      <Band label={s.askHeading} tone="tone">
        <div className="detail-cols">
          <div>
            <h2 className="h3">{s.askHeading}</h2>
            <ol className="ask-list">
              {s.ask.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="h3">{t.servicesPage.areasHeading}</h2>
            <p className="detail-body">{t.servicesPage.areasBody}</p>
          </div>
        </div>
      </Band>

      {/* ---- Related ---- */}
      <Band label={t.servicesPage.relatedHeading}>
        <h2 className="h2">{t.servicesPage.relatedHeading}</h2>
        <ul className="items items-3">
          {RELATED[id].map((rid) => (
            <li key={rid}>
              <a className="item" href={href(lang, { page: "service", id: rid })}>
                <span className="item-title">{t.services[rid].title}</span>
                <span className="item-body">{t.services[rid].card}</span>
                <span className="item-more" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <CallBand lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Areas index                                                         */
/* ------------------------------------------------------------------ */

export function AreasIndexPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  const rows = [
    {
      name: t.areas.metamorfosi.name,
      card: t.areas.metamorfosi.card,
      href: href(lang, { page: "area", id: "metamorfosi" }),
      priority: true,
    },
    {
      name: t.daskalon.name,
      card: t.daskalon.card,
      href: href(lang, { page: "area", id: "metamorfosi" }),
      priority: true,
    },
    ...AREA_IDS.filter((id) => id !== "metamorfosi").map((id) => ({
      name: t.areas[id].name,
      card: t.areas[id].card,
      href: href(lang, { page: "area", id }),
      priority: false,
    })),
  ];

  return (
    <main>
      <PageHero
        label={t.areasPage.eyebrow}
        title={<h1 className="h1">{t.areasPage.h1}</h1>}
        lede={t.areasPage.lede}
        photo={erga.find((e) => e.id === "ekskafi-oikopedou")?.img}
        priority
      />

      <Band label={t.areasPage.eyebrow}>
        <h2 className="h2">{t.areasPage.listHeading}</h2>
        <ul className="places">
          {rows.map((a) => (
            <li key={a.name}>
              <a className="place" href={a.href}>
                <span className="place-name">{a.name}</span>
                <span className="place-body">{a.card}</span>
                {a.priority ? (
                  <span className="place-flag">{t.areasPage.priorityLabel}</span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </Band>

      {/*
        The wider coverage, named but not linked.

        These five villages have no page of their own on purpose — operations
        are identical everywhere, so a page each would be five near-duplicates
        of the four that exist, and near-duplicates get filtered. Named here
        and in areaServed they are findable in search without that risk.

        The municipality framing in the opening paragraph is the point: a plot
        owner who does not know which village his land counts as still knows
        "Sithonia" or "Halkidiki".
      */}
      <Band label={t.coverageSection.eyebrow} tone="tone">
        <h2 className="h2">{t.coverageSection.heading}</h2>
        <p className="lede">
          <span className="measure-prose">{t.coverageSection.body}</span>
        </p>

        <h3 className="footer-heading" style={{ marginTop: "var(--s-6)" }}>
          {t.coverageSection.listHeading}
        </h3>
        <ul className="items items-4">
          {t.widerAreas.map((a) => (
            <li key={a.name}>
              <span className="item">
                <span className="item-title">{a.name}</span>
                <span className="item-body">{a.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "var(--s-6)" }}>
          <span className="measure-prose">{t.coverageSection.closing}</span>
        </p>
      </Band>

      <CallBand lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* One area                                                            */
/* ------------------------------------------------------------------ */

export function AreaDetailPage({ lang, id }: { lang: Locale; id: AreaId }) {
  const t = dict(lang);
  const a = t.areas[id];
  const others = AREA_IDS.filter((x) => x !== id);

  return (
    <main>
      <PageHero
        label={t.areasPage.eyebrow}
        title={<h1 className="h1">{a.h1}</h1>}
        lede={a.lede}
      >
        <nav className="breadcrumb" aria-label={t.areasPage.backToAll}>
          <a href={href(lang, { page: "areas" })}>{t.areasPage.backToAll}</a>
        </nav>
      </PageHero>

      {/* The spine: home ground argues from presence, outer areas from
          capability. Same component, genuinely different content. */}
      <Band label={t.areasPage.eyebrow}>
        <div className="detail-cols">
          {a.blocks.map((b) => (
            <div key={b.heading}>
              <h2 className="h3">{b.heading}</h2>
              <p className="detail-body">{b.body}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Every area gets the full list — confirmed: no area-specific mix. */}
      <Band label={t.servicesPage.eyebrow} tone="tone">
        <h2 className="h2">{t.areasPage.servicesHeading}</h2>
        <p className="lede">
          <span className="measure-prose">{t.areasPage.servicesBody}</span>
        </p>
        <ul className="places">
          {SERVICE_IDS.map((sid) => (
            <li key={sid}>
              <a className="place" href={href(lang, { page: "service", id: sid })}>
                <span className="place-name">{t.services[sid].title}</span>
                <span className="place-body">{t.services[sid].card}</span>
                <span className="place-flag" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <Band label={t.areasPage.otherAreasHeading}>
        <h2 className="h2">{t.areasPage.otherAreasHeading}</h2>
        <ul className="places">
          {others.map((oid) => (
            <li key={oid}>
              <a className="place" href={href(lang, { page: "area", id: oid })}>
                <span className="place-name">{t.areas[oid].name}</span>
                <span className="place-body">{t.areas[oid].card}</span>
                <span className="place-flag" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <CallBand lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export function AboutPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  return (
    <main>
      <PageHero
        label={t.about.eyebrow}
        title={<h1 className="h1">{t.about.h1}</h1>}
        lede={t.about.lede}
        photo={etaireiaPhoto}
        priority
      />

      <Band label={t.about.eyebrow}>
        <div className="detail-cols">
          {t.about.blocks.map((b) => (
            <div key={b.heading}>
              <h2 className="h3">{b.heading}</h2>
              <p className="detail-body">{b.body}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Κριτικές merged in from the homepage: what people say about them
          belongs with who they are, and it shortens the nav. */}
      <Reviews lang={lang} />

      <CallBand lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export function ContactPage({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const c = t.contactSection;

  return (
    <main>
      <PageHero
        label={t.contact.eyebrow}
        title={<h1 className="h1">{t.contact.h1}</h1>}
        lede={t.contact.lede}
      />

      <Band label={c.eyebrow} frame="panel" index="02">
        <div className="contact-grid">
          <a className="contact-primary" href={business.phone.href}>
            <span className="contact-label">{c.mobileLabel}</span>
            <span className="contact-number">{business.phone.display}</span>
          </a>

          <div>
            <a className="contact-row" href={business.landline.href}>
              <span className="contact-label">{c.landlineLabel}</span>
              <span className="contact-value num">
                {business.landline.display}
              </span>
            </a>
            <a className="contact-row" href={`mailto:${business.email}`}>
              <span className="contact-label">{c.emailLabel}</span>
              <span className="contact-value contact-value-email">
                {business.email}
              </span>
            </a>
            <div className="contact-row">
              <span className="contact-label">{c.baseLabel}</span>
              <span className="contact-value">{c.baseValue}</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">{c.hoursLabel}</span>
              <span className="contact-value">{c.hoursValue}</span>
            </div>
          </div>
        </div>
      </Band>

      {/*
        No quote form. The brief's own finding was that for this audience the
        phone outperforms any form, and a form that is visible but not wired
        is worse than none. The written path is a plain mailto, which needs no
        service, no API key and cannot fail silently.
      */}
      <Band label={t.contact.formHeading} id="prosfora" tone="tone">
        <h2 className="h2">{t.contact.formHeading}</h2>
        <p className="lede">
          <span className="measure-prose">{t.contact.formLede}</span>
        </p>
        <div className="band-cta">
          <a className="btn btn-call" href={business.phone.href}>
            {t.chrome.phoneLabel}{" "}
            <span className="num">{business.phone.display}</span>
          </a>
          <a className="btn btn-secondary" href={`mailto:${business.email}`}>
            {c.emailLabel}
          </a>
        </div>
        <p className="note" style={{ marginTop: "var(--s-5)" }}>
          {t.contact.askNote}
        </p>
      </Band>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Fleet                                                               */
/* ------------------------------------------------------------------ */

export function FleetPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  return (
    <main>
      <PageHero
        label={t.fleet.eyebrow}
        title={<h1 className="h1">{t.fleet.h1}</h1>}
        lede={t.fleet.lede}
        photo={stolos[0]?.img}
        priority
      />

      <Band label={t.fleet.eyebrow}>
        {/*
          Real photographs only. Showing someone else's machines as his fleet
          is the worst version of the stock-photo problem, so this section is
          his own pictures or it does not ship.
        */}
        <ul className="fleet">
          {stolos.map((m, i) => (
            <li key={m.name}>
              <figure>
                <Photo
                  img={m.img}
                  sizes="(min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw"
                  frame="css"
                />
                <figcaption>
                  <span className="item-title">{t.fleet.items[i] ?? m.name}</span>
                  <span className="item-body">{m.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Band>

      <CallBand lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ, with the build walkthrough inside it                           */
/* ------------------------------------------------------------------ */

export function FaqPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  return (
    <main>
      <PageHero
        label={t.faqPage.eyebrow}
        title={<h1 className="h1">{t.faqPage.h1}</h1>}
        lede={t.faqPage.lede}
        photo={erga.find((e) => e.id === "ekskafi-oikopedou")?.img}
        priority
      />

      {/* ---- Building? the sequence, in the order it happens ---- */}
      <Band label={t.buildJourney.eyebrow} tone="tone">
        <h2 className="h2">{t.buildJourney.heading}</h2>
        <p className="lede">
          <span className="measure-prose">{t.buildJourney.lede}</span>
        </p>

        <ol className="places" style={{ marginTop: "var(--s-6)" }}>
          {t.buildJourney.steps.map((step) => (
            <li key={step.n}>
              <a
                className="place"
                href={href(lang, { page: "service", id: step.id })}
              >
                <span className="place-name">
                  <span className="num">{step.n}.</span> {step.title}
                </span>
                <span className="place-body">{step.body}</span>
                <span className="place-flag">{t.services[step.id].title}</span>
              </a>
            </li>
          ))}
        </ol>

        <p style={{ marginTop: "var(--s-6)" }}>
          <span className="measure-prose">{t.buildJourney.closing}</span>
        </p>
      </Band>

      {/* ---- The questions ----
           <details>/<summary> rather than a JS accordion: keyboard and
           screen-reader correct for free, works with no hydration, and the
           browser's own find-in-page opens the right answer. */}
      <Band label={t.faqPage.eyebrow}>
        <h2 className="h2">{t.faqPage.questionsHeading}</h2>

        <div className="faq-list">
          {t.faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                <span className="faq-q">{f.q}</span>
                <ArrowIcon />
              </summary>
              <div className="faq-a">
                <p>
                  <span className="measure-prose">{f.a}</span>
                </p>
              </div>
            </details>
          ))}
        </div>
      </Band>

      <CallBand lang={lang} faqLink={false} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Privacy                                                             */
/* ------------------------------------------------------------------ */

export function PrivacyPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  return (
    <main>
      <PageHero
        label={t.privacy.eyebrow}
        title={<h1 className="h1">{t.privacy.h1}</h1>}
        lede={t.privacy.lede}
      />

      <Band label={t.privacy.updated}>
        <div className="legal">
          {t.privacy.blocks.map((b, i) => (
            <section key={b.heading}>
              <h2 className="h3">{b.heading}</h2>
              {/* The first block is the business's own details, rendered from
                  site.ts rather than repeated in four locale files — a phone
                  number written four times is a phone number that will one
                  day be wrong in three of them. */}
              {i === 0 ? (
                <p>
                  {business.legalName}, {business.address.locality}{" "}
                  {business.address.postalCode}, {business.address.region}.{" "}
                  <a href={business.phone.href}>{business.phone.display}</a>,{" "}
                  <a href={`mailto:${business.email}`}>{business.email}</a>.
                </p>
              ) : null}
              {b.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </Band>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* 404 body                                                            */
/* ------------------------------------------------------------------ */

export function NotFoundPage({ lang }: { lang: Locale }) {
  const t = dict(lang);

  return (
    <main>
      <PageHero
        label="404"
        title={<h1 className="h1">{t.notFound.h1}</h1>}
        lede={t.notFound.lede}
      />

      <Band label={t.servicesPage.eyebrow} tone="tone">
        <h2 className="h2">{t.notFound.servicesHeading}</h2>
        <ul className="places">
          {SERVICE_IDS.map((id) => (
            <li key={id}>
              <a className="place" href={href(lang, { page: "service", id })}>
                <span className="place-name">{t.services[id].title}</span>
                <span className="place-body">{t.services[id].card}</span>
                <span aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <Band label={t.areasPage.eyebrow}>
        <h2 className="h2">{t.notFound.areasHeading}</h2>
        <ul className="places">
          {AREA_IDS.map((id) => (
            <li key={id}>
              <a className="place" href={href(lang, { page: "area", id })}>
                <span className="place-name">{t.areas[id].name}</span>
                <span className="place-body">{t.areas[id].card}</span>
                <span aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Band>
    </main>
  );
}
