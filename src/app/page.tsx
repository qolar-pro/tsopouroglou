import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ErgaStrip from "@/components/ErgaStrip";
import Areas from "@/components/Areas";
import WhyUs from "@/components/WhyUs";
import ContactBlock from "@/components/ContactBlock";

/**
 * Section order follows the brief:
 *   hero → υπηρεσίες → [έργα] → περιοχές → γιατί εμάς → επικοινωνία
 *
 * One continuous white ground, sections divided by a hairline and named in
 * the left rail. Rhythm comes from the rail and the rules, not from
 * alternating fills — Areas takes the single gravel band and the closing
 * contact section takes the single dark one, which is what makes the phone
 * number the last and heaviest thing on the page.
 *
 * ErgaStrip renders itself null unless there is something honest to show,
 * so the Έργα section is simply absent when there are no photos. A missing
 * gallery is fine; a gallery of stock presented as his work is not.
 */
/**
 * Title and description are inherited from the layout; only the canonical is
 * page-specific. Every other route set one and the homepage did not — the
 * most-linked page on the site was the one without it, which is exactly where
 * a stray ?utm_ or a trailing-slash variant does the most damage.
 */
export const metadata: Metadata = {
  alternates: pageAlternates("/"),
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ErgaStrip />
      <Areas />
      <WhyUs />
      <ContactBlock />
    </main>
  );
}
