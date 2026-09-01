import type { MetadataRoute } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { abs } from "@/content/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Belt and braces: these routes also carry noindex in their metadata.
      // /v2 is a throwaway alternative design for comparison. It also
      // carries noindex; this is belt and braces until it is scrapped.
      disallow: ["/v2", "/v3", ...(HAS_REAL_PHOTOS ? [] : ["/exoplismos"])],
    },
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
