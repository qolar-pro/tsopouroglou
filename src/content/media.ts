/**
 * THE IMAGE MANIFEST.
 *
 * Every image path on the site goes through this file, so replacing dummies
 * with real photos is editing one file — not hunting through pages of JSX.
 * That is CLAUDE.md §6b's requirement and the reason this exists.
 *
 * ── How to swap in real photos ────────────────────────────────────────────
 *   1. Drop the files into /public/erga/ or /public/exoplismos/
 *   2. Change `src` below to the new path and write a real Greek `alt`
 *   3. Set HAS_REAL_PHOTOS = true in site.ts
 *   4. Set SHOW_PLACEHOLDER_MEDIA = false below
 *   Nothing else changes. The layout already fits 4:3 and 3:4 phone photos.
 *
 * ── Two separate flags, deliberately ──────────────────────────────────────
 *   HAS_REAL_PHOTOS       governs PUBLICATION — indexing, sitemap, nav.
 *   SHOW_PLACEHOLDER_MEDIA governs PREVIEW — whether dummies render at all.
 *
 * They are separate so the layout can be reviewed without ever putting the
 * gallery on a path to being indexed. Turning previews on cannot publish
 * anything: /erga and /exoplismos stay noindex and out of the sitemap while
 * HAS_REAL_PHOTOS is false, and `npm run check:media` fails a production
 * build that still has placeholders enabled.
 */

/** Preview only. MUST be false for a production deploy. */
export const SHOW_PLACEHOLDER_MEDIA = true;

export type Img = {
  src: string;
  /** Descriptive Greek alt. Required — never decorative on content images. */
  alt: string;
  /** 4:3 landscape or 3:4 portrait, matching what a phone produces. */
  aspect: "4:3" | "3:4";
  /** True while this is a dummy. Drives the visible ribbon. */
  placeholder: boolean;
};

export type BeforeAfter = {
  id: string;
  /** Caption slug — the treatment that makes amateur photos read as a record. */
  place: string;
  work: string;
  year: string;
  /** Short title for the project card. */
  title: string;
  /** What the job actually was. Replaces a caption nobody reads with a
      sentence that sells the work. */
  description: string;
  before: Img;
  after: Img;
};

const ph = (src: string, alt: string, aspect: Img["aspect"] = "4:3"): Img => ({
  src: `/placeholder/${src}.svg`,
  alt,
  aspect,
  placeholder: true,
});

/**
 * Έργα — before/after is the primary format. None of the four ranking
 * competitor sites has it, despite selling visible physical change.
 */
export const erga: BeforeAfter[] = [
  {
    id: "oikopedo",
    title: "Οικόπεδο που είχε μείνει χρόνια",
    description: "Ξερά χόρτα, βάτα και μπάζα από παλιά. Καθαρίσαμε, μαζέψαμε και ισοπεδώσαμε, ώστε ο ιδιοκτήτης να μπορεί να το δείξει σε αγοραστή.",
    place: "ΜΕΤΑΜΟΡΦΩΣΗ",
    work: "ΚΑΘΑΡΙΣΜΟΣ ΟΙΚΟΠΕΔΟΥ",
    year: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
    before: ph("erga-oikopedo-prin", "Οικόπεδο με ξερά χόρτα και βάτα, πριν τον καθαρισμό"),
    after: ph("erga-oikopedo-meta", "Το ίδιο οικόπεδο καθαρό και ισοπεδωμένο"),
  },
  {
    id: "themelia",
    title: "Θεμέλια για μονοκατοικία",
    description: "Εκσκαφή θεμελίων σε οικόπεδο με κλίση. Βγήκαν τα χώματα με δικά μας φορτηγά και το σημείο παραδόθηκε έτοιμο για μπετόν.",
    place: "ΟΙΚΙΣΜΟΣ ΔΑΣΚΑΛΩΝ",
    work: "ΕΚΣΚΑΦΗ ΘΕΜΕΛΙΩΝ",
    year: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
    before: ph("erga-themelia-prin", "Οικόπεδο πριν την εκσκαφή των θεμελίων"),
    after: ph("erga-themelia-meta", "Ανοιγμένα θεμέλια, έτοιμα για μπετόν"),
  },
  {
    id: "avli",
    title: "Αυλή εξοχικού",
    description: "Πέτρες και ανώμαλο έδαφος. Ήρθε φυτόχωμα, στρώθηκε και ισοπεδώθηκε με κλίση ώστε να φεύγει το νερό από το σπίτι.",
    place: "ΨΑΚΟΥΔΙΑ",
    work: "ΣΤΡΩΣΙΜΟ ΧΩΜΑΤΟΣ",
    year: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
    before: ph("erga-avli-prin", "Αυλή με πέτρες και ανώμαλο έδαφος"),
    after: ph("erga-avli-meta", "Η αυλή στρωμένη με φυτόχωμα και ισοπεδωμένη"),
  },
  {
    id: "vothros",
    title: "Βόθρος σε σπίτι εκτός δικτύου",
    description: "Σκάψιμο, κατασκευή, σύνδεση με την αποχέτευση του σπιτιού και κλείσιμο. Η αυλή επανήλθε όπως ήταν.",
    place: "ΝΙΚΗΤΗ",
    work: "ΚΑΤΑΣΚΕΥΗ ΒΟΘΡΟΥ",
    year: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
    before: ph("erga-vothros-prin", "Το σημείο πριν την εκσκαφή του βόθρου"),
    after: ph("erga-vothros-meta", "Ο βόθρος κατασκευασμένος και κλεισμένος"),
  },
  {
    id: "paralia",
    title: "Ακτή πριν τη σεζόν",
    description: "Φύκια, ξύλα και πέτρες που άφησε ο χειμώνας. Δουλέψαμε με τρακτέρ και φορτωτή για να μη βουλιάξει το μηχάνημα στην άμμο.",
    place: "ΒΑΤΟΠΕΔΙ",
    work: "ΚΑΘΑΡΙΣΜΟΣ ΠΑΡΑΛΙΑΣ",
    year: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
    before: ph("erga-paralia-prin", "Ακτή με φύκια και ξύλα μετά τον χειμώνα"),
    after: ph("erga-paralia-meta", "Η ίδια ακτή καθαρή και στρωμένη"),
  },
  {
    id: "vrachos",
    title: "Βράχος στη μέση του οικοπέδου",
    description: "Είχε σταματήσει η εκσκαφή. Σπάσαμε τον βράχο, απομακρύναμε τα μπάζα και η δουλειά συνέχισε.",
    place: "ΜΕΤΑΜΟΡΦΩΣΗ",
    work: "ΕΚΒΡΑΧΙΣΜΟΣ",
    year: "[[ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]]",
    before: ph("erga-vrachos-prin", "Βράχος μέσα στο οικόπεδο, πριν τον εκβραχισμό"),
    after: ph("erga-vrachos-meta", "Το οικόπεδο μετά την απομάκρυνση του βράχου"),
  },
];

/** Homepage strip — the two strongest pairs, linking to the full gallery. */
export const ergaFeatured = erga.slice(0, 2);

/** Στόλος — one per confirmed machine. Nothing he didn't tell us he owns. */
export const stolos: { name: string; note: string; img: Img }[] = [
  { name: "Τσάπα μεγάλη", note: "Θεμέλια και μεγάλες ποσότητες χώματος", img: ph("stolos-tsapa-megali", "Η μεγάλη τσάπα σε εργοτάξιο") },
  { name: "Τσάπα μεσαία", note: "Η πιο συχνή επιλογή για οικόπεδα", img: ph("stolos-tsapa-mesaia", "Η μεσαία τσάπα εν ώρα εργασίας") },
  { name: "Τσάπα μικρή", note: "Αυλές και στενά περάσματα", img: ph("stolos-tsapa-mikri", "Η μικρή τσάπα σε στενή αυλή") },
  { name: "Φορτωτής", note: "Φόρτωση και μάζεμα", img: ph("stolos-fortotis", "Ο φορτωτής μας") },
  { name: "Φορτηγά", note: "Μεταφορά χωμάτων και μπάζων", img: ph("stolos-fortiga", "Τα φορτηγά μας") },
  { name: "JCB", note: "Σκάψιμο και φόρτωση μαζί", img: ph("stolos-jcb", "Το JCB μας") },
  { name: "Διαβολάκι", note: "Εκεί που δεν περνάει μηχάνημα", img: ph("stolos-diavolaki", "Το διαβολάκι σε στενό χώρο") },
  { name: "Τρακτέρ", note: "Δουλειά στην άμμο και σε χωράφια", img: ph("stolos-trakter", "Το τρακτέρ μας") },
];

/**
 * One photo per service page. A service page should show THAT work — a
 * generic site photo on all eight would be the visual equivalent of the
 * templated copy we avoided.
 */
export const servicePhoto: Record<string, Img> = {
  "ekskafes": ph("ypiresia-ekskafes", "Εκσκαφέας ανοίγει θεμέλια σε οικόπεδο"),
  "katharismos-oikopedon": ph("ypiresia-katharismos-oikopedon", "Καθαρισμός οικοπέδου από ξερά χόρτα και βάτα"),
  "vothroi": ph("ypiresia-vothroi", "Εκσκαφή και κατασκευή βόθρου σε αυλή"),
  "ekvrachismoi": ph("ypiresia-ekvrachismoi", "Σπάσιμο βράχου μέσα σε οικόπεδο"),
  "katharismos-paralias": ph("ypiresia-katharismos-paralias", "Καθαρισμός παραλίας από φύκια και ξύλα"),
  "metafores-chomaton": ph("ypiresia-metafores-chomaton", "Φόρτωση χωμάτων σε φορτηγό"),
  "choma-kipou": ph("ypiresia-choma-kipou", "Στρώσιμο φυτοχώματος σε αυλή"),
  "syndeseis-nerou-apocheteusi": ph("ypiresia-syndeseis-nerou-apocheteusi", "Τάφρος για σύνδεση νερού"),
};

/** The hero photograph. Portrait, so it sits as a column beside the copy. */
export const heroPhoto: Img = ph(
  "hero-ergotaxio",
  "Τσάπα εν ώρα εργασίας σε οικόπεδο στη Μεταμόρφωση Χαλκιδικής",
  "3:4"
);

/** Ποιοι είμαστε — one portrait. 3:4, because phones shoot people portrait. */
export const etaireiaPhoto: Img = ph(
  "etaireia-adelfia",
  "Ο Γρηγόρης και ο Νικόλαος Τσοπούρογλου στο εργοτάξιο",
  "3:4"
);

/** Build-time integrity: every content image needs real alt text. */
{
  const all: Img[] = [
    ...erga.flatMap((e) => [e.before, e.after]),
    ...stolos.map((s) => s.img),
    ...Object.values(servicePhoto),
    etaireiaPhoto,
    heroPhoto,
  ];
  for (const img of all) {
    if (!img.alt || img.alt.trim().length < 10) {
      throw new Error(`media.ts: "${img.src}" has no usable alt text.`);
    }
  }
}
