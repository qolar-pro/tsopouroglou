"use client";

import { useEffect } from "react";
import { business } from "@/content/site";

/**
 * The error boundary, in Greek.
 *
 * Next's default is an English stack-trace page in development and a bare
 * English string in production. On this site the one thing a visitor must
 * always be able to do is call, so that survives even when rendering did
 * not — and this file deliberately depends on nothing but `business`, since
 * whatever broke may well be in the shared furniture.
 *
 * A route segment error, not the document: layout.tsx still renders, so the
 * header, footer and sticky call bar are all still on the page beneath this.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vercel captures this in runtime logs; the digest is what ties a report
    // from the client ("it showed an error") to an actual server-side trace.
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="band band--head">
        <div className="wrap band-grid">
          <p className="band-label">ΣΦΑΛΜΑ</p>
          <div className="band-body">
            <h1 className="h1">Κάτι πήγε στραβά</h1>
            <p className="lede">
              <span className="measure-prose">
                Η σελίδα δεν φόρτωσε σωστά. Δοκιμάστε ξανά — αν συνεχίσει,
                πάρτε μας τηλέφωνο και το κανονίζουμε από εκεί.
              </span>
            </p>

            <div className="band-cta">
              <a className="btn btn-call" href={business.phone.href}>
                ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
              </a>
              <button className="btn btn-secondary" onClick={reset}>
                Δοκιμάστε ξανά
              </button>
            </div>

            <p className="small" style={{ marginTop: "var(--s-5)" }}>
              {business.hoursNote}. Σταθερό{" "}
              <a className="inline-link" href={business.landline.href}>
                <span className="num">{business.landline.display}</span>
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
