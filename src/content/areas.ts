/**
 * Areas.
 *
 * The spine, confirmed with the client: **home ground sells knowledge of the
 * ground; outer areas sell knowledge of the work.** Μεταμόρφωση is where the
 * machines are parked and where he has dug since 1987 — the trust signal is
 * proximity itself, checkable by asking in the village. The outer areas can't
 * claim presence, so they claim capability: he travels, with the right
 * machine, licensed since 1990, phone open around the clock.
 *
 * WHAT WE ASKED ΓΡΗΓΟΡΗΣ, AND WHAT HE SAID — four hypotheses died here, and
 * none of them may be reintroduced as copy:
 *   - Νικήτη has no area-specific services. Same list as everywhere.
 *   - Soil does NOT vary by area. Never differentiate on ground conditions.
 *   - Βατοπέδι / Ψακούδια have no plot-vs-yard split. Both do both.
 *   - There is NO seasonal window. He works all seasons.
 *   - Δασκάλων is operationally identical to Μεταμόρφωση.
 *
 * Because Δασκάλων is identical, it has no page: honest copy would have been
 * a duplicate, and two near-duplicates rank worse than one strong page. It
 * folds into the Μεταμόρφωση page, keeps its name in the footer and on the
 * homepage, and its old slug 301s. See next.config.ts.
 *
 * The outer pages are deliberately SHORT. With operations confirmed
 * identical, the honest differentiator is the place name and the travel
 * framing. Padding them with invented local colour is exactly what gets
 * near-duplicate pages filtered.
 *
 * NO INVENTED DISTANCES OR DRIVE TIMES. We don't have verified ones.
 */

export type AreaPage = {
  slug: string;
  name: string;
  /** Name in the accusative/locative form used mid-sentence. */
  inName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  /** Short blurb for homepage and index cards. */
  card: string;
  /** Home ground gets the "knowledge of the ground" treatment. */
  homeGround: boolean;
  blocks: { heading: string; body: string }[];
  /**
   * Reserve mechanism, mirroring HAS_REAL_PHOTOS. While true the page is
   * noindex, out of the sitemap and out of the footer list — the way to hold
   * back an area whose copy cannot yet be made genuinely distinct.
   * All four are currently false: the flag is built and tested, not active.
   */
  needsInput: boolean;
};

export const areaPages: AreaPage[] = [
  {
    slug: "metamorfosi",
    name: "Μεταμόρφωση",
    inName: "στη Μεταμόρφωση",
    h1: "Χωματουργικές εργασίες στη Μεταμόρφωση",
    metaTitle: "Χωματουργικά Μεταμόρφωση & οικισμός Δασκάλων | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription:
      "Χωματουργικές εργασίες στη Μεταμόρφωση Χαλκιδικής και στον οικισμό Δασκάλων, από το 1987. Εκσκαφές, καθαρισμοί οικοπέδων, βόθροι, εκβραχισμοί. Τηλ. 697 355 7903.",
    lede: "Εδώ είναι η βάση μας. Τα μηχανήματα είναι στο χωριό — δεν κατεβαίνουμε από αλλού.",
    card: "Η βάση μας. Εδώ δουλεύουμε από το 1987 και τα μηχανήματα είναι στο χωριό.",
    homeGround: true,
    needsInput: false,
    blocks: [
      {
        heading: "Είμαστε από εδώ",
        // Familiarity with the place is a consequence of 1987 + same village.
        // It is NOT a claim about soil, which the client says doesn't vary.
        body: "Από το 1987 δουλεύουμε στα ίδια οικόπεδα. Πολλές φορές έχουμε ήδη σκάψει στο διπλανό, οπότε ξέρουμε από πού μπαίνει μηχάνημα και πού δεν περνάει φορτηγό. Κι αν θέλετε να ρωτήσετε για εμάς, δεν χρειάζεται να ψάξετε στο ίντερνετ — ρωτήστε στο χωριό.",
      },
      {
        heading: "Ερχόμαστε πρώτα εδώ",
        body: "Η Μεταμόρφωση και ο οικισμός Δασκάλων είναι η βάση μας. Όταν μαζευτούν δουλειές, αυτές οι δύο περιοχές προηγούνται.",
      },
      {
        heading: "Και στον οικισμό Δασκάλων",
        body: "Δίπλα μας, και δουλεύουμε εκεί από το 1987 όπως και στη Μεταμόρφωση. Ίδια προτεραιότητα, ίδιες δουλειές, ίδιο τηλέφωνο.",
      },
    ],
  },

  {
    slug: "nikiti",
    name: "Νικήτη",
    inName: "στη Νικήτη",
    h1: "Χωματουργικές εργασίες στη Νικήτη",
    metaTitle: "Χωματουργικά Νικήτη | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription:
      "Χωματουργικές εργασίες στη Νικήτη Χαλκιδικής. Εκσκαφές, καθαρισμοί οικοπέδων, βόθροι, εκβραχισμοί. Βάση μας η Μεταμόρφωση, από το 1987. Τηλ. 697 355 7903.",
    lede: "Ερχόμαστε στη Νικήτη. Η βάση μας είναι η Μεταμόρφωση, αλλά η δουλειά γίνεται εκεί που χρειάζεται.",
    card: "Ερχόμαστε στη Νικήτη με το μηχάνημα που χρειάζεται η δουλειά.",
    homeGround: false,
    needsInput: false,
    blocks: [
      {
        heading: "Τι φέρνουμε μαζί",
        body: "Τρεις τσάπες — μεγάλη, μεσαία και μικρή — φορτωτή, φορτηγά και τα υπόλοιπα μηχανήματα. Ποιο θα έρθει το κρίνουμε από αυτό που θα μας περιγράψετε στο τηλέφωνο. Πτυχίο χειριστή από το 1990.",
      },
      {
        heading: "Πόσο γρήγορα",
        // The honest version of a weakness, which reads as trustworthy where
        // an invented drive time would read as sales.
        body: "Δεν είμαστε στη Νικήτη, είμαστε στη Μεταμόρφωση. Πάρτε τηλέφωνο, πείτε μας τι είναι και πού, και θα σας πούμε πότε μπορούμε να έρθουμε. Δεν δίνουμε ώρα που δεν μπορούμε να κρατήσουμε.",
      },
    ],
  },

  {
    slug: "vatopedi",
    name: "Βατοπέδι",
    inName: "στο Βατοπέδι",
    h1: "Χωματουργικές εργασίες στο Βατοπέδι",
    metaTitle: "Χωματουργικά Βατοπέδι | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription:
      "Χωματουργικές εργασίες στο Βατοπέδι Χαλκιδικής. Εκσκαφές, καθαρισμοί οικοπέδων, καθαρισμοί παραλίας. Βάση μας η Μεταμόρφωση, από το 1987. Τηλ. 697 355 7903.",
    lede: "Ερχόμαστε στο Βατοπέδι. Επειδή είναι δίπλα στη θάλασσα, εκτός από οικόπεδα και αυλές κάνουμε εδώ και καθαρισμούς ακτής.",
    card: "Οικόπεδα, αυλές και καθαρισμοί ακτής στο Βατοπέδι.",
    homeGround: false,
    needsInput: false,
    blocks: [
      {
        heading: "Τι φέρνουμε μαζί",
        body: "Τρεις τσάπες — μεγάλη, μεσαία και μικρή — φορτωτή, φορτηγά και τρακτέρ. Στην άμμο δουλεύουν καλύτερα το τρακτέρ και ο φορτωτής παρά μια βαριά τσάπα. Πτυχίο χειριστή από το 1990.",
      },
      {
        heading: "Πόσο γρήγορα",
        body: "Η βάση μας είναι η Μεταμόρφωση. Πάρτε τηλέφωνο, πείτε μας τι είναι και πού, και θα σας πούμε πότε μπορούμε να έρθουμε.",
      },
    ],
  },

  {
    slug: "psakoudia",
    name: "Ψακούδια",
    inName: "στα Ψακούδια",
    h1: "Χωματουργικές εργασίες στα Ψακούδια",
    metaTitle: "Χωματουργικά Ψακούδια | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription:
      "Χωματουργικές εργασίες στα Ψακούδια Χαλκιδικής. Εκσκαφές, καθαρισμοί οικοπέδων, καθαρισμοί παραλίας, χώμα κήπου. Από το 1987. Τηλ. 697 355 7903.",
    lede: "Ερχόμαστε στα Ψακούδια. Και εδώ, επειδή είμαστε στη θάλασσα, στη λίστα μπαίνει και ο καθαρισμός της ακτής.",
    card: "Οικόπεδα, αυλές και καθαρισμοί ακτής στα Ψακούδια.",
    homeGround: false,
    needsInput: false,
    blocks: [
      {
        heading: "Τι φέρνουμε μαζί",
        body: "Το μηχάνημα το διαλέγουμε από τη δουλειά, όχι το αντίστροφο. Σε στενή αυλή πάει η μικρή τσάπα ή το διαβολάκι· σε ανοιχτό οικόπεδο η μεγάλη. Πτυχίο χειριστή από το 1990.",
      },
      {
        heading: "Πόσο γρήγορα",
        body: "Η βάση μας είναι η Μεταμόρφωση. Πάρτε τηλέφωνο, πείτε μας τι είναι και πού, και θα σας πούμε πότε μπορούμε να έρθουμε.",
      },
    ],
  },
];

export const areaBySlug = (slug: string) =>
  areaPages.find((a) => a.slug === slug);

/**
 * ROUTING ONLY — generateStaticParams, the sitemap, "other areas" links.
 *
 * NOT for rendering a list of places to a reader. It excludes Δασκάλων,
 * which has no page of its own but is still somewhere he works, so using it
 * for display drops a real area off the page. Use `areaLinks` for anything a
 * reader sees.
 */
export const publishedAreas = areaPages.filter((a) => !a.needsInput);

/**
 * What the footer and the homepage show. Δασκάλων keeps its name and points
 * at the combined Μεταμόρφωση page — the village stays visible, only the thin
 * standalone page is gone.
 */
export const areaLinks: {
  name: string;
  href: string;
  priority: boolean;
  card: string;
}[] = [
  {
    name: "Μεταμόρφωση",
    href: "/perioxes/metamorfosi",
    priority: true,
    card: "Η βάση μας. Εδώ δουλεύουμε από το 1987 και τα μηχανήματα είναι στο χωριό.",
  },
  {
    name: "Οικισμός Δασκάλων",
    href: "/perioxes/metamorfosi",
    priority: true,
    card: "Δίπλα μας, από το 1987 κι εκεί. Ίδια προτεραιότητα με τη Μεταμόρφωση.",
  },
  ...publishedAreas
    .filter((a) => !a.homeGround)
    .map((a) => ({
      name: a.name,
      href: `/perioxes/${a.slug}`,
      priority: false,
      card: a.card,
    })),
];

export const areasPage = {
  eyebrow: "ΠΕΡΙΟΧΕΣ",
  h1: "Πού δουλεύουμε",
  lede: "Βάση μας η Μεταμόρφωση και ο οικισμός Δασκάλων. Δουλεύουμε επίσης σε Νικήτη, Βατοπέδι και Ψακούδια.",
  metaTitle: "Περιοχές — Χωματουργικά Χαλκιδική | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  metaDescription:
    "Χωματουργικές εργασίες σε Μεταμόρφωση, οικισμό Δασκάλων, Νικήτη, Βατοπέδι και Ψακούδια Χαλκιδικής. Από το 1987. Τηλ. 697 355 7903.",
  servicesHeading: "Τι κάνουμε εδώ",
  servicesBody: "Και τις οκτώ δουλειές μας, χωρίς εξαίρεση.",
  priorityLabel: "ΒΑΣΗ ΜΑΣ",
  otherAreasHeading: "Άλλες περιοχές",
  backToAll: "Όλες οι περιοχές",
} as const;

/**
 * Build-time integrity check, same standard as the related-slug guard in
 * services.ts: a mistyped href in areaLinks would ship as a dead link.
 */
{
  const known = new Set(areaPages.map((a) => `/perioxes/${a.slug}`));
  for (const l of areaLinks) {
    if (!known.has(l.href)) {
      throw new Error(
        `areas.ts: "${l.name}" links to "${l.href}", which is not an area page.`
      );
    }
  }
  if (!areaPages.some((a) => a.homeGround)) {
    throw new Error("areas.ts: no home-ground area — the spine needs one.");
  }
  // Every place the client says he serves must appear in the reader-facing
  // list. Δασκάλων has no page, so a display list built from areaPages
  // silently drops it — which is exactly what happened on /perioxes.
  const shown = new Set(areaLinks.map((l) => l.name));
  for (const required of ["Μεταμόρφωση", "Οικισμός Δασκάλων", "Νικήτη", "Βατοπέδι", "Ψακούδια"]) {
    if (!shown.has(required)) {
      throw new Error(
        `areas.ts: "${required}" is served but missing from areaLinks, so no reader-facing list shows it.`
      );
    }
  }
}
