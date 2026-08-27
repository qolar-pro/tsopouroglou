import { business } from "@/content/site";
import { servicesPage } from "@/content/services";
import Band from "./Band";

/**
 * The closing call band, shared by every inner page. It inverts for the same
 * reason the homepage's contact section does: the phone is the conversion
 * event, and this is the only dark break in an otherwise continuous white
 * page, so it reads as the end of the argument rather than as decoration.
 */
export default function CallBand() {
  return (
    <Band label="ΤΗΛΕΦΩΝΟ" tone="ink">
      <h2 className="h2">{servicesPage.ctaHeading}</h2>
      <p className="lede">
        <span className="measure-prose">{servicesPage.ctaBody}</span>
      </p>
      <div className="band-cta">
        <a className="btn btn-call" href={business.phone.href}>
          ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
        </a>
        <a className="btn btn-secondary" href="/epikoinonia">
          Ζητήστε προσφορά
        </a>
      </div>
      <p className="small" style={{ marginTop: "var(--s-5)" }}>
        {business.hoursNote}. Σταθερό{" "}
        <a className="inline-link" href={business.landline.href}>
          <span className="num">{business.landline.display}</span>
        </a>
        .
      </p>
    </Band>
  );
}
