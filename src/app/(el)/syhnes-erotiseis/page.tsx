import type { Metadata } from "next";
import { pageAlternates, pageOpenGraph } from "@/content/site-config";
import { faqPage, faqs, buildJourney } from "@/content/faq";
import { serviceBySlug } from "@/content/services";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";
import CallBand from "@/components/CallBand";
import ArrowIcon from "@/components/ArrowIcon";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { erga } from "@/content/media";

export const metadata: Metadata = {
  title: faqPage.metaTitle,
  description: faqPage.metaDescription,
  alternates: pageAlternates("/syhnes-erotiseis"),
  openGraph: pageOpenGraph(faqPage.metaTitle, faqPage.metaDescription),
};

/**
 * The FAQ, with the "are you building?" walkthrough inside it.
 *
 * Every other page on this site targets someone who already knows the word
 * for what they want. This one targets the person who does not — who bought
 * a plot, wants to put a house or rooms on it, and types the whole situation
 * into Google as a sentence. That phrasing matches nothing on a service page
 * and everything here.
 *
 * The walkthrough sits ABOVE the questions on purpose: it is the part that
 * orients a first-time builder, and it links out to five of the nine
 * services in the order they actually happen, which is also the strongest
 * internal linking on the site.
 *
 * <details>/<summary> rather than a JS accordion — it is keyboard accessible
 * and screen-reader correct for free, works with no hydration, and lets the
 * browser's own find-in-page open the right answer. The whole site has
 * exactly one client component and this does not need to be the second.
 */
export default function FaqPageRoute() {
  return (
    <main>
      <JsonLd data={faqSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Αρχική", path: "/" },
          { name: faqPage.h1, path: "/syhnes-erotiseis" },
        ])}
      />

      <PageHero
        label={faqPage.eyebrow}
        title={<h1 className="h1">{faqPage.h1}</h1>}
        lede={faqPage.lede}
        photo={erga.find((e) => e.id === "ekskafi-oikopedou")?.img}
        priority
      />

      {/* ---- Χτίζετε; the sequence, in the order it happens ---- */}
      <Band label={buildJourney.eyebrow} tone="tone">
        <h2 className="h2">{buildJourney.heading}</h2>
        <p className="lede">
          <span className="measure-prose">{buildJourney.lede}</span>
        </p>

        <ol className="places" style={{ marginTop: "var(--s-6)" }}>
          {buildJourney.steps.map((step) => {
            const service = serviceBySlug(step.slug);
            return (
              <li key={step.n}>
                <a className="place" href={`/ypiresies/${step.slug}`}>
                  <span className="place-name">
                    <span className="num">{step.n}.</span> {step.title}
                  </span>
                  <span className="place-body">{step.body}</span>
                  <span className="place-flag">
                    {service ? service.title : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        <p style={{ marginTop: "var(--s-6)" }}>
          <span className="measure-prose">{buildJourney.closing}</span>
        </p>
      </Band>

      {/* ---- The questions ---- */}
      <Band label="ΕΡΩΤΗΣΕΙΣ">
        <h2 className="h2">Αυτά μας ρωτάνε</h2>

        <div className="faq-list">
          {faqs.map((f) => (
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

      <CallBand faqLink={false} />
    </main>
  );
}
