# Elite Export — Implementation Log

A record of what was built, under which rules, and what the audit found. One
entry per milestone. Master Implementation Blueprint R3.4: traceability is
recorded where the work is; R26.9: the record is the first thing a successor
team will need.

Work is classified in three kinds, and they are not the same thing:

| Kind | Meaning | Blocked by |
| --- | --- | --- |
| **Construction** | Building a subsystem | Nothing but its own dependencies. Continues aggressively |
| **Integration** | Wiring in an asset the client owns — photography, copy, fonts, facts | The asset arriving |
| **Publication** | Making it public | Every gate at MIB §16 passing |

A dependency that blocks publication does not block construction, and the
dependency register at MIB §20 is read with that distinction in mind.

---

## Milestone 0.1 — The publication gates

**Stage** 0, the substrate · **Status** complete · **Blueprint reference** MIB
§8.3 (order of works), R8.4 (gates built before any surface), §16 (the gate
schedule), R9.2 (gates are tested by attempting to defeat them)

### Why this was built first

MIB R8.4 is explicit: *the publication gates are built in Stage 0, before any
surface. Building them last means every surface built before them must be
re-audited by hand.* They are also the only Stage 0 item with no blocking
client dependency — the typefaces, the copy, the company name and the
photography all block the rest of the substrate ([§20](#outstanding)).

### Governing rules derived before writing code

| Rule | Source | How it is implemented |
| --- | --- | --- |
| A gate refuses publication; it does not warn | MIB R16.1 | `check:publication` exits non-zero on any finding |
| Thirteen named gates | MIB §16.2 | One entry each in `src/lib/publication/gates.ts`, each carrying its citation |
| No number, certification or capability claim may be published unless traceable to the confirmed record | Brand Bible §19.2, §19.3 | `facts-register.ts` encodes §19.4 with a classification per fact; only `confirmed` publishes |
| A verbal confirmation is not a classification | MIB R20.6 | Classification is a code change, reviewable in one place |
| An image with no retained original is not publishable | Photography Direction §24.4 | Provenance gate: place, capture date, photographer, permission |
| A caption is a specification | Documentary Storyboard §13.6 | Record gate: caption and alternative text both required |
| An image below the threshold is decoration | VDS §30.2, §30.3, §32.3 | Threshold gate: intrinsic shorter side ≥ 960px (480 × 2 delivery) |
| One canonical crop per image | Photography Direction §22.4 | Crop gate: one aspect ratio per source, site-wide |
| No placeholder imagery at any stage, including internally | Photography Direction §24.5 | Placeholder gate, reading a manifest the generator now writes |
| Certification requires issuer, reference, date, scope | UX Blueprint R44.1 | Certification gate |
| Testimony requires seven fields; zero beats one that is short | UX Blueprint R44.4, R44.5 | Testimony gate |
| A category with fewer than three products is a product | UX Blueprint R19.7 | Category gate |
| A chapter is told whole or not at all | Documentary Storyboard §25.1 rule 3 | Chapter gate |
| One action, once; never where forbidden | UX Blueprint §39.3, §39.4 | Action gate |
| No design value outside the single source | VDS §48.3 | Value gate, scanning `src` against `globals.css` |

### What was built

| File | Responsibility |
| --- | --- |
| `src/lib/publication/facts-register.ts` | Brand Bible §19.4 as data: fourteen governed facts, their classification, and the markers that betray one in published text |
| `src/lib/publication/gates.ts` | The thirteen gates as pure functions over a snapshot, plus the three VDS measurements they quote |
| `src/lib/publication/index.ts` | The module's public surface |
| `scripts/check-publication.ts` | Builds the snapshot from the content engine and the asset tree, runs the gates, prints the readiness report; `--selftest` proves the gates refuse |
| `scripts/generate-placeholders.mjs` | Now writes `public/images/.placeholders.json` — an exact manifest, so the Placeholder gate needs no heuristic |
| `package.json` | `check:publication` |

**Deliberately not built:** any runtime coupling. No page imports this layer.
The gates answer one question, asked before anything goes out, and a site that
consulted them at render time would be paying for a decision already made
(MIB R4.4).

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19 is now mechanical rather than remembered — the failure §19.1 records (a fabricated audit body surviving a full review) is no longer possible without deleting a gate. §3.3 one source of truth: the Register lives in one file, classifications change in one place |
| **Creative Direction Book** | No visual decision was taken. L13 applied to the work itself: the gates hold no state, no configuration, no abstraction beyond the thirteen the blueprint schedules |
| **Documentary Storyboard** | §13.6 (caption as specification) and §25.1 rule 3 (a chapter is told whole) are enforced. The Chapter gate is defined and currently vacuous — the chapter model arrives with the Manufacturing surface |
| **Photography Direction** | §24.4 provenance and §24.5 no placeholders are both refusals, not warnings. §22.4's single canonical crop is checked across the whole content set |
| **Motion Direction** | Not engaged. Nothing here moves |
| **Visual Design System** | §30.2, §30.3 and §32.3 are quoted, not re-derived — the constants carry their citation and change only when the VDS does. §48.3 is enforced by the Value gate |
| **UX Blueprint** | R19.7, R44.1, R44.4, R49.5, §39.3 and §39.4 are enforced. §42.3's `REGISTER` mechanism exists as classification data |
| **Master Implementation Blueprint** | §16.2's thirteen gates, in the schedule's order, each carrying its section. R9.2 satisfied: `--selftest` attempts to publish thirteen things that must be refused, and every one is |

### Verification

```
npm run check:publication -- --selftest   ✓ 13 gates refuse what they must; none fires on an empty snapshot
npm run check:content                     ✓ green (development invariants, unaffected)
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean
npm run build                             ✓ green
npm run check:publication                 ✗ 10 of 13 gates refuse, 253 findings — the expected state
```

### What the gates found in the repository as it stands

Not defects introduced by this milestone: the pre-constitution build, measured
against the constitution for the first time.

| Gate | Finding |
| --- | --- |
| Register | 10 statements of unconfirmed fact — machine tonnage, per-shift capacity, power, an AQL reference |
| Provenance | 83 images, none with place, date, photographer or permission |
| Record | 83 images without captions |
| Threshold | 42 images whose intrinsic shorter side is 900px, below the 960px the threshold requires at 2× delivery |
| Certification | 2 records missing reference, scope and exclusions |
| Testimony | 3 records missing written permission and date — all three are on Brand Bible §19.4 |
| Category | 2 categories below three products |
| Placeholder | 98 generated files — **blocking, and the root cause of most of the rest** |
| Action | Home carries four actions where one is permitted |
| Value | 26 files carrying literal design values outside the token source |

Crop, Consent and Chapter pass, two of them vacuously: the Person and Chapter
models arrive with the surfaces that need them.

<a id="outstanding"></a>

### What blocks the rest of Stage 0

MIB §20, unchanged by this milestone. Stage 0 cannot be completed — and no
surface may begin — until:

1. **Typefaces licensed** (MIB §20 item 13, VDS §51.3 item 6) — blocking the
   single source of design values, and therefore every surface.
2. **The company name confirmed** (item 2) — blocking navigation, the footer
   record and the legal identity.
3. **Copy, authored under Brand Bible §11–§12** (item 12) — blocking per
   surface; stand-in text is forbidden (R6.4).
4. **Access to a working shift** (item 1) — the root dependency; blocking
   publication of everything.

**Discharged by the approval of UX Blueprint v1.1:** items 17 (the five primary
navigation destinations, R37.2) and 18 (nothing gated; individuals not
tracked). Both were approval-checklist lines in a document that has been
approved, so neither blocks.

Per MIB R2.4, work does not proceed past a blocking dependency on the most
likely reading. The next milestone begins when the first of these is answered.

---

## Milestone 0.2 — The design value source

**Stage** 0, the substrate · **Kind** Construction (the two typefaces are
Integration) · **Status** complete · **Blueprint reference** MIB §8.3 (Stage 0
contents), R8.5 (the shared thing before the thing that uses it), §48.2 (the
value groups), R7.1 (one source of truth)

### Why this was built second

MIB R8.5: within a stage, the shared thing is built before the thing that uses
it, and never the reverse. Every primitive in Stage 1 and every component in
Stage 2 is composed of these values; extracting them later from a finished
surface would carry that surface's assumptions into everything after it.

The two typefaces are not licensed (MIB §20 item 13). Under the
Construction/Integration split that blocks the *asset*, not the *subsystem*:
the roles are declared and every other value is fixed, and the licensed files
are wired in later with no other change.

### Governing rules derived before writing code

| Rule | Source | How it is implemented |
| --- | --- | --- |
| Every value in one place; nothing outside it | VDS §48.1, §48.3 · MIB R7.1 | `globals.css` is the only place a value is authored |
| A forbidden value is *not expressible* | VDS §49 | Tailwind namespace resets (`--radius-*: initial` and four others) remove them from the theme, so a legacy class generates nothing |
| Two voices, two jobs; no third face; no bold serif | Brand Bible §16.3 · VDS §8.4, §8.5 | `--font-serif`, `--font-sans`; three weights |
| The palette is closed at eight values; no accent; no dark mode | VDS §14.3, §15.3, §19 | Colour namespace reset, then the eight, plus the veil and three keywords |
| Seven type ranks, interpolating between two anchors, capped at 1440 | VDS §3.2, §9.2 | One `clamp()` per rank; the middle term is the line through the anchors |
| Figures are always tabular | Brand Bible §16.3 | `font-variant-numeric: tabular-nums` on `body` — not a class somebody must remember |
| Base unit 4px; twelve legal steps; seven space ranks | VDS §21.2, §21.3, §4.2 | `--spacing: 0.25rem` plus `--spacing-s1…s7`; small ranks constant, large ranks halve |
| Breakpoints read off content, never devices | VDS §27.1 | Three, each carrying the arithmetic that produced it |
| Radius zero; no shadows; no blur; no elevation system | VDS §16.2, §16.3, §16.5, §14.5 | Five namespaces reset to `initial`; two depth levels only |
| Four duration bands, one curve, no overshoot | VDS §42.2, §42.3, §42.4 | Four `--duration-band-*`, one `--ease-placed`, four `motion-*` utilities |
| Reduced motion removes movement and substitutes nothing | VDS §42.7 · Motion M13 | One `prefers-reduced-motion` block |
| `prefers-contrast` honoured, `prefers-color-scheme` not | VDS §19.2 | One media block; no dark scheme anywhere |
| Focus is 2px and never removed | VDS §16.4, §47.3 | One `:focus-visible` rule for the whole application |

### The curve was measured, not chosen

VDS §42.4 states a constraint rather than a value: acceleration ≤ ⅓ of the
duration, deceleration ≥ ⅔, the final quarter of the distance taking ≥ 40% of
the time, and no control point outside 0–1 so overshoot is not representable.

Candidates were sampled numerically and `cubic-bezier(0.4, 0.05, 0.15, 1)` was
selected: peak velocity at t = 0.28, final quarter of the distance taking 55%
of the time. It starts deliberately, which is the claim about mass Motion
Direction M4 requires, and it places rather than throws.

### What was built

| File | Change |
| --- | --- |
| `src/app/globals.css` | Rewritten as the single source: every value carrying its citation, four utilities, nothing else |
| `src/app/layout.tsx` | `next/font/google` removed; the skip link moved onto the new tokens |

**Deleted, with the rule that removes each:** six `texture-*` utilities (VDS
§14.5 — the texture threshold on a non-photographic surface is zero); the
`rule-stitch` gold mark (§23.5 — a rule may never open a chapter; §14.3 — no
decorative accent); `scrim-hero` (§18.2 — a gradient scrim is a named look);
`shimmer` (§38.4 — no skeletons); the `marquee` keyframes (Motion M15 —
perpetual motion is a nervous habit); four easing curves and four durations
(§42.4 — there is one curve); eight z-index levels (§16.2 — there is no
elevation system); five radii, four shadows, two blurs, and the gold accent
with its two variants.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §16.3 implemented in three places at once — two voices, body in the sans, figures tabular by default. §3.3 one source of truth: a design value is authorable in exactly one file. D8 interfaces recede: the only marks available are a hairline and a focus ring |
| **Creative Direction Book** | L9 and L14 enforced by absence — a border scale, a shadow scale and a radius scale no longer exist, so no component can reach for one. §22.1's announced opening is unavailable: the decorative rule is deleted |
| **Documentary Storyboard** | Not directly engaged. The space ranks exist to carry chapter breaks (S6) and the held moment (S7) when the surfaces are built |
| **Photography Direction** | §19.4 honoured structurally: the surface palette is near-achromatic, so no photograph sits in a colour context we chose. No filter, blur or blend is expressible |
| **Motion Direction** | M5 enforced by the curve's shape rather than by review — no control point leaves 0–1, so nothing can overshoot. M15: `--animate-*` is reset, so no perpetual animation exists. §19.3 one behaviour per class: a component picks the class of the moving thing, never a timing |
| **Visual Design System** | Parts II–V and §42 implemented in full. §49's "not expressible" taken literally rather than as guidance |
| **UX Blueprint** | R49.7 supported: nothing in the palette carries meaning by hue alone. The state behaviours are unaffected |
| **Implementation Blueprint** | R7.1, R8.5 and §48.2 satisfied. R1.5: no build-time apparatus was added — the mechanism is a stylesheet |

### Verification

```
npx tsc --noEmit               ✓ clean
npm run lint                   ✓ clean
npm run check:content          ✓ green
npm run build                  ✓ green — every route still prerenders
npm run check:publication      ✗ 10 of 13 gates refuse (unchanged; nothing here was gated)
```

Measured in the running application rather than asserted:

| Check | Result |
| --- | --- |
| Body background / text | `rgb(242,239,233)` / `rgb(28,26,23)` — paper and ink |
| Body type | 17.32px at this field, leading 26.85 (1.55) — the clamp interpolates as specified |
| Figures | `tabular-nums` applied document-wide |
| **Radius, across every element in the DOM** | `0px` — the only value present |
| **Shadow, across every element in the DOM** | `none` — the only value present |
| **Backdrop filter, across every element** | `none` — glass is gone site-wide |
| Production stylesheet | `border-radius:0` and `box-shadow:none` are the only such declarations in the file; no `backdrop-filter` at all |
| Breakpoints emitted | `45rem`, `64rem`, `80rem`, and no others |
| Console | no errors |

The space ranks `s1`–`s7` are defined but not yet used by any component, so
Tailwind does not emit them. Their arithmetic was verified by hand against VDS
§4.2 and §25.1; they are proven in use at Stage 1.

### Consequences to expect

The legacy surfaces now render without the treatments the constitution removes:
no rounded corners, no shadows, no glass, no gold, no textures, and no
`sm:`/`md:`/`lg:` breakpoints — those class names no longer exist, so they
generate nothing.

**This is the intended state, not a regression.** Those surfaces are
pre-constitution and are scheduled for rebuild at Stages 2–4. A compatibility
alias would have been a second source of truth (R7.1) and would have hidden the
collision MIB R8.8 requires to be resolved *before* the surfaces are rebuilt.

### Scheduled next, and why not now

**Milestone 0.3 — the motion value source, and the demolition of the JS
animation layer.** `src/theme/motion.ts` is the JavaScript half of the value
source and still contains four easings (VDS §42.4 permits one), spring physics
(Motion M5 forbids them outright — "nothing to parameterise"), marquee pacing
(M15), animated-counter pacing (Brand Bible §16.3), scroll-viewport triggers
(VDS §42.5 — nothing fades in on scroll) and reveal travel distances.

It was not changed in this milestone because its exports are consumed by six
components — `mega-menu`, `motion/counter`, `motion/motion`,
`scroll/scroll-progress`, `tabs`, `providers/smooth-scroll` — **every one of
which the constitution removes** (VDS §37.1, §41; Motion M7, M15). Rewriting
the values without deleting the consumers would map correct numbers onto
forbidden concepts and legitimise them; deleting the consumers is a demolition
milestone with its own audit. Recorded here so the contradiction is scheduled
rather than silent.

**Also scheduled:** `<BackToTop />` in the root layout (UX Blueprint X6, VDS
§41 — nothing follows the visitor) is removed with the shared-layout milestone,
and `src/theme/index.ts`'s token table is rewritten with it.

---

## Milestone 0.3 — The motion layer, removed

**Stage** 0, the substrate · **Kind** Construction · **Status** complete ·
**Blueprint reference** MIB §14 (the negative inventory), R7.1 (one source of
truth), R4.4 (the cheapest thing to maintain is the thing that was never
built), R8.8 (collisions resolved before the surfaces are rebuilt)

### Why this package came next

Milestone 0.2 left one contradiction standing and scheduled it: `src/theme/
motion.ts` was a second source of motion values, holding four easings where the
Visual Design System permits one, plus spring physics that Motion Direction M5
forbids outright — *"nothing to parameterise."*

It could not be rewritten in place, because its consumers were the problem. Six
components imported it, and the constitution removes every one of them. Fixing
the numbers without deleting the consumers would have mapped correct values onto
forbidden concepts and legitimised them. So the package is the demolition, and
the motion value source is what remains after it: `globals.css`, alone.

It comes before navigation, forms and the image pipeline because those
subsystems are built *on* the component layer, and R8.5 forbids building the
dependent thing first.

### Governing rules derived before writing code

| Rule | Source | Consequence |
| --- | --- | --- |
| Content is present when the surface is; **nothing fades in on scroll** | VDS §42.5 | Every reveal wrapper deleted |
| Motion is never evidence | Motion M1 | No content may depend on a movement to be reached |
| Every movement has a visible cause | Motion M6 | A reader scrolling did not cause an element to materialise |
| The subject moves, the observer rarely, **the frame never** | Motion M7 | Parallax and smooth-scroll hijacking deleted |
| Nothing bounces, springs, overshoots or settles twice | Motion M5 | Spring parameters deleted; nothing to parameterise |
| Repetition of a gesture is a nervous habit | Motion M15 | Marquee and background loops deleted |
| Motion is the one element a viewer cannot decline | Motion M3 | Autoplaying video deleted |
| One behaviour per class of event; one curve | VDS §42.2, §42.4, §19.3 | Four bands and one curve, in CSS only |
| Reduced motion removes movement and substitutes nothing | VDS §42.7 | The wrappers already rendered a plain `<div>` here — so unwrapping *is* the specified behaviour, for everyone |
| No carousel, tabs, sticky bar, back-to-top, progress bar, skeleton, lightbox | VDS §41 · MIB R14.1 | Each deleted, or scheduled with its own milestone |
| No dropdown, no mega-menu, no hover-revealed panel | VDS §37.1 | Panel and dropdown deleted |
| Nothing follows the visitor | UX X6 · CDB §22.4 | Sticky CTA and back-to-top deleted |
| A number set as a statement becomes rhetoric | Brand Bible §16.3 | The counting animation deleted |
| Content behind a tab lost an argument about belonging on the surface | VDS §41, §40.1 | Gallery tabs replaced by every album, in sequence |
| Volume of evidence is itself the argument — on this one surface | UX R23.2 | Which is what the gallery now does |

### What was removed

**Two dependencies, entirely:** `framer-motion` and `lenis`. Nothing in `src/`
references either.

| Deleted | Removed by |
| --- | --- |
| `src/animations/` — the reveal variant language | VDS §42.5 |
| `src/theme/` — the second motion source | R7.1 · VDS §42.4 |
| `src/components/motion/` — reveal wrappers, counter, marquee | VDS §42.5 · Brand Bible §16.3 · Motion M15 |
| `src/components/scroll/` — back-to-top, sticky CTA, reading progress | UX X6 · CDB §22.4 · VDS §41 |
| `src/components/tabs/` | VDS §41 |
| `src/components/carousel/` | VDS §41 · CDB §11.3 |
| `src/components/layout/mega-menu/` | VDS §37.1 |
| `src/providers/smooth-scroll.tsx` | Motion M7 · VDS §41 |
| The navbar's hover dropdown | VDS §37.1 |
| The hero's background-video variant, and the variant itself | VDS §41 · Motion M3, M15 |
| Full-bleed parallax | Motion M7, M6 |
| The gallery's tab interface | VDS §41 · UX R23.2 |

**Net: 51 files changed, 736 insertions, 2,417 deletions.** The insertions are
almost entirely the comments recording *why* each thing is gone, so a successor
does not reintroduce it.

Three components became server components by losing their only reason to be
client components — `full-bleed-image`, and the pages that only imported
wrappers. No unnecessary client component was introduced.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §16.3: the counting animation is gone, so a figure is a record rather than rhetoric. §7.2: excitement and novelty had their last mechanisms removed — marquee, counter, carousel |
| **Creative Direction Book** | §22.4 satisfied structurally: no element now follows the visitor, so a held moment is possible for the first time. §11.3: the carousel — which made the eye compare rather than examine — no longer exists |
| **Documentary Storyboard** | §25.1 rule 3 supported: the gallery presents whole sets rather than fragments behind tabs |
| **Photography Direction** | §16 supported: a photograph is placed and stays placed. Parallax was moving the frame around the evidence |
| **Motion Direction** | M1, M3, M5, M6, M7, M15 all enforced by absence rather than by review. The only motion the system can now express is a state change in one of four bands on one curve, declared in CSS |
| **Visual Design System** | §41's negative inventory is now largely *true of the codebase* rather than only of the documents. §42.4: one curve, one source |
| **UX Blueprint** | X6 satisfied. R23.2 implemented: the gallery is extent, not an interface. R39.4: the action no longer appears in a persistent bar |
| **Implementation Blueprint** | R7.1: motion has exactly one source. R4.4: two dependencies and nine component families are now unmaintainable-by-absence. R14.1: eleven negative-inventory entries discharged |

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — every route still prerenders
npm run check:publication -- --selftest   ✓ 13 gates still refuse what they must
npm run check:publication                 ✗ 10 of 13 refuse, 249 findings (was 253 — four stray-value files deleted)
```

Measured in the running application:

| Check | Home | Gallery |
| --- | --- | --- |
| Elements in `main` | 254 | — |
| **Elements sitting at opacity 0** | **0** | — |
| **Elements transformed away from their place** | **0** | — |
| **Running animations** | **0** | — |
| Scroll behaviour | `auto` — the browser's own | — |
| Lenis present | no | — |
| Tab roles in the document | — | **0** |
| Album headings rendered in sequence | — | Factory, Machinery, Products, Packaging, Events |
| Images present without an interaction | — | 31 |
| Console errors | none | none |

Before this package those elements began at opacity 0 and waited for a scroll
to be granted. **Nothing on the home page is now withheld from a visitor who
does not scroll**, which is VDS §42.5 stated as a measurement.

### What this did not do, and why

- **StatCard** still exists. MIB R14.1 lists the statistic panel in the negative
  inventory, but removing a component is the component-inventory milestone at
  Stage 2, not the motion milestone. Its *animation* is gone; the component is
  scheduled.
- **Lightbox and tooltip** still exist (VDS §40.3, §41). Same reason — Stage 2.
- **The navbar was not rebuilt.** Its panel and dropdown are gone, but UX R37.2's
  five destinations, R37.5's location marking and R37.6's retreat over evidence
  are the navigation architecture milestone.
- **`object-cover` on full-bleed photographs** remains a Crop-gate violation
  (VDS §32.1). It belongs to the image pipeline milestone, which is the next
  package.

---

## Milestone 0.4 — The image pipeline

**Stage** 0, the substrate · **Kind** Construction (the photographs and their
recorded dimensions are Integration) · **Status** complete · **Blueprint
reference** MIB §8.3 (Stage 0 contents), R8.5 (the shared thing first), §16
(the Threshold, Crop, Record and Provenance gates)

### Why this package exists, and why it came next

Chosen against the dependency graph rather than for convenience. Every surface
in Stages 3 and beyond is photograph-led (Brand Bible D1: photography carries
the argument, everything else annotates), and Visual Design System §32.1 is not
a styling preference — it is a structural constraint on how *any* component may
hold an image. Building the Stage 2 component inventory first would mean
rebuilding every one of those components when this landed.

It was also the largest live collision in the build: `object-cover` appeared at
27 sites. Photography Direction §22.4 explains why that matters more here than
on an ordinary site — an image has one canonical crop, decided when it enters
the library, and **two crops of one frame in circulation are two different
statements**. Cover-fit is a second crop, performed by a machine, on every
viewport independently.

### Governing rules derived before writing code

| Rule | Source | How it is implemented |
| --- | --- | --- |
| Containers set width; height follows the image's own ratio | VDS §32.1 | `width`/`height` from the token plus `style={{width:'100%',height:'auto'}}` |
| **No cover-fit, no fixed-height image areas, no art direction by crop** | VDS §32.1 · Photography §22.4 | `fill` and every object-fit are **absent from the primitive's API** — not discouraged, not available |
| An image whose size is unknown cannot be shown to reach the threshold | VDS §30.2 | The primitive renders nothing without intrinsic dimensions |
| Where the evidence does not exist, the section does not exist | UX X8 | Which is why rendering nothing is correct, and the gate names each one |
| Below 320px an image is decoration and may not appear | VDS §30.3 | 80px and 64px thumbnail strips replaced by numerals |
| Delivered at not less than 2× the largest rendered size | VDS §32.3 | `sizes` derived from the containers, in one place, so a call site cannot guess |
| Judged on grain and shadow detail, never on file size alone | VDS §32.3 · CDB §14.3 | Delivery quality fixed once in the primitive |
| A wait is stated, never disguised | Motion M11 · VDS §38.4 | The blur-up placeholder removed — it shows a fake image while the real one loads |
| There are no decorative images; an empty description means it should not be published | VDS §47.4 · UX R49.5 | Decorative `alt=""` background photographs removed from the hero and the CTA banner |
| Text sits beside a photograph or below it — never on it | VDS §33.1 | Same removal; the photograph returns beside the words when the surface is rebuilt |
| An image with no retained original is not publishable | Photography §24.4 | `provenance` added to the image model: place, capture date, photographer, permission |
| Hover never scales | VDS §42.5 | Three image hover-zooms removed |
| A caption is a specification | Documentary §13.6 | Recorded on the model; the Record gate already refuses without it |

### Files created

| File | Responsibility |
| --- | --- |
| — | No new file. The pipeline is the primitive that already existed, made incapable of the thing it was doing |

### Files modified

| File | Change |
| --- | --- |
| `src/components/ui/image/content-image.tsx` | Rewritten. Requires intrinsic dimensions, renders nothing without them, cannot crop, cannot fill, fixes delivery quality |
| `src/utils/image.ts` | Blur placeholder removed; `imageSizes` added — five entries derived from VDS §27.2 containers |
| `src/models/primitives.ts` | `provenanceSchema`, `evidenceRankSchema`; `imageSchema` gains `provenance` and `evidenceRank`, with the rules cited on each field |
| `src/components/gallery/gallery.tsx` | The uniform-grid layout deleted; every photograph keeps its own height |
| `src/components/cards/gallery-card.tsx` | Aspect box, cover-fit, blur and hover zoom removed; routed through the primitive |
| `src/components/gallery/product-gallery.tsx` | Stage image routed through the primitive; 80px thumbnails replaced by numerals |
| `src/components/gallery/lightbox.tsx` | Routed through the primitive; 64px thumbnails replaced by numerals |
| `src/components/hero/hero.tsx` | Decorative background photograph removed |
| `src/components/layout/cta-banner/cta-banner.tsx` | Same, plus the 75% ink wash over a photograph it required |
| `src/components/ui/card/card.tsx` | Media slot no longer stretches or crops its child; hover zoom removed |
| `src/components/sections/full-bleed-image.tsx` | Cover-fit and per-call quality removed |
| `src/lib/mdx/components.tsx` | Prose no longer renders photographs |
| `src/app/blog/page.tsx`, `src/app/gallery/page.tsx`, `src/app/page.tsx` | Call sites adjusted; hover zoom removed |
| `src/components/video/video-player.tsx` | Poster routed through the primitive; the video element no longer cover-fits |

### Files removed

None. This package removed capabilities, not files.

### Dependencies

None added, none removed.

### Architecture decisions

**1. The rule is enforced by the API, not by review.** `fill` and `objectFit`
are not options the primitive rejects — they are not parameters it accepts. A
developer cannot crop a photograph through the supported path, and there is no
longer an unsupported path: nothing in `src/` imports `next/image` except the
primitive itself.

**2. An image without intrinsic dimensions renders nothing.** It is the only
answer consistent with VDS §30.2 and UX X8: a frame whose size is unknown
cannot be shown to be evidence, and the alternative — rendering it anyway — is
publishing decoration. The Threshold gate names every instance, so the absence
is reported rather than silent.

**3. Prose carries no photographs.** A photograph in this system arrives with a
caption that is a specification, provenance, an evidence rank and a size that
clears the threshold. Markdown can express none of those. Photography is placed
by the surface, from the content model, where its record travels with it.

**4. `sizes` lives with the containers, not at the call site.** A wrong `sizes`
silently breaks §32.3 — the browser fetches below 2× and the grain a buyer is
meant to examine is gone before layout. Five entries, each quoting the container
in VDS §27.2 that produced it.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | D1 is now structurally true: a photograph cannot be reshaped to suit a layout, so the layout must accommodate the argument. §3.3: `sizes` and delivery quality each exist once |
| **Creative Direction Book** | §6.1 — an image too small to be examined is decoration — is enforced at two thresholds (320 render, 960 intrinsic). §11.3: the uniform gallery grid that made every frame equal weight is gone |
| **Documentary Storyboard** | §13.6 supported: the caption is a modelled field, and the Record gate refuses without it |
| **Photography Direction** | §22.4 is the package's spine — one canonical crop, enforced by the absence of a cropping mechanism. §24.4 provenance is now expressible in content rather than only demanded by a gate. §16.3's frames-with-room-in-them is what the layout now depends on |
| **Visual Language Atlas** | §24: the work is invisible — no call site chooses a fit, a quality or a placeholder any more |
| **Motion Direction** | M11: the blur-up placeholder was a disguised wait, and it is gone. M13: three image hover-zooms removed |
| **Visual Design System** | §30.2, §30.3, §32.1, §32.3, §33.1, §42.5, §47.4 implemented. §32.2 honoured by omission: **no aspect-ratio token exists**, because a list of approved ratios would become a set of boxes, and boxes crop |
| **UX Blueprint** | R49.5: no decorative images remain — the two that existed were removed rather than described. X8: absence is designed around |
| **Implementation Blueprint** | §16's Threshold, Crop, Record and Provenance gates now have a content model that can satisfy them. R7.1: one delivery quality, one `sizes` source, one image component |

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — every route still prerenders
npm run check:publication -- --selftest   ✓ 13 gates still refuse what they must
npm run check:publication                 ✗ 10 of 13 refuse, 247 findings (was 249)
```

Measured in the running application, on the home page:

| Check | Result |
| --- | --- |
| Images on the page | 5 |
| **Cover-fitted images** | **0** |
| **Images whose rendered ratio differs from the frame's own** | **0** — the canonical crop survives to the screen |
| Images delivered below 2× | 5 — see below |
| `next/image` imports outside the primitive | **0** |
| `object-cover` occurrences in `src/` | **0** |
| Console errors | none |

The 2× finding is honest and expected: the assets are generated placeholders
whose intrinsic sizes sit below the 960px floor VDS §32.3 requires. It is a
property of the stand-in files, not of the pipeline, and the Threshold gate
already reports all 42 of them. It cannot be measured against real photography
until real photography exists.

### Technical metrics

| Metric | Value |
| --- | --- |
| Files added | 0 |
| Files modified | 15 |
| Files deleted | 0 |
| Lines added / removed | Not separable for this package alone — `git diff --stat` reports 60 files, +990 / −2,580 across packages 0.2–0.4 combined, and the working tree has not been committed between them |
| Dependencies added | 0 |
| Dependencies removed | 0 |
| Bundle impact | Not measurable as a delta. This Next version does not print per-route sizes in the build output, and no baseline was captured before the package. Total client chunks after: 1.4 MB across 16 files |
| Accessibility impact | Positive and specific: two `aria-hidden` decorative photographs removed (UX R49.5 — there are no decorative images), and two sub-threshold thumbnail strips replaced with numerals that carry the existing `aria-label`. No regression introduced; no automated audit was run, so no score is claimed |
| Performance impact | Directionally positive — the blur-up placeholder payload is gone from every image and `sizes` is now correct per container, so fewer oversized sources are fetched. **Not measured.** No before/after profile was taken and none is claimed |
| Architectural debt remaining | Listed below |

### Remaining technical debt

Each carries the rule that will remove it and the milestone that owns it.

| Debt | Rule | Owner |
| --- | --- | --- |
| The lightbox exists | VDS §40.3 — an image worth opening was worth placing at threshold | Stage 2 component inventory |
| Product-gallery zoom and fullscreen apparatus | VDS §41, §42.5 — image zoom is removed; an image at threshold can already be examined | Stage 2 |
| `StatCard` | MIB R14.1 — statistic panel | Stage 2 |
| Tooltip | VDS §41 | Stage 2 |
| `AspectRatio` component still exists, now unused by images | VDS §32.1 | Stage 2 |
| 10 photographs in company MDX have no dimensions and no record | VDS §30.2 | Content, at Integration |
| The navbar is not rebuilt | UX R37.2, R37.5, R37.6 | Navigation architecture milestone |
| 7 files still carry literal design values | VDS §48.3 | Stage 2, as each component is rebuilt |

### What this package unlocked

Every Stage 2 component and every Stage 3+ surface can now hold a photograph
without deciding anything about it: there is one way in, it cannot crop, it
cannot disguise a wait, and it refuses to render what it cannot prove. The
content model can now carry provenance, which is the only thing that was
stopping the Provenance and Record gates from ever passing — they are now
blocked on photographs rather than on code.

### Why the next package follows

**Navigation and footer architecture.** With the value source, the motion
layer and the image pipeline settled, the shared chrome is the last substrate
every surface sits inside. It is constructible today: UX R37.2's five
destinations were approved with the UX Blueprint, and R37.5, R37.6, R37.9 and
R38.4 fix the behaviour. Its copy is Integration, and its structure is not.

---

## Milestone 0.5 — Navigation and footer architecture

**Stage** 0, the substrate · **Kind** Construction · **Status** complete ·
**Blueprint reference** MIB §8.3 (Stage 0 contents), R8.5 (the shared thing
before the thing that uses it), R11.1 (the structural component set)

### Why this package exists

The shell is the last piece of substrate every surface sits inside. MIB R11.4
is explicit — navigation and the footer are built in Stage 0 and are not
revised per surface — and R8.5 forbids building the dependent thing first: a
surface built against the old chrome would be rebuilt when the chrome changed.

It was constructible today because UX Blueprint R37.2 names the five
destinations and that document is approved. Nothing in this package waited on
photography, copy, fonts or the Facts Register.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| Navigation exists so a visitor who arrived anywhere can establish where they are and what else exists | UX R37.1 · CDB L15 | The bar states location; the footer is the index |
| **Five destinations, and these five**: Manufacturing, Products, Quality, Export, About | UX R37.2 · VDS §37.1 | `primaryNav`, asserted at five in `check:content` |
| Order is the canonical chapter order, not importance | UX R37.4 · X2 | Asserted by `deepEqual` against the expected order |
| Home is the company name; **Enquiry is not in the bar** | UX R37.2 · X5 | Identity links home; no enquiry entry, asserted |
| The current surface is identifiable from the navigation | UX R37.5 · VDS §37.1 | `aria-current="page"` plus a 1px underline at 4px offset |
| **It leaves with the field** — never sticky, never over a photograph | VDS §37.1, §42.6 · CDB §22.4 | `position: static`. No scroll listener exists |
| No border, no shadow, no background change on scroll | VDS §37.1 | None of the three is expressible since Package 002 |
| No dropdown, no mega-menu, no hover panel | UX R37.7 · VDS §37.1 | Removed in Package 003; the data structure that fed them is gone here |
| Height 80 at and above 720px, 64 below | VDS §37.1 | A 48px control row plus S2 / S1 — derived, not typed |
| The small field gets the **same five** from one labelled control, as a full field | UX R38.6 · VDS §37.1 | Native `<details>`; nothing removed, nothing added |
| It does not float, dock or follow at any size | UX R38.7 | Static at every width |
| A word where a word fits, not a glyph | VDS §43.2 | The control reads "Index" |
| Interactive targets ≥44px | VDS §47.5 | The control is 52 × 48 |
| The footer is the index and the record: identity, place, contact, **every** surface, the legal record | UX R37.9 · VDS §37.2 | One flat index in chapter order, plus the legal list from content |
| The index is identical at every field size | UX R38.8 | No responsive filtering — nine entries at every width |
| Footer: a single hairline above, S6 space, sans only | VDS §37.2, §16.4 | One `border-t` in `--color-hairline`, `mt-s6` |
| **Never** a newsletter, a social row, a repeated CTA, an award badge, a "trusted by" strip, a certification logo | VDS §37.2 | All six were present; all six removed |
| Every surface reachable in two steps | UX R37.10 | Bar plus index, asserted in `check:content` |
| No unconfirmed fact published | Brand Bible §19.2, §19.4 | Headcount is in the company record and is **not** rendered |
| Copy is not the build's to write | MIB R6.4 | Labels are the surface names from UX Blueprint Part III; no sentence was authored |

### Architecture decisions

**1. The shell is server-rendered; exactly one client component exists.**
Reading the current URL from a server component is unsupported in this
framework version, and stating location is a requirement (R37.5) rather than a
nicety — so `SurfaceLink` is a client component and nothing else in the shell
hydrates. The old navbar and mobile menu were both client components carrying
scroll listeners, hover-intent timers, escape handlers and an open-panel state
machine.

**2. The small-field index is native disclosure.** `<details>`/`<summary>`
gives a labelled control, keyboard operation and correct semantics with no
state, no script and no library. This is the platform feature doing what a
component was doing — MIB R4.1, simplicity as the engineering form of restraint.

**3. One `Primary` landmark at every field size.** The first implementation
rendered two `<nav aria-label="Primary">` elements, one per breakpoint. Caught
in verification: two landmarks with one name is a defect for anyone navigating
by landmark. The wide list and the disclosure are now two presentations inside
one landmark.

**4. Height is derived, not typed.** VDS §37.1 states 80/64 and derives them
from a 48px control plus S2 or S1. The implementation states the derivation —
`min-h-12` with `py-s2` / `py-s1` — so the values follow the space ranks if
those ever change. Measured at 80 and 64 exactly.

**5. The index is flat.** VDS §37.2 calls the footer a record, and UX R37.9
says a record is complete rather than arranged. Grouped columns with headings
would have required inventing headings, which is copy (R6.4), and would have
implied a taxonomy the site does not have.

### Files created

| File | Responsibility |
| --- | --- |
| `src/components/layout/surface-link.tsx` | A navigation link that states whether you are on it |

### Files modified

| File | Change |
| --- | --- |
| `src/config/navigation.ts` | Rewritten: `primaryNav` (the five, in chapter order) and `surfaceIndex` (every surface). The seven-item menu with a nested "Company" group and a mega-menu slot is gone |
| `src/components/layout/site-header.tsx` | Rewritten as the shell — static, five links, native small-field index, no CTA, no phone number |
| `src/components/layout/site-footer.tsx` | Rewritten as the record — address, contact, index, legal |
| `src/components/layout/index.ts`, `src/config/index.ts` | Barrels follow |
| `scripts/check-content.ts` | The mega-menu assertion replaced by five assertions drawn from UX §37 |

### Files removed

| Removed | Rule |
| --- | --- |
| `src/components/layout/navbar/` (287 lines) | UX R37.2, R37.7 · VDS §37.1 |
| `src/components/layout/mobile-menu/` (197 lines) | UX R38.6 — replaced by native disclosure |
| `src/components/layout/footer/` (220 lines) | VDS §37.2 — it carried a social row, certification marks and a description |

### Dependencies

None added, none removed.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with five new navigation assertions
npm run build                             ✓ green — every route still prerenders
npm run check:publication -- --selftest   ✓ 13 gates still refuse what they must
npm run check:publication                 ✗ 10 of 13 refuse, 247 findings — unchanged
```

Measured in the running application, on `/quality`:

| Check | Wide field (735px) | Small field (375px) |
| --- | --- | --- |
| Header position | `static` | `static` |
| **Header height** | **80px** | **64px** |
| Control row height | 48px | 48px |
| Border / shadow on the header | none / none | none / none |
| Primary destinations | Manufacturing, Products, Quality, Export, About | the same five, from the control |
| `Primary` landmarks in the document | **1** | **1** |
| Current surface marked | `aria-current="page"` + underline | same |
| Index control target | — | **52 × 48px**, keyboard focusable |
| Footer index entries | 9 | **9 — identical** |
| Footer space above / separator | 128px, 0.8px hairline `#d9d5cd` | 96px (S6 small) |
| Social row / newsletter / CTA in the chrome | **0 / 0 / 0** | same |
| Console errors | none | none |

Two deviations were found by that verification and fixed before presenting: the
duplicated landmark, and an index control measuring 23px against the 44px
minimum in VDS §47.5.

### Technical metrics

| Metric | Value |
| --- | --- |
| Files added | 1 |
| Files modified | 5 |
| Files deleted | 6 (three component directories) |
| Lines: chrome before | 793 (navbar 287, mobile-menu 197, footer 220, site-footer 48, site-header 41) |
| Lines: chrome after | **217** (site-header 58, site-footer 74, surface-link 30, navigation config 55) |
| Net change in the shell | **−576 lines, −73%** |
| Dependencies added / removed | 0 / 0 |
| Bundle impact | Not measurable as a figure — this Next version prints no per-route sizes and no baseline exists. Directionally: two client components carrying scroll listeners, hover timers and panel state were replaced by one 30-line client component and a native `<details>`. Client components across the app: 18 → 17 |
| Accessibility impact | Measured, specific: one `Primary` landmark instead of two; `aria-current="page"` on the current surface; the small-field control is 52 × 48px against a 44px minimum and is natively keyboard-operable; the index is complete at every field size. No automated audit was run, so no score is claimed |
| Performance impact | **Not measured.** No before/after profile was taken. The scroll listener and hover-intent timers are gone, which cannot make it slower |
| Architectural debt remaining | Below |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| Two enquiry routes still resolve — `/contact` and `/buyer-enquiry`. The index advertises one door; the second is unlisted but live | UX R25.2, R39.5 — one door | Routing milestone |
| The Journal is served at `/blog` | UX R24.1; address permanence R29.2 means the rename must keep the old address resolving | Routing milestone |
| No `/legal` index surface; legal pages are reached individually | UX R26.1 | Routing milestone |
| Registration identifiers are absent from the company record, so the footer cannot state them | VDS §37.2 · Brand Bible §19 | Integration — client |
| `CtaBanner` still appears on ten surfaces | UX R39.3 — one action, at the close, and not on every surface | Stage 2 |
| Lightbox, product zoom, StatCard, tooltip, AspectRatio | VDS §40.3, §41, §42.5 · MIB R14.1 | Stage 2 |
| 7 files carry literal design values | VDS §48.3 | Stage 2 |

### What this package unlocked

Every present and future surface now inherits a shell that cannot break the
rules: it cannot follow the visitor, cannot overlay a photograph, cannot grow a
sixth destination without an amendment, and cannot hide a surface from the
record. Stage 1 primitives and Stage 2 components can now be built against a
fixed frame, and Stage 3's Home surface has something to sit inside.

### Why the next package follows

**The component inventory is the last Stage 0 substrate, and its negative half
comes first.** MIB R8.3 lists Stage 0 as the substrate plus *the shared
component set at Part IV* — §10 to §14 — and R10.3 closes that inventory. It
cannot be closed while the components §14.1 names are still in the tree, so the
removal precedes the construction (R8.5).

The analytics abstraction this entry originally nominated is **not
constructible**: dependency register item 18 — acceptance that individuals are
not tracked — is classified **Blocking**, and R20.1 is unambiguous about a
blocking dependency: do not begin the affected work. Measurement also does not
appear in R8.3's list of Stage 0 contents. It is deferred to the dependency,
not to convenience.

---

## Milestone 0.6 — The negative inventory

**Stage** 0, the substrate · **Kind** Construction · **Status** complete ·
**Blueprint reference** MIB §8.3 (Stage 0 contents), §10 (how a component
enters), §14 (components that must never be built), R10.3 (the inventory is
closed), R10.5 (extracted from need, never anticipated), R21.3

### Why this package exists

R10.3 states that a component not listed at §11, §12 or §13 does not exist, and
R10.6 gives the negative inventory equal weight. Neither statement was true of
this codebase: twenty of the twenty-two rows at R14.1 had a working
implementation, exported from a barrel, imported by surfaces.

R14.3 says a request for any of them is answered with the row rather than with
a discussion — but a row cannot answer a request for something the tree already
provides. **The rule and the repository disagreed, and the repository was
wrong.** Every surface built in Stages 1 to 3 would have composed from it.

R21.3 supplies the order: the cheapest thing to deliver is the thing that was
never built, and the negative inventory is removed before anything is optimised
or added.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| **The inventory is closed** — a component not at §11, §12 or §13 does not exist | MIB R10.3 | Fourteen directories and files removed; the `@/components/ui` barrel now exports nine folders, all of them inventory entries |
| Card, panel, tile, well, bordered callout, quote box, feature box, **stat box** | R14.1 · VDS §16.4, §36 | `components/cards/` (7 files), `ui/card/`, and the box drawn around the empty state, the error state and the enquiry confirmation |
| **Card grid, three-up or four-up equal rows** | R14.1 · VDS §26.2, §36.1 | Nine grids across seven surfaces became lists. `grid-cols-3` and `grid-cols-4` return zero on every route |
| Badge, tag, pill, chip | R14.1 · VDS §39.3 | `ui/badge/`, `ui/chip/`; the machine's applications are a record, the product's category is its heading |
| Tooltips carrying meaning | R14.1 · VDS §41 | `ui/tooltip/` |
| **Skeleton screen, indeterminate spinner**, progress bar on reading | R14.1 · VDS §38.4, §41 · Motion M11 | `ui/skeleton/`, `ui/loading/spinner.tsx`; the Suspense fallback on Enquiry is `null`, and the submit control states the wait in the words it already had |
| **Lightbox, image zoom, gallery slideshow** | R14.1 · VDS §40.3 · UX R23.5 | `gallery/lightbox.tsx`, `gallery/product-gallery.tsx` — 490 lines of pointer-tracked magnification, wheel zoom, swipe and double-tap |
| **Breadcrumbs outside Products** | R14.1 · UX R38.4 · MIB R11.1 | `PageHero` derived a trail from `href` for every surface. Now the three Products levels pass one explicitly and nothing else has one |
| **Animated counter, statistic panel, enlarged figure** | R14.1 · Brand Bible §16.3 · VDS §12.1 | `StatsBand` and the `stats` content shape; the counting `animate` flag went with them |
| **Recommendation, related-products rail, recently-viewed** | R14.1 · UX X15, R46.9, R46.10 | The section on the product record, `getRelatedProducts`, and its assertion in `check:content` |
| Autoplaying video, background loop, hero video with text over it | R14.1 · Motion M3, M15 | `components/video/` — a click-to-play YouTube and local player, in the inventory nowhere |
| Reading-time estimates | VDS §41 — the reader decides (Brand Bible P4) | Removed from the Journal index, the article masthead, the model, the loader and the utility |
| **A date-led, feed-like index** implying a schedule | UX R24.5 | The Journal lists by what an article is about |
| Components are extracted from need, **never anticipated** | MIB R10.5 | `ui/modal/`, `ui/aspect-ratio/`, `components/timeline/`, `components/icons/` — four subsystems with no remaining consumer. The Dialog is in the inventory for "almost never"; it is built when that day arrives |
| A control the visitor cannot use is **not shown dimmed** | VDS §38.5 | The button's disabled appearance is gone. `disabled` survives only to stop an enquiry sending twice (UX R47.2) |
| A gating dependency never becomes an invention | MIB R20.4 · R20.2 items 7, 8, 9 | The certification block on Quality and the country block on Export went with their cards rather than being re-rendered plainly — the facts behind them are unconfirmed. Machine capacity is likewise withheld from the Technology index |
| Copy is not the build's to write | MIB R6.4 | No sentence was authored. Every list renders content that already existed |

### Architecture decisions

**1. Nothing was added to the inventory.** Six surfaces lost a card listing and
each now renders a plain `<ul>` of linked records inline. A shared `RecordList`
was the obvious extraction and was rejected: R10.3 closes the inventory, and
the component that belongs there is the **Sibling index** (R11.1) with a scope
of three surfaces — designing it is the next package's work, not a removal
package's. The duplication is six near-identical blocks in surfaces that Stages
1 to 3 rebuild anyway.

**2. A gated fact is removed with its container, not re-rendered.** The
temptation on Quality and Export was to keep the certification and country
sections and drop only the box. R20.2 items 7 and 8 classify both as gating and
state the response: no marks appear, no markets are named. Rendering an
unconfirmed fact in plainer markup is still publishing it.

**3. The dead content shapes went with the dead renderers.** `stats`,
`features` and `milestones` were removed from the page-blocks schema and from
the five company documents that carried them. A content shape whose only
renderer cannot exist is an invitation to rebuild the renderer — and the schema
is strict, so `check:content` refused the orphaned frontmatter rather than
letting it rot silently.

**4. The wait is the words the control already had.** `SubmitButton` had a
`submittingLabel` prop that the spinner was covering up. VDS §38.4 asks for the
state in words; the words were already there and unused.

### Files removed

| Removed | Lines | Rule |
| --- | --- | --- |
| `src/components/cards/` (7 files) | 704 | R14.1 · VDS §36 |
| `src/components/gallery/product-gallery.tsx` | 268 | R14.1 · VDS §40.3 |
| `src/components/gallery/lightbox.tsx` | 222 | R14.1 · UX R23.5 |
| `src/components/video/` | 176 | R14.1 · Motion M3, M15 |
| `src/components/ui/modal/` | 143 | R10.5 |
| `src/components/timeline/` | 130 | R10.3 |
| `src/components/ui/card/` | 118 | R14.1 |
| `src/components/icons/` | 82 | R10.3 — no consumer once the stat and feature grids went |
| `ui/chip/`, `ui/badge/`, `ui/tooltip/`, `ui/skeleton/`, `ui/aspect-ratio/`, `ui/loading/spinner.tsx` | 122 | R14.1 |
| **Total** | **1,965 across 30 files** | |

`ui/pagination/`, `ui/breadcrumb/` and `accordion/` were examined and retained —
all three are inventory entries at R13.1 and R11.1.

### Files modified

| File | Change |
| --- | --- |
| `src/components/ui/index.ts` | The barrel is now nine inventory entries and a note on why it is closed |
| `src/components/gallery/gallery.tsx` | The viewer is gone; the set no longer hydrates |
| `src/components/ui/button/button.tsx` | `loading`, `loadingLabel` and the disabled appearance removed |
| `src/components/forms/submit-button.tsx` | States the wait in words |
| `src/components/sections/page-blocks.tsx` | `StatsBand`, `FeatureGrid`, `Milestones` and `PageBlocks` removed; `ProcessSteps` is a list rather than a bordered grid |
| `src/components/sections/page-hero.tsx` | Stops deriving a breadcrumb; the `href` prop is gone, from here and from ten call sites |
| `ui/loading/empty-state.tsx`, `feedback/error-state.tsx`, `forms/contact-form.tsx` | The state notice is a statement, not a box |
| `src/models/blocks.ts`, `src/types/*`, `src/lib/content/{catalog,pages}.ts`, `src/utils/format.ts` | The removed shapes, the related-products loader and the reading-time derivation |
| 13 route files under `src/app/` | Card listings became record lists; gated blocks removed |
| 5 documents under `src/content/company/` | Dead frontmatter keys |
| `scripts/check-content.ts` | The related-products and reading-time assertions removed with what they asserted |

### Dependencies

None added, none removed. `lucide-react` is still used by the four icon roles at
R13.1 and by the forms; reducing the icon set to those four is recorded below.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — all 34 routes still prerender
npm run check:publication -- --selftest   ✓ 13 gates still refuse what they must
npm run check:publication                 ✗ 10 of 13 refuse, 240 findings (was 247)
```

Measured in the running application, across seventeen routes:

| Check | Before | After |
| --- | --- | --- |
| `grid-cols-3` / `grid-cols-4` in the document | present on 8 routes | **0 on every route** |
| `<nav aria-label="Breadcrumb">` | 14 routes | **3 — the Products levels only** |
| `rounded-card` / `rounded-badge` (dead classnames from the removed set) | 6 files | **0** |
| `<dialog>` elements | 2 | **0** |
| `Primary` landmarks | 1 | 1 — unchanged |
| Console errors | none | none |

Two deviations were found by that verification and fixed before presenting:
`PageHero` was deriving a breadcrumb for every surface from its `href`, which
put a second navigation on eleven routes that R11.1 scopes to Products; and the
home surface's "Shipped to" block was a three-up grid of place names set at
display scale, which is the equal row at R14.1 and the enlarged figure at
VDS §12.1.

### Technical metrics

| Metric | Value |
| --- | --- |
| Files deleted | 30 |
| Files modified | 32 |
| Files added | 0 |
| Lines removed from the component layer | **1,965** |
| Rows of R14.1 with a working implementation | **20 → 0** |
| Client components across the app | **17 → 10** |
| Dependencies added / removed | 0 / 0 |
| Publication findings | 247 → **240** |
| Bundle impact | Not measurable as a figure — this Next version prints no per-route sizes and no baseline exists. Directionally: seven client components were removed, including a 268-line pointer-and-wheel zoom viewer and a focus-trapping dialog, and the gallery no longer ships JavaScript at all |
| Performance impact | **Not measured.** No before/after profile was taken |
| Accessibility impact | Measured and specific: eleven routes lost a duplicate navigation landmark; the enquiry no longer renders a skeleton that assistive technology had to be told to ignore. No automated audit was run, so no score is claimed |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| The icon set is not yet the four at R13.1 (index/close, plus/minus, external, arrow). `ui/icon` is the Mark component and stays; the decorative glyphs in the forms, the hero and Contact do not | MIB R13.1 · VDS §43.3 | The positive-inventory package |
| Form fields are boxed; VDS §38.3 specifies a labelled field with a hairline beneath | VDS §38.3 | The positive-inventory package |
| Six surfaces carry a near-identical inline record list. The Sibling index (R11.1) replaces three of them | MIB R11.1 | The positive-inventory package |
| The ten state behaviours are not built as a set; `EmptyState` and `ErrorState` exist, the other eight do not | UX §47 · MIB R13.1 | The state-behaviours package |
| `getProductsMegaMenu` still exists in the content layer with no consumer | MIB R10.3 | The positive-inventory package |
| Technology's prose still says each entry lists "what it is capable of in a shift"; capacity is withheld | MIB R20.2 item 9 · R6.4 | Integration — copy |
| Two enquiry routes still resolve — `/contact` and `/buyer-enquiry` | UX R25.2, R39.5 | Routing milestone |
| The Journal is served at `/blog`; no `/legal` index surface | UX R24.1, R26.1, R29.2 | Routing milestone |
| Registration identifiers absent from the company record | VDS §37.2 · Brand Bible §19 | Integration — client |
| `CtaBanner` still appears on ten surfaces | UX R39.3 | Stage 2 |
| **14** files carry literal design values | VDS §48.3 | Stage 2 |

### What this package unlocked

The inventory is now closed in fact and not only on paper. A surface built from
here cannot reach for a card, a badge, a tab, a lightbox, a stat panel or a
skeleton, because none of them is importable — and R14.3's answer to a request
for one is now a row in a document rather than an argument about a file that
already exists. The positive half of Part IV can be built against a tree that
contains only what the inventory names.

### Why the next package follows

**The positive component inventory — MIB §11, §12 and §13 — is what remains of
Stage 0's shared component set**, and it is now the only thing standing between
the substrate and Stage 1. R8.5 puts it before the surfaces that compose from
it, and the removal it depended on is done.

Within it the order is fixed by R11.2: **the chapter is the most important
component in the inventory and the one most likely to be built wrongly**,
because every content system encourages it to be built as a generic section. It
is not generic — one of ten named things, fixed in an order, told whole or not
at all, and it must make sense alone. Home and Manufacturing are composed of
chapters, so nothing in Stage 1 can start before it exists.

It is constructible today: the chapter set is fixed by the Documentary
Storyboard, and the component is a container. What it carries — photographs,
copy, confirmed facts — is gated, and the chapter is **absent rather than
partial** where the evidence does not exist (R11.1), which is behaviour the
component must implement rather than wait for.

---

## Milestone 0.7 — The positive component inventory

**Stage** 0, the substrate · **Kind** Construction · **Status** complete ·
**Blueprint reference** MIB §8.3 (Stage 0 contents), §10 (how a component
enters), §11 (structural), §12 (evidence and record), §13 (action, disclosure
and system), R8.5, R10.3 · VDS §34.2 (the six element types)

### Why this package exists

R8.3 lists *the shared component set at Part IV* among Stage 0's contents, and
after the negative inventory it was the only substrate left. R8.5 puts it
before every surface that composes from it.

The package also found a fault that changed its shape. The design value source
built in Package 002 was **reaching nothing**: `Typography` emitted
`text-display`, `text-h1`, `text-body`; `Container` emitted `max-w-content`;
`Section` emitted `py-24`. None of those names exists in `globals.css` — the
token source declares `--text-*: initial` and then the seven ranks of VDS §9.2.
Measured on `/manufacturing` before this package: **every heading on the site
rendered at 17.3px in the sans**. The type scale, the containers and the space
ranks were all unreachable, so the constitution's numbers were in the file and
not on the screen.

That is what "derived from the constitution, not from a generic UI library" had
to mean here: the primitives were rebuilt as the six element types VDS §34.2
names, reading the source Package 002 wrote.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| **Six element types exist. Nothing is a seventh thing** | VDS §34.2 | `Statement`, `Passage`, `Record`, `ContentImage`, `Action`, `Mark` — one component per type, and the barrel is organised by type |
| **The two voices have no shared territory** | VDS §8.4 | The voice is not a prop. `Statement` is serif and cannot be sans; `Passage` and `Record` are sans and cannot be serif. A `variant` prop would have let a caller set a statement in the record voice |
| Seven ranks: D T1 T2 T3 B R C | VDS §9.2 | The `rank` prop, drawn from `--text-*`. Measured: T1 45.25px at 1280, 30px at 390; T2 30.47 / 22; B 17.84 |
| **T3 is not available below 720px** | VDS §9.4 | Expressed in the component (`text-t2 reading:text-t3`), not left to a caller |
| There is no bold serif | VDS §8.5 | `Statement` has no weight prop |
| Measure 60–72 characters, target 66 | VDS §10.1 | `Passage` carries `max-w-reading`. Measured at 640px |
| **There is no "narrow / medium / wide" set of widths** | VDS §27.2 | `Container`'s four sizes replaced by `Field`'s four **types** — reading, paired, full, record, plus bleed. A caller chooses what the field is for; the width follows |
| Three break sizes: section 96/64, chapter 192/96, held ≥1vh | VDS §23.1 | S5, S6, S7 — the token source already encoded them. Measured: chapter break 177px at 1280 |
| **The texture threshold is zero** | VDS §14.5 | Six textured bands removed. A simulated material is a false claim about matter from a company that makes the real one |
| **One action for the entire site, wording fixed** | UX R39.1, R39.8 · MIB R13.2 | `Action` accepts no label, no href, no variant and no size. R13.2: "making that configurable is how five variants appear by launch" |
| There is no secondary button, and no outlined, ghost, tinted or text button | VDS §35.2 | `buttonVariants` is gone. A lesser action is a `TextLink`; a next step is a `Continuation` |
| A solid Ink rectangle, radius 0, 48px, 24px padding, fits its label | VDS §35.2 | Measured: `rgb(28,26,23)` / 48px / radius 0 |
| **Four icons exist, and the list is closed** | VDS §43.3 | `Mark` draws index/close, plus/minus, external, arrow — line only, butt caps, miter joins, cap-height sized (§43.4). **`lucide-react` is no longer a dependency**: §43.1's second argument is Ownership, and a bought icon set fails the Factory Test on sight |
| The image record is not optional metadata | MIB R12.2 | `EditorialImage` renders the caption with the frame. There is no way to publish an evidential photograph without its record |
| **The photograph exists, then the claim is written to it** | MIB R12.3 | `EvidenceBlock` requires `photograph` and makes `claim` optional. Where the proof does not exist the claim goes with it — the component returns nothing |
| Equal treatment of images is correct **only** for an E3 set | VDS §31.1 | `EvidenceSet` refuses fewer than three frames and caps at five |
| A hairline between rows; no vertical rules, no outer border, no zebra | VDS §39.1 | Measured: bottom rule 0.8px, left rule 0px, row height 49px |
| A chapter is one of ten named things, in a fixed order, told whole or not at all | MIB R11.2 · Storyboard §7, §25.1 | `CHAPTERS` is the canonical set as a closed type; `Chapter` renders nothing with no children — absent, never partial |
| The permitted chapter openings are five, and the list is closed | VDS §23.5 | `ChapterOpening` is that union. There is no "heading" member: Creative Direction Book §22.1 calls it the announced opening and rejects it by name |
| The held moment: one element or none, **zero** persistent elements, ≥1vh | VDS §23.4 · MIB R11.3 | `HeldMoment` takes at most one element. Measured at 900px against a 900px viewport |
| A field is a hairline underneath only; **no placeholder** | VDS §38.3 | `placeholder` is removed from the type of `Input` and `Textarea`, so it cannot be passed. Measured: 48px, top border 0, bottom 0.8px, radius 0, transparent |
| Every field required unless marked "optional" **in words** | VDS §38.3 | The asterisk is gone; the exception carries a word at rank C |
| A state is a fact, stated plainly; no state carries the action except Success | UX R47.1, R47.4, R47.5 | `StateNotice` covers all ten states and cannot accept an `Action`. Its only outbound route is the direct one to a person |
| Breadcrumbs: Products only | MIB R11.1 · UX R38.4 | Unchanged from Package 006; the separator is now a solidus rather than a fifth glyph |
| Copy is not the build's to write | MIB R6.4 | Every component takes its words from the surface or the content layer. The one exception is `SITE_ACTION_LABEL`, which R39.1 states and R13.2 requires to be un-configurable |

### Architecture decisions

**1. The voice is not a prop.** The strongest thing this package does is make
§8.4 unbreakable. A single `Typography` component with a free `variant` lets a
caller set a statement in the sans, and no review catches that reliably. Three
components — `Statement`, `Passage`, `Record` — mean the only decision a caller
makes is which element type they are writing, and the voice follows from it.

**2. `Field` replaces `Container`, and the difference is not cosmetic.** §27.2
is explicit that no t-shirt-size set of widths exists in this system. The four
field types at §29.2 are what a surface is built from, and each carries a
purpose rather than a measurement.

**3. `Action` has no props.** R13.2 asks for exactly this and gives the reason.
The label lives in one constant; `SubmitButton` shares its form through
`actionClassName`, because on Enquiry the form *is* the action (R39.3).

**4. `CtaBanner` is gone, and `Close` replaced it.** The banner carried a
heading, a description, an eyebrow, a primary action, a **secondary** action, a
background photograph, an aside and three "reassurance" lines. §35.2 removes
the second action, §23.6 removes the tinted band, §33.1 removes the background
photograph, and Brand Bible §16.4 removes the reassurances. `Close` is a
statement and one action, and the five surfaces R39.3 forbids it on do not
import it.

**5. The four marks are drawn, not imported.** §43.1's second argument is about
Ownership rather than style: icon sets are bought, and every library available
to us is available to every competitor. Drawing four paths removed a dependency
and is the only honest reading of that paragraph.

**6. Home was rebuilt as a substrate pass, not as the Home surface.** R51A.1
puts Home in Priority 1 and R16.2 requires it to produce Recognition alone,
which needs photography and authored copy — neither of which exists. What this
does is remove every element the inventory does not contain, so that Home is
built from parts when it is built.

### Files created

| File | Responsibility |
| --- | --- |
| `src/components/ui/field/field.tsx` | The four field types, the reading column, the paired field (§29.2) |
| `src/components/ui/action/action.tsx` | `Action`, `TextLink`, `Continuation` (§35, §39) |
| `src/components/evidence/editorial-image.tsx` | `EditorialImage` with its mandatory record; `EvidenceSet` (§12.1) |
| `src/components/evidence/evidence-block.tsx` | `EvidenceBlock`, `RecordSet` — the record row that replaces the card (§12.1, §36.2) |
| `src/components/evidence/records.tsx` | `SpecificationList`, `SpecificationTable`, `PullQuote`, `LimitStatement` (§39, §12.4) |
| `src/components/structure/chapter.tsx` | `Chapter`, the canonical chapter set, the five permitted openings (§11.1) |
| `src/components/structure/held-moment.tsx` | `HeldMoment` (§23.4, R11.3) |
| `src/components/structure/sibling-index.tsx` | `SiblingIndex` (§11.1, R37.8) |
| `src/components/structure/opening.tsx` | The chapter opening applied to a surface's start |
| `src/components/structure/close.tsx` | Where the surface's one action lives |
| `src/components/system/state-notice.tsx` | `StateNotice`, the ten states (§13.1, UX §47) |

### Files rewritten

`ui/typography` (three element types), `ui/section` (break ranks and tones),
`ui/icon` (four drawn marks), `ui/breadcrumb`, `ui/pagination`,
`sections/{section-header, prose, page-blocks}`, `accordion`, `common/logo`,
`forms/{field, controls, file-upload, phone-input, submit-button, contact-form,
buyer-enquiry-form}`, `lib/mdx/components.tsx`, `lib/cn.ts`,
`models/{home, product}.ts`, and **every one of the 19 route files**.

### Files removed

| Removed | Rule |
| --- | --- |
| `src/components/ui/container/` | VDS §27.2 — there is no narrow / medium / wide set |
| `src/components/ui/button/` | VDS §35.2 — no secondary, outlined, ghost, tinted or text button |
| `src/components/ui/divider/` | MIB R10.3 — not in the inventory; §16.4 has two marks and neither is a rule |
| `src/components/ui/loading/` | Superseded by `StateNotice` (§13.1) |
| `src/components/feedback/` | Superseded by `StateNotice` |
| `src/components/hero/` | VDS §33.1 — text never sits on a photograph |
| `src/components/layout/cta-banner/` | VDS §35.2, §23.6, §33.1 · Brand Bible §16.4 |
| `src/components/sections/{page-hero, editorial-spread, full-bleed-image}.tsx` | Superseded by `Opening`, `EvidenceBlock`, `EditorialImage` |

### Dependencies

**`lucide-react` removed** (VDS §43.1). Nothing added. Sixteen production
dependencies remain, none of them a UI library.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with two new assertions
npm run build                             ✓ green — all 34 routes still prerender
npm run check:publication -- --selftest   ✓ 14 checks, including a new one
npm run check:publication                 ✗ 9 of 13 refuse, 228 findings (was 240)
```

Measured in the running application:

| Check | Before | After | Required |
| --- | --- | --- | --- |
| `h1` size at 1280px | **17.3px, sans** | **45.25px, serif** | T1 interpolated, serif (§9.2, §8.4) |
| `h2` size at 1280px | 17.3px | **30.47px** | T2 (§9.2) |
| `h1` size at 390px | 17.3px | **30.0px** | T1 small (§9.2) |
| Body size and face | 17.3px, sans | 17.84px, sans | B (§9.2) |
| Passage measure | none | **640px** | The reading column (§10.1) |
| Chapter break at 1280px | 96px, typed | **177px** | S6 interpolated (§23.1) |
| Held moment height | — | **900px** at a 900px viewport | ≥ 1vh (§23.4) |
| Action: fill / height / radius | — | `rgb(28,26,23)` / **48px** / **0px** | §35.2 |
| Field: height / borders / radius | boxed | **48px** / top 0, bottom 0.8px / **0px** | §38.3 |
| Placeholders in the enquiry form | 11 | **0** | §38.3 |
| Table cell: bottom / left rule | — | 0.8px / **0px**, row 49px | §39.1 |
| Actions per surface | — | Home 1 · About 1 · Quality 1 · Export 1 · Products 1 · **Technology 0 · Gallery 0 · Journal 0 · legal 0** | R39.3 |
| `h1` per surface | 1 | 1, on all 12 routes checked | one h1 |
| Stale token classnames in the document | present | **0 on all 12 routes** | §48.3 |
| Client components | 10 | **9** | — |

Three defects were found by that verification and fixed before presenting:

1. **`cn()` was silently dropping the record rank.** `lib/cn.ts` still declared
   the pre-Package-002 scale names, so tailwind-merge read `text-r` and
   `text-ink` as conflicting `text-*` utilities and dropped the first. Records
   were rendering at body size — not a styling slip but a hierarchy error, since
   §9.2 says R "is a different job, not a lower rank".
2. **The specification table drew no row hairline.** The border sat on the row
   element; it is now on the cells, where it lands regardless of the border
   model.
3. **Placeholders survived the first pass.** Removing them from eleven call
   sites is not enforcement; `placeholder` is now absent from the control's own
   type.

### One gate was corrected

The Value gate counted **comments**. MIB R3.4 requires the derivation to be
recorded where the work is, so a component implementing "height 48px, from 14px
vertical padding on a 20px line box" cites those numbers beside the code — and
the gate was refusing exactly the traceability the same document demands. It
now strips line and block comments before scanning; string literals are
untouched, so a colour in a `className` is caught as before. A self-test case
was added, and the Value gate's file count fell from **14 to 3** without the
rule weakening.

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 11 |
| Files rewritten | 30, including all 19 routes |
| Files deleted | 15, across 8 directories |
| Dependencies removed | **1** (`lucide-react`) |
| Inventory entries with an implementation | **§11: 9 of 10 · §12: 9 of 18 · §13: 10 of 13** |
| Publication gates passing | 3 → **4** (Action) |
| Publication findings | 240 → **228** |
| Value gate: files carrying stray values | 14 → **3** |
| Client components | 10 → **9** |
| Bundle impact | Not measurable as a figure — this Next version prints no per-route sizes. Directionally: an icon library left the dependency tree and four inline SVG paths replaced it |
| Performance impact | **Not measured.** No before/after profile was taken |
| Accessibility impact | Measured: labels are always visible on all 12 enquiry fields and no field carries a placeholder (§38.3); the action and every field clear 48px against the 44px minimum (§47.5); one `h1` per surface on all 12 routes checked. No automated audit was run, so no score is claimed |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| Nine §12 entries are unimplemented: certification, country, machine, testimony, journal entry, journal index item, product record, category record, process chapter. Six are Facts-Register gated; the rest are surface-shaped and are built with the surfaces that carry them (R10.5 — extracted from need) | MIB §12.1 · R20.2 | Stages 1–3 |
| `Dialog` and `Search` are deliberately not built — "almost never", and "the default is not to exist" (R13.4) | MIB §13.1 | On need |
| §10.5's eight-paragraph rule is not checked. It is checkable against an MDX body | VDS §10.5 | Content engine |
| `imageSizes` and the gallery's `sizes` strings carry breakpoint pixels. A `sizes` attribute cannot read a CSS variable, so this one may be irreducible; `services/email.ts` carries ten colours for a medium with no CSS | VDS §48.3 | Review |
| The Action gate now reads nothing, because actions are no longer authored in content. Counting rendered actions per route needs a render-time audit | UX R39.3 | Stage 1 |
| Home, Manufacturing and every Priority 1–3 surface are composed but not **written**: no photography (§20.2 item 1), no authored copy (item 12) | MIB R6.4 · R20.2 | Stages 1–3 |
| Two enquiry routes still resolve; the Journal is served at `/blog`; there is no `/legal` index | UX R25.2, R24.1, R26.1 | Routing milestone |
| Registration identifiers absent from the company record | VDS §37.2 | Integration — client |

### What this package unlocked

**Stage 0 is complete.** The substrate is a design value source that reaches the
screen, a content engine, publication gates, navigation, a footer record, and a
closed component inventory whose positive half now exists. Every surface in
Stages 1 to 3 is composed from these parts and cannot introduce others without
an amendment.

The measurable form of that: before this package the constitution's type scale,
containers and space ranks were unreachable from any component. After it, every
number on the screen is traceable to a rule.

### Why the next package follows

**Stage 1 — the shortest complete telling: Home, Manufacturing, Enquiry**
(MIB R8.3, UX R51A.1, R51A.2). It is the minimum set that runs Brand Bible
§8.3's assignment for this medium: arrival through conversation, with
Recognition present. Remove any one and the medium stops carrying the sequence
it is assigned.

Two things about it must be separated, and they are not the same:

- **Stage 1 can be constructed.** The chapter component exists, the chapter set
  is fixed, and the surfaces are compositions of parts that are all present.
- **Stage 1 cannot be started.** Dependency 1 — access to a working shift — is
  **Blocking** for the photography library, and dependency 12 — authored copy —
  is **Blocking per surface**. R20.1: do not begin the affected work.

R8.7 and R51A.8 both say the same thing: **the order governs surfaces; the
library governs what can be told, and the library wins.** So the honest next
step is not a construction package. It is R20.3, which is unambiguous about
where this project's effort belongs:

> Dependency 1 is the root. Items 4, 5, 6, 15 and 19 all descend from it, and so
> does most of the site's evidence. **It should be pursued before anything else
> in this project, including design work.**

The recommendation is to open the **Integration** track: access to a working
shift, and the copy commission under Brand Bible §11–§12.

If a construction package must run in parallel, the only one left that is
neither blocked nor a surface is the **routing milestone** — merging the two
enquiry doors (R25.2, R39.5), renaming the Journal with the old address still
resolving (R24.1, R29.2), and adding the `/legal` index (R26.1). R51A.9
requires the two contact routes to merge **before Priority 1 ships**, so that
work has to happen regardless and waits on no client dependency.

---

## Milestone 0.8 — Routing: the collisions at §52.3

**Stage** 0, the substrate · **Kind** Construction · **Status** complete ·
**Blueprint reference** MIB R8.8 (collisions resolved before the surfaces they
affect) · UX §52.3 (known collisions), R51A.9, R25.2, R29.2, R24.1, R26.1

### Why this package exists

Stage 1 cannot begin: dependency 1 (access to a working shift) and dependency
12 (authored copy) are both **Blocking**, and R20.1 says do not begin the
affected work. R51A.9 names what must happen anyway, and names the deadline:

> **The collisions are resolved before the surfaces they affect are built.**
> Specifically: the two contact routes merge **before Priority 1 ships**; the
> machine `REGISTER` fields are withheld before Priority 2 ships; the Journal
> naming is settled before Priority 3 ships. Resolving a collision after a
> surface is built means building it twice.

Three of §52.3's rows are routing, and none of them waits on a client
dependency. R8.8 restates the rule from the build side. This was the only
unblocked construction work left in Stage 0.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| **There is one enquiry surface, not two** | UX R25.2 · §52.3 · Brand Bible §3.4 | `/contact` and `/buyer-enquiry` became `/enquiry`. One surface, one form, one endpoint |
| The single surface carries **both** the form and the direct means of contact | UX R25.2 | The address, the email and the telephone sit in the enquiry surface's own field |
| A direct route always exists **beside** the form | UX R25.3 | Beside it, not below it and not behind a link: "requiring it is friction moved onto the visitor" |
| Two names for one door is two doors | UX R39.5 | `contactFormSchema`, `ContactForm` and `/api/contact` removed. One schema, one form, one endpoint |
| **Addresses are permanent** | UX R29.2 | Four permanent (308) redirects in the build config, asserted in `check:content`. Verified live: every retired address resolves |
| The editorial surface is the **Journal**, not a blog | UX R24.1 · §52.3 · Creative Direction Book §20 | `/blog` → `/journal`, and the word is gone from the codebase: route, content directory, asset directory, model, schema, loaders, types |
| The record is an **Article** | UX R45.1 | `BlogPost` → `Article` throughout. §45.1 names the model; the code now uses its name |
| The legal set is 404, privacy, terms (if required) and **the legal identity record** | UX R26.1 | `/legal` exists as an index and carries the identity record |
| A legal surface is a record, in the record voice | UX R26.3 | Record ranks throughout; no statement above T2, no marketing copy |
| **No system surface carries the site's action** | UX R26.5 · R39.3 | `/legal` and `/legal/[slug]` import no `Close`. Measured: 0 actions |
| Anything unconfirmed is removed, not softened | Brand Bible §19.2 · MIB §20.2 item 2 | The registration identifiers are **absent**, not blank fields. A labelled field with nothing in it claims something exists and is being withheld |
| The footer index carries every surface | UX R37.9 · R26.1 | `/enquiry` and `/legal` are in the index; the retired addresses are in nothing |

### Architecture decisions

**1. The merged door is `/enquiry`, not either of the two it replaces.** The
document calls the surface Enquiry (§25), the footer index has labelled it
"Enquiry" since Package 005, and both alternatives carry something the rules
reject: `/contact` is the register R25.2 collapses, and `/buyer-enquiry`
qualifies a door that R39.1 says has one name. R29.2 makes minting the correct
address safe — the two old ones resolve permanently and are never removed.

**2. Redirects live in the build config, not in route files.** Four rules in
one table is the smallest expression, it is checked before the filesystem, and
it is a single place a future edit would have to delete — which is what
`check:content` now asserts against.

**3. `permanent: true`, deliberately.** A 307 tells a browser and a search
engine that the move may be undone. R29.2 says the opposite about this system's
addresses.

**4. The Journal rename went all the way through.** Renaming the route and
leaving `getBlogPosts`, `BlogPost` and `src/content/blog` in place would have
left the rejected register in the codebase and a second vocabulary for one
thing (MIB R7.1). The content directory is the source of truth for routing
(folder-derived hierarchy), so it moved too.

**5. The legal index states the identity it has and nothing more.** Dependency
2 is Blocking for the legal record. The surface exists, is reachable, and is
honest about what is not yet confirmed — which R51A.6 requires at launch and
§19.2 requires always.

### Files created

| File | Responsibility |
| --- | --- |
| `src/app/legal/page.tsx` | The legal index and the identity record (R26.1) |
| `src/components/forms/confirmation.tsx` | `SuccessPanel` and `FormError`, lifted out of the deleted contact form — they belong to the surface's states, not to a form |

### Files moved

| From | To | Rule |
| --- | --- | --- |
| `src/app/buyer-enquiry/` | `src/app/enquiry/` | R25.2 |
| `src/app/api/buyer-enquiry/` | `src/app/api/enquiry/` | R39.5 |
| `src/components/forms/buyer-enquiry-form.tsx` | `.../enquiry-form.tsx` | R25.2 |
| `src/app/blog/` | `src/app/journal/` | R24.1 |
| `src/content/blog/` | `src/content/journal/` | R24.1 |
| `public/images/blog/` | `public/images/journal/` | R24.1 |
| `src/models/blog.ts` | `src/models/article.ts` | R45.1 |

### Files removed

| Removed | Rule |
| --- | --- |
| `src/app/contact/` | UX R25.2 — one door |
| `src/app/api/contact/` | UX R39.5 — one endpoint |
| `src/components/forms/contact-form.tsx` | UX R25.2 |
| `contactFormSchema`, `ContactFormValues` | UX R25.2 — a second form model is a second door one layer down |

### Files modified

`next.config.ts` (the redirect table), `src/constants/routes.ts`,
`src/config/navigation.ts`, `src/app/sitemap.ts`, `src/app/enquiry/page.tsx`
(rewritten as the merged surface), `src/components/forms/{index,enquiry-form}.ts(x)`,
`src/models/forms.ts`, `src/components/system/state-notice.tsx`, and the
seventeen files carrying `blog`/`BlogPost` identifiers across the content
engine, the SEO layer, the models and the type barrels.

### Dependencies

None added, none removed.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with 11 new assertions
npm run build                             ✓ green — 34 routes, `/api/enquiry` the only dynamic one
npm run check:publication -- --selftest   ✓ the gates refuse what they must
npm run check:publication                 ✗ 9 of 13 refuse, 228 findings — unchanged
```

Measured against the running application:

| Retired address | Status | Resolves to | Rule |
| --- | --- | --- | --- |
| `/contact` | **308** | `/enquiry` | R25.2, R29.2 |
| `/buyer-enquiry` | **308** | `/enquiry` | R25.2, R29.2 |
| `/blog` | **308** | `/journal` | R24.1, R29.2 |
| `/blog/choosing-full-grain-leather` | **308** | `/journal/choosing-full-grain-leather` | R24.1, R29.2 |

| Check | Result | Required |
| --- | --- | --- |
| Links to a retired address, across 12 routes | **0** | Nothing points at a redirect (R38.1) |
| Enquiry: forms · mailto · telephone · address | **1 · 1 · 1 · 1** | One door, with the direct route beside it (R25.2, R25.3) |
| Actions on Home · Manufacturing · Products · Products category · Product record · Quality · Export · About | **1 each** | R39.3 |
| Actions on Technology · Gallery · Journal · Enquiry · `/legal` · `/legal/[slug]` | **0 each** | R39.3, R26.5 |
| `h1` per surface, across 14 routes | **1** | one h1 |
| Legal index: identity stated · documents listed · registration identifiers | **yes · 1 · absent** | R26.1, Brand Bible §19.2 |
| Footer index entries | **11** — every surface, including `/enquiry` and `/legal` | R37.9 |

One deviation was found by that verification and corrected: the first action
count read 1 on **every** surface including Technology and Gallery. The
selector was matching the layout's skip link, whose focus styles contain
`bg-ink`. Re-measured against `main` with a word-boundary match, the counts are
exactly R39.3's table.

### The new assertions

`check:content` now fails if the routing regresses:

- the footer index carries `/enquiry` and `/legal` (R37.9, R26.1);
- exactly **one** enquiry door appears in the index (R25.2, R39.5);
- no navigation structure points at `/contact`, `/buyer-enquiry` or `/blog`;
- all four retired addresses are held open in the build config, to the right
  destination, and **permanently** (R29.2).

The last one reads `next.config.ts` rather than the network, because the
redirect table is the thing a future edit would delete.

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 2 |
| Directories moved | 7 |
| Files removed | 4 (two route directories, a form, a schema) |
| Files modified | 24 |
| Routes | 17 page files · 34 prerendered paths |
| Permanent redirects held open | **4** |
| New `check:content` assertions | 11 |
| Publication findings | 228 → **228**, unchanged |
| Dependencies | unchanged |
| Occurrences of "blog" in `src/` and `scripts/` | 77 → **0** |
| Bundle impact | Not measurable as a figure. Directionally: one form component, one schema and one API route left the build |
| Performance impact | **Not measured** |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| §52.3 row 3: machine records still publish `manufacturer`, `capacity`, `power`, country of origin and cutting force. R51A.9 requires these withheld **before Priority 2 ships** | UX R18.4, R43.4 · Brand Bible §19.4 | Content layer, before Stage 2 |
| §52.3 row 5: the FAQ record carries `topic`, but R45.2 makes **the surface it belongs to** mandatory and forbids a free-floating question | UX R45.2, R15.6 | Content layer |
| §52.3 row 4: the testimonials record is unpublishable until every entry carries all seven mandatory fields — the Testimony gate already refuses it | UX R44.4 | Integration — client |
| `getProductsMegaMenu` still exists with no consumer | MIB R10.3 | Content layer |
| Nine §12 inventory entries unimplemented; `Dialog` and `Search` deliberately unbuilt | MIB §12.1, R13.4 | Stages 1–3 |
| `imageSizes` and `services/email.ts` carry literal design values | VDS §48.3 | Review |
| The Action gate reads nothing at content level; per-route action counting needs a render-time audit — this package measured it by hand | UX R39.3 | Stage 1 |
| Registration identifiers absent from the company record | UX R26.1 · MIB §20.2 item 2 | Integration — client |

### What this package unlocked

**Every collision that would have forced a surface to be built twice is
resolved.** R51A.9's three deadlines: the enquiry merge is done well before
Priority 1, the Journal naming is done well before Priority 3, and only the
machine `REGISTER` withholding remains — due before Priority 2 and a content
edit rather than a build one.

Priority 1 can now be built against final addresses. Nothing in Home,
Manufacturing or Enquiry will need re-pointing when it is written.

### Why the next package follows

**Stage 0 is complete and every remaining construction package is blocked.**
The register now reads:

| Blocking dependency | Owner | What it blocks |
| --- | --- | --- |
| 1 — access to a working shift | Client | The entire photography library; Home, Manufacturing, Quality, Gallery at publication |
| 2 — confirmation of the company name | Client | Every surface; the legal record; the logotype |
| 12 — copy authored under Brand Bible §11–§12 | Client / copywriter | Every surface it belongs to |
| 13 — typeface licensing | Client | Stage 0 completion; every surface |
| 20 — the reply process, a named person who answers | Client | Enquiry |

R20.1: work does not begin on a Blocking dependency. R20.3 says where the effort
belongs and says it without qualification:

> Dependency 1 is the root. Items 4, 5, 6, 15 and 19 all descend from it, and so
> does most of the site's evidence. **It should be pursued before anything else
> in this project, including design work.**

The next package is therefore **Integration, not Construction**. In order:

1. **Access to a working shift** (dependency 1) — the root, and the one that
   unblocks five others.
2. **The company name, in writing** (dependency 2) — cheap, and it blocks the
   legal record this package just built the surface for.
3. **The copy commission** (dependency 12) — Home, Manufacturing and Enquiry
   are composed and unwritten.
4. **Typeface licensing** (dependency 13) — the two faces are specified and
   Calibrated; the site currently falls through to a system stack.
5. **The reply process** (dependency 20) — a form that submits into nothing is
   the most damaging possible failure of this brand's central promise.

R20.6: none of these is discharged verbally. Written confirmation, or the
dependency stands.

If work must continue in code while those are pursued, the only honest items
left are the two content-layer collisions above — the machine `REGISTER`
withholding (due before Priority 2) and the FAQ parent-surface field. Both are
small, and neither is a surface.

---

## Milestone 0.9 — The dependency register, as live state

**Stage** 0, the substrate · **Kind** Construction, serving the Integration
track · **Status** complete · **Blueprint reference** MIB §20 (R20.1 the three
classes, R20.2 the register, R20.3 the root, R20.5 currency, R20.6 written
discharge), §16 (R16.5 a finding reaches the person who can fix it), R7.1 (one
source of truth), R9.2 (a gate is tested by attempting to defeat it)

### Why this package exists

Milestone 0.8 closed with the correct conclusion — every remaining Construction
package is blocked, and R20.3 says where the effort belongs:

> Dependency 1 is the root. Items 4, 5, 6, 15 and 19 all descend from it, and so
> does most of the site's evidence. **It should be pursued before anything else
> in this project, including design work.**

The work that advances an Integration track is not a surface. It is the
apparatus that states, exactly and currently, what is being waited on, who owns
it, and what each item releases. Three things made that impossible:

**1. The register was prose, restated per milestone.** MIB §20.2 holds
twenty-one rows; each log entry since 0.1 has copied a subset of them into a
"what blocks the rest" table. R7.1 predicted the outcome and it had already
happened: **Milestone 0.1 recorded item 18 as discharged; Milestone 0.5
recorded the same item as Blocking and deferred work on its strength.** A rule
expressed twice is two rules, and one of them gets amended alone.

**2. R20.5 requires the register to be reviewed at every stage gate**, and
there was nothing to review — only a document nobody re-reads and a log entry
that ages the moment it is written.

**3. R20.6 was unenforceable.** *"The client confirmed on a call" is not a
Register classification.* Nothing in the code agreed: `classification:
"confirmed"` was one word, typed by anyone, with no source recorded. That is
precisely the failure Brand Bible §19.1 records — a fabricated audit body that
survived a full review because the source of a claim was not a required field.

This package answers all three, adds no surface, waits on no client, and is the
only remaining item that reduces the cost of every future one.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| Three classes, and the class decides whether work stops or continues | MIB R20.1 | `DependencyClass`; the report groups by it and prints the build behaviour §20.2 assigns to each |
| The register is twenty-one rows, with owner, class, what it blocks and what happens meanwhile | MIB R20.2 | `dependencies` in `src/lib/publication/dependencies.ts`, quoted from the table rather than re-derived |
| Dependencies are **reviewed at every stage gate**, and the register is kept current | MIB R20.5 | The review prints inside `check:publication`, beside the gates it explains, so the two cannot drift |
| **No dependency is discharged verbally** | MIB R20.6 · Brand Bible §19.3 | A `Discharge` requires the document *and* what it says. A verbal discharge is **not expressible** — the technique VDS §49 uses for a forbidden value |
| Only a confirmed fact may be published | Brand Bible §19.2 | Unchanged |
| …and only a confirmation with a written record behind it is a confirmation | MIB R20.6 | `isPublishable` now requires `confirmation`. `confirmed` with no document publishes nothing |
| A gate failure is stated to **the person who can fix it**, as what is missing | MIB R16.5 | Each refusing gate now prints the dependencies holding it and their owner; the summary partitions the findings into client-held and build-owned |
| A gating dependency never becomes an invention | MIB R20.4 | Nothing was reclassified to make a surface possible. Two rows were discharged and both name an approved document |
| The root is pursued first | MIB R20.3 | Printed in the report's closing line, so it is read on every run rather than remembered |
| Every builder has all eight documents | MIB §20.2 item 21 · R2.1 | `check:content` asserts all eight are in `docs/brand/` — the one dependency the build discharges itself, and can therefore prove |
| A gate is tested by trying to defeat it | MIB R9.2 | Five new self-test cases, including two that attempt exactly the R20.6 shortcut |

### The two discharges, and the disagreement they settle

R20.6's test is written confirmation. Applied without exception it discharges
three rows, and it is applied identically to each:

| # | Discharged by | Reading |
| --- | --- | --- |
| 17 | UX Blueprint v1.1 R37.2, approved | The five destinations are named in an approved document. `check:content` already asserts the build matches them |
| 18 | UX Blueprint v1.1 R53.2 items 9 and 11, approved | Both are approval-checklist lines in the same approved document, and the same argument that discharges 17 discharges 18 |
| 21 | `docs/brand/` in this repository | All eight documents are in the tree every builder clones, and a deletion now fails `check:content` |

**Milestone 0.5 read item 18 the other way** and deferred the analytics
abstraction on its strength. That deferral was correct for an independent
reason, which is why nothing is reopened: measurement is not among the Stage 0
contents at R8.3, and §50.3 forbids tracking regardless — item 18 is acceptance
of an absence the architecture already implements. The disagreement is recorded
here rather than silently resolved, and it is now impossible to repeat: there is
one place the classification lives.

Everything else stands. **Seven blocking, nine gating, two soft.**

### Architecture decisions

**1. The register is data, not documentation.** Prose cannot be asserted
against, cannot be partitioned by, and cannot fail a build when it goes stale.
Twenty-one rows of transcription buy a report that is correct by construction.

**2. The report lives inside `check:publication`, not in a new command.**
R20.5 ties the review to the stage gate, and the gate run *is* the stage gate.
A second command would be a second thing to remember, and the two would
disagree the first week (R7.1). The footer that previously said *"see MIB §20"*
— pointing at a document because there was nothing in code to point at — now
prints the register itself.

**3. The useful number is the partition, not the total.** 228 findings is not
actionable. **225 wait on an outstanding dependency; 3 are the build's own** —
and that second number is the only one a builder can act on today. It is
derived, so it moves on its own as dependencies discharge.

**4. A gate no dependency claims says so.** The Action and Value gates are
build-owned; the report states that rather than leaving the reader to infer it.
The self-test refuses a dependency that names a gate which does not exist, so
the mapping cannot rot when a gate is renamed.

**5. Dependency 3 reads the Facts Register rather than restating a count.** It
is discharged fact by fact, and the classifications already live in
`facts-register.ts`. The report prints the fourteen unconfirmed labels from
there — one source, and a confirmation shortens the list without an edit here.

### Files created

| File | Responsibility |
| --- | --- |
| `src/lib/publication/dependencies.ts` | MIB §20.2 as live state: twenty-one rows, their class, what each blocks, the gates each holds red, and the written discharge where one exists |

### Files modified

| File | Change |
| --- | --- |
| `src/lib/publication/facts-register.ts` | `Confirmation` added; `isPublishable` now requires a written record as well as the classification |
| `src/lib/publication/index.ts` | The register joins the module's public surface |
| `scripts/check-publication.ts` | Each refusing gate names the dependencies holding it; the outstanding register prints; the summary partitions client-held from build-owned; five self-test cases added |
| `scripts/check-content.ts` | Ten assertions discharging item 21 — the eight approved documents are present, and items 17 and 21 carry a discharge |

### Dependencies

None added, none removed. No runtime coupling introduced: nothing under
`src/app` or `src/components` imports this layer, and a search for it across
`src/` returns only the layer itself.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with ten new assertions
npm run build                             ✓ green — 34 routes still prerender
npm run check:publication -- --selftest   ✓ 20 checks, all pass (was 15)
npm run check:publication                 ✗ 9 of 13 refuse, 228 findings — unchanged
```

The five new self-test cases, each an attempt to defeat the register:

| Attempt | Result |
| --- | --- |
| A register that is not §20.2's twenty-one rows, once each, in order | refused |
| A dependency naming a gate that does not exist | refused |
| A discharge with no document or no evidence behind it | refused |
| **A fact classified `confirmed` with no written record** | **publishes nothing** |
| A fact confirmed in writing | publishes |

The report, measured:

| Check | Result |
| --- | --- |
| Outstanding | **7 blocking · 9 gating · 2 soft** |
| Discharged, each naming a written record | **3 of 21** |
| Findings waiting on a client dependency | **225** |
| **Findings the build can fix today** | **3** — the Value gate's three files |
| Gates with no dependency holding them | Action, Value — stated as build-owned |
| Unconfirmed facts printed against dependency 3 | **14**, read from the Facts Register |

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.3 is now structural rather than remembered: a classification without its source publishes nothing, which is the exact mechanism §19.1's failure lacked. §3.3 one source of truth: the register lives in one file and the log stops restating it |
| **Creative Direction Book** | No visual decision was taken. L13 applied to the work: the register holds no state, no configuration and no abstraction beyond the twenty-one rows §20.2 schedules |
| **Documentary Storyboard** | Not engaged. The Chapter gate's dependency is recorded (item 1) and nothing about the chapter set changed |
| **Photography Direction** | §24.4 and §24.5 unchanged. What changed is that their findings now name the client action that clears them — access to a working shift, and the archive |
| **Motion Direction** | Not engaged. Nothing here moves or renders |
| **Visual Design System** | §49's "not expressible" applied to a governance object for the first time: a verbal discharge has no shape to be written in. §48.3 unaffected — the Value gate's three files are unchanged and are now named as the build's own |
| **UX Blueprint** | §53.1 and R53.2 are the source of items 1–14 and 17–18; both readings of item 18 are reconciled against R20.6 rather than by preference |
| **Master Implementation Blueprint** | §20 in full: R20.1's classes, R20.2's rows, R20.3's ordering printed on every run, R20.5's currency tied to the gate run, R20.6 made mechanical. §16's R16.5 satisfied — a finding now carries its owner |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 1 |
| Files modified | 4 |
| Files deleted | 0 |
| Dependencies added / removed | 0 / 0 |
| Self-test checks | 15 → **20** |
| `check:content` assertions | +10 |
| Publication findings | 228 → **228**, unchanged — this package refuses nothing new |
| Findings now attributed to an owner | **225 of 228** |
| Register rows discharged | **3 of 21**, each naming a written record |
| Runtime coupling | **none** — no page, layout or component imports this layer |
| Bundle impact | **Zero.** Nothing here reaches the client bundle |
| Performance impact | Not applicable; this code does not run in the application |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| The register's rows are transcribed from MIB §20.2. If §20 is amended, this file is amended with it — the citation is on the type, not enforced | MIB R20.2 | Review, at any amendment |
| §52.3 row 3: machine records still publish `manufacturer`, `capacity`, `power`, origin and cutting force — due withheld before Priority 2 ships | UX R18.4, R43.4 | Content layer, before Stage 2 |
| §52.3 row 5: the FAQ record carries `topic` where R45.2 makes the parent surface mandatory | UX R45.2, R15.6 | Content layer |
| `getProductsMegaMenu` still exists with no consumer | MIB R10.3 | Content layer |
| Nine §12 inventory entries unimplemented; `Dialog` and `Search` deliberately unbuilt | MIB §12.1, R13.4 | Stages 1–3 |
| `imageSizes` and `services/email.ts` carry literal design values — the three findings the build owns | VDS §48.3 | Review |
| The Action gate reads nothing at content level; per-route counting needs a render-time audit | UX R39.3 | Stage 1 |

### What this package unlocked

**The Integration track now has an instrument.** The question the project is
actually blocked on — *what do we need from the client, and what does each item
release* — is answered by a command rather than by re-reading a document and
three log entries. Every future milestone reviews the register by running the
check it already runs, and a dependency that resolves shortens the list in one
edit, in one file.

The second effect is quieter and matters more in ten years: **a fact can no
longer be confirmed from memory.** The single most likely way this brand fails
its own promise now requires naming a document beside the claim.

### Why the next package follows

Unchanged, and now printed on every run. **Integration, in R20.3's order:**
access to a working shift (1), the company name in writing (2), the copy
commission (12), typeface licensing (13), the reply process (20).

Seven blocking dependencies stand. R20.1: work does not begin on the affected
surfaces. The three items the build owns — the Value gate's three files — are a
review item, not a package.

---

## Milestone 0.10 — The image record: one frame, one record

**Stage** 0, the substrate · **Kind** Construction, building the receptacle the
Integration track lands in · **Status** complete · **Blueprint reference** MIB
§15 (R15.2 the Image object is first-class, R15.4 every object carries its
chapter), §18 (R18.4 every image arrives with its record), §19 (R19.5 the
archive is a precondition of publication), §16 (R16.5), §7 (R7.1), §17 (R17.1,
R17.5) · Photography Direction §22.4, §24.4 · VDS §30.2, §32.3 · Documentary
Storyboard §13.6 · UX Blueprint R42.5, R49.5

### Why this package, and why now

The register says where the effort belongs and CP009 now prints it on every
run: dependency 1 is the root, dependency 19 is the archive, and both are
Blocking on the client. R20.1 forbids beginning **the affected work** — the
surfaces. It does not forbid building the thing the asset lands in, and R19.5
is explicit that the archive is not something done afterwards:

> Nothing is published from a shoot until the archive exists — originals
> retained, capture dates, locations, photographer, permissions. **The archive
> is a precondition of publication, not a tidy-up afterwards.**

Three facts made this the highest-value package available:

**1. R15.2 was scheduled and unbuilt.** *One image, one record, referenced
everywhere.* Until this package, a photograph's size, its alternative text and
its provenance lived inline on each document that referenced it — which is the
arrangement R15.2 names and rejects, and the reason Photography Direction
§22.4's single canonical crop could only be checked after the fact rather than
enforced.

**2. A frame's dimensions were being typed.** 214 record fields were authored
by hand across 28 content files, including the two numbers VDS §30.2 and §32.3
gate on. R7.1 predicts what happens to a fact expressible in two places, and it
had already happened — see the finding below.

**3. It is what makes dependency 1 cheap.** With this in place, integrating a
real shoot is: drop the files in, run one command to measure them, type four
provenance fields per frame. Without it, the same work is an edit to every
document that references the photograph.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| **One image, one record, referenced everywhere** | MIB R15.2 | `src/content/images.json` is the frame; a document writes `{ "src": … }` and nothing else |
| Every image arrives with its record — place, date, photographer, permission, what is happening | MIB R18.4 · Photography §24.4 | The record's shape; `images:record` reports each field that is missing, per frame |
| The archive exists before anything publishes | MIB R19.5 | `npm run images:record` — measure, merge, report |
| A fact exists in exactly one place | MIB R7.1 | Dimensions are **measured from the file** and never typed. `check:content` refuses a document that describes a frame |
| One canonical crop; two crops of one frame are two statements | Photography §22.4 · VDS §32.1 | One record per frame means one width and one height. The Crop gate can no longer have anything to find |
| An image whose size is unknown cannot be shown to reach the threshold | VDS §30.2, §32.3 | The measurement is the gate's input; a file that cannot be read is a finding, not a default |
| Alternative text is the caption — there are no decorative images | Documentary §13.6 · UX R49.5 | `alt` and `caption` are fields of the frame, not of the reference |
| Every object carries the chapter it belongs to | MIB R15.4 · UX R42.6 | `chapter`, C1–C10, on the record — a fact about the photograph, absent until somebody who was there supplies it |
| A gate failure is stated to the person who can fix it, as what is missing | MIB R16.5 | "no capture date", "no photographer", per frame, per run |
| A content editor may add an image with complete provenance | MIB R17.1, R17.3 | One entry in one file, with no field that affects appearance |
| The content layer must be portable | MIB R17.5 | The library is plain JSON keyed by asset path; it moves to a CMS media library as data |
| **Nothing is invented** | MIB R20.4 · Photography §22.5 | The tool measures and preserves. Place, date, photographer, permission, caption, rank and chapter are never written by it |

### Architecture decisions

**1. The identity of a frame is its site-absolute path.** It is already unique,
already what content names, and already what the browser requests. A synthetic
id would have added a second name for one thing (R7.1) and a migration for no
gain.

**2. Dimensions are measured, not declared.** `src/lib/images/intrinsic-size.ts`
reads the header of a WebP, PNG or JPEG — about seventy lines and no
dependency. The alternative was to keep trusting the number in the document,
and the finding below is what that was worth.

**3. `resolveImage` is the one door.** It already resolved every relative path;
it now also attaches the frame's record, so a loader cannot produce an image
without one. Where a document carried images that no field-by-field resolution
reached — a company page's steps, the home sections — `resolveDocumentImages`
walks the document, so the next image-carrying field needs no loader change.

**4. The record wins over the reference.** A document that kept a stale copy of
a caption cannot override the library. This is R7.1 applied to the merge order,
and it is why the enforcement in `check:content` can be a refusal rather than a
preference.

**5. Content models were not narrowed to `{ src }` at the type level.** Doing so
would change the inferred type of every `hero`, `cover` and `thumbnail` and
require every consumer to move to a separately declared resolved type — a large
diff for the same guarantee. Instead `check:content` refuses any document that
describes a frame, which fails the same edit at the same moment. Recorded as a
deliberate trade rather than an oversight.

**6. The library holds every file, not only the referenced ones.** 98 records
for 98 files. A frame that exists but is unused is visible; a frame that is
referenced but absent is a named finding rather than a blank space.

### What the measurement found immediately

One frame's declared size disagreed with the file:

| Frame | Declared in content | The file | Consequence |
| --- | --- | --- | --- |
| `journal/choosing-full-grain-leather/cover.webp` | 2000 × 1125 | **1600 × 900** | It had been passing the Threshold gate on a number that was not true. Measured, its shorter side is 900px and it does not reach the evidence threshold at 2× delivery (VDS §32.3) |

This is not a defect introduced by this package. It is the failure R7.1
describes, found the first time the two sources were compared — and it is the
argument for the package in one row.

### Files created

| File | Responsibility |
| --- | --- |
| `src/content/images.json` | The image library: 98 frames, each with its measured size and its record |
| `src/lib/images/intrinsic-size.ts` | Reads intrinsic dimensions out of a WebP, PNG or JPEG header |
| `src/lib/content/images.ts` | Loads and validates the library; merges a frame's record onto a reference |
| `scripts/record-images.ts` | `npm run images:record` — measure, merge, report what each frame still needs |

### Files modified

| File | Change |
| --- | --- |
| `src/models/primitives.ts` | `chapterSchema` (C1–C10), `imageRefSchema` (what a document writes), `imageRecordSchema` (what a frame is), `imageLibrarySchema`; `imageSchema` is now the two composed |
| `src/lib/content/assets.ts` | `resolveImage` attaches the record; `resolveDocumentImages` walks a whole document |
| `src/lib/content/pages.ts` | Company pages resolve through the walk, so the frames inside each step are reached |
| `src/lib/content/singletons.ts` | Home resolves through the walk |
| `src/types/index.ts` | `Chapter`, `ImageRef`, `ImageRecord`, `ImageLibrary` exported |
| `scripts/check-content.ts` | Four new invariants (below) |
| `package.json` | `images:record` |
| **28 content files** | 214 record fields removed — every document now names a frame and says nothing about it |

### Dependencies

None added, none removed. The header reader is Node's `Buffer` and nothing
else.

### The new invariants

`check:content` now fails if the library and the content disagree:

1. Every frame a document references is in the archive — a reference the
   library does not know would render nothing and report nothing (R15.2, R19.5).
2. The record reached the surface: a frame's measured width is the width the
   loader produced, which fails the moment a loader bypasses `resolveImage`.
3. **No document describes a frame.** `alt`, `width`, `height`, `caption`,
   `provenance`, `evidenceRank` and `chapter` beside a `src` are refused in both
   JSON and MDX frontmatter — the second description R15.2 exists to prevent.
4. Every library entry has a measured size, so a file that could not be read is
   a failure rather than a silent gap.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with four new invariants
npm run build                             ✓ green — 34 routes still prerender
npm run check:publication -- --selftest   ✓ 20 checks, all pass
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 229 findings (was 228)
```

Measured in the running application:

| Surface | Images | Without alternative text | Without intrinsic dimensions | Rendered at a ratio other than the frame's own |
| --- | --- | --- | --- | --- |
| Home | 9 | **0** | **0** | **0** |
| Manufacturing | 9 | **0** | **0** | **0** |
| Gallery | 30 | **0** | **0** | **0** |
| Product record | 4 | **0** | **0** | **0** |
| Journal article | 1 | **0** | **0** | **0** |

Console errors: none. Before this package the frames inside Manufacturing's
steps carried no dimensions in content and therefore rendered nothing (VDS
§30.2, and the primitive's refusal since Package 004). They now carry a
measured size and appear — which is the pipeline delivering a record that was
missing, not a change to the surface.

The archive report:

| Check | Result |
| --- | --- |
| Files under `public/images` | 98 · **98 measured** |
| Frames referenced by the content layer | 83 |
| Referenced but not in the archive | **0** |
| Frames carrying a complete record | **0 of 98** — every one lacks the four provenance fields, a caption, a chapter and a rank |
| Declared sizes that disagreed with the file | **1**, above |

**Zero complete records is the correct number today**, and it is the honest
form of dependency 1. The tool states, per frame, exactly which of the seven
things is missing; not one of them is the build's to supply.

### On the finding count

228 → 229. The Threshold gate now reads 43 referenced frames from their files
rather than from what a document claimed about them, and one of those is the
mis-declared cover above. The Register gate reports 9; the last per-gate figure
recorded for it was 10, five milestones ago and before three packages changed
content, and no per-gate baseline was captured with the 228, so that difference
is **not** attributed here rather than guessed at.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §3.3 one source of truth, applied to the object the whole brand rests on: a photograph is described once. §19 untouched — no fact was published, confirmed or softened |
| **Creative Direction Book** | No visual decision was taken. §6.1 is unaffected; the thresholds are the VDS's and are quoted, not re-derived |
| **Documentary Storyboard** | §13.6 is now a field of the frame rather than of a reference, so a caption cannot differ between two surfaces showing the same photograph. §7's chapter set is expressible on every frame (R15.4), and is empty until somebody who was in the room fills it |
| **Photography Direction** | §22.4 is the package's spine — one frame, one record, one width, one height, so a second crop is not representable. §24.4's four fields are the record's shape and the report's subject. §22.5 honoured: the tool refuses to author anything only the photographer knows |
| **Motion Direction** | Not engaged |
| **Visual Design System** | §30.2 and §32.3 now gate on a measurement instead of a claim. §32.1 unchanged and strengthened: the layout still cannot reshape a frame, and now cannot disagree about its shape either |
| **UX Blueprint** | R42.5 satisfied structurally — every model carrying a photograph carries its provenance, because it carries a reference to the record that holds it. R49.5: no image reaches a surface without alternative text |
| **Master Implementation Blueprint** | R15.2 implemented as written, including its stated reason. R15.4 expressible. R15.5 respected — the record carries no presentational field. R17.1 and R17.3: adding a frame is one entry, and nothing in it affects appearance. R17.5: plain JSON, portable. R18.4, R19.5 and R16.5 are what `images:record` does |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 4 |
| Files modified | 7, plus 28 content files |
| Files deleted | 0 |
| Dependencies added / removed | 0 / 0 |
| Record fields removed from content | **214** |
| Library entries | **98**, every one measured |
| Hand-typed dimensions remaining in content | **0** |
| New `check:content` invariants | 4 |
| Publication findings | 228 → **229** |
| Runtime cost | One synchronous read of one JSON file per process, memoised |
| Bundle impact | **Zero.** The library is read during prerender; nothing new reaches the client |
| Performance impact | **Not measured.** No before/after profile was taken |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| Content models still type an image as the full shape rather than `{ src }`; the refusal lives in `check:content` instead of the type system | MIB R15.2 | Review — it costs a resolved-type migration across every consumer |
| No frame carries a chapter, an evidence rank, a caption or provenance | MIB R15.4, R18.4 | **Integration — dependencies 1 and 19** |
| The Crop gate can no longer find anything, because one record per frame makes a second crop unrepresentable. It is retained: §16.2 schedules thirteen gates and a gate that cannot fire is the correct end state, not a redundant one | MIB §16.2 | — |
| §52.3 row 3: machine records still publish `manufacturer`, `capacity`, `power`, origin and cutting force | UX R18.4, R43.4 | Content layer, before Stage 2 |
| §52.3 row 5: the FAQ record carries `topic` where R45.2 makes the parent surface mandatory | UX R45.2 | Content layer |
| `getProductsMegaMenu` has no consumer | MIB R10.3 | Content layer |
| Nine §12 inventory entries unimplemented; `Dialog` and `Search` deliberately unbuilt | MIB §12.1, R13.4 | Stages 1–3 |
| `imageSizes` and `services/email.ts` carry literal design values — the three findings the build owns | VDS §48.3 | Review |

### What this package unlocked

**Dependency 1 is now an afternoon's data entry instead of a migration.** When
the shift is granted and the frames come back, the sequence is: replace the
files, run `npm run images:record`, and type four provenance fields, a caption,
a chapter and a rank per frame into one file. No document changes. No component
changes. The Provenance, Record and Threshold gates go green frame by frame as
the records are filled, and the report says which frame is next.

The second effect: **a photograph can no longer be described two ways.** The
one instance where that had already happened — a cover declared 25% larger than
the file — was found by the first run of the tool, and the arrangement that
allowed it no longer exists.

### Why the next package follows

Unchanged, and still Integration. The register prints it: seven blocking
dependencies, and R20.3's order — access to a working shift (1), the company
name in writing (2), the copy commission (12), typeface licensing (13), the
reply process (20).

Every receptacle those five land in now exists: the design value source, the
component inventory, the routing, the dependency register, and the archive.
**There is no construction package left that MIB requires and that a blocking
dependency does not hold.** Home composition in particular remains barred —
R51A.2 needs photography that does not exist and copy that has not been
written, and R20.1 is not satisfied by either being close.

---

## Milestone 0.11 — The company record, as governed state

**Stage** Integration · **Kind** Integration tooling — the apparatus around
dependency 2, which is the client's to discharge · **Status** complete ·
**Blueprint reference** MIB §20.2 items 2, 3, 7, 8, 12, 20 · R20.4 (a gating
dependency never becomes an invention) · R20.6 (written confirmation) · R16.5
(stated to the person who can fix it) · §16.2 (the Register gate) · Brand Bible
§19.2, §19.3, §25 item 1

### Why this package is next

R20.3 fixes the order and CP009 prints it: dependency 1 is the root, and after
it the register runs in its own numbering. CP010 built the receptacle for 1 and
19. **Dependency 2 is the next row**, it is Blocking, and its
while-outstanding is one sentence:

> Nothing is published carrying a name that may be wrong.

The register said that; nothing in the build did. `src/config/company.ts`
declares a legal name, a trading name, a founding year, a headcount, a postal
address, an email, a telephone number, two certifications and eight export
markets — and every one of them reaches a surface. Four separate register rows
are involved (2, 3, 7, 8) and they all leak into publication through one file
that no gate was reading.

This package is that file classified. It supplies no answer.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| Nothing is published carrying a name that may be wrong | MIB §20.2 item 2 | Eleven fields of the company record are classified; the Register gate refuses every one that is not Confirmed |
| Any `REGISTER` field not classified Confirmed is refused | MIB §16.2 · Brand Bible §19.3 | The Register gate now reads **known records** as well as prose |
| Written confirmation, or the dependency stands | MIB R20.6 · Brand Bible §19.3 | Each field's answer is recorded against its fact with the document it came from — the mechanism CP009 made structural |
| A gating dependency never becomes an invention | MIB R20.4 | No value was changed, softened, or supplied. The standing value is quoted back so the client can correct it |
| A finding is stated to the person who can fix it, as what is missing | MIB R16.5 | Each finding carries the question that discharges it, in words a client can answer |
| Copy is not the build's to write | MIB R6.4 | The tagline is classified as copy against dependency 12, not as a fact awaiting a client's yes |
| One source of truth | MIB R7.1 | The classification lives in the Facts Register; this module names which field carries which fact and nothing else |

### Architecture decisions

**1. The Register gate reads records, not only prose.** Scanning text is right
for a figure, which can appear in any sentence. An identity fact is a field of
a known record — it does not need finding, it needs classifying. The gate takes
`registerFields` alongside `texts`; §16.2 still schedules thirteen gates and no
fourteenth was invented.

**2. The identity facts carry no markers.** A marker for "Elite Export" would
report the same unconfirmed name once per document and bury the eleven items
that need an answer under thirty that say the same thing. R16.5 is about the
report being actionable, and eleven questions are actionable where forty
repetitions are not.

**3. Nothing was removed from the record at build time.** Brand Bible §19.2
governs publication; R20.1 governs work. Deleting the company's name from the
build would empty every surface and would be redesigning pages that are not
this package's to touch — the correct expression of a Blocking dependency is a
refusal at the gate, which is what now happens.

**4. The sheet is an artefact, not a screen.** `npm run check:publication --
--confirmations` prints the eleven questions, the value the build is holding
against each, and the dependency each answer discharges. It is the thing that
goes to the client, and it is generated from the same data the gate refuses on,
so the two cannot drift (R7.1).

**5. `social` and `businessHours` are deliberately unclassified.** A link to a
profile and an opening time are not claims of the kind Brand Bible §19 governs.
`check:content` refuses any *other* field of the record that is not classified,
so the exemption is explicit and a field added later cannot slip past.

### Files created

| File | Responsibility |
| --- | --- |
| `src/lib/publication/company-record.ts` | The eleven governed fields of the company record: the fact each carries, the dependency that answers it, the question that discharges it, and what the build is holding meanwhile |

### Files modified

| File | Change |
| --- | --- |
| `src/lib/publication/facts-register.ts` | Nine identity facts added — legal name, trading name, tagline, founding year, address, contact, registration identifiers, certification, export markets |
| `src/lib/publication/gates.ts` | `RegisterField` on the snapshot; the Register gate reads known records as well as prose |
| `src/lib/publication/dependencies.ts` | Rows 2, 7, 8, 12 and 20 now name the Register gate they hold red |
| `src/lib/publication/index.ts` | The record joins the module's public surface |
| `scripts/check-publication.ts` | The snapshot carries the record's fields; the confirmation sheet prints; `--confirmations` prints it alone; three self-test cases |
| `scripts/check-content.ts` | Every fact-stating field of the record must be classified, and every classification must name a fact the register holds |

### Dependencies

None added, none removed. No runtime coupling: nothing under `src/app` or
`src/components` imports this layer, and no value in `src/config/company.ts`
changed.

### Verification

```
npx tsc --noEmit                             ✓ clean
npm run lint                                 ✓ clean, no warnings
npm run check:content                        ✓ green, with two new invariants
npm run build                                ✓ green — 34 routes still prerender
npm run check:publication -- --selftest      ✓ 23 checks, all pass (was 20)
npm run check:publication -- --confirmations ✓ eleven questions, no answers
npm run images:record -- --check             ✓ the library matches the files
npm run check:publication                    ✗ 9 of 13 refuse, 240 findings (was 229)
```

The three new self-test cases, each an attempt to defeat the gate:

| Attempt | Result |
| --- | --- |
| A field of a known record whose fact is not Confirmed | refused |
| A field naming a fact the register no longer holds | refused, not ignored |
| A record field with no entry in the Facts Register | caught before the gate runs |

Measured:

| Check | Result |
| --- | --- |
| Company record fields classified | **11** |
| Outstanding, awaiting written confirmation | **11 of 11** |
| Findings | 229 → **240** — the eleven fields, each once |
| Register gate now held by | dependencies **2, 3, 7, 8, 12, 20** (was 3 alone) |
| Values changed, softened or supplied | **0** |

### The eleven questions

Printed by `--confirmations`, each against the row it discharges:

| Field | Discharges |
| --- | --- |
| `legalName`, `tradingName`, `foundedYear`, `contact.address`, `registrationIdentifiers` | **2 — the company name** (blocking) |
| `employees` | 3 — the Facts Register at Brand Bible §19.4 |
| `certifications` | 7 — issuer, reference, date, scope, exclusions |
| `exportMarkets` | 8 — markets actually shipped to |
| `tagline` | 12 — copy, authored rather than confirmed |
| `contact.email`, `contact.phone` | 20 — the reply process, and who answers |

Five of the eleven discharge the blocking row. The record currently holds a
value for ten of them and nothing for the eleventh; every value is quoted back
in the sheet so an answer can correct it rather than have to be composed from
nothing.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2 and §19.3 now reach the record the brand rests on. §19.1's failure — a fabricated audit body surviving a full review — is the exact shape of what is now refused: two certifications with an issuer, a year and no reference are named as unconfirmed rather than trusted. §25 item 1 is the sheet's first question |
| **Creative Direction Book** | No visual decision was taken. L13 applied to the work: eleven rows of classification and no abstraction beyond them |
| **Documentary Storyboard** | Not engaged |
| **Photography Direction** | Not engaged. The image library from Package 010 is untouched |
| **Motion Direction** | Not engaged. Nothing here moves or renders |
| **Visual Design System** | Unaffected; no value, mark or component changed |
| **UX Blueprint** | R26.1 supported: the legal surface states the identity it has, and the register now names what it is missing. R44.1's certification fields are asked for in the client's own words |
| **Master Implementation Blueprint** | §20.2 items 2, 3, 7, 8, 12 and 20 are attributed to the gate they hold. R20.4: not one value was invented, softened or filled. R20.6: an answer is a document, recorded once. R16.5: every finding carries its question |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 1 |
| Files modified | 6 |
| Files deleted | 0 |
| Dependencies added / removed | 0 / 0 |
| Governed facts | 14 → **23** |
| Self-test checks | 20 → **23** |
| `check:content` invariants added | 2 |
| Publication findings | 229 → **240** |
| Company facts invented | **0** |
| Bundle impact | **Zero.** Nothing here reaches the client bundle |
| Performance impact | Not applicable; this code does not run in the application |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| `registrationIdentifiers` is classified but has no field in `CompanyProfile`. Adding an empty field would claim something exists and is being withheld (Milestone 0.8's finding), so the field arrives with its answer | UX R26.1 · Brand Bible §19.2 | **Integration — dependency 2** |
| The record's values are still rendered by the surfaces. That is correct while the dependency is Blocking on *work* rather than on *publication*, and it is what the Register gate now refuses at the launch gate | MIB R20.1, §16.1 | — |
| Content models still type an image as the full shape rather than `{ src }` | MIB R15.2 | Review |
| No frame carries a chapter, an evidence rank, a caption or provenance | MIB R15.4, R18.4 | **Integration — dependencies 1, 19** |
| §52.3 rows 3 and 5: machine `REGISTER` fields, and the FAQ parent surface | UX R18.4, R45.2 | Content layer |
| `getProductsMegaMenu` has no consumer | MIB R10.3 | Content layer |
| `imageSizes` and `services/email.ts` carry literal design values | VDS §48.3 | Review |

### What this package unlocked

**Dependency 2 is now a form the client fills in.** Eleven questions, each in
their own words, each quoting what the build is currently holding, each naming
what the answer releases. When an answer arrives in writing, it is one edit —
the classification and its document — and the gate goes quiet for that field.

The second effect: **the company record can no longer grow an unclassified
claim.** A new field on `CompanyProfile` fails `check:content` until somebody
says which governed fact it carries. The most common way this rule is broken in
practice is not a lie; it is a field somebody added without noticing it was a
claim.

### Why the next package follows

The register is unchanged and still prints its own order. Outstanding: **7
blocking, 9 gating, 2 soft.** After dependency 2 the order runs 12 (copy), 13
(typefaces), 20 (the reply process) — and none of the three has build-side
tooling left that MIB requires:

- **12** is authored by a copywriter under Brand Bible §11–§12; the build's
  obligation is R6.4, which is to write nothing. The tagline is now classified
  so the one stand-in sentence in the record is visible.
- **13** is a licence and two files; the roles are declared and every other
  value is fixed since Package 002.
- **20** is an operational commitment; the enquiry surface and its endpoint
  exist since Package 008.

**Every receptacle is built.** The remaining work is the client's, and the
build's next action is to receive it — not to construct another package.

---

## Milestone 0.12 — The two states that must never occur

**Stage** 0, closing an unmet Stage 0 gate · **Kind** Construction, **required
by the blueprint rather than chosen** · **Status** complete · **Blueprint
reference** MIB R9.2 (the Stage 0 gate: every state at UX §47 behaves as
specified, *including the two that should never occur*) · UX R47.3, R47.2,
R51.2, R51.4 · MIB R16.5, R20.4, R6.4 · VDS §32.3 · Creative Direction Book
§14.3

### Why this exists, when Stage 0 was declared complete

It was not complete. Reading MIB R9.2 against the build found one of its four
Stage 0 conditions unmet, and the shortfall was not a detail:

> Every state at UX Blueprint §47 behaves as specified, **including the two that
> should never occur**.

The second of those two is *any state that loses a visitor's words* (R51.4).
UX R47.3 states the behaviour, applies it to error, offline, timeout and
maintenance equally, and calls it **the single most important behaviour in that
Part**; R51.2 lists it among the eight structural obligations Phase 8 must
produce. Nothing implemented it. An eleven-field enquiry — the surface that
*replaces a first call* — was lost to a dropped connection, a closed tab, or a
navigation away.

A second item was found in the same reading, and it is the failure Brand Bible
§19.1 records, alive in the tree: the Enquiry surface's confirmation promises a
reply *within three working days*. Dependency 10 classifies that as unconfirmed
and UX R41.8 forbids the site from promising a time operations cannot keep. It
survived every previous package because it is authored **in a component**, and
the Register gate reads content.

Both are the blueprint's requirements, not new ideas. Nothing else in a full
reading of §8.3, §9.2, §51 and §51A is unbuilt.

### Governing rules

| Rule | Source | How it is implemented |
| --- | --- | --- |
| **Nothing the visitor has written is ever lost, in any state** | UX R47.3 · R51.2 · R51.4 · MIB R9.2 | Words are kept as they are typed, on the visitor's own machine, and released only when the enquiry has been received |
| It applies to error, offline, timeout and maintenance equally | UX R47.3 | None of those is a state the page can see coming, so retention is continuous rather than triggered |
| Nothing is queued silently and lost | UX R47.2, offline | Nothing is sent. The copy is local and inert; the visitor resubmits |
| Individuals are not tracked | UX §50.3 | The words never leave the browser. The distinction is who holds them |
| Consent is an act, not a value | Brand Bible §18.5 | Consent and the honeypot are the two fields never retained |
| A published promise is an operational commitment | Brand Bible §19.5 · UX R41.8 | The reply time is now a classified register field; the Register gate refuses it |
| Copy is not the build's to write | MIB R6.4 | The sentence was **not rewritten**. It is reported, and dependency 10 answers it |
| Delivery quality is fixed once, in the primitive | VDS §32.3 · CDB §14.3 | The framework was silently overriding it; the config now allows the one value the primitive asks for |

### Architecture decisions

**1. Capture is the form element's own `input` event, not the form library's.**
The first implementation used React Hook Form's `watch(callback)`, and
verification showed it never fired: this form registers its fields but does not
read their values during render, and an unread field set produces no callback.
A native listener on the `<form>` reads `FormData` and is immune to that — MIB
R1.5's boring, durable option, and less code than the alternative. **The
library's subscription was the clever one, and it did not work.**

**2. Session scope, not local.** The words survive a reload, a crash, a lost
connection and a navigation away; they do not outlive the browser. An enquiry
carries a company, a name, an email and a telephone number, and a shared
computer is a real place this site is read from.

**3. Released on success only.** A failed send keeps everything exactly where
the visitor left it. This is the case R47.3 exists for, and it is verified below
by making the send fail.

**4. The reply time is classified, not corrected.** R6.4 is absolute and the
answer is dependency 10's. What the build owes is that the claim cannot pass a
gate unseen — so it is a register field on the Enquiry surface, using the
mechanism Package 011 built, and the report now asks the question in the
client's words.

### Files created

| File | Responsibility |
| --- | --- |
| `src/components/forms/use-retained-values.ts` | UX R47.3: keeps what the visitor has written, restores it, and destroys it when the enquiry is received |

### Files modified

| File | Change |
| --- | --- |
| `src/components/forms/enquiry-form.tsx` | Retention wired in; the copy is released only when the send succeeded |
| `src/components/forms/use-form-submit.ts` | `submit` resolves `true` only when the payload was received, so nothing is released on a failure |
| `src/lib/publication/company-record.ts` | The stated reply time added as a register field on Enquiry, against dependency 10 |
| `src/lib/publication/dependencies.ts` | Row 20 names the Register gate it now holds red |
| `next.config.ts` | `images.qualities: [90]` — the framework was refusing the primitive's quality and serving its own |

### Dependencies

None added, none removed. No storage library, no persistence dependency: one
`sessionStorage` key and `FormData`.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks, all pass
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings (was 240)
```

R47.3 measured in the running application, by trying to lose the words:

| Attempt | Result |
| --- | --- |
| Type into five fields | Retained — **consent and the honeypot excluded** |
| Navigate to another surface and return | **All five restored**, consent unchecked and to be performed again |
| Submit with the connection failing | **Nothing lost.** Every field still filled, the error stated in words, the copy still held |
| Submit successfully | **The copy is destroyed** and the confirmation is shown |
| Storage used | `sessionStorage`, one key. `localStorage` untouched (0 keys) |

The delivery-quality defect, measured before and after:

| Check | Before | After |
| --- | --- | --- |
| Console on Manufacturing | 16 warnings: *quality "90" is not configured* | **none** |
| Image URLs served | `q=75` — the framework's default | **`q=90`** — the value VDS §32.3 fixes |

**This was a live regression of §32.3 on every photograph on the site.** The
primitive has asked for 90 since Package 004; this framework version added an
allow-list and silently substituted its own default. It was found by reading
the console during this package's verification.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.5 — a published promise is an operational commitment — now reaches a claim authored in a component, which is where §19.1's failure lives. §18.5: consent is asked again rather than inherited |
| **Creative Direction Book** | §14.3 restored in fact rather than in intent: a shadow that loses its detail is information discarded, and 75 was discarding it |
| **Documentary Storyboard** | Not engaged |
| **Photography Direction** | §22.4 unaffected; delivery now matches what the primitive fixes |
| **Motion Direction** | M11 upheld: retention is silent and instant. Nothing spins, nothing is disguised, no wait was introduced |
| **Visual Design System** | §32.3's delivery quality is now what is delivered. §38.4: the wait is still stated in the words the control already had |
| **UX Blueprint** | R47.3 implemented and verified against error and offline. R51.2's eighth obligation discharged. R51.4's second never-state closed. R41.8's forbidden promise is now refused by a gate rather than unseen. §50.3 respected — the words never leave the machine |
| **Master Implementation Blueprint** | **R9.2's third Stage 0 condition is met for the first time.** R16.5: the reply-time finding carries its question. R20.4: nothing was invented; R6.4: nothing was rewritten |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 1 |
| Files modified | 5 |
| Dependencies added / removed | 0 / 0 |
| Publication findings | 240 → **241** |
| Self-test checks | 23, unchanged |
| Console warnings on a photograph-led surface | 16 → **0** |
| Copy authored | **0 sentences** |
| Company facts invented | **0** |

### Remaining technical debt

| Debt | Rule | Owner |
| --- | --- | --- |
| The enquiry's confirmation still states a reply time. It is now refused by the Register gate; the sentence is the copywriter's to correct | UX R41.8 · MIB R6.4 | **Integration — dependencies 10 and 12** |
| Three files carry literal design values — `services/email.ts` (a medium with no CSS), `utils/image.ts` and `gallery.tsx` (`sizes` strings, which cannot read a CSS variable) | VDS §48.3 | Build-owned, and the only build-owned findings left |
| Content models still type an image as the full shape rather than `{ src }` | MIB R15.2 | Review |
| No frame carries a chapter, an evidence rank, a caption or provenance | MIB R15.4, R18.4 | **Integration — dependencies 1, 19** |
| §52.3 rows 3 and 5: machine `REGISTER` fields, and the FAQ parent surface | UX R18.4, R45.2 | Content layer |
| `getProductsMegaMenu` has no consumer | MIB R10.3 | Content layer |

### What this closes

**Stage 0's gate at R9.2 now has three of four conditions met**, and the fourth
— *an arbitrary value is not expressible* — is three files, all of them named,
two of them arguably irreducible. Construction that the Master Implementation
Blueprint requires is finished. The Integration Readiness Report follows this
entry.

---

# Integration Readiness Report

**Date** 2026-08-10 · **Position** Stage 0 complete; Stage 1 blocked ·
**Authority** MIB §20 (the dependency register), §9.2 (the Stage 0 gate), §26
(the launch gates), UX §51A (implementation priority)

Every figure below is produced by `npm run check:publication` and
`npm run images:record`, not asserted here. The register lives in
`src/lib/publication/dependencies.ts` and is the source of truth (R7.1).

## 0. Is any required construction left?

**No.** MIB R8.3's Stage 0 contents are all built; §9.2's four-condition gate
now stands at three met and one partially met:

| R9.2 condition | State |
| --- | --- |
| Every value from one source; an arbitrary value not expressible | **3 files** carry literal values — see §2 |
| The gates refuse what they must, proven by attempting to defeat them | **Met** — 23 self-test checks |
| Every state at §47 behaves as specified, including the two that should never occur | **Met** at Package 012 |
| Navigation and footer satisfy §37 and §38 | **Met** at Package 005 |

UX §51.1–§51.6 are all built except the surfaces themselves, and R20.1 forbids
starting those. **No further construction package should be created.**

## 1. Remaining client dependencies

Seven blocking, nine gating, two soft. In R20.3's order:

| # | Dependency | Class | What it releases |
| --- | --- | --- | --- |
| **1** | **Access to a working shift** | Blocking | The entire photography library. It is the root: items 4, 5, 6, 15 and 19 descend from it |
| **2** | **Confirmation of the company name** | Blocking | Every surface, the legal record, the logotype. Five of the eleven questions on the confirmation sheet |
| **12** | **Copy under Brand Bible §11–§12** | Blocking | Every surface it belongs to; the tagline; the enquiry confirmation's sentence |
| **13** | **Typeface licensing** | Blocking | Stage 0's last value; the site currently falls through to a system stack |
| **19** | **The archive, with retained originals** | Blocking | Publication of any image |
| **20** | **The reply process — a named person** | Blocking | Enquiry |
| **5** | Written consent for individuals | Blocking | Any photograph containing a person |
| 3, 4, 6, 7, 8, 9, 10, 11, 15 | Facts Register, rejection access, buyer permission, certificates, countries, machine attributes, reply time, saddles, threshold re-derivation | Gating | The corresponding records |
| 14, 16 | Logotype, functional-hue verification | Soft | Nothing structural |

**Nothing in this list is the build's to answer.** Run
`npm run check:publication -- --confirmations` for the eleven questions on the
company record, in the client's own words, and `npm run images:record` for what
each of the 98 frames still needs.

## 2. Remaining build-owned work

**Three findings, in three files. That is all.**

| File | Finding | Assessment |
| --- | --- | --- |
| `src/services/email.ts` | 10 literal colours | A transactional email is a medium with no CSS variables. Likely irreducible; a decision, not a task |
| `src/utils/image.ts` | 7 breakpoint pixels in `sizes` | A `sizes` attribute cannot read a CSS variable. Likely irreducible |
| `src/components/gallery/gallery.tsx` | 2 breakpoint pixels in `sizes` | Same |

Non-blocking, recorded rather than hidden: content models still type an image
as the full shape instead of `{ src }` (the refusal lives in `check:content`),
and two content-layer collisions at UX §52.3 (machine `REGISTER` fields, the
FAQ parent surface) are due before Priority 2 and Priority 3 respectively.

## 3. Remaining publication blockers

9 of 13 gates refuse; 241 findings; **238 wait on a client dependency, 3 are
ours.**

| Gate | Findings | Held by |
| --- | --- | --- |
| Provenance | 83 | 1, 19 |
| Record | 83 | 1 |
| Threshold | 43 | 1, 15 |
| Register | 25 | 2, 3, 7, 8, 12, 20 |
| Testimony | 3 | 3 |
| Certification | 2 | 7 |
| Category | 2 | 11 |
| Placeholder | 1 | **1 — and it blocks everything** |
| Value | 3 | ours |
| Crop · Consent · Chapter · Action | 0 | — pass |

The Placeholder gate is the one that matters: 98 generated files are present,
and Photography Direction §24.5 has no exception. **No surface can be published
until real photography replaces them**, whatever else is confirmed.

## 4. What starts the moment each dependency is satisfied

| When this arrives | This becomes possible, immediately |
| --- | --- |
| **1 + 19** — a shift, and the archive | Replace the files, run `npm run images:record`, type provenance per frame. Provenance, Record, Threshold and Placeholder clear frame by frame. **Home, Manufacturing, Quality and Gallery become publishable surfaces** |
| **2** — the name, in writing | One classification edit clears five register findings. The legal record gains its identifiers; the logotype is decidable |
| **12** — the copy | Home, Manufacturing and Enquiry are composed but unwritten. This is what turns them into surfaces |
| **13** — the typefaces | Two files into `globals.css`; every measured value already anticipates them |
| **20** — a named person who answers | Enquiry is honest for the first time; the reply-time sentence is corrected or removed |
| **3, 7, 8, 9** — the Facts Register | Machine attributes, certifications and export markets return to their records |
| **5** — consent | People may appear in photographs at all |
| **15** — the threshold, re-derived | The Threshold gate's final value; must happen before Stage 1 publishes |

## 5. Recommendation — the first visible implementation milestone

**Manufacturing, not Home.** UX R51A.1 puts both in Priority 1 and Home first;
R51A.8 and MIB R8.7 both override the order with the same rule — *the order
governs surfaces; the library governs what can be told, and the library wins.*

The reasoning, in three lines:

- Manufacturing is the surface whose evidence the shoot yields first and most
  of: C1 the place, C3 the decision, C5 joining, C6 finishing. Home needs the
  single hardest frame in the whole library (C3, E1 — a decision being taken,
  with a cost) and needs it to carry Recognition **alone**.
- Manufacturing is the chapter set made visible, and the chapter component,
  the evidence block, the image record and the held moment were all built for
  it. It is the surface that proves the substrate.
- Home is assembled from what Manufacturing establishes. Building Home first
  means guessing which frames exist and rebuilding it when they do.

**Its precondition is exact and small:** dependency 1 (a shift), 19 (the
archive), 12 (Manufacturing's copy) and 2 (the name). Not 13, not 20, not the
Facts Register — Manufacturing stands on mechanism, and every `REGISTER` field
it might have carried is already withheld.

**Recommended sequence:** pursue 1 and 2 now — 2 is a written answer to eleven
questions and costs the client an hour; 1 is a day on the floor with a
photographer and is the root of everything else. Commission 12 for
Manufacturing only, in parallel. When the frames and the words are in,
Manufacturing is composed from parts that already exist, and it is the first
thing anybody outside this project will see.

Until then: **the dependencies are the client's to satisfy, and no further
construction should be invented to fill the wait.**

---

# STAGE 1 — SURFACE COMPOSITION

## Home · Chapter 1 — C1, The place

**Stage** 1, the shortest complete telling · **Kind** Composition · **Status**
complete, and **absent at render until dependency 1 is satisfied** ·
**Governing** UX Blueprint §16 (R16.1, R16.2, and the dependency note) ·
Documentary Storyboard §7 C1, §7.1, §25.1 rule 3 · Creative Direction Book §20
Home, §22.1 · Photography Direction §5, §22.4, §24.4, §25 · VDS §23.1, §23.5,
§31.3, §32.1, §33.1, §12.2 · MIB R11.1, R11.2, R12.2, R15.4, R8.7, R5.3

### Why composition may begin, when Stage 1 is blocked

Because §16 says so, in the sentence that has been read as a blocker and is in
fact the licence:

> Requires an E1 photograph. Without one, Home cannot discharge its obligation
> and **the surface is built to the extent the library permits, with the
> Recognition passage absent rather than substituted (X8).**

R20.1 forbids beginning work a Blocking dependency governs. What §16 defines is
the form that work takes while the dependency stands: the surface is composed,
and each chapter renders only what the archive can prove. **Composed and
published are different things**, and every gate still refuses.

### Which documents govern this chapter

| Question | Answered by |
| --- | --- |
| What is C1 for | Documentary Storyboard §7 — *"Is anybody actually here?"* — and §7.1: rooms in use, from angles only somebody who works here would take. **Its argument is accumulation, not information** |
| What Home needs from it | UX §16: *the place, in use*, rank E5, chapter C1; and a named place and a named company at rank 7 |
| How it may open | VDS §23.5's closed list. Opening 1, a photograph at full bleed with no text in the field. CDB §22.1 rejects "the announced opening", so no heading does the work |
| How the photograph behaves | VDS §31.3 (bleed is the default for E5), §32.1 (the container gives the width, the photograph gives the height), §33.1 (text never sits on it), Photography §22.4 (one canonical crop) |
| What must travel with it | VDS §12.2 and Documentary §13.6 — the caption is a specification. MIB R12.2: the record is what converts a photograph into evidence |
| What happens with no evidence | MIB R11.1 and Documentary §25.1 rule 3 — **told whole or absent, never partial**. UX X8 — designed around the absence, never around stand-ins |
| Where the frames come from | Photography §25 and MIB R8.7 — *the library governs what can be told, and the library wins* |
| Spacing | VDS §23.1 — a chapter break is S6 |

### What was implemented

**One chapter, and the mechanism that fills it.**

| File | Responsibility |
| --- | --- |
| `src/lib/content/evidence.ts` | `chapterFrames(chapter)` — every frame the archive holds for one chapter, filtered to those that are evidence rather than files |
| `src/app/page.tsx` | C1 composed as a `Chapter`, replacing the substrate pass's generic intro section |

**The chapter is a function of the archive, not a list the surface holds.** A
frame belongs to C1 because the picture editor recorded it as C1 (MIB R15.4),
and it renders because its record is complete: chapter, evidence rank,
alternative text, caption, and all four provenance fields. Short of any one of
those it is a file, not evidence, and the chapter does not show it.

This is the reason no code changes when the shoot lands. The frames are typed
into `src/content/images.json` once each, and C1 fills itself.

**Intrinsic size is deliberately not re-checked here.** It is measured into the
library by `images:record`, the Threshold gate holds the number (VDS §30.2,
§32.3), and `ContentImage` renders nothing without it. A third copy of the
measurement would be R7.1 broken for nothing.

### What was not done, and why

- **No copy was written.** The passage inside C1 is the content layer's
  existing `home/company.json` body. MIB R6.4: copy is not the build's, and
  dependency 12 answers it.
- **No photograph was introduced.** Not one placeholder is wired into C1;
  Photography §24.5 has no exception, and the chapter reads the archive.
- **The heading was not restored.** The substrate pass gave the intro a
  `SectionHeader`; a chapter opening on a photograph carries no heading (CDB
  §22.1, VDS §23.5, MIB R11.1 — *a heading and a structural opening are not
  both needed*).
- **Chapters C2–C10 were not touched.** One chapter per package. Everything
  below C1 on Home is still the pre-chapter substrate pass and is scheduled.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

**R11.1 has two halves and both were measured.** The archive was temporarily
given a complete record for two frames, the chapter observed, and the probe
reverted — the same technique R9.2 requires of a gate: a rule nobody has tried
to break is a rule nobody knows works.

| Check | With no C1 evidence | With C1 evidence recorded |
| --- | --- | --- |
| `#the-place` in the document | **absent** | **present**, `aria-label="The place"` |
| Any partial trace of the chapter | **none** — the string does not appear | — |
| Frames rendered | — | 2, each with alternative text and intrinsic dimensions |
| Captions rendered | — | one per frame, inside `figcaption` |
| Opening | — | **the photograph is the chapter's first element** |
| Bleed width at a 1280px field | — | **1280px** — edge to edge (§31.3) |
| Rendered ratio vs the frame's own | — | **1.778 vs 1.777** — the canonical crop survives (§32.1, §22.4) |
| Text sitting on the photograph | — | **0 elements** (§33.1) |
| Headings inside the chapter | — | **0** — no announced opening (CDB §22.1) |
| Chapter break above | — | **177px** — S6 interpolated at this field (§23.1) |
| Radius / shadow | — | `0px` / `none` |
| Running animations | — | **0** — content is present when the surface is (§42.5) |
| `h1` on the surface | 1 | 1 |
| Actions in `main` | **1** — "Send us the specification" | 1 |

The probe is reverted: **0 of 98 frames carry a chapter**, and
`images:record --check` confirms the archive is byte-for-byte what it was.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2 untouched — no fact was published or authored. §3.2: the chapter cannot render a photograph whose provenance is unknown, so what it shows can always be checked |
| **Creative Direction Book** | §20: Home does not open with a claim — C1 opens on a photograph or does not open. §22.1's announced opening is unavailable: no heading, no rule, no label |
| **Documentary Storyboard** | §7 C1 implemented as a named chapter, in the canonical order, linkable alone at `#the-place` (§8.5, E4). §25.1 rule 3 enforced by construction: whole or absent |
| **Photography Direction** | §25 — the library is the argument, and it now literally is: the chapter is what the archive holds. §24.4's four fields are the condition of rendering. §22.4's canonical crop measured intact at 1.778 |
| **Motion Direction** | M1 and M6: nothing moves, nothing waits, nothing arrives on scroll. 0 running animations |
| **Visual Language Atlas** | §24 — the best work is never noticed: the surface does not decide which photographs it shows, so nobody chooses and nobody is tempted |
| **Visual Design System** | §23.1 S6 measured at 177px. §23.5 opening 1. §31.3 bleed. §32.1 ratio preserved. §33.1 no text on the frame. §12.2 caption below, in the record voice |
| **UX Blueprint** | §16's evidence table is what C1 answers. R16.1: the chapter proves rather than describes — it carries no summary of another surface. X8 implemented as the default state |
| **Master Implementation Blueprint** | R5.3: the surface is composed of a chapter, the chapter of components, the components of elements. R11.1 and R11.2 in full. R15.4: the chapter attribution is a fact about the photograph |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 1 |
| Files modified | 2 |
| Dependencies added / removed | 0 / 0 |
| Copy authored | **0 sentences** |
| Photographs introduced | **0** |
| Publication findings | 241 → **241**, unchanged |
| Chapters composed on Home | **1 of the 10 it touches** |
| Code that changes when the shoot lands | **none** — the archive fills the chapter |

### What blocks this chapter from rendering

**Dependency 1 alone.** C1 needs frames of the place, in use, at rank E5 — and
E2 where people are working, which additionally needs dependency 5, written
consent. Each frame then needs its record typed once: chapter C1, rank, caption,
place, capture date, photographer, permission.

`npm run images:record` lists what every frame still needs, per frame, in those
words.

### The next chapter

**C3 — The decision**, which is Home's Recognition moment (R16.2, Documentary
§7.2) and the reason the surface exists. It is the one chapter Home may not
substitute and may not defer: a Home that defers Recognition to Manufacturing
has assumed a second surface and breaks E4.

It requires an **E1** frame — a decision being taken, with a cost — which
Photography §5.2 rule 1 says cannot be arranged, only attended. Until
dependency 1 yields one, C3 is composed and absent, exactly as C1 is now.

---

## Home · The documentary skeleton — all ten chapters

**Stage** 1, surface composition · **Status** complete · **Governing**
Documentary Storyboard §7, §7.1, §7.2, §25.1, §25.2, §8.5, §24 · UX Blueprint
§16 (R16.1, R16.2, R16.3, R16.4, R16.5), X8, E4, E5 · MIB R5.2, R5.3, R11.1,
R11.2, R11.3, R8.7, R20.2 items 1 and 8 · Photography Direction §5, §24.4,
§24.5, §25 · Brand Bible §19.2 · VDS §23.1, §23.4, §23.5, §31.3, §32.1, §33.1

### The distinction this package exists to make

A chapter can be absent from Home for two reasons, and conflating them is how a
documentary becomes a brochure:

| | Absent because | Rule |
| --- | --- | --- |
| **By rule** | Home touches the chapter and hands it on. Another surface tells it whole | UX §16, R16.1 · §25.1 rule 3 |
| **By dependency** | Home tells the chapter, and the archive holds no frame for it | UX X8 · MIB R11.1 · §20.2 item 1 |

Neither the code nor a reader can infer which is which, so it is declared.
`src/config/tellings.ts` carries all ten rows, each with the rule that decided
it, and `check:content` refuses a row without one.

### The plan

UX §16: *Home is the only surface that touches all ten chapters and completes
none.* Its evidence table asks for exactly two: **the place, in use** (C1, E5)
and **one decision being taken** with one precisely described mechanism (C3,
E1 + E2). C3 is Recognition, and R16.2 forbids deferring it — *a Home surface
that defers Recognition to Manufacturing has assumed a second surface, which
breaks E4 for the visitor who leaves after one.*

| Chapter | Role | Where it is told whole |
| --- | --- | --- |
| **C1 · The place** | **tells** | — |
| C2 · What arrives | hands | Manufacturing |
| **C3 · The decision** | **tells — Recognition** | — |
| C4 · The shaping | hands | Manufacturing |
| C5 · The joining | hands | Manufacturing |
| C6 · The finishing | hands | Manufacturing |
| C7 · The gate | hands | Quality |
| C8 · The record | hands | Quality |
| C9 · What leaves | hands | Export |
| C10 · Tomorrow | hands | About |

**The order is run as an order.** The surface iterates the plan rather than
hand-placing ten elements, so §25.1 rule 1 and N14 — *drop chapters, never
re-order them* — cannot be broken by an edit.

### What was implemented

| File | Change |
| --- | --- |
| `src/config/tellings.ts` | New. The chapter plan for a telling: role, reason, and where a handed chapter is told whole |
| `src/app/page.tsx` | Home composed as the ten-chapter documentary. C1 and C3 told from the archive; the other eight handed on |
| `src/components/structure/chapter.tsx` | `CHAPTERS` is now `Record<Chapter, …>` and `ChapterId = Chapter` — the ten ids had been declared twice (here and in the image record), and one set expressed twice eventually disagrees (R7.1) |
| `src/config/index.ts` | Barrel follows |
| `scripts/check-content.ts` | Five assertions on the skeleton |

### Three removals, each required

**1. The four-stage "How it is made" block.** It lifted Hide selection,
Cutting, Assembly and Finishing onto Home from Manufacturing. R16.1's forbidden
column names it twice — *restate what another surface will establish*, *preview
a surface with content lifted from it* — and §25.1 rule 3 names the result: a
partial chapter is a highlight, a sequence of highlights is a trailer, and a
trailer is advertising. C3 replaces all four, told whole.

**2. Eight export markets.** `company.exportMarkets` was rendering US, GB, DE,
FR, AU, AE, CA and IT as a list of countries shipped to. §20.2 item 8
classifies these as Gating and states the response — *Export states process; no
markets are named* — and Brand Bible §19.2 removes rather than softens. **This
was a live publication of unconfirmed fact on the site's most-read surface.**

**3. Every photograph.** The Opening's hero frame, the held moment's frame, the
four stage frames and the category thumbnails were all generated placeholders.
Photography Direction §24.5 has no exception and MIB R14.4 predicts exactly this
failure. Home now renders its photographs from the archive or not at all, and
the archive holds none — so **Home currently carries zero images**.

### Two compositional decisions

**The surface opens on words; the chapter opens on the photograph.** The
`Opening` no longer takes a frame. Two openings carrying one each would spend
the same evidence twice, and §33.1 forbids the alternative — text over a
photograph — outright.

**The held moment is silence.** §23.4 permits one element or none, and R16.3
puts the site's one held moment on Home. The element would be a photograph the
archive can prove or a statement authored under Brand Bible §12; neither
exists, so the moment is a full viewport height of nothing, `aria-hidden`, with
zero children. That is the specified state, not an empty slot.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with five new assertions
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

**The skeleton was measured in both states.** The archive was temporarily given
complete records — two frames for C1, one for C3, and **one for C9, a handed
chapter** — the surface observed, and the probe reverted.

| Requirement | With no evidence | With evidence recorded |
| --- | --- | --- |
| **Chapter ordering** | — | `the-place` → `the-decision`, canonical, in document order |
| **Dependency behaviour** | 0 chapters render | C1 and C3 render |
| **Evidence selection** | — | 3 frames: 2 in C1, 1 in C3 |
| **C9 given evidence** | — | **does not render** — evidence alone does not make Home tell a handed chapter |
| **Zero placeholder rendering** | **0 images on the surface** | 3, all archive-recorded |
| **Partial-chapter trace** | **none** — no chapter slug appears at all | — |
| Accessibility | 1 `h1` | 1 `h1`; H1 → H2 → H3 with no level skipped; every image has alternative text and intrinsic dimensions; both chapters carry `aria-label` |
| Captions | — | 3, one per frame |
| Chapter break | — | **127.6px** — S6 interpolated at a 735px field (§23.1) |
| C3 opening | — | **the photograph is the chapter's first element** (§23.5 opening 1) |
| Bleed | — | **735px at a 735px field** — edge to edge (§31.3) |
| Rendered vs intrinsic ratio | — | 1.776 vs 1.780 — the canonical crop survives (§32.1, §22.4) |
| Held moment | 100svh, `aria-hidden`, **0 children** | same |
| Running animations · elements at opacity 0 | **0 · 0** | 0 · 0 |
| Border radius across the surface | `0px`, the only value | same |
| Actions in `main` | **1** — "Send us the specification" | 1 |
| Export markets named | **0** | 0 |

Probe reverted: **0 of 98 frames carry a chapter**, and `images:record --check`
confirms the archive is byte-for-byte unchanged.

### The new assertions

`check:content` now fails if the documentary drifts:

- Home declares **all ten** chapters, in canonical order (§25.1 rule 1, N14);
- Recognition is present — C3 or C7 — in the told set (§25.1 rule 2, §7.2);
- Home tells **exactly C1 and C3** (§16's evidence table, R16.1, R16.2);
- every row carries a reason;
- a handed chapter names where it is told whole, and a told chapter hands to
  nobody.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2 enforced by removal: eight unconfirmed markets are gone rather than hedged. §16.3 unaffected — no figure is set as rhetoric anywhere on the surface |
| **Creative Direction Book** | §20: Home does not explain itself, summarise the site, or open with a claim — the four-stage summary was the last of those and is gone. §22.1's announced opening is unavailable |
| **Documentary Storyboard** | §7's ten chapters all declared; §25.1 rules 1, 2 and 3 each enforced mechanically rather than by review; §8.5 — each told chapter is linkable alone at its own slug |
| **Photography Direction** | §24.5 satisfied on this surface for the first time: **zero placeholder images render**. §25 — the library is the argument, and the surface asks it rather than holding a list |
| **Motion Direction** | M1, M6, M13: nothing moves, nothing arrives on scroll, 0 running animations, 0 elements withheld at opacity 0 |
| **Visual Language Atlas** | §24: no call site chooses which photographs appear — the archive does, so nobody is tempted |
| **Visual Design System** | §23.1 measured at S6; §23.4's held moment is one element or none and currently none; §23.5 opening 1; §31.3 bleed; §32.1 ratio intact; §33.1 no text on a frame |
| **UX Blueprint** | §16's evidence table is the plan. R16.1 — every rendered passage proves rather than describes. R16.2 — Recognition is Home's and is not deferred. R16.3 — the held moment is here. R16.4 — no capability claim, no figure, no certification. R16.5 — one action, at the close. X8 as the default state |
| **Master Implementation Blueprint** | R5.2 and R5.3: the surface is chapters, not sections — the last generic "section" carrying an argument is gone. R11.1, R11.2, R11.3 in full. R20.2 item 8 discharged as a removal |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 1 |
| Files modified | 4 |
| Chapters declared on Home | **10 of 10** |
| Chapters told | 2 — C1 and C3 |
| Images rendered today | **0** |
| Unconfirmed facts removed from the surface | **8** (the export markets) |
| Copy authored | **0 sentences** |
| New `check:content` assertions | 5 |
| Publication findings | 241 → **241**, unchanged |
| Dependencies added / removed | 0 / 0 |

### What Home now waits on

| Chapter | Waits on |
| --- | --- |
| **C1 · The place** | Dependency 1 — frames of rooms in use at E5, and dependency 5 for any frame containing a person |
| **C3 · The decision** | Dependency 1 — **an E1 frame**, a decision being taken with a cost. Photography §5.2 rule 1: it cannot be arranged, only attended |
| The held moment | Dependency 1, or a statement under dependency 12 |
| Every word on the surface | Dependency 12 |

`npm run images:record` lists, per frame, exactly which of the seven things is
missing. Nothing else stands between the archive and a Home that tells both its
chapters.

### Stopping here

Home's documentary composition is complete: ten chapters declared, two composed,
eight handed on, none substituted. Manufacturing is not begun.

---

## Home · The documentary sequence — rhythm, silence and continuity

**Stage** 1, surface composition · **Status** complete · **Governing** Creative
Direction Book §17.1–§17.6 (rhythm, pacing, sequencing, transitions), §22.1–§22.5
(how a chapter begins, ends, and how breathing works) · Documentary Storyboard
§8.3, §8.4, §8.6, §12.1, §12.4, §17.3 · UX Blueprint §16, R16.3, E5 · VDS §23.1,
§23.4, §23.5, §23.6, §12.3, §17.3, §31.3, §33.1 · MIB R11.3

**No chapter was added, removed or re-ordered.** The skeleton is the approved
one. What changed is the order things arrive in and the intervals between them —
which Documentary Storyboard §12.4 puts outside its own scope and hands to
Creative Direction Book §17.4.

### The problem this package fixes

The skeleton rendered two chapters that were identical in manner and a surface
that ended in a stack. Four rules were being broken by the sequence rather than
by any one part:

| Broken | Rule |
| --- | --- |
| C1 and C3 opened the same way — a photograph, directly after text | §22.1 and §8.3: **the identical opening.** *When openings are uniform, chapters stop being felt as chapters and become sections in a stack* |
| Both chapters ended on a photograph — their loudest element | §22.2: *a chapter that ends on its loudest element has not ended. It has stopped* |
| C1 carried a route to About | §16 gives Home three routes — Manufacturing, Products, Enquiry. About is not one of them, and a route out placed before Recognition sends the visitor away before the surface has done its work |
| A second eyebrow, and the named place stated twice | §12.3: an eyebrow is **at most one per surface**, and the opening already names Kanpur. R7.1: the same fact in two places |

### The sequence, and the rule behind each move

Creative Direction Book §17.1: *an experience held at one level is perceived as
monotony.* §17.2: *a peak is a relationship between an element and its
neighbours, not a property of one.* §22.5: breathing is the alternation of
demand and release, irregular, and *the longest and most demanding passage earns
the longest release.*

| | Demand | Measured extent | Why here |
| --- | --- | --- | --- |
| Opening — words alone | low | 0.50 vh | The surface is entered by reading, so the first photograph competes with no title (§33.1) |
| **C1 · The place** | rising | 1.87 vh | Established, then examined (§17.3) |
| **Silence** | **none** | **1.00 vh** | §17.4 ranks silence the strongest transition available; §22.3 names it *the pause that makes the next statement land* |
| **C3 · The decision** | **peak** | 1.39 vh | Recognition, entered through the silence |
| The range | falling | 1.06 vh | E5, handed on plainly. §17.2: quiet passages are what make the good parts good |
| The close | low | 0.53 vh | One action, once (R16.5) |

**Inside a chapter, the same argument at a smaller scale: establish → examine →
annotate → release.** §17.3: *a sequence should establish before it examines* —
a detail with no established context is decoration — *and a sequence should
resolve*. The opening frame is the room at bleed; the frames after it are
bounded and nearer, which reads as *here is the place, now look at this detail
in it*. The words follow the photographs, because Brand Bible D1 makes
photography the argument and everything else the annotation. The continuation is
last, because §22.2 asks the closing demand to be smaller than the one before it.

### The three transitions, and what carries them

§17.4 ranks the available means and forbids the rest — *a rule, a border, a
label announcing a new section, or a change of background applied for variety.
These name the transition instead of producing it, and a named transition is an
admission that the structure did not communicate.*

| Boundary | Carried by | §17.4 rank |
| --- | --- | --- |
| Opening → C1 | Change of density and scale: words at reading measure, then a frame edge to edge | 3 and 4 |
| **C1 → C3** | **Silence — one full viewport height, empty** | **1, the strongest** |
| C3 → the range | Change of density: bleed photography to a record list | 3 |

Measured on the composed surface: **0 horizontal rules, 0 background changes —
every field is the same paper — and 0 labels announcing a section.**

### The held moment is spent on Recognition

VDS §23.4 permits one per surface and R16.3 puts the site's one on Home. It now
sits **immediately before C3** rather than after it, and that placement is
§23.5's fourth opening quoted exactly: *a held moment immediately preceding*.

So C3 is entered in a different **kind** from C1 — which §22.1 and §8.3 both
require — without a label, a rule or a tint doing the work.

§23.4's frequency condition is also now honoured rather than assumed: the held
moment exists *once per surface longer than three viewport heights*. With no
chapter told the surface is 2.1 vh and the moment **does not render**; with both
told it is 6.36 vh and it does. Silence on a short page is an empty screen, not
a held moment.

### C3 is the peak, and it is made so by its neighbours

§8.6 and §17.5: chapters are unequal, and the chapter carrying the most weight
occupies the most extent. Two levers were available without inventing evidence:

- **Scale.** C1's supporting frames are bounded to the annotation column; C3's
  run at bleed. Measured at a 735px field: C1's supporting frame 624px, C3's
  735px — the full field.
- **Isolation.** A full viewport of nothing precedes C3 and nothing else on the
  surface has that.

§17.2: *to create emphasis, weaken what is beside it.* The peak is a
relationship, not a claim C3 makes about itself.

### What was deliberately not spent

**The inverted field.** §23.6 calls it the strongest chapter marker available
and rations it to once per surface at one viewport height minimum, and
Recognition is what it would be spent on. It is unspent because §23.5's inverted
opening carries a **statement**, and a statement is copy — Brand Bible §12, MIB
R6.4, dependency 12. It is recorded here so the option is not lost.

The honest limit of the current differentiation: C1 and C3 both have a
photograph as their first rendered element, and what distinguishes their
openings is the viewport of silence between them. That is §23.5's fourth
opening, used as written — but the stronger differentiation stays available and
should be taken when the statement exists.

### The chapter handoff

Documentary Storyboard §12.1: a chapter owes the next one **one thing left
unaccounted for** — *the handoff is not a device, it is a debt*. C1 now ends
without resolving outward: no route, no summary, and the last thing on it is a
passage rather than an image. The debt itself is narrative and belongs to the
copy (dependency 12); what the composition can do is stop closing the chapter
off, and it now does.

§12.2's through-line — the object being made — carries continuity between C1 and
C3 as soon as both have frames: the hide is in the room, then it is being cut.

### Files modified

| File | Change |
| --- | --- |
| `src/app/page.tsx` | Recomposed as a sequence: the held moment moved before C3, chapter interiors reordered to establish → examine → annotate → release, C3's frames at bleed, C1's route out removed, the duplicated named place removed |

No component, model, schema or content file changed. No new file.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

Measured in both states — the archive was temporarily given complete records for
two C1 frames, one C3 frame and **one C9 frame (a handed chapter)**, the surface
observed at a 735 × 694 field, and the probe reverted.

| Requirement | With no evidence | With evidence recorded |
| --- | --- | --- |
| **Documentary rhythm** | 2.1 vh, no held moment | **0.50 → 1.87 → 1.00 → 1.39 → 1.06 → 0.53 vh** — demand rises, empties, peaks, falls |
| **Chapter ordering** | — | `the-place` → `the-decision`, canonical |
| **Dependency behaviour** | 0 chapters | C1 and C3 render; **C9 does not, despite having evidence** |
| **Publication behaviour** | 9 of 13 gates refuse | unchanged |
| **Zero placeholder publication** | **0 images** | 3, every one archive-recorded |
| **Accessibility** | 1 `h1` | 1 `h1`; H1 → H2 → H3 → H2, no level skipped; 0 images without alternative text; 0 without intrinsic dimensions; 3 captions for 3 frames; both chapters `aria-label`led |
| Silence | absent — surface under 3 vh | **694px = one viewport, 0 children, `aria-hidden`, 0 characters** |
| Scale contrast | — | C1 supporting frame **624px** · C3 frames **735px = full field** |
| Chapter break | — | **127.6px** — S6 interpolated at this field |
| C1 routes out | — | **0** |
| C3 routes out | — | 1 — `/manufacturing`, §16's primary |
| Rules, borders or background changes marking a transition | **0** | **0** — every field the same paper |
| Actions in `main` | 1 | 1 — "Send us the specification" |
| Running animations · elements at opacity 0 | 0 · 0 | 0 · 0 |

Probe reverted: **0 of 98 frames carry a chapter**, and `images:record --check`
confirms the archive is byte-for-byte unchanged.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | D1 expressed in the ordering: photography leads, words annotate. §19.2 unaffected — the removal of the duplicated named place took no fact off the site, since the opening already names it and the footer record carries the address |
| **Creative Direction Book** | §17.1 and §17.2: the surface is no longer flat — the demand curve rises, empties and peaks. §17.3: established before examined, and the sequence resolves. §17.4: the three transitions are silence, density and scale, and none is named. §17.5: the Recognition chapter is given the field. §22.1: openings differ in kind. §22.2: each chapter releases. §22.4: the silence is genuinely cleared — nothing in this system is sticky, so no persistent control shares the field. §22.5: release is irregular and proportional |
| **Documentary Storyboard** | §8.3 and §8.4 honoured at the composition level. §8.6: chapters unequal by extent and scale. §12.1: C1 no longer closes itself off. §12.4 respected — no chapter boundary is labelled |
| **Photography Direction** | §24.5 holds: zero placeholder frames render. §25: the archive still decides what appears |
| **Motion Direction** | M1, M6, M13: the transitions are structural, not animated. 0 running animations, 0 elements withheld at opacity 0. §17.6 is the same point from the other side — immersion is built by rhythm, not by effects |
| **Visual Language Atlas** | §24: nothing here is noticeable as a device. The strongest moment on the surface is an empty screen |
| **Visual Design System** | §23.1 S6 measured; §23.4 both the extent and the **frequency** condition; §23.5 openings 1 and 4; §12.3 one eyebrow per surface, restored; §31.3 bleed; §33.1 no text on a frame |
| **UX Blueprint** | §16's three routes now appear in order and only those three — Manufacturing at Recognition's close, Products at the hand-on, Enquiry at the action. R16.3: the held moment is Home's. R16.5: one action, last |
| **Master Implementation Blueprint** | R11.3: the held moment is a component with a position and a reason, not leftover space. R6.4: not one sentence authored |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 0 |
| Files modified | **1** |
| Chapters added, removed or re-ordered | **0** |
| Copy authored | **0 sentences** |
| Photographs introduced | **0** |
| Publication findings | 241 → **241**, unchanged |
| Surface extent, told | 6.36 vh · **untold** 2.1 vh |
| Dependencies added / removed | 0 / 0 |

### What Home still waits on

Unchanged and unmoved: **dependency 1** for C1's rooms in use and for C3's E1
frame — a decision being taken, with a cost, which Photography §5.2 rule 1 says
cannot be arranged, only attended — plus **dependency 5** for any frame
containing a person, and **dependency 12** for every word on the surface,
including the statement that would let the inverted field be spent on
Recognition.

`npm run images:record` lists what each frame still needs, per frame.

### Stopping here

Home's composition is complete: sequence, silence, density and hierarchy set
against the documents, and both states measured. Manufacturing is not begun.

---

## The Scene Composition Layer

**Stage** 1, surface composition · **Status** complete · **Governing**
Documentary Storyboard §9 (scene philosophy), §10 (scene hierarchy), §11 (scene
relationships), §8.4 · Photography Direction §5.1, §5.2, §22.5 · VDS §23.1,
§31.1, §31.3 · Creative Direction Book §17.3, §22.2 · Brand Bible D1 · MIB
R10.3, R10.5, R11.1, R2.6

### It is not a new component

MIB R10.3 closes the inventory at §11, §12 and §13, and **there is no "Scene"
entry**. Adding one requires the VDS §34.3 addition test and an amendment to
the blueprint, which is the Creative Director's to make and not a builder's.

So a scene here is a **shape and its rules**, not a component. R11.1 already
lists Chapter as a *Composite*; the scene is that composite's interior, and
`Chapter` composes it. R2.6: *what is built is decided; how it is built is not.*

R10.5 is satisfied on its own terms — the extraction is from need, not
anticipation. Two chapters on Home hand-assembled the same arrangement, and the
eight chapters of Manufacturing will need it.

### The five parts, and where each already exists

| Part | Already stated at |
| --- | --- |
| **Opening frame** | VDS §23.5 opening 1, §31.3 bleed · Documentary §8.3 — a chapter begins with a change, felt before it is understood |
| **Evidence frame** | Documentary §10 grades the scene; Photography §5.1 ranks the photograph. *The two are related and are not the same* (§5), so the layer reads the rank the archive records and never infers a grade from it |
| **Supporting frame** | Documentary §11.1 — the seven permitted relationships. Creative Direction Book §17.3 — sequence carries argument |
| **Annotation** | Brand Bible D1 — photography carries the argument, everything else annotates. VDS §12.2 — the caption is a specification |
| **Release** | Documentary §8.4 · Creative Direction Book §22.2 — a chapter ends by releasing: the last thing asked is smaller than the thing before it, and then space |

Nothing above was decided by this package. What it does is put each in one
place, so a chapter cannot be composed a second way on another surface.

### What the layer enforces

`sceneRefusal` holds every reason a chapter may not be told, each stated in the
words of the rule that refuses it (MIB R16.5). Three of §10.1's six rules are
facts about frames and are checkable; the other three are judgements about
scenes, and Photography §22.5 puts those with the person who was in the room.

| Refusal | Rule |
| --- | --- |
| No frame the archive can prove | §11.1 · §25.1 rule 3 · UX X8 |
| **Every frame a located view** | §10.1 rule 2 and Photography §5.2 rule 2 — no accumulation of E5 produces E2; §9.2 calls the result a mood piece, which *will be described as beautiful and will prove nothing* |
| **It opens on a record** | §10.1 rule 5, Photography §5.2 rule 3, N6 — a record never precedes the work it records |
| **The Recognition chapter holds no E1 frame** | §10.1 rule 3 and Photography §5.1 — Recognition is bought only with a decision being taken, and no accumulation of anything else will do |
| **Two adjacent scenes in the same relationship** | §11.3 — they are experienced as one long scene, and one long scene is where attention leaves |

§11.2's six forbidden relationships — hand against machine, before and after,
ironic juxtaposition, us against them, two scenes making the same point,
escalation for its own sake — are **absent from the type** rather than validated
against, which is the technique VDS §49 uses for a forbidden value.

§11.4 is expressed by the shape itself: *a production plan that lists scenes
without stating what each pair proves has planned a running order, not a story.*
A scene after the first carries a relationship or it is not a pair.

### A correction this package forced

The previous composition shrank C1's supporting frames to the annotation column
and kept C3's at bleed, to make Recognition the visual peak. **That was wrong.**
VDS §31.3 already governs presence: *bleed is the default for E1, E2 and E5;
bounded placement is the exception and a deliberate change of register — an E4
record or an E6 object.*

Presence follows the rank of the photograph, not the preference of the surface.
The layout was imposing a hierarchy the rank system already owns, and
Photography §22.5 is the reason that is not the layout's to do. `bleedsAtRank`
is now the single expression of §31.3 and no call site chooses.

C3 remains the peak by the means §17.2 actually names — *to create emphasis,
weaken what is beside it* — which here is the viewport of silence before it and
the extent it is given, not the width of its frames.

### Files

| File | Responsibility |
| --- | --- |
| `src/components/structure/scene.ts` | New. The scene shape, the seven relationships, `bleedsAtRank` (§31.3), `isEvidenceSet` (§31.1) and `sceneRefusal` (§10.1, §11.3) |
| `src/components/structure/chapter.tsx` | `Chapter` now takes `scenes` and composes them: opening frame, frames at the presence their rank requires, annotation after the frames, release last, S5 between scenes |
| `src/app/page.tsx` | C1 and C3 declare scenes instead of hand-assembling them; the hand-made scale contrast is gone |
| `src/components/structure/index.ts`, `src/types/index.ts` | Barrels follow |
| `scripts/check-content.ts` | Nine assertions on the layer |

No new dependency. No component added to the inventory. No content, model or
schema changed.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with nine new assertions
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

**Every refusal was tried, in the assertions and again in the running
application** — R9.2's technique applied to a composition rule: a rule nobody
has tried to break is a rule nobody knows works.

| Attempt | Result |
| --- | --- |
| A chapter with no frame | refused |
| A chapter of located views alone | refused — *a mood piece* |
| A chapter opening on a record | refused |
| The Recognition chapter without an E1 frame | refused |
| Two adjacent scenes in the same relationship | refused |
| A Recognition chapter holding an E1 frame | **told** |
| `bleedsAtRank` across E1–E6 | `true, true, false, false, true, false` — §31.3 exactly |
| An evidence set of 3 × E3 · of 2 · of mixed ranks | set · not a set · not a set (§31.1) |

Measured in the running application at a 735 × 694 field:

| Check | Archive can prove the chapters | Frames present but of the wrong rank | Archive empty |
| --- | --- | --- | --- |
| Chapters rendered | `the-place` → `the-decision` | **none** | none |
| Images rendered | 3 | **0** | **0** |
| C1 frame widths (E5 + E2) | **735, 735** — both at bleed, §31.3 | — | — |
| C3 frame width (E1) | **735** | — | — |
| Annotation after the frames | **yes** — D1 | — | — |
| Release last, and only on the final scene | `/manufacturing` | — | — |
| Held moment | 694px, 0 children | **absent** | absent |
| Surface extent | 6.28 vh | 2.1 vh | 2.1 vh |
| `h1` | 1 | 1 | 1 |

The middle column is the one that matters: **frames existed, were fully
recorded, and were still refused** — C1 held two located views and C3 held no
decision. The chapters are absent and the surface carries no image, which is
§9.2 and §10.1 rule 3 behaving rather than being remembered.

Probe reverted: 0 of 98 frames carry a chapter, and `images:record --check`
confirms the archive is byte-for-byte unchanged.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | D1 is now structural: the annotation cannot precede the frames, because the composition puts it after them |
| **Creative Direction Book** | §17.3 — the sequence establishes before it examines and resolves; §22.2 — the release is last, once, on the final scene; §13.2 — the hierarchy is steep because rank drives presence rather than a per-call choice |
| **Documentary Storyboard** | §9.1's definition is the shape; §9.2's view/scene distinction is the mood-piece refusal; §10.1 rules 2, 3 and 5 are mechanical; §11.1's seven relationships are the closed type and §11.2's six are unrepresentable; §11.3 is checked; §11.4 is the reason relationship exists as a field; §8.4 is the release |
| **Photography Direction** | §5's warning is respected — rank and grade are kept separate and no grade is inferred from a rank. §5.1 and §5.2 rules 2 and 3 are enforced. §22.5: composition stays with the person who was in the room, which is why the layout no longer sizes frames |
| **Motion Direction** | Not engaged. No animation exists or was added; 0 running animations on the composed surface |
| **Visual Language Atlas** | §24: no call site chooses a presence, a width or a fit any more |
| **Visual Design System** | §23.1 — S5 between scenes, S6 between chapters, taken from the break ranks rather than typed; §31.1 — the evidence set is 3–5 frames of one operation; §31.3 — presence follows rank, in one expression |
| **UX Blueprint** | X8 unchanged and now enforced one level deeper: a chapter is absent not only when frames are missing but when the frames present cannot carry its question |
| **Master Implementation Blueprint** | R10.3 respected — the inventory is untouched and no eleventh structural component exists. R10.5 — extracted from two existing needs. R11.1 — Chapter is the Composite the blueprint says it is. R2.6 — the technical means are the builder's. R16.5 — every refusal names the rule that refuses it |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | 1 |
| Files modified | 5 |
| Components added to the inventory | **0** |
| Scene rules enforced mechanically | **5 refusals + 2 presence rules** |
| New `check:content` assertions | 9 |
| Copy authored · photographs introduced | **0 · 0** |
| Publication findings | 241 → **241**, unchanged |
| Dependencies added / removed | 0 / 0 |
| Per-call choices removed | frame presence, frame width, `sizes`, annotation order, release position |

### What this makes possible

Manufacturing's eight chapters, when they are begun, are declarations of scenes.
The arrangement, the presence of every frame, the order of image and word, the
position of the release and the refusals are already decided and cannot be
decided differently on another surface — which is R7.1 applied to composition
rather than to values.

### Stopping here

The Scene Composition Layer is complete and both its states are measured.
Manufacturing is not begun.

---

## Home · The visible composition, measured against the system

**Stage** 1, surface composition · **Status** complete · **Governing** VDS
§10.1 (measure), §22.2 (the heading rule), §35.3, §47.5 (targets and reach),
§17.2 (contrast targets), §16.4, §29.2, §36.2 · UX Blueprint X8 · Brand Bible D1

**No abstraction, primitive, infrastructure or document was created.** Four
values on the rendered surface disagreed with the design system, and this entry
is those four measured, corrected and re-measured.

### What was off-spec, and by how much

| Measured | Required | Rule |
| --- | --- | --- |
| The T1 statement occupied **92%** of its field | *Statement (D, T1) — up to 3 lines, **≤75% of field*** | §10.1's measure table |
| Space above the T1 group **91px** against **31px** below — **2.9 : 1** | *At T1 the space above is at least **three times** the space below* | §22.2 |
| The continuation link measured **1169 × 22px** — the full field, underlined edge to edge | A link is the size of its label; the minimum interactive target is **44 × 44px** | §35.3, §47.5 |
| Record-row titles measured **90 × 22px** | **44 × 44px** minimum | §47.5 |
| Every record row reserved a **5fr image column** for a photograph that does not exist | *Surfaces are designed around the absence of images, never around stand-ins* | UX X8 |

The second is the sharpest of them, because `opening.tsx` already documented
the correct derivation — *the chapter break above (S6) against S3 below* — and
then overrode the chapter break down to S5 in the next line. **The component
contradicted its own stated reasoning**, and only measurement found it.

### The corrections

| File | Change |
| --- | --- |
| `src/components/ui/typography/typography.tsx` | The D and T1 ranks carry §10.1's cap. It applies from the reading breakpoint upwards: below it the field is narrower than the measure the rule protects against, and three quarters of a 375px field would break a headline into fragments — which is the second of the two failures §10.1 names |
| `src/components/structure/opening.tsx` | The `pt-s5` override removed, so the chapter break the `Section` already declares applies. 177 : 31 = **5.7 : 1** |
| `src/components/ui/action/action.tsx` | `Continuation` is the size of its label and reaches 44px. As a flex child it had been stretching to the field |
| `src/components/evidence/evidence-block.tsx` | A record's title link reaches 44px; and where **no** member of a set carries a frame, the pairing is not used at all and the records take the field |

Nothing else changed. No content, no model, no schema, no chapter, no
photograph, no sentence.

### Measured after, at 1280 × 900

| Check | Result | Required |
| --- | --- | --- |
| T1 width | 877px = **69% of field**, 1 line | ≤75%, ≤3 lines (§10.1) |
| Space above T1 : below | **177 : 31 = 5.7 : 1** | ≥3 : 1 (§22.2) |
| Interactive targets in `main` | **44, 44, 44, 48px** — none below | ≥44 × 44 (§47.5) |
| Continuation width | **80px** — its label | §35.3 |
| Record row content width | **1169px** — the field, no reserved column | X8 |
| Contrast, ink on paper | **15.13 : 1** | §17.2, above the legal minimum |
| Contrast, ink-secondary on paper | **7.64 : 1** | §17.2 |
| Focus ring | `2px solid` ink at 2px offset, `:focus-visible` | §16.4, §47.3 |
| Horizontal overflow | **none** | §45 |

At 375 × 812: the T1 cap correctly does **not** apply (`max-width: none`), no
target is below 44px, and there is no horizontal overflow.

### With the archive able to prove the chapters

The probe: complete records for two C1 frames (E5, E2) and one C3 frame (E1),
reverted afterwards.

| Check | Result |
| --- | --- |
| Frame widths at a 1280 field | **1280, 1280, 1280** — all at left 0. Bleed is exact, and no frame overflows the document |
| **Image dominance** | **36% of the surface's height is photography** — D1, expressed as a measurement |
| Rhythm, in viewport heights | **0.57 → 2.13 → 1.00 silence → 1.49 → 1.02 → 0.54** |
| Surface extent | 6.75 vh — past §23.4's three-viewport threshold, so the held moment is earned |
| Targets below 44px · running animations · horizontal overflow | **0 · 0 · none** |
| T1 width | 69% of field |

### With the archive empty — the state that ships today

| Check | Result |
| --- | --- |
| Chapters rendered | **0** — C1 and C3 absent, the other eight handed on |
| Images rendered | **0** |
| Held moment | absent — the surface is 2.1 vh, under §23.4's three-viewport condition |
| `h1` · actions in `main` | 1 · 1 |
| Contrast · targets · overflow | unchanged and passing |

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | D1 measured rather than asserted: with evidence present, photography is 36% of the surface's height and every word on it annotates a frame. §16.3: no figure is set as rhetoric |
| **Creative Direction Book** | §13.2: the hierarchy is steep — 45px serif statement against 15px sans records, with nothing in between competing. §17.2: the demand curve is unchanged and still peaks at Recognition |
| **Documentary Storyboard** | Untouched. No chapter added, removed, re-ordered or summarised |
| **Photography Direction** | §24.5 holds: zero placeholder frames render. §22.4: bleed is exact at every field, so no frame is re-cropped by the container |
| **Motion Direction** | M13, M6: 0 running animations; the only transition on any link is the mark class already in the system |
| **Visual Language Atlas** | §14 hierarchy is a kindness — the two corrections a visitor would actually feel are the heading that no longer runs the full field and the links that can be hit |
| **Visual Design System** | §10.1's statement cap implemented for the first time; §22.2's ratio restored at T1; §35.3 and §47.5 satisfied on every target in `main`; §17.2 exceeded; §29.2 respected — a field is a purpose, and an empty column is not one |
| **UX Blueprint** | X8 taken one level further: absence is designed around inside a record set, not only inside a chapter. R49.7: nothing carries meaning by hue |
| **Master Implementation Blueprint** | R10.3: no component was added. R4.1: four corrections, four files, no new mechanism. R3.4: every change carries the section that required it |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 4 |
| Abstractions, primitives or infrastructure added | **0** |
| Copy authored · photographs introduced · facts invented | **0 · 0 · 0** |
| Off-spec values corrected | **5** |
| Publication findings | 241 → **241**, unchanged |
| Dependencies added / removed | 0 / 0 |

### Remaining, and not this surface's to fix

The footer record's contact links measure 163 × 23px, below §47.5's 44px. The
footer is shared chrome approved at Package 005 and changing it inside a Home
package would edit a surface this entry is not composing. **Recorded as debt
against the chrome, with the measurement**, rather than fixed here.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

### Where Home stands

Every rule the documents state about this surface is now either satisfied or
measured and named. What remains is not composition:

| Missing | Dependency |
| --- | --- |
| C1's rooms in use, C3's E1 decision | **1** — access to a working shift |
| Any frame containing a person | **5** — the written consent process |
| Every word on the surface, and the statement that would let the inverted field be spent on Recognition (§23.6) | **12** — copy under Brand Bible §11–§12 |
| The two faces the type scale is measured for | **13** — typeface licensing |

Home is complete to the extent the library and the copy permit, which is what
§16's dependency note asks of it. Manufacturing is not begun.

---

# SURFACE 02 — MANUFACTURING

## The complete telling, composed

**Stage** 1 · **Status** complete, and **absent at render until dependency 1 is
satisfied** · **Governing** UX Blueprint §17 (R17.1–R17.7) · Documentary
Storyboard §7, §7.1, §7.2, §8.1, §10.1, §10.2, §25.1, N6, N14 · Creative
Direction Book §20 Manufacturing, §22.1, §22.3, §17.4 · Photography Direction
§5, §24.5, §18.1 · VDS §23.1, §23.4, §23.5, §31.3 · MIB R5.2, R5.3, R6.4,
R11.1, R17.4

Composed entirely from the approved Chapter, Scene and Evidence primitives. **No
component, primitive, abstraction or system was created.**

### Governing rules, verified before writing code

| Rule | Source | How it is satisfied |
| --- | --- | --- |
| The complete telling: C1–C10 in canonical order | §17 Purpose | `manufacturingTelling` — all ten `tells`, asserted in `check:content` |
| **The longest and most immersive surface in the brand** | R17.1 · CDB §20 | Measured at **17.4 viewport heights** with one frame per chapter |
| **The process is never compressed into a diagram, an icon row or an infographic** — *this removes the numbered-steps pattern from the surface entirely* | R17.2 | `ProcessSteps` no longer imported here. The eight operations are the annotations of the chapters whose questions they answer |
| Each chapter independently linkable and makes sense alone | R17.3 · X13 | Each renders at its own slug with its own `aria-label` |
| **Told whole or not at all** — a chapter with insufficient evidence is absent; *it does not appear as a heading with a sentence beneath it* | R17.4 · §25.1 rule 3 | `sceneRefusal`. With the archive empty, all ten are absent and no heading survives |
| Chapters are unequal, and C3 is the longest | R17.5 · N5 | See the finding below — this one is **not** satisfied, and cannot be by composition |
| **No chapter carries an action**; the surface's single action is at its close, after C10 | R17.6 | Measured: **0 actions inside chapters, 1 in `main`** |
| Equipment is named where it is used, elaborated on Technology, never celebrated here | R17.7 | The operations name what they use; no machine is given a passage |

### The mapping: operations to questions

§8.1: **a chapter is a change of question, not a change of place, subject or
operation** — *the operations are numerous, the questions are few.* The content's
eight stages resolve against §7.1's own descriptions:

| Operation | Chapter | §7.1 |
| --- | --- | --- |
| Hide selection | **C2** | The material entering, and the standard applied before any value is added |
| Design and pattern making | **none** | — |
| Cutting | **C3** | Cutting — where skill is consequential and invisible |
| Machine processing | **C4** | Skiving, forming, edges worked in stages |
| Assembly | **C5** | The stitch, the seam, the hardware |
| Finishing | **C6** | Burnishing, oiling — care after it stops being visible |
| Quality inspection | **C7** | The gate |
| Packaging | **C9** | Packing and dispatch |

**Design and pattern making answers none of the ten.** It is a real operation
and it is not a chapter; §25.1 rule 1 and N14 forbid an eleventh. It is not told
here, and that is recorded rather than resolved by forcing it into a chapter it
does not belong to.

C1, C8 and C10 carry no operation because their subjects are the place, the
record and the floor continuing. They are told by their frames.

### Three removals, each required

**1. The eight numbered stages.** R17.2 removes the pattern from the surface by
name.

**2. The hero photograph.** A generated placeholder; §24.5 has no exception.

**3. The prose body, and the close's sentence.** R5.3: a surface is chapters,
and prose belonging to no chapter has no level to live at (R5.2). The close's
sentence — *"Have a piece you want manufactured?"* — was authored in the page
file, which R6.4 does not permit.

The body removal also stopped a live publication of unconfirmed fact. It carried
**"roughly 40,000 pieces a month"** and **"Three lines run in parallel"** — both
Brand Bible §19.4 items, both reaching the surface. They were invisible to the
Register gate because **the gate reads frontmatter and not MDX bodies**.

> **Finding, recorded and not fixed here:** the Register gate's blind spot is
> the MDX body. Quality and Export still render theirs. Closing it is those
> surfaces' packages, or a gate package — not this one.

### A rule of mine that was wrong, found by composing C8

`sceneRefusal` refused any chapter whose first frame is an E4 record, citing
§10.1 rule 5 and N6. **C8's entire subject is the record**, so that refusal made
the chapter unbuildable on the one surface it belongs to.

N6 is the authority and it is about position **in the telling**: *every claim is
earned before it is made — no credential, no capability, no number arrives
before the work that justifies it.* By the canonical order, C8's records sit six
chapters behind the work they record; they are earned. What N6 forbids is a
record **opening the telling**.

The check is now scoped to the chapter the telling opens on, which each surface
derives from the archive rather than assuming to be C1. Two assertions cover it:
a telling opening on a record is refused, and a chapter whose subject is the
record is not.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with four new assertions
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

**Both states measured.** The archive was temporarily given one complete record
per chapter at the rank MIB §18.1 assigns each category, and reverted.

| Check | Shipping today | With the archive able to prove all ten |
| --- | --- | --- |
| Chapters rendered | **0 of 10** | **10 of 10** |
| Canonical order | — | **exact** — the place, what arrives, the decision, the shaping, the joining, the finishing, the gate, the record, what leaves, tomorrow |
| Surface extent | 1.0 vh | **17.4 vh** — the longest in the brand (R17.1) |
| Images · captions | **0 · 0** | 11 · 11 |
| Frames at full field | — | **11 of 11**, at 1280 and at 375 |
| Images without alternative text or dimensions | 0 | **0** |
| Caption wider than its image | — | **0** (§10.1) |
| Held moments on the surface | 0 — under three viewport heights | **1**, 900px, immediately before C3 (§23.4, §22.3) |
| **Actions inside chapters** | — | **0** (R17.6) |
| Actions in `main` | 1 | 1 |
| `h1` · heading levels | 1 | 1 · `H1 H2 ×10`, no level skipped |
| Chapter breaks | — | **177px at 1280, 96px at 375** — S6 (§23.1) |
| Numbered-step pattern | **absent** | absent (R17.2) |
| Unconfirmed facts published (40,000 · three lines · AQL) | **none** | none |
| Targets below 44px · animations · horizontal overflow | 0 · 0 · none | 0 · 0 · none |

### Two chapters refused themselves, correctly

The first probe gave every chapter one frame and **eight of ten rendered**. Both
absences were the rules working, not defects:

| Chapter | Why it refused | Rule |
| --- | --- | --- |
| **C1 · The place** | Its only frame was E5 | §10.1 rule 2 and Photography §5.2 rule 2 — no chapter may consist only of located views; no accumulation of E5 produces E2. MIB §18.1 asks the place for *E5, **and E2 where people are working*** |
| **C10 · Tomorrow** | Its frame carried no alternative text | UX R49.5 — there are no decorative images in this system, so a frame without a description is not evidence |

Adding an E2 to C1 and alternative text to C10's frame produced all ten. **The
probe was under-specified; the layer was right.**

### The finding this surface cannot fix

**R17.5 and N5 are not satisfied: C3 is not the longest chapter.** Measured with
one frame each — C3 **1.41 vh**, C1 1.98, C10 2.33, the rest 1.23–1.41. Extent
is decided by how many frames a chapter is given and by their aspect ratio, and
with one frame apiece the ten flatten to within half a viewport of each other —
which is exactly the failure R17.5 names: *a surface where all ten chapters are
the same length has flattened the argument.*

The composition cannot manufacture C3's extent, and forcing it would be the
layout imposing a hierarchy the archive owns — the same error corrected on Home
against §31.3. §10.2 states the remedy and it is a production instruction rather
than a code one:

> In any telling, G1 scenes are scarce, expensive to obtain, and the only ones
> that change a sceptic's mind. **Everything else in the production plan exists
> to make room for them.**

**C3 must come back from the shoot with more frames than any other chapter.**
Recorded here so the shoot is planned against it.

### On the openings

§22.1 and §8.3 require openings to vary in **kind**, not only in content. Of
§23.5's five, three are unavailable: `statement` and `inverted` both carry a
statement, which is copy (R6.4, dependency 12), and `column` is not expressible
in the Chapter as implemented — extending it is outside this package.

So nine chapters open on a photograph and C3 opens through the held moment
(§23.5's fourth). **With ten chapters that is thinner variation than §22.1
asks for**, and it is recorded rather than papered over: the remedy is the
statements, which arrive with dependency 12, and the inverted field §23.6
rations to one per surface is still unspent.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2: two unconfirmed figures left the surface with the prose that carried them. §16.5 — the process is the product — is what the ten chapters now are. R6.4: not one sentence authored; one was removed |
| **Creative Direction Book** | §20: *being walked through a working floor* — sequential, unhurried, and no longer a diagram. §22.3: silence precedes Recognition. §17.4: the transitions are silence, density and the S6 break; no rule, label or tint marks one |
| **Documentary Storyboard** | §7's ten in canonical order; §8.1's question-not-operation mapping is the reason the eight stages became seven chapters and one omission; §10.1's refusals fired twice and correctly; §25.1 rules 1 and 3 enforced; N6 corrected to its actual scope |
| **Photography Direction** | §24.5: zero placeholder frames render. §5.2 rules 1 and 2 enforced through the layer. §18.1's category-to-rank table is what the probe used, and it is what the shoot should deliver |
| **Motion Direction** | M1, M6: 0 running animations; nothing arrives on scroll |
| **Visual Language Atlas** | §24: the surface chooses nothing about its photographs — presence, order and inclusion are all the archive's |
| **Visual Design System** | §23.1 S6 measured at both fields; §23.4 one held moment, earned by a 17.4 vh surface; §23.5 openings 1 and 4; §31.3 presence follows rank; §10.1 no caption wider than its image |
| **UX Blueprint** | §17 in full except R17.5, which is named above with its measurement. R17.2, R17.3, R17.4, R17.6 verified by measurement. X8: absence is the composed state |
| **Master Implementation Blueprint** | R5.2 and R5.3: the surface is chapters — the last free-floating prose section is gone. R10.3: no component added. R11.1: told whole or absent |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 5 |
| Components, primitives or systems created | **0** |
| Chapters declared · told today | 10 · **0** |
| Copy authored · photographs introduced · facts invented | **0 · 0 · 0** |
| Unconfirmed facts removed from publication | **2** |
| New `check:content` assertions | 4 |
| Publication findings | 241 → **241**, unchanged |
| Dependencies added / removed | 0 / 0 |

### What Manufacturing waits on

| Chapter | Waits on |
| --- | --- |
| All ten | **Dependency 1** — E1 and E2 photography across ten chapters, *obtainable only during a working shift* (§17 Dependencies) |
| **C3** | An E1 frame, and **more frames than any other chapter** (R17.5, §10.2) |
| **C7** | Dependency 4 — whether a rejection can be **observed rather than arranged**. §17: if it cannot be, C7 is absent here and Quality loses its Recognition moment |
| Any frame with a person | Dependency 5 — the written consent process |
| Every word, and the statements that would vary the chapter openings | Dependency 12 |

`npm run images:record` lists what each frame still needs, per frame.

### Stopping here

Manufacturing is composed, both states are measured, and no further surface is
begun.

---

## Manufacturing · Constitutional completion

**Stage** 1 · **Status** complete · **Governing** Documentary Storyboard §10
(the grade table), §10.1, §10.2, §23.2, §7.1 · Photography Direction §5.1, §31.3
· VDS §10.1, §10.4, §23.2, §23.5, §29.2, §31.3, §36.3 · UX Blueprint R17.4,
R17.5, R17.6 · MIB R11.1

Reviewed against every locked document. **Three defects were found by
measurement, all three visible, all three in the composition layer rather than
in this surface.** No abstraction, primitive, infrastructure or system was
created; three existing components were corrected.

### 1. Two bleed frames met at 0px

The chapter separates frames by S4 and suppresses the space on the first
(§23.2). Where the opening consumed frame 0, the *next* frame inherited that
suppression — so a chapter with more than one frame put two full-bleed
photographs edge to edge with **no separation at all**, and the first frame's
caption sat stranded between two images it could belong to either of.

Measured before: gaps `0px, 37px`. After: `37px, 37px`.

The path had never been exercised: Home's C1 and every previous probe carried
one frame per chapter.

### 2. A record arrived at the presence of a decision

VDS §31.3 makes bounded placement *the exception and a deliberate change of
register — an E4 record or an E6 object.* `bleedsAtRank` had said so since the
Scene layer was built, and it was **inert**: a non-bleed frame rendered loose in
the section, which fills the field exactly as a bleed frame does.

Measured at a 1600px field before: C8's certificate **1600px**, identical to the
E1 decision that earned it. After: **480px, flush left at the field's edge** —
the record column `--container-record` that §10.1 sets and `imageSizes.record`
already delivered to.

**This is the only mechanism in the system that makes one chapter look unlike
another without a word being written**, and it was doing nothing.

### 3. A record was opening a chapter

The cause of (2) ran deeper. `Chapter` rendered the opening frame with `bleed`
hardcoded, so the rank rule never reached a chapter's first frame — and C8's
only frame is a record.

Documentary Storyboard §10's grade table settles it in three words:

> **G4 — Record.** What it can carry: *Trust, late. **Never an opening.***

So the chapter now opens on its first frame **only where that frame is one an
opening can be made of**. A record or an object is not, and it falls through to
the body at its own presence. Forcing it to bleed gave a certificate the
presence of the decision that earned it, which is N6 read backwards.

### What this fixed, measured

The surface was probed twice: once with one frame per chapter, once with an
archive weighted the way §10.2 requires — *G1 scenes are scarce, and everything
else in the production plan exists to make room for them.*

| Check | Uniform archive | Weighted archive |
| --- | --- | --- |
| Chapters told, canonical order | 10 of 10 | 10 of 10 |
| **Longest chapter** | C10, by aspect ratio | **C3 — the decision, 3.72 vh** (R17.5, N5) |
| Extents | 1.22–2.33 vh, flat | **1.18–3.72 vh, five distinct values** |
| **Chapters visually distinct from the rest** | **0** | **1 — the record, at 480px against 1600** |
| Surface extent | 17.4 vh | **18.1 vh** — the longest in the brand (R17.1) |
| Gaps between frames in a chapter | `0, 37` | **`37, 37`** |
| Caption wider than its image | 0 | **0** — the record's caption is 480, its image is 480 |

**R17.5 is now satisfied and was not before.** Last package recorded C3 as not
the longest and located the remedy in the shoot; with the archive weighted as
§10.2 asks, C3 *is* the longest without the layout forcing anything. The earlier
flatness was a property of a uniform probe, and that is now demonstrated rather
than assumed.

### Verified against the locked documents

| Objective | Result |
| --- | --- |
| Every chapter exists only because the Storyboard requires it | Ten rows in `manufacturingTelling`, each carrying §7.1's own description. Asserted in `check:content` |
| Chapter ordering | Canonical at every field width, asserted and measured |
| Evidence rules | §10.1 rules 2, 3 and 5 refuse; §5.1's E1 requirement refuses C3 without one; §31.3 governs presence |
| Transitions follow the documentary rhythm | One held moment (§23.4), before C3 (§22.3, §17.4). Chapter breaks S6 — **177px at 1280, 96px at 375**. No rule, border, label or background change marks a boundary (§17.4) |
| No chapter repeats another visually | The record is bounded; the rest bleed. Beyond that, variation is the archive's — §8.6 and §17.5 put weight in how much evidence a chapter is given, and the composition routes it |
| Typography and hierarchy | H1 + one H2 per annotated chapter, no level skipped. The chapter title is never rendered — CDB §22.1's announced opening stays unavailable |
| Spacing | S6 between chapters, S4 between frames, S2 image to caption, S4 frames to annotation |
| Semantic outline | `main` → `h1` → ten named regions. Three carry no heading — the place, the record and tomorrow — because no operation answers their question; they are named by `aria-label` |
| Accessibility | 0 images without alternative text or dimensions · 0 targets below 44px · 0 captions wider than their image · no horizontal overflow at 375, 1280 or 1600 · 0 running animations |
| Publication gates | 9 of 13 refuse, **241 findings — unchanged**. The surface adds nothing and publishes nothing |
| Placeholder thinking | 0 images render today; 0 unconfirmed facts; 0 authored sentences |

### Files modified

| File | Change |
| --- | --- |
| `src/components/structure/chapter.tsx` | Frames after a consumed opening are separated by S4; a bounded frame is bounded by the record column; a record may not be a chapter's opening |

That is the whole diff. Manufacturing's own page file was not touched — every
defect was in the layer beneath it, and fixing it there fixes Home and every
surface still to be composed.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

Probe reverted: 0 of 98 frames carry a chapter; the archive is byte-for-byte
unchanged.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | D1 unchanged and better served: the photograph's presence now follows what it can prove. §19.2: nothing published |
| **Creative Direction Book** | §13.2 — the hierarchy is steep: a record at 480 beside a decision at full bleed. §22.1's announced opening remains unavailable. §17.4's transitions are still silence, density and space |
| **Documentary Storyboard** | §10's grade table is now enforced at the one place it was being ignored — G4 never opens. §10.2's budget is what produces C3's extent, and it does. §23.2's S4 restored between frames |
| **Photography Direction** | §5.1's ranks decide presence, opening and refusal. §24.5: zero placeholder frames render |
| **Motion Direction** | Not engaged; 0 running animations |
| **Visual Language Atlas** | §24: the surface still chooses nothing about its photographs |
| **Visual Design System** | §31.3 is true of the rendering for the first time. §10.1's record column used where §10.1 puts it. §10.4: the bounded frame is flush left, not centred. §23.2, §23.4, §23.5 verified by measurement |
| **UX Blueprint** | R17.4 told-whole-or-absent; **R17.5 satisfied**; R17.6 measured at 0 actions inside chapters, 1 at the close |
| **Master Implementation Blueprint** | R10.3: no component added. R11.1: the chapter is absent, never partial. R3.4: every change carries the section that required it |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | **1** |
| Components, primitives or systems created | **0** |
| Defects found by measurement · fixed | **3 · 3** |
| Copy authored · photographs introduced · facts invented | **0 · 0 · 0** |
| Publication findings | 241 → **241**, unchanged |
| Dependencies added / removed | 0 / 0 |

### What Manufacturing waits on

Unchanged, and all of it the client's:

| Chapter | Waits on |
| --- | --- |
| All ten | **Dependency 1** — E1 and E2 photography across ten chapters, obtainable only during a working shift |
| **C3** | An E1 frame, and more frames than any other chapter (R17.5, §10.2) |
| **C7** | **Dependency 4** — whether a rejection can be observed rather than arranged. If it cannot, C7 is absent here and Quality loses its Recognition moment |
| Any frame with a person | **Dependency 5** |
| Every word, and the statements that would vary the chapter openings (§23.5) | **Dependency 12** |

One item remains recorded and unfixed, because it belongs to other surfaces:
**the Register gate reads frontmatter, not MDX bodies**, and Quality and Export
still render theirs.

### Stopping here

Manufacturing is constitutionally complete: every rule the documents state about
it is satisfied, or measured and named with the dependency that answers it.
Products, Quality and Export are not begun.

---

# SURFACE 03 — PRODUCTS

## A catalogue of capability, composed

**Stage** 1 · **Status** complete · **Governing** UX Blueprint §19 (R19.1–R19.7),
R38.4, R39.3, R39.8 · Documentary Storyboard §7.1 C6, §7.4, §25.1 rule 3, L10 ·
Photography Direction §24.4, §24.5, §31.1, §31.3 · VDS §12.3, §36.1, §36.2,
§39.1, §47.5 · MIB §12.1, R6.4, R7.1

Composed from the existing system across all three levels §19 fixes — category,
sub-category, product record — plus the index. **No component, primitive,
infrastructure or system was created.**

### The plan

§19: *to show the breadth of what the company can make, **as a catalogue of
capability rather than an inventory of stock**.* Question: **"What can you
make?"**

`productsTelling` declares all ten and **tells one — C6, finished work,
unretouched**, which is §19's own evidence row and the only chapter that answers
the question with something observed rather than listed. The other nine are
handed on.

§7.4 is why the range itself is not a chapter: **the offer is not one** —
*there is no chapter that sells.* The three levels are records (§36.2), and
C9 goes to Export rather than being told twice, because the label fact §19 cites
is a specification a product record states, not a second telling of a chapter
(§25.1 rule 3, L10). Asserted in `check:content`.

### The catalogue behaviours removed

| Removed | Rule |
| --- | --- |
| **"3 products across 2 categories"** — the index's opening sentence | **R19.1: no counting of items.** Its first named prohibition |
| **"3 products", "2 products"** — the eyebrow above the category and sub-category lists | R19.1, again. Twice more |
| **"all available for private label production"** | A capability claim authored in a page file (R6.4, Brand Bible §19.2) |
| **Four different close sentences** — *"Not seeing what you need?"*, *"Enquire about western tack"*, *"Every piece here can be produced under your brand."*, *"Request a sample"* | R6.4, and **R39.8 fixes the action's wording for the whole site**. The last was a second ask in different words |
| **"Categories", "Browse by type", "{Sub-category} we manufacture", "Specifications"** and the eyebrows "Our range", "Category" | Authored in page files (R6.4). §12.3: at most one eyebrow per surface |
| **Category, sub-category and product thumbnails in the record lists** | Generated placeholders (§24.5) — and a row of pictures beside names is the product grid this surface may never become (§36.1) |
| **The two-column product gallery** | §31.1: *two photographs of equal weight halve each other, and comparison is a shopping behaviour.* The one exception is an E3 set, which a product's views are not |
| **`Gallery` on the product record** | MIB §12.1 scopes the Gallery item to **Gallery only** (R23.3). The editorial image is §12.1's entry for a photograph carrying its record |
| **The short description, stated twice** on the product record | L10: one fact, stated once — the second is deleted, not moved |

### The one that mattered most: a product record retelling Manufacturing

`one-ear-headstall.mdx` carried two sections — **"How it is made"** and
**"Finishing"** — that restate Manufacturing's C3 and C6 almost word for word:
*cut along the backbone, where the fibre structure is tightest*, and *bevelled,
sanded and burnished in three passes with a waxed slicker.*

§19's relationship note says each level *links up to its parent and **across to
the manufacturing chapter that produced the work***. Across, not into. L10 and
R7.1 say the rest: one fact stated once, and a reference is always preferable to
a copy.

**116 words across two sections removed**, and a route across to Manufacturing
put in their place. *"Customisation"* — what varies — stayed: R19.3 requires a
product record to state exactly that. The other two products' bodies were read
and kept; *Construction*, *Private label*, *Fit* and *Buckstitch* are about
their own pieces, not about the floor.

The route goes to the surface rather than to a named chapter because no product
references one. Which chapter produced a given piece is a fact for the content
model at §43.2, not for a page file to decide.

### Two accessibility defects, both on this surface family

**The breadcrumb.** Four adjacent links at a caption line box of **19px** —
against §47.5's 44 × 44 minimum, and precisely the case its rationale names:
*below roughly 44px, error rates rise sharply for anyone whose hands are not
steady.* The breadcrumb is Products-only (R38.4), so it is this package's. Now
**44px each**.

**Two eyebrows on the product record** — the sub-category above the title and
the item code below it. §12.3 allows one. The breadcrumb already states the
location, so the item code is the one that stayed.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with three new assertions
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 241 findings — unchanged
```

Measured across all four levels, shipping today:

| Check | /products | category | sub-category | product record |
| --- | --- | --- | --- | --- |
| Item counts | **none** | **none** | **none** | none |
| Price · cart · stock · availability | none | none | none | **none** |
| Images rendered | **0** | **0** | **0** | **0** |
| Multi-column image sets | 0 | 0 | 0 | **0** |
| `h1` | 1 | 1 | 1 | 1 |
| Actions, and their wording | 1 · "Send us the specification" | same | same | same |
| Route up | yes | yes | yes | yes |
| Route across to Manufacturing | — | — | — | **yes** |
| Manufacturing retold | **no** | no | no | **no** |

With the archive able to prove finished work — three E6 frames on a product
record, probe reverted:

| Check | Result |
| --- | --- |
| Frames | 3, **in sequence, none side by side** (§31.1) |
| Presence | **624px, bounded** — E6 is an object, and §31.3 bounds it |
| Gaps between frames | 61px, even |
| Captions · images without alternative text | 3 · **0** |
| Eyebrows on the surface | **1** (§12.3) |
| Targets below 44px | **0** — breadcrumb links now 44px each |

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2: the private-label capability claim is gone. §11.2's `quality` rule: no product record claims quality — R19.4 holds because the records state what they are made of and nothing about how good it is |
| **Creative Direction Book** | §20 Products — *a catalogue of capability, not an inventory of stock; never counting items, never behaving like a store, never presenting products as objects of desire.* The counting, the thumbnails and the comparison grid were the three mechanisms that made it one |
| **Documentary Storyboard** | §7.4: the offer is not a chapter, and the range is not composed as one. §7.1 C6 is the single chapter told. L10 applied to a whole passage for the first time |
| **Photography Direction** | §24.5: zero placeholder frames across four levels. §31.1: comparison removed. §31.3: an object is bounded, and now visibly so |
| **Motion Direction** | Not engaged; nothing here moves |
| **Visual Design System** | §36.1 no card grid; §36.2 the record row; §39.1 a table names itself by its columns; §12.3 one eyebrow per surface; §47.5 every target at 44px |
| **UX Blueprint** | R19.1 through R19.7 verified by measurement. R19.6: the product record ends at Enquiry, and it is the only deep surface that does. R38.4: the breadcrumb stays Products-only. R39.3 and R39.8: one action, one wording, four surfaces |
| **Master Implementation Blueprint** | §12.1 respected — the Gallery item left the surface it does not belong to. R6.4: eleven authored strings removed, none written. R7.1: the cross-link replaces the copy |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 7 (four routes, the breadcrumb, the tellings, the content check) |
| Content edited | **1 product body** — 116 words of Manufacturing, removed |
| Components, primitives or systems created | **0** |
| Authored strings removed | **11** |
| Copy authored · photographs introduced · facts invented | **0 · 0 · 0** |
| Publication findings | 241 → **241**, unchanged |
| Dependencies added / removed | 0 / 0 |

### What Products waits on

| Level | Waits on |
| --- | --- |
| C6 on the index, and every product's frames | **Dependency 1** — finished-work photography at E6 and E5, and §19's note that *a category surface of small images is decoration* |
| Lead time and minimum order quantity | **Dependency 3** — R19.5 keeps MOQ unpublished until confirmed; the category surface states that quantities are agreed per order, which is content's to write |
| Which manufacturing chapter produced a given piece | The content model at §43.2 — a product carries no stage reference today |
| Every word | **Dependency 12** |

### Stopping here

Products is composed across all four of its levels, and the catalogue behaviours
the constitution forbids are gone. Quality is not begun.

---

# SURFACE 04 — QUALITY

## The evidence surface, composed

**Stage** 1 · **Status** complete · **Governing** UX Blueprint §20 (R20.1–R20.6),
R39.3, R39.8 · Brand Bible §19.2, §19.4, §21, §11.2 · Creative Direction Book §20
Quality · Documentary Storyboard §7.1 C2/C7/C8, §7.2, §21.1, §21.2, §21.4, §25.1
rules 1–3 · Photography Direction §5.1, §24.5, §31.3 · VDS §23.4, §23.5, §31.3 ·
MIB R5.2, R5.3, R6.4, R11.1, R12.1, R20.4, dependencies 1, 3, 4, 7, 12

Composed from the existing documentary system. **No component, primitive,
infrastructure or system was created.**

### The plan

§20: *to show that the standard is applied, that it costs something, and that
somebody outside the company has checked — **in that order***. Question: **"Why
should I believe you?"**

`qualityTelling` declares all ten and **tells three** — the three rows of §20's
own evidence table, each already a chapter of the canonical set:

| Chapter | §20's row | Rank |
| --- | --- | --- |
| **C2** What arrives | The first gate, at the door | 1, 2 |
| **C7** The gate | **A rejection: something refused** | **1** |
| **C8** The record | Records produced during the work | 4 |

**C7 is this surface's Recognition moment, not C3** — §7.2's reserve, spent here
by R20.2: *a gate shown passing things is a formality; a gate shown refusing
something is a threshold with a cost.* §21.2 is why that is the whole argument:
a rejection proves at once that a threshold exists, that it has a location, that
somebody is authorised to apply it, and that applying it outranks the piece.
None of the four can be claimed in words.

The other seven are handed on, each naming where it is told whole. §12.1 permits
exactly this: the process chapter exists *on Manufacturing, and extracted to
Technology, Products, Quality, Export*. Extraction is not a second telling —
Manufacturing asks C7 *what happens to something that is not right*; Quality asks
the same chapter *why should I believe you*, and only three of the ten answer it.
Asserted in `check:content`.

### What was removed, and by which rule

| Removed | Rule |
| --- | --- |
| **The four numbered inspection gates** (`ProcessSteps`) | **R20.3**: the inspection gate count is Brand Bible §19.4. A numbered sequence of four publishes it whether or not a figure is typed. **R5.2** refuses the shape as well — the level between a surface and a component is a chapter, not a section somebody put a heading on |
| **"AQL 2.5"**, and the step title *Final AQL inspection* | §19.4, and R20.3 names the AQL band by name. Sampling **as a mechanism** stayed: R20.5 requires stating *what is checked by sampling rather than by unit* |
| **"Every order passes four documented checks"** — the summary, rendered in the Opening | §19.4 again, spelled rather than numbered. The Register gate reads digits and missed it |
| **"Four gates, one written report"** — the subtitle | §19.4. Rendered nowhere, scanned by the gate, and a governed fact either way |
| **The hero photograph** | A generated placeholder; Photography Direction §24.5 has no exception |
| **The prose body** | **R5.3**: a surface is chapters, and prose that belongs to no chapter has no level to live at. It also carried *"we will not ship a piece we would not accept ourselves"* — an unqualified quality claim (Brand Bible §11.2) — and *"records… kept current and available on site"*, a capability claim with no evidence beneath it (E1) |
| **"Book an inspection"** — the close's sentence | Authored in a page file (R6.4); R39.8 fixes the action's wording site-wide |

### What is absent, and is the argument

**No certification record appears.** R20.1: *never lead with badges — a row of
certification marks at the top of this surface is the single most damaging
arrangement available to it.* R20.4 requires issuer, reference and date, and MIB
dependency 7 holds all four including scope. The register's instruction for this
surface is already written: *Quality states mechanism; no marks appear.* The two
entries in the company record — ISO 9001:2015 and LWG Gold — are classified
authored and are published nowhere on this surface.

**The gate refuses itself.** C7 is passed `isRecognition`, so §10.1 rule 3 and
Photography §5.1 apply: Recognition is bought only with a decision being taken,
and without an E1 frame the chapter renders nothing. That is MIB dependency 4 —
*whether a rejection can be observed rather than arranged* — expressed as code
rather than as a note, and it produces exactly the state the register predicts:
**Quality carries C2 and C8 only, and says so honestly.**

**The limit statement is absent.** R20.5 puts the limits on this surface — what
is not tested, what is not certified, what is checked by sampling rather than by
unit — and no document states them. §12.1 places it inside the chapter whose
capability it qualifies rather than on a surface of its own, which is where it
will arrive: C7's release (§8.4). Inventing one would be the thing the surface
exists to refuse.

### A defect found while composing, and fixed on two surfaces

**The held moment was asked of the surface, not of the chapter.** Both
Manufacturing and Quality computed *does any chapter still tell?* and, if so,
placed the held moment before the Recognition chapter. Quality is the first
surface where those two questions can disagree — C7 refuses without a rejection
while C2 and C8 tell — and the result was **silence before nothing**: §23.5's
fourth opening standing where the chapter is not.

Measured, with three probe frames in the archive and C7's downgraded to E4:

| | Before | After |
| --- | --- | --- |
| Sections | Opening · C2 · **held 694px** · C8 · Close | Opening · C2 · C8 · Close |
| Held moments before an absent chapter | **1** | **0** |

Now asked of the chapter itself on both surfaces. R11.1's *never removed to fit
content; the content is removed instead* runs the other way too: when the content
is absent, so is the space held for it. Manufacturing renders identically today —
all ten of its chapters are absent — so the fix is behaviour-preserving now and
correct when the archive fills.

**Manufacturing's summary carried an inspection gate count.** *"…the same
eight-stage route through our facility — **with an inspection gate at the end of
each one**"* states that there are eight, which is Brand Bible §19.4, and it is
rendered in the Opening on a completed surface. The clause is removed. The stage
count is not a §19.4 fact and stands.

**The Register gate's blind spot, recorded as build-owned debt.** Its markers for
the gate count match digits, so *"four documented checks"* and *"an inspection
gate at the end of each one"* both passed it. Two of the three §19.4 leaks found
in this package were spelled, not numbered. The markers belong to the Facts
Register rather than to this surface, and widening them is not Quality's package.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with four new assertions
npm run build                             ✓ green — 33 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 240 findings (was 241)
```

Measured on `/quality`, shipping today:

| Check | Result |
| --- | --- |
| `h1` | 1 |
| Eyebrows | **1** (§12.3) |
| Images rendered | **0** — the archive holds no frame for C2, C7 or C8 |
| Certification marks · badges · logos | **0 · 0 · 0** (R20.1) |
| Numbered gate sequences | **0** (R20.3) |
| Governed facts on the surface | **0** — AQL band and gate count both withheld |
| Actions, and their wording | 1 · "Send us the specification", 48px (R39.3, R39.8, §47.5) |
| Chapters rendered | **0** — absent, not partial (R11.1, §25.1 rule 3) |

With the archive able to prove all three chapters — probe frames at C2/E2,
C7/E1, C8/E4, reverted after measurement:

| Check | Result |
| --- | --- |
| Sections, in order | Opening · **What arrives** · held 694px · **The gate** · **The record** · Close |
| Chapter order | C2 → C7 → C8, canonical, never re-ordered (§25.1 rule 1) |
| Presence by rank | E2 **bleed 735px** · E1 **bleed 735px** · E4 **bounded 480px** (§31.3) |
| Held moments | **1**, immediately before C7 (§23.4, R11.1) |
| Consecutive chapter openings | photograph → **held** → photograph (§6.4) |
| Captions · images without alternative text | 3 · **0** |
| Horizontal overflow | none, at 735px and at 1280px |

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2: three §19.4 facts left the content layer — the AQL band, and the gate count twice. §19.4: nothing unconfirmed is softened, it is removed. §11.2's `quality` rule: the surface is titled Quality Assurance and makes no unqualified quality claim; §21's row for this page — *third-party audit before self-description* — is honoured by publishing neither yet |
| **Creative Direction Book** | §20 Quality — *somebody outside this building checked, and here is what they checked; never lead with badges, never assert quality before demonstrating inspection.* Sober and evidential, and now literally **the least decorated page in the brand**: one eyebrow, one statement, one passage, one action |
| **Documentary Storyboard** | §7.2: C7 as Recognition's reserve, spent here rather than on C3. §21.1: no credential occupies the opening. §21.2: the rejection is the mechanism, and the chapter refuses itself without one. §25.1 rules 1–3: ten declared, three told, none re-ordered, none partial |
| **Photography Direction** | §24.5: the placeholder hero is gone; zero frames render. §5.1: Recognition needs E1 and nothing else will do. §31.3: proved by measurement — the record is bounded where the gate bleeds |
| **Motion Direction** | Not engaged; nothing here moves |
| **Visual Design System** | §23.4 the held moment, now conditional on the chapter it holds for; §23.5's five openings, two used and alternating; §31.3 presence follows rank; §12.3 one eyebrow; §47.5 the action at 48px |
| **UX Blueprint** | R20.1 no badges; R20.2 the rejection is the argument; R20.3 mechanism before figures, in a structure that already holds them; R20.4 no certification record without issuer, reference and date; R20.5 the limits belong here and are withheld rather than invented; R20.6 the least decorated surface. R39.3 and R39.8: one action, the site's wording |
| **Master Implementation Blueprint** | R5.2/R5.3: the numbered sequence and the orphan prose both left, because neither is a chapter. R6.4: two authored strings removed, none written. R11.1: absent, never partial. R12.1: the limit statement stays inside the chapter it qualifies. Dependencies 4 and 7 are visible in the built surface rather than recorded as intentions |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 7 (the surface, Manufacturing, the tellings, the config barrel, the content check, two content files) |
| Components, primitives or systems created | **0** |
| Content edited | **2 frontmatter files** — three §19.4 facts removed |
| Authored strings removed | **2** |
| Copy authored · photographs introduced · facts invented | **0 · 0 · 0** |
| Publication findings | 241 → **240** |
| Dependencies added / removed | 0 / 0 |

### What Quality waits on

| Level | Waits on |
| --- | --- |
| C2, C7 and C8 — every frame | **Dependency 1** — access to a working shift |
| **C7 at E1: a rejection observed rather than arranged** | **Dependency 4**, gating. Until it is discharged the surface carries C2 and C8 and loses its Recognition moment |
| Certification records — issuer, reference, date, scope, exclusions | **Dependency 7**, gating. Until then no mark appears, in any position |
| The AQL band, the gate count, the rejection rate | **Dependency 3** — the structure holds them; the figures are not typed |
| R20.5's limits, and every word | **Dependency 12** |

### Stopping here

Quality is composed, and it is composed as the evidence surface rather than as a
certification page: three chapters, a Recognition moment that refuses itself
until a rejection can be shown, and no badge anywhere on it. Export is not begun.

---

# SURFACE 05 — EXPORT

## The one-chapter surface, composed

**Stage** 1 · **Status** complete · **Governing** UX Blueprint §21 (R21.1–R21.5),
§13.1 the evidence ladder, R39.3, R39.8 · Brand Bible §19.2, §19.4, §21 Export ·
Creative Direction Book §20 Export · Documentary Storyboard §7 C8/C9, §7.1,
§7.4, §10.1 rule 5, §11.1, §22.3, §25.1 rules 1–4, §25.2 · Photography Direction
§5.2, §24.5, §31.3 · VDS §6.4, §12.3, §23.4, §23.5, §31.3 · MIB R5.2, R5.3,
R6.4, R8.7, R11.1, R18.1, R19.1, dependencies 1, 3, 8, 12, 20

Composed from the existing documentary system. **No component, primitive,
infrastructure or system was created.**

### The plan

§21: *to show that goods leave correctly, documented, to markets already served —
**presented as logistics competence rather than as reach***. Question: **"Can you
ship to me?"** Creative Direction Book §20: *competent logistics, calmly
handled*, and **unglamorous by design — logistics competence should look like
logistics competence.**

`exportTelling` declares all ten and **tells one**:

| Chapter | §21's row | Rank |
| --- | --- | --- |
| **C9** What leaves | Packing and dispatch as an operation | 5, 2 |

MIB R19.1 is the whole of it: *What leaves (C9) → Export. **Dispatch as an
operation is the whole argument of the surface.*** §25.1 rule 4 names that shape
rather than treating it as a shortfall — *the shortest telling is one chapter
containing one scene; below that, make nothing.*

### Why C8 is handed on, and not told here

§21's evidence table cites **C8** for *the documents issued, and who issues
them*, which reads like a second chapter. It is not one, and three independent
rules say so:

- **§7's own chapter table gives C9 the grade "process and records."** The
  documents that leave with the goods are inside the chapter about the goods
  leaving. Lifting them out builds a record chapter whose subject is already
  spoken for.
- **Quality tells C8 whole** — *records produced during the work* (UX §20). The
  same records told again is one fact stated twice (L10) and a chapter told
  twice (§25.1 rule 3). §21's own relationship line puts it the other way round:
  Export is *linked from Quality (the record)*, not a second telling of it.
- **N6 refuses it outright.** C8 precedes C9 canonically, so on a surface
  carrying both it is the chapter the telling opens on — and §10.1 rule 5
  refuses a telling whose first frame is a record, *before any work has been
  shown*. **Export cannot open on its paperwork.** Measured below.

Recognition is neither C3 nor C7 here, and is not dropped. §25.1 rule 2 governs
**a telling**; §25.2 gives *the website* C1–C10 complete across its surfaces, and
§7.2 spends Recognition where it belongs — C3 on Home and Manufacturing, C7 on
Quality. Export is a supporting extraction (§21), the same standing Products has
with C6. Asserted in `check:content`.

### What was removed, and by which rule

| Removed | Rule |
| --- | --- |
| **The four-step order ladder** (`ProcessSteps`, *"How an order runs — from enquiry to dispatch"*) | **§7.4**: *the offer — there is no chapter that sells.* **R5.2** refuses the shape as well: the level between a surface and a component is a chapter, not a numbered sequence. Three of the four steps stated a lead time or a reply time, the fourth an AQL band and an incoterm (§19.4, R21.3), and its first clause restated Quality's final inspection |
| **`eyebrow: Global supply`** | **R21.1** and Creative Direction Book §20 — *never dramatise reach*. With dependency 8 outstanding, a claim of global supply is the market record asserted as an adjective. §12.3 makes the eyebrow *at most* one, never at least one |
| **`subtitle: Shipping to eight markets, documented in-house`** | **Dependency 8** — *Export states process; no markets are named.* A count is the record stated as a number. Rendered nowhere, scanned by the gate, and a governed fact either way |
| **"…and shipping on FOB, CIF or EXW terms by sea and air"** — the summary, rendered in the Opening | **R21.3**, §19.4. Terms are agreed per order and are not published until confirmed |
| **"40,000 pieces a month, FOB/CIF/EXW shipping and in-house export documentation"** — the SEO description | §19.4 twice over, published in metadata. The capacity figure is spelled rather than punctuated and the Register gate's markers do not read it — the same blind spot the Quality package recorded |
| **The hero photograph** | A generated placeholder; Photography Direction §24.5 has no exception |
| **The prose body** | **R5.3**: a surface is chapters, and prose that belongs to no chapter has no level to live at. It also named **eight countries**, which is the whole of dependency 8, alongside a capacity figure and an MOQ |
| **"Ready to place an enquiry?"** — the close's sentence | Authored in a page file (R6.4); R39.8 fixes the action's wording site-wide |

### What is absent, and is the argument

**No market is named and no reach is drawn.** R21.1: *no maps, globes, arcs,
aircraft or animated route lines. Markets are a record.* R21.4: a country is a
record on this surface, never a surface of its own. Dependency 8 holds the
record — the standing answer stays in the company record, where the confirmation
sheet asks for it — so the surface states process, which is the instruction the
register already carries.

**No incoterm and no lead time.** R21.3: not published until confirmed
(dependency 3). §21 asks the surface to state instead *that terms are agreed per
order and what information is needed to agree them* — a statement about process,
which is copy, which is dependency 12.

**No failure path.** R21.5 puts it here — *what happens if a shipment is held or
documentation is queried* — and calls it *the reason an importer believes the
rest* (rank 6). No document states it. §12.1 places a limit inside the chapter
whose capability it qualifies, which is where it will arrive: C9's release
(§8.4). Inventing one would be the failure the surface exists to refuse.

**No named person.** §21's rank-7 row — *a named person responsible for a
shipment* — waits on dependency 20.

**No annotation on C9.** The only step describing dispatch led with Quality's
final inspection and ended on an incoterm, and this surface may neither repeat
Quality (L10) nor state a §19.4 term. §21's rank-2 row — *packing and dispatch as
a mechanism described precisely enough to be checked* — is therefore the largest
single thing Export still owes, and it is dependency 12.

### A constitutional defect found while composing, and fixed

**Manufacturing published an AQL band.** Its *Quality inspection* step read
*"Final AQL inspection against the approved sample"*, rendered as C7's annotation
on a completed surface. The Quality package removed the identical string from
`quality.mdx` and did not scan the sibling document; the Register gate reported
it, and it is removed here by the rule that removed it there (§19.4 — removed,
not softened). The mechanism stands: *final inspection against the approved
sample.*

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with four new assertions
npm run build                             ✓ green — 33 pages prerender, /export static
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 236 findings (was 240)
```

Measured on `/export`, shipping today:

| Check | Result |
| --- | --- |
| `h1` | 1 |
| Eyebrows | **0** (§12.3: at most one) |
| Images rendered | **0** — the archive holds no frame for C9 |
| Maps · globes · route illustrations | **0 · 0 · 0** (R21.1) |
| Markets named | **0** (R21.2, R21.4, dependency 8) |
| Governed facts on the surface | **0** — incoterms, lead times, capacity and market count all withheld |
| Actions, and their wording | 1 · "Send us the specification", 48px (R39.3, R39.8, §47.5) |
| Chapters rendered | **0** — absent, not partial (R11.1, §25.1 rule 3) |
| Horizontal overflow | none, at 735px and at 1280px |

With the archive able to prove the chapter — probe frames at C9/E2 and C9/E4,
reverted after measurement:

| Check | Result |
| --- | --- |
| Sections, in order | Opening 463px · **held 720px** · **What leaves** 1460px · Close 403px |
| Presence by rank | E2 **bleed 1280px** · E4 **bounded 480px** (§31.3) |
| Held moments | **1**, immediately before C9 (§23.4, R11.1) |
| Captions · images without alternative text | 2 · **0** |
| Horizontal overflow | none, at 735px (held 900px, bleed 735px) and at 1280px |

And with the same two frames reordered so the chapter leads on the record —
C9/E4 first:

| Check | Result |
| --- | --- |
| Chapters rendered | **0** — *the telling opens on a record, and no claim arrives before the work that justifies it* (N6, §10.1 rule 5) |
| Held moments | **0** — the silence goes with the chapter it was held for |
| Sections | Opening · Close |

That last table is the second half of the C8 decision, proved rather than
argued: this surface refuses to open on its paperwork whether the paperwork is
filed under C8 or under C9.

### The held moment, on a surface with no Recognition chapter

Manufacturing places it before C3 and Quality before C7, both citing §22.3 —
*silence before a claim, the pause that makes the next statement land.* Export
has neither chapter, so the rule needed a different anchor rather than a
different rule: it stands before **the chapter that carries the surface's whole
argument** (R19.1), which is the same sentence of §22.3 applied to the only claim
this surface makes. §23.5's fourth opening is therefore the manner C9 opens in,
which is why the chapter is not also given a bleed opening above the silence —
one chapter cannot open in two manners (§6.4 is about *kind*).

It is asked of the chapter, never of the surface. The third table above is that
fix working on a third surface: when C9 refuses, the silence held for it is not
left standing where the chapter is not.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.2: five §19.4 facts left the content layer — an incoterm set twice, a lead time, a capacity figure and a market count, plus an AQL band on Manufacturing. §19.4: nothing unconfirmed is softened, it is removed. §21 Export — *goods leave correctly, documented* — is set up as a chapter to be shown, never as a capability asserted |
| **Creative Direction Book** | §20 Export — *competent logistics, calmly handled; never dramatise reach; no maps, globes, arcs or aircraft.* **Unglamorous by design**: one statement, one passage, one action, and no illustration of reach anywhere on the surface. Journey: Confidence, then Respect |
| **Documentary Storyboard** | §7.1 C9 — *whose name goes on it*: the company answerable for objects that will never carry its name. §7.4: the offer is not a chapter, and the order ladder went with that rule. §10.1 rule 5 and N6, measured. §25.1 rules 1–4: ten declared, one told, none re-ordered, none partial — and one chapter is a complete telling, never a fragment of a longer one |
| **Photography Direction** | §24.5: the placeholder hero is gone; zero frames render. §5.2 rule 3 with N6: a record may not open the telling, proved by measurement. §31.3: the record is bounded where the dispatch frame bleeds |
| **Motion Direction** | Not engaged; nothing here moves |
| **Visual Design System** | §23.4 the held moment, asked of the chapter it holds for; §23.5's five openings — the fourth is the manner C9 opens in; §6.4 unengaged with a single chapter; §31.3 presence follows rank; §12.3 no eyebrow; §47.5 the action at 48px |
| **UX Blueprint** | R21.1 reach is never dramatised; R21.2 no market is named; R21.3 terms and lead times withheld and process stated; R21.4 no country surface and no country record; R21.5 the failure path belongs here and is withheld rather than invented. R13.1: the surface carries no rank at all today, which is the honest reading of an empty archive rather than a rank invented to fill the table. R39.3 and R39.8: one action, the site's wording, at the close |
| **Master Implementation Blueprint** | R5.2/R5.3: the numbered sequence and the orphan prose both left, because neither is a chapter. R6.4: one authored string removed, none written. R8.7: the library governs what can be told. R11.1: absent, never partial. R18.1: C8's *feeds* column names this surface, and the reading it does not license is a second record chapter. R19.1: dispatch is the whole argument. Dependencies 8 and 12 are visible in the built surface rather than recorded as intentions |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 6 (the surface, the tellings, the config barrel, the content check, two content files) |
| Components, primitives or systems created | **0** |
| Content edited | **2 frontmatter files** — five §19.4 facts removed, plus an eyebrow, a subtitle and a four-step block |
| Authored strings removed | **1** |
| Copy authored · photographs introduced · facts invented · countries named | **0 · 0 · 0 · 0** |
| Publication findings | 240 → **236** |
| Dependencies added / removed | 0 / 0 |

### Debt recorded, not paid

**`ProcessSteps` now has no caller.** Home, Manufacturing, Quality and Export
have each removed the numbered sequence under R5.2, R17.2 or R20.3, and no
surface remains that may use it. It is a Visual Design System §39.2 form and its
removal is a component-inventory decision rather than a surface package's, so it
is left in place and recorded here.

**The MDX bodies are neither rendered nor scanned.** The Register gate reads
frontmatter; `export.mdx`, `manufacturing.mdx` and `quality.mdx` all retain
unrendered bodies carrying §19.4 figures, and Export's names eight countries.
Nothing publishes them, and the Quality package already recorded the gate's blind
spot as build-owned debt. Widening the gate to read MDX bodies is the fix, and it
belongs to the Facts Register rather than to a surface package.

### What Export waits on

| Level | Waits on |
| --- | --- |
| C9 — every frame | **Dependency 1** — access to a working shift. R19.1 lists *what leaves (C9)* as **blocking** for this surface: dispatch as an operation is the whole argument, and nothing substitutes for it |
| C9's mechanism — packing and dispatch described precisely enough to be checked (rank 2) | **Dependency 12**. The step that described it stated an incoterm and repeated Quality |
| The markets served | **Dependency 8**, gating. Until it is discharged no country is named, in any form |
| Terms, lead times, and what is needed to agree them | **Dependency 3** and **dependency 12** — the surface holds the place; the figures are not typed |
| R21.5's failure path, and the eyebrow | **Dependency 12** |
| A named person responsible for a shipment | **Dependency 20** |

### Stopping here

Export is composed, and it is composed as one chapter rather than as a market
list: no map, no globe, no country, no incoterm, and a chapter that refuses to
open on its own paperwork. Gallery is not begun.

---

# SURFACE 06 — ABOUT

## The place and tomorrow, composed

**Stage** 1 · **Status** complete · **Governing** UX Blueprint §22 (R22.1–R22.5),
§13.1 the evidence ladder, R39.3, R39.8 · Brand Bible §1 the myth, §2.1, §18
people philosophy, §19.1, §19.2, §19.4, §21 About · Creative Direction Book §20
About · Documentary Storyboard §5 the refused stories, §5.1, §5.2, §7.1 C1/C10,
§7.4, §8.2, §22.3, §24 how the documentary ends, §25.1, N3, N13 · Photography
Direction §8.5, §24.5, §30.3 · VDS §6.4, §12.3, §23.4, §23.5, §31.3 · MIB R5.3,
R6.4, R7.1, R8.7, R11.1, R18.1, R19.1, R20.6, dependencies 1, 2, 5, 12

Composed from the existing documentary system. **No component, primitive,
infrastructure or system was created.**

### The plan

§22: *to answer who the visitor is dealing with — **the people and the place** —
without becoming a founder legend, a timeline or a values list.* Question: **"Who
am I dealing with?"** Creative Direction Book §20: *meeting the people and the
place, not the founder's legend* — **plain-spoken, a page that would embarrass
nobody who works there.**

`aboutTelling` declares all ten and **tells two** — the first and the last of the
canonical set, which are the two rows of §22's evidence table that are chapters
at all:

| Chapter | §22's row | Rank |
| --- | --- | --- |
| **C1** The place | The place, named and located | 5, 7 |
| **C10** Tomorrow | People at their work, named | 7, 5 |

**They are a pair, and §24.3 is why both are on one surface.** *C10 comes back to
where C1 began: the same rooms, work in progress, nothing announced. The
difference is entirely in the viewer* — and the Storyboard calls that return
**the only structural symmetry this brand permits.** A surface telling C10 without
C1 has nothing to return to. MIB R19.1 confirms it from the register side: *the
place (C1, E5/E2)* is listed **blocking for Home, About and Manufacturing**, and
a surface is not blocked by a chapter it hands on.

R22.5 is the other half: *About carries C10 and therefore **ends by continuing**,
not by concluding* (N13). Every other telling in `tellings.ts` hands C10 here,
and `check:content` now asserts that they do.

### Why this is not Home's C1 told twice

§12.1 permits the extraction and §8.5 requires every chapter to stand alone; what
makes two tellings of one chapter legitimate is that they ask it different
questions, and here the difference is visible in the composition rather than
argued in a comment:

| | Home's C1 | About's C1 |
| --- | --- | --- |
| Question | *Is anybody actually here?* — arrival | *Who am I dealing with?* |
| Annotation | The company's own account of itself (`intro.body`) | **None** |
| Position | Opens the site, before Recognition | Opens the surface, and is what C10 returns to |

The absent annotation is §7.1 quoted: C1's *argument is accumulation, not
information* — by the end of it the viewer should have stopped wondering whether
the building exists **without having been told that it does.** And §22's *named
and located* half is the footer's record, already on every surface (L10: one
fact, stated once).

Recognition is neither C3 nor C7, and is not dropped: §25.1 rule 2 governs a
telling, §25.2 gives *the website* C1–C10 complete across its surfaces, and §22
says it plainly — About *is not on the critical path of any journey, and that is
deliberate.* The same standing Products has with C6 and Export with C9.

### What was removed, and by which rule

| Removed | Rule |
| --- | --- |
| **The prose body**, and with it **four of the nine stories §5 permanently closes to this brand** | It opened on *"began in 1998 with four craftsmen, one clicking press and a single overseas buyer"* — **the founder's journey**, which *relocates the argument from the floor to a biography, and biographies cannot be audited*. It continued into **the growth story** (three lines, eight countries) and **heritage** (*"by a person, not a program"*), and it carried a `## Vision` and a `## Mission` — **the mission**, closed because *the Manifesto is internal and never published* (Brand Bible §2.1) and *beliefs stated aloud are claims*. R22.1 forbids all of them by name; **R5.3** removes it independently — a surface is chapters, and prose that belongs to no chapter has no level to live at |
| **`eyebrow: Our story`** | The announcement of a biography, on the surface **§5.1** exists to keep from having one: *this story does not have a protagonist.* The subject is the work; the recurring cast is the place |
| **`subtitle: Three decades of leather, one standard`** | A duration derived from an unconfirmed founding year (dependency 2), and §5's *heritage and tradition* besides. Rendered nowhere, and a governed fact either way |
| **"…since 1998"** — the summary, rendered in the Opening | **Dependency 2**, blocking. R22.1 permits the founding date only as *a fact stated once, never a passage*, and it is not yet stateable at all |
| **"…for buyers in eight countries since 1998"** — the SEO description | Dependency 8 and dependency 2, published in metadata |
| **The hero photograph** | A generated placeholder; Photography Direction §24.5 has no exception |
| **"Come and see the floor"** — the close's sentence | Authored in a page file (R6.4); R39.8 fixes the action's wording site-wide |

### What is absent, and is the argument

**No person appears.** Dependency 5 is **blocking** — *no person appears, named
or unnamed, in any image* — and R22.3 states it forward: *a person is named only
with written consent; **consent obtained afterwards is not consent.*** C10's whole
subject is people, so the chapter waits rather than substitutes, and R22.2
removes the shape it would otherwise take: **no portrait grid.** §18.7 is the
standing instruction for when the frames arrive — people photographed *working,
not posed*, at the bench rather than lined up, described by **what they do** and
never with adjectives.

**No founding fact.** §22's rank-8 row, held by dependency 2 — and §22 names this
surface as *where the discrepancy would be most visible.*

**No limit statement.** §22's rank-6 row and R22.4: *this is the surface where
"we do not do X" is least defensive and most credible.* No document states the
limits. §12.1 puts them inside the chapter whose capability they qualify rather
than on a collection of their own, which is where they will arrive. Dependency 12.

**No annotation on either chapter.** N3 and §8.2: **the viewer was there**, and a
chapter that ends with somebody explaining what it meant has been annotated
rather than ended.

### A constitutional defect in a shared layer, found and fixed

**The Facts Register could not see a founding year or a market count written in
prose**, and two of them were rendered on **Home**, a completed surface.

`facts-register.ts` gives the identity facts empty marker lists on purpose, and
the reasoning is sound for a name or an address: those are unbounded strings, the
gate reads the record field directly, and a marker for them would report the same
unconfirmed name once per document (R16.5). It does not hold for a year and a
count, because those appear in sentences. The gate was reading
`company.foundedYear` while the claim sat in the copy beside it — **Brand Bible
§19.1's failure exactly: a claim survives review because nothing is looking where
it lives.**

Two markers added, to `company-founded` and `export-markets`. What they found,
in content that had passed every previous gate:

| Document | Quote | Where it rendered |
| --- | --- | --- |
| `home/hero.json` | *"Kanpur, India · Since 1998"* | Home's Opening — the eyebrow |
| `home/hero.json` | *"…manufactured in Kanpur since 1998 for buyers in eight countries."* | Home's Opening — the summary |
| `home/company.json` | *"We have been making leather goods in Kanpur since 1998."* | Home's **C1 annotation** |
| `company/about.mdx` | *"…since 1998"* ×2, *"eight countries"* | About's Opening and its metadata |

All removed by deletion, never by rewriting: copy is not the build's to author
(R6.4), and §19.4 removes an unconfirmed fact rather than softening it. Measured:
**240 findings with the old strings, 236 with them gone** — the count is where the
Export package left it, and the gate is strictly stronger than it was.

**And `check:content` stopped keeping its own list.** Its home-page guard was six
hand-typed strings (`"40,000"`, `"AQL"`, `"MOQ"`…) sitting beside a register that
already knows what betrays each fact — R7.1, and two lists eventually disagree.
It now asks `findGovernedFacts` directly, so a fact confirmed in the register
stops being refused here without a second edit, and a marker added there starts
being refused here without one either.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with three new assertions and one replaced
npm run build                             ✓ green — 33 pages prerender, /about static
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 236 findings (240 before the fix, 236 after)
```

Measured on `/about`, shipping today:

| Check | Result |
| --- | --- |
| `h1` | 1 |
| Eyebrows | **0** (§12.3: at most one) |
| Images rendered | **0** — the archive holds no frame for C1 or C10 |
| People shown or named | **0 · 0** (dependency 5, R22.2, R22.3) |
| Founding dates · timelines · values lists · mission statements | **0 · 0 · 0 · 0** (R22.1, §5) |
| Governed facts on the surface | **0** |
| Actions, and their wording | 1 · "Send us the specification", 48px (R39.3, R39.8, §47.5) |
| Chapters rendered | **0** — absent, not partial (R11.1, §25.1 rule 3) |
| Horizontal overflow | none, at 735px and at 1280px |

With the archive able to prove both chapters — probe frames at C1/E5, C1/E2 and
C10/E2, reverted after measurement:

| Check | 735px | 1280px |
| --- | --- | --- |
| Sections, in order | Opening 375 · **The place** 1190 · held 694 · **Tomorrow** 1270 · Close 303 | Opening 491 · **The place** 1910 · held 800 · **Tomorrow** 2096 · Close 403 |
| Chapter order | C1 → C10, canonical (§25.1 rule 1) | C1 → C10 |
| Consecutive chapter openings | **photograph → held** (§6.4, §23.5 manners 1 and 4) | photograph → held |
| Presence by rank | E5, E2, E2 — **all bleed 735px** (§31.3) | all bleed 1280px |
| Held moments | **1**, immediately before C10 (§23.4, R11.1) | **1** |
| Surface extent against three viewport heights | — | ~5.7k against 2.4k: the held moment's precondition is met |
| Captions · images without alternative text | 3 · **0** | 3 · **0** |
| Horizontal overflow | none | none |

And with C1's frames both at E5 — a chapter built from located views:

| Check | Result |
| --- | --- |
| Sections | Opening · held · **Tomorrow** · Close |
| C1 | **absent** — *every frame is a located view; a chapter built from views is a mood piece* (§9.2, §10.1 rule 2) |
| C10 | tells, with its held moment intact — the silence is asked of the chapter it is held for |

That last state is worth naming rather than only measuring: with C1 absent there
is nothing for C10 to return to, so **§24.3's symmetry is a property of the
archive, not of this file.** The surface is a shorter telling, not a broken one,
and it becomes the return the moment the library can carry the place at more than
E5.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §19.1 and §19.2: the register's blind spot closed, and four §19.4 leaks removed — two of them on a completed surface. §2.1: the Manifesto is internal, and the `## Vision` / `## Mission` sections are gone. §18.7: no person is described with adjectives because no person is described at all; the standing instruction is recorded for when consent exists. §21's row for this page — *people and place, no founder mythology* — is honoured by publishing the place as a chapter and the mythology nowhere |
| **Creative Direction Book** | §20 About — *meeting the people and the place, not the founder's legend; never a founder myth, a timeline of milestones, or a values list.* **Plain-spoken**: one statement, one passage, one action. The register is exactly what §20 asks for — a page that would embarrass nobody who works there, because it says nothing about them they did not do |
| **Documentary Storyboard** | §5: four of the nine refused stories left the surface, named individually. §5.1: **the absent protagonist** — no arc, no hero, no biography. §5.2: people carry the ending and never the credit, which is why C10 is a chapter and not a team section. §7.4: the history is not a chapter and the people are not a subject. §24.1–§24.3: it ends with somebody who will be doing this work tomorrow, by continuing, and by returning to C1. §25.1 rules 1–3: ten declared, two told, none re-ordered, none partial |
| **Photography Direction** | §24.5: the placeholder hero is gone; zero frames render. §8.5 and §30.3 item 7: consent is blocking, so no person appears in any image. §31.3: presence follows rank, measured — E5 and E2 both bleed |
| **Motion Direction** | Not engaged; nothing here moves |
| **Visual Design System** | **§6.4 is Fixed and this is the surface that exercises it**: two adjacent chapters, opening in §23.5's first and fourth manners. §23.4 the held moment, asked of the chapter it holds for, on a surface that measurably exceeds three viewport heights once the chapters fill. §12.3 no eyebrow; §47.5 the action at 48px |
| **UX Blueprint** | R22.1 no founder mythology, no milestone timeline, no values list; R22.2 no portrait grid; R22.3 no person named without written consent; R22.4 the limits belong here and are withheld rather than invented; R22.5 it ends by continuing. R13.1: the surface carries no rank today, which is the honest reading of an empty archive. R39.3 and R39.8: one action, the site's wording, at the close |
| **Master Implementation Blueprint** | R5.3: the orphan prose left because it is not a chapter. R6.4: one authored string removed, none written. **R7.1: a second list of governed facts deleted in favour of the register.** R8.7: the library governs what can be told. R11.1: absent, never partial. R18.1: C1 and C10 both name About in their *feeds* column. R19.1: the place is blocking for this surface, and it is blocked. R20.6: the two new markers change classification in one place and nowhere else. Dependencies 2, 5 and 12 are visible in the built surface rather than recorded as intentions |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 8 (the surface, the tellings, the config barrel, the Facts Register, the content check, three content files) |
| Components, primitives or systems created | **0** |
| Content edited | **3 files** — About's frontmatter and two Home documents |
| Governed facts removed from published content | **4** (two on Home, two on About) |
| Authored strings removed | **1** |
| Copy authored · photographs introduced · facts invented · people named | **0 · 0 · 0 · 0** |
| Publication findings | 240 → **236**, against a register that now catches more |
| Dependencies added / removed | 0 / 0 |

### Debt recorded, not paid

**The structured data and the footer still publish dependency-2 fields.** `/about`
now states no founding year, and the page's own JSON-LD carries
`"foundingDate":"1998"` from `company.foundedYear`, on every route — alongside the
legal name, the postal address and the contact email in the footer's record. Every
one of those fields is already reported by the Register gate and the confirmation
sheet asks for each in writing, so nothing here is unseen; withholding them from
render is a launch decision across the SEO layer and the footer, not a surface
package's, and doing it piecemeal would leave the site inconsistent about which
identity facts it will state.

**The MDX bodies are still neither rendered nor scanned.** `about.mdx` retains the
founder's journey, the vision, the mission and a floor area, unrendered; so do
`export.mdx`, `manufacturing.mdx` and `quality.mdx`. Widening the Register gate to
read MDX bodies is the fix and it belongs to the Facts Register, as recorded in
the Export package. About is the sharpest instance: its unrendered body is four
refused stories in one file.

### What About waits on

| Level | Waits on |
| --- | --- |
| C1 — every frame, and at better than E5 | **Dependency 1** — access to a working shift. R19.1 lists *the place* as **blocking** for this surface: *nothing establishes that the building exists except the building* |
| **C10 — every frame** | **Dependency 5**, blocking, and dependency 1. Until written consent exists, no person appears in any image, and C10's subject is people |
| The founding fact, stated once | **Dependency 2**, blocking — the surface where a wrong name or year would be most visible |
| R22.4's limits — what the company does not do | **Dependency 12** |
| The eyebrow, and every word | **Dependency 12** |

### Stopping here

About is composed, and it is composed as the place and tomorrow rather than as a
company profile: no founder, no timeline, no vision, no mission, no portrait
grid, and an ending that hands over instead of closing. Gallery is not begun.

---

# SURFACE 07 — GALLERY

## The library, chapter by chapter, composed

**Stage** 1 · **Status** complete · **Governing** UX Blueprint §23 (R23.1–R23.6),
R19.6, R39.3, R39.4, R47.1, R47.5 · Brand Bible §21 Gallery · Creative Direction
Book §11.3, §20 Gallery · Documentary Storyboard §7.4, §10.1 rule 2, §22.4,
§25.1 rule 1 · Photography Direction §5.2, §22.4, §24.4, §25 the library is the
argument · VDS §31.1, §31.2, §31.3, §31.4, §32.1, §40.3, §41 · MIB §12.1 the
Gallery item, R8.7, R12.2, R15.4, R18.5, R19.1, dependencies 1, 5, 6

Composed from the existing documentary system. **No component, primitive,
infrastructure or system was created.**

### The plan

§23: *unmediated access to the evidence — **the file rather than the
presentation** — where the volume of evidence is itself the argument.* Question:
**"Is any of this real?"** Creative Direction Book §20: *documentary; the one
place where volume of evidence is itself the argument*, and never *an art
project, retouched toward beauty, or sequenced for drama.*

Its required outcome is the whole design brief: *a sceptical visitor, having seen
the argued surfaces, can check them against **unargued material** and find
nothing that contradicts.*

**So the surface is the archive, read directly, in canonical chapter order.**
R23.4 — *sets are organised by chapter, never by aesthetic theme: "the floor",
"the gate", "dispatch" — not "details", "textures", "moments"* — and which
chapter a frame belongs to is recorded against the photograph by the picture
editor (R15.4, Photography §22.5). Reading `chapterFrames` makes R23.4 a property
of the library rather than a naming discipline a page file has to keep, and it is
the same accessor every told surface uses (R8.7: *the library governs what can be
told, and the library wins*).

### It is not a telling, and no `Chapter` is composed here

The distinction decides the whole composition. §23 says the surface *never
carries the argument alone*, and R23.6 gives the mechanism: *twenty views of a
place prove a building; **the decision being taken proves the company.***

A chapter of twenty located views refuses itself — §10.1 rule 2, *a chapter built
from views is a mood piece* — and it is right to. But that refusal exists because
**a chapter argues**. A Gallery set does not; it is the material an argument
elsewhere was made from. Composing `Chapter` here would have made Gallery a sixth
complete telling of C1–C10 (§25.1 rule 3), given it the anchors §8.5 reserves for
where a chapter is told, and refused exactly the E5-at-volume that §23 names as
its content.

So each set is a `Section` with the chapter's name, and the name is a link to
where that chapter *is* argued — §23: *it links back to the chapter each set
belongs to.* Manufacturing is the complete telling and every chapter is
addressable there.

### What was removed, and by which rule

| Removed | Rule |
| --- | --- |
| **The five albums** — *Factory · Machinery · Products · Packaging · Events* | **R23.4**: sets are organised by chapter, **never by aesthetic theme**. Every one of the five is a theme. *Events* is worse than a theme — a trade fair stand and a buyer on the floor — and §7.4 is explicit: **we do not exhibit our clients** |
| **The masonry grid** (`Gallery`, `columns-1 sm:columns-2 lg:columns-3`) | **VDS §31.1 is Fixed** — *no two photographs of similar weight appear in one viewport* — and **R23.2 refuses this surface an exemption in the same breath as it grants the volume**: *governed by the Visual Design System's rules on sets **rather than by an exception to them***. Volume here is extent down the page, not density across it. The one permitted equal treatment is §31.1's E3 set, which is `EvidenceSet` |
| **`eyebrow: Inside Elite Export`** | §12.3 makes an eyebrow *a location in the structure*. That is a framing, on the surface that exists to have none (R23.1) |
| **`summary: "…photographed on ordinary production days."`** | A provenance claim made once, in prose, for the whole library. **R23.3** and Photography §24.4 put provenance **on each frame**; a blanket version is the curatorial statement R23.1 refuses, and with no frames it was a claim about photographs that do not exist |
| **"…export packing and buyer visits"** — the SEO description | §7.4 again, in metadata |
| **The empty state's route to Enquiry** | **R39.3**: *Gallery — **Never**. Evidence is not a sales surface.* `route={false}`; the footer's index carries the route to a person on every page regardless |

### How a frame is presented

Nothing here is new. MIB §12.1's **Gallery item** is *photograph + record — to
present one photograph in a set organised by chapter, each carrying its own
record*, which is `EditorialImage`, and R12.2 makes it unable to render a frame
whose record is missing. Presence follows rank exactly as it does inside a
chapter (§31.3): bleed for E1, E2 and E5; bounded in the record column for the E4
record and the E6 object.

The single exception is §31.1's: **three to five frames, all E3, treated
identically** — *because there the comparison is the argument: the same act, the
same way, repeatedly.* `isEvidenceSet` is the archive's own predicate, unused by
any surface until now, and where it does not hold the frames fall back to one at
a time, which is the Fixed default rather than a lesser version of it.

**A limitation, recorded rather than engineered around.** The predicate asks
whether *the whole of a chapter's run* is an E3 set. A chapter holding three E3
frames alongside four E5 frames therefore renders all of them one at a time. That
is deliberate: §31.1's exception is *frames of the same operation*, the archive
records chapter and rank but not operation, and partitioning a run into
operations would be a grouping this build invented. When the archive can express
it, the predicate is where it goes.

### A constitutional defect in a shared layer, found and fixed

**A full-bleed portrait frame rendered at 213% of the viewport height.**

VDS §31.4 is Bounded and its ceiling is absolute: *a full-bleed photograph
occupies between 60% and 100% of the viewport height… **never above 100%** — an
image taller than the field can never be seen whole, and an image that cannot be
seen whole cannot be examined.* `EditorialImage` set `w-screen max-w-none` and
let the ratio decide the height, so a portrait frame broke the rule by arithmetic
rather than by choice.

Measured, with a probe frame of 800 × 1066 at a 1280 × 800 field:

| | Before | After |
| --- | --- | --- |
| Rendered | 1280 × 1707 | **600 × 800** |
| Share of viewport height | **213%** | **100%** |
| Crop applied | none | none |

It is fixed in `EditorialImage` rather than on Gallery, because every surface that
bleeds a frame inherits it — Chapter on Home, Manufacturing, Quality, Export and
About, and the product record. **Nothing had caught it because no surface has
rendered a bleed frame yet**: the archive is empty, and the defect would have
arrived with the first portrait photograph.

The fix is not a crop, and could not be. §32.1 — *the container gives the width,
the photograph gives the height* — and Photography §22.4 makes a second crop a
second statement, which is why `ContentImage` does not expose `object-fit` at
all. The ceiling is applied to the **width** instead, derived from the frame's own
measured ratio: the widest a photograph may be drawn is the width at which it is
exactly one viewport tall. It bleeds wherever the ratio allows, stops short of
the edge where it does not, is uncropped either way, and sits flush left because
§10.4 centres nothing.

**The 60% floor is deliberately not enforced.** Reaching it means enlarging past
the frame's own size or cropping to a wider ratio, and both are refused above.
R18.5 puts that end of the range where it belongs: *where a surface needs a shape
the library lacks, the answer is a different photograph.*

### A second defect, and the debt it discharges

**The subcategory surface carried the site's action**, citing R39.3 — which has
no subcategory row, and R19.6 excludes it by name: ***every product record ends
at Enquiry, and it is the only deep surface that does.*** A buyer at a record has
a specific requirement; a buyer three levels up is still reading the range. The
`Close` is removed.

It survived because of a debt three Stage 1 packages recorded in identical words:
*the Action gate reads nothing at content level, because actions are no longer
authored in content; counting rendered actions per route needs a render-time
audit.* It does not. Every action on the site is `Close`, `Close` renders
`Action`, and which surfaces carry one is a fact about which page files import
it. `check:content` now asserts R39.3's table directly:

```
/  ·  /about  ·  /export  ·  /manufacturing  ·  /products
/products/[category]  ·  /products/[category]/[subcategory]/[product]  ·  /quality
```

Verified by attempting to defeat it (R9.2): adding `Close` to Gallery's import
fails the check with the diff, and removing it passes. The hand count between
packages is retired.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with R39.3 asserted
npm run build                             ✓ green — 33 pages prerender, /gallery static
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 236 findings (unchanged)
```

Measured on `/gallery`, shipping today:

| Check | Result |
| --- | --- |
| `h1` | 1 |
| Eyebrows | **0** |
| Images rendered | **0** — the archive holds no frame for any chapter |
| Albums · masonry columns · lightboxes · slideshows | **0 · 0 · 0 · 0** (R23.4, R23.5, §31.1) |
| **Enquiry links, anywhere in `main`** | **0** (R39.3, R39.4) |
| Actions | **0** — no `Close` is imported |
| State | `empty`, in a `role="status"` region, stating its own condition (R47.1) |
| Horizontal overflow | none |

With the archive able to prove three chapters — probe frames at C1/E5, C1/E2,
C4/E3 ×3 and C8/E4, reverted after measurement:

| Check | Result |
| --- | --- |
| Sets, in order | **The place** · **The shaping** · **The record** — canonical chapter order, C1 → C4 → C8 (§25.1 rule 1, R23.1) |
| Set names | The chapter's own title, each linking to `/manufacturing#the-place`, `#the-shaping`, `#the-record` (§23) |
| Link target size | **44px** (§47.5) |
| Presence by rank at 1280px | E5 **600 × 800, capped at 100vh** · E2 **bleed 1280 × 720** · E3 ×3 **equal, 369px each** · E4 **bounded 480px** (§31.3, §31.4, §31.1's exception) |
| Frames above 100% of viewport height | **0**, at 735px and at 1280px |
| Captions · images without alternative text | 6 · **0** (R23.3) |
| **Enquiry links** | **0**, with content present |
| Horizontal overflow | none, at 735px and at 1280px |

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §21's row — *Gallery: is any of this real? → **unretouched evidence***. Nothing here is retouched, sequenced or curated; the order is the canonical chapter order and the grouping is the archive's own. No figure, no claim, no governed fact appears on the surface at all |
| **Creative Direction Book** | §20 Gallery — *unmediated access, the file not the presentation; never an art project, never retouched toward beauty, never sequenced for drama.* The eyebrow and the curatorial summary are gone, which is what "not the presentation" costs. §11.3's *one image at a time* is honoured rather than exempted (R23.2) |
| **Documentary Storyboard** | §7.4: *Events* left the surface — we do not exhibit our clients. §10.1 rule 2 is the reason no `Chapter` is composed here: a set of views is not a chapter, and pretending otherwise would refuse the surface its own content. §22.4: the process is shown, the specification is not — nothing here can render a frame the archive has not cleared. §25.1 rule 1: chapter order, never re-ordered |
| **Photography Direction** | §25: *a single photograph proves an instant; a library proves a company* — this surface is that sentence with nothing in front of it. §24.4 and R23.3: every frame carries place, date, photographer and permission, or it does not render. §22.4: no second crop, which is why §31.4's ceiling was applied to width and not by cover-fitting. §5.2: no accumulation of E5 produces E2, which R23.6 states for this surface and the composition does not pretend otherwise |
| **Motion Direction** | Not engaged; nothing here moves. R23.5: no slideshow, no autoplay, no lightbox transition |
| **Visual Design System** | **§31.1 Fixed, obeyed rather than exempted** — one image at a time, with the E3 set as the single exception. §31.3 presence follows rank. **§31.4's ceiling now enforced in the shared component.** §32.1 and §22.4: no crop, at any viewport. §40.3 and §41: no dialog, no lightbox, no tabs — every set is present, with nothing to open |
| **UX Blueprint** | R23.1 documentary, not an art project; R23.2 volume as extent, governed by the rules on sets; R23.3 every photograph carries its record; R23.4 organised by chapter; R23.5 no lightbox, slideshow or autoplay; R23.6 the surface is never the proof of ownership on its own, and it links to where the argument is made. **R39.3 and R39.4: no action and no enquiry path, asserted rather than measured.** R19.6: the subcategory's action removed. R47.1: the state is a fact, stated plainly |
| **Master Implementation Blueprint** | §12.1's *Gallery item* is `EditorialImage` and is used as specified — one photograph in a set organised by chapter, each carrying its own record, never opening into a lightbox. R8.7: the library governs. R12.2: no frame without its record. R15.4: the chapter attribution is the photograph's, not the surface's. R18.5: the 60% floor stays with the picture editor. R19.1: *the place, at volume* is **blocking** for this surface, and it is blocked |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 4 (the surface, `EditorialImage`, the products subcategory surface, the content check) |
| Components, primitives or systems created | **0** |
| Components newly used, having existed unused | **1** — `EvidenceSet`, §31.1's exception, built in Stage 0 and never called |
| Content edited | **0** |
| Authored strings removed | **3** (an eyebrow, a curatorial summary, a metadata clause) |
| Copy authored · photographs introduced · facts invented · captions written | **0 · 0 · 0 · 0** |
| Actions removed from surfaces R39.3 does not permit | **1** |
| Publication findings | 236 → **236** |
| Dependencies added / removed | 0 / 0 |

### Debt recorded, not paid

**The album content still exists and is read by nothing.** Five `album.json`
files and thirty-five placeholder frames under `src/content/gallery/` no longer
reach any surface. They are still scanned by the publication gates, which is
correct — they are still in the content layer — and the *Events* album in
particular holds people and a buyer's presence, which dependencies 5 and 6 govern.
Removing the collection is a content-model decision rather than a surface
package's, and the gates report it either way.

**The `Gallery` masonry component still has a caller.** `technology/[machine]`
renders machine photographs through it, and that surface has not been composed.
The §31.1 finding above applies there too, and it belongs to Technology's package
along with the component's fate — the same standing `ProcessSteps` has since the
Export package.

### What Gallery waits on

| Level | Waits on |
| --- | --- |
| **Every set** | **Dependency 1**, blocking. R19.1: *the place, at volume* blocks this surface — *volume is Gallery's content; it cannot be built thin and filled later.* §23 states it more strongly than any other surface's note: **until the library exists, this surface does not exist** |
| Frames showing people | **Dependency 5**, blocking — no person appears in any image until written consent exists |
| Frames showing a buyer's finished work | **Dependency 6**, gating — only work the company may show is shown |
| Every caption, and every provenance record | **Dependency 19** and dependency 1. R23.3: a gallery of uncaptioned images is decoration at volume, which is worse than decoration |

### Stopping here

Gallery is composed, and it is composed as the library rather than as a portfolio:
no albums, no masonry, no lightbox, no theme, no action, and not one photograph
that is not answering a chapter's question. Journal is not begun.

---

# SURFACE 08 — JOURNAL

## One chapter in depth, composed

**Stage** 1 · **Status** complete · **Governing** UX Blueprint §24 (R24.1–R24.6),
§45.1 the Article model, R45.3, R45.4, R39.2, R39.3, R47.1 · Brand Bible §1 the
myth, §16.6, §21 Journal, §12 · Creative Direction Book §20 Journal ·
Documentary Storyboard §25.1 rule 3, §25.2 the journal passage, §24.4 ·
Photography Direction §24.5, §8.5 · VDS §12.3, §41 · MIB §12.1 the Journal entry
and the Journal index item, R6.4, R7.1, dependencies 5, 12

Composed from the existing documentary system. **No component, primitive,
infrastructure or system was created.**

### The plan

§24: *to demonstrate knowledge of the material by telling **one chapter in
depth**.* Question: **"Do you know your material?"** Creative Direction Book §20:
*knowledge shared by someone with nothing to prove* — **instructive and
unhurried**, and never *content marketing, opinion, or a news feed.*

**There is no `journalTelling`, and that is the composition's first decision.**
§25.2's medium table gives *the website* C1–C10 complete across its surfaces, and
gives **the journal passage its own row** — *usually one chapter, in depth;
leading word Evidence; must never become content marketing; ends by **space***.
An article is therefore a telling in a different medium, not a ninth surface
telling. It is why an article on C2 is not Quality's C2 told twice, and why the
one thing an article may never do is claim the chapter: **it links to where the
chapter is argued.** `tellings.ts` is untouched.

### The Article model did not match R45.1

R45.1's mandatory column is five things — *title · **the chapter it tells** · the
body · a named author who could answer a question about it · date written* — and
the schema carried four of them. What was missing is the one that separates a
journal from a blog.

| Field | Was | Is | Rule |
| --- | --- | --- | --- |
| **`chapter`** | **absent** | **mandatory**, `chapterSchema` | R45.1 mandatory; **R24.2** — *an article is one chapter, told whole; an article covering four chapters lightly is a trailer.* A model with no chapter cannot express that rule, and every article written against it is a post about a topic |
| `cover` | mandatory | **optional** | R45.1 lists photographs as optional. Mandatory, it guarantees a placeholder the first time an article is written without one (X8, Photography §24.5) |
| `featured` | present | **removed** | It appears nowhere in R45.1. A flag promoting one article over the others is merchandising on the surface R24.1 keeps clear of it |

`chapterSchema` is the same closed set of ten the archive records against a frame
(R7.1) — there is no eleventh and the type will not accept one.

### The ordering was the feed, with its labels removed

The index carried a comment saying it was *"not date-led — R24.5 removes the
ordering that implies a schedule"*, and the collection sorted `byNewestFirst`.
Hiding the dates while sorting by them leaves the feed in place.

MIB §12.1's *Journal index item* states the rule twice: it lists an article **by
what it is about, not by when it was posted**, and it disappears *where it would
carry a date-led, feed-like ordering that implies a schedule*. What an article is
about is its chapter, so **canonical chapter order is the order** — §25.1 rule 1,
the one order this brand never re-arranges — with the title deciding between
articles telling the same chapter. Fixed in the content layer, where the ordering
lives, rather than in the page that displays it.

`byNewestFirst` now has no caller and is left in `collection.ts` as a generic
helper; that is inventory, not this package.

### Where the date went

It was the article's **eyebrow**. §12.3 makes an eyebrow *a location in the
structure*, and a date in that position is exactly the register R24.5 refuses.
An article's location in the structure is **the chapter it tells**, so that is
the eyebrow now, and R45.1's *date written* moved to the attribution at the foot,
in the record voice — a fact about the article rather than its position in a
queue.

### What was removed, and by which rule

| Removed | Rule |
| --- | --- |
| **`eyebrow: Notes`** — the index | A magazine register, and not §12.3's *location in the structure* |
| **`summary: "What we have learned about leather… written for buyers"`** | **R24.4 — expertise is demonstrated, never asserted.** *What we have learned* asserts it in the Opening, before the article does the work, and the copy is not this file's (R6.4) |
| **The date as the article's eyebrow** | R24.5, §12.3 — above |
| **`featured: true`** on the one article | Not in R45.1; merchandising (R24.1) |
| **The article's cover photograph** | A generated placeholder; Photography Direction §24.5 has no exception. The file remains on disk and is referenced by nothing |
| **The empty state's route to Enquiry** | **R39.3: Journal — Never.** `route={false}`; the footer's index carries the route to a person on every page regardless |

### The one article is held out of publication

`status: draft`. It is not deleted, and the reasons are all recoverable rather
than fatal — but none of them is the build's to decide:

- **Its author is the company.** `author: Elite Export` is not a person. R24.6 and
  R45.1 require *a named person who could answer a question about it* — rank 7,
  and R45.4 calls it the model *that converts a company into somebody*. R45.3's
  validation is one line — **no consent, no record** — and **dependency 5 is
  blocking.** Attributing an article to the company is the anonymity Brand Bible
  §1 exists to refuse: *someone has to be answerable.*
- **Its form is the one R24.1 names.** *How to Judge X Before You Place an Order*
  is six independent checks with an excerpt written as a hook. R24.2: one chapter
  **told whole**; six tips are not one chapter, they are six. Its closing line —
  *"If the answer is vague, the supply chain is worth a second look"* — is §5's
  *David and Goliath*, which the Storyboard closes to this brand permanently.
- **Its chapter attribution is provisional.** `chapter: C2` is the honest reading
  of the text — the standard applied to material before any value has been added
  — but which chapter an article tells is the editor's call, not the build's. It
  is recorded here as unconfirmed alongside the author and the form (dependency
  12).

Drafts are visible in development and excluded from a production build
(`INCLUDE_DRAFTS`), so the editor keeps working on it and **the published site
does not carry it**. Measured below.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green, with the continuation asserted
npm run build                             ✓ green — 32 pages prerender (was 33)
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 233 findings (was 236)
```

The three findings that left are the article cover's: with `cover` optional and
the placeholder unreferenced, the Provenance, Record and Threshold gates each
have one fewer frame to refuse.

Measured on the **production build**, which is what ships:

| Check | Result |
| --- | --- |
| Routes prerendered | **32**, one fewer — `/journal/choosing-full-grain-leather` is not built |
| `/journal` | The empty state, in a `role="status"` region (R47.1) |
| Article title anywhere in the HTML | **0** |
| **Enquiry links inside `<main>`** | **0** — the one in the document is the footer's surface index, outside `main` (R37.3) |
| Actions · continuations | **0 · 0** (R39.3, R24.3) |

Measured on `/journal` and the article in development, where the draft renders —
the state the surface will be in when the article is publishable:

| Check | Index | Article |
| --- | --- | --- |
| `h1` | 1 | 1 |
| Eyebrow | **none** | **"What arrives"** — the chapter, never the date (§12.3, R24.5) |
| Entry states its chapter | **yes**, above the title | — |
| Links | 1 — the title, to the article | 1 — **the chapter's question, to `/manufacturing#what-arrives`** (§24), 44px (§47.5) |
| Links to Products | **0** (§24: *articles never link to Products as a recommendation*) | **0** |
| Enquiry links | **0** | **0** |
| Dates rendered | **0** | 1, at the foot with the attribution (R45.1) |
| Images | **0** | **0** — the placeholder cover is gone |
| Ends with | the list | *Written by … · 18 June 2026*, then space (R24.3, §24.4) |
| Horizontal overflow | none | none |

### A second door, closed mechanically

R24.3 removes the **action** from Journal, and MIB §12.1 removes the
**continuation** separately — *on Journal, which ends in space.* The R39.3
assertion added in the Gallery package covers the first; the second is the door a
related-articles list would come through, so the same scan now collects
`Continuation` imports and refuses any Journal route among them. Verified by
attempting to defeat it (R9.2): importing `Continuation` into the index fails the
check with the route named.

### Audit

| Document | Compliance |
| --- | --- |
| **Brand Bible** | §21's row — *Journal: do you know your material? → **expertise demonstrated, never asserted***. The summary that asserted it is gone and nothing replaced it. §1: an article attributed to the company is the anonymity the myth exists to refuse, which is why the one article does not publish. §16.6: equipment and material named plainly; no adjectives are added to either |
| **Creative Direction Book** | §20 Journal — *knowledge shared by someone with nothing to prove; never content marketing, opinion, or a news feed.* **Instructive and unhurried**: no eyebrow, no date-led order, no featured flag, no schedule, no hook in the Opening |
| **Documentary Storyboard** | §25.2: the journal passage is its own medium row — one chapter, in depth, ending by **space** — which is why there is no `journalTelling` and why an article on C2 does not duplicate Quality's. §25.1 rule 3: one chapter, told whole, is now expressible in the model and enforced by it. §24.4: a passage that asks nothing, and then the telling stops. §5: the article's competitive close is named as a refused story |
| **Photography Direction** | §24.5: the placeholder cover no longer reaches the surface, and the model no longer demands one. §8.5 with R45.3: no person is named without consent on file, which is what holds the article back |
| **Motion Direction** | Not engaged; nothing here moves |
| **Visual Design System** | §12.3: the eyebrow is a location in the structure — the chapter — and never a date. §41: no reading-time estimate, no tag cloud, no related posts, no share row; none of them exists to be removed |
| **UX Blueprint** | R24.1 not content marketing, opinion or a news feed; R24.2 one chapter told whole, now a mandatory field; R24.3 it ends in space, asserted; R24.4 expertise demonstrated, never asserted; R24.5 frequency is not a commitment, and the ordering no longer implies one; R24.6 attributed to a named person, which dependency 5 holds. R45.1's mandatory and optional columns now match the schema exactly. R39.2, R39.3: no action, no continuation |
| **Master Implementation Blueprint** | §12.1's *Journal entry* — one chapter told in depth, attributed to a named person, **carrying no action at its close, ever**. §12.1's *Journal index item* — listed by what it is about, not by when it was posted, and no longer sorted by when it was posted either. R6.4: two authored strings removed, none written. R7.1: the chapter set is declared once and the ordering reads it |

### Technical metrics

| Metric | Value |
| --- | --- |
| Files created | **0** |
| Files modified | 5 (the index, the article surface, the Article model, the content collection, the content check) |
| Components, primitives or systems created | **0** |
| Content edited | **1 frontmatter file** — a chapter declared, a placeholder cover and a `featured` flag removed, the article held as a draft |
| Authored strings removed | **2** |
| Copy authored · photographs introduced · facts invented · articles written | **0 · 0 · 0 · 0** |
| Articles published | **0** |
| Publication findings | 236 → **233** |
| Routes prerendered | 33 → **32** |
| Dependencies added / removed | 0 / 0 |

### Debt recorded, not paid

**The article's cover file is orphaned.** `public/images/journal/choosing-full-grain-leather/cover.webp`
is a generated placeholder referenced by nothing. It is still listed by the
placeholder manifest and reported by the gates, which is correct while it exists;
removing generated assets is a Stage 0 inventory pass, not a surface package.

**There is no Person model.** R45.3 defines one — *name · role · written consent
on file* — and R45.4 makes it the source of every rank-7 piece of evidence on the
site. It is not built, because dependency 5 is blocking and building a model for
records that may not exist would be the speculative structure X8 refuses. Until
then `author` is a string, and an article naming a person who has not consented
would pass the schema and fail the constitution. That gap closes when dependency
5 does, and it is the one place Journal cannot enforce its own rule.

**`byNewestFirst` has no caller.** Left in `collection.ts`; its removal is
inventory, alongside `ProcessSteps` and the `Gallery` masonry component.

### What Journal waits on

| Level | Waits on |
| --- | --- |
| **Every article** | **Dependency 5**, blocking — R24.6 and R45.1 require a named author, R45.3 requires written consent, and there is no third option |
| The one article's chapter, author and form | **Dependency 12**. R24.1 and R24.2 are editorial judgements; the build can hold it as a draft and record why, and no more |
| Article photography | **Dependency 1** and dependency 19. MIB R18.1: *whatever the article's chapter requires*, at E2 or E6, with provenance |

### Stopping here

Journal is composed, and it is composed as documentary publication rather than as
a blog: an article is one chapter or it is not an article, the order is the
chapter set's and not the calendar's, nothing is featured, nothing ends with an
ask, and the one article on file does not publish because nobody has yet put
their name to it. Integration is not begun.

---

# INTEGRATION AUDIT 01

## The debt the surface packages recorded, paid

**Stage** 1 complete · **Status** complete · **Governing** MIB Part V (§15 the
content objects, §16 the publication gates), R7.1 one source of truth, R10.3 the
closed inventory, R15.1, R15.3, R15.5, R15.6, §20 the dependency register · UX
Blueprint R19.3, R23.4, R24.1, R37.2, R45.1 · Brand Bible §3.3

**No component, primitive, abstraction or system was created.** Nothing was
redesigned. Every change is a removal, a consolidation, or a stale value
corrected, and every one of them was named as debt by a package that could not
pay it at the time.

### What the audit measured against

Three questions, asked of the whole tree rather than of a surface:

1. **R10.3 — the inventory is closed.** *A component not listed in §11, §12 or
   §13 does not exist.*
2. **R15.1 — the object map.** Thirteen content objects, and R15.6: *an object
   with no content is not created in advance.*
3. **R7.1 — one source of truth.** *A reference is always preferable to a copy.*

### Removed: components outside the closed inventory

| Removed | Why it was dead | Rule |
| --- | --- | --- |
| `components/common/logo.tsx` | Imported by nothing, on any surface, since the navigation package replaced the logotype with the company name set in type | **R10.3** — not in §11's structural set |
| `components/sections/page-blocks.tsx` (`ProcessSteps`) | The numbered ladder left Manufacturing under R17.2, Quality under R20.3 and Export under §7.4, in that order. Recorded as *having no caller* in the Export package | **R10.3** — no "sequence" component exists in §11, §12 or §13 |

`EvidenceBlock`, `PullQuote`, `LimitStatement` and `Pagination` have no caller
either and **stay**: each is a row of §12.1 or §13.1 with a stated condition it
is waiting for. The inventory is a list of what must exist, not a list of what is
currently rendered.

### Removed: an object the map does not hold

**The gallery album.** `galleryAlbumSchema`, `getGalleryAlbums`,
`getAllGalleryImages`, the `gallery` entry in `contentRegistry`, the
`GalleryAlbum` type and five `album.json` documents.

R15.1's map has thirteen objects and **Album is not one of them.** R15.3 states
the mistake precisely: *"factory images" is not a separate object — it is an
Image whose chapter is C1. Creating either as its own type would duplicate a
fact and break R7.1.* An album was a second grouping of photographs sitting
beside the chapter attribution the archive already records against every frame.

It also carried what R15.5 forbids outright — a `featured` flag and a `cover` —
and its five members were *Factory · Machinery · Products · Packaging · Events*,
the aesthetic themes R23.4 refuses by name. The Gallery package stopped reading
it and recorded the removal as *a content-model decision rather than a surface
package's*. This is that decision.

### Removed: presentational fields with no reader

**`featured`, from four models and eleven content documents** — Category,
Subcategory, Machine, Product and Testimony. R15.5 is unambiguous: *no object
carries presentational fields; no layout, variant, **featured style**, emphasis
or display order intended to create prominence.*

Its three readers went with the surfaces that used them —
`getFeaturedProducts`, `getFeaturedMachines`, `getFeaturedTestimonials`, all now
removed — so the flag had become a field the content layer maintained for
nobody. The Journal package removed the fifth instance from Article under R45.1.

**`ProductFilter` went from six fields to two.** `category` and `subcategory` are
what a surface asks for; `featured` and `limit` promoted a subset, `tag`
filtered on a field no surface reads, and `exclude` documented itself as *"used
for related products"* — the recommendation R19.3 and UX §24 keep off this site.

### Removed: a menu that no longer exists

`getProductsMegaMenu`, `getFeaturedProducts`, and the `navLinkSchema`,
`navItemSchema`, `megaMenuColumnSchema` and `megaMenuSchema` models with their
types.

The mega-menu component was deleted in the navigation package; the loader was
recorded as *having no consumer* in **three successive debt tables** and the
schemas outlived both. `src/models/navigation.ts` now holds one object — the
breadcrumb, which R38.4 keeps. R15.6: **structure is not created in advance of
content**, and a schema kept for a component that was removed is the same
mistake pointed backwards.

### Consolidated: three copies of one truth

| Was | Is | Rule |
| --- | --- | --- |
| `CHAPTER_ORDER`, ten ids re-typed in `chapter.tsx` beside the `chapterSchema` enum its own comment cited | `chapterSchema.options` | **R7.1** — an order re-typed beside the set it orders is the exact shape that eventually disagrees with itself |
| `byOrderThenName` and `byOrderThenTitle`, declared in `collection.ts` **and** again inside `catalog.ts` | Imported from `collection.ts` | R7.1. Two orderings of the same thing, one of them exported and unused |
| `byNewestFirst`, exported with no caller after Journal reordered by chapter | Removed | Recorded in the Journal package |
| `findIn`, a registry helper left behind when the gallery collection went | Removed | Dead |

### Corrected: one stale configuration value

`scripts/generate-placeholders.mjs` still wrote the journal cover to
`images/blog/…`, the address the routing package retired and redirected
permanently. Re-running the generator would have produced a file the image
library does not know, and `images:record --check` would have failed on a path
nobody had touched. One word.

### What was examined and deliberately left

| Left | Why |
| --- | --- |
| **`components/gallery/` (the masonry set)** | Outside the inventory and a §31.1 defect, and it still has one caller: `technology/[machine]`. Replacing it is a composition decision on a surface that has not been composed. The Gallery package assigned it to Technology's package and that assignment stands |
| **`components/ui/index.ts`** | Imported by nothing — every consumer takes the sub-barrels — but it is where the six element types of §34.2 and R10.3's closure are written down. Deleting an unused barrel that carries the inventory's own statement is a net loss |
| **98 placeholder image files, 51 of them now referenced by no document** | The Placeholder gate refuses all 98 and dependency 1 replaces them wholesale. Deciding which orphans are archive candidates is the picture editor's call (dependency 19), and the brief for this package excludes anything requiring photography |
| **`Pagination`, `EvidenceBlock`, `PullQuote`, `LimitStatement`** | §12.1 and §13.1 rows, each waiting on its stated condition |
| **The unrendered MDX bodies** | Recorded in the Export and About packages. Widening the Register gate to read them is a change to a gate, not a removal, and it belongs to the Facts Register's own package |
| **`order` on categories and products** | R15.5 permits ordering *where order is a fact*. Whether the company's own listing order is a fact is an editorial question, not a dead-code one |

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 32 pages prerender
npm run check:publication -- --selftest   ✓ 23 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 138 findings (was 233)
```

**233 → 138.** Every one of the 95 that left was a finding against an album
document — a placeholder frame with no provenance, no caption and no threshold,
reported three times because three gates walked the same document. None of them
was fixed; the object that carried them is gone, and the frames themselves are
still on disk and still refused by the Placeholder gate.

| Metric | Before | After |
| --- | --- | --- |
| Source files under `src/` | 138 | **133** |
| Content documents under `src/content` | 37 | **32** |
| Zod schemas | 48 | **43** |
| Exported functions with no caller | 8 | **0** |
| Duplicated declarations of one value | 3 | **0** |
| Publication findings | 233 | **138** |
| Routes prerendered | 32 | 32 |
| Components created · abstractions created | — | **0 · 0** |

### The dependency register, as it now stands

**21 declared · 3 discharged · 18 outstanding.** Every one of the eighteen is
owned outside the build, and none is waiting on construction.

**Blocking — do not begin the affected work (7)**

| # | Dependency | Owner | While outstanding |
| --- | --- | --- | --- |
| **1** | Access to a working shift | Client | Surfaces are designed around the absence of images. **Never around placeholders** |
| **2** | Confirmation of the company name | Client | Nothing is published carrying a name that may be wrong |
| **5** | Written consent process for individuals | Client | No person appears, named or unnamed, in any image |
| **12** | Copy, authored under Brand Bible §11–§12 | Client / copywriter | No surface is built with stand-in text (R6.4) |
| **13** | Typeface licensing, in perpetuity, with tabular figures | Client | Stage 0 cannot be completed; the roles are fixed and the faces are not |
| **19** | The archive, with retained originals | Client / picture editor | No image publishes without provenance |
| **20** | The reply process — a named person who answers | Client | A form that submits into nothing fails the brand's central promise |

**Gating — built, designed around, not shippable (9)**

| # | Dependency | Owner | While outstanding |
| --- | --- | --- | --- |
| **3** | The Facts Register at Brand Bible §19.4 — **23 unconfirmed facts** | Client | Every `REGISTER` field is withheld; surfaces stand on mechanism |
| **4** | Whether a rejection can be observed | Client | Quality carries C2 and C8 only, and says so honestly |
| **6** | Written permission for buyers' products | Client | Only work the company may show is shown |
| **7** | Certificates: issuer, reference, date, scope | Client | Quality states mechanism; no marks appear |
| **8** | Country confirmation — markets actually shipped to | Client | Export states process; no markets are named |
| **9** | Machine verification — what each machine is and does | Client | Records state the operation and what it makes repeatable |
| **10** | Whether a reply time is operationally guaranteed | Client | Enquiry states who reads it and what happens, without a time |
| **11** | Whether saddles are in scope | Client | Category structure is not finalised |
| **15** | The evidence threshold's second derivation | Creative Director, after the first shoot | The Calibrated value stands; re-derived before Stage 1 publishes |

**Soft — build, ship, improve later (2)**

| # | Dependency | Owner |
| --- | --- | --- |
| **14** | The logotype decision | Creative Director |
| **16** | Functional-hue verification against a real photograph | Creative Director |

**Discharged (3):** 17 the five primary navigation destinations · 18 acceptance
that nothing is gated and individuals are not tracked · 21 distribution of all
eight documents to every builder.

**Nothing on this list is a construction task.** The one item the build still
owns is recorded below, and it is not blocking.

### What the build still owes, and it is not on the register

**There is no Person model.** R45.3 defines it — *name · role · written consent
on file* — and R45.4 makes it the source of every rank-7 fact on the site. It is
not built because dependency 5 is blocking and R15.6 refuses structure created
in advance of content. Until then `author` on an Article is a string, and an
article naming a person who has not consented would pass the schema and fail the
constitution. **It is the one rule the build cannot currently enforce**, it was
recorded in the Journal package, and it is built the day dependency 5 is
discharged — not before.

### Stopping here

The repository holds no dead component, no dead loader, no unused schema, no
duplicated declaration and no stale route. Every remaining absence is a
dependency owned by somebody outside the build, and every one of them has a
recorded answer for what the site does meanwhile. Photography integration is not
begun. Copy integration is not begun. Launch is not begun.

---

# INTEGRATION PREPARATION

## Seven handover paths, checked; three of them were open

**Phase** Integration preparation · **Status** complete · **Governing** MIB Part V
(§15 the content objects, §16 the publication gates), §20 the dependency
register, R8.7, R9.2, R15.1, R15.4, R16.5, R19.5, R20.1, R20.4, R20.6 · UX
Blueprint R44.1, R18.4, R43.4 · Photography Direction §5, §22.5, §24.4, §24.5 ·
Brand Bible §19.2, §19.3, §19.4

**No content was populated. No photograph, fact, certificate or word was
invented. Nothing was redesigned and no architecture was added** — every change
below is a field the constitution already required, a report reading a wider set,
or a mechanism the code already had and the repository was missing.

### What was checked

Each of the seven handover paths was walked end to end, asking one question:
**when the client sends the real thing, is there somewhere for it to go, and does
the gate that refuses it today go quiet?**

| Path | Verdict |
| --- | --- |
| Photography ingestion | **Open** — the report went blind at the moment it mattered, and the gate could not go green file by file |
| Provenance recording | Built. `images:record` writes every authored field absent and never invents one |
| Facts Register population | Built, and proved: a classification change plus its written document is the whole edit |
| Company record confirmation | Built. The confirmation sheet asks each question and quotes what the build is holding |
| Certificate ingestion | **Open** — the gate demanded three fields the model could not hold |
| Machine verification | **Open** — half the governed attributes were invisible to the gate by construction |
| Copy import | Built. Every hole exists and is empty; imported text is scanned on arrival |

### Photography ingestion — the report went blind at the moment it fills

`images:record` listed what each frame still needed **only for frames a document
referenced.** That was right while a document was what put a photograph on a
surface. It stopped being right when Gallery and every chapter began reading
`chapterFrames` — which asks the **library** what it holds for a chapter (R8.7,
R15.4), not a document.

So the ordinary case after the shoot is a frame no document names, and the report
would have said nothing about the archive at exactly the moment it was filled.
Measured: **47 frames reported before, 98 after** — the whole archive.

### Photography ingestion — the gate could not go green one frame at a time

The Placeholder gate reads `public/images/.placeholders.json`, the generator's
own record of what it produced, and **the file was not in the repository.** With
it missing the gate falls back to the README's presence, which flags every file
at once: the first real photograph would still have been reported as a
placeholder, and the gate could never have gone partly green during an ingestion
that will take weeks.

The manifest is now written, from the current tree — a fact about what the
generator made, not a judgement. Proved by removing one line: **98 → 97, and the
example moved to the next file.** Replacing a frame is now: drop the file, record
it, delete its line.

`public/images/README.md` carried the instruction that made this invisible —
*"replace them in place with the client's optimised photography, so no code
changes are needed."* That has been false since the library became the source. It
now states the four steps that are actually required, the five fields a frame's
record must carry, and the one command that must never be run again once real
photography is here.

### Certificate ingestion — the gate asked for fields the model could not hold

`certificationSchema` held `name`, `issuer` and `year`. The Certification gate
asks for five — R15.1: ***issuer, reference and date, or it is not published**;
plus what it does **not** cover* — and the snapshot supplied three of them as a
hardcoded `undefined`, so the gate reported them missing for a reason no answer
could have fixed. **The certificate would have arrived with nowhere to type it.**

`reference`, `covers` and `excludes` are added, optional in the model and
mandatory at the gate — the same arrangement every governed fact has — and the
snapshot now reads them instead of typing them absent.

**This is not the `registrationIdentifiers` case.** That field was refused
because adding it empty would have made the legal surface render a label with
nothing behind it — Milestone 0.8's finding, *a claim that something exists and
is being withheld*. A certification record renders **nowhere**: R20.1 keeps marks
off Quality entirely and dependency 7 is gating. Adding these publishes nothing;
it gives the answer a home. Proved by selftest: **a certificate carrying all five
fields clears the gate.**

### Machine verification — half of it was invisible by construction

Four consecutive debt tables recorded that machine records still publish
`manufacturer`, `origin`, `capacity`, cutting force and power. The prose scan
caught some of it — *"25 tonnes"*, *"900 pieces per shift"* — and **could never
have caught the rest**: `machine-origin` carries no markers, because a
manufacturer's name and a country are unbounded strings and a pattern for "Atom"
or "Italy" would match half the site.

That is the same blind spot the About package found on a founding year, and it
has the same fix, using the same mechanism: **a field known to state a governed
fact is read as a field, not hunted for in prose.** `registerFields` already does
this for the company record; machines are the second object to use it and it
needed no new one.

Twelve findings, one per machine per fact, each naming the attributes a single
confirmation would cover:

```
machine:clicking-press.manufacturer, origin
    Machine manufacturers and countries of origin is classified authored…
machine:clicking-press.capacity, Cutting force, Cutting area, Stroke adjustment, Power
    Machine tonnage, speed and per-shift capacity is classified authored…
```

Proved by selftest: **a machine attribute naming a governed fact is refused.**
Dependency 9 is now answerable attribute by attribute rather than as a heading.

### The three paths that were already built, and needed nothing

**Facts Register population.** One edit: `classification` becomes `confirmed`
and `confirmation` records the document and the date it arrived. `isPublishable`
requires both, so R20.6 — *"the client confirmed on a call" is not a Register
classification* — is enforced rather than remembered. Three selftest cases
already prove it: confirmed-without-a-document publishes nothing,
confirmed-with-one does, and a field naming a fact the register has lost is
refused rather than ignored.

**Company record confirmation.** `npm run check:publication -- --confirmations`
prints one question per field, what the build is currently holding, and which
dependency the answer discharges. Twelve fields outstanding. `check:content`
refuses a new field on `CompanyProfile` that nobody has classified, so the record
cannot grow an unclassified claim while the handover is in progress.

**Copy import.** No tooling, and none is wanted. Every hole exists and is empty:
`Close` takes a statement and is passed none; `Opening` takes an eyebrow and a
summary from frontmatter; `Chapter` takes a statement for its `statement` and
`inverted` openings. Copy lands in the content files it belongs to, and the
Register gate scans authored text on arrival — so a sentence carrying an
unconfirmed figure is refused the moment it is pasted in, which is the only
guard copy import actually needs.

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 32 pages prerender
npm run check:publication -- --selftest   ✓ 25 checks (was 23)
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 150 findings (was 138)
```

**138 → 150, and the direction is correct.** Twelve machine attributes that were
being published unconfirmed and unreported are now reported. A gate that finds
more after a change either found something real or was broken; these were real,
they were recorded as debt four times, and they were invisible because nothing
was looking where they lived (Brand Bible §19.1).

| Integration path | Before | After |
| --- | --- | --- |
| Frames the archive report covers | 47 | **98** |
| Placeholder detection | all-or-nothing | **per file** |
| Certificate fields the model can hold | 2 of 5 | **5 of 5** |
| Machine attributes the Register gate sees | prose matches only | **every field, by machine** |
| Selftest checks | 23 | **25** |
| Content populated · photographs added · facts invented | — | **0 · 0 · 0** |
| Components · abstractions · architecture created | — | **0 · 0 · 0** |

### No duplicated sources

Every value added is read from where it already lives. The certificate fields are
on the company record and the snapshot reads them; the machine attributes are in
the machine documents and the snapshot derives from them; the classifications are
in the Facts Register and both reach them by `factId`, which is the one place
R20.6 permits a classification to change.

The machine classification sits in the snapshot builder rather than beside
`companyRecord`, and deliberately: `companyRecord` exists because the
confirmation sheet prints it, while certifications, testimonies, categories and
now machines are snapshot inputs built from content in the one place that builds
snapshot inputs.

### What the client can now do, in order

| # | When this arrives | Do this | And this goes quiet |
| --- | --- | --- | --- |
| 1 | **Photography** (dep. 1, 19) | File under `public/images/…` → `npm run images:record` → type the five record fields → delete its line from `.placeholders.json` | Provenance · Record · Threshold · Placeholder, **frame by frame** |
| 2 | **The company name, address, founding year** (dep. 2) | Classify the fact `confirmed` in `facts-register.ts` with the document it came from | Register, field by field |
| 3 | **Certificates** (dep. 7) | Type issuer, reference, date, covers and excludes into `company.certifications` | Certification |
| 4 | **Machine confirmations** (dep. 9, 3) | Classify `machine-origin` and `machine-specification` against the written confirmation | Register, machine by machine |
| 5 | **Markets shipped to** (dep. 8) | Classify `export-markets`; Export's country records become publishable | Register |
| 6 | **Consent** (dep. 5) | Build the Person model against real records — the one construction task left, and it waits deliberately (R15.6) | Consent; C10 becomes tellable |
| 7 | **Copy** (dep. 12) | Into the content file it belongs to; the Register gate reads it on arrival | Nothing — copy is not gated, it is scanned |

### Stopping here

Every path a real asset must travel has been walked, and the three that were
closed are open. Nothing has been populated: the archive holds 98 placeholders
and no photograph, the register holds 23 unconfirmed facts and no answer, and the
certificate fields are empty and waiting. Photography integration is not begun.
No content is populated. Launch is not begun.

---

# FINAL ENGINEERING AUDIT

## One pass over the whole tree, looking only for defects

**Phase** Final engineering audit · **Status** complete · **Governing** MIB R7.1
(one source of truth), R9.2, R10.3 (the closed inventory), R15.6, §20 (the
dependency register) · UX Blueprint R29.2

**No component, primitive, abstraction, system or surface was created, and
nothing was redesigned.** Every change below is a dead symbol removed, a stale
reference corrected, or an obsolete configuration entry deleted. No gate was
changed, no schema was widened, no content was populated.

### What was audited

The whole tree, against one question per category: dead imports and exports,
duplicate logic, unreachable code, inconsistent naming, stale comments, obsolete
scripts, obsolete dependencies, duplicated configuration, broken references, and
build and lint warnings. Exported names were enumerated mechanically and each
one traced to a caller.

### Removed: symbols with no reader

| Removed | Why it was dead |
| --- | --- |
| `assetScope.album` (`lib/content/assets.ts`) | The last surviving reference to the Album object. Integration Audit 01 removed the schema, the loaders, the registry entry, the type and five documents; the asset scope pointing at `images/gallery/…` outlived all of them |
| `RECOGNITION_CHAPTER` (`components/structure/chapter.tsx`) | `RESERVE_RECOGNITION_CHAPTER` has one caller — Quality. The C3 constant beside it had none: which chapter is Recognition on a surface is read from that surface's telling in `config/tellings.ts`, and a constant restating it is **R7.1** broken |
| `libraryImages()` (`lib/content/images.ts`) | Documented *"for tooling and audits"* and used by neither. Its two would-be callers — `chapterFrames` and `check:content` — each open the library themselves, so the export was a third statement of a one-line map |
| `formatNumber`, `formatCount` (`utils/format.ts`) | A pair with one internal caller and no external one. `formatDate` stays and is used six times |
| `ImageSizeName` (`utils/image.ts`) | A `keyof typeof` over `imageSizes`. The table has twenty callers; the type had none |
| `StaticRoute` (`constants/routes.ts`) | A union over `ROUTES` that nothing ever annotated with |
| `src/providers/` | An empty directory left behind when `smooth-scroll.tsx` went at Milestone 0.3 |

### Corrected: references to things that no longer exist

| Was | Is | Kind |
| --- | --- | --- |
| `tsconfig.scripts.json` excluded `src/animations/**` and `src/providers/**` | Both entries removed — neither directory has existed since Milestone 0.3 | Obsolete configuration |
| That file's own header said it is *"used only by `npm run check:content`"* | Three commands compile through it: `check:content`, `check:publication`, `images:record` | Stale comment |
| `generate-placeholders.mjs` grouped the journal cover under `// Blog` | `// Journal`. Integration Audit 01 corrected the path and left the heading above it untouched | Stale comment |
| `models/product.ts` — `thumbnail` *"used in cards, grids and mega-menu previews"* | Both `components/cards/` and the mega-menu were removed at Milestones 0.5 and 0.7. The field is now described by what it is | Stale comment |
| `lib/mdx/README.md` — *"which is why this folder holds no code"* | The folder holds `components.tsx` and `load.ts`. The sentence is about **plugin** code and now says so | Broken reference |
| `config/index.ts` listed three modules; there are four | `tellings` — which chapters each surface carries — added to the header | Stale comment |
| `services/email.ts` — *"Phase 8 owns the full email feature"* | A phase numbering that no longer exists. The absent customer acknowledgement is now explained by the dependency that actually holds it — **20**, a named person who answers | Stale comment |

### Dependencies, checked one by one

**Sixteen production dependencies, and every one has a caller.**
`@mdx-js/loader` and `@mdx-js/react` are never imported and are correct:
`@next/mdx` declares both as peer dependencies, and the framework's own MDX
guide installs all four alongside `@types/mdx`. Nothing was added and nothing
else could be removed.

### What was examined and deliberately left

| Left | Why |
| --- | --- |
| **The Value gate's three build-owned findings** | `utils/image.ts` (7), `services/email.ts` (10), `gallery.tsx` (2). Every one is a literal that **cannot** reference the token source: a `sizes` attribute is read by the browser's preload scanner before any stylesheet exists, and an HTML email is rendered by clients with no custom-property support. The gate reports them as *"the build's own to fix"* and the build cannot fix them. **This is the one open engineering item, and it is a gate change rather than a code change** — the same correction `stripComments` made for comments, needing the same constitutional judgement about whether a breakpoint inside a `sizes` string is a design value. Not taken here, because narrowing a gate is not a defect fix |
| **`PhoneInput`, `FileUpload`, `RadioGroup`, `Switch`** | Four form controls with no caller — the enquiry form uses `Input type="tel"` and carries no attachment. All four were **rewritten** by Milestone 0.7's forms package rather than removed, which is a decision that package took with the inventory in front of it. Deleting them now would reverse it on weaker information |
| **`Pagination`, `EvidenceBlock`, `PullQuote`, `LimitStatement`** | §12.1 and §13.1 rows, each waiting on its stated condition. Unchanged since Integration Audit 01 |
| **`components/gallery/` and `components/ui/index.ts`** | Both were examined and recorded at Integration Audit 01, and both reasons still hold |
| **Four recursive directory walkers and three document-image walkers across the three scripts** | Genuinely near-identical, and consolidating them means a shared module parameterised three ways. The brief excludes abstractions, and three ten-line recursions in three standalone tools cost less than the helper that would replace them |
| **Over-exported internals** — `flagEmoji`, `resolveAsset`, `imageRecord`, `INCLUDE_DRAFTS`, `SITE_ACTION_LABEL`, `stripComments`, and the sub-schemas across `models/` | Each has a real caller inside its own module. `export` on them is wider than necessary, not dead, and narrowing forty of them is churn with no reader |
| **`docs/architecture/`, `docs/design-system/`, `docs/content/`, `docs/development/`** | These pre-date the brand documents and still describe `MegaMenu`, `Carousel`, `Lightbox`, `Timeline`, `StickyCta`, `Counter`, `ProcessSteps`, `/api/contact` and `/buyer-enquiry` — every one of them removed. `docs/README.md` links them as current. **Reconciling them is authoring, not a defect fix**, and the authority chain that governs the build is `docs/brand/` |

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green
npm run build                             ✓ green — 32 pages prerender, no warnings
npm run check:publication -- --selftest   ✓ 25 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 150 findings — unchanged
```

**150 before, 150 after, and that is the point.** This pass removed dead code;
it touched no gate, no schema and no document, so nothing the gates measure
could have moved. A number that changed here would have meant the audit did
something it was not asked to do.

| Metric | Before | After |
| --- | --- | --- |
| Exported names with no reader anywhere | 7 | **0** |
| Stale references to removed code | 7 | **0** |
| Obsolete `tsconfig` exclude paths | 2 | **0** |
| Empty directories | 1 | **0** |
| Production dependencies · without a caller | 16 · 0 | 16 · **0** |
| Source files under `src/` | 133 | 133 |
| Routes prerendered | 32 | 32 |
| Components · abstractions · architecture created | — | **0 · 0 · 0** |

### Repository consistency — one thing that is not a code defect

Eleven files the build depends on are **untracked in git**, among them
`scripts/record-images.ts`, `src/lib/images/intrinsic-size.ts`,
`src/lib/content/{evidence,images}.ts`,
`src/lib/publication/{company-record,dependencies}.ts`, `src/config/tellings.ts`,
`src/content/images.json` and `public/images/.placeholders.json`. Nothing is
wrong with them; they have simply never been committed. A clone at `HEAD` does
not build, and the integration tooling this handover turns on is not in the
history. **Committing the working tree is the first thing to do**, and it is the
owner's call rather than the audit's.

### Stopping here

**The engineering implementation is complete.** TypeScript, lint and the build
are clean with no warnings; the content check is green; the image library
matches the files on disk; the gates' selftest proves all twenty-five refusals.
The repository holds no dead component, no dead export, no dead loader, no
unused schema, no duplicated declaration, no stale route and no obsolete
dependency.

One engineering item remains open and is recorded above: the Value gate names
three files as the build's own to fix, and the literals it names cannot be
tokenised. That is a question about a gate's scope, decided by the constitution,
not a defect in the code it points at.

Everything else outstanding is client-owned integration — the eighteen
dependencies at §20, unchanged — plus the one construction task that waits
deliberately on dependency 5, the Person model. No further architecture is
authorised, and none is needed.

---

# PRESENTATION PACKAGE — HOME

## The surface had one tone, one measure and no invitation worth taking

**Phase** Presentation · **Status** complete · **Governing** VDS §10.1 (the
measure), §14.5 (simulated material), §16.2, §23.1, §23.4, §23.6 (the inverted
field), §31.3, §31.4, §36.2, §36.3, §42.3–§42.7 (motion), §47.5 · Motion
Direction M6, M7, M10, M13, M15 · Documentary Storyboard §7, §10.1, §17.2,
§22.3, §17.4 · Brand Bible §16.4 · UX Blueprint R39.1–R39.4, X8

**No architecture was added, no primitive was created, no documentary model was
rewritten, and no milestone was undone.** No company fact, figure, date,
certificate, market, customer or claim was invented, and no copy was authored
beyond four link labels naming destinations. Every change is composition,
tone, measure, motion or a target size.

### What was measured, before anything was changed

| Measured | Was | Required |
| --- | --- | --- |
| Body measure, both chapters | **131 characters** | 60–72, target 66 (§10.1) |
| Distinct ground tones on the surface | **1** — every section `rgba(0,0,0,0)` | Three exist in the palette |
| The held moment | **720px of white**, 812 on a phone | Silence, which is only legible against something |
| Recognition's mechanism heading | **22px** (T3) | Above the release beneath it, which was 30px |
| Image mass | **0%** | A photography-led documentary |
| Atmosphere marks in use | **0** of 4 built | — |
| Tap targets under 44px | **21** | None (§47.5) |
| Actions on the site | **8 surfaces** | One invitation |

### The measure — the single worst thing on the page

Both chapter annotations were passed `measure={false}`. That prop means *let
the field set the width, where the field **is** the reading column*, and the
field they sit in is `paired` — `max-w-field`, 1440px. So the reading column
was discarded and the two passages carrying this surface's whole argument ran
at **131 characters a line**, against the 66 §10.1 fixes and the ~75 past which
the eye stops finding the start of the next line.

Removed. **131 → 71 characters**, 640px, on the column the system is built
around. Nothing else on the page changed as much for as little.

### The tonal rhythm — what the surface did not have

Every one of six top-level sections computed to transparent: 7,649px of one
paper value from the masthead to the footer rule. The palette has three grounds
and the surface was spending one.

| | Was | Is | Rule |
| --- | --- | --- | --- |
| The held moment | Paper — a 900px white gap in a white document | **Ink**, one viewport | §23.6 rations the inverted field to once per surface at a minimum of one viewport height; §23.4 fixes the held moment at exactly that. The two specifications describe the same rectangle, so the strongest marker and the strongest transition are spent together, once, on the entrance to Recognition (§17.4, §22.3) |
| The range | Paper, a text list | **Recessed**, with record rows | §36.3: Recessed is *the one permitted container*, and it exists *to bind a specification into one object*. A list of what the company makes is a specification of the range |

The surface now reads paper → paper → **ink** → paper → **recessed** → paper.

### The range — where the product was, and there was no product

The one section whose subject is what the company makes carried no image mass
at all: two paragraphs where the range should be. `RecordSet` has always known
how to do this — §36.2's record row, *what replaces the card*, an image on the
5-unit column and the specification on the 3-unit — but it was being handed
items with no frame, so it fell back to passages and the pairing never engaged.

It now reserves a 3:2 field per category. **That ratio is art direction, not a
stand-in**: the generated files are square, that square is an artifact of the
placeholder script's own ratio table, and every one of those files is deleted
the day photography lands. The layout states the crop; the shoot delivers it.

### Motion — introduced, and it is not a scroll reveal

Milestone 0.3 removed the reveal machinery and measured the result: zero
elements at opacity 0, zero transformed, zero animations. The surface was
correct and it was inert.

§42.3 names the entrance this system does have — band 4, *"the whole viewport:
an inverted field, **a surface transition**"* — and M6 supplies the cause: a
visitor who opened a surface caused it to arrive. One `arrive` keyframe on
`main` at 540ms on the one curve, and one on each frame at 360ms as it resolves
out of the space it was already occupying.

Measured after the change, against Milestone 0.3's own audit table:

| Check | Value |
| --- | --- |
| Elements in `main` below full opacity, after arrival | **0** |
| Elements transformed away from their place | **0** |
| Perpetual animations | **0** (M15) |
| `scroll-behavior` | `auto` — the browser's own (M7) |
| Simultaneous movements per field | **1** (M10) |
| `animation-fill-mode` | `both`, so reduced motion paints the end state and substitutes nothing (§42.7) |

**Nothing waits below the fold and nothing is withheld from a visitor who does
not scroll**, which is §42.5 kept rather than reinterpreted. Hover is one
property in band 1 everywhere it exists: a navigation underline changes colour,
the action changes ground. Nothing scales, lifts, shadows or moves.

### The atmosphere — four marks, none of them visible

§14.5 sets the threshold for simulated material at zero. Every mark here is at
or below **2% ink**, which is the value at which the claim stops being made: it
is not a leather surface, it is the reason the field does not read as a screen.
L14 is satisfied the same way — a mark that cannot be seen cannot carry an
argument. All four are painted behind the content and any frame covers them
completely; evidence wins (R8.7).

| Field | Mark | Opacity |
| --- | --- | --- |
| The arrival | Saddle stitch, repeat | 2.0% |
| C1 · The place | Horse, one silhouette, never repeated (M15) | 1.8% |
| C3 · The decision | Basketweave tooling, repeat | 1.5% |
| The close | Western tree in outline | 2.0% |
| Every surface | Paper tooth, fractal noise | under 2% |

### The reserved frame

Demo mode only, and it is not a stand-in for a photograph: it is the space a
photograph will occupy, at that photograph's own measured ratio, in the two
paper tones, with a registration mark — what a plate is aligned to before it is
printed, which is what the frame is waiting for.

No file is served and no `<img>` is emitted, so the Placeholder gate — which
reads files — sees nothing new, and **the gates are unchanged: 9 of 13 refuse,
150 findings, exactly as before.** `NEXT_PUBLIC_DEMO_MODE=off` returns every
surface to the state it ships in with no photography.

The last generated tone block reaching a surface was Technology's hero — a
brown gradient outside the closed eight-value palette, served as though it were
a photograph. **Zero generated files now reach any surface.**

### The CTA — eight surfaces to two

R39.3 permitted the action on eight and the site carried it on all eight. The
client's instruction was to remove it from six, and the brand documents already
argue the reason: Brand Bible §16.4, *a luxury brand does not chase.* An ask
repeated on every surface is not eight invitations — it is one invitation that
has stopped being believed.

**R39.1 is untouched**: one action, one door, one label, leading to Enquiry and
nowhere else. What changed is R39.3's *where*, in the direction R39.4 already
points. Manufacturing, Quality, Export, About, Products and the category
surface now end on a continuation instead — R39.2, *a link rather than a
demand.* `check:content` asserts the new list so it cannot drift back.

### Header and footer

Both were inset by S2 — 16px — while every field beneath them uses §24.1's
margins, 24 below 720px and 48 above. **The masthead did not line up with the
first word of the page it sat over, on any screen.** Corrected to the field's
own padding.

The footer's three blocks were laid out with `justify-between` on a 1440px
field: the record in the left corner, ten links in the middle, two on the
right, and two lakes of nothing between. It is now a grid at the 5+3 asymmetry
§29.2 gives every other paired thing in this system, with the index in two
columns. **No fact was added or removed**, and §37.2's "never" list is intact.

### Targets

**21 interactive targets measured under 44px** — the whole footer index at
23px, every navigation destination at 20px, the wordmark at 23px. §47.5 sets
the minimum at 44 × 44 because below roughly that the error rate rises sharply
for anyone whose hands are not steady, and the footer index is the one place on
the site where every destination is reached by thumb. **Now 0.**

### Verification

```
npx tsc --noEmit                          ✓ clean
npm run lint                              ✓ clean, no warnings
npm run check:content                     ✓ green — action list updated and asserted
npm run build                             ✓ green — 32 pages prerender, no warnings
npm run check:publication -- --selftest   ✓ 25 checks
npm run images:record -- --check          ✓ the library matches the files
npm run check:publication                 ✗ 9 of 13 refuse, 150 findings — unchanged
```

Measured in the running application, at 1440 × 900:

| | Before | After |
| --- | --- | --- |
| Body measure | 131 characters | **71** |
| Ground tones on the surface | 1 | **3** — paper, ink, recessed |
| Image mass | 0% | **40%** |
| Reserved frames, exact ratio | 0 | **5** — 2.00, 1.00, 1.78, 1.50, 1.50 |
| Atmosphere marks | 0 | **4**, all ≤ 2% |
| Recognition heading vs its release | 22px vs 30px | **32px vs 32px**, peak marked by the ink field |
| Tap targets under 44px | 21 | **0** |
| Horizontal overflow, 375 / 768 / 1440 | none | **none** |
| Actions on the site | 8 surfaces | **2** |
| Generated tone blocks reaching a surface | 1 | **0** |
| Elements below full opacity after arrival | — | **0** |
| Facts, figures, certificates, markets or copy invented | — | **0** |

### What is still the client's, and it is the only thing left

**Photography.** Dependency 1 and 19. Five reserved frames on Home, and the
held moment's own plate — `home/pause.json` declares a photograph and the field
is currently ink with nothing in it, which is what §23.4 permits and what the
frame will fill. Copy is dependency 12; the Facts Register is dependency 3.

Nothing on this surface is waiting on the build.
