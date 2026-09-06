import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import { business } from "@/content/site";
import { epikoinonia } from "@/content/pages";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: epikoinonia.metaTitle,
  description: epikoinonia.metaDescription,
  alternates: pageAlternates("/epikoinonia"),
};

export default function Epikoinonia() {
  return (
    <main>
      {/* Phone first and at display scale, on the dark ground — the same
          closing treatment every other page ends on, moved to the top here
          because on this page it is the whole point. The form is secondary. */}
      <PageHero
        label={epikoinonia.eyebrow}
        title={<h1 className="h1">{epikoinonia.h1}</h1>}
        lede={epikoinonia.lede}
      />

      <Band label="ΣΤΟΙΧΕΙΑ" frame="panel" index="02">
        <h2 className="h2">Πώς θα μας βρείτε</h2>

        <div className="contact-grid">
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
      </Band>

      {/*
        No quote form. The brief's own finding was that for this audience the
        phone outperforms any form, and a form that is visible but not
        delivering reads as a broken site — worse than not having one. So the
        written path is a plain mailto, which needs no service, no API key and
        cannot silently fail.
      */}
      <Band label="ΠΡΟΣΦΟΡΑ" id="prosfora">
        <h2 className="h2">{epikoinonia.formHeading}</h2>
        <p className="lede">
          <span className="measure-prose">{epikoinonia.formLede}</span>
        </p>

        <div className="band-cta">
          <a className="btn btn-call" href={business.phone.href}>
            ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
          </a>
          <a className="btn btn-secondary" href={`mailto:${business.email}`}>
            Στείλτε email
          </a>
        </div>

        <p className="small" style={{ marginTop: "var(--s-5)" }}>
          {epikoinonia.askNote}
        </p>
      </Band>
    </main>
  );
}
