import type { ServiceId, AreaId } from "./locales";

/**
 * The contract every language fills in.
 *
 * This type is the whole reason a fourth language is a day's writing rather
 * than a week's archaeology: TypeScript will not let a locale file compile
 * with a missing field, so "did we translate the ask-list on the septic tank
 * page?" is answered by the compiler instead of by clicking through
 * fifty-seven pages in a language you cannot read.
 *
 * Anything NOT here is language-independent and must not be duplicated per
 * locale: the phone numbers, the email, the coordinates, the founding year,
 * the photographs, the review text (which stays in the language its author
 * wrote it in). Those live in site.ts and media.ts and are read directly.
 */

export type ServiceCopy = {
  /** Short label — cards, footer, related links. */
  title: string;
  /** Even shorter, for nav. */
  navTitle: string;
  /** The page's h1. Carries the service term plus the region. */
  h1: string;
  /** Card blurb, on the home page and the services index. */
  card: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  includesHeading: string;
  includes: string[];
  machinesHeading: string;
  machines: string;
  /** An honest boundary or caveat. Only where one is true. */
  note?: string;
  askHeading: string;
  ask: string[];
};

export type AreaCopy = {
  name: string;
  /** The name in whatever form the language needs mid-sentence. */
  inName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  card: string;
  blocks: { heading: string; body: string }[];
};

export type Dictionary = {
  /** Site-wide meta, used on the home page. */
  seo: { title: string; description: string };

  /** The wordmark's second line. */
  tagline: { full: string; short: string };

  hero: {
    eyebrow: string;
    headingLead: string;
    lede: string[];
    callLabel: string;
    quoteLabel: string;
    hours: string;
    credentials: { key: string; value: string }[];
  };

  /** Header, footer, nav panel, call bar. */
  chrome: {
    navAria: string;
    menu: string;
    navigation: string;
    close: string;
    phoneLabel: string;
    phoneAria: string;
    skipToContent: string;
    footerServices: string;
    footerAreas: string;
    footerContact: string;
    footerPages: string;
    footerRights: string;
    privacyLabel: string;
    /** Non-empty only where the linked policy is not in this language. */
    privacyNote: string;
  };

  /** Labels for the routed pages, as they appear in nav and footer. */
  navLabels: {
    home: string;
    services: string;
    areas: string;
    fleet: string;
    about: string;
    contact: string;
    faq: string;
  };

  servicesSection: { eyebrow: string; heading: string; lede: string; cta: string };
  areasSection: { eyebrow: string; heading: string; lede: string; priorityLabel: string };
  whySection: {
    eyebrow: string;
    heading: string;
    items: { figure: string; title: string; body: string }[];
  };
  reviewsSection: {
    eyebrow: string;
    heading: string;
    lede: string;
    cta: string;
    onGoogle: string;
    /** The noun only — the count is injected. */
    reviewsNoun: string;
  };
  contactSection: {
    eyebrow: string;
    heading: string;
    lede: string;
    mobileLabel: string;
    landlineLabel: string;
    emailLabel: string;
    baseLabel: string;
    baseValue: string;
    hoursLabel: string;
    hoursValue: string;
    quoteCta: string;
    quoteNote: string;
    faqLink: string;
  };

  /** The nine services, keyed by their stable id. */
  services: Record<ServiceId, ServiceCopy>;
  servicesPage: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    body: string;
    relatedHeading: string;
    /** The "where we work" panel that sits on every service detail page. */
    areasHeading: string;
    areasBody: string;
    ctaHeading: string;
    ctaBody: string;
    backToAll: string;
    workHeading: string;
    workLede: string;
  };

  /**
   * Έργα — the photographs. Shown on the home page as a teaser and on the
   * services index in full. The photographs themselves are language-
   * independent; only what is said about them changes.
   */
  ergaSection: {
    eyebrow: string;
    heading: string;
    lede: string;
    galleryHeading: string;
    galleryLede: string;
  };

  /** The closing call band on every inner page. */
  callBand: { label: string; endLabel: string };

  /** The four areas with pages, keyed by their stable id. */
  areas: Record<AreaId, AreaCopy>;
  areasPage: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    listHeading: string;
    servicesHeading: string;
    servicesBody: string;
    priorityLabel: string;
    otherAreasHeading: string;
    backToAll: string;
  };
  /**
   * Δασκάλων has no page of its own — it is operationally identical to
   * Μεταμόρφωση, so its own page would be a duplicate. It keeps its name in
   * every list and points at the Μεταμόρφωση page.
   */
  daskalon: { name: string; card: string };
  /**
   * The focus argument.
   *
   * This block used to list five extra villages he was willing to travel to.
   * The client has since ruled that out — he works in the five places he
   * works in and nowhere else — so it now says the opposite thing, which is
   * the stronger pitch anyway: everything he covers is minutes from where the
   * machines are parked, which is exactly what a firm driving in from forty
   * kilometres away cannot say.
   *
   * The parent areas — Sithonia and Chalkidiki — live inside `body`, so
   * somebody searching the region rather than the village still lands on
   * something true.
   */
  coverageSection: {
    eyebrow: string;
    heading: string;
    body: string;
    closing: string;
  };

  faqPage: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    questionsHeading: string;
  };
  buildJourney: {
    eyebrow: string;
    heading: string;
    lede: string;
    steps: { n: string; title: string; body: string; id: ServiceId }[];
    closing: string;
  };
  faqs: { q: string; a: string }[];

  about: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    blocks: { heading: string; body: string }[];
  };

  contact: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    formHeading: string;
    formLede: string;
    askNote: string;
  };

  fleet: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    items: string[];
  };

  privacy: {
    eyebrow: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    lede: string;
    updated: string;
    blocks: { heading: string; body: string[] }[];
  };

  /** The 404, in this language. */
  notFound: {
    metaTitle: string;
    h1: string;
    lede: string;
    servicesHeading: string;
    areasHeading: string;
  };
};
