/**
 * THE IMAGE MANIFEST — real photographs from Γρηγόρης.
 *
 * All placeholders are gone. Every image below is his own work, shot on a
 * phone on his own jobs, which is exactly what CLAUDE.md §6b required before
 * anything could be published.
 *
 * ── What the photos forced ────────────────────────────────────────────────
 * There are NO before/after pairs. Not one photograph shows the same spot
 * untouched and then finished — you only get those by shooting the "before"
 * before starting, which is the easy thing to forget on a live job. So the
 * gallery is single photographs with a sentence each, not pairs.
 *
 * That is a real loss: none of the four ranking competitors has before/after,
 * so it was the one uncontested format. It is worth asking him to shoot two
 * frames on the next few jobs — see PLACEHOLDER_MEDIA.md.
 *
 * ── Slots left deliberately empty ─────────────────────────────────────────
 * No photograph shows a βόθρος, an εκβραχισμός, or a beach. Those three
 * service pages render with no image rather than with a stand-in, and the
 * layout closes up around the absence.
 */

/** Real photographs are in. */
export const SHOW_PLACEHOLDER_MEDIA = false;

export type Img = {
  src: string;
  /** Descriptive Greek alt. Required — never decorative on content images. */
  alt: string;
  /** Phone photos come in both orientations; 4:5 suits a mixed grid. */
  aspect: "4:3" | "3:4" | "4:5" | "wide";
  placeholder: boolean;
};

const p = (file: string, alt: string, aspect: Img["aspect"] = "4:5"): Img => ({
  src: `/erga/${file}.jpg`,
  alt,
  aspect,
  placeholder: false,
});

/* ------------------------------------------------------------------ */
/* Hero — a real machine on a real job, in his own village.            */
/* ------------------------------------------------------------------ */
export const heroPhoto: Img = p(
  "ekskafi-oikopedou",
  "Εκσκαφέας ανοίγει βαθιά εκσκαφή δίπλα σε κατοικία, σε οικόπεδο στη Χαλκιδική",
  "3:4"
);

/* ------------------------------------------------------------------ */
/* Ποιοι είμαστε — the photograph the whole page was missing.          */
/* ------------------------------------------------------------------ */
export const etaireiaPhoto: Img = p(
  "cheiristis",
  "Χειριστής στην καμπίνα του μηχανήματος, εν ώρα εργασίας",
  "4:3"
);

/* ------------------------------------------------------------------ */
/* Έργα — single photographs, each with what the job actually was.     */
/* ------------------------------------------------------------------ */
export type Project = {
  id: string;
  title: string;
  description: string;
  img: Img;
};

export const erga: Project[] = [
  {
    id: "ekskafi-oikopedou",
    title: "Εκσκαφή δίπλα σε κατοικία",
    description:
      "Βαθιά εκσκαφή σε οικόπεδο με σπίτι από πάνω. Το χώμα βγήκε ελεγχόμενα και ο χώρος παραδόθηκε έτοιμος να συνεχίσει το συνεργείο.",
    img: p(
      "ekskafi-oikopedou",
      "Εκσκαφέας ανοίγει βαθιά εκσκαφή δίπλα σε κατοικία"
    ),
  },
  {
    id: "themelia-jcb",
    title: "Θεμέλια σε εξέλιξη",
    description:
      "Διαμόρφωση και επίχωση γύρω από θεμέλια με κολόνες. Το JCB δουλεύει πάνω στο πρανές, εκεί που δεν στέκεται μεγάλο μηχάνημα.",
    img: p("themelia-jcb", "JCB διαμορφώνει χώμα γύρω από θεμέλια με κολόνες"),
  },
  {
    id: "ksirizoma-dentrou",
    title: "Ξερίζωμα δέντρου σε αυλή",
    description:
      "Ολόκληρο δέντρο βγήκε με τη ρίζα του από αυλή σπιτιού, χωρίς να πειραχτεί η περίφραξη και το γκαζόν δίπλα.",
    img: p(
      "ksirizoma-dentrou",
      "Εκσκαφέας σηκώνει ολόκληρο δέντρο με τις ρίζες του από αυλή"
    ),
  },
  {
    id: "riza-megali",
    title: "Ρίζα που δεν έβγαινε αλλιώς",
    description:
      "Μεγάλη ρίζα σε οικόπεδο μέσα στον οικισμό. Βγήκε ολόκληρη, με το μηχάνημα να δουλεύει ανάμεσα σε αυλές και αυτοκίνητα.",
    img: p("riza-megali", "Μεγάλη ρίζα δέντρου στον κουβά του εκσκαφέα"),
  },
  {
    id: "ekskafi-vathia",
    title: "Δουλειά μέσα στο σκάμμα",
    description:
      "Δύο μηχανήματα μαζί: το μεγάλο βγάζει από πάνω, το μικρό καθαρίζει και ισιώνει μέσα στο σκάμμα.",
    img: p(
      "ekskafi-vathia",
      "Μικρό ερπυστριοφόρο μηχάνημα δουλεύει μέσα σε βαθύ σκάμμα"
    ),
  },
  {
    id: "stroma-chomatos",
    title: "Στρώσιμο χώματος σε αυλή",
    description:
      "Χώμα φερμένο, στρωμένο και ισοπεδωμένο μέχρι τον μαντρότοιχο, έτοιμο για φύτεμα.",
    img: p(
      "stroma-chomatos",
      "Φορτωτής και ερπυστριοφόρο στρώνουν χώμα σε αυλή δίπλα σε μαντρότοιχο"
    ),
  },
  {
    id: "tafros-syndesi",
    title: "Τάφρος για σύνδεση",
    description:
      "Στενή τάφρος με μικρό κουβά, δίπλα στον δρόμο και με το φορτηγό να περιμένει για τα χώματα.",
    img: p("tafros-syndesi", "Μικρός εκσκαφέας ανοίγει στενή τάφρο δίπλα σε φορτηγό"),
  },
  {
    id: "fortosi-kormon",
    title: "Φόρτωση κορμών",
    description:
      "Κομμένοι κορμοί φορτώθηκαν σε φορτηγό μέσα στον οικισμό, με τον δρόμο να μένει ανοιχτός.",
    img: p("fortosi-kormon", "Εκσκαφέας φορτώνει κορμούς δέντρων σε φορτηγό"),
  },
  {
    id: "metafora-dentron",
    title: "Μεταφορά δέντρων",
    description:
      "Ελιές με το χώμα τους, φορτωμένες σε δύο οχήματα για μεταφορά — ρίζα άθικτη, ώστε να ξαναφυτευτούν.",
    img: p(
      "metafora-dentron",
      "Φορτηγά φορτωμένα με ελιές και τις ρίζες τους, από την καμπίνα του μηχανήματος"
    ),
  },
  {
    id: "riza-se-kouva",
    title: "Κούτσουρο και ρίζες",
    description:
      "Κούτσουρο πεύκου με όλο του το ριζικό, βγαλμένο από κήπο ανάμεσα σε άλλα δέντρα.",
    img: p("riza-se-kouva", "Κούτσουρο με ρίζες στον κουβά του εκσκαφέα"),
  },
  {
    id: "tafros-themelia",
    title: "Τάφρος δίπλα σε θεμέλιο",
    description:
      "Σκάψιμο κατά μήκος έτοιμου θεμελίου. Δύο μηχανήματα δούλεψαν μαζί για να μη μείνει η δουλειά.",
    img: p(
      "tafros-themelia",
      "Εκσκαφέας ανοίγει τάφρο δίπλα σε έτοιμο θεμέλιο από μπετόν"
    ),
  },
  {
    id: "ergotaxio",
    title: "Δύο μηχανήματα σε εργοτάξιο",
    description:
      "Εκσκαφέας και ερπυστριοφόρο σε οικοδομή με κολόνες, να ισιώνουν και να καθαρίζουν τον χώρο.",
    img: p("ergotaxio", "Εκσκαφέας και ερπυστριοφόρο σε εργοτάξιο με κολόνες"),
  },
  {
    id: "paralia-vrachos",
    title: "Βράχος μέσα από τη θάλασσα",
    description:
      "Βγάλσιμο βράχου από το ρηχό νερό, με το μηχάνημα να δουλεύει από την ακτή.",
    img: p(
      "paralia-vrachos",
      "Εκσκαφέας σηκώνει βράχο μέσα από τα ρηχά, με τη θάλασσα γύρω",
      "3:4"
    ),
  },
  {
    id: "kipos-fortosi",
    title: "Φόρτωση μέσα από κήπο",
    description:
      "Φόρτωση σε φορτηγό ανάμεσα σε φυτεμένο κήπο, χωρίς να πειραχτούν τα γύρω φυτά.",
    img: p(
      "kipos-fortosi",
      "Εκσκαφέας φορτώνει φορτηγό ανάμεσα σε θάμνους και φυτά κήπου",
      "4:3"
    ),
  },
];

/** Homepage teaser — six, so the three-column masonry balances. */
export const ergaFeatured = erga.slice(0, 6);

/* ------------------------------------------------------------------ */
/* Στόλος                                                              */
/*                                                                     */
/* Labelled ONLY where the machine is unambiguous in the photograph —  */
/* the JCB and the CAT are branded, the wheel loader is obvious. The   */
/* excavators are not labelled by size, because we cannot tell μεγάλη  */
/* from μεσαία in a photo and guessing would be inventing. The full    */
/* confirmed machine list still appears as text on the page.           */
/* See PLACEHOLDER_MEDIA.md.                                           */
/* ------------------------------------------------------------------ */
export const stolos: { name: string; note: string; img: Img }[] = [
  {
    name: "Τσάπα",
    note: "Εκσκαφές, θεμέλια, ξεριζώματα",
    img: p("riza-se-kouva", "Τσάπα με κούτσουρο και ρίζες στον κουβά", "4:5"),
  },
  {
    name: "JCB",
    note: "Σκάψιμο και φόρτωση μαζί",
    img: p("themelia-jcb", "Το JCB σε εργοτάξιο με θεμέλια", "4:5"),
  },
  {
    name: "Φορτωτής",
    note: "Φόρτωση και μάζεμα",
    img: p("fortotis-elaionas", "Ο φορτωτής σε ελαιώνα", "4:5"),
  },
  {
    name: "Διαβολάκι",
    note: "Εκεί που δεν περνάει μεγάλο μηχάνημα",
    img: p("ekskafi-vathia", "Το διαβολάκι δουλεύει μέσα σε σκάμμα", "4:5"),
  },
  {
    name: "Φορτηγά",
    note: "Μεταφορά χωμάτων, μπάζων και κορμών",
    img: p("fortosi-kormon", "Φορτηγό φορτώνεται με κορμούς", "4:5"),
  },
  {
    name: "Μικρός εκσκαφέας",
    note: "Στενές τάφροι και αυλές",
    img: p("tafros-syndesi", "Μικρός εκσκαφέας ανοίγει τάφρο", "4:5"),
  },
];

/* ------------------------------------------------------------------ */
/* Service pages — only where a photograph genuinely shows that work.  */
/* βόθροι, εκβραχισμοί and καθαρισμοί παραλίας have none, so those      */
/* pages render without an image rather than with a stand-in.          */
/* ------------------------------------------------------------------ */
export const servicePhoto: Record<string, Img> = {
  ekskafes: p(
    "ekskafi-vathia",
    "Εκσκαφή σε βάθος, με δεύτερο μηχάνημα μέσα στο σκάμμα",
    "4:3"
  ),
  "katharismos-oikopedon": p(
    "ksirizoma-dentrou",
    "Ξερίζωμα δέντρου κατά τον καθαρισμό οικοπέδου",
    "4:3"
  ),
  "metafores-chomaton": p(
    "fortosi-kormon",
    "Φόρτωση σε φορτηγό για μεταφορά",
    "4:3"
  ),
  "choma-kipou": p(
    "stroma-chomatos",
    "Στρώσιμο και ισοπέδωση χώματος σε αυλή",
    "4:3"
  ),
  "syndeseis-nerou-apocheteusi": p(
    "tafros-syndesi",
    "Άνοιγμα στενής τάφρου για σύνδεση",
    "4:3"
  ),
  // The last three gaps, closed. These were the only service pages that
  // argued in words with nothing to look at — and καθαρισμός παραλίας is the
  // uncontested keyword no competitor covers, so it mattered most.
  vothroi: p(
    "vothros-daktylioi",
    "Τσιμεντένιοι δακτύλιοι βόθρου κατεβαίνουν στο σκάμμα με ιμάντες",
    "3:4"
  ),
  ekvrachismoi: p(
    "ekvrachismos-vrachos",
    "Μεγάλος βράχος στον κουβά του εκσκαφέα μετά τον εκβραχισμό",
    "3:4"
  ),
  "katharismos-paralias": p(
    "paralia-petres",
    "Εκσκαφέας μαζεύει πέτρες από την ακτή, με τη θάλασσα πίσω",
    "4:3"
  ),
};

/** Build-time integrity: every image needs real alt text and a real path. */
{
  const all: Img[] = [
    ...erga.map((e) => e.img),
    ...stolos.map((s) => s.img),
    ...Object.values(servicePhoto),
    etaireiaPhoto,
    heroPhoto,
  ];
  for (const img of all) {
    if (!img.alt || img.alt.trim().length < 10) {
      throw new Error(`media.ts: "${img.src}" has no usable alt text.`);
    }
    if (img.placeholder) {
      throw new Error(
        `media.ts: "${img.src}" is still flagged as a placeholder.`
      );
    }
    if (!img.src.startsWith("/erga/")) {
      throw new Error(`media.ts: "${img.src}" is not a real photo path.`);
    }
  }
}
