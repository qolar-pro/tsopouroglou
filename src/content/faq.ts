/**
 * Συχνές ερωτήσεις.
 *
 * TWO JOBS IN ONE PAGE, on the client contact's instruction — the "are you
 * building?" walkthrough lives here rather than on a page of its own.
 *
 * WHY THIS PAGE EXISTS AT ALL. Every area and service page targets someone
 * who already knows the word for what they want — «εκσκαφή», «βόθρος»,
 * «εκβραχισμός». This page targets the person who does not: someone who has
 * bought a plot, wants to build a house or rooms, and types the whole
 * situation into Google in a full sentence. That phrasing matches nothing on
 * a service page and everything here.
 *
 * It is also where the trade synonyms live honestly — μπάζα, μπάζωμα,
 * ισοπέδωση, διαμόρφωση περιβάλλοντος χώρου, θεμέλια, σφυρί — because they
 * appear inside real answers to real questions rather than in a keyword list.
 *
 * WHAT IS NOT HERE, AND WHY:
 *  - NO PRICES. He has none published and inventing a range would be the
 *    exact fabrication the brief bans. The answer says how a price gets
 *    worked out, which is the honest and more useful thing.
 *  - NO LEGAL ADVICE. Permits are answered by pointing at the engineer who
 *    actually issues them. Stating Greek planning law as fact from memory on
 *    a tradesman's site would be worse than saying nothing.
 *  - NO DRIVE TIMES. Still none verified, same rule as areas.ts.
 *  - NO EMPTYING OF SEPTIC TANKS. He builds them and does not empty them;
 *    this is the page where people will ask, so it answers plainly.
 *
 * ON FAQ RICH RESULTS: Google stopped showing FAQ rich snippets for ordinary
 * sites in 2023, so the FAQPage schema here will not produce a star box in
 * the results. It is still worth emitting — the content ranks on its own and
 * this is the shape that AI answers and voice search read from. Nobody should
 * "fix" the missing rich result; it is not broken.
 */

export const faqPage = {
  eyebrow: "ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ",
  h1: "Συχνές ερωτήσεις",
  metaTitle: "Συχνές ερωτήσεις — Χωματουργικά Χαλκιδική | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  metaDescription:
    "Τι κοστίζει, τι άδεια χρειάζεται, από πού ξεκινάει η δουλειά όταν χτίζετε, πόσο γρήγορα ερχόμαστε. Χωματουργικά στη Χαλκιδική από το 1987. Τηλ. 697 355 7903.",
  lede: "Αυτά μας ρωτάνε στο τηλέφωνο. Αν δεν βρίσκετε το δικό σας, πάρτε μας — απαντάμε όλο το 24ωρο.",
} as const;

/**
 * «Χτίζετε;» — the build sequence, in order.
 *
 * This is the highest-value block on the site for someone who does not yet
 * know the vocabulary: it names each stage in the order it happens, so a
 * first-time builder can see where he comes in and what to ask for. Five of
 * the nine services appear here in their natural sequence, each linked.
 */
export const buildJourney = {
  eyebrow: "ΧΤΙΖΕΤΕ;",
  heading: "Χτίζετε; Να τι γίνεται πριν μπουν τα μπετά",
  lede: "Αν είναι η πρώτη σας φορά, η σειρά είναι συνήθως αυτή. Δεν χρειάζεται να ξέρετε τους όρους — πείτε μας τι θέλετε να χτίσετε και σας λέμε εμείς σε ποιο σημείο είμαστε.",
  steps: [
    {
      n: "1",
      title: "Καθαρίζει το οικόπεδο",
      body: "Ξερόχορτα, βάτα, παλιά μπάζα, ό,τι έχει μαζευτεί. Μέχρι να καθαρίσει δεν φαίνεται καν τι έχετε.",
      slug: "katharismos-oikopedon",
    },
    {
      n: "2",
      title: "Φεύγει ό,τι περισσεύει",
      body: "Αν υπάρχει παλιό κτίσμα, μάντρα ή τσιμεντένια πλάκα στη μέση, γκρεμίζεται και φορτώνεται. Αν βγει βράχος, σπάει με το σφυρί.",
      slug: "katedafiseis",
    },
    {
      n: "3",
      title: "Ισοπεδώνεται και σκάβονται τα θεμέλια",
      body: "Το έδαφος παίρνει τη μορφή που θέλει η μελέτη και ανοίγουν τα θεμέλια. Εδώ είναι που παίζει ρόλο ποια τσάπα θα έρθει.",
      slug: "ekskafes",
    },
    {
      n: "4",
      title: "Μπαίνουν νερό και αποχέτευση",
      body: "Οι τάφροι για τη σύνδεση με το δίκτυο, και ο βόθρος αν το σπίτι δεν συνδέεται με αποχέτευση.",
      slug: "syndeseis-nerou-apocheteusi",
    },
    {
      n: "5",
      title: "Στο τέλος, ο περιβάλλοντας χώρος",
      body: "Όταν τελειώσει το χτίσιμο, στρώνεται χώμα κήπου και διαμορφώνεται η αυλή. Πολλοί μας ξαναπαίρνουν χρόνια μετά γι' αυτό.",
      slug: "choma-kipou",
    },
  ],
  closing: "Δεν χρειάζεται να τα κανονίσετε όλα από την αρχή. Οι περισσότεροι μας παίρνουν στο πρώτο βήμα και τα υπόλοιπα τα λέμε στην πορεία.",
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Πόσο κοστίζει μια χωματουργική δουλειά;",
    a: "Εξαρτάται από το τι είναι, πόσο μεγάλο, τι έδαφος έχει και αν φτάνει μηχάνημα μέχρι εκεί. Δεν δίνουμε τιμή στα τυφλά. Πείτε μας στο τηλέφωνο τι θέλετε να γίνει και πού, και είτε σας λέμε αμέσως είτε περνάμε να το δούμε. Οι πελάτες μας γράφουν ότι είμαστε οικονομικοί· την τιμή όμως τη λέμε αφού ξέρουμε τη δουλειά.",
  },
  {
    q: "Χρειάζεται άδεια;",
    a: "Εξαρτάται από τη δουλειά. Ένας καθαρισμός οικοπέδου συνήθως δεν θέλει τίποτα· θεμέλια, βόθρος και κατεδάφιση θέλουν χαρτιά. Την άδεια την βγάζει ο μηχανικός σας, όχι εμείς — αλλά πείτε μας τι σκοπεύετε να κάνετε και σας λέμε τι έχουμε δει να ζητάνε σε αντίστοιχες δουλειές, ώστε να ξέρετε τι να τον ρωτήσετε.",
  },
  {
    q: "Πόσο γρήγορα μπορείτε να έρθετε;",
    a: "Στη Μεταμόρφωση και στον οικισμό Δασκάλων ερχόμαστε πρώτα — εκεί είναι η βάση μας και εκεί είναι παρκαρισμένα τα μηχανήματα. Στις υπόλοιπες περιοχές εξαρτάται από το τι τρέχει εκείνη τη βδομάδα. Πάρτε τηλέφωνο και θα σας πούμε πραγματική μέρα. Δεν δίνουμε ώρα που δεν μπορούμε να κρατήσουμε.",
  },
  {
    q: "Δουλεύετε Σαββατοκύριακο και αργίες;",
    a: "Το τηλέφωνο σηκώνεται όλο το 24ωρο, κάθε μέρα. Ένας σπασμένος σωλήνας ή ένας βόθρος που ξεχείλισε δεν περιμένει Δευτέρα. Για το πότε μπαίνει το μηχάνημα, το κανονίζουμε στο τηλέφωνο.",
  },
  {
    q: "Έχω στενή αυλή. Χωράει μηχάνημα;",
    a: "Συνήθως ναι. Έχουμε τρεις τσάπες — μεγάλη, μεσαία και μικρή — και διαβολάκι. Η μικρή και το διαβολάκι μπαίνουν σε αυλές και περάσματα όπου δεν χωράει τίποτε άλλο. Μετρήστε μας το πιο στενό σημείο απ' όπου πρέπει να περάσει το μηχάνημα και σας λέμε αμέσως.",
  },
  {
    q: "Φτιάχνετε βόθρους; Τους αδειάζετε κιόλας;",
    a: "Φτιάχνουμε βόθρους, από την εκσκαφή μέχρι το καπάκι. Δεν τους αδειάζουμε — αυτό το κάνει βυτιοφόρο, είναι άλλη δουλειά. Αν ψάχνετε απόφραξη ή άδειασμα, δεν είμαστε εμείς.",
  },
  {
    q: "Παίρνετε τα μπάζα και τα χώματα από το οικόπεδο;",
    a: "Ναι, έχουμε δικά μας φορτηγά. Φορτώνουμε και απομακρύνουμε χώματα, μπάζα και πέτρες, και το οικόπεδο μένει καθαρό. Φέρνουμε επίσης χώμα κήπου ή υλικό για μπάζωμα, αν χρειάζεται το αντίστροφο.",
  },
  {
    q: "Σε ποιες περιοχές έρχεστε;",
    a: "Σε πέντε: Μεταμόρφωση, οικισμός Δασκάλων, Νικήτη, Βατοπέδι και Ψακούδια. Στα δύο πρώτα είναι η βάση μας και εκεί ερχόμαστε πρώτα. Δεν δουλεύουμε πιο πέρα — προτιμάμε να είμαστε κοντά και συνεπείς σε λίγα χωριά, παρά να τρέχουμε παντού και να αργούμε. Αν είστε πιο μακριά, πάρτε μας και θα σας πούμε ειλικρινά αν είμαστε εμείς οι κατάλληλοι.",
  },
  {
    q: "Δεν ξέρω πώς λέγεται αυτό που θέλω. Τι να πω στο τηλέφωνο;",
    a: "Πείτε το με τα δικά σας λόγια. «Θέλω να χτίσω και είναι χορτάρια όλο», «μου βγήκε βράχος», «θέλω να στρώσω την αυλή», «γκρεμίζω ένα παλιό». Αρκεί. Από το 1987 τα έχουμε ακούσει όλα και θα καταλάβουμε τι χρειάζεται.",
  },
  {
    q: "Τι να έχω έτοιμο πριν σας πάρω;",
    a: "Τέσσερα πράγματα βοηθάνε: σε ποιο χωριό είναι, περίπου πόσα τετραγωνικά, τι θέλετε να γίνει, και αν φτάνει φορτηγό μέχρι εκεί. Αν δεν τα ξέρετε όλα, πάρτε μας έτσι κι αλλιώς.",
  },
];
