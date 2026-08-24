import { business } from "@/content/site";
import { servicesPage } from "@/content/services";
import LevelLine from "./LevelLine";

/**
 * The closing call band, shared by every service page. The phone is the
 * conversion event, so it ends the page the way it opens it.
 */
export default function CallBand() {
  return (
    <section className="section surface-raised">
      <LevelLine />
      <div className="wrap">
        <h2 className="h2">{servicesPage.ctaHeading}</h2>
        <p className="lede" style={{ marginTop: "var(--s-4)" }}>
          <span className="measure">{servicesPage.ctaBody}</span>
        </p>
        <div className="band-cta">
          <a className="btn btn-call" href={business.phone.href}>
            ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
          </a>
          <a className="btn btn-secondary" href="/epikoinonia">
            Ζητήστε προσφορά
          </a>
        </div>
        <p className="small" style={{ marginTop: "var(--s-4)" }}>
          {business.hoursNote}. Σταθερό{" "}
          <a className="inline-link" href={business.landline.href}>
            <span className="num">{business.landline.display}</span>
          </a>
          .
        </p>
      </div>
    </section>
  );
}
