import type { MetadataRoute } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { abs } from "@/content/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Belt and braces: these routes also carry noindex in their metadata.
      disallow: HAS_REAL_PHOTOS ? [] : ["/exoplismos", "/erga"],
    },
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
