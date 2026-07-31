// @ts-check
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Generates placeholder imagery for every asset the content layer references.
 *
 * These are stand-ins so pages can be built, reviewed and performance-tested
 * before the client's photography arrives. Replace a file in place and nothing
 * else has to change — the content files already point at these paths.
 *
 *   npm run generate:placeholders
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Brand-range tones, so a page of placeholders still reads as one palette. */
const TONES = [
  ["#2A2724", "#514840"],
  ["#4A3E33", "#7A6248"],
  ["#6B573F", "#A9814F"],
  ["#8C7355", "#C4A276"],
  ["#B68D40", "#7C5F2B"],
  ["#3A3632", "#6E6257"],
];

const RATIO = {
  hero: [2400, 1200],
  heroTall: [2400, 1350],
  wide: [1600, 900],
  square: [1200, 1200],
  product: [2000, 2000],
  portrait: [1200, 1600],
  og: [1200, 630],
};

/** @type {Array<[string, keyof typeof RATIO]>} */
const IMAGES = [
  // Page heroes
  ["images/hero/home-hero", "heroTall"],
  ["images/hero/about-hero", "hero"],
  ["images/hero/manufacturing-hero", "hero"],
  ["images/hero/technology-hero", "hero"],
  ["images/hero/quality-hero", "hero"],
  ["images/hero/export-hero", "hero"],
  ["images/hero/gallery-hero", "hero"],
  ["images/hero/products-hero", "hero"],
  ["images/hero/contact-hero", "hero"],
  ["images/hero/enquiry-hero", "hero"],
  ["images/hero/cta-workshop", "hero"],

  // Company
  ["images/about/about-hero", "hero"],
  ["images/about/workshop", "wide"],
  ["images/about/craftsman", "portrait"],
  ["images/about/infrastructure", "wide"],

  // Categories
  ["images/categories/western-tack/western-tack-hero", "hero"],
  ["images/categories/western-tack/western-tack-thumb", "square"],
  ["images/categories/western-tack/headstall/headstall-thumb", "square"],
  ["images/categories/western-tack/breast-collar/breast-collar-thumb", "square"],
  ["images/categories/leather-bags/leather-bags-hero", "hero"],
  ["images/categories/leather-bags/leather-bags-thumb", "square"],
  ["images/categories/leather-bags/messenger-bags/messenger-bags-thumb", "square"],

  // Products
  ["images/products/western-tack/headstall/one-ear-headstall/one-ear-headstall-thumb", "square"],
  ["images/products/western-tack/headstall/one-ear-headstall/one-ear-headstall-front", "product"],
  ["images/products/western-tack/headstall/one-ear-headstall/one-ear-headstall-detail", "product"],
  ["images/products/western-tack/headstall/one-ear-headstall/one-ear-headstall-hardware", "product"],
  ["images/products/western-tack/headstall/browband-headstall/browband-headstall-thumb", "square"],
  ["images/products/western-tack/headstall/browband-headstall/browband-headstall-front", "product"],
  ["images/products/western-tack/headstall/browband-headstall/browband-headstall-detail", "product"],
  [
    "images/products/leather-bags/messenger-bags/heritage-messenger-bag/heritage-messenger-bag-thumb",
    "square",
  ],
  [
    "images/products/leather-bags/messenger-bags/heritage-messenger-bag/heritage-messenger-bag-front",
    "product",
  ],
  [
    "images/products/leather-bags/messenger-bags/heritage-messenger-bag/heritage-messenger-bag-interior",
    "product",
  ],

  // Manufacturing stages
  ...[
    "hide-selection",
    "pattern-making",
    "cutting",
    "machine-processing",
    "assembly",
    "finishing",
    "inspection",
    "packaging",
  ].map((step) => /** @type {[string, keyof typeof RATIO]} */ ([`images/manufacturing/${step}`, "wide"])),

  // Machinery
  ...[
    "clicking-press",
    "computerised-stitching",
    "skiving-machine",
    "edge-painting-line",
    "embossing-press",
    "strap-cutting-machine",
  ].flatMap((machine) => /** @type {Array<[string, keyof typeof RATIO]>} */ ([
    [`images/machinery/${machine}/${machine}-thumb`, "wide"],
    [`images/machinery/${machine}/${machine}-hero`, "hero"],
  ])),

  // Gallery albums
  ...["factory", "machinery", "products", "packaging", "events"].flatMap((album) =>
    /** @type {Array<[string, keyof typeof RATIO]>} */ ([
      [`images/gallery/${album}/${album}-cover`, "wide"],
      ...Array.from({ length: 6 }, (_, index) => /** @type {[string, keyof typeof RATIO]} */ ([
        `images/gallery/${album}/${album}-${index + 1}`,
        index % 3 === 0 ? "portrait" : "wide",
      ])),
    ]),
  ),

  // Certificates
  ...["iso-9001", "lwg-gold", "sedex"].map(
    (cert) => /** @type {[string, keyof typeof RATIO]} */ ([`images/certificates/${cert}`, "portrait"]),
  ),

  // Quality
  ["images/quality/inspection-bench", "wide"],
  ["images/quality/testing-lab", "wide"],

  // Export
  ["images/export/packing-line", "wide"],
  ["images/export/container-loading", "wide"],

  // Blog
  ["images/blog/choosing-full-grain-leather/cover", "wide"],

  // Shared
  ["images/og/default", "og"],
  ["images/placeholder", "wide"],
];

/** Stable tone per path, so regenerating produces identical output. */
function toneFor(name) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 100000;
  return TONES[hash % TONES.length];
}

function svg(width, height, label, [from, to]) {
  const fontSize = Math.round(Math.min(width, height) * 0.045);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <pattern id="lines" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="14" stroke="#ffffff" stroke-opacity="0.05" stroke-width="3"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#lines)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}"
        fill="#ffffff" fill-opacity="0.72" letter-spacing="${fontSize * 0.12}">${label}</text>
</svg>`;
}

const title = (name) =>
  name
    .split("/")
    .pop()
    .replace(/-(thumb|hero|front|detail|interior|hardware|cover)$/, "")
    .replace(/-/g, " ")
    .toUpperCase();

let written = 0;

for (const [name, ratio] of IMAGES) {
  const [width, height] = RATIO[ratio];
  const target = path.join(PUBLIC_DIR, `${name}.webp`);

  await mkdir(path.dirname(target), { recursive: true });
  await sharp(Buffer.from(svg(width, height, title(name), toneFor(name))))
    .webp({ quality: 72 })
    .toFile(target);

  written += 1;
}

// The organisation logo is referenced as PNG from JSON-LD.
const logoPath = path.join(PUBLIC_DIR, "images/logos/logo.png");
await mkdir(path.dirname(logoPath), { recursive: true });
await sharp(Buffer.from(svg(512, 512, "EE", TONES[0])))
  .png()
  .toFile(logoPath);
written += 1;

await writeFile(
  path.join(PUBLIC_DIR, "images/README.md"),
  [
    "# Images",
    "",
    "Every file here is a generated placeholder (`npm run generate:placeholders`).",
    "",
    "Replace them in place with the client's optimised photography — the content",
    "files already reference these exact paths, so no code changes are needed.",
    "Target sizes are documented in `docs/image-storage-and-assesment-strategy`.",
    "",
  ].join("\n"),
  "utf8",
);

console.log(`✓ wrote ${written} placeholder images`);
