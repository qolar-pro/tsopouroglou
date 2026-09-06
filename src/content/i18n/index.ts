import type { Dictionary } from "./types";
import { el } from "./el";
import { en } from "./en";
import { sr } from "./sr";
import { mk } from "./mk";
import type { Locale } from "./locales";

export * from "./locales";
export * from "./paths";
export type { Dictionary, ServiceCopy, AreaCopy } from "./types";

/**
 * Every language's copy, and the one function that reaches it.
 *
 * `dict(locale)` is the only way a component gets a string. Nothing imports
 * el.ts, en.ts, sr.ts or mk.ts directly — that indirection is what lets the
 * same component render four languages instead of there being four
 * components.
 */
const DICTS: Record<Locale, Dictionary> = { el, en, sr, mk };

export const dict = (locale: Locale): Dictionary => DICTS[locale];

/* ------------------------------------------------------------------ */
/* Build-time completeness check.                                      */
/*                                                                     */
/* TypeScript already guarantees every locale has every FIELD. What it  */
/* cannot catch is a field left as the Greek original, or as an empty   */
/* string, because both are valid strings. Those are the two ways a     */
/* translation actually rots: a stub nobody came back to, and a value   */
/* copied from the language above it and never changed.                 */
/*                                                                     */
/* Checking every string would be noisy and would fight legitimate      */
/* cases (JCB is JCB in four languages). So this checks the fields      */
/* where an untranslated value is unambiguously a mistake: the ones a   */
/* reader sees first and a crawler indexes.                             */
/* ------------------------------------------------------------------ */
{
  const GREEK = /[Ͱ-Ͽἀ-῿]/;

  for (const locale of ["en", "sr", "mk"] as const) {
    const d = DICTS[locale];
    const fail = (what: string, why: string) => {
      throw new Error(`i18n/${locale}.ts: ${what} ${why}`);
    };

    const mustBeTranslated = (value: string, what: string) => {
      if (!value.trim()) fail(what, "is empty.");
      if (GREEK.test(value)) {
        fail(what, `still contains Greek text — "${value.slice(0, 60)}".`);
      }
    };

    mustBeTranslated(d.seo.title, "seo.title");
    mustBeTranslated(d.seo.description, "seo.description");
    mustBeTranslated(d.hero.headingLead, "hero.headingLead");
    mustBeTranslated(d.faqPage.h1, "faqPage.h1");
    mustBeTranslated(d.about.h1, "about.h1");
    mustBeTranslated(d.contact.h1, "contact.h1");
    mustBeTranslated(d.fleet.h1, "fleet.h1");
    mustBeTranslated(d.privacy.h1, "privacy.h1");
    mustBeTranslated(d.notFound.h1, "notFound.h1");

    for (const [id, s] of Object.entries(d.services)) {
      mustBeTranslated(s.title, `services.${id}.title`);
      mustBeTranslated(s.h1, `services.${id}.h1`);
      mustBeTranslated(s.metaTitle, `services.${id}.metaTitle`);
      mustBeTranslated(s.metaDescription, `services.${id}.metaDescription`);
      mustBeTranslated(s.lede, `services.${id}.lede`);
      if (s.includes.length === 0) fail(`services.${id}.includes`, "is empty.");
      if (s.ask.length === 0) fail(`services.${id}.ask`, "is empty.");
    }

    for (const [id, a] of Object.entries(d.areas)) {
      mustBeTranslated(a.h1, `areas.${id}.h1`);
      mustBeTranslated(a.metaDescription, `areas.${id}.metaDescription`);
      mustBeTranslated(a.lede, `areas.${id}.lede`);
      if (a.blocks.length === 0) fail(`areas.${id}.blocks`, "is empty.");
    }

    if (d.faqs.length === 0) fail("faqs", "is empty.");
    for (const [i, f] of d.faqs.entries()) {
      mustBeTranslated(f.q, `faqs[${i}].q`);
      mustBeTranslated(f.a, `faqs[${i}].a`);
    }

    if (d.buildJourney.steps.length === 0) fail("buildJourney.steps", "is empty.");
    mustBeTranslated(d.coverageSection.body, "coverageSection.body");
  }

  /**
   * The Macedonian page is Cyrillic. A Latin-script paragraph in it means a
   * line was pasted over from the Serbian file, which is the single most
   * likely way this particular pair goes wrong.
   */
  {
    const CYRILLIC = /[Ѐ-ӿ]/;
    const headline = [
      mk.hero.headingLead,
      mk.servicesSection.heading,
      mk.areasSection.heading,
      mk.about.h1,
      mk.faqPage.h1,
      mk.services.ekskafes.lede,
      mk.areas.metamorfosi.lede,
    ];
    for (const value of headline) {
      if (!CYRILLIC.test(value)) {
        throw new Error(
          `i18n/mk.ts: "${value.slice(0, 60)}" has no Cyrillic in it — ` +
            `Macedonian copy is written in Cyrillic. Was this pasted from sr.ts?`
        );
      }
    }
  }
}
