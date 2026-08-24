import { business, contactSection } from "@/content/site";
import LevelLine from "./LevelLine";

/**
 * Phone first, at display scale, above everything else. The form is the
 * secondary path — it exists mainly to unlock Google's "Online estimates"
 * attribute, which competing listings already have. Wired to Resend at
 * gate 6; this block links to it.
 */
export default function ContactBlock() {
  return (
    <section className="section surface-field" id="epikoinonia">
      <LevelLine />

      <div className="wrap section-head">
        <p className="label">{contactSection.eyebrow}</p>
        <h2 className="h2">{contactSection.heading}</h2>
        <p className="lede">
          <span className="measure">{contactSection.lede}</span>
        </p>
      </div>

      <div className="wrap contact-grid">
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

      <div className="wrap contact-quote">
        <a className="btn btn-call" href="/epikoinonia">
          {contactSection.quoteCta}
        </a>
        <p className="contact-quote-note">{contactSection.quoteNote}</p>
      </div>
    </section>
  );
}
