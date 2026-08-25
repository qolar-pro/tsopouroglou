/**
 * Single source of truth for every string and business fact on the site.
 * Copy is edited here, never in components.
 *
 * RULES (enforced by `npm run check`):
 *  - Uppercase Greek is written literally. Never use CSS text-transform on Greek.
 *  - Never state a number of years. Only "από το 1987".
 *  - Χαλκιδική / ΧΑΛΚΙΔΙΚΗΣ — never the Evia city spelling. greek-guard-ok
 *  - Nothing here is invented. Every fact traces to the client or to his
 *    verified Google Business Profile. Unconfirmed items carry the
 *    [[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]] token and are listed in PLACEHOLDERS.md.
 */

/**
 * Gallery and fleet pages cannot ship with stock photography — the whole
 * pitch is "look at what we've done", and stock excavators would be a lie to
 * his customers in a village where everyone knows everyone.
 *
 * While false: /erga and /exoplismos are out of the nav, out of the sitemap,
 * noindex, and the Έργα section is absent from the homepage.
 * Flip to true only when real photos from Γρηγόρης are in /public/erga.
 */
export const HAS_REAL_PHOTOS = false;

export const business = {
  legalName: "ΓΡΗΓΟΡΙΟΣ & ΝΙΚΟΛΑΟΣ ΤΣΟΠΟΥΡΟΓΛΟΥ",
  shortName: "ΤΣΟΠΟΥΡΟΓΛΟΥ",
  owners: ["Γρηγόρης Ν. Τσοπούρογλου", "Νικόλαος Τσοπούρογλου"],
  foundedYear: 1987,
  licenceYear: 1990,

  phone: { display: "697 355 7903", href: "tel:+306973557903" },
  landline: { display: "2375 061341", href: "tel:+302375061341" },
  email: "gregorestsopouroglou@gmail.com",

  address: {
    locality: "Μεταμόρφωση",
    region: "Χαλκιδική",
    postalCode: "63078",
    country: "GR",
    // Google has no street number. See PLACEHOLDERS.md.
    street: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
  },
  geo: { lat: 40.2301875, lng: 23.6036791 },
  googlePlaceId: "ChIJneonMRSRqBQRrq_xxtm9PS8",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJneonMRSRqBQRrq_xxtm9PS8",

  // Confirmed on the Google Business Profile: open 24 hours, seven days.
  hoursNote: "Ανοιχτά όλο το 24ωρο, κάθε μέρα",
  vat: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
} as const;

/**
 * Hero.
 *
 * The headline is one spoken Greek sentence. "1987" is a clause inside it,
 * set at display scale in the bedrock stratum, not a statistic in a box.
 * "αυτά τα χώματα" is the positioning: a firm 40km away cannot say it here.
 */
export const hero = {
  eyebrow: "ΧΩΜΑΤΟΥΡΓΙΚΕΣ ΕΡΓΑΣΙΕΣ · ΧΑΛΚΙΔΙΚΗ",
  headingLead: "Σκάβουμε σε αυτά τα χώματα από το",
  headingYear: "1987",
  headingPlain: "Σκάβουμε σε αυτά τα χώματα από το 1987",
  lede: [
    "Εκσκαφές, καθαρισμοί οικοπέδων, βόθροι, εκβραχισμοί.",
    "Βάση μας η Μεταμόρφωση και ο οικισμός Δασκάλων.",
  ],
  licence: "Πτυχίο χειριστή από το 1990.",
  callLabel: "ΤΗΛΕΦΩΝΟ",
  quoteLabel: "Ζητήστε προσφορά",
  // Register is his, not ours. Γρηγόρης signs this off before launch.
  hours: "Σηκώνουμε τηλέφωνο όλο το 24ωρο, κάθε μέρα.",
  /** Three checkable facts, in the hero where they do the most work. */
  credentials: [
    { key: "Πτυχίο χειριστή", value: "από το 1990" },
    { key: "Τηλέφωνο", value: "όλο το 24ωρο" },
    { key: "Τρεις τσάπες", value: "μεγάλη, μεσαία, μικρή" },
  ],
} as const;

export const wordmark = {
  full: "Γ. & Ν. ΤΣΟΠΟΥΡΟΓΛΟΥ",
  compact: "ΤΣΟΠΟΥΡΟΓΛΟΥ",
  tagline: "ΧΩΜΑΤΟΥΡΓΙΚΑ · ΜΕΤΑΜΟΡΦΩΣΗ ΧΑΛΚΙΔΙΚΗΣ",
  /* Below 560px the full tagline wraps to two lines. This keeps both
     keywords — ΧΩΜΑΤΟΥΡΓΙΚΑ and ΧΑΛΚΙΔΙΚΗΣ — on one. */
  taglineShort: "ΧΩΜΑΤΟΥΡΓΙΚΑ ΧΑΛΚΙΔΙΚΗΣ",
} as const;

/* ------------------------------------------------------------------ */
/* Services — full records live in services.ts, re-exported here so every  */
/* component keeps one import path for content.                           */
/* ------------------------------------------------------------------ */

export { services, serviceBySlug, servicesPage } from "./services";
export type { Service } from "./services";

export const servicesSection = {
  eyebrow: "ΤΙ ΚΑΝΟΥΜΕ",
  heading: "Οκτώ δουλειές, καμία παραπάνω",
  lede: "Δεν γράφουμε λίστα με ενενήντα υπηρεσίες για να πιάσουμε λέξεις. Αυτά κάνουμε, αυτά ξέρουμε.",
  cta: "Όλες οι υπηρεσίες",
} as const;

/* ------------------------------------------------------------------ */
/* Areas — priority response is his real edge over anyone driving in.   */
/* ------------------------------------------------------------------ */

export { areaLinks, areaPages, areaBySlug, publishedAreas, areasPage } from "./areas";
export type { AreaPage } from "./areas";

export const areasSection = {
  eyebrow: "ΠΟΥ ΔΟΥΛΕΥΟΥΜΕ",
  heading: "Στη Μεταμόρφωση είμαστε ήδη εδώ",
  lede: "Δεν κατεβαίνουμε από άλλο χωριό. Η Μεταμόρφωση και ο οικισμός Δασκάλων είναι η βάση μας — εκεί ερχόμαστε πρώτα. Δουλεύουμε και σε Νικήτη, Βατοπέδι και Ψακούδια.",
  priorityLabel: "ΒΑΣΗ ΜΑΣ",
} as const;

/* ------------------------------------------------------------------ */
/* Γιατί εμάς — four facts, each one true and each one checkable.       */
/* ------------------------------------------------------------------ */

export const whySection = {
  eyebrow: "ΓΙΑΤΙ ΕΜΑΣ",
  heading: "Τέσσερα πράγματα που μπορείτε να ελέγξετε",
  items: [
    {
      key: "1987",
      figure: "1987",
      title: "Από το 1987 στα ίδια χώματα",
      body: "Ίδια οικογένεια, ίδιο χωριό, δύο αδέρφια. Ρωτήστε στη Μεταμόρφωση.",
    },
    {
      key: "licence",
      figure: "1990",
      title: "Πτυχίο χειριστή από το 1990",
      body: "Αδειούχος χειριστής μηχανημάτων έργου. Νόμιμα, με χαρτιά.",
    },
    {
      key: "hours",
      figure: "24",
      title: "Τηλέφωνο όλο το 24ωρο",
      body: "Ένας σπασμένος σωλήνας δεν περιμένει ωράριο. Ούτε εμείς.",
    },
    {
      key: "machines",
      figure: "3",
      title: "Τρεις τσάπες — μεγάλη, μεσαία, μικρή",
      body: "Μπαίνουμε και σε μεγάλο εργοτάξιο και σε στενή αυλή, με το μηχάνημα που χρειάζεται.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Κριτικές                                                            */
/*                                                                     */
/* CLAUDE.md §2 is explicit: paraphrase the review THEMES, never        */
/* reproduce a review verbatim, never invent a testimonial. So there    */
/* are no quote cards here and no names — quote marks around Greek we   */
/* wrote would be fabrication however true the underlying theme is.     */
/*                                                                     */
/* This is also the competitor gap the research found: none of the four */
/* ranking sites shows its Google reviews at all.                       */
/*                                                                     */
/* NOTE: the schema still carries NO aggregateRating (gate 1 ruling —   */
/* Google prohibits self-serving review markup for LocalBusiness).      */
/* Displaying the rating as ordinary text is a different thing and is   */
/* fine. Do not "fix" the inconsistency by adding it to the JSON-LD.    */
/* ------------------------------------------------------------------ */

export const reviewsSection = {
  eyebrow: "ΚΡΙΤΙΚΕΣ",
  /** Point-in-time snapshot. Re-check before launch — see PLACEHOLDERS.md. */
  rating: "5,0",
  count: 10,
  heading: "Δέκα κριτικές στο Google, όλες πεντάστερες",
  /* Turning the constraint into the trust signal: the reason not to copy
     them here is the reason to believe them there. */
  lede: "Δεν τις αντιγράφουμε εδώ. Διαβάστε τις στο Google, εκεί που δεν μπορούμε να τις πειράξουμε. Αυτά είναι που επαναλαμβάνονται:",
  themes: [
    {
      key: "empeiria",
      title: "Χρόνια στη δουλειά",
      body: "Επαναλαμβάνεται ότι η δουλειά γίνεται από ανθρώπους που την ξέρουν χρόνια.",
    },
    {
      key: "dyskoles",
      title: "Δύσκολες δουλειές",
      body: "Μία κριτική περιγράφει δύσκολη δουλειά σε κήπο, που έγινε με τρία διαφορετικά μηχανήματα και τελείωσε γρήγορα.",
    },
    {
      key: "times",
      title: "Λογικές τιμές",
      body: "Στις κριτικές επανέρχεται ότι οι τιμές είναι λογικές.",
    },
    {
      key: "ora",
      title: "Στην ώρα τους",
      body: "Γρήγορη ανταπόκριση και τήρηση του χρόνου που συμφωνήθηκε.",
    },
    {
      key: "idees",
      title: "Ιδέες για τον χώρο",
      body: "Γράφουν επίσης ότι πήραν και συμβουλή για το πώς να διαμορφώσουν την αυλή ή το οικόπεδο.",
    },
    {
      key: "xana",
      title: "Ξαναπαίρνουν",
      body: "Αρκετές κριτικές είναι από πελάτες που είχαν ξανασυνεργαστεί μαζί μας.",
    },
  ],
  cta: "Δείτε τις κριτικές στο Google",
} as const;

export const contactSection = {
  eyebrow: "ΕΠΙΚΟΙΝΩΝΙΑ",
  heading: "Πάρτε μας τηλέφωνο",
  lede: "Πείτε μας τι δουλειά είναι και σε ποια περιοχή. Θα σας πούμε τι χρειάζεται και πόσο κάνει.",
  mobileLabel: "Κινητό",
  landlineLabel: "Σταθερό",
  emailLabel: "Email",
  baseLabel: "Βάση",
  baseValue: "Μεταμόρφωση Χαλκιδικής",
  quoteCta: "Ζητήστε προσφορά",
  quoteNote: "Συμπληρώνετε τέσσερα πεδία. Απαντάμε το συντομότερο.",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation & footer                                                 */
/* ------------------------------------------------------------------ */

export type NavItem = { href: string; label: string; gated?: boolean };

/**
 * Every route AND every homepage section a reader might want to reach.
 *
 * The homepage sections carry ids but nothing linked to them, so Κριτικές
 * and Περιοχές could only be found by scrolling or by typing a URL. An
 * anchor works from any page because it is absolute.
 *
 * Κριτικές stays a homepage section rather than becoming /kritikes: with no
 * review text to publish — only paraphrased themes and a link out — a page
 * of its own would be thin, which is the same trap Δασκάλων was folded to
 * avoid.
 */
export const nav: NavItem[] = [
  { href: "/", label: "Αρχική" },
  { href: "/ypiresies", label: "Υπηρεσίες" },
  { href: "/perioxes", label: "Περιοχές" },
  { href: "/exoplismos", label: "Στόλος & εξοπλισμός", gated: true },
  { href: "/erga", label: "Έργα", gated: true },
  { href: "/#kritikes", label: "Κριτικές" },
  { href: "/etaireia", label: "Ποιοι είμαστε" },
  { href: "/epikoinonia", label: "Επικοινωνία" },
];

/**
 * Build-time integrity: every in-page anchor in the nav must correspond to a
 * section id that is actually rendered. A nav item pointing at an id nobody
 * renders is a dead link that no route check would catch, because the page
 * itself returns 200.
 */
{
  const RENDERED_HOME_IDS = new Set([
    "ypiresies",
    "erga",
    "perioxes",
    "giati-emas",
    "kritikes",
    "epikoinonia",
  ]);
  for (const item of nav) {
    const hash = item.href.split("#")[1];
    if (hash && !RENDERED_HOME_IDS.has(hash)) {
      throw new Error(
        `site.ts: nav item "${item.label}" points at #${hash}, which no homepage section renders.`
      );
    }
  }
}

/** Nav minus anything gated behind real photography. */
export const visibleNav = nav.filter((n) => !n.gated || HAS_REAL_PHOTOS);

export const footer = {
  servicesHeading: "Υπηρεσίες",
  areasHeading: "Περιοχές",
  contactHeading: "Επικοινωνία",
  privacyLabel: "Πολιτική απορρήτου",
  vatLabel: "ΑΦΜ",
  rights: "Χωματουργικές εργασίες στη Μεταμόρφωση Χαλκιδικής από το 1987.",
} as const;

export const seo = {
  title: "Χωματουργικά Χαλκιδική | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  description:
    "Χωματουργικές εργασίες στη Μεταμόρφωση Χαλκιδικής από το 1987. Εκσκαφές, καθαρισμοί οικοπέδων, βόθροι, εκβραχισμοί, καθαρισμοί παραλίας. Τηλ. 697 355 7903.",
} as const;
