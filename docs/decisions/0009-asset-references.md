# 0009 — Content names assets, the application locates them

**Status:** Accepted
**Refines:** [0002](./0002-local-images.md)

## Context

Content files spelled out full public paths:

```yaml
thumbnail:
  src: /images/products/western-tack/headstall/one-ear-headstall/one-ear-headstall-thumb.webp
```

That path repeats the hierarchy the file's own location already states, and it
bakes a hosting decision into a business document. Renaming a subcategory meant
editing every product's image paths, and moving assets to a CDN would mean
rewriting every content file.

## Alternatives

- **Leave the paths absolute.** Nothing to build; the coupling and the rename
  cost stay.
- **An opaque asset ID plus a manifest** (`img_8f21c`). Fully decoupled, but
  unreadable in review and requires a registry to be kept in sync — a second
  source of truth for something the filesystem already knows.

## Decision

Content names the file; the application resolves it:

```yaml
thumbnail:
  src: one-ear-headstall-thumb.webp
```

`src/lib/content/assets.ts` holds one `assetScope` per content type, and each
loader resolves its documents' images against the scope for that document.
`ContentImage` then puts the result through `resolveImageUrl`, which prefixes
`NEXT_PUBLIC_IMAGE_BASE_URL` when set.

Paths beginning with `/` pass through untouched, so shared assets — page heroes,
Open Graph images, the logo — stay absolute, and content can be migrated one
file at a time.

## Consequences

An image reference now says *which* image, not where it is hosted. Renaming a
category moves its assets without touching a single content file, and a CDN
migration is one environment variable.

The cost is one indirection: reading a content file no longer tells you the full
URL. `npm run check:content` asserts that every product image resolves under its
own folder, so a mis-scoped asset fails the check rather than 404ing in a browser.

## Future migration

A CMS media library returns URLs directly. Those are absolute, so they pass
through the resolver unchanged — the scopes simply stop being consulted.
