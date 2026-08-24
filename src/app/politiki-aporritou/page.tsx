import type { Metadata } from "next";
import { business } from "@/content/site";
import { SITE_URL } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Πολιτική απορρήτου | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  description:
    "Τι στοιχεία συλλέγει η φόρμα επικοινωνίας, γιατί, πού πηγαίνουν και για πόσο κρατιούνται.",
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
      <section className="section surface-field page-head">
        <div className="wrap">
          <p className="label">ΝΟΜΙΚΑ</p>
          <h1 className="h1" style={{ marginTop: "var(--s-3)" }}>
            Πολιτική απορρήτου
          </h1>
          <p className="lede" style={{ marginTop: "var(--s-5)" }}>
            <span className="measure">
              Σύντομη, γιατί συλλέγουμε ελάχιστα.
            </span>
          </p>
        </div>
      </section>

      <section className="section surface-raised">
        <div className="wrap legal">
          <h2 className="h3">Ποιοι είμαστε</h2>
          <p>
            {business.legalName}, {business.address.locality}{" "}
            {business.address.postalCode}, {business.address.region}.
            Τηλέφωνο <a href={business.phone.href}>{business.phone.display}</a>,
            email <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
          <p>ΑΦΜ: {business.vat}</p>

          <h2 className="h3">Τι συλλέγουμε</h2>
          <p>
            Μόνο όσα συμπληρώνετε μόνοι σας στη φόρμα προσφοράς: το όνομά σας,
            το τηλέφωνό σας, την περιοχή και την περιγραφή της δουλειάς.
            Τίποτε άλλο.
          </p>

          <h2 className="h3">Γιατί</h2>
          <p>
            Για να σας απαντήσουμε και να σας δώσουμε τιμή. Δεν στέλνουμε
            διαφημιστικά μηνύματα και δεν δίνουμε τα στοιχεία σας σε κανέναν
            τρίτο για εμπορική χρήση.
          </p>

          <h2 className="h3">Πού πηγαίνουν</h2>
          <p>
            Το μήνυμα φτάνει ως email στο{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>. Για την
            αποστολή χρησιμοποιούμε την υπηρεσία Resend, και η ιστοσελίδα
            φιλοξενείται στη Vercel. Και οι δύο επεξεργάζονται τα δεδομένα για
            λογαριασμό μας.
          </p>

          <h2 className="h3">Πόσο κρατιούνται</h2>
          <p>
            Το email μένει στο γραμματοκιβώτιό μας όσο χρειάζεται για τη
            δουλειά και για τυχόν επόμενη επικοινωνία. Αν θέλετε να διαγραφεί,
            πάρτε μας τηλέφωνο ή γράψτε μας και διαγράφεται.
          </p>

          <h2 className="h3">Cookies</h2>
          <p>
            Η ιστοσελίδα δεν χρησιμοποιεί cookies παρακολούθησης ούτε
            διαφημιστικά cookies. Γι&apos; αυτό δεν θα δείτε αναδυόμενο
            παράθυρο συγκατάθεσης.
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
      </section>
    </main>
  );
}
