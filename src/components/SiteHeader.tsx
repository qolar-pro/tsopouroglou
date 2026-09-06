import { business, wordmark, headerNav } from "@/content/site";
import { CHROME, localeHref, type Locale } from "@/content/i18n";
import MobileNav from "./MobileNav";
import Mark from "./Mark";
import LangSwitch from "./LangSwitch";
import PhoneIcon from "./PhoneIcon";

/**
 * NAV DIFFERS BY LOCALE, DELIBERATELY.
 *
 * Greek gets the real routes. The translated locales get in-page anchors,
 * because all nineteen content routes are Greek-only — an English nav item
 * reading "Services" that drops the reader onto a Greek page is worse than no
 * nav item at all. `CHROME[lang].nav` is null for Greek, meaning "use the
 * real routes"; the translations supply their own anchor list.
 *
 * The wordmark links to the current language's home, not always "/", so a
 * Serbian reader who taps the logo does not silently land on the Greek site.
 */
export default function SiteHeader({ lang = "el" }: { lang?: Locale }) {
  const c = CHROME[lang];
  const navItems = c.nav ?? headerNav.filter((n) => n.href !== "/");

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        {/* Wordmark — PROPOSAL, not final. They have no logo. */}
        <a className="wordmark" href={localeHref(lang)}>
          <Mark size={34} />
          {/* The name and tagline stay stacked; only the mark sits beside
              them. Without this wrapper the flex row lays all three out
              horizontally and the name wraps onto two lines. */}
          <span className="wordmark-text">
            <span className="wordmark-name">
              {/* The initials plus the surname stop fitting below 360px. */}
              <span className="hidden min-[360px]:inline">{wordmark.full}</span>
              <span className="min-[360px]:hidden">{wordmark.compact}</span>
            </span>
            <span className="wordmark-tagline">
              <span className="hidden min-[560px]:inline">{c.taglineFull}</span>
              <span className="min-[560px]:hidden">{c.taglineShort}</span>
            </span>
          </span>
        </a>

        <div className="site-header-actions">
          {/* Inline links once there is room. The panel is the mobile layout,
              not a universal one — a hamburger on a 1280px screen hides
              navigation that fits perfectly well. */}
          <nav className="desk-nav" aria-label={c.navAria}>
            <ul>
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <LangSwitch current={lang} />

          <a
            className="header-call"
            href={business.phone.href}
            aria-label={`${c.phoneAria} ${business.phone.display}`}
          >
            <PhoneIcon />
            <span className="hidden min-[560px]:inline num">
              {business.phone.display}
            </span>
          </a>
          <MobileNav lang={lang} />
        </div>
      </div>
    </header>
  );
}
