import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Next 16 changed the default from "any quality" to `[75]`, and a `quality`
     * prop outside the list is silently coerced to the nearest allowed value —
     * it does not error. The hero (90), the full-bleed plates (90) and the hide
     * band (88) were all being served at 75, which is precisely the wrong place
     * to lose detail: they are the largest photographs on the site and the ones
     * that have to carry leather grain. Every value used in the codebase has to
     * appear here.
     */
    qualities: [75, 88, 90],
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
