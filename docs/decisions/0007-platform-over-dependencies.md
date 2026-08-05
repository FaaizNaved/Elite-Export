# 0007 — Native platform features over UI dependencies

**Status:** Accepted

## Context

The design system needs a modal, a drawer, a lightbox, an accordion, tabs, a
carousel and a tooltip. The default answer is Radix plus Embla plus a positioning
library.

## Alternatives

- **Radix UI + Embla.** Excellent, well tested, and the conventional choice.
  Roughly 40–60 KB of JavaScript, plus a set of APIs to learn and keep current.
- **Hand-rolled from `div`s.** No dependency, and no accessibility either —
  focus trapping and keyboard semantics are exactly what gets skipped.

## Decision

Use the platform wherever it already implements the behaviour correctly:

| Component | Built on | What the platform provides |
| --- | --- | --- |
| Modal, MobileMenu, Lightbox | `<dialog>` + `showModal()` | Focus trap, Escape, inert background, top layer |
| Accordion | `<details name>` | Exclusive open, keyboard, in-page find, indexable when closed |
| Carousel | CSS scroll-snap | Swipe, momentum, trackpad, keyboard scrolling |
| Tooltip | CSS hover / focus-within | Hover and keyboard reveal with no JavaScript |
| Product zoom | CSS transforms, `touch-action` | Native pinch-zoom on touch devices |

Tabs are implemented by hand, because the platform has no equivalent; they follow
the WAI-ARIA tabs pattern with roving tabindex.

## Consequences

Zero UI dependencies, and the hard accessibility details are handled by the
browser rather than by us. Each component is small enough to read in full.

The costs are specific and accepted: the carousel's `loop` rewinds rather than
cloning slides, and the tooltip does not flip near a viewport edge. Both carry
comments naming the ceiling and the upgrade path. Reach for a library when a
design actually crosses one of those lines.
