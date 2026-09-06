import type { Dictionary } from "./types";
import {
  hero,
  wordmark,
  servicesSection,
  areasSection,
  whySection,
  reviewsSection,
  contactSection,
  footer,
  seo,
} from "../site";
import { services, servicesPage } from "../services";
import { areaPages, areasPage, coverageSection } from "../areas";
import { faqPage, buildJourney, faqs } from "../faq";
import { etaireia, epikoinonia, gated } from "../pages";
import type { ServiceId, AreaId } from "./locales";
import type { ServiceCopy, AreaCopy } from "./types";

/**
 * Greek — an ADAPTER, not a copy.
 *
 * Greek copy stays where it has always lived: services.ts, areas.ts, site.ts,
 * faq.ts, pages.ts. This file only reshapes it into the Dictionary contract
 * the three translations implement. Duplicating the Greek here would mean two
 * places to edit and one of them silently going stale — and Greek is the
 * language the client actually reads and approves.
 *
 * So: if you are editing GREEK copy, edit the source files. This file should
 * only ever change when the SHAPE changes.
 */

const svc = Object.fromEntries(
  services.map((s) => [
    s.slug,
    {
      title: s.title,
      navTitle: s.navTitle,
      h1: s.h1,
      card: s.card,
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
      lede: s.lede,
      includesHeading: s.includesHeading,
      includes: [...s.includes],
      machinesHeading: s.machinesHeading,
      machines: s.machines,
      ...(s.note ? { note: s.note } : {}),
      askHeading: s.askHeading,
      ask: [...s.ask],
    } satisfies ServiceCopy,
  ])
) as Record<ServiceId, ServiceCopy>;

const areas = Object.fromEntries(
  areaPages.map((a) => [
    a.slug,
    {
      name: a.name,
      inName: a.inName,
      h1: a.h1,
      metaTitle: a.metaTitle,
      metaDescription: a.metaDescription,
      lede: a.lede,
      card: a.card,
      blocks: a.blocks.map((b) => ({ heading: b.heading, body: b.body })),
    } satisfies AreaCopy,
  ])
) as Record<AreaId, AreaCopy>;

export const el: Dictionary = {
  seo: { title: seo.title, description: seo.description },

  tagline: { full: wordmark.tagline, short: wordmark.taglineShort },

  hero: {
    eyebrow: hero.eyebrow,
    headingLead: hero.headingLead,
    lede: [...hero.lede],
    callLabel: hero.callLabel,
    quoteLabel: hero.quoteLabel,
    hours: hero.hours,
    credentials: hero.credentials.map((c) => ({ key: c.key, value: c.value })),
  },

  chrome: {
    navAria: "Κύρια πλοήγηση",
    menu: "ΜΕΝΟΥ",
    navigation: "ΠΛΟΗΓΗΣΗ",
    close: "ΚΛΕΙΣΙΜΟ",
    phoneLabel: "ΤΗΛΕΦΩΝΟ",
    phoneAria: "Τηλέφωνο",
    skipToContent: "Στο περιεχόμενο",
    footerServices: footer.servicesHeading,
    footerAreas: footer.areasHeading,
    footerContact: footer.contactHeading,
    footerPages: "Σελίδες",
    footerRights: footer.rights,
    privacyLabel: footer.privacyLabel,
    privacyNote: "",
  },

  navLabels: {
    home: "Αρχική",
    services: "Υπηρεσίες",
    areas: "Περιοχές",
    fleet: "Στόλος",
    about: "Ποιοι είμαστε",
    contact: "Επικοινωνία",
    faq: "Συχνές ερωτήσεις",
  },

  servicesSection: {
    eyebrow: servicesSection.eyebrow,
    heading: servicesSection.heading,
    lede: servicesSection.lede,
    cta: servicesSection.cta,
  },

  areasSection: {
    eyebrow: areasSection.eyebrow,
    heading: areasSection.heading,
    lede: areasSection.lede,
    priorityLabel: areasSection.priorityLabel,
  },

  whySection: {
    eyebrow: whySection.eyebrow,
    heading: whySection.heading,
    items: whySection.items.map((i) => ({
      figure: i.figure,
      title: i.title,
      body: i.body,
    })),
  },

  reviewsSection: {
    eyebrow: reviewsSection.eyebrow,
    heading: reviewsSection.heading,
    lede: reviewsSection.lede,
    cta: reviewsSection.cta,
    onGoogle: "στο Google",
    reviewsNoun: "κριτικές",
  },

  contactSection: {
    eyebrow: contactSection.eyebrow,
    heading: contactSection.heading,
    lede: contactSection.lede,
    mobileLabel: contactSection.mobileLabel,
    landlineLabel: contactSection.landlineLabel,
    emailLabel: contactSection.emailLabel,
    baseLabel: contactSection.baseLabel,
    baseValue: contactSection.baseValue,
    hoursLabel: "Ωράριο",
    hoursValue: "Ανοιχτά όλο το 24ωρο, κάθε μέρα",
    quoteCta: contactSection.quoteCta,
    quoteNote: contactSection.quoteNote,
    faqLink: "συχνές ερωτήσεις",
  },

  services: svc,

  servicesPage: {
    eyebrow: servicesPage.eyebrow,
    h1: servicesPage.h1,
    metaTitle: servicesPage.metaTitle,
    metaDescription: servicesPage.metaDescription,
    lede: servicesPage.lede,
    body: "Εννιά δουλειές, με δικά μας μηχανήματα και δικά μας φορτηγά. Από τον καθαρισμό ενός οικοπέδου μέχρι τη σύνδεση με το δίκτυο.",
    relatedHeading: servicesPage.relatedHeading,
    areasHeading: servicesPage.areasHeading,
    areasBody: servicesPage.areasBody,
    ctaHeading: "Πείτε μας τι δουλειά είναι",
    ctaBody: "Ένα τηλέφωνο αρκεί για να καταλάβουμε τι χρειάζεται και πόσο κάνει.",
    backToAll: "Όλες οι υπηρεσίες",
    workHeading: "Δουλειές μας",
    workLede: "Φωτογραφίες από δικά μας εργοτάξια στη Χαλκιδική.",
  },

  ergaSection: {
    eyebrow: "ΕΡΓΑ",
    heading: "Τι έχουμε παραδώσει",
    lede: "Ολοκληρωμένα έργα σε οικόπεδα, αυλές και ακτές της Χαλκιδικής. Όλες οι φωτογραφίες είναι δικές μας.",
    galleryHeading: "Δουλειές που έχουμε παραδώσει",
    galleryLede: "Ολοκληρωμένα έργα σε οικόπεδα, αυλές και ακτές της Χαλκιδικής. Όλες οι φωτογραφίες είναι δικές μας — καμία από το ίντερνετ.",
  },

  callBand: { label: "ΤΗΛΕΦΩΝΟ", endLabel: "ΤΕΛΟΣ" },

  areas,

  areasPage: {
    eyebrow: areasPage.eyebrow,
    h1: areasPage.h1,
    metaTitle: areasPage.metaTitle,
    metaDescription: areasPage.metaDescription,
    lede: areasPage.lede,
    listHeading: "Πού ερχόμαστε",
    servicesHeading: areasPage.servicesHeading,
    servicesBody: areasPage.servicesBody,
    priorityLabel: areasPage.priorityLabel,
    otherAreasHeading: areasPage.otherAreasHeading,
    backToAll: areasPage.backToAll,
  },

  daskalon: {
    name: "Οικισμός Δασκάλων",
    card: "Δίπλα μας, από το 1987 κι εκεί. Ίδια προτεραιότητα με τη Μεταμόρφωση.",
  },


  coverageSection: {
    eyebrow: coverageSection.eyebrow,
    heading: coverageSection.heading,
    body: coverageSection.body,
    closing: coverageSection.closing,
  },

  faqPage: {
    eyebrow: faqPage.eyebrow,
    h1: faqPage.h1,
    metaTitle: faqPage.metaTitle,
    metaDescription: faqPage.metaDescription,
    lede: faqPage.lede,
    questionsHeading: "Αυτά μας ρωτάνε",
  },

  buildJourney: {
    eyebrow: buildJourney.eyebrow,
    heading: buildJourney.heading,
    lede: buildJourney.lede,
    steps: buildJourney.steps.map((s) => ({
      n: s.n,
      title: s.title,
      body: s.body,
      id: s.slug as ServiceId,
    })),
    closing: buildJourney.closing,
  },

  faqs: faqs.map((f) => ({ q: f.q, a: f.a })),

  about: {
    eyebrow: etaireia.eyebrow,
    h1: etaireia.h1,
    metaTitle: etaireia.metaTitle,
    metaDescription: etaireia.metaDescription,
    lede: etaireia.lede,
    blocks: etaireia.blocks.map((b) => ({ heading: b.heading, body: b.body })),
  },

  contact: {
    eyebrow: epikoinonia.eyebrow,
    h1: epikoinonia.h1,
    metaTitle: epikoinonia.metaTitle,
    metaDescription: epikoinonia.metaDescription,
    lede: epikoinonia.lede,
    formHeading: epikoinonia.formHeading,
    formLede: epikoinonia.formLede,
    askNote: epikoinonia.askNote,
  },

  fleet: {
    eyebrow: gated.exoplismos.eyebrow,
    h1: gated.exoplismos.h1,
    metaTitle: gated.exoplismos.metaTitle,
    metaDescription: gated.exoplismos.metaDescription,
    lede: gated.exoplismos.lede,
    items: [...gated.exoplismos.items],
  },

  privacy: {
    eyebrow: "ΝΟΜΙΚΑ",
    h1: "Πολιτική απορρήτου",
    metaTitle: "Πολιτική απορρήτου | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    metaDescription:
      "Τι στοιχεία κρατάμε όταν επικοινωνείτε μαζί μας, γιατί, και για πόσο.",
    lede: "Σύντομη, γιατί συλλέγουμε ελάχιστα.",
    updated: "ΑΠΟΡΡΗΤΟ",
    blocks: [
      {
        heading: "Ποιοι είμαστε",
        // The business's own details are rendered from site.ts, not repeated
        // here — a phone number written into four locale files is a phone
        // number that will one day be wrong in three of them.
        body: [],
      },
      {
        heading: "Τι συλλέγουμε",
        body: [
          "Η ιστοσελίδα δεν έχει φόρμα και δεν συλλέγει στοιχεία από μόνη της. Κρατάμε μόνο ό,τι μας στέλνετε εσείς όταν μας παίρνετε τηλέφωνο ή μας γράφετε email — το όνομά σας, το τηλέφωνό σας και τη δουλειά που θέλετε. Τίποτε άλλο.",
        ],
      },
      {
        heading: "Γιατί",
        body: [
          "Για να σας απαντήσουμε και να σας δώσουμε τιμή. Δεν στέλνουμε διαφημιστικά μηνύματα και δεν δίνουμε τα στοιχεία σας σε κανέναν τρίτο για εμπορική χρήση.",
        ],
      },
      {
        heading: "Πού πηγαίνουν",
        body: [
          "Στο τηλέφωνο και στο γραμματοκιβώτιό μας. Η ιστοσελίδα φιλοξενείται στη Vercel, που την εμφανίζει για λογαριασμό μας.",
        ],
      },
      {
        heading: "Πόσο κρατιούνται",
        body: [
          "Το email μένει στο γραμματοκιβώτιό μας όσο χρειάζεται για τη δουλειά και για τυχόν επόμενη επικοινωνία. Αν θέλετε να διαγραφεί, πάρτε μας τηλέφωνο ή γράψτε μας και διαγράφεται.",
        ],
      },
      {
        heading: "Cookies και μετρήσεις",
        body: [
          "Η ιστοσελίδα δεν χρησιμοποιεί cookies παρακολούθησης ούτε διαφημιστικά cookies. Γι’ αυτό δεν θα δείτε αναδυόμενο παράθυρο συγκατάθεσης.",
          "Μετράμε μόνο πόσες φορές ανοίγει κάθε σελίδα, με την υπηρεσία Vercel Analytics. Η μέτρηση γίνεται χωρίς cookies και χωρίς στοιχεία που να σας ταυτοποιούν — δεν μαθαίνουμε ποιος επισκέφθηκε τη σελίδα, μόνο πόσοι.",
        ],
      },
      {
        heading: "Τα δικαιώματά σας",
        body: [
          "Μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των στοιχείων σας, ή να αποσύρετε τη συγκατάθεσή σας, με ένα τηλέφωνο ή ένα email. Έχετε επίσης δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα.",
        ],
      },
    ],
  },

  notFound: {
    metaTitle: "Η σελίδα δεν βρέθηκε | ΤΣΟΠΟΥΡΟΓΛΟΥ",
    h1: "Η σελίδα δεν βρέθηκε",
    lede: "Ίσως αλλάξαμε τη διεύθυνση ή έγινε λάθος στην πληκτρολόγηση. Πάρτε μας τηλέφωνο και σας λέμε αμέσως ό,τι χρειάζεστε.",
    servicesHeading: "Μήπως ψάχνατε κάτι από αυτά;",
    areasHeading: "Ή την περιοχή σας",
  },
};
