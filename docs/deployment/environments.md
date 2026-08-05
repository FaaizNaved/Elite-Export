# Environments and deployment

## Build

```bash
npm run build
```

Everything except the two API routes is statically prerendered. Content is read
from the filesystem at build time, so a content change requires a rebuild.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URLs, Open Graph, sitemap. Defaults to `https://eliteexport.com`. |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | No | CDN origin for `public/` assets. Unset means Next serves them. Setting it is the entire CDN migration. |
| `SMTP_HOST` | For forms | Outbound mail host. |
| `SMTP_PORT` | No | Defaults to 587; 465 switches to implicit TLS. |
| `SMTP_USER` | For forms | Mailbox the site sends from. |
| `SMTP_PASSWORD` | For forms | Credential for that mailbox. |

Without the SMTP variables the contact and buyer enquiry endpoints return `503`
and the forms show a direct email fallback. They never report a false success.

## Pre-flight

```bash
npm run typecheck && npm run lint && npm run check:content && npm run build
```

All four must pass. `check:content` is the one that catches bad content before
it reaches a page.

## Assets

Every file in `public/images` is currently a generated placeholder
(`npm run generate:placeholders`). Replace them in place with the client's
photography — the content files already reference the final paths.
