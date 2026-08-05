# 0005 — Variants over component duplication

**Status:** Accepted

## Context

The same content appears at several densities: a product as a catalogue tile, a
featured block, a related-item row, a carousel slide. The obvious route is one
component per layout.

## Alternatives

- **A component per layout** (`ProductCardGrid`, `ProductCardFeatured`, …).
  Simple individually; a design change then has to be applied four times, and
  they drift apart.
- **Fully generic layout primitives.** Maximum reuse, no shared language, and
  every call site re-decides what a product card looks like.

## Decision

One component per concept, with a `variant` prop driven by
`class-variance-authority`:

```tsx
<ProductCard variant="grid" />
<ProductCard variant="featured" />
<ProductCard variant="compact" />
<ProductCard variant="minimal" />
```

The same applies to `Hero`, `Button`, `Card`, `Badge`, `Section` and `Timeline`.

## Consequences

A visual change lands in one file and every usage follows. Variants are
discoverable from the type, so a call site cannot invent an unsupported one.

The cost is that components with many variants grow branches internally. When a
variant stops sharing most of its structure with its siblings, that is the signal
to split it out — not before.
