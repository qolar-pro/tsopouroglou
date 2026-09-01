import { business, seo } from "@/content/site";
import { services, type Service } from "@/content/services";
import { areaPages } from "@/content/areas";
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
 * `areaServed` covers every village in the brief's target terms, including
 * Δασκάλων — which has no page of its own but is still a place he serves.
 */
const areaServed = [
  ...areaPages.map((a) => a.name),
  "Οικισμός Δασκάλων",
].map((name) => ({ "@type": "Place", name }));

export function localBusinessSchema() {
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
    description: seo.description,
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
    knowsLanguage: "el",
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

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/ypiresies/${service.slug}#service`),
    name: service.title,
    description: service.metaDescription,
    url: abs(`/ypiresies/${service.slug}`),
    serviceType: service.title,
    provider: { "@id": BUSINESS_ID },
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: `+30${business.phone.display.replace(/\s/g, "")}`,
        contactType: "customer service",
        availableLanguage: "el",
      },
      serviceUrl: abs("/epikoinonia"),
    },
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
