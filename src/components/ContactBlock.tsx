import { business, contactSection } from "@/content/site";
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
export default function ContactBlock() {
  return (
    <Band label={contactSection.eyebrow} id="epikoinonia" tone="ink">
      <h2 className="h2">{contactSection.heading}</h2>
      <p className="lede">
        <span className="measure-prose">{contactSection.lede}</span>
      </p>

      <div className="contact-grid">
        <a className="contact-primary" href={business.phone.href}>
          <span className="contact-label">{contactSection.mobileLabel}</span>
          <span className="contact-number">{business.phone.display}</span>
        </a>

        <div>
          <a className="contact-row" href={business.landline.href}>
            <span className="contact-label">{contactSection.landlineLabel}</span>
            <span className="contact-value num">{business.landline.display}</span>
          </a>

          <a className="contact-row" href={`mailto:${business.email}`}>
            <span className="contact-label">{contactSection.emailLabel}</span>
            <span className="contact-value contact-value-email">
              {business.email}
            </span>
          </a>

          <div className="contact-row">
            <span className="contact-label">{contactSection.baseLabel}</span>
            <span className="contact-value">{contactSection.baseValue}</span>
          </div>
        </div>
      </div>

      <div className="contact-quote">
        <a className="btn btn-call" href="/epikoinonia">
          {contactSection.quoteCta}
        </a>
        <p className="contact-quote-note">{contactSection.quoteNote}</p>
      </div>
    </Band>
  );
}
