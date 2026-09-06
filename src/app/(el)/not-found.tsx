import type { Metadata } from "next";
import { dict } from "@/content/i18n";
import { NotFoundPage } from "@/components/pages";

export const metadata: Metadata = {
  title: dict("el").notFound.metaTitle,
  robots: { index: false, follow: true },
};

/**
 * Route-level 404 — a `notFound()` thrown inside the Greek group, such as an
 * unknown service or area slug. Renders inside (el)/layout.tsx, so it gets
 * the header, footer and call bar for free.
 *
 * The URL-matches-nothing case is app/global-not-found.tsx instead; both use
 * the same body so they cannot drift apart.
 */
export default function NotFound() {
  return <NotFoundPage lang="el" />;
}
