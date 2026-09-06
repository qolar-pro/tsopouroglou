/**
 * Locales, and the URL vocabulary of each one.
 *
 * FOUR LANGUAGES. Greek is the site; English, Serbian and Macedonian are full
 * mirrors of it — every route, not a summary page. Chalkidiki is full of
 * foreign holiday-home owners, and they need the same nine services, the same
 * villages and the same phone number the Greek pages carry.
 *
 * GREEK HAS NO PREFIX. It lives at the root and its URLs are already indexed;
 * moving them to /el would throw away every ranking signal the site has. The
 * translations take a prefix.
 *
 * SLUGS ARE TRANSLATED TOO. `/en/services/excavation`, not
 * `/en/ypiresies/ekskafes` — a Greek slug is noise to somebody who cannot
 * read Greek, and the words in a URL are read by both people and crawlers.
 * The cost is that every path is now a lookup rather than a literal, which is
 * what `paths.ts` exists to do, and what the build-time guard at the bottom
 * of this file protects: a missing or duplicated slug fails the build instead
 * of shipping a 404.
 *
 * MACEDONIAN IS CYRILLIC. Copy is written in Cyrillic, which is the standard
 * script and what Macedonians actually search in. The URL slugs stay ASCII
 * Latin — a percent-encoded Cyrillic path is unreadable when shared in a
 * message, which for this audience is how links actually travel.
 *
 * IDs ARE THE GREEK SLUGS. Every service and area keeps one stable internal
 * id across all four languages, and the id is the Greek slug because Greek is
 * the source. Translating an id would mean four sets of ids for one thing.
 */

export type Locale = "el" | "en" | "sr" | "mk";

export const LOCALES = ["el", "en", "sr", "mk"] as const;

/** Translated locales only — Greek is the root site, not a translation. */
export const TRANSLATED = ["en", "sr", "mk"] as const;
export type Translated = (typeof TRANSLATED)[number];

export const isTranslated = (v: string): v is Translated =>
  (TRANSLATED as readonly string[]).includes(v);

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

/** What the switcher shows. */
export const LOCALE_LABEL: Record<Locale, string> = {
  el: "ΕΛ",
  en: "EN",
  sr: "SR",
  mk: "MK",
};

/** Each language named in its own language, for the switcher's title text. */
export const LOCALE_NAME: Record<Locale, string> = {
  el: "Ελληνικά",
  en: "English",
  sr: "Srpski",
  mk: "Македонски",
};

/**
 * BCP-47, for <html lang> and hreflang.
 *
 * Serbian is tagged sr-Latn because it is written here in Latin script and
 * Serbian is genuinely digraphic — an untagged `sr` leaves a search engine to
 * guess which script the page is in. Macedonian has one script in practice,
 * so plain `mk` is right.
 */
export const LOCALE_TAG: Record<Locale, string> = {
  el: "el",
  en: "en",
  sr: "sr-Latn",
  mk: "mk",
};

/** og:locale. */
export const OG_LOCALE: Record<Locale, string> = {
  el: "el_GR",
  en: "en_GB",
  sr: "sr_RS",
  mk: "mk_MK",
};

/** Greek lives at the root; the other three take a prefix. */
export const localeRoot = (l: Locale) => (l === "el" ? "/" : `/${l}`);

/* ------------------------------------------------------------------ */
/* Route segments                                                      */
/* ------------------------------------------------------------------ */

/** The page kinds that have their own route. */
export type PageKey =
  | "home"
  | "services"
  | "areas"
  | "fleet"
  | "about"
  | "contact"
  | "faq"
  | "privacy";

/**
 * The first path segment for each page, per locale.
 *
 * `home` has no segment. Everything else is one segment under the locale
 * root, and service and area detail pages hang off `services` and `areas`.
 */
export const SEGMENT: Record<Locale, Record<Exclude<PageKey, "home">, string>> =
  {
    el: {
      services: "ypiresies",
      areas: "perioxes",
      fleet: "exoplismos",
      about: "etaireia",
      contact: "epikoinonia",
      faq: "syhnes-erotiseis",
      privacy: "politiki-aporritou",
    },
    en: {
      services: "services",
      areas: "areas",
      fleet: "fleet",
      about: "about",
      contact: "contact",
      faq: "faq",
      privacy: "privacy",
    },
    sr: {
      services: "usluge",
      areas: "podrucja",
      fleet: "oprema",
      about: "o-nama",
      contact: "kontakt",
      faq: "pitanja",
      privacy: "privatnost",
    },
    mk: {
      services: "uslugi",
      areas: "podracja",
      fleet: "oprema",
      about: "za-nas",
      contact: "kontakt",
      faq: "prasanja",
      privacy: "privatnost",
    },
  };

/* ------------------------------------------------------------------ */
/* Entity slugs                                                        */
/* ------------------------------------------------------------------ */

/** Canonical service ids — the Greek slugs, stable across every language. */
export const SERVICE_IDS = [
  "ekskafes",
  "katharismos-oikopedon",
  "vothroi",
  "ekvrachismoi",
  "katedafiseis",
  "katharismos-paralias",
  "metafores-chomaton",
  "choma-kipou",
  "syndeseis-nerou-apocheteusi",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_SLUG: Record<Locale, Record<ServiceId, string>> = {
  el: {
    ekskafes: "ekskafes",
    "katharismos-oikopedon": "katharismos-oikopedon",
    vothroi: "vothroi",
    ekvrachismoi: "ekvrachismoi",
    katedafiseis: "katedafiseis",
    "katharismos-paralias": "katharismos-paralias",
    "metafores-chomaton": "metafores-chomaton",
    "choma-kipou": "choma-kipou",
    "syndeseis-nerou-apocheteusi": "syndeseis-nerou-apocheteusi",
  },
  en: {
    ekskafes: "excavation",
    "katharismos-oikopedon": "land-clearing",
    vothroi: "septic-tanks",
    ekvrachismoi: "rock-breaking",
    katedafiseis: "demolition",
    "katharismos-paralias": "beach-cleaning",
    "metafores-chomaton": "soil-haulage",
    "choma-kipou": "garden-topsoil",
    "syndeseis-nerou-apocheteusi": "water-and-sewer-connections",
  },
  sr: {
    ekskafes: "iskopi",
    "katharismos-oikopedon": "ciscenje-placeva",
    vothroi: "septicke-jame",
    ekvrachismoi: "drobljenje-stena",
    katedafiseis: "rusenje",
    "katharismos-paralias": "ciscenje-plaze",
    "metafores-chomaton": "prevoz-zemlje",
    "choma-kipou": "bastenska-zemlja",
    "syndeseis-nerou-apocheteusi": "vodovod-i-kanalizacija",
  },
  mk: {
    ekskafes: "iskopi",
    "katharismos-oikopedon": "ciscenje-placevi",
    vothroi: "septicki-jami",
    ekvrachismoi: "krsenje-karpi",
    katedafiseis: "rusenje",
    "katharismos-paralias": "ciscenje-plaza",
    "metafores-chomaton": "prevoz-zemja",
    "choma-kipou": "gradinarska-zemja",
    "syndeseis-nerou-apocheteusi": "vodovod-i-kanalizacija",
  },
};

/** Canonical area ids. */
export const AREA_IDS = [
  "metamorfosi",
  "nikiti",
  "vatopedi",
  "psakoudia",
] as const;
export type AreaId = (typeof AREA_IDS)[number];

/**
 * Area slugs are the SAME in every language, on purpose.
 *
 * They are place names, and a village does not get a different name because
 * the sentence around it changed language. Transliterating Νικήτη to
 * "nikiti" is already the Latin form every language here uses; inventing
 * per-language variants would split one place into four URLs for nothing.
 */
export const AREA_SLUG: Record<Locale, Record<AreaId, string>> = {
  el: { metamorfosi: "metamorfosi", nikiti: "nikiti", vatopedi: "vatopedi", psakoudia: "psakoudia" },
  en: { metamorfosi: "metamorfosi", nikiti: "nikiti", vatopedi: "vatopedi", psakoudia: "psakoudia" },
  sr: { metamorfosi: "metamorfosi", nikiti: "nikiti", vatopedi: "vatopedi", psakoudia: "psakoudia" },
  mk: { metamorfosi: "metamorfosi", nikiti: "nikiti", vatopedi: "vatopedi", psakoudia: "psakoudia" },
};

/* ------------------------------------------------------------------ */
/* Build-time integrity                                                */
/*                                                                     */
/* Same standard as the related-slug guard in services.ts. A missing or */
/* duplicated slug in any of four languages is invisible until someone  */
/* clicks it, and a 404 on a translated page is worse than no page —    */
/* Google has already indexed it by the time anyone notices.            */
/* ------------------------------------------------------------------ */
{
  for (const locale of LOCALES) {
    const seen = new Map<string, string>();

    const claim = (slug: string, what: string) => {
      if (!slug) {
        throw new Error(`locales.ts: empty slug for ${what} in "${locale}".`);
      }
      if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new Error(
          `locales.ts: slug "${slug}" (${what}, "${locale}") must be lowercase ASCII, digits and hyphens — ` +
            `a percent-encoded URL is unreadable when someone shares the link in a message.`
        );
      }
      const prior = seen.get(slug);
      if (prior) {
        throw new Error(
          `locales.ts: "${locale}" uses the slug "${slug}" for both ${prior} and ${what}. ` +
            `Two pages cannot share a URL.`
        );
      }
      seen.set(slug, what);
    };

    // Top-level segments share one namespace: /en/services and /en/about are
    // siblings, so they must not collide with each other.
    for (const [key, slug] of Object.entries(SEGMENT[locale])) {
      claim(slug, `segment "${key}"`);
    }

    // Service slugs share a namespace with each other, and area slugs with
    // each other — but not with the segments, since they sit one level down.
    const serviceSeen = new Set<string>();
    for (const id of SERVICE_IDS) {
      const slug = SERVICE_SLUG[locale][id];
      if (!slug) throw new Error(`locales.ts: no "${locale}" slug for service "${id}".`);
      if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new Error(`locales.ts: service slug "${slug}" ("${locale}") must be lowercase ASCII.`);
      }
      if (serviceSeen.has(slug)) {
        throw new Error(`locales.ts: duplicate "${locale}" service slug "${slug}".`);
      }
      serviceSeen.add(slug);
    }

    const areaSeen = new Set<string>();
    for (const id of AREA_IDS) {
      const slug = AREA_SLUG[locale][id];
      if (!slug) throw new Error(`locales.ts: no "${locale}" slug for area "${id}".`);
      if (areaSeen.has(slug)) {
        throw new Error(`locales.ts: duplicate "${locale}" area slug "${slug}".`);
      }
      areaSeen.add(slug);
    }
  }
}
