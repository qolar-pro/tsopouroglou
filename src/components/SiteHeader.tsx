import { business, wordmark } from "@/content/site";
import { dict, href, type Locale } from "@/content/i18n";
import { headerNav } from "@/content/i18n/nav";
import MobileNav from "./MobileNav";
import Mark from "./Mark";
import LangSwitch from "./LangSwitch";
import PhoneIcon from "./PhoneIcon";

/**
 * The language switcher reads the current path itself (it is the site's one
 * client component besides the nav panel), so the header does not have to
 * know which page is rendering inside the layout.
 *
 * The wordmark NAME stays Greek in every language. It is the family's name
 * over the door — ΤΣΟΠΟΥΡΟΓΛΟΥ is what is written on the machines and what
 * a neighbour would tell you to ask for. Only the line under it, which
 * describes the trade, is translated.
 */
export default function SiteHeader({ lang = "el" }: { lang?: Locale }) {
  const t = dict(lang);
  const nav = headerNav(lang);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        {/* Wordmark — PROPOSAL, not final. They have no logo. */}
        <a className="wordmark" href={href(lang, { page: "home" })}>
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
              <span className="hidden min-[560px]:inline">{t.tagline.full}</span>
              <span className="min-[560px]:hidden">{t.tagline.short}</span>
            </span>
          </span>
        </a>

        <div className="site-header-actions">
          {/* Inline links once there is room. The panel is the mobile layout,
              not a universal one — a hamburger on a 1280px screen hides
              navigation that fits perfectly well. */}
          <nav className="desk-nav" aria-label={t.chrome.navAria}>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <LangSwitch />

          <a
            className="header-call"
            href={business.phone.href}
            aria-label={`${t.chrome.phoneAria} ${business.phone.display}`}
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
