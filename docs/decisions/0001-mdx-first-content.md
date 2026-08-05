# 0001 — MDX and JSON as the content source

**Status:** Accepted

## Context

Products need rich content — paragraphs, lists, specification tables, images —
alongside structured metadata used for routing, navigation and SEO. The client
has no CMS and no appetite for one in version 1.

## Alternatives

- **Hardcode content in React components.** Fastest to start; every copy change
  becomes a code change and a deployment by a developer.
- **JSON only.** Structured and easy to validate, but hostile to long-form prose.
- **A headless CMS from day one.** Solves authoring, but adds a service, an API
  key, a monthly cost and a network dependency before there is any content.

## Decision

Each product, company page, machine, article and legal document is one MDX file:
YAML frontmatter for structured data, the body for prose. Pure metadata
(categories, gallery albums, FAQs, testimonials, home copy) is JSON.

Every document is validated against a Zod schema at read time, so malformed
content fails the build rather than the page.

## Consequences

Adding a product is a file plus images — no routing, navigation or component
changes. Content is diffable and reviewable in pull requests.

The cost is that content changes require a rebuild, and non-technical authors
need Git. Both are acceptable for a catalogue that changes monthly.

## Future migration

`src/lib/content/source.ts` is the only module that touches the filesystem.
Moving to a CMS means reimplementing its read functions; the schemas, resolvers
and every component above them stay untouched. See [0006](./0006-content-registry.md).
