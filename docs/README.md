# Elite Export — documentation

A premium B2B leather manufacturing website. Not e-commerce: no pricing, no cart.
The site exists to showcase capability and generate buyer enquiries.

| Folder | What lives there |
| --- | --- |
| [`brand/`](./brand) | Who the company is, what that looks like, how it tells stories, how it photographs them and why — the Brand Bible (voice, principles, Facts Register), the Creative Direction Book (visual philosophy), the Documentary Storyboard (narrative language), Photography Direction (the photography operating manual) the Visual Language Atlas (the philosophy of seeing, and the ten tests) and Motion Direction (how the brand moves, and why it mostly does not). The source of truth every other document answers to, in that order of authority. |
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
