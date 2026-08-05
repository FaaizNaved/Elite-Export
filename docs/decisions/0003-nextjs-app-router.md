# 0003 — Next.js App Router, no separate backend

**Status:** Accepted

## Context

The site must reach Lighthouse SEO 100 and performance 95+, render rich metadata
per page, and accept two enquiry forms.

## Alternatives

- **Next.js Pages Router.** Familiar, but no Server Components, so content
  loading would either ship to the client or go through `getStaticProps`
  plumbing.
- **A separate API (Express, .NET).** A second deployment, second language
  runtime and a CORS surface, in order to send two emails.
- **A static site generator.** Excellent output, but the forms would still need
  somewhere to post.

## Decision

Next.js App Router with Server Components by default. Route Handlers under
`src/app/api` cover the two form endpoints. Client Components only where
interaction or animation requires them.

## Consequences

Content loading happens on the server, so the catalogue never ships to the
browser. Every page except the two API routes prerenders.

The constraint this imposes is real: importing the content engine from a Client
Component drags `node:fs` into the browser bundle and breaks the build. Server
wrappers (`SiteHeader`, `SiteFooter`) resolve content and pass it down as props,
and `src/lib/navigation.ts` is deliberately content-free so client components can
import it.

Reading `searchParams` in a page opts it out of static generation. Where a query
parameter is genuinely needed — the buyer enquiry prefill — it is read
client-side inside a Suspense boundary instead.
