import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { primaryNav, surfaceIndex } from "../src/config/navigation";
import { productBreadcrumbs, subcategoryBreadcrumbs } from "../src/lib/breadcrumbs";
import {
  contentRegistry,
  getArticles,
  getCatalog,
  getCompanyPages,
  getFaqs,
  getHomeContent,
  getLegalPages,
  getMachines,
  getProduct,
  getProductRoutes,
  getTestimonials,
} from "../src/lib/content";
import { imageLibrary } from "../src/lib/content/images";
import { isActivePath } from "../src/lib/navigation";
import {
  approvedDocuments,
  companyRecord,
  dependencies,
  factById,
  findGovernedFacts,
} from "../src/lib/publication";
import { company } from "../src/config/company";
import {
  aboutTelling,
  chaptersTold,
  exportTelling,
  homeTelling,
  manufacturingTelling,
  productsTelling,
  qualityTelling,
} from "../src/config/tellings";
import { bleedsAtRank, isEvidenceSet, sceneRefusal } from "../src/components/structure/scene";
import type { Image } from "../src/types";
import { productMetadata } from "../src/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "../src/lib/seo";

/**
 * Loads every piece of content and asserts the engine's invariants.
 * Run with `npm run check:content`. Fails loudly on invalid frontmatter,
 * broken hierarchy, duplicate routes or a mis-wired derived value.
 */
async function main() {
  const { categories, products } = await getCatalog();

  assert.ok(categories.length > 0, "no categories were loaded");
  assert.ok(products.length > 0, "no products were loaded");

  // Hierarchy: every product resolves to a real category and subcategory,
  // and the derived counts add up.
  let counted = 0;
  for (const category of categories) {
    counted += category.subcategories.reduce((sum, sub) => sum + sub.productCount, 0);
    assert.equal(
      category.productCount,
      category.subcategories.reduce((sum, sub) => sum + sub.productCount, 0),
      `${category.slug}: productCount does not match its subcategories`,
    );
  }
  assert.equal(counted, products.length, "product counts do not add up to the catalog size");

  // Routing: hrefs are unique and resolve back to the same product.
  const routes = await getProductRoutes();
  assert.equal(new Set(routes.map((r) => `${r.category}/${r.subcategory}/${r.product}`)).size, routes.length);

  for (const route of routes) {
    const product = await getProduct(route);
    assert.ok(product, `route ${JSON.stringify(route)} did not resolve to a product`);
    assert.equal(product.href, `/products/${route.category}/${route.subcategory}/${route.product}`);
    assert.ok(product.gallery.thumbnail.alt.trim(), `${product.slug}: thumbnail alt was not backfilled`);
    assert.ok(
      product.gallery.images.every((image) => image.alt.trim()),
      `${product.slug}: a gallery image is missing alt text`,
    );

    // Assets: content names images relatively, the resolver turns them into
    // paths under the product's own folder.
    const expectedBase = `/images/products/${route.category}/${route.subcategory}/${route.product}/`;
    for (const image of [product.gallery.thumbnail, ...product.gallery.images]) {
      assert.ok(
        image.src.startsWith(expectedBase),
        `${product.slug}: "${image.src}" was not resolved into ${expectedBase}`,
      );
    }
  }

  // Breadcrumbs: Home first, current last, one crumb per level.
  const [first] = products;
  const crumbs = productBreadcrumbs(first);
  assert.equal(crumbs.length, 5, "product breadcrumbs should be Home → Products → Category → Sub → Product");
  assert.equal(crumbs[0].href, "/");
  assert.ok(crumbs.at(-1)?.current, "last breadcrumb must be marked current");
  assert.ok(crumbs.slice(0, -1).every((crumb) => !crumb.current));
  assert.equal(subcategoryBreadcrumbs(categories[0], categories[0].subcategories[0]).length, 4);

  // Navigation architecture (UX Blueprint §37): exactly five destinations, in
  // chapter order, and the index carries every surface the bar does not.
  assert.equal(primaryNav.length, 5, "primary navigation must carry exactly five destinations");
  assert.deepEqual(
    primaryNav.map((item) => item.href),
    ["/manufacturing", "/products", "/quality", "/export", "/about"],
    "primary navigation must run in canonical chapter order (R37.4)",
  );
  assert.ok(
    !primaryNav.some((item) => item.href === "/" || item.href.includes("enquiry")),
    "home is the company name and the enquiry is not in the bar (R37.2)",
  );
  for (const href of ["/technology", "/gallery", "/journal", "/enquiry", "/legal"]) {
    assert.ok(
      surfaceIndex.some((item) => item.href === href),
      `the footer index must carry ${href} — R37.3, R37.9, R26.1`,
    );
  }
  // R37.10: every surface is reachable in two steps — bar plus index.
  for (const item of primaryNav) {
    assert.ok(surfaceIndex.some((entry) => entry.href === item.href), `${item.href} missing from the index`);
  }

  // R25.2: one enquiry surface, not two. The retired doors appear nowhere in
  // the architecture — they resolve, but nothing points at them.
  assert.equal(
    surfaceIndex.filter((item) => item.href.includes("enquiry") || item.href === "/contact").length,
    1,
    "the index must carry exactly one enquiry door (R25.2, R39.5)",
  );
  for (const retired of ["/contact", "/buyer-enquiry", "/blog"]) {
    assert.ok(
      ![...primaryNav, ...surfaceIndex].some((item) => item.href.startsWith(retired)),
      `${retired} was retired — nothing may link to it (R25.2, R24.1)`,
    );
  }

  // R29.2: addresses are permanent. Every retired address must still resolve,
  // which here means a permanent redirect held open in the build config. This
  // asserts the config rather than the network, because the redirect table is
  // the thing a future edit would delete.
  const { redirects } = (await import("../next.config")).default;
  assert.ok(redirects, "the build config must hold the retired addresses open (R29.2)");
  const held = await redirects!();
  for (const [source, destination] of [
    ["/contact", "/enquiry"],
    ["/buyer-enquiry", "/enquiry"],
    ["/blog", "/journal"],
    ["/blog/:slug", "/journal/:slug"],
  ]) {
    const rule = held.find((entry) => entry.source === source);
    assert.ok(rule, `${source} must continue to resolve — R29.2`);
    assert.equal(rule.destination, destination, `${source} must resolve to ${destination}`);
    assert.equal(rule.permanent, true, `${source} moved permanently, not temporarily (R29.2)`);
  }

  assert.ok(isActivePath(first.href, "/products"), "/products should be active on a product page");
  assert.ok(!isActivePath(first.href, "/"), "home should not be active on a product page");
  assert.ok(!isActivePath("/products-archive", "/products"), "prefix match must respect segment boundaries");

  // SEO: metadata and JSON-LD build from real content.
  const metadata = productMetadata(first);
  assert.equal(metadata.title, first.seo?.title ?? first.title);
  assert.ok(String(metadata.alternates?.canonical).startsWith("http"), "canonical must be absolute");
  assert.equal(productJsonLd(first)["@type"], "Product");
  assert.equal(
    (breadcrumbJsonLd(crumbs).itemListElement as unknown[]).length,
    crumbs.length,
  );

  // Editorial content, machinery and the singleton documents.
  const [companyPages, articles, legalPages, machines, faqs, testimonials, home] =
    await Promise.all([
      getCompanyPages(),
      getArticles(),
      getLegalPages(),
      getMachines(),
      getFaqs(),
      getTestimonials(),
      getHomeContent(),
    ]);

  assert.ok(companyPages.length > 0, "no company pages were loaded");
  assert.ok(legalPages.every((page) => page.updatedAt instanceof Date));
  assert.ok(machines.length > 0, "no machines were loaded");
  assert.ok(faqs.length > 0 && testimonials.length > 0, "singleton collections are empty");

  // Home is assembled from one file per section; every section the page reads
  // must be present after composition.
  assert.ok(home.hero.heading.length > 0, "home hero did not load");
  assert.ok(home.intro.body.length > 0, "home company body did not load");
  assert.ok(home.pause.image.src.length > 0, "home pause image did not load");
  assert.ok(home.cta.heading.length > 0, "home close did not load");
  // R13.2 / R39.1: the action is the component's, never content's.
  assert.ok(!("primaryCta" in home.hero), "the hero must not author an action");
  assert.ok(!("primaryCta" in home.cta), "the close must not author an action");
  for (const key of ["categories", "manufacturing", "quality", "origin"]) {
    assert.ok(home.sections[key]?.heading, `home section "${key}" is missing after composition`);
  }

  // Registry: the facade and the loaders must agree, or one of them is stale.
  assert.equal((await contentRegistry.products.list()).length, products.length);
  assert.equal((await contentRegistry.machines.list()).length, machines.length);
  assert.equal((await contentRegistry.pages.list()).length, companyPages.length);
  assert.ok(await contentRegistry.machines.exists(machines[0].slug));
  assert.ok(!(await contentRegistry.machines.exists("no-such-machine")));
  assert.equal((await contentRegistry.machines.find("no-such-machine")), null);
  assert.equal((await contentRegistry.home.get()).hero.heading, home.hero.heading);

  // Facts register (Brand Bible §19.2): the home page must not state a governed
  // fact. Anything countable is derived from config or the catalogue at render
  // time.
  //
  // This asked the Register a question it was not holding: a hand-typed list of
  // six strings, kept beside a register that already knows what betrays each
  // fact. R7.1 — one source of truth per concern, and two lists eventually
  // disagree. The register is now asked directly, so a fact confirmed there
  // stops being refused here without a second edit, and a marker added there
  // starts being refused here without one either.
  const homeLeaks = findGovernedFacts(JSON.stringify(home));
  assert.deepEqual(
    homeLeaks.map((match) => `${match.fact.label}: "${match.quote}"`),
    [],
    "home content states a fact the Facts Register has not confirmed (Brand Bible §19.2, §19.4)",
  );

  // Every machine resolves from its own route.
  assert.equal(new Set(machines.map((machine) => machine.href)).size, machines.length);

  // MIB R15.2: one image, one record, referenced everywhere. A document names a
  // frame; the library says what the frame is. Two things must stay true.
  const library = imageLibrary();
  const documents = [categories, products, machines, articles, companyPages, home];
  const referenced = new Map<string, unknown>();

  (function walk(node: unknown): void {
    if (Array.isArray(node)) return node.forEach(walk);
    if (typeof node !== "object" || node === null) return;
    const record = node as Record<string, unknown>;
    if (typeof record.src === "string") referenced.set(record.src, record);
    Object.values(record).forEach(walk);
  })(documents);

  for (const [src, image] of referenced) {
    // 1. Every referenced frame is in the archive (R19.5). A reference the
    //    library does not know would render nothing and report nothing.
    assert.ok(
      src in library,
      `${src} is referenced by content but is not in the image library — run npm run images:record (MIB R15.2, R19.5)`,
    );
    // 2. The record reached the surface: the loader merged it rather than
    //    passing a bare reference through.
    const record = library[src];
    const resolved = image as Record<string, unknown>;
    if (record.width) {
      assert.equal(
        resolved.width,
        record.width,
        `${src}: the frame's measured width did not reach the surface — a loader is bypassing resolveImage (R15.2)`,
      );
    }
  }

  // 3. A document names a frame and nothing else. Left available, an inline
  //    `alt` or `width` is a second description of the same photograph, which
  //    R15.2 exists to prevent and R7.1 says will eventually disagree.
  const contentRoot = path.join(process.cwd(), "src", "content");
  const contentFiles: string[] = [];
  (function collect(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) collect(full);
      else if (full.endsWith(".json") || full.endsWith(".mdx")) contentFiles.push(full);
    }
  })(contentRoot);

  const recordFields = ["alt", "width", "height", "caption", "provenance", "evidenceRank", "chapter"];

  for (const file of contentFiles) {
    const relative = path.relative(contentRoot, file).replace(/\\/g, "/");
    if (relative === "images.json") continue;
    const text = readFileSync(file, "utf8");

    if (file.endsWith(".json")) {
      (function walk(node: unknown): void {
        if (Array.isArray(node)) return node.forEach(walk);
        if (typeof node !== "object" || node === null) return;
        const object = node as Record<string, unknown>;
        if (typeof object.src === "string") {
          const extra = Object.keys(object).filter((key) => recordFields.includes(key));
          assert.equal(
            extra.length,
            0,
            `${relative} describes the frame "${object.src}" (${extra.join(", ")}) — a document names a frame; src/content/images.json says what it is (MIB R15.2)`,
          );
        }
        Object.values(object).forEach(walk);
      })(JSON.parse(text));
      continue;
    }

    const frontmatterEnd = text.indexOf("\n---", 3);
    const frontmatter = text.startsWith("---") && frontmatterEnd > 0 ? text.slice(0, frontmatterEnd) : "";
    const offending = frontmatter
      .split("\n")
      .filter((line) => new RegExp(`^\\s+(${recordFields.join("|")}):`).test(line));
    assert.equal(
      offending.length,
      0,
      `${relative} describes a frame in its frontmatter (${offending.join(" / ").trim()}) — that record belongs in src/content/images.json (MIB R15.2)`,
    );
  }

  // 4. Dimensions are measured, never typed (VDS §30.2, §32.3 · R7.1). Every
  //    entry in the library came from a file, so every entry has a size.
  for (const [src, record] of Object.entries(library)) {
    assert.ok(
      record.width && record.height,
      `${src} has no measured size — the file could not be read by npm run images:record`,
    );
  }

  // The scene composition layer — Documentary Storyboard §9, §10.1, §11.
  // R9.2's technique applied to a composition rule: a rule nobody has tried to
  // break is a rule nobody knows works. Each case is a chapter that must not be
  // told, and every one must be refused with the rule that refuses it.
  const frame = (evidenceRank: string): Image =>
    ({ src: `/images/probe-${evidenceRank}.webp`, alt: "a", caption: "a", width: 2000, height: 1000, evidenceRank }) as Image;

  const sceneCases: Array<[string, string | undefined]> = [
    ["a chapter with no frame is absent", sceneRefusal([])],
    ["a chapter of located views alone is a mood piece", sceneRefusal([{ frames: [frame("E5"), frame("E5")] }])],
    [
      "a telling opening on a record is refused",
      sceneRefusal([{ frames: [frame("E4"), frame("E2")] }], { opensTheTelling: true }),
    ],
    [
      "the Recognition chapter without an E1 frame is refused",
      sceneRefusal([{ frames: [frame("E2"), frame("E5")] }], { isRecognition: true }),
    ],
    [
      "two adjacent scenes in the same relationship are refused",
      sceneRefusal([
        { frames: [frame("E2")], relationship: "establish-and-examine" },
        { frames: [frame("E2")], relationship: "establish-and-examine" },
      ]),
    ],
  ];
  for (const [description, refusal] of sceneCases) {
    assert.ok(refusal, `${description} — but sceneRefusal allowed it (§10.1, §11.3)`);
  }

  // N6 is about position in the telling: C8's subject is the record, and by the
  // canonical order the work it records is six chapters behind it.
  assert.equal(
    sceneRefusal([{ frames: [frame("E4")] }]),
    undefined,
    "a chapter whose subject is the record may open on one — N6 governs the telling's opening, not every chapter's",
  );

  // …and a chapter the archive can carry is not refused.
  assert.equal(
    sceneRefusal([{ frames: [frame("E1"), frame("E2")] }], { isRecognition: true }),
    undefined,
    "a Recognition chapter holding an E1 frame must be told (§10.1 rule 3)",
  );

  // §31.3: presence follows rank. Bleed for E1, E2 and E5; bounded for E4 and E6.
  assert.deepEqual(
    (["E1", "E2", "E3", "E4", "E5", "E6"] as const).map(bleedsAtRank),
    [true, true, false, false, true, false],
    "bleed is the default for E1, E2 and E5; the E4 record and the E6 object are bounded (VDS §31.3)",
  );
  // §31.1: an evidence set is three to five frames of one operation, all E3.
  assert.ok(isEvidenceSet([frame("E3"), frame("E3"), frame("E3")]), "three E3 frames are a set (§31.1)");
  assert.ok(!isEvidenceSet([frame("E3"), frame("E3")]), "two frames are not a set (§31.1)");
  assert.ok(!isEvidenceSet([frame("E3"), frame("E2"), frame("E3")]), "a set is one operation (§31.1)");

  // The documentary skeleton — Documentary Storyboard §25.1, UX Blueprint §16.
  // Home touches all ten chapters and completes none, so all ten are declared
  // and the plan is asserted rather than trusted.
  const CANONICAL: string[] = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"];

  assert.deepEqual(
    homeTelling.map((plan) => plan.chapter),
    CANONICAL,
    "Home must declare all ten chapters in canonical order — §25.1 rule 1: drop chapters, never re-order them",
  );
  // §25.1 rule 2: Recognition is never dropped. C3 is designated, C7 reserve (§7.2).
  const told = chaptersTold(homeTelling);
  assert.ok(
    told.includes("C3") || told.includes("C7"),
    "a telling that drops both C3 and C7 has dropped Recognition — §25.1 rule 2, §7.2",
  );
  // UX §16's evidence table: the place (C1) and the decision (C3), and R16.1
  // forbids Home from carrying any other chapter's argument.
  assert.deepEqual(
    told,
    ["C1", "C3"],
    "Home tells C1 and C3 and hands on the rest — UX §16, R16.1, R16.2",
  );
  // Manufacturing — UX §17: the complete telling, C1–C10 in canonical order.
  assert.deepEqual(
    manufacturingTelling.map((plan) => plan.chapter),
    CANONICAL,
    "Manufacturing must declare all ten chapters in canonical order — §17, §25.1 rule 1",
  );
  assert.deepEqual(
    chaptersTold(manufacturingTelling),
    CANONICAL,
    "Manufacturing tells all ten — it is the parent of the story and hands none of them on (§17)",
  );
  assert.ok(
    chaptersTold(manufacturingTelling).includes("C3"),
    "C3 is Manufacturing's Recognition chapter and is never dropped — §7.2, §25.1 rule 2, R17.5",
  );

  // Products — UX §19. A catalogue of capability tells one chapter: finished
  // work (C6). The offer is not a chapter (§7.4) and the range is records.
  assert.deepEqual(
    productsTelling.map((plan) => plan.chapter),
    CANONICAL,
    "Products must declare all ten chapters in canonical order — §25.1 rule 1",
  );
  assert.deepEqual(
    chaptersTold(productsTelling),
    ["C6"],
    "Products tells finished work and hands the rest on — §19's evidence table, §7.4",
  );
  assert.ok(
    productsTelling.find((plan) => plan.chapter === "C9")?.handsTo === "export",
    "C9 is told whole on Export; the label fact is a product record's specification — §25.1 rule 3, L10",
  );

  // Quality — UX §20. Extracted from Manufacturing C2, C7 and C8, and C7 is
  // this surface's Recognition moment rather than C3 (R20.2, §7.2's reserve).
  assert.deepEqual(
    qualityTelling.map((plan) => plan.chapter),
    CANONICAL,
    "Quality must declare all ten chapters in canonical order — §25.1 rule 1",
  );
  assert.deepEqual(
    chaptersTold(qualityTelling),
    ["C2", "C7", "C8"],
    "Quality tells the door, the gate and the record — §20's evidence table",
  );
  assert.ok(
    chaptersTold(qualityTelling).includes("C7"),
    "the rejection is Quality's argument and its Recognition moment — R20.2, §7.2, §25.1 rule 2",
  );
  // R20.2 and §21.1: the gate is bought with a rejection, never with a badge.
  // Without an E1 frame the chapter refuses itself, which is MIB dependency 4.
  assert.ok(
    sceneRefusal([{ frames: [frame("E4"), frame("E2")] }], { isRecognition: true }),
    "Quality's C7 without a rejection at E1 is a gate shown passing things — R20.2, §10.1 rule 3",
  );

  // Export — UX §21. MIB R19.1: dispatch as an operation is the whole argument
  // of the surface, so it tells C9 and only C9 (§25.1 rule 4).
  assert.deepEqual(
    exportTelling.map((plan) => plan.chapter),
    CANONICAL,
    "Export must declare all ten chapters in canonical order — §25.1 rule 1",
  );
  assert.deepEqual(
    chaptersTold(exportTelling),
    ["C9"],
    "Export tells what leaves and hands the rest on — MIB R19.1, UX §21",
  );
  // The record is Quality's chapter, and §21 links to it rather than repeating
  // it. Told on both, it is one fact stated twice (L10, §25.1 rule 3).
  assert.equal(
    exportTelling.find((plan) => plan.chapter === "C8")?.handsTo,
    "quality",
    "C8 is told whole on Quality; the documents that leave are inside C9 (§7's grade: process and records)",
  );
  // N6 says the same thing from the other side: C8 precedes C9, so on this
  // surface it would be the chapter the telling opens on, and a telling may not
  // open on a record.
  assert.ok(
    sceneRefusal([{ frames: [frame("E4")] }], { opensTheTelling: true }),
    "Export may not open on its paperwork — §10.1 rule 5, N6",
  );

  // About — UX §22. The first and last chapters of the set, together: §24.3's
  // return, which the Storyboard calls the only structural symmetry permitted.
  assert.deepEqual(
    aboutTelling.map((plan) => plan.chapter),
    CANONICAL,
    "About must declare all ten chapters in canonical order — §25.1 rule 1",
  );
  assert.deepEqual(
    chaptersTold(aboutTelling),
    ["C1", "C10"],
    "About tells the place and tomorrow — §22's evidence table, R19.1, R22.5",
  );
  // R22.5 and N13: About is where every other telling ends, so each of them
  // must actually hand C10 here rather than dropping it.
  for (const [name, telling] of [
    ["Home", homeTelling],
    ["Manufacturing", manufacturingTelling],
    ["Products", productsTelling],
    ["Quality", qualityTelling],
    ["Export", exportTelling],
  ] as const) {
    const c10 = telling.find((plan) => plan.chapter === "C10");
    assert.ok(
      name === "Manufacturing" ? c10?.role === "tells" : c10?.handsTo === "about",
      `${name} must end at About — every telling ends with a person (N13, §24.1)`,
    );
  }

  for (const plan of [
    ...homeTelling,
    ...manufacturingTelling,
    ...productsTelling,
    ...qualityTelling,
    ...exportTelling,
    ...aboutTelling,
  ]) {

    assert.ok(
      plan.reason.trim(),
      `${plan.chapter} carries no reason — a chapter absent for want of evidence and one absent because another surface owns it are not the same thing`,
    );
    assert.equal(
      plan.role === "hands",
      Boolean(plan.handsTo),
      `${plan.chapter}: a handed chapter names where it is told whole, and a told chapter hands to nobody (§16)`,
    );
  }

  // R39.3 — where the site's one action appears, asserted rather than measured.
  //
  // Three Stage 1 packages recorded the same debt: "the Action gate reads
  // nothing at content level, because actions are no longer authored in
  // content; counting rendered actions per route needs a render-time audit."
  // It does not. Every action on the site is `Close`, `Close` renders `Action`,
  // and which surfaces carry one is a fact about which page files import it —
  // readable here, and stable in a way a hand count between packages is not.
  //
  // Found by the audit this discharges: the **subcategory** surface carried an
  // action, citing R39.3, which has no subcategory row — and R19.6 excludes it
  // by name: *every product record ends at Enquiry, and it is the only deep
  // surface that does*.
  const appRoot = path.join(process.cwd(), "src", "app");
  const surfacesWithAction: string[] = [];
  const surfacesWithContinuation: string[] = [];
  (function collectRoutes(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) collectRoutes(full);
      else if (entry === "page.tsx") {
        const source = readFileSync(full, "utf8");
        const importsFrom = (module: string, name: string) => {
          const block = source.match(
            new RegExp(`import\\s*\\{([\\s\\S]*?)\\}\\s*from\\s*"${module}"`),
          );
          return Boolean(block && new RegExp(`\\b${name}\\b`).test(block[1]));
        };
        const relative = path.relative(appRoot, path.dirname(full)).replace(/\\/g, "/");
        const route = relative ? `/${relative}` : "/";

        if (importsFrom("@/components/structure", "Close")) surfacesWithAction.push(route);
        if (importsFrom("@/components/ui/action", "Continuation")) {
          surfacesWithContinuation.push(route);
        }
      }
    }
  })(appRoot);

  // R24.3 and MIB §12.1: the continuation exists *at the close of every surface
  // that has one*, and it disappears **on Journal, which ends in space**. The
  // action's own table already refuses Journal below; this is the second door,
  // and it is the one a related-articles list would come through.
  assert.deepEqual(
    surfacesWithContinuation.filter((route) => route.startsWith("/journal")),
    [],
    "Journal ends in space — no continuation, on the index or on an article (R24.3, R39.2, MIB §12.1)",
  );

  /*
   * Three surfaces, not eight — the Presentation package's CTA decision, held
   * here so it cannot drift back.
   *
   * R39.3 permits the action on eight surfaces and the site carried it on all
   * eight. The client's instruction was to remove it from six, and the reason
   * is one the brand documents already argue: Brand Bible §16.4, *a luxury
   * brand does not chase.* An ask repeated on every surface is not eight
   * invitations, it is one invitation that has stopped being believed.
   *
   * R39.1 is untouched and is the rule that actually matters: **one action, one
   * door, one label, leading to Enquiry and nowhere else.** What changed is
   * R39.3's *where*, and it changed in the direction R39.4 already points —
   * that rule is a list of places the ask is not welcome, and this is that list
   * extended by the person whose company is doing the asking.
   *
   * The three that remain are the three where the visitor has already decided
   * something:
   *
   *   /        the end of the whole documentary, after Recognition (R16.5)
   *   product  one specific piece, in front of them (R19.6)
   *   enquiry  where the action *is* the surface — no `Close`, so not listed
   *
   * Everywhere else ends on a continuation instead: R39.2, *a link rather than
   * a demand.*
   */
  assert.deepEqual(
    surfacesWithAction.sort(),
    ["/", "/products/[category]/[subcategory]/[product]"],
    "the action appears on Home and the product record only — never on Manufacturing, Quality, Export, About, a category, a subcategory, Technology, Gallery, Journal or any system surface (R39.1, R39.4, R19.6, Brand Bible §16.4)",
  );

  // MIB §20.2 item 2: nothing is published carrying a name that may be wrong.
  // Every field of the company record that states a fact must be classified, so
  // a field added later cannot reach a surface unclassified (Brand Bible §19.2).
  const governedRecordFields = new Set(companyRecord.map((item) => item.field.split(".")[0]));
  const unclassified = Object.keys(company).filter(
    (field) => !governedRecordFields.has(field) && !["social", "tagline"].includes(field),
  );
  assert.deepEqual(
    unclassified,
    [],
    `these company record fields state a fact but are not classified in company-record.ts: ${unclassified.join(", ")} (MIB §20.2 item 2, Brand Bible §19.2)`,
  );
  for (const item of companyRecord) {
    assert.ok(
      factById(item.factId),
      `company.${item.field} names the fact "${item.factId}", which the Facts Register does not hold (R20.6)`,
    );
  }

  // MIB §20.2 item 21: every builder has all eight documents. It is the one
  // dependency the build discharges itself, and the discharge names this tree —
  // so a deletion must fail here rather than be noticed by a builder who then
  // interprets, which R2.1 forbids.
  const item21 = dependencies.find((item) => item.id === 21);
  assert.ok(item21?.discharge, "dependency 21 is discharged against docs/brand — R20.6");
  for (const document of approvedDocuments) {
    assert.ok(
      existsSync(path.join(process.cwd(), "docs", "brand", document)),
      `docs/brand/${document} is missing — dependency 21 is no longer discharged (MIB §20.2, R2.1)`,
    );
  }
  // R37.2 is what discharges item 17; the assertion above proves the document
  // exists, and the navigation assertions prove the build matches it.
  assert.ok(
    dependencies.find((item) => item.id === 17)?.discharge,
    "dependency 17 is discharged by an approved UX Blueprint — R20.6",
  );

  console.log(
    `✓ content OK — ${categories.length} categories, ` +
      `${categories.reduce((n, c) => n + c.subcategories.length, 0)} subcategories, ` +
      `${products.length} products, ${machines.length} machines, ` +
      `${articles.length} articles, ${companyPages.length} company pages, ` +
      `${legalPages.length} legal pages, ${faqs.length} FAQs`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
