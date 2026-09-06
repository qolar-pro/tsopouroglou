import { business, services, visibleNav } from "@/content/site";
import { areaLinks, widerAreas } from "@/content/areas";
import { CHROME, T, type Locale, type Translated } from "@/content/i18n";

/**
 * The footer, in the reader's language.
 *
 * This was Greek on every route. On /en and /sr it printed Υπηρεσίες,
 * Περιοχές, Επικοινωνία and a Greek rights line under an English page — the
 * single most visible remnant of the site's Greek frame.
 *
 * GREEK LINKS, TRANSLATED TEXT. In Greek the service and area columns are
 * links to their nineteen pages, which is where a lot of the internal linking
 * value lives. In the translations those same pages do not exist, so the
 * columns become plain text rather than links into Greek content the reader
 * cannot use. The one exception is the privacy policy: it is legally required
 * to be reachable, so it stays a link and is labelled as being in Greek.
 */
export default function SiteFooter({ lang = "el" }: { lang?: Locale }) {
  const c = CHROME[lang];
  const isGreek = lang === "el";
  const t = isGreek ? null : T[lang as Translated];

  /** Greek: linked service pages. Translations: the translated names. */
  const serviceItems = isGreek
    ? services.map((s) => ({ label: s.title, href: `/ypiresies/${s.slug}` }))
    : t!.services.map((s) => ({ label: s.title, href: null }));

  /**
   * The four villages with pages are links; the five wider ones are plain
   * text in the same column.
   *
   * They have no pages by design (see widerAreas in areas.ts), but the footer
   * is the one component on every route, so listing them here is what gives
   * Πολύγυρος, Ορμύλια, Μεταγγίτσι, Γερακινή and Άγιος Νικόλαος a presence
   * across the whole site rather than on the three pages that name them in
   * prose. Plain text, because a link has to go somewhere.
   */
  const areaItems = isGreek
    ? [
        ...areaLinks.map((a) => ({ label: a.name, href: a.href as string | null })),
        ...widerAreas.map((a) => ({ label: a.name, href: null })),
      ]
    : t!.areas.map((a) => ({ label: a.name, href: null }));

  /** Greek: the real routes. Translations: anchors within the one page. */
  const pageItems = c.nav ?? visibleNav.filter((n) => n.href !== "/");

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-name">{business.legalName}</p>
        <p className="footer-rights">{c.footerRights}</p>

        <div className="footer-cols">
          <nav className="footer-col" aria-label={c.footerServices}>
            <h2 className="footer-heading">{c.footerServices}</h2>
            <ul>
              {serviceItems.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href}>{s.label}</a>
                  ) : (
                    <span className="footer-static">{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Explicit village names. Blunt, but it is what ranks locally —
              and no competitor has a page per village. */}
          <nav className="footer-col" aria-label={c.footerAreas}>
            <h2 className="footer-heading">{c.footerAreas}</h2>
            <ul>
              {areaItems.map((a) => (
                <li key={a.label}>
                  {a.href ? (
                    <a href={a.href}>{a.label}</a>
                  ) : (
                    <span className="footer-static">{a.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">{c.footerContact}</h2>
            <ul>
              <li>
                <a href={business.phone.href}>{business.phone.display}</a>
              </li>
              <li>
                <a href={business.landline.href}>{business.landline.display}</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="footer-email">
                  {business.email}
                </a>
              </li>
              <li className="footer-static">
                {isGreek
                  ? `${business.address.locality} ${business.address.postalCode}, ${business.address.region}`
                  : t!.baseValue}
              </li>
              <li className="footer-static">
                {isGreek ? business.hoursNote : t!.hours}
              </li>
            </ul>
          </div>

          <nav className="footer-col" aria-label={c.footerPages}>
            <h2 className="footer-heading">{c.footerPages}</h2>
            <ul>
              {pageItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-legal">
          <a href="/politiki-aporritou">{c.privacyLabel}</a>
          {/* Says outright that the policy is in Greek, rather than sending a
              Serbian reader to a wall of Greek with no warning. */}
          {c.privacyNote ? (
            <span className="footer-static"> {c.privacyNote}</span>
          ) : null}
          {/* ΑΦΜ deliberately omitted — client's decision. It rendered as the
              literal "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]" token, which on a live site looks
              broken rather than pending. Business identification is expected
              of a Greek commercial site (Π.Δ. 131/2003), so this is worth
              revisiting; the label and the field are still in content, so
              restoring it is one line. */}
        </div>
      </div>
    </footer>
  );
}
