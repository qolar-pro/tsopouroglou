import { business } from "@/content/site";
import { dict, href, type Locale } from "@/content/i18n";
import Band from "./Band";

/**
 * The page ends dark, on the phone number.
 *
 * The phone is the conversion event, so the one place on the homepage that
 * inverts is the one place we want a thumb to land. Everything above it is a
 * continuous white ground; this is the only break in it, which is what makes
 * it read as the end of an argument rather than as another stripe.
 *
 * The form is the secondary path — it exists mainly to unlock Google's
 * "Online estimates" attribute, which competing listings already have.
 */
export default function ContactBlock({ lang = "el" }: { lang?: Locale }) {
  const c = dict(lang).contactSection;
  return (
    <Band
      label={c.eyebrow}
      id="epikoinonia"
      frame="panel"
      tone="ink"
      index="06"
    >
      <h2 className="h2">{c.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{c.lede}</span>
      </p>

      <div className="contact-grid">
        <a className="contact-primary" href={business.phone.href}>
          <span className="contact-label">{c.mobileLabel}</span>
          <span className="contact-number">{business.phone.display}</span>
        </a>

        <div>
          <a className="contact-row" href={business.landline.href}>
            <span className="contact-label">{c.landlineLabel}</span>
            <span className="contact-value num">{business.landline.display}</span>
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
        </div>
      </div>

      <div className="contact-quote">
        <a className="btn btn-call" href={href(lang, { page: "contact" })}>
          {c.quoteCta}
        </a>
        <p className="contact-quote-note">
          {c.quoteNote}{" "}
          {/* The homepage's only link to the FAQ. Inner pages get theirs
              from CallBand, which the homepage does not use. */}
          <a className="inline-link" href={href(lang, { page: "faq" })}>
            {c.faqLink}
          </a>
          .
        </p>
      </div>
    </Band>
  );
}
