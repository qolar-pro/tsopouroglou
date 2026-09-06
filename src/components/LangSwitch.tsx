"use client";

import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_NAME,
  LOCALE_TAG,
  href,
  resolve,
  isLocale,
  type Locale,
  type Route,
} from "@/content/i18n";

/**
 * The language switcher.
 *
 * IT SWITCHES THE PAGE, NOT THE SITE. It used to send every language to that
 * language's home page, because the translations were a single landing page
 * each and there was no /en/ypiresies/vothroi to point at — so a reader deep
 * in the septic-tank page who wanted English was dropped at the top and had
 * to find their way back.
 *
 * Every page now exists in all four languages and routes are ids rather than
 * paths, so the switcher hands each language the SAME page.
 *
 * WHY THIS IS A CLIENT COMPONENT — the one place on the site where that is
 * the simpler answer. The switcher lives in the header, which lives in the
 * layout, and a layout in the App Router cannot know which page is rendering
 * inside it. Threading the current route down from every one of the twenty
 * route files would put the same three lines in twenty places and break
 * silently the first time somebody added a page and forgot. `usePathname`
 * reads it directly.
 *
 * If the path does not resolve — a 404, or some URL that is not one of ours —
 * it falls back to each language's home page, which is the old behaviour and
 * the right one there.
 */

/** Split a pathname into its locale and the route it names. */
function readPath(pathname: string): { locale: Locale; route: Route } {
  const parts = pathname.split("/").filter(Boolean);
  const maybeLocale = parts[0] ?? "";
  const locale: Locale =
    isLocale(maybeLocale) && maybeLocale !== "el" ? maybeLocale : "el";
  const rest = locale === "el" ? parts : parts.slice(1);
  return { locale, route: resolve(locale, rest) ?? { page: "home" } };
}

export default function LangSwitch() {
  const pathname = usePathname() ?? "/";
  const { locale: current, route } = readPath(pathname);

  return (
    <nav className="langswitch" aria-label="Language">
      <ul>
        {LOCALES.map((l) => {
          const isCurrent = l === current;
          return (
            <li key={l}>
              <a
                href={href(l, route)}
                hrefLang={LOCALE_TAG[l]}
                title={LOCALE_NAME[l]}
                aria-current={isCurrent ? "true" : undefined}
                data-current={isCurrent ? "true" : undefined}
              >
                <span aria-hidden="true">{LOCALE_LABEL[l]}</span>
                <span className="sr-only">{LOCALE_NAME[l]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
