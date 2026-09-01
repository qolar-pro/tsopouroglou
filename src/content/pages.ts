/**
 * Copy for the remaining standalone pages.
 *
 * /etaireia is the longest prose on the site. It leans on the review theme
 * the brief singled out — repeat customers, and being trusted with judgement
 * calls about layout — WITHOUT reproducing any review verbatim or inventing
 * a testimonial.
 */

export const etaireia = {
  eyebrow: "ΠΟΙΟΙ ΕΙΜΑΣΤΕ",
  h1: "Δύο αδέρφια, ένα χωριό, από το 1987",
  metaTitle: "Ποιοι είμαστε — Χωματουργικά Χαλκιδική | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  metaDescription:
    "Ο Γρηγόρης και ο Νικόλαος Τσοπούρογλου κάνουν χωματουργικές εργασίες στη Μεταμόρφωση Χαλκιδικής από το 1987. Πτυχίο χειριστή από το 1990. Τηλ. 697 355 7903.",
  lede: "Δύο αδέρφια με μηχανήματα, στο ίδιο χωριό, από το 1987.",
  blocks: [
    {
      heading: "Πώς ξεκίνησε",
      body: "Το 1987 αρχίσαμε να δουλεύουμε στη Μεταμόρφωση και στον οικισμό Δασκάλων. Από τότε δεν αλλάξαμε ούτε χωριό ούτε δουλειά. Τα ίδια χώματα, η ίδια οικογένεια.",
    },
    {
      heading: "Πτυχίο χειριστή",
      body: "Από το 1990, αδειούχος χειριστής μηχανημάτων έργου. Δεν το γράφουν πολλοί στον κλάδο, αλλά μετράει: άλλο να έχεις μάθει τη δουλειά και άλλο να έχεις αγοράσει ένα μηχάνημα.",
    },
    {
      heading: "Γιατί μας ξαναπαίρνουν",
      // Paraphrases the review themes the brief highlighted — repeat
      // customers, and being asked for layout advice. No review is quoted
      // and no testimonial is invented.
      body: "Οι περισσότερες δουλειές μας έρχονται από κόσμο που μας έχει ξαναπάρει ή που άκουσε για εμάς σε διπλανό οικόπεδο. Πολλές φορές μας ρωτάνε και τι θα κάναμε εμείς στη θέση τους — πού να πάει το γκαζόν, από πού να μπει το αυτοκίνητο. Λέμε τη γνώμη μας, γιατί έχουμε δει το αποτέλεσμα και στις δύο περιπτώσεις.",
    },
    {
      heading: "Το τηλέφωνο",
      body: "Απαντάμε όλο το 24ωρο. Δεν το γράφουμε για εντυπωσιασμό — ένας σπασμένος σωλήνας ή μια δουλειά που κόλλησε δεν περιμένει μέχρι τη Δευτέρα.",
    },
  ],
} as const;

export const epikoinonia = {
  eyebrow: "ΕΠΙΚΟΙΝΩΝΙΑ",
  h1: "Πάρτε μας τηλέφωνο",
  metaTitle: "Επικοινωνία — Χωματουργικά Χαλκιδική | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  metaDescription:
    "Τηλέφωνο 697 355 7903, σταθερό 2375 061341, email. Χωματουργικές εργασίες στη Μεταμόρφωση Χαλκιδικής. Ανοιχτά όλο το 24ωρο.",
  lede: "Το τηλέφωνο είναι ανοιχτό όλο το 24ωρο. Αν προτιμάτε να γράψετε, συμπληρώστε τη φόρμα και σας παίρνουμε εμείς.",
  formHeading: "Ζητήστε προσφορά",
  // Was "Τέσσερα πεδία" when a form existed. There is no form now, so the
  // copy has to describe what actually happens.
  formLede:
    "Πάρτε μας τηλέφωνο ή στείλτε μας email. Απαντάμε το συντομότερο.",
  askNote:
    "Πείτε μας τι δουλειά είναι, σε ποια περιοχή, και πότε τη θέλετε. Με αυτά σας λέμε τιμή.",
} as const;

export const gated = {
  exoplismos: {
    eyebrow: "ΣΤΟΛΟΣ",
    h1: "Τα μηχανήματά μας",
    metaTitle: "Στόλος & εξοπλισμός | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription:
      "Ο στόλος μας: τρεις τσάπες, φορτωτής, φορτηγά, JCB, διαβολάκι, τρακτέρ.",
    lede: "Τρεις τσάπες — μεγάλη, μεσαία και μικρή — φορτωτής, φορτηγά, JCB, διαβολάκι και τρακτέρ.",
    // Confirmed equipment only. Nothing here is invented.
    items: [
      "Τσάπα μεγάλη",
      "Τσάπα μεσαία",
      "Τσάπα μικρή",
      "Φορτωτής",
      "Φορτηγά",
      "JCB",
      "Διαβολάκι",
      "Τρακτέρ",
    ],
  },
  erga: {
    eyebrow: "ΕΡΓΑ",
    h1: "Δουλειές μας",
    metaTitle: "Έργα | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription: "Φωτογραφίες από δουλειές μας στη Χαλκιδική.",
    lede: "Φωτογραφίες από οικόπεδα, θεμέλια και αυλές στη Μεταμόρφωση και γύρω.",
  },
  /**
   * Shown in place of the content while HAS_REAL_PHOTOS is false. The page
   * exists so the route doesn't 404 during development, but it is noindex,
   * out of the nav and out of the sitemap — and it says plainly that there
   * is nothing here yet rather than filling the space with stock.
   */
  placeholderNotice:
    "Αυτή η σελίδα δεν έχει δημοσιευτεί ακόμη. Περιμένουμε πραγματικές φωτογραφίες από τα μηχανήματα και τις δουλειές μας — δεν βάζουμε φωτογραφίες από το ίντερνετ.",
} as const;
