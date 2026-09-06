import { business } from "@/content/site";
import { dict, href, type Locale } from "@/content/i18n";
import Band from "./Band";

/**
 * The closing call band, shared by every inner page. It inverts for the same
 * reason the homepage's contact section does: the phone is the conversion
 * event, and this is the only dark break in an otherwise continuous white
 * page, so it reads as the end of the argument rather than as decoration.
 *
 * It also carries the only site-wide link to the FAQ. That page answers the
 * questions people would otherwise ring to ask — price, permits, how soon,
 * which machine fits — so the natural place to offer it is next to the phone
 * number, for the reader who is nearly ready to call but wants one more
 * thing answered first.
 *
 * `faqLink` turns it off on the FAQ page itself, which would otherwise link
 * to where the reader already is.
 */
export default function CallBand({
  lang = "el",
  faqLink = true,
}: {
  lang?: Locale;
  faqLink?: boolean;
}) {
  const t = dict(lang);
  return (
    <Band
      label={t.callBand.label}
      frame="panel"
      tone="ink"
      index={t.callBand.endLabel}
    >
      <h2 className="h2">{t.servicesPage.ctaHeading}</h2>
      <p className="lede">
        <span className="measure-prose">{t.servicesPage.ctaBody}</span>
      </p>
      <div className="band-cta">
        <a className="btn btn-call" href={business.phone.href}>
          {t.callBand.label}{" "}
          <span className="num">{business.phone.display}</span>
        </a>
        <a
          className="btn btn-secondary"
          href={href(lang, { page: "contact" })}
        >
          {t.contactSection.quoteCta}
        </a>
      </div>
      <p className="small" style={{ marginTop: "var(--s-5)" }}>
        {t.contactSection.hoursValue}. {t.contactSection.landlineLabel}{" "}
        <a className="inline-link" href={business.landline.href}>
          <span className="num">{business.landline.display}</span>
        </a>
        .
        {faqLink ? (
          <>
            {" "}
            <a
              className="inline-link"
              href={href(lang, { page: "faq" })}
            >
              {t.contactSection.faqLink}
            </a>
            .
          </>
        ) : null}
      </p>
    </Band>
  );
}
