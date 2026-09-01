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
 * TRUE since Γρηγόρης's own photographs arrived. /erga and /exoplismos are
 * published: in the nav, in the sitemap, indexable.
 *
 * The rule that gated them still stands — the gallery and fleet show his work
 * and his machines, never stock. Nothing in /public/erga is a stand-in.
 */
export const HAS_REAL_PHOTOS = true;

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
  /**
   * Not shown on the site — client's decision. Kept because the footer and
   * the privacy page can restore it in one line if that changes.
   */
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
  heading: "Τι κάνουμε",
  lede: "Οκτώ δουλειές. Αυτές κάνουμε, αυτές ξέρουμε.",
  cta: "Όλες οι υπηρεσίες",
} as const;

/* ------------------------------------------------------------------ */
/* Areas — priority response is his real edge over anyone driving in.   */
/* ------------------------------------------------------------------ */

export { areaLinks, areaPages, areaBySlug, publishedAreas, areasPage } from "./areas";
export type { AreaPage } from "./areas";

export const areasSection = {
  eyebrow: "ΠΟΥ ΔΟΥΛΕΥΟΥΜΕ",
  heading: "Πού δουλεύουμε",
  lede: "Βάση μας η Μεταμόρφωση και ο οικισμός Δασκάλων. Εκεί ερχόμαστε πρώτα. Δουλεύουμε επίσης σε Νικήτη, Βατοπέδι και Ψακούδια.",
  priorityLabel: "ΒΑΣΗ ΜΑΣ",
} as const;

/* ------------------------------------------------------------------ */
/* Γιατί εμάς — four facts, each one true and each one checkable.       */
/* ------------------------------------------------------------------ */

export const whySection = {
  eyebrow: "ΓΙΑΤΙ ΕΜΑΣ",
  heading: "Γιατί εμάς",
  items: [
    {
      key: "1987",
      figure: "1987",
      title: "Από το 1987 στα ίδια χώματα",
      body: "Ίδια οικογένεια, ίδιο χωριό, δύο αδέρφια.",
    },
    {
      key: "licence",
      figure: "1990",
      title: "Πτυχίο χειριστή από το 1990",
      body: "Αδειούχος χειριστής μηχανημάτων έργου.",
    },
    {
      key: "hours",
      figure: "24",
      title: "Τηλέφωνο όλο το 24ωρο",
      body: "Ένας σπασμένος σωλήνας δεν περιμένει ωράριο.",
    },
    {
      key: "machines",
      figure: "3",
      title: "Τρεις τσάπες — μεγάλη, μεσαία, μικρή",
      body: "Για μεγάλο εργοτάξιο και για στενή αυλή.",
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
  /** Verified on the Google Business Profile. Re-check before launch. */
  rating: "5,0",
  heading: "Τι λένε οι πελάτες",
  lede: "Κριτικές από το Google, όπως τις έγραψαν οι ίδιοι.",
  cta: "Δείτε τις κριτικές στο Google",
} as const;

/**
 * Real Google reviews, quoted.
 *
 * CLAUDE.md §2 said to paraphrase the themes and not reproduce reviews
 * verbatim — written when we had no review text and the risk was inventing
 * testimonials. The client has now supplied the actual reviews and asked for
 * them on the page, which supersedes that. Nothing here is written by us.
 *
 * NO DATES. The source gives relative times ("πριν από 3 εβδομάδες") which
 * are wrong within a month — the same goes-stale problem as a year count.
 * Absolute dates were not supplied, so the times are simply omitted.
 *
 * Only obvious typing slips were corrected (σποτελεσματικος,
 * επχιείρησης). No wording was changed.
 */
export type Review = { author: string; text: string };

export const reviews: Review[] = [
  {
    author: "Giorgos Igl",
    text: "Πολύ έμπειρος ο κύριος Γρηγόρης, έκανε δύσκολη δουλειά στον κήπο μου με 3 διαφορετικά μηχανήματα σε χρόνο ρεκόρ, και με πολύ λογική τιμή. Τον προτείνω ανεπιφύλακτα.",
  },
  {
    author: "Hotel Amari",
    text: "Συνεργάτης της επιχείρησής μας για σειρά δεκαετιών σε ό,τι έχει σχέση με χωματουργικές εργασίες, εκχωματώσεις και αρδευτικά έργα. Πάντα χωρίς πρόβλημα, πάντα αξιόπιστα.",
  },
  {
    author: "Alekos Hristopoulos",
    text: "Πολύ καλός επαγγελματίας! Συνεπής, με ωραίες ιδέες για τη διαμόρφωση του χώρου και λογικές τιμές! Μόνο καλές αναμνήσεις από τη συνεργασία μας!",
  },
  {
    // The year count below is the customer's wording in a quoted review, not
    // a claim we make. The rule guards our own copy, so the line opts out.
    author: "Κώστας Κουφ.",
    text: "Πολύ έμπειροι επαγγελματίες, με πάνω από 30 χρόνια προϋπηρεσίας στο χώρο. Μ' έχουν εξυπηρετήσει πολλές φορές και με πολύ καλές τιμές. Διαθέτουν μεγάλο στόλο από μηχανήματα για κάθε χωματουργική εργασία.", // greek-guard-ok
  },
  {
    author: "Panagiotis Karazanos",
    text: "Είμαστε τυχεροί που υπάρχει στο μικρό χωριό μας αυτή η μεγάλη επιχείρηση, που πλαισιώνεται από τόσο έντιμους, ευγενικούς και εργατικούς επαγγελματίες.",
  },
  {
    author: "Aris Stathis",
    text: "Άψογοι. Μεγάλη γκάμα μηχανημάτων και πολλή εμπειρία.",
  },
  {
    author: "G Lap",
    text: "Εξαιρετικός επαγγελματίας, γνώστης του αντικειμένου, άμεση εξυπηρέτηση, πολύ καλή δουλειά. Τον συστήνω ανεπιφύλακτα.",
  },
  {
    author: "Βίκυ Κωτίδου",
    text: "Εξαιρετικοί γνώστες της δουλειάς. Αξιόπιστοι, γρήγοροι, συνεπείς.",
  },
  {
    author: "Ανδρέας Καραμανίδης",
    text: "Εξαιρετικός επαγγελματίας, γνώστης της δουλειάς και πολύ ακριβής με το χρόνο.",
  },
  {
    author: "Σωκράτης Μπιμπλιτζής",
    text: "Εξαιρετικός επαγγελματίας ο κύριος Γρηγόρης, με συνέπεια και τέλειο αποτέλεσμα!",
  },
  {
    author: "Thomas Avgeris",
    text: "Εξαιρετική δουλειά, άριστος επαγγελματίας, συνέπεια και άμεση διεκπεραίωση.",
  },
  {
    author: "Γιώργος Γρηγοριάδης",
    text: "Ο Γρηγόρης ο γρήγορος, εξυπηρετικότατος και οικονομικός.",
  },
  {
    author: "Βάσω Δαμιανίδου",
    text: "Γρήγορος, οικονομικός, αποτελεσματικός!",
  },
  {
    author: "Anna Sarigiannidou",
    text: "Excellent earthworks services.",
  },
];

export const contactSection = {
  eyebrow: "ΕΠΙΚΟΙΝΩΝΙΑ",
  heading: "Πάρτε μας τηλέφωνο",
  lede: "Πείτε μας τι δουλειά είναι και πού. Θα σας πούμε τι χρειάζεται και πόσο κάνει.",
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
 * Five items, deliberately.
 *
 * Two merges cut it down from seven:
 *   - Έργα folded into /ypiresies. The photographs ARE the proof of the
 *     services, so splitting "what we do" from "what we have done" across
 *     two routes made the reader hop for no reason. /erga 301s.
 *   - Κριτικές folded into /etaireia. What people say about them belongs
 *     with who they are, and it was only ever a homepage anchor.
 *
 * A nav a reader can take in at a glance is worth more than one that lists
 * everything.
 */
export const nav: NavItem[] = [
  { href: "/", label: "Αρχική" },
  { href: "/ypiresies", label: "Υπηρεσίες" },
  { href: "/perioxes", label: "Περιοχές" },
  { href: "/exoplismos", label: "Στόλος", gated: true },
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
