import type { Metadata } from "next";
import { business } from "@/content/site";
import { epikoinonia } from "@/content/pages";
import QuoteForm from "@/components/QuoteForm";
import LevelLine from "@/components/LevelLine";

export const metadata: Metadata = {
  title: epikoinonia.metaTitle,
  description: epikoinonia.metaDescription,
  alternates: { canonical: "/epikoinonia" },
};

export default function Epikoinonia() {
  return (
    <main>
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">{epikoinonia.eyebrow}</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            {epikoinonia.h1}
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">{epikoinonia.lede}</span>
          </p>

          {/* Phone first and at display scale. The form is secondary. */}
          <div className="contact-grid" style={{ marginTop: "var(--s-7)" }}>
            <a className="contact-primary" href={business.phone.href}>
              <span className="contact-label">Κινητό</span>
              <span className="contact-number">{business.phone.display}</span>
            </a>
            <div>
              <a className="contact-row" href={business.landline.href}>
                <span className="contact-label">Σταθερό</span>
                <span className="contact-value num">
                  {business.landline.display}
                </span>
              </a>
              <a className="contact-row" href={`mailto:${business.email}`}>
                <span className="contact-label">Email</span>
                <span className="contact-value contact-value-email">
                  {business.email}
                </span>
              </a>
              <div className="contact-row">
                <span className="contact-label">Βάση</span>
                <span className="contact-value">
                  {business.address.locality} {business.address.postalCode},{" "}
                  {business.address.region}
                </span>
              </div>
              <div className="contact-row">
                <span className="contact-label">Ωράριο</span>
                <span className="contact-value">{business.hoursNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section surface-raised" id="prosfora">
        <LevelLine />
        <div className="wrap detail-cols">
          <div>
            <h2 className="h2">{epikoinonia.formHeading}</h2>
            <p className="lede" style={{ marginTop: "var(--s-4)" }}>
              <span className="measure">{epikoinonia.formLede}</span>
            </p>
          </div>
          <div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
