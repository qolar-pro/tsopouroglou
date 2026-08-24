"use client";

import { useRef, useState } from "react";
import { contactSection } from "@/content/site";

/**
 * Four fields, as specced: όνομα, τηλέφωνο, περιοχή, τι δουλειά.
 *
 * The form exists mainly to unlock Google's "Online estimates" attribute,
 * which competing listings already have. For this audience the phone will
 * outperform it, so the phone sits above it on every page — this is the
 * secondary path, and it is kept short enough that finishing it is plausible
 * on a phone with one thumb.
 *
 * No captcha: it would cost more real submissions from 40-70 year olds than
 * the spam it stops. The honeypot and fill-timer are handled server-side.
 */

type State = "idle" | "sending" | "sent" | "error";

const MESSAGES: Record<string, string> = {
  "missing-fields": "Συμπληρώστε όνομα, τηλέφωνο και τι δουλειά είναι.",
  "consent-required": "Χρειάζεται να συμφωνήσετε με την πολιτική απορρήτου.",
  "not-configured":
    "Η φόρμα δεν είναι διαθέσιμη αυτή τη στιγμή. Πάρτε μας τηλέφωνο.",
  "send-failed":
    "Κάτι πήγε στραβά με την αποστολή. Πάρτε μας τηλέφωνο και το λύνουμε.",
  default: "Κάτι πήγε στραβά. Πάρτε μας τηλέφωνο.",
};

export default function QuoteForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  // Set on mount, compared server-side. Bots submit faster than people type.
  const startedAt = useRef(Date.now());
  const liveRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/prosfora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          onoma: fd.get("onoma"),
          tilefono: fd.get("tilefono"),
          perioxi: fd.get("perioxi"),
          ergasia: fd.get("ergasia"),
          synainesi: fd.get("synainesi") === "on",
          website: fd.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(MESSAGES[json?.error] ?? MESSAGES.default);
        setState("error");
        return;
      }
      setState("sent");
    } catch {
      setError(MESSAGES.default);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="form-done" role="status">
        <h3 className="h3">Το λάβαμε.</h3>
        <p style={{ marginTop: "var(--s-3)" }}>
          Θα σας πάρουμε τηλέφωνο. Αν βιάζεστε, πάρτε εσείς — το τηλέφωνο
          είναι ανοιχτό όλο το 24ωρο.
        </p>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={onSubmit} noValidate>
      {/* Honeypot. Hidden from people, not from bots. Not display:none —
          some bots skip those. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Μην συμπληρώσετε αυτό το πεδίο</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="onoma">
          Όνομα <span className="req">*</span>
        </label>
        <input id="onoma" name="onoma" type="text" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="tilefono">
          Τηλέφωνο <span className="req">*</span>
        </label>
        <input
          id="tilefono"
          name="tilefono"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div className="field">
        <label htmlFor="perioxi">Περιοχή</label>
        <input
          id="perioxi"
          name="perioxi"
          type="text"
          autoComplete="address-level2"
        />
      </div>

      <div className="field">
        <label htmlFor="ergasia">
          Τι δουλειά <span className="req">*</span>
        </label>
        <textarea id="ergasia" name="ergasia" rows={4} required />
      </div>

      <div className="consent">
        {/* Unticked by default. Required. GDPR. */}
        <input id="synainesi" name="synainesi" type="checkbox" required />
        <label htmlFor="synainesi">
          Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου για να απαντήσουμε στο
          αίτημά σας, όπως περιγράφεται στην{" "}
          <a href="/politiki-aporritou">πολιτική απορρήτου</a>.
        </label>
      </div>

      <button
        className="btn btn-call btn-block"
        type="submit"
        disabled={state === "sending"}
        aria-disabled={state === "sending"}
      >
        {state === "sending" ? "Αποστολή…" : contactSection.quoteCta}
      </button>

      <p className="form-status" role="status" aria-live="polite" ref={liveRef}>
        {error}
      </p>
    </form>
  );
}
