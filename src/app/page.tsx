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
 * Surfaces alternate field / raised so rhythm comes from two light tones
 * rather than from a dark band. Only the footer is dark.
 *
 * ErgaStrip renders itself null unless there is something honest to show,
 * so the Έργα section is simply absent when there are no photos. A missing
 * gallery is fine; a gallery of stock presented as his work is not.
 */
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
