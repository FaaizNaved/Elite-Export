import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
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
