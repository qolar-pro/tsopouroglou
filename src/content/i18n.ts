/**
 * English and Serbian.
 *
 * WHY THESE TWO, AND WHY ONE PAGE EACH
 *
 * Chalkidiki is full of foreign holiday-home owners — Serbian above all, then
 * Bulgarian and North Macedonian — and they need exactly what he does: plot
 * clearing, yard work, beach cleaning before the season. They are a real
 * market the Greek site cannot reach.
 *
 * But they do not need eight separate service pages in translation. They need
 * to know who he is, that he has worked this ground since 1987, what he can
 * do, where he goes, and the number to call. One strong page answers that;
 * thirty-eight thin translated pages would rank worse and read worse.
 *
 * SERBIAN IS IN LATIN SCRIPT. Serbian is written in both Cyrillic and Latin
 * and neither is wrong, but Latin is readable by Serbian, Bulgarian and
 * Macedonian speakers alike, which widens the reach of the one page we have.
 * Cyrillic would narrow it.
 *
 * "Slavic" is not a language. Serbian, Bulgarian and Macedonian are three
 * distinct languages; this offers Serbian only, and says so, rather than
 * implying one page serves all three.
 *
 * The trade vocabulary is the risk here, not the grammar — septic tanks and
 * rock breaking have specific trade meanings, and a wrong word makes him look
 * amateur to precisely the customer this is meant to win. WORTH A NATIVE
 * CHECK before pointing any advertising at the Serbian page.
 */

export type Locale = "el" | "en" | "sr";

export const LOCALES = ["el", "en", "sr"] as const;

/** Translated locales only — Greek is the root site, not a translation. */
export const TRANSLATED = ["en", "sr"] as const;
export type Translated = (typeof TRANSLATED)[number];

/** What the switcher shows. */
export const LOCALE_LABEL: Record<Locale, string> = {
  el: "ΕΛ",
  en: "EN",
  sr: "SR",
};

/** Each language named in its own language, for the switcher's title text. */
export const LOCALE_NAME: Record<Locale, string> = {
  el: "Ελληνικά",
  en: "English",
  sr: "Srpski",
};

/** Greek lives at the root; the other two take a prefix. */
export const localeHref = (l: Locale) => (l === "el" ? "/" : `/${l}`);

/** BCP-47, for <html lang> and hreflang. */
export const LOCALE_TAG: Record<Locale, string> = {
  el: "el",
  en: "en",
  sr: "sr-Latn",
};

export type Translation = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headingLead: string;
  since: string;
  lede: string;
  callLabel: string;
  quoteLabel: string;
  hours: string;
  noticeHeading: string;
  notice: string;
  servicesHeading: string;
  servicesLede: string;
  services: { title: string; body: string }[];
  areasHeading: string;
  areasLede: string;
  priorityLabel: string;
  areas: { name: string; body: string; priority?: boolean }[];
  whyHeading: string;
  why: { figure: string; title: string; body: string }[];
  contactHeading: string;
  contactLede: string;
  mobileLabel: string;
  landlineLabel: string;
  emailLabel: string;
  baseLabel: string;
  baseValue: string;
  hoursLabel: string;
  emailCta: string;
  workHeading: string;
  workLede: string;
};

export const T: Record<Translated, Translation> = {
  en: {
    metaTitle: "Earthworks in Halkidiki since 1987 | TSOPOUROGLOU",
    metaDescription:
      "Family earthworks business in Metamorfosi, Halkidiki, on the same ground since 1987. Excavation, land clearing, septic tanks, rock breaking, beach cleaning. Call 697 355 7903.",
    eyebrow: "EARTHWORKS · HALKIDIKI",
    headingLead: "We have dug this ground since",
    since: "1987",
    lede: "Two brothers, one village, the same name for nearly forty years. If you own a plot or a holiday home in Halkidiki, we can clear it, dig it, or get it ready to build on.",
    callLabel: "CALL",
    quoteLabel: "Send an email",
    hours: "We answer the phone around the clock, every day.",
    noticeHeading: "About this page",
    notice:
      "This is a summary in English. The rest of the site is in Greek — but you do not need it to call. Tell us the job and the village, and we will tell you what it needs and what it costs.",
    servicesHeading: "What we do",
    servicesLede: "Eight jobs. These we do, and these we know.",
    services: [
      {
        title: "Excavation",
        body: "Foundations, basements, trenches. Three excavators — a large one for a building site, a small one for tight access.",
      },
      {
        title: "Land clearing",
        body: "Dry brush, scrub, rubble. A clean plot, ready to build on or to sell.",
      },
      {
        title: "Septic tanks",
        body: "Built from the excavation through to the cover. We build them; we do not empty them.",
      },
      {
        title: "Rock breaking",
        body: "Rock in the middle of your plot? We break it out and take it away.",
      },
      {
        title: "Beach cleaning",
        body: "Seaweed, driftwood, stones. A clean shoreline before the season and during it.",
      },
      {
        title: "Soil and spoil haulage",
        body: "Our own trucks for soil, rubble and gravel. Loading and transport.",
      },
      {
        title: "Garden topsoil",
        body: "Topsoil laid and levelled, ready for lawn or planting.",
      },
      {
        title: "Water and sewer connections",
        body: "Digging, connection, backfill. Mains water and drainage.",
      },
    ],
    areasHeading: "Where we work",
    areasLede:
      "Metamorfosi and the Daskalon settlement are home ground — we get there first. We also work in Nikiti, Vatopedi and Psakoudia.",
    priorityLabel: "HOME GROUND",
    areas: [
      {
        name: "Metamorfosi",
        body: "Our base. We have worked here since 1987 and the machines are in the village.",
        priority: true,
      },
      {
        name: "Daskalon settlement",
        body: "Next door, and ours since 1987 as well. Same priority as Metamorfosi.",
        priority: true,
      },
      { name: "Nikiti", body: "We come to Nikiti with whichever machine the job needs." },
      { name: "Vatopedi", body: "Plots, yards and shoreline clearing in Vatopedi." },
      { name: "Psakoudia", body: "Plots, yards and shoreline clearing in Psakoudia." },
    ],
    whyHeading: "Why us",
    why: [
      {
        figure: "1987",
        title: "The same ground since 1987",
        body: "Same family, same village, two brothers.",
      },
      {
        figure: "1990",
        title: "Licensed operator since 1990",
        body: "Certified plant operator.",
      },
      {
        figure: "24",
        title: "Phone answered around the clock",
        body: "A burst pipe does not wait for office hours.",
      },
      {
        figure: "3",
        title: "Three excavators — large, medium, small",
        body: "For a big site and for a narrow yard.",
      },
    ],
    contactHeading: "Call us",
    contactLede:
      "Tell us what the job is and where. We will tell you what it needs and what it costs.",
    mobileLabel: "Mobile",
    landlineLabel: "Landline",
    emailLabel: "Email",
    baseLabel: "Based in",
    baseValue: "Metamorfosi 63078, Halkidiki, Greece",
    hoursLabel: "Hours",
    emailCta: "Send an email",
    workHeading: "Our work",
    workLede:
      "Photographs from our own sites in Halkidiki. None of them are from the internet.",
  },

  sr: {
    metaTitle: "Zemljani radovi u Halkidikiju od 1987 | TSOPOUROGLOU",
    metaDescription:
      "Porodična firma za zemljane radove u Metamorfosiju, Halkidiki, na istom terenu od 1987. Iskopi, čišćenje placeva, septičke jame, razbijanje stena, čišćenje plaže. Pozovite 697 355 7903.",
    eyebrow: "ZEMLJANI RADOVI · HALKIDIKI",
    headingLead: "Kopamo ovu zemlju od",
    since: "1987",
    lede: "Dva brata, jedno selo, isto ime skoro četrdeset godina. Ako imate plac ili letnju kuću u Halkidikiju, možemo da ga očistimo, iskopamo ili pripremimo za gradnju.",
    callLabel: "POZOVITE",
    quoteLabel: "Pošaljite email",
    hours: "Javljamo se na telefon 24 sata, svaki dan.",
    noticeHeading: "O ovoj stranici",
    notice:
      "Ovo je sažetak na srpskom. Ostatak sajta je na grčkom — ali to vam ne treba da biste pozvali. Recite nam kakav je posao i u kom selu, pa ćemo vam reći šta je potrebno i koliko košta.",
    servicesHeading: "Šta radimo",
    servicesLede: "Osam poslova. To radimo i to znamo.",
    services: [
      {
        title: "Iskopi",
        body: "Temelji, podrumi, rovovi. Tri bagera — veliki za gradilište, mali za uske prolaze.",
      },
      {
        title: "Čišćenje placeva",
        body: "Suvo rastinje, šiblje, šut. Čist plac, spreman za gradnju ili prodaju.",
      },
      {
        title: "Izrada septičkih jama",
        body: "Od iskopa do poklopca. Gradimo ih; ne praznimo ih.",
      },
      {
        title: "Razbijanje stena",
        body: "Stena usred placa? Razbijamo je i odvozimo.",
      },
      {
        title: "Čišćenje plaže",
        body: "Alge, drvo, kamenje. Čista obala pre sezone i tokom nje.",
      },
      {
        title: "Prevoz zemlje i šuta",
        body: "Sopstveni kamioni za zemlju, šut i šljunak. Utovar i prevoz.",
      },
      {
        title: "Baštenska zemlja",
        body: "Nasuta i poravnata zemlja, spremna za travu ili sadnju.",
      },
      {
        title: "Vodovodni i kanalizacioni priključci",
        body: "Iskop, priključak, zatrpavanje. Voda i kanalizacija.",
      },
    ],
    areasHeading: "Gde radimo",
    areasLede:
      "Metamorfosi i naselje Daskalon su naš teren — tamo stižemo prvi. Radimo i u Nikitiju, Vatopediju i Psakudiji.",
    priorityLabel: "NAŠ TEREN",
    areas: [
      {
        name: "Metamorfosi",
        body: "Naša baza. Ovde radimo od 1987. i mašine su u selu.",
        priority: true,
      },
      {
        name: "Naselje Daskalon",
        body: "Odmah pored, i naše od 1987. Isti prioritet kao Metamorfosi.",
        priority: true,
      },
      { name: "Nikiti", body: "U Nikiti dolazimo sa mašinom koju posao traži." },
      { name: "Vatopedi", body: "Placevi, dvorišta i čišćenje obale u Vatopediju." },
      { name: "Psakudija", body: "Placevi, dvorišta i čišćenje obale u Psakudiji." },
    ],
    whyHeading: "Zašto mi",
    why: [
      {
        figure: "1987",
        title: "Ista zemlja od 1987.",
        body: "Ista porodica, isto selo, dva brata.",
      },
      {
        figure: "1990",
        title: "Licencirani rukovalac od 1990.",
        body: "Sertifikovani rukovalac građevinskim mašinama.",
      },
      {
        figure: "24",
        title: "Telefon radi 24 sata",
        body: "Pukla cev ne čeka radno vreme.",
      },
      {
        figure: "3",
        title: "Tri bagera — veliki, srednji, mali",
        body: "Za veliko gradilište i za usko dvorište.",
      },
    ],
    contactHeading: "Pozovite nas",
    contactLede:
      "Recite nam kakav je posao i gde. Reći ćemo vam šta je potrebno i koliko košta.",
    mobileLabel: "Mobilni",
    landlineLabel: "Fiksni",
    emailLabel: "Email",
    baseLabel: "Sedište",
    baseValue: "Metamorfosi 63078, Halkidiki, Grčka",
    hoursLabel: "Radno vreme",
    emailCta: "Pošaljite email",
    workHeading: "Naši radovi",
    workLede:
      "Fotografije sa naših gradilišta u Halkidikiju. Nijedna nije sa interneta.",
  },
};
