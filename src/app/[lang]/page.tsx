import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/content/site";
import { ergaFeatured } from "@/content/media";
import { T, TRANSLATED, LOCALE_TAG, type Translated } from "@/content/i18n";
import { abs, OG_IMAGE } from "@/content/site-config";
import Band from "@/components/Band";
import Photo from "@/components/Photo";

/**
 * The English and Serbian page.
 *
 * One page per language rather than a translated copy of all nineteen
 * routes — see the reasoning in content/i18n.ts. It carries everything a
 * foreign holiday-home owner needs to decide to ring: who he is, 1987, the
 * eight jobs, the villages, and the number.
 *
 * Greek stays at the root untouched. That matters: the Greek URLs are the
 * ones in the sitemap, the canonicals and the schema, and they serve the
 * primary market. Adding languages must not disturb them.
 *
 * dynamicParams is off, so anything other than /en or /sr is a real 404
 * rather than an empty page rendered from a bad param.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED.map((lang) => ({ lang }));
}

const isTranslated = (v: string): v is Translated =>
  (TRANSLATED as readonly string[]).includes(v);

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isTranslated(lang)) return {};
  const t = T[lang];

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${lang}`,
      /**
       * hreflang. Every language points at every other one including itself,
       * plus x-default at the Greek root — that is what tells Google these
       * are translations of one site rather than three competing pages, and
       * which to serve a searcher whose language matches none of them.
       */
      languages: {
        el: abs("/"),
        en: abs("/en"),
        "sr-Latn": abs("/sr"),
        "x-default": abs("/"),
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_GB" : "sr_RS",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function LocalePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isTranslated(lang)) notFound();
  const t = T[lang];

  return (
    <main lang={LOCALE_TAG[lang]}>
      {/* ---- Hero ---- */}
      <section className="band band--panel band--ink page-hero">
        <div className="wrap">
          <div className="panel">
            <div className="panel-title">
              <span className="band-label">{t.eyebrow}</span>
              <span className="panel-index">{t.since}</span>
            </div>
            <div className="panel-body band-body">
              <h1 className="hero-h1">
                <span className="hero-h1-lead">{t.headingLead}</span>
                <span className="hero-year">{t.since}</span>
              </h1>

              <p className="lede">{t.lede}</p>

              <div className="band-cta">
                <a className="btn btn-call" href={business.phone.href}>
                  {t.callLabel}{" "}
                  <span className="num">{business.phone.display}</span>
                </a>
                <a
                  className="btn btn-secondary"
                  href={`mailto:${business.email}`}
                >
                  {t.emailCta}
                </a>
              </div>

              <p className="hero-hours">{t.hours}</p>

              <div className="hero-media">
                <Photo
                  img={ergaFeatured[0].img}
                  sizes="(min-width: 1200px) 1100px, 100vw"
                  frame="css"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Says plainly that the rest of the site is Greek ---- */}
      <Band label={t.noticeHeading.toUpperCase()}>
        <p className="lede">{t.notice}</p>
      </Band>

      {/* ---- Services ---- */}
      <Band label={t.servicesHeading.toUpperCase()}>
        <h2 className="h2">{t.servicesHeading}</h2>
        <p className="lede">{t.servicesLede}</p>

        <ul className="items items-4">
          {t.services.map((s) => (
            <li key={s.title}>
              <span className="item">
                <span className="item-title">{s.title}</span>
                <span className="item-body">{s.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Band>

      {/* ---- Work ---- */}
      <Band label={t.workHeading.toUpperCase()} tone="tone">
        <h2 className="h2">{t.workHeading}</h2>
        <p className="lede">{t.workLede}</p>

        <ul className="erga-grid">
          {ergaFeatured.map((project) => (
            <li key={project.id}>
              <Photo
                img={project.img}
                sizes="(min-width: 1000px) 28vw, (min-width: 620px) 44vw, 92vw"
                frame="css"
              />
            </li>
          ))}
        </ul>
      </Band>

      {/* ---- Areas ---- */}
      <Band label={t.areasHeading.toUpperCase()}>
        <h2 className="h2">{t.areasHeading}</h2>
        <p className="lede">{t.areasLede}</p>

        <ul className="places">
          {t.areas.map((a) => (
            <li key={a.name}>
              <span className="place">
                <span className="place-name">{a.name}</span>
                <span className="place-body">{a.body}</span>
                {a.priority ? (
                  <span className="place-flag">{t.priorityLabel}</span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </span>
            </li>
          ))}
        </ul>
      </Band>

      {/* ---- Why us ---- */}
      <Band label={t.whyHeading.toUpperCase()}>
        <h2 className="h2">{t.whyHeading}</h2>
        <ul className="facts">
          {t.why.map((w) => (
            <li key={w.figure} className="fact">
              <span className="fact-figure" aria-hidden="true">
                {w.figure}
              </span>
              <h3 className="fact-title">{w.title}</h3>
              <p className="fact-body">{w.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* ---- Contact ---- */}
      <Band
        label={t.contactHeading.toUpperCase()}
        frame="panel"
        tone="ink"
        index={t.since}
      >
        <h2 className="h2">{t.contactHeading}</h2>
        <p className="lede">{t.contactLede}</p>

        <div className="contact-grid">
          <a className="contact-primary" href={business.phone.href}>
            <span className="contact-label">{t.mobileLabel}</span>
            <span className="contact-number">{business.phone.display}</span>
          </a>

          <div>
            <a className="contact-row" href={business.landline.href}>
              <span className="contact-label">{t.landlineLabel}</span>
              <span className="contact-value num">
                {business.landline.display}
              </span>
            </a>
            <a className="contact-row" href={`mailto:${business.email}`}>
              <span className="contact-label">{t.emailLabel}</span>
              <span className="contact-value contact-value-email">
                {business.email}
              </span>
            </a>
            <div className="contact-row">
              <span className="contact-label">{t.baseLabel}</span>
              <span className="contact-value">{t.baseValue}</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">{t.hoursLabel}</span>
              <span className="contact-value">{t.hours}</span>
            </div>
          </div>
        </div>
      </Band>
    </main>
  );
}
