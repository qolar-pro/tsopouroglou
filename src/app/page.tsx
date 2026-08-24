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
 * Έργα is absent while HAS_REAL_PHOTOS is false. A missing gallery is fine;
 * a gallery of stock excavators presented as his work is not.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Areas />
      <WhyUs />
      <ContactBlock />
    </main>
  );
}
