import type { MetadataRoute } from "next";
import { HAS_REAL_PHOTOS } from "@/content/site";
import { abs } from "@/content/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Belt and braces: these routes also carry noindex in their metadata.
      // /_iconlab and /preview are throwaway design comparisons. They live
      // in the app for now so they can be opened on a phone; neither should
      // ever be crawlable. Both get deleted once a direction is chosen.
      disallow: [
        "/preview",
        "/_iconlab",
        ...(HAS_REAL_PHOTOS ? [] : ["/exoplismos"]),
      ],
    },
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
