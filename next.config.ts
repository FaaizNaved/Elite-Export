import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Address permanence — UX Blueprint R29.2.
 *
 * > Addresses are permanent. A surface's address does not change; if content
 * > moves, the old address continues to resolve to it. A broken link sent to a
 * > colleague is a failure of Repeatability in the only place the buyer can
 * > see it.
 *
 * Two collisions at §52.3 moved content in this package, so both old addresses
 * are held open here, permanently (308), and they are never removed:
 *
 * - **`/contact` and `/buyer-enquiry` → `/enquiry`.** R25.2 permits one door;
 *   these were two. R51A.9 required the merge before Priority 1 ships.
 * - **`/blog` → `/journal`.** R24.1 and Creative Direction Book §20 reject the
 *   register the old name carries. The article addresses move with it.
 *
 * `permanent: true` is deliberate. A 307 tells a search engine and a browser
 * that the move may be undone, which is the opposite of what R29.2 says about
 * this system's addresses.
 */
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    /*
     * The one delivery quality the primitive fixes (VDS §32.3, Creative
     * Direction Book §14.3). This framework version refuses any quality not
     * listed here and silently serves its default instead — so the number the
     * primitive asks for has to be allowed, or grain and shadow detail are
     * discarded by a config nobody was looking at. It is listed alone: a
     * second entry would be a second delivery quality (R7.1).
     */
    qualities: [90],
  },
  redirects() {
    return Promise.resolve([
      { source: "/contact", destination: "/enquiry", permanent: true },
      { source: "/buyer-enquiry", destination: "/enquiry", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
    ]);
  },
};

const withMDX = createMDX({
  options: {
    // String form is required for Turbopack (functions can't cross into Rust).
    // remark-frontmatter only strips the YAML block; frontmatter *data* is read
    // from disk by the content engine (src/lib/content/source.ts).
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
