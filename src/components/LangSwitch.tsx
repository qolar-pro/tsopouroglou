import { LOCALES, LOCALE_LABEL, LOCALE_NAME, localeHref } from "@/content/i18n";
import type { Locale } from "@/content/i18n";

/**
 * The language switcher.
 *
 * Plain links, no client JS — it is three anchors, and making it a dropdown
 * would cost a hydration boundary for nothing.
 *
 * Every language always points at that language's landing page rather than at
 * a translation of the current URL, because the translations are single pages
 * and there is no /en/ypiresies/vothroi to send anyone to. Pretending
 * otherwise would produce 404s from the one control whose whole job is to get
 * a lost visitor somewhere they can read.
 *
 * `hrefLang` and a full-name title are set so a screen reader and a crawler
 * both know what each link leads to — "EN" alone says nothing out loud.
 */
export default function LangSwitch({ current }: { current: Locale }) {
  return (
    <nav className="langswitch" aria-label="Language">
      <ul>
        {LOCALES.map((l) => {
          const isCurrent = l === current;
          return (
            <li key={l}>
              <a
                href={localeHref(l)}
                hrefLang={l}
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
