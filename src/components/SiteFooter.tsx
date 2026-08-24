import { business, services, footer, visibleNav } from "@/content/site";
import { areaLinks } from "@/content/areas";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-name">{business.legalName}</p>
        <p className="footer-rights">{footer.rights}</p>

        <div className="footer-cols">
          <nav className="footer-col" aria-label={footer.servicesHeading}>
            <h2 className="footer-heading">{footer.servicesHeading}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`/ypiresies/${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explicit village names. Blunt, but it is what ranks locally —
              and no competitor has a page per village. */}
          <nav className="footer-col" aria-label={footer.areasHeading}>
            <h2 className="footer-heading">{footer.areasHeading}</h2>
            <ul>
              {areaLinks.map((a) => (
                <li key={a.name}>
                  <a href={a.href}>{a.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">{footer.contactHeading}</h2>
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
                {business.address.locality} {business.address.postalCode},{" "}
                {business.address.region}
              </li>
              <li className="footer-static">{business.hoursNote}</li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="Σελίδες">
            <h2 className="footer-heading">Σελίδες</h2>
            <ul>
              {visibleNav
                .filter((n) => n.href !== "/")
                .map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        <div className="footer-legal">
          <a href="/politiki-aporritou">{footer.privacyLabel}</a>
          <span className="footer-vat">
            {footer.vatLabel}: {business.vat}
          </span>
        </div>
      </div>
    </footer>
  );
}
