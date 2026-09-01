import type { Metadata } from "next";
import { business } from "@/content/site";
import { SITE_URL } from "@/content/site-config";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Πολιτική απορρήτου | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  description:
    "Τι στοιχεία κρατάμε όταν επικοινωνείτε μαζί μας, γιατί, και για πόσο.",
  alternates: { canonical: "/politiki-aporritou" },
};

/**
 * GDPR. The site collects exactly four fields and nothing else — no cookies,
 * no analytics that identify anyone, no third-party trackers. The policy says
 * so plainly rather than in boilerplate, because a page nobody can read is
 * not consent.
 */
export default function Privacy() {
  return (
    <main>
      <PageHero
        label="ΝΟΜΙΚΑ"
        title={<h1 className="h1">Πολιτική απορρήτου</h1>}
        lede="Σύντομη, γιατί συλλέγουμε ελάχιστα."
      />

      <Band label="ΑΠΟΡΡΗΤΟ">
        <div className="legal">
          <h2 className="h3">Ποιοι είμαστε</h2>
          <p>
            {business.legalName}, {business.address.locality}{" "}
            {business.address.postalCode}, {business.address.region}.
            Τηλέφωνο <a href={business.phone.href}>{business.phone.display}</a>,
            email <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>

          <h2 className="h3">Τι συλλέγουμε</h2>
          <p>
            Η ιστοσελίδα δεν έχει φόρμα και δεν συλλέγει στοιχεία από μόνη
            της. Κρατάμε μόνο ό,τι μας στέλνετε εσείς όταν μας παίρνετε
            τηλέφωνο ή μας γράφετε email — το όνομά σας, το τηλέφωνό σας και
            τη δουλειά που θέλετε. Τίποτε άλλο.
          </p>

          <h2 className="h3">Γιατί</h2>
          <p>
            Για να σας απαντήσουμε και να σας δώσουμε τιμή. Δεν στέλνουμε
            διαφημιστικά μηνύματα και δεν δίνουμε τα στοιχεία σας σε κανέναν
            τρίτο για εμπορική χρήση.
          </p>

          <h2 className="h3">Πού πηγαίνουν</h2>
          <p>
            Στο τηλέφωνο και στο γραμματοκιβώτιό μας, στο{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>. Η
            ιστοσελίδα φιλοξενείται στη Vercel, που την εμφανίζει για
            λογαριασμό μας.
          </p>

          <h2 className="h3">Πόσο κρατιούνται</h2>
          <p>
            Το email μένει στο γραμματοκιβώτιό μας όσο χρειάζεται για τη
            δουλειά και για τυχόν επόμενη επικοινωνία. Αν θέλετε να διαγραφεί,
            πάρτε μας τηλέφωνο ή γράψτε μας και διαγράφεται.
          </p>

          <h2 className="h3">Cookies και μετρήσεις</h2>
          <p>
            Η ιστοσελίδα δεν χρησιμοποιεί cookies παρακολούθησης ούτε
            διαφημιστικά cookies. Γι&apos; αυτό δεν θα δείτε αναδυόμενο
            παράθυρο συγκατάθεσης.
          </p>
          <p>
            Μετράμε μόνο πόσες φορές ανοίγει κάθε σελίδα, με την υπηρεσία
            Vercel Analytics. Η μέτρηση γίνεται χωρίς cookies και χωρίς
            στοιχεία που να σας ταυτοποιούν — δεν μαθαίνουμε ποιος
            επισκέφθηκε τη σελίδα, μόνο πόσοι.
          </p>

          <h2 className="h3">Τα δικαιώματά σας</h2>
          <p>
            Μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των στοιχείων
            σας, ή να αποσύρετε τη συγκατάθεσή σας, με ένα τηλέφωνο ή ένα
            email. Έχετε επίσης δικαίωμα καταγγελίας στην Αρχή Προστασίας
            Δεδομένων Προσωπικού Χαρακτήρα.
          </p>

          <h2 className="h3">Ιστοσελίδα</h2>
          <p>{SITE_URL}</p>
        </div>
      </Band>
    </main>
  );
}
