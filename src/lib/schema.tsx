import { business, seo } from "@/content/site";
import { services } from "@/content/services";
import { areaPages, widerAreas } from "@/content/areas";
import { heroPhoto } from "@/content/media";
import { SITE_URL, abs } from "@/content/site-config";

/**
 * JSON-LD.
 *
 * NO aggregateRating — ruled on at gate 1. Google's structured-data policy
 * prohibits self-serving review markup for LocalBusiness: a business marking
 * up ratings about itself, collected elsewhere. His 5.0★ is real, but marking
 * it up risks a manual action against the exact rankings this site exists to
 * win. The reviews are presented as ordinary content instead.
 *
 * Every URL derives from SITE_URL so the unregistered domain is a one-line
 * change.
 */

const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * `areaServed`.
 *
 * Three layers, because a searcher can name the place at three different
 * zoom levels and we want to match all of them:
 *
 *  1. The villages with their own pages, plus Δασκάλων — which has no page
 *     but is still somewhere he works.
 *  2. The wider villages he confirmed but which deliberately have no pages
 *     (see widerAreas in areas.ts). This is where they earn their keep: named
 *     in structured data without five near-duplicate pages.
 *  3. The two municipalities and the regional unit, as AdministrativeArea.
 *     This is the answer for somebody who does not know the village names —
 *     they search "Σιθωνία" or "Χαλκιδική", and those are now first-class
 *     entities here rather than words buried in body copy.
 *
 * NOT Θεσσαλονίκη. Chalkidiki is its own regional unit, not part of the
 * Thessaloniki one; both sit inside Κεντρική Μακεδονία. Claiming Thessaloniki
 * would be a false location signal on the one property Google reads literally.
 */
const areaServed = [
  ...[
    ...areaPages.map((a) => a.name),
    "Οικισμός Δασκάλων",
    ...widerAreas.map((a) => a.name),
  ].map((name) => ({ "@type": "Place", name })),
  ...["Δήμος Σιθωνίας", "Δήμος Πολυγύρου", "Χαλκιδική"].map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  /**
   * The radius, confirmed by the client: he will travel roughly 30–45km, and
   * 45km is the outer edge he named. This is the honest, machine-readable way
   * to say "we come this far" — the alternative that tempts everyone is a
   * landing page per town in the radius, which is a doorway-page pattern and
   * risks the whole site.
   */
  {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    geoRadius: "45000",
  },
];

/**
 * @param opts.description  Localised description for /en and /sr. The Greek
 *   pages pass nothing and get `seo.description`. Everything else — @id,
 *   phone, geo, hours — is identical across all three languages on purpose:
 *   it is one business, and one @id is what makes Google treat the three
 *   language versions as one entity rather than three.
 */
export function localBusinessSchema(opts?: { description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: business.legalName,
    alternateName: business.shortName,
    url: SITE_URL,
    telephone: `+30${business.phone.display.replace(/\s/g, "")}`,
    email: business.email,
    // 1987 is the single most valuable fact about this business.
    foundingDate: String(business.foundedYear),
    founder: business.owners.map((name) => ({ "@type": "Person", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
      // streetAddress deliberately omitted rather than guessed — Google has
      // no street number for him either. See PLACEHOLDERS.md item 3.
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    description: opts?.description ?? seo.description,
    /**
     * Entity linking. This is the single most valuable line here for local
     * search: it tells Google that this site and that Google Business Profile
     * are the same business, so the 5.0★ listing, the 24-hour opening hours
     * and the Maps position reinforce the site's rankings instead of
     * competing as two unconnected entities.
     */
    sameAs: [business.googleMapsUrl],
    /** Google's local-business guidance asks for an image. His own work. */
    image: abs(heroPhoto.src),
    logo: abs("/icon.svg"),
    hasMap: business.googleMapsUrl,
    /**
     * NO priceRange. It is a recommended property and we do not have his
     * prices — his reviews call him οικονομικός but that is not a number.
     * Inventing one to fill a schema field is exactly the fabrication the
     * brief bans.
     */
    // Confirmed on his verified Google Business Profile: 24h, seven days.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed,
    knowsLanguage: ["el", "en", "sr"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Χωματουργικές εργασίες",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: abs(`/ypiresies/${s.slug}`),
        },
      })),
    },
  };
}

/**
 * Service, per language.
 *
 * Each language's service page emits its own Service node, with that
 * language's name, description and URL, all pointing at the one business via
 * `provider`. The @id carries the URL, so the four language versions are four
 * distinct nodes describing the same offering rather than one node fighting
 * itself across four pages.
 */
export function serviceSchema(opts: {
  id: string;
  name: string;
  description: string;
  /** Site-relative, already localised. */
  url: string;
  language: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(opts.url)}#service`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.url),
    serviceType: opts.name,
    inLanguage: opts.language,
    provider: { "@id": BUSINESS_ID },
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: `+30${business.phone.display.replace(/\s/g, "")}`,
        contactType: "customer service",
        availableLanguage: ["el", "en", "sr", "mk"],
      },
      serviceUrl: abs(opts.url),
    },
  };
}

/**
 * FAQPage, per language.
 *
 * Google stopped showing FAQ rich snippets for ordinary sites in 2023, so
 * this will NOT produce an expandable box in the results. It is here because
 * the markup still tells Google what the page is, and because this is the
 * shape that AI Overviews and voice assistants read answers out of.
 *
 * Do not "fix" the absent rich result. It is not broken.
 *
 * Emitted only on the FAQ page itself — marking up questions that are not
 * visible on the page they are emitted from is against Google's guidelines.
 */
export function faqSchema(opts: {
  /** Site-relative, already localised. */
  url: string;
  language: string;
  faqs: { q: string; a: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs(opts.url)}#faq`,
    inLanguage: opts.language,
    mainEntity: opts.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    about: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/** Renders JSON-LD. Server-only; no client JS. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
