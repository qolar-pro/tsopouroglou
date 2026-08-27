import type { Metadata } from "next";
import { business } from "@/content/site";
import { services } from "@/content/services";
import { areaLinks } from "@/content/areas";
import Band from "@/components/Band";

export const metadata: Metadata = {
  title: "Η σελίδα δεν βρέθηκε | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  robots: { index: false, follow: true },
};

/**
 * 404, in Greek.
 *
 * Next's default is an unstyled English page, which for this audience is
 * indistinguishable from a broken site — and it is the one page where the
 * visitor already suspects something is wrong.
 *
 * So it does the same job every other page does rather than apologising: the
 * phone number first, then the eight services and the areas, because someone
 * who mistyped a URL is someone who was already looking for one of them.
 */
export default function NotFound() {
  return (
    <main>
      <Band label="404" head>
        <h1 className="h1">Η σελίδα δεν βρέθηκε</h1>
        <p className="lede">
          <span className="measure-prose">
            Ίσως αλλάξαμε τη διεύθυνση ή έγινε λάθος στην πληκτρολόγηση. Πάρτε
            μας τηλέφωνο και σας λέμε αμέσως ό,τι χρειάζεστε.
          </span>
        </p>

        <div className="band-cta">
          <a className="btn btn-call" href={business.phone.href}>
            ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
          </a>
          <a className="btn btn-secondary" href="/">
            Αρχική σελίδα
          </a>
        </div>
      </Band>

      <Band label="ΥΠΗΡΕΣΙΕΣ" tone="tone">
        <h2 className="h2">Μήπως ψάχνατε κάτι από αυτά;</h2>
        <ul className="places">
          {services.map((s) => (
            <li key={s.slug}>
              <a className="place" href={`/ypiresies/${s.slug}`}>
                <span className="place-name">{s.title}</span>
                <span className="place-body">{s.card}</span>
                <span aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <Band label="ΠΕΡΙΟΧΕΣ">
        <h2 className="h2">Ή την περιοχή σας</h2>
        <ul className="places">
          {areaLinks.map((a) => (
            <li key={a.name}>
              <a className="place" href={a.href}>
                <span className="place-name">{a.name}</span>
                <span className="place-body">{a.card}</span>
                <span aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Band>
    </main>
  );
}
