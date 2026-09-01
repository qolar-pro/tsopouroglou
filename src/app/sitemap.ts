import type { MetadataRoute } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { services } from "@/content/services";
import { publishedAreas } from "@/content/areas";
import { abs, CONTENT_UPDATED } from "@/content/site-config";
import { TRANSLATED } from "@/content/i18n";

/**
 * The sitemap is generated from the same flags that govern the nav, so a
 * gated route cannot leak into it. /erga and /exoplismos stay out while
 * HAS_REAL_PHOTOS is false; an area stays out while its needsInput is true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // See CONTENT_UPDATED: a build timestamp here is a lie told every deploy.
  const now = new Date(CONTENT_UPDATED);

  const core = ["/", "/ypiresies", "/perioxes", "/etaireia", "/epikoinonia"];
  const gated = HAS_REAL_PHOTOS ? ["/exoplismos"] : [];

  return [
    ...core.map((path) => ({
      url: abs(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: abs(`/ypiresies/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...publishedAreas.map((a) => ({
      url: abs(`/perioxes/${a.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...gated.map((path) => ({
      url: abs(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // The translated landing pages. Without these they are reachable only
    // from the header switcher, which is a weak discovery path for a page
    // meant to be found by a Serbian owner searching in Serbian.
    ...TRANSLATED.map((lang) => ({
      url: abs(`/${lang}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: abs("/politiki-aporritou"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
