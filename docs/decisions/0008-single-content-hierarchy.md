# 0008 — One content hierarchy, not two

**Status:** Accepted

## Context

The business hierarchy is Category → Subcategory → Product. It was expressed
twice on disk:

```
src/content/categories/western-tack/category.json
src/content/categories/western-tack/headstall/subcategory.json
src/content/products/western-tack/headstall/one-ear-headstall.mdx
```

Both trees encoded the same structure. Renaming a subcategory meant renaming two
folders, and nothing prevented a product from sitting under a category that had
no metadata — the loader had to detect that case and raise an error, which is
the tell that the structure was wrong rather than merely unvalidated.

## Alternatives

- **Keep both trees and keep validating the join.** No migration, but the
  duplication and its failure mode stay forever.
- **One flat product folder with `category`/`subcategory` in frontmatter.**
  Simple to browse, but reintroduces the drift the folder hierarchy was chosen
  to prevent (see [0001](./0001-mdx-first-content.md)) — frontmatter can
  disagree with the URL.

## Decision

The category tree owns everything beneath it:

```
src/content/categories/<category>/category.json
src/content/categories/<category>/<subcategory>/subcategory.json
src/content/categories/<category>/<subcategory>/products/<product>.mdx
```

`loadCategories()` walks the tree top-down and builds products as it descends,
so a product is only ever read in the context of the category and subcategory
that contain it.

## Consequences

The hierarchy cannot drift, because there is only one copy of it. An orphaned
product is now structurally impossible rather than a validation error, and the
"products exist but the category is missing" branch is gone from the loader.
`CONTENT_DIR.products` no longer exists.

The cost is a deeper path to a product file, and that a subcategory's products
sit one folder further from its metadata. Both are worth removing a duplicated
source of business structure.

## Future migration

In a CMS this becomes the natural parent/child relation between records, and
the folder walk becomes a nested query. Nothing above the loader changes: a
`Product` still carries `categorySlug` and `subcategorySlug`.
