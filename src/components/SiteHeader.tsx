import { business, wordmark, visibleNav } from "@/content/site";
import MobileNav from "./MobileNav";
import PhoneIcon from "./PhoneIcon";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        {/* Wordmark — PROPOSAL, not final. They have no logo. */}
        <a className="wordmark" href="/">
          <span className="wordmark-name">
            {/* The initials plus the surname stop fitting below 360px. */}
            <span className="hidden min-[360px]:inline">{wordmark.full}</span>
            <span className="min-[360px]:hidden">{wordmark.compact}</span>
          </span>
          <span className="wordmark-tagline">
            <span className="hidden min-[560px]:inline">{wordmark.tagline}</span>
            <span className="min-[560px]:hidden">{wordmark.taglineShort}</span>
          </span>
        </a>

        <div className="site-header-actions">
          {/* Inline links once there is room. The panel is the mobile layout,
              not a universal one — a hamburger on a 1280px screen hides
              navigation that fits perfectly well. */}
          <nav className="desk-nav" aria-label="Κύρια πλοήγηση">
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

          <a
            className="header-call"
            href={business.phone.href}
            aria-label={`Τηλέφωνο ${business.phone.display}`}
          >
            <PhoneIcon />
            <span className="hidden min-[560px]:inline num">
              {business.phone.display}
            </span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
