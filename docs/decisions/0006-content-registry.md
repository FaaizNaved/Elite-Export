# 0006 — A content registry rather than per-type loaders

**Status:** Accepted

## Context

Company pages, machines, blog posts and legal documents each had their own
loader. All four repeated the same twenty lines: list the directory, read each
file, validate frontmatter, resolve derived fields, drop drafts, sort. Adding a
content type meant copying that block again.

## Alternatives

- **Leave the duplication.** Each loader stays readable in isolation; a change to
  draft handling or sort order has to be made in four places, and will eventually
  be made in three.
- **A fully generic content layer** covering the product catalogue too. The
  catalogue is nested two levels deep and joined against category metadata —
  forcing it through the same abstraction would distort both.

## Decision

`src/lib/content/collection.ts` provides `defineCollection`, and the pipeline is
explicit:

```
registry (collection.ts) → parser (source.ts) → resolver (resolve callback) → renderer (src/mdx)
```

A content type is now one declaration naming its directory, schema, resolver and
sort order. The product catalogue stays bespoke, and says so in a comment.

## Consequences

Draft filtering, memoisation, slug derivation and route generation exist once.
New content types are a few lines.

The cost is one layer of indirection between a loader and the filesystem, plus a
`NoInfer` on the sort comparator to stop a generic comparator widening the
document type back to its constraint — a subtlety that earns its comment in the
source.
