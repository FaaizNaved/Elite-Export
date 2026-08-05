# Architecture Decision Records

One file per decision that would otherwise be re-litigated every six months.
Each records the context, the alternatives, what was chosen and what it costs.

Superseding a decision means adding a new record that references the old one,
not editing history.

| # | Decision | Status |
| --- | --- | --- |
| [0001](./0001-mdx-first-content.md) | MDX and JSON as the content source | Accepted |
| [0002](./0002-local-images.md) | Images stored in the repository | Accepted |
| [0003](./0003-nextjs-app-router.md) | Next.js App Router, no separate backend | Accepted |
| [0004](./0004-no-database.md) | No database | Accepted |
| [0005](./0005-component-variants.md) | Variants over component duplication | Accepted |
| [0006](./0006-content-registry.md) | A content registry rather than per-type loaders | Accepted |
| [0007](./0007-platform-over-dependencies.md) | Native platform features over UI dependencies | Accepted |
| [0008](./0008-single-content-hierarchy.md) | One content hierarchy, not two | Accepted |
| [0009](./0009-asset-references.md) | Content names assets, the application locates them | Accepted |
