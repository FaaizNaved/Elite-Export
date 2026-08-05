# 0004 — No database

**Status:** Accepted

## Context

The site shows a catalogue and collects enquiries by email. Nothing is
transacted, no user accounts exist, and no data is written by visitors.

## Alternatives

- **Postgres or MongoDB.** Would make content editable at runtime, at the cost
  of hosting, migrations, backups, connection pooling and an admin UI to build.
- **SQLite in the repository.** Removes the hosting problem but keeps the
  migration and tooling burden, and is worse than files for reviewing prose.

## Decision

No database. Content is files; enquiries are email.

## Consequences

Nothing to provision, back up, secure or pay for, and no query layer between a
page and its content. Preview deployments are complete by construction.

The cost is that content changes need a rebuild, and there is no runtime editing.

## Future migration

An admin panel would replace `src/lib/content/source.ts` with a database client.
Because every consumer works with validated objects from the resolvers, the Zod
schemas become the table definitions and the UI layer is unaffected.
