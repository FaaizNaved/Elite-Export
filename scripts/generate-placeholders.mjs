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

/**
 * Visual ROLES, not one palette.
 *
 * Every placeholder used to share a single recipe, so the home hero, a product
 * plate, the export bay and the workshop were the same brown gradient at
 * different aspect ratios — which is the main reason the site read as designed
 * rather than photographed. A real photograph of a studio-lit bag and a real
 * photograph of a cutting floor have nothing in common tonally, and the layout
 * cannot be judged until the stand-ins say the same thing.
 *
 * Each role sets its own key (how dark), temperature (warm leather vs cool
 * steel), contrast, light position and grain. None of them depict anything —
 * they are tonal fields. That is deliberate: a placeholder must never be
 * mistaken for evidence that a photograph exists.
 *
 *   key        base gradient, dark → light stop
 *   light      where the highlight sits, as % of the frame
 *   lift       highlight strength
 *   falloff    vignette strength at the edge
 *   grain      film grain amount
 */
const ROLES = {
  /** Cinematic, low-key, warm charcoal. The room, not the object. */
  hero: {
    key: ["#191614", "#3A322A"],
    light: [38, 30],
    lift: 0.13,
    falloff: 0.5,
    grain: 18,
  },
  /** Warmer and a stop lighter — daylight on a bench, people present. */
  human: {
    key: ["#3A322A", "#6B5B49"],
    light: [30, 26],
    lift: 0.17,
    falloff: 0.3,
    grain: 16,
  },
  /** Studio: near-neutral, evenly lit, minimal vignette. The object leads. */
  product: {
    key: ["#514A43", "#6F675E"],
    light: [50, 38],
    lift: 0.14,
    falloff: 0.16,
    grain: 10,
  },
  /** Industrial: darker, harder falloff, cooler than leather. Machinery. */
  factory: {
    key: ["#17171A", "#33342F"],
    light: [58, 24],
    lift: 0.10,
    falloff: 0.58,
    grain: 20,
  },
  /** Steel and container: coolest in the set, logistics rather than craft. */
  export: {
    key: ["#1E2124", "#454B4E"],
    light: [62, 30],
    lift: 0.11,
    falloff: 0.42,
    grain: 17,
  },
  /** The pause and the closing frame: warm, tactile, mid-key. */
  material: {
    key: ["#332A22", "#6A5540"],
    light: [42, 44],
    lift: 0.18,
    falloff: 0.34,
    grain: 15,
  },
};

/** Path prefix → role. First match wins, so order matters. */
const ROLE_BY_PREFIX = [
  ["images/hero/home-hero", "hero"],
  ["images/hero/cta-workshop", "material"],
  ["images/hero/export-hero", "export"],
  ["images/hero/technology-hero", "factory"],
  ["images/hero/manufacturing-hero", "factory"],
  ["images/hero/contact-hero", "human"],
  ["images/hero/enquiry-hero", "human"],
  ["images/hero/about-hero", "human"],
  ["images/hero/products-hero", "product"],
  ["images/hero/quality-hero", "factory"],
  ["images/hero/gallery-hero", "hero"],
  ["images/about/craftsman", "human"],
  ["images/about/workshop", "human"],
  ["images/about/", "human"],
  ["images/products/", "product"],
  ["images/categories/", "product"],
  ["images/machinery/", "factory"],
  ["images/manufacturing/packaging", "export"],
  ["images/manufacturing/inspection", "factory"],
  ["images/manufacturing/hide-selection", "material"],
  ["images/manufacturing/finishing", "material"],
  ["images/manufacturing/assembly", "human"],
  ["images/manufacturing/", "factory"],
  ["images/quality/", "factory"],
  ["images/export/", "export"],
  ["images/gallery/packaging", "export"],
  ["images/gallery/machinery", "factory"],
  ["images/gallery/products", "product"],
  ["images/gallery/factory", "factory"],
  ["images/gallery/events", "human"],
  ["images/certificates/", "product"],
  ["images/blog/", "material"],
  ["images/og/", "hero"],
];

function roleFor(name) {
  const match = ROLE_BY_PREFIX.find(([prefix]) => name.startsWith(prefix));
  return ROLES[match ? match[1] : "material"];
}

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

/**
 * Deterministic 0–1 noise, so regenerating produces byte-identical files.
 * `Math.random()` would rewrite every image on every run and churn the repo.
 */
function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * A tonal field for one role: a directional key, a placed light, a vignette.
 *
 * No text and no depiction. The filename used to be stamped across the middle
 * in serif caps, which is why the home page read "HOME" through its own
 * headline. A placeholder holds tone, key and aspect ratio so the layout can be
 * judged; the moment it draws something it starts pretending to be evidence.
 */
function svg(width, height, role) {
  const [from, to] = role.key;
  const [lx, ly] = role.light;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="l" cx="${lx}%" cy="${ly}%" r="62%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${role.lift}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="v" cx="50%" cy="48%" r="76%">
      <stop offset="45%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="${role.falloff}"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#l)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`;
}

/**
 * Fine grain, composited over the field. Generated at a third of the frame and
 * scaled up, which gives soft photographic grain rather than television static.
 * Values sit near mid-grey so `overlay` nudges the tone instead of bleaching it.
 */
async function grain(width, height, seed, amount) {
  const w = Math.max(2, Math.round(width / 3));
  const h = Math.max(2, Math.round(height / 3));
  const random = seeded(seed);
  const data = Buffer.allocUnsafe(w * h);
  const base = 128 - Math.round(amount / 2);

  for (let i = 0; i < data.length; i += 1) {
    data[i] = base + Math.floor(random() * amount);
  }

  return sharp(data, { raw: { width: w, height: h, channels: 1 } })
    .resize(width, height)
    .blur(0.5)
    .png()
    .toBuffer();
}

/** Stable seed per path, so output is byte-identical across runs. */
function seedFor(name) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 100000;
  return hash + 7;
}

let written = 0;

for (const [name, ratio] of IMAGES) {
  const [width, height] = RATIO[ratio];
  const target = path.join(PUBLIC_DIR, `${name}.webp`);

  await mkdir(path.dirname(target), { recursive: true });
  const role = roleFor(name);
  await sharp(Buffer.from(svg(width, height, role)))
    .composite([
      { input: await grain(width, height, seedFor(name), role.grain), blend: "overlay" },
    ])
    .webp({ quality: 74 })
    .toFile(target);

  written += 1;
}

// The organisation logo is referenced as PNG from JSON-LD.
const logoPath = path.join(PUBLIC_DIR, "images/logos/logo.png");
await mkdir(path.dirname(logoPath), { recursive: true });
// The logo is the one asset a monogram belongs on — it is a mark, not a
// stand-in for a photograph.
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="100%" height="100%" fill="#1B1B1B"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        font-family="Georgia, 'Times New Roman', serif" font-size="150"
        letter-spacing="6" fill="#F8F5F0">NEE</text>
</svg>`;
await sharp(Buffer.from(logoSvg)).png().toFile(logoPath);
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
