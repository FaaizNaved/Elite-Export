# 0002 — Images stored in the repository

**Status:** Accepted

## Context

A product catalogue with hundreds of photographs, deployed on Vercel, for a
company whose imagery changes a few times a year.

## Alternatives

- **Cloudinary or similar.** Transformations on demand, but adds a vendor, API
  keys, a monthly bill and a runtime dependency for assets that rarely change.
- **Object storage plus a CDN.** Cheaper than a DAM, still infrastructure to
  operate and secure.

## Decision

Optimised WebP assets live in `public/images`, mirroring the content hierarchy,
and are served through `next/image` and the platform CDN.

## Consequences

No vendor, no keys, no cost, and the whole site works from a clone. Assets are
versioned alongside the content that references them.

The cost is repository size, and that resizing happens before commit rather than
on demand.

## Future migration

Content stores site-relative paths, which are stable identifiers rather than
hosting decisions. `resolveImageUrl()` in `src/utils/image.ts` is the single
place a path becomes a URL, and every content image renders through
`ContentImage`. Setting `NEXT_PUBLIC_IMAGE_BASE_URL` moves every asset to a CDN
without touching a content file.
