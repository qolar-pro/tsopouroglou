import { services } from "@/content/services";
import { areaLinks } from "@/content/areas";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";

/**
 * The body of the 404, shared by two callers.
 *
 * (el)/not-found.tsx handles a `notFound()` thrown inside the Greek group —
 * an unknown service or area slug. app/global-not-found.tsx handles a URL
 * that matches no route at all, which since the site gained two root layouts
 * has no layout to compose itself from and so must supply its own <html>.
 *
 * Both need identical content, and a 404 that drifts between two copies is a
 * 404 nobody notices has drifted. One component, two shells.
 *
 * It does the same job every other page does rather than apologising: the
 * phone first, then the services and the areas, because someone who mistyped
 * a URL was already looking for one of them.
 */
export default function NotFoundBody() {
  return (
    <main>
      <PageHero
        label="404"
        title={<h1 className="h1">Η σελίδα δεν βρέθηκε</h1>}
        lede="Ίσως αλλάξαμε τη διεύθυνση ή έγινε λάθος στην πληκτρολόγηση. Πάρτε μας τηλέφωνο και σας λέμε αμέσως ό,τι χρειάζεστε."
      />

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
