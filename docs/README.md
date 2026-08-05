# Elite Export — documentation

A premium B2B leather manufacturing website. Not e-commerce: no pricing, no cart.
The site exists to showcase capability and generate buyer enquiries.

| Folder | What lives there |
| --- | --- |
| [`architecture/`](./architecture) | How the system is put together — stack, content model, assets, site structure |
| [`design-system/`](./design-system) | Visual and motion language, component inventory |
| [`content/`](./content) | How to author and publish content |
| [`development/`](./development) | Roadmap and day-to-day working notes |
| [`deployment/`](./deployment) | Environments, variables and release steps |
| [`decisions/`](./decisions) | Architecture Decision Records — why things are the way they are |

## Layers

The codebase is three layers, and the boundary between them is enforced by review:

```
src/content/  +  src/config/     business layer      — no React, no app logic
        ↓
src/lib/  +  src/utils/          application layer   — parsers, loaders, SEO, helpers
        ↓
src/components/  +  src/app/     presentation layer  — renders what it is given
```

Start with [`decisions/`](./decisions) if you are new: it explains the reasoning
behind the shape of everything else.
