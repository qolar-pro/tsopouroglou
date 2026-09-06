import { business } from "@/content/site";
import { CHROME, type Locale } from "@/content/i18n";
import PhoneIcon from "./PhoneIcon";

/**
 * Persistent bottom call bar. For this audience — mostly 40+, on a phone,
 * not tech people — this will outperform any form, so it is present at every
 * scroll position on every page. Hidden at >=940px, where the header goes
 * sticky and carries the number instead.
 *
 * A real <a href="tel:">, never a JS handler. `body` carries matching bottom
 * padding so it never covers a form's submit button.
 *
 * The label is localised: this bar sits on /en and /sr too, where it used to
 * read ΤΗΛΕΦΩΝΟ at a reader who cannot read Greek.
 */
export default function StickyCallBar({ lang = "el" }: { lang?: Locale }) {
  const c = CHROME[lang];

  return (
    <div className="sticky-call">
      <a className="sticky-call-link" href={business.phone.href}>
        <PhoneIcon size={19} />
        <span>
          <span className="sticky-call-label">{c.phoneLabel}</span>
          <span className="sticky-call-number">{business.phone.display}</span>
        </span>
      </a>
    </div>
  );
}
