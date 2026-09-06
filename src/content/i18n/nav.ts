import { HAS_REAL_PHOTOS } from "../site";
import { dict } from "./index";
import { href } from "./paths";
import type { Route } from "./paths";
import type { Locale } from "./locales";

/**
 * The navigation, built per locale.
 *
 * Both the label and the URL change with the language — "Services" at
 * /en/services, "Услуги" at /mk/uslugi — so neither can be a constant. This
 * is the one place that pairing is made, and the header, the mobile panel and
 * the footer all read it, so they cannot drift out of step.
 *
 * FIVE ITEMS IN THE HEADER, deliberately. A nav a reader takes in at a glance
 * is worth more than one that lists everything; the FAQ is a real destination
 * and gets a footer link and a link from every call band, but it is not one
 * of the five things this business wants a stranger weighing first.
 *
 * `fleet` is gated on HAS_REAL_PHOTOS — the rule that the machines page shows
 * his machines or nothing at all. That is language-independent: a photograph
 * is not more honest in Serbian.
 */

export type NavItem = { href: string; label: string; route: Route };

const item = (locale: Locale, route: Route, label: string): NavItem => ({
  href: href(locale, route),
  label,
  route,
});

/** The five in the header, and the same five plus the FAQ in the footer. */
export function headerNav(locale: Locale): NavItem[] {
  const t = dict(locale);
  return [
    item(locale, { page: "services" }, t.navLabels.services),
    item(locale, { page: "areas" }, t.navLabels.areas),
    ...(HAS_REAL_PHOTOS ? [item(locale, { page: "fleet" }, t.navLabels.fleet)] : []),
    item(locale, { page: "about" }, t.navLabels.about),
    item(locale, { page: "contact" }, t.navLabels.contact),
  ];
}

export function footerNav(locale: Locale): NavItem[] {
  const t = dict(locale);
  return [...headerNav(locale), item(locale, { page: "faq" }, t.navLabels.faq)];
}
