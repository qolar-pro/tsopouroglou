import type { Metadata } from "next";
import NotFoundBody from "@/components/NotFoundBody";

export const metadata: Metadata = {
  title: "Η σελίδα δεν βρέθηκε | ΤΣΟΠΟΥΡΟΓΛΟΥ",
  robots: { index: false, follow: true },
};

/**
 * Route-level 404 — a `notFound()` thrown inside the Greek group, such as an
 * unknown service or area slug. Renders inside (el)/layout.tsx, so it gets
 * the header, footer and call bar for free.
 *
 * The URL-matches-nothing case is app/global-not-found.tsx instead; both
 * share NotFoundBody so they cannot drift apart.
 */
export default function NotFound() {
  return <NotFoundBody />;
}
