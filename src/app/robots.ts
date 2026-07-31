import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing under /api is useful to a crawler.
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
