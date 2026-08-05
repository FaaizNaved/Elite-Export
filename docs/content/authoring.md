# Authoring content

All business content lives in `src/content`. Nothing else in the codebase should
contain product copy, company facts or marketing text.

## Adding a product

1. Create `src/content/categories/<category>/<subcategory>/products/<product>.mdx`.
2. Add images under `public/images/products/<category>/<subcategory>/<product>/`.
3. Reference them by filename alone — `src: one-ear-headstall-front.webp`.
4. Commit.

The route, breadcrumbs, navigation entry, sitemap entry, related products and
SEO metadata are all derived. No code changes, no route file, no menu edit.

Category and subcategory are taken from the folder path, never from frontmatter,
so they cannot drift out of sync with the URL. The category tree is the only
place the hierarchy exists — see [ADR 0008](../decisions/0008-single-content-hierarchy.md).

## Referring to images

Name the file, not the path:

```yaml
gallery:
  thumbnail:
    src: one-ear-headstall-thumb.webp
```

Each document's images live in the folder that matches its position in the
hierarchy, and `src/lib/content/assets.ts` resolves the two together. A path
starting with `/` is treated as a shared asset and passed through untouched —
that is the right form for page heroes and Open Graph images.
See [ADR 0009](../decisions/0009-asset-references.md).

## Adding a category or subcategory

Create the folder plus its metadata file:

- `src/content/categories/<category>/category.json`
- `src/content/categories/<category>/<subcategory>/subcategory.json`

A product folder with no matching category metadata fails the build in
development with a message naming the missing file.

## Other content types

| Type | Location | Route |
| --- | --- | --- |
| Products | `src/content/categories/<cat>/<sub>/products/<slug>.mdx` | `/products/<cat>/<sub>/<slug>` |
| Company pages | `src/content/company/<slug>.mdx` | `/<slug>` |
| Machines | `src/content/machines/<slug>.mdx` | `/technology/<slug>` |
| Gallery albums | `src/content/gallery/<album>/album.json` | tab on `/gallery` |
| Blog posts | `src/content/blog/<slug>.mdx` | `/blog/<slug>` |
| Legal pages | `src/content/legal/<slug>.mdx` | `/legal/<slug>` |
| FAQs, testimonials | `src/content/*.json` | — |
| Home page sections | `src/content/home/*.json` | one file per section |

## Page blocks

Company pages declare their structure in frontmatter rather than in code. Any of
`stats`, `steps`, `features` and `milestones` may be present; the route renders
whichever it finds. Adding a stats band to a page is a content edit.

Icons are named as strings (`icon: shield-check`) and resolved through the
registry in `src/components/icons`. An unknown name renders no icon rather than
breaking the page.

## Drafts

`status: draft` hides a document from production builds while leaving it visible
in `npm run dev`.

## Validating

```bash
npm run check:content
```

Loads every document, validates it against its schema and asserts the engine's
invariants — hierarchy, unique routes, alt text, breadcrumbs, derived counts.

## Editing the home page

Each section of the home page is its own file under `src/content/home/`:

| File | Section |
| --- | --- |
| `hero.json` | Opening hero |
| `company.json` | "Who we are" block and its stats |
| `why-us.json` | Why buyers stay |
| `categories.json` | Product categories band |
| `featured-products.json` | Featured products carousel |
| `manufacturing-preview.json` | Manufacturing preview |
| `technology-preview.json` | Machinery preview |
| `quality-preview.json` | Quality stats band |
| `export-preview.json` | Export capability band |
| `testimonials.json` | Testimonials heading |
| `cta.json` | Closing call to action |

`getHomeContent()` composes them into one document. Adding a section means
adding a file and one line to `HOME_SECTIONS` in
`src/lib/content/singletons.ts` — that map is the page's table of contents.

## Reading content in a page

Use the registry rather than importing loaders directly:

```ts
import { contentRegistry } from "@/lib/content";

const machines = await contentRegistry.machines.list();
const machine = await contentRegistry.machines.find(slug);
const home = await contentRegistry.home.get();
```

Every content type answers `list`, `find` and `exists`; singletons answer
`get`. The underlying loaders remain exported for the cases that need them —
`generateStaticParams` and filtered product queries.
