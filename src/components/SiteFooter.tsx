import { business } from "@/content/site";
import {
  dict,
  href,
  SERVICE_IDS,
  AREA_IDS,
  type Locale,
  type Route,
} from "@/content/i18n";
import { footerNav } from "@/content/i18n/nav";

/**
 * The footer, in the reader's language, with links that stay in it.
 *
 * EVERY COLUMN IS LINKS AGAIN. While the translations were single landing
 * pages, the service and area columns had to degrade to plain text outside
 * Greek — there was nowhere in English to send anyone. Now that all four
 * languages carry every page, a Serbian reader gets a Serbian footer whose
 * links go to Serbian pages, which is also where a large part of the site's
 * internal linking value lives.
 *
 * The five wider villages stay plain text in every language: they have no
 * pages by design (operations are identical everywhere, so a page each would
 * be five near-duplicates), and a link has to go somewhere. Naming them here
 * is what gives them a presence on every route.
 */
export default function SiteFooter({ lang = "el" }: { lang?: Locale }) {
  const t = dict(lang);

  const serviceLinks = SERVICE_IDS.map((id) => ({
    label: t.services[id].title,
    href: href(lang, { page: "service", id }),
  }));

  /**
   * Δασκάλων has no page of its own — honest copy would have duplicated
   * Μεταμόρφωση — but it is a place he works, so it keeps its name in the
   * list and points at the Μεταμόρφωση page.
   */
  const areaLinks = [
    { label: t.areas.metamorfosi.name, href: href(lang, { page: "area", id: "metamorfosi" }) },
    { label: t.daskalon.name, href: href(lang, { page: "area", id: "metamorfosi" }) },
    ...AREA_IDS.filter((id) => id !== "metamorfosi").map((id) => ({
      label: t.areas[id].name,
      href: href(lang, { page: "area", id }),
    })),
  ];

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-name">{business.legalName}</p>
        <p className="footer-rights">{t.chrome.footerRights}</p>

        <div className="footer-cols">
          <nav className="footer-col" aria-label={t.chrome.footerServices}>
            <h2 className="footer-heading">{t.chrome.footerServices}</h2>
            <ul>
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explicit village names. Blunt, but it is what ranks locally —
              and no competitor has a page per village. */}
          <nav className="footer-col" aria-label={t.chrome.footerAreas}>
            <h2 className="footer-heading">{t.chrome.footerAreas}</h2>
            <ul>
              {areaLinks.map((a) => (
                <li key={a.label}>
                  <a href={a.href}>{a.label}</a>
                </li>
              ))}
              {t.widerAreas.map((a) => (
                <li key={a.name}>
                  <span className="footer-static">{a.name}</span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">{t.chrome.footerContact}</h2>
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
              <li className="footer-static">{t.contactSection.baseValue}</li>
              <li className="footer-static">{t.contactSection.hoursValue}</li>
            </ul>
          </div>

          <nav className="footer-col" aria-label={t.chrome.footerPages}>
            <h2 className="footer-heading">{t.chrome.footerPages}</h2>
            <ul>
              {footerNav(lang).map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-legal">
          <a href={href(lang, { page: "privacy" } as Route)}>
            {t.chrome.privacyLabel}
          </a>
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
