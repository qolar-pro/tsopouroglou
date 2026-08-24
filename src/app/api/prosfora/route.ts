import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FROM_EMAIL, TO_EMAIL } from "@/content/site-config";

/**
 * Quote form endpoint.
 *
 * This route is the reason the site is not a static export: the Resend key
 * must stay server-side. Every content page is still prerendered.
 *
 * Spam protection is deliberately lightweight — no captcha. The audience is
 * 40-70 year olds on a phone, and a captcha would cost more real submissions
 * than the spam it stops. Three cheap layers instead:
 *   1. a honeypot field hidden from people but not from bots
 *   2. a minimum fill time (bots submit instantly)
 *   3. required consent, which must be an explicit true
 */

const MIN_FILL_MS = 3000;

type Payload = {
  onoma?: string;
  tilefono?: string;
  perioxi?: string;
  ergasia?: string;
  synainesi?: boolean;
  startedAt?: number;
  /** Honeypot. Must be empty. */
  website?: string;
};

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  // 1. Honeypot — a real person never sees this field.
  if (clean(body.website, 200) !== "") {
    // Return success so a bot learns nothing from the response.
    return NextResponse.json({ ok: true });
  }

  // 2. Fill time.
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const onoma = clean(body.onoma, 120);
  const tilefono = clean(body.tilefono, 40);
  const perioxi = clean(body.perioxi, 120);
  const ergasia = clean(body.ergasia, 2000);

  if (!onoma || !tilefono || !ergasia) {
    return NextResponse.json({ error: "missing-fields" }, { status: 422 });
  }
  // 3. Consent must be explicitly true — GDPR, and it is unticked by default.
  if (body.synainesi !== true) {
    return NextResponse.json({ error: "consent-required" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  const resend = new Resend(key);

  const text = [
    `Νέο αίτημα προσφοράς από την ιστοσελίδα`,
    ``,
    `Όνομα:    ${onoma}`,
    `Τηλέφωνο: ${tilefono}`,
    `Περιοχή:  ${perioxi || "—"}`,
    ``,
    `Τι δουλειά:`,
    ergasia,
  ].join("\n");

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      // So he can press reply on his phone and it goes to the customer's
      // address only if they gave one — we collect a phone, not an email,
      // so the subject carries the number instead.
      subject: `Προσφορά — ${onoma} — ${tilefono}`,
      text,
    });

    if (error) {
      console.error("resend error", error);
      return NextResponse.json({ error: "send-failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("resend threw", err);
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }
}
