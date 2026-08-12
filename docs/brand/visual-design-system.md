# Elite Export — Visual Design System

**Phase 7**

| | |
| --- | --- |
| **Document** | Visual Design System |
| **Version** | 1.0 |
| **Status** | Draft — awaiting approval |
| **Phase** | Phase 7 |
| **Authority above this document** | Brand Bible v1.1 · Creative Direction Book v1.1 · Documentary Storyboard v1.0 · Photography Direction v1.0 · Visual Language Atlas v1.1 · Motion Direction v1.0 |
| **Owner** | Creative Director |
| **Audience** | Designers, developers, picture editors, and any agency inheriting this brand |
| **Supersedes** | Nothing. It is the first document in this brand permitted to carry numbers. |

### Change log

| Version | Change |
| --- | --- |
| 1.0 | Initial Visual Design System. Fifty-three chapters, twelve parts, three appendices. Supplies every number the six locked documents deferred: the scale system, the spatial system, the two typefaces, the tonal system, the texture threshold, the evidence threshold, and the motion values. |

---

## Purpose

Six documents precede this one. Between them they establish who the company is,
what it looks like, how it tells its story, how it photographs it, why all of that
works, and how it moves.

**Not one of them contains a number**, and each says so deliberately. The Creative
Direction Book records six omissions and names this document as their home. The
Photography Direction defers the threshold at which an image becomes evidence. The
Visual Language Atlas defers *every* number — "scale, space, tone, weight,
measure." The Motion Direction defers durations, easing and intervals, and adds
the instruction this book most needs:

> Every number it writes will outlive the reasoning unless the reasoning is
> written beside it.

That instruction is the format of this document. **No value appears without the
constraint it satisfies.** A reader who disagrees with a number here should be able
to find, in the same paragraph, the sentence in a locked document that produced it —
and should then be arguing with that sentence, not with this one.

### What this document is

The visual operating system. It converts six books of reasoning into a finite set
of measured rules, such that a designer holding this document and the six above it
would produce very nearly the same work as the person who wrote it.

### What this document is not

Not a component library, not a Tailwind guide, not a Figma file, not code, not a
page. It contains no markup, no class names, no framework, no file structure and no
implementation of any kind. It names what must be true; Phase 8 decides how.

The distinction is enforceable: **if a statement here would have to be rewritten
because a framework changed, it does not belong here.** A colour value survives a
framework change. A utility class does not.

### The rule of this document

Where this document conflicts with any of the six above it, **the earlier document
wins and this one is wrong**, and the remedy is a new version of this document —
never an exception. Authority runs in the order the documents were written.

Every chapter carries a **Traces to** line naming its parents. A chapter with no
parent would be a philosophy chapter, and there are to be no more philosophy
chapters.

### How a number in this document is to be treated

Three classes, and they are marked throughout:

| Class | Meaning | May Phase 8 change it? |
| --- | --- | --- |
| **Fixed** | The value is the rule. Changing it changes the brand. | No. Only a new version of this document. |
| **Bounded** | A range, with the reason for each bound stated. | Within the bounds, per surface. |
| **Calibrated** | Correct on present evidence, to be confirmed against a real artefact — usually the first photography shoot. | Once, on the stated occasion, and then it becomes Fixed. |

There is no fourth class. A number that is none of these is a preference, and a
preference has no standing here.

---

## Table of contents

**Part I — Visual principles**

1. [What this system is permitted to decide](#1-what-this-system-is-permitted-to-decide)
2. [Hierarchy, expressed as a number](#2-hierarchy-expressed-as-a-number)
3. [Scale and proportion](#3-scale-and-proportion)
4. [Silence, and the seven space ranks](#4-silence-and-the-seven-space-ranks)
5. [Visual weight and asymmetry](#5-visual-weight-and-asymmetry)
6. [Rhythm, and the breathing rule](#6-rhythm-and-the-breathing-rule)
7. [Visual confidence, and the removal standard](#7-visual-confidence-and-the-removal-standard)

**Part II — Typography**

8. [The two voices, and the typefaces that perform them](#8-the-two-voices-and-the-typefaces-that-perform-them)
9. [The type scale](#9-the-type-scale)
10. [Measure, leading and the paragraph](#10-measure-leading-and-the-paragraph)
11. [How emphasis works](#11-how-emphasis-works)
12. [Figures, captions, eyebrows and pull quotes](#12-figures-captions-eyebrows-and-pull-quotes)
13. [What typography must never do](#13-what-typography-must-never-do)

**Part III — Colour**

14. [Why our surfaces are almost colourless](#14-why-our-surfaces-are-almost-colourless)
15. [The palette](#15-the-palette)
16. [Background, surface and border hierarchy](#16-background-surface-and-border-hierarchy)
17. [Text hierarchy and contrast](#17-text-hierarchy-and-contrast)
18. [Colour on and around photographs](#18-colour-on-and-around-photographs)
19. [Dark mode](#19-dark-mode)
20. [The colour budget](#20-the-colour-budget)

**Part IV — Space**

21. [The spacing scale](#21-the-spacing-scale)
22. [Vertical rhythm and the heading rule](#22-vertical-rhythm-and-the-heading-rule)
23. [Sections, chapters and the held moment](#23-sections-chapters-and-the-held-moment)
24. [Horizontal space and margins](#24-horizontal-space-and-margins)
25. [Responsive space](#25-responsive-space)

**Part V — Grid**

26. [The columns the content asks for](#26-the-columns-the-content-asks-for)
27. [Container widths and breakpoints](#27-container-widths-and-breakpoints)
28. [Alignment, symmetry and asymmetry](#28-alignment-symmetry-and-asymmetry)
29. [Editorial layouts](#29-editorial-layouts)

**Part VI — Photography integration**

30. [The evidence threshold](#30-the-evidence-threshold)
31. [Dominance, pairing and bleed](#31-dominance-pairing-and-bleed)
32. [Ratio, crop and delivery](#32-ratio-crop-and-delivery)
33. [Text and image](#33-text-and-image)

**Part VII — Component language**

34. [The law of components](#34-the-law-of-components)
35. [Action: buttons and links](#35-action-buttons-and-links)
36. [Containers, and why there are almost no cards](#36-containers-and-why-there-are-almost-no-cards)
37. [Navigation and footer](#37-navigation-and-footer)
38. [Forms](#38-forms)
39. [Records: tables, lists, badges and tags](#39-records-tables-lists-badges-and-tags)
40. [Disclosure: accordions, dialogs, search and pagination](#40-disclosure-accordions-dialogs-search-and-pagination)
41. [What does not exist](#41-what-does-not-exist)
42. [Component behaviour in time](#42-component-behaviour-in-time)

**Part VIII — Iconography**

43. [Icons](#43-icons)

**Part IX — Illustration**

44. [Illustration, drawing and map](#44-illustration-drawing-and-map)

**Part X — Responsive philosophy**

45. [Responsive behaviour](#45-responsive-behaviour)
46. [What is preserved, what is sacrificed](#46-what-is-preserved-what-is-sacrificed)

**Part XI — Accessibility**

47. [Accessibility as respect](#47-accessibility-as-respect)

**Part XII — Implementation handoff**

48. [What Phase 8 must build](#48-what-phase-8-must-build)
49. [What Phase 8 may not decide](#49-what-phase-8-may-not-decide)
50. [Known collisions with the current build](#50-known-collisions-with-the-current-build)
51. [Dependency notes and withheld items](#51-dependency-notes-and-withheld-items)
52. [Approval checklist](#52-approval-checklist)
53. [Phase completion checklist and self-audit](#53-phase-completion-checklist-and-self-audit)

**Appendices**

- [Appendix A — Visual decision trees](#appendix-a--visual-decision-trees)
- [Appendix B — Common design mistakes](#appendix-b--common-design-mistakes)
- [Appendix C — Implementation checklist](#appendix-c--implementation-checklist)

---
---

# PART I — VISUAL PRINCIPLES

---

## 1. What this system is permitted to decide

**Traces to:** Visual Language Atlas §25.4 rules that survive their author ·
Creative Direction Book §27.1 the six withheld numbers · Motion Direction §36.2 ·
Brand Bible §3.6 using the DNA

### 1.1 The six inheritances that are numbers

The Creative Direction Book recorded six omissions and named this document as
their home. They are answered here, and the answer is the spine of the book:

| Withheld by an earlier document | Answered in |
| --- | --- |
| The scale system expressing scale and hierarchy | [§2](#2-hierarchy-expressed-as-a-number), [§9](#9-the-type-scale) |
| The spatial system expressing silence | [§4](#4-silence-and-the-seven-space-ranks), [§21](#21-the-spacing-scale) |
| The typefaces performing the two voices | [§8](#8-the-two-voices-and-the-typefaces-that-perform-them) |
| The tonal system expressing contrast, light and shadow | [§15](#15-the-palette), [§17](#17-text-hierarchy-and-contrast) |
| The threshold at which material texture sits | [§14.5](#14-why-our-surfaces-are-almost-colourless) |
| The presence at which an image becomes evidence | [§30](#30-the-evidence-threshold) |

The Motion Direction adds three more — durations, easing curves and intervals —
answered in [§42](#42-component-behaviour-in-time).

### 1.2 What a system is

> A system is a rule set, never a look (Visual Language Atlas §36).

The practical consequence, and the reason this document is written as rules with
reasons rather than as specimens: a look can be copied by the next agency and will
be copied wrongly. A rule set can be applied by somebody who never met its author,
which is the Photography Direction's single-grade principle transferred to design.

### 1.3 The derivation obligation

Every number in this document was produced by one of four operations, and each is
named where it is used:

1. **Read off a locked constraint.** The evidence threshold comes from what a
   viewer must be able to inspect, not from a layout convenience.
2. **Read off human perception.** A difference below a certain magnitude is not
   perceived as intent; that magnitude is measurable and does not date.
3. **Read off the material or the record.** Colour comes from the floor. Rates come
   from mass.
4. **Read off arithmetic already fixed.** The column widths follow from the measure
   and the gutter; nothing was chosen twice.

No number in this document was produced by a fifth operation, and there is not one.
If a reader finds a value whose derivation is not stated, it is an error in this
document and should be reported as one.

### 1.4 The standing default

Inherited unchanged from the Creative Direction Book §23 and restated here only
because a measured document invites addition: **the default answer to a new
element is no.** A system that lists what exists is read as a menu. This one lists
what exists *and what does not*, because the second list is doing more work.

---

## 2. Hierarchy, expressed as a number

**Traces to:** Brand Bible D7 · Creative Direction Book §13.2 hierarchy must be
steep, §13.3 not everything deserves a level, L8 · Visual Language Atlas §14
hierarchy is a kindness

### 2.1 The problem the number solves

"Steep" is not actionable and "subtle differences read as inconsistency" is not
measurable. Both become measurable through one fact about perception: **a
difference of less than about one fifth is not read as a decision.** Below it, a
viewer perceives variation; at and above it, they perceive intent.

That fact is not a fashion, does not belong to a decade, and gives us the floor
under every hierarchy in this system.

### 2.2 The steepness rule — Fixed

> **Adjacent levels of any hierarchy differ by not less than 1.25×, and levels
> intended to be felt rather than merely distinguished differ by not less than
> 1.5×.**

| Ratio between adjacent levels | Reading |
| --- | --- |
| Below 1.15× | Inconsistency. Worse than flatness. Forbidden. |
| 1.15× – 1.25× | Distinguishable only by comparison. Permitted only where a second instrument also separates the levels ([§2.4](#2-hierarchy-expressed-as-a-number)). |
| **1.25× – 1.5×** | **The working range for text levels.** |
| **1.5× and above** | **The working range for statement levels.** A change of register. |
| Above 3× | Permitted only between a photograph and everything else, or at a held moment. |

This single ratio governs type sizes ([§9](#9-the-type-scale)), space ranks
([§21](#21-the-spacing-scale)), motion duration bands ([§42](#42-component-behaviour-in-time))
and contrast steps ([§17](#17-text-hierarchy-and-contrast)). One rule, applied
four times, which is what makes the result feel like one hand.

### 2.3 The level budget — Fixed

> **A surface carries at most four levels of importance, and most carry three.**

Derived from Visual Language Atlas §14.4: every additional level subdivides a fixed
quantity of distinguishability. With the 1.25× floor and a text range spanning
roughly 13px to 72px, the arithmetic permits about seven steps — but seven levels
of *importance* cannot be held in mind, and the Atlas is explicit that many weakly
differentiated levels serve only the person who could not decide.

The four levels are:

| Level | What occupies it | How many per surface |
| --- | --- | --- |
| **1 — The evidence** | The photograph, or on a record surface, the record itself | One dominant instance |
| **2 — The statement** | The one thing said in the company's voice | Exactly one |
| **3 — The passage** | Body, sections, the argument | As many as the content has |
| **4 — The record** | Captions, labels, figures, specifications, meta | As many as the facts require |

Level 4 is not the bottom of a ladder. It is a different voice
([§8](#8-the-two-voices-and-the-typefaces-that-perform-them)) doing a different
job, and it may be the most important thing on a specification surface without
being enlarged.

### 2.4 Hierarchy has three instruments, not one

Size is the loudest and the least interesting. The instruments, in the order the
Creative Direction Book ranks them:

1. **Space** — L7: importance is expressed by space before it is expressed by size.
2. **Voice** — serif or sans, which says *who is speaking* before size says *how
   loudly*.
3. **Size** — the last resort, and the one most often reached for first.

**Where two instruments separate two levels, the size ratio may fall to 1.15×.
Where only size separates them, it may not fall below 1.25×.** This is the rule
that allows a 22px serif subheading to sit above 18px sans body without reading as
an accident: two instruments are already at work.

### 2.5 The flatness test

> Cover the surface. Uncover it for one second. Name the thing you saw first.

If the answer is uncertain, or if two people give two answers, the hierarchy has
failed and no amount of refinement inside it will help. This is the Atlas's "we see
before we read" made into a pass/fail check, and it is the cheapest test in this
document.

---

## 3. Scale and proportion

**Traces to:** Creative Direction Book §13.1 scale is meaning, §11.1 photography
dominance, L2 · Visual Language Atlas §22.2 expressive type competes with the
photographs · Brand Bible D1

### 3.1 The ceiling on type is set by the photograph

The Creative Direction Book decides the order — photography leads, everything else
annotates — and the Atlas states the consequence: type that becomes an image is a
second image, and a second image of equal weight halves the first.

That is a proportional statement, so it can be given a proportion:

> **Fixed — Where a statement shares a field with a photograph, the statement's
> cap height does not exceed one twelfth of the photograph's shorter rendered
> dimension.**

The arithmetic, at the sizes this system uses: a photograph at its threshold has a
shorter side of 480px ([§30](#30-the-evidence-threshold)); one twelfth is 40px of
cap height, which at our display face is a type size of about 56px. A 72px
statement therefore requires a photograph with a shorter side of at least 620px —
which is to say, **wanting a bigger headline means providing a bigger photograph**,
never the reverse. That is D1 expressed as arithmetic, and it is the most useful
sentence in this chapter.

### 3.2 The ceiling on type is also set by the field

Type that grows with the viewport indefinitely is type that has stopped serving
reading and started performing. Two bounds:

- **Fixed — No text grows above a viewport width of 1440px.** Beyond that width the
  reader's distance from the screen increases roughly in step with the screen, so
  apparent size is already preserved. Enlarging further reduces the number of words
  in a field without making anything more legible.
- **Fixed — A statement occupies no more than 75% of the field's width and no more
  than three lines.** Four-line headlines are paragraphs that have been enlarged; a
  statement that needs four lines is a passage, and belongs at level 3.

### 3.3 Proportion between the parts

The proportions in this system are not decorative ratios and are not derived from
any classical scheme. There are three, and each is arithmetic from a constraint:

| Proportion | Value | Where it comes from |
| --- | --- | --- |
| Evidence to annotation | **5 : 3** | The evidence must hold ≥60% of a shared field ([§30.4](#30-the-evidence-threshold)); 5/8 = 62.5% is the nearest split of an eight-unit field that clears it |
| Space above a heading to space below | **≥ 2 : 1** | A heading belongs to what follows it ([§22.3](#22-vertical-rhythm-and-the-heading-rule)) |
| Deceleration to acceleration | **≥ 2 : 1** | Motion Direction M8, §14.2 |

Three proportions, each traceable. There is no fourth, and no element of this
system is sized "to feel right".

### 3.4 Scale disparity is a permitted instrument

The Creative Direction Book §22.3 names scale disparity as one of four legitimate
means of creating tension: something very large adjacent to something very small.
The system permits it explicitly and bounds it:

> **Bounded — A deliberate disparity is a ratio of 6× or greater between adjacent
> elements, used not more than once per chapter.**

Below 6× it reads as a hierarchy step and loses the effect. Used twice in a chapter
it becomes a mannerism, and the Atlas settles what mannerism costs.

---

## 4. Silence, and the seven space ranks

**Traces to:** Brand Bible D2 silence is a material, §16.2 · Creative Direction
Book §12 entire, L6, L7 · Visual Language Atlas §7.3 allocated versus leftover

### 4.1 Why space is the first thing decided

L6 is unambiguous: space is allocated before content is placed. A spacing scale
that is applied after a layout exists is not a spacing scale — it is a tidying
operation, and it produces exactly the residue the Atlas describes.

**Therefore the space ranks below are a brief, not a palette.** A designer decides
which rank a relationship deserves *before* deciding what fills it, and the value
follows.

### 4.2 The seven ranks — Fixed

Each rank expresses a relationship, not a size. The values are the spacing scale
from [§21](#21-the-spacing-scale); the ranks are what makes the scale legible.

| Rank | Relationship | Desktop | Below 720px |
| --- | --- | --- | --- |
| **S1** | Inside one thing — line to line in a group, label to its value | 8 | 8 |
| **S2** | A thing and its annotation — image to caption, figure to label | 16 | 16 |
| **S3** | Between things in one group — rows of a record, items in a list | 24 – 32 | 24 |
| **S4** | Between groups inside one passage | 48 – 64 | 32 – 48 |
| **S5** | Between passages | 96 – 128 | 64 |
| **S6** | Between chapters | 192 – 256 | 96 – 128 |
| **S7** | The held moment | ≥ one viewport height, minimum 560 | ≥ one viewport height, minimum 480 |

### 4.3 Why the ranks step by roughly 1.5×

The same reason type does ([§2.2](#2-hierarchy-expressed-as-a-number)). Two spaces
that differ by less than a quarter are not read as two different relationships;
they are read as an inconsistency in the same relationship, which is the failure
mode the Creative Direction Book calls worse than flatness. S1 to S6 spans 8 to 256
— a factor of 32 across six ranks, which is a mean step of 1.8× and never less than
1.5×.

### 4.4 Space is proportional to importance — Fixed

L7, made measurable:

> **The most important element on a surface carries the largest clear space on that
> surface, and the relationship is monotonic: no element may carry more space than
> an element more important than it.**

This is checkable without judgement. Measure the clear space around each element.
Sort. If the order does not match the importance order, the surface is wrong — and
the fix is space, not size, because space is the instrument the reader does not
notice being used.

### 4.5 What silence is not

Two failures, both inherited, both now measurable:

- **Padding.** Space around an element that still shares its field with a
  persistent control, bar or offer (Creative Direction Book §22.4). Measurable
  test: during an S7 held moment, the count of persistent elements in the viewport
  must be **zero**. Not "minimal". Zero.
- **Uniform emptiness.** Every gap the same. Measurable test: a surface using fewer
  than three distinct space ranks between its top and bottom has not allocated
  space, it has set a margin.

### 4.6 Density is permitted, and bounded

Creative Direction Book §12.5 permits real density — a specification, a record —
and forbids only undifferentiated density. Made measurable:

> **Bounded — A dense passage may run for at most two viewport heights before an
> S5 release. A surface may not exceed three consecutive dense passages without an
> S6 break.**

The bound is not a comfort rule. It is the breathing requirement of Creative
Direction Book §22.5 expressed in the only unit a screen has.

---

## 5. Visual weight and asymmetry

**Traces to:** Brand Bible D5 asymmetry with intent · Creative Direction Book §15
composition, §16 focus, L3, L5, L11 · Visual Language Atlas §12, §13

### 5.1 Weight is measurable, and it is not size

Visual weight is the product of area, contrast against the ground, and detail
density. It can be estimated closely enough to be useful by a single operation:

> **Squint until detail disappears. What remains dark is where the weight is.**

The system needs this because balance in an asymmetric field cannot be checked by
measuring positions. A photograph occupying five units balances a statement and a
passage occupying three, not because the areas match but because the tonal masses
do.

### 5.2 The asymmetry rule — Fixed

L5 is the resting state; symmetry must argue for itself. Made operational:

> **A field is asymmetric unless one of the three symmetry conditions in
> [§28.4](#28-alignment-symmetry-and-asymmetry) is met and recorded.**

"Recorded" is the load-bearing word. A symmetrical arrangement must be traceable to
a stated argument, because the Creative Direction Book's objection to symmetry is
not aesthetic — it is that symmetry is what happens when nobody decided.

### 5.3 One peak per field — Fixed

L3 and §16.4, made measurable:

> **No two elements in one viewport may be within 1.25× of each other in visual
> weight, unless they are members of one record set.**

The exception matters: a table of eight rows is eight elements of equal weight and
is correct, because a record set is one element made of parts. Two photographs of
similar weight in one viewport is the failure the rule exists to catch (Creative
Direction Book §11.3).

### 5.4 Entry point

Every field has exactly one place the eye lands first
(Creative Direction Book §16.1). In this system it is, in order of precedence:

1. The photograph, if the field contains one at or above the evidence threshold.
2. The statement, if there is no photograph.
3. The first record, on a specification surface.

**Fixed — A field whose intended entry point is not the heaviest thing in it has
no entry point.** There is no third option: either reduce the competitor or move it
out of the field.

---

## 6. Rhythm, and the breathing rule

**Traces to:** Creative Direction Book §17 rhythm and pacing, §22.5 how breathing
works · Documentary Storyboard §15 emotional rhythm · Motion Direction §18 rhythm
matters more than speed

### 6.1 Rhythm here means the sequence of space ranks down a surface

Not motion. A still page has rhythm — it is the pattern of demand and release a
reader passes through, and it is written in the space ranks.

### 6.2 The three requirements, made measurable

Creative Direction Book §22.5 states three and this system converts each:

| Requirement | Measure |
| --- | --- |
| **Regular enough to be felt** | An S5 release or larger occurs at least once every three viewport heights |
| **Irregular enough not to be mechanical** | The same space value may not be used to separate more than **three consecutive** passages |
| **Proportional** | The longest passage on a surface is followed by the largest break on that surface |

The second is the one designers break, because a single repeated section spacing is
easy to build and easy to defend as consistency. It produces a metronome, and the
Creative Direction Book names the metronome as a failure by name.

### 6.3 The contour rule — Fixed

> **Every surface longer than three viewport heights contains at least one S5
> release and exactly one S7 held moment.**

"Exactly one" is deliberate. Two held moments in one surface is not twice the
effect; it is a surface with no peak, because a held moment is defined by what
surrounds it.

### 6.4 Openings vary in kind

Documentary Storyboard §8 and Creative Direction Book §22.1: chapters vary in kind
at their openings, and the identical opening is a named failure. This system's
expression:

> **Fixed — Consecutive chapters on one surface may not open in the same manner.**

The permitted manners are finite and are listed at
[§23.5](#23-sections-chapters-and-the-held-moment). A rule or a line is not among
them, because that is the announced opening the Creative Direction Book forbids.

---

## 7. Visual confidence, and the removal standard

**Traces to:** Creative Direction Book §10 what visual confidence means, L13 the
removal test · Brand Bible P2, §3.4 Restraint · Visual Language Atlas §11 editing
is subtraction

### 7.1 Confidence is measurable as a count

A confident surface does fewer things larger. The measure is not a rule about
beauty; it is a count that correlates with every failure in Appendix B:

> **Bounded — A viewport contains at most five distinct element types. Six or more
> is a symptom, and the surface should be examined for the failures in
> [Appendix B](#appendix-b--common-design-mistakes).**

Element types, counted: photograph, statement, passage, record, action, mark. Six
things exist in this system's vocabulary, so a viewport containing all six contains
everything the brand can do at once — which is the definition of having decided
nothing.

### 7.2 The removal standard — Fixed

L13, unchanged and restated because it is the only rule in this document that
requires no measurement:

> **Remove any element. If nothing is lost, it stays removed.**

Applied to this system specifically: every border, every container, every icon,
every rule, every shadow, every hover state and every movement must survive this
test individually. Most do not, which is why Parts VII and VIII are shorter than a
designer expects.

### 7.3 The standard applies to this document too

If a rule here never resolves a real dispute, it is decoration in the form of
governance. The approval checklist at [§52](#52-approval-checklist) asks the
approver to apply L13 to the rules themselves.

---
---

# PART II — TYPOGRAPHY SYSTEM

---

## 8. The two voices, and the typefaces that perform them

**Traces to:** Brand Bible §16.3 typography philosophy · Creative Direction Book
§13.4 the two voices · Visual Language Atlas §22 why typography should disappear ·
Documentary Storyboard §13.6 captions as specification

### 8.1 The roles are already assigned

Brand Bible §16.3 is the authority and is not restated: **the serif is the company
speaking; the sans is the record.** The Creative Direction Book adds that the two
are never used to create variety, and the Atlas adds that a role is performed most
convincingly when it is not announced.

What remains for this document is the only thing left: which typefaces, and by what
standard.

### 8.2 The standard, before the names

Atlas §22.3 produces the selection criterion and it is uncomfortable but reliable:
**the safest typographic decisions are the oldest ones.** A letterform in
continuous use for a century has demonstrated that it is not attached to a moment;
a letterform released in the last fifteen years has demonstrated nothing, however
good it is.

The criteria, in priority order. All are pass/fail:

| # | Criterion | Why |
| --- | --- | --- |
| 1 | **The design is at least sixty years old, and derives from a design at least a century old** | Atlas §22.3. Survivorship is the only available evidence of permanence |
| 2 | **It is not the default face of any current design practice** | Brand Bible D3: nothing that could belong to a competitor. A face used by every studio this decade dates the work to this decade |
| 3 | **It carries true tabular figures** | Brand Bible §16.3: figures are always tabular. A face without them cannot perform the record role at all |
| 4 | **It carries at least three weights and a true italic** | Emphasis must be available without synthesis ([§11](#11-how-emphasis-works)) |
| 5 | **It is legible at 13px on a screen and at 6pt in print** | The record appears in both. A display face that fails at caption size cannot hold the system together |
| 6 | **It is licensable in perpetuity, for web and print, without a per-view fee** | Brand Bible §3.5 Permanence. A brand that rents its voice can lose it |

A face that fails any one is not selected, regardless of how it looks. This is the
Brand DNA rule applied to type: contradiction outranks contribution.

### 8.3 The selection — Calibrated

Two faces. Not three, and never a third for variety.

| Role | Face | Age of design | Why this one |
| --- | --- | --- | --- |
| **The company speaking** — statements, chapter openings, pull quotes | **Plantin**, or its ancestor **Granjon / Garamond** where an open licence is required | 1913, from a 1568 Granjon cut | A working book face, not a display face. It was drawn for text and enlarges without becoming ornamental, which is the exact requirement of Atlas §22.2. Its weight on the page is closer to ink than to fashion, and it has never been the signature of a decade |
| **The record** — body, labels, specifications, figures, captions, interface | **Univers**, or **Akzidenz-Grotesk** where the wider range is needed | 1957, from an 1896 grotesque | A neutral grotesque with a systematic weight range, designed as a family rather than assembled into one. It reads as a document rather than as an interface, which is what "the record" means |

**Why not the obvious alternatives.** Recorded so the decision is not re-litigated:

- **Any high-contrast Didone revival** — the default "premium" serif of the 2010s —
  fails criterion 2 outright, and fails Atlas §22.2 because its contrast makes the
  headline more interesting than the photograph beside it.
- **Any geometric or neo-grotesque interface face released after 2010** fails
  criteria 1 and 2. It is the most legible signature of this decade available, and
  the Permanence Test names exactly this failure.
- **A serif used for body text** fails Brand Bible §16.3, which assigns body to the
  sans. This is the system's least intuitive rule and the one most likely to be
  broken by a designer working from editorial instinct rather than from the Brand
  Bible.

**Marked Calibrated because** the licence terms and the screen rendering of both
faces at 13px must be verified on the real product before the choice becomes Fixed,
and because criterion 3 must be confirmed rather than assumed for the specific cuts
purchased. See [§51.3](#51-dependency-notes-and-withheld-items).

### 8.4 Where each voice appears — Fixed

| Voice | Appears | Never appears |
| --- | --- | --- |
| **Serif** | Statements, chapter openings, pull quotes, the single sentence that opens a surface | Body, labels, captions, figures, buttons, navigation, tables, forms, any interface text |
| **Sans** | Everything else, without exception | Statements, chapter openings, pull quotes |

There is no shared territory and no "either is fine". The two faces are not a
palette to select from; each appears where its role is being performed and nowhere
else (Creative Direction Book §13.4).

### 8.5 One weight per role — Bounded

Weight is a hierarchy instrument and is therefore governed by
[§2.2](#2-hierarchy-expressed-as-a-number). In practice the system needs four:

| Weight | Where |
| --- | --- |
| **Serif regular** | All serif use. There is no bold serif in this system |
| **Sans regular** | Body, captions, records |
| **Sans medium** | Labels, table headers, the one word in a sentence that must be found ([§11](#11-how-emphasis-works)) |
| **Sans bold** | Reserved. Permitted only where a record must be distinguished at a glance under load — a table's total row, an error's first word |

**No bold serif**, because a bold statement is a raised voice and Brand Bible §16.4
settles that a luxury brand does not raise its voice. A statement that needs bold is
a statement that is not sure of itself.

---

## 9. The type scale

**Traces to:** Creative Direction Book §13.1, §13.3, L8 · Brand Bible §16.3 scale
carries meaning · Visual Language Atlas §14.4 few levels

### 9.1 How the scale was produced

Bottom-up, from the two facts that are not negotiable:

1. **The record must be examinable.** A caption is a specification
   (Documentary Storyboard §13.6), and a specification that must be squinted at is
   not one. The floor for any text a buyer may need to check is **13px**, the
   smallest size at which a grotesque holds its counters on a standard screen at
   reading distance.
2. **The body is a record too** (Brand Bible §16.3), and body is read continuously
   rather than consulted. **18px** is the size at which a grotesque at our measure
   is read without effort at 55–70cm — one step above the 16px browser default,
   because our body text is evidence to be read rather than interface to be
   scanned, and because a buyer reading a specification on a factory floor is not
   reading in ideal conditions ([§47](#47-accessibility-as-respect)).

Everything above 18px is then produced by the steepness rule
([§2.2](#2-hierarchy-expressed-as-a-number)) and stopped by the level budget
([§2.3](#2-hierarchy-expressed-as-a-number)).

### 9.2 The scale — Fixed

Sizes in px. Desktop values apply at a field width of 1440px and above; small
values apply at 390px. Between the two, sizes interpolate linearly with field
width. Above 1440px nothing grows ([§3.2](#3-scale-and-proportion)).

| Rank | Role | Voice | Desktop | Small field | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| **D** | Statement, peak register. One per surface, and only where the surface has a peak | Serif | **72** | **40** | 1.05 | −0.01em |
| **T1** | Surface title, chapter opening | Serif | **48** | **30** | 1.10 | −0.005em |
| **T2** | Section heading | Serif | **32** | **22** | 1.20 | 0 |
| **T3** | Passage heading | Serif or sans, per [§9.5](#9-the-type-scale) | **22** | not available | 1.30 | 0 |
| **B** | Body | Sans | **18** | **17** | 1.55 | 0 |
| **R** | Record: specifications, tables, meta, interface | Sans | **15** | 15 | 1.50 | 0 |
| **C** | Caption, eyebrow, legal | Sans | **13** | 13 | 1.45 | Eyebrow +0.08em; others 0 |

**The ratios, and their compliance with [§2.2](#2-hierarchy-expressed-as-a-number):**

| Step | Ratio | Class |
| --- | --- | --- |
| D → T1 | 1.50 | Statement level. A change of register |
| T1 → T2 | 1.50 | Statement level |
| T2 → T3 | 1.45 | Statement level |
| T3 → B | 1.22 | Text level, permitted below 1.25 only because voice and space also separate them ([§2.4](#2-hierarchy-expressed-as-a-number)) |
| B → R | 1.20 | Not a hierarchy step. R is a different job, not a lower rank ([§2.3](#2-hierarchy-expressed-as-a-number)) |
| R → C | 1.15 | Not a hierarchy step |

### 9.3 Why D and T1 are not the same thing

D is a register, not a level. It exists for the one surface moment the Documentary
Storyboard would call a peak, and Creative Direction Book L4 permits one peak at a
time.

> **Fixed — D appears at most once per surface, never twice in one experience
> without an S6 break between, and never on a surface whose purpose is a record.**

A specification page with a 72px statement on it has announced that the
specification is not the point, which is a lie about that surface.

### 9.4 Why T3 disappears below 720px — Fixed

> **On fields narrower than 720px, T3 is not available. Its content becomes T2 or
> body.**

Derived, not conceded: a smaller field carries less distinguishability, and Atlas
§14.4 says every additional level subdivides a fixed quantity of it. Keeping four
heading levels on a phone would produce exactly the weak differentiation the
Creative Direction Book calls worse than flatness. The small field gets fewer
levels, more steeply separated, which is the same rule correctly applied.

### 9.5 The one place the voice is chosen by content

T3 is the only rank permitted in either voice, and the choice is not a preference:

- **Serif T3** when the heading is the company speaking: a stage of the process, a
  chapter subdivision, an argument.
- **Sans T3** when the heading labels a record: a specification group, a table
  section, a form fieldset.

Ask what follows the heading. If what follows is a record, the heading is a label,
and labels are sans (Brand Bible §16.3).

### 9.6 What the scale does not contain

No size between 22 and 32. No size above 72. No size below 13. No small-caps
heading rank, no subtitle rank, no lead-paragraph rank set larger than body.

The lead paragraph is the most commonly requested addition and is refused
explicitly: a first paragraph enlarged to 20px is a fifth level that fails
[§2.2](#2-hierarchy-expressed-as-a-number) and buys nothing. If a passage deserves
emphasis it gets space ([§4.4](#4-silence-and-the-seven-space-ranks)), or it becomes
a pull quote ([§12.4](#12-figures-captions-eyebrows-and-pull-quotes)).

---

## 10. Measure, leading and the paragraph

**Traces to:** Visual Language Atlas §22.1 reading is a transparent activity ·
Brand Bible §12 writing standards · Creative Direction Book §12.2

### 10.1 Measure — Fixed

> **Body measure: 60–72 characters. Target 66. Hard maximum 75, hard minimum 45.**

The reason is the Atlas's, not typography's folklore: a reader who becomes aware of
the mechanism has stopped reading. Both failures make the mechanism visible. A long
line loses the return sweep and the reader re-reads a line; a short line breaks the
sentence into fragments and the reader notices the breaking.

At 18px sans, 66 characters is **640px**, and that number then determines the
reading column ([§27](#27-container-widths-and-breakpoints)) and, through it, the
first breakpoint. Nothing else in the grid was chosen; it all follows from this.

| Text rank | Measure | Rendered width at its size |
| --- | --- | --- |
| Body (18px) | 60–72 characters | 580–700px, column set at **640** |
| Record (15px) | 45–65 characters | 360–520px, column set at **480** |
| Caption (13px) | 30–50 characters | 220–360px, and never wider than the image it annotates |
| Statement (D, T1) | Up to 3 lines, ≤75% of field | — |

**The caption rule is the sharpest of these.** A caption wider than its image has
become a paragraph beside a picture, and Documentary Storyboard §13.6 says a
caption is a specification label. Specifications are short.

### 10.2 Leading — Fixed, and derived from measure

Leading and measure are one decision: a longer line needs more leading to hold the
return sweep. The values in [§9.2](#9-the-type-scale) follow the relationship
below, which is why they are not round numbers chosen for arithmetic convenience.

| Size range | Leading | Why |
| --- | --- | --- |
| 13–18px, at 45–72 characters | 1.45 – 1.55 | Continuous reading at full measure. The longer the measure, the higher the value |
| 22–32px | 1.20 – 1.30 | Read in one or two lines. Excess leading separates a heading from itself |
| 48–72px | 1.02 – 1.10 | A statement is one visual object. Leading above 1.15 at this size breaks it into stacked lines |

**Fixed — Leading never exceeds 1.6 anywhere in this system.** Above it, the lines
of a paragraph stop cohering into a block and the paragraph loses its edge, which
removes the structural contrast between density and silence that Creative Direction
Book L12 depends on.

### 10.3 Paragraph spacing — Fixed

> **Paragraphs are separated by space, never by indent: 24px at body size, S1 (8px)
> at record size.**

Derived: the separation must be visible without breaking the block. 24px against an
18px/28px line is 0.86 of a line — sub-line, so the paragraph reads as one mass with
seams rather than as separate objects. An indent instead of space is a print
convention for justified continuous text; our text is ragged-right on screen, so the
indent would be a period gesture, which Atlas §22.3 rules out.

**No first-line indent, no drop cap, no first-paragraph special case.** Each is a
letterpress reference, and a reference is a treatment.

### 10.4 Alignment — Fixed

> **All text is set flush left, ragged right. Nothing is justified. Nothing is
> centred except under the conditions in
> [§28.4](#28-alignment-symmetry-and-asymmetry).**

Justification on screen produces rivers and forced hyphenation, both of which make
the mechanism visible. Centring is the symmetry the Creative Direction Book requires
an argument for, and "it is a heading" is not an argument.

### 10.5 Reading rhythm

The pattern a reader passes through, expressed in this system's units:

| Passage length | Required break after | Rank |
| --- | --- | --- |
| 1–3 paragraphs | Space, or a photograph | S4 |
| 4–8 paragraphs | A heading, a photograph, or a record | S5 |
| More than 8 | Not permitted without an intervening element | — |

**Fixed — No more than eight consecutive body paragraphs without an intervening
element.** Beyond that the surface has become a document, and a document somebody
must read to reach the evidence has reversed D1.

### 10.6 Hyphenation, widows and orphans

- Hyphenation off in statements (D, T1, T2). A broken word in a statement is a
  visible mechanism.
- Hyphenation permitted in body below 640px, where the alternative is a rag deep
  enough to be read as a shape.
- **Fixed — No single-word last line in a statement.** A statement's last line
  carries not less than two words, adjusted by rewriting rather than by inserting a
  break, because copy is governed by Brand Bible §12 and not by this document.

---

## 11. How emphasis works

**Traces to:** Brand Bible §12 writing standards, §16.3 · Visual Language Atlas
§22.4 what disappearance is not · Creative Direction Book §13.4

### 11.1 The available instruments, in order

1. **Position.** The emphasised thing goes first, or alone.
2. **Space.** S4 around it rather than S3.
3. **Weight.** Sans medium, for one word or one label.
4. **Italic.** True italic, for a term being introduced or a name being cited.

That is the complete list. There is no fifth instrument.

### 11.2 What emphasis may never be — Fixed

| Never | Why |
| --- | --- |
| **Colour** | Colour is functional in this system and carries state, not stress ([§20](#20-the-colour-budget)) |
| **Underline on non-links** | An underline means a link, and a mark that means two things means neither ([§35.3](#35-action-buttons-and-links)) |
| **All caps in running text** | Reading is by word shape, and capitals remove it. Permitted only for the eyebrow, at 13px, where nothing is read continuously |
| **A larger size mid-paragraph** | It creates a hierarchy level inside a level, which fails [§2.3](#2-hierarchy-expressed-as-a-number) |
| **Bold serif** | There is none ([§8.5](#8-the-two-voices-and-the-typefaces-that-perform-them)) |
| **A highlight, box, tint or panel** | Containers are UI, and L9 requires each to justify itself against doing nothing |

### 11.3 The emphasis budget — Bounded

> **At most one emphasised word or phrase per paragraph, and at most three per
> passage.**

Beyond that, emphasis is not read as emphasis; it is read as a texture. Brand Bible
§12 already forbids the copy from shouting. This is the same rule in the visual
layer.

---

## 12. Figures, captions, eyebrows and pull quotes

**Traces to:** Brand Bible §16.3 figures are always sans and tabular, §19
governance · Documentary Storyboard §13.6 · Photography Direction §10.4 caption as
specification

### 12.1 Figures — Fixed

Brand Bible §16.3 is absolute, and this document adds only the measurable part:

- Every figure is set in the sans, in **tabular** figures, at rank R or B.
- **A figure never appears in the serif, at any size, in any context** — including
  inside a statement. A statement containing a number is either rewritten or the
  number is set as sans within it. There is no third option, and the mixed setting
  is correct rather than awkward: it is the visible form of *the company is speaking
  and this part is the record*.
- Figures in a column align on the digit, not on the baseline of surrounding prose.
  This is what tabular figures are for, and it is the entire reason criterion 3 in
  [§8.2](#8-the-two-voices-and-the-typefaces-that-perform-them) is pass/fail.
- **A figure is never enlarged for effect.** Brand Bible §16.3: a number set as a
  statement becomes rhetoric, and a number set as a record can be checked. The
  maximum size for any figure in this system is **B (18px)**, whatever the figure's
  importance.

That last rule removes an entire category of layout that every competitor uses, and
it is the clearest single application of the Factory Test in this document.

### 12.2 Captions — Fixed

A caption is a specification label (Documentary Storyboard §13.6): a place, a
material, a state, a date.

| Property | Value | Why |
| --- | --- | --- |
| Rank | C (13px), sans | It is a record |
| Colour | Secondary text ([§17](#17-text-hierarchy-and-contrast)) | It annotates; it does not compete with the image |
| Position | Below the image, flush with the image's left edge | The image is read first; the caption confirms |
| Measure | ≤ the image's width, and ≤ 50 characters | [§10.1](#10-measure-leading-and-the-paragraph) |
| Distance from image | S2 (16px) | It belongs to the image and to nothing else |
| Presence | Every evidential image carries one | An image whose place and date cannot be stated is an image whose provenance is not on record (Photography Direction §24.4) |

**Fixed — A caption never overlays an image.** Text on a photograph obscures
evidence, and the image was made to be examined.

### 12.3 The eyebrow — Fixed, and bounded to near-extinction

The eyebrow is the small label above a heading. It exists in this system for one
purpose: to state *where you are*, on a surface a visitor may have arrived at
directly (Creative Direction Book L15).

| Property | Value |
| --- | --- |
| Rank | C (13px), sans, medium weight, +0.08em tracking, capitals permitted |
| Content | A location in the structure: a chapter name, a section name, a date |
| Distance below | S1 (8px). It belongs to the heading beneath it |
| Never | A category label, a teaser, a claim, a benefit, or a word like "Featured", "Our Process" or "Why us" |

**Fixed — At most one eyebrow per surface.** More than one and they become a
navigation system duplicating the actual navigation, which fails L10.

### 12.4 Pull quotes — Fixed

A pull quote is the company speaking, so it is serif, and it is bounded hard because
it is the element most likely to become decoration.

| Property | Value | Why |
| --- | --- | --- |
| Voice and rank | Serif, T2 (32px desktop / 22px small) | It is a statement, not a peak. D is reserved |
| Frequency | **At most one per surface** | L4: one peak at a time |
| Space | S5 above and below, minimum | It is isolated, or it is not a pull quote (Creative Direction Book §12.4) |
| Marks | No quotation marks, no rules above or below, no oversized glyph, no italic | Every one of those is a treatment, and L14 says treatment carries no meaning |
| Source | If they are a person's words, attributed at rank C with a name and a role. If it cannot be attributed, it is not published | Brand Bible §19; "trusted by" without named permission is a lie |

**A pull quote may never duplicate text that appears elsewhere on the same
surface.** L10: a fact appears once. A pulled quote that also sits in the body has
been repeated for emphasis, which reads as insecurity.

---

## 13. What typography must never do

**Traces to:** Visual Language Atlas §22 · Creative Direction Book §25 failure
modes · Brand Bible D3, §3.5 Permanence

The prohibitions, collected so they can be checked in one pass. Each names the law
it would break.

| Never | Breaks |
| --- | --- |
| A third typeface, for any reason including a logotype | Brand Bible §16.3 — two voices, two jobs |
| Serif body text | Brand Bible §16.3 — the sans is the record, and body is a record |
| A figure in the serif | Brand Bible §16.3 |
| An enlarged statistic | Brand Bible §16.3 — a number set as a statement becomes rhetoric |
| Letter-spaced serif capitals | Atlas §22.3 — a period gesture, datable on sight |
| Type over a photograph's subject | Creative Direction Book §6.1 — it obscures the evidence |
| Type as an image: outlined, photo-filled, animated per letter, split, masked, scrolled horizontally | Atlas §22.2 — a second image halves the first |
| A gradient, shadow, glow or stroke on any text | L14 — treatment carries no meaning |
| Text set in more than one alignment on one surface | [§10.4](#10-measure-leading-and-the-paragraph) |
| Centred body text | [§10.4](#10-measure-leading-and-the-paragraph), L5 |
| A heading the same size as the one above it | L8 — steep or absent |
| Uppercase running text | [§11.2](#11-how-emphasis-works) |
| Any typographic effect a reader could name afterwards | Atlas §22.5 — the correct answer to *what typeface was that* is uncertainty |

---
---

# PART III — COLOUR SYSTEM

---

## 14. Why our surfaces are almost colourless

**Traces to:** Photography Direction §19 colour philosophy, §19.4 the relationship
to this phase · Brand Bible D1, D6 material is felt not seen, §3.5 Permanence ·
Creative Direction Book §8.3 materials over effects · Visual Language Atlas §6
restraint

### 14.1 The instruction this system was given

Photography Direction §19.4 does not merely permit a restrained palette. It sets
the terms:

> Phase 6 will define a tonal system for the brand's surfaces. **That system does
> not apply to photographs.** [...] Design accommodates the photographs.
> Photographs are never accommodated to the design.

A surface palette that carries strong colour cannot honour that. Chroma beside a
photograph competes with the photograph's own chroma, and the eye reads the
stronger of the two as the subject. If our surfaces carry a brand colour, then
every image sits inside a colour context that was chosen, and the buyer is
assessing a hide's tone against a wall we painted. Photography Direction §19.2 is
explicit that colour is part of the factual statement. **A coloured surround is a
grade applied by other means.**

### 14.2 Where colour comes from

Photography Direction §19.1 settles the source, and it transfers to surfaces
without amendment:

> The brand's colour comes from the material, the light and the building. It never
> comes from a treatment.

Applied here, that yields a single generative rule for the entire palette:

> **Fixed — A colour may appear on an Elite Export surface only if it occurs on the
> floor. Paper, ink, unbleached hide, concrete, red oxide primer, machine enamel,
> brass. Nothing is invented, nothing is sampled from a trend, and there is no
> brand colour that does not exist as a substance.**

This gives Permanence for free. Red oxide primer and machine enamel green have been
the colours of industrial signage for a century because they were the cheap durable
pigments, and they will not date in the next twenty years for the same reason they
have not dated in the last hundred. A colour chosen from a current palette dates
the moment the palette does.

### 14.3 The consequence: there is no accent colour

The brand has no decorative accent. This is stated as its own rule because it is
the single most likely thing to be reintroduced by a designer under pressure to
"warm the page up":

> **Fixed — No colour in this system exists to attract attention, to signal
> premium-ness, to brand an element, or to differentiate a surface. Every chromatic
> value in [§15](#15-the-palette) has one job, and the job is stated beside it.**

Brand Bible §16.4 supplies the reason directly: luxury here is the absence of
anxiety, and a decorative accent is anxiety made visible — a mark added because the
work was not trusted to hold attention on its own.

### 14.4 What carries the colour instead

The photographs. All of it.

A surface in this system is a near-neutral field with one or more photographs in
it, and the photographs are the only place chroma lives. This is D1 expressed
tonally: the argument is carried by the images, so the colour is too. It also
produces the strongest available structural contrast — Creative Direction Book
§14.1 says the most valuable contrast is not tonal but structural, photograph
against silence, and a neutral field maximises exactly that.

### 14.5 The texture threshold — Fixed

Creative Direction Book §27.1 defers "the threshold at which texture sits under
§18.1", and D6 requires material to be felt rather than seen. The answer:

> **On non-photographic surfaces the threshold is zero. There is no surface
> texture, no paper grain, no leather emboss, no noise layer, no simulated
> material of any kind.**

Three reasons, in order of weight:

1. **A simulated material is a false claim about matter.** Motion Direction M4
   establishes that behaviour is a claim about mass; a texture is the same claim in
   a different dimension. We manufacture leather goods, and putting a leather
   texture on a screen asserts a material that is not present. That is the same
   class of statement as calling a split full-grain (Brand Bible §17.4).
2. **Texture below the threshold of notice does nothing**, and L13 removes anything
   whose absence is not felt.
3. **Texture above it competes with the photographs**, which contain the real
   grain.

D6 is satisfied instead by **value**: the background is the value of unbleached
paper rather than the value of a screen, which is felt and not seen, and is a
material reference that cannot be false because it is not depicting anything.

---

## 15. The palette

**Traces to:** [§14](#14-why-our-surfaces-are-almost-colourless) · Creative
Direction Book §14.3 shadow keeps its detail · Photography Direction §17 working
light · Brand Bible §16.1

### 15.1 The structural values — Fixed

Four values carry roughly the whole system.

| Name | Value | Substance it comes from | Job |
| --- | --- | --- | --- |
| **Paper** | `#F2EFE9` | Unbleached paper; undyed vegetable-tanned hide before finishing | The single background of every surface |
| **Ink** | `#1C1A17` | Printers' ink; harness leather in shadow | All primary text; inverted fields; the veil behind a dialog |
| **Ink secondary** | `#4F4A44` | The same ink, thinned | Records that annotate rather than assert: captions, meta, secondary labels |
| **Recessed** | `#E9E5DD` | The same paper, in shade | The only permitted second surface value, and only for records ([§16.2](#16-background-surface-and-border-hierarchy)) |

**Why neither pure white nor pure black.** Creative Direction Book §14.3 is the
authority: a shadow that falls to pure black is a place where information has been
discarded, and for a brand whose position is *you may examine us*, discarded
information is a contradiction. Pure white is the same failure at the other end —
it is a value that exists nowhere in a building lit by daylight, and it renders our
photographs as objects pasted onto a light box rather than as views into a room.
`#F2EFE9` sits at roughly L\* 94 and `#1C1A17` at roughly L\* 10: both are within
the range a real surface occupies under working light.

**Why the neutrals are warm.** Brand Bible §16.1 fixes warm daylight as the light
of the library. A cool grey surround shifts the apparent white balance of every
photograph placed on it, which is the simultaneous-contrast form of the grading
Photography Direction §19.4 forbids. The surround is warm because the light in the
photographs is warm.

### 15.2 The functional hues — Fixed

Three. Each is a pigment that exists on a factory floor, each has exactly one job,
and none may be used for anything else.

| Name | Value | Substance | Job | Contrast on Paper |
| --- | --- | --- | --- | --- |
| **Oxide** | `#8A3324` | Red oxide primer | Failure only: a rejected submission, a form error, an unavailable state | 7.1 : 1 |
| **Enamel** | `#2F4F3A` | Machine enamel green | Confirmation only: a submitted enquiry, a completed step, a verified record | 8.0 : 1 |
| **Brass** | `#7A5B1E` | Brass, oxidised | Caution only: a warning about a consequence, a constraint on an action | 5.5 : 1 |

**Fixed — a functional hue never appears except as the meaning it carries.** Not as
a link colour, not as a heading colour, not as an underline, not as a chart series,
not as a hover state, not as a brand mark, not as a decorative rule, not as an icon
tint, and never on more than one element in a viewport.

**Why hue is permitted here at all**, when §14.3 removed it everywhere else: a state
is a fact about the system, and a fact is a record. Withholding the fastest
available carrier of a fact — hue — from a person who needs to know that their
enquiry failed would be an act of design taste imposed on somebody else's time, and
[§47](#47-accessibility-as-respect) settles that the brand does not do that. The
hue is functional, so it is not decoration, so §14.3 is not contradicted.

**Fixed — hue is never the only carrier of a state.** Every state is also carried by
a word ([§47.4](#47-accessibility-as-respect)). Colour is the accelerant, never the
message.

### 15.3 The complete list

There are **seven** values in this system, and the list is closed.

```
Paper           #F2EFE9
Recessed        #E9E5DD
Hairline        ink at 12%
Ink secondary   #4F4A44
Ink             #1C1A17
Oxide           #8A3324
Enamel          #2F4F3A
Brass           #7A5B1E
```

No tints, no shades, no 50–900 ramp, no light and dark variant of each hue, no
"subtle" background version of a state colour. A ramp exists to give a designer
choices, and a system that offers choices where the reasoning permits one answer has
started to become a look.

**Marked Calibrated:** the three functional hues must be checked once, on the final
rendering, for contrast against Paper and against Ink, and against any photograph
they are placed adjacent to. They may be adjusted in value — never in hue — to meet
[§17.2](#17-text-hierarchy-and-contrast).

---

## 16. Background, surface and border hierarchy

**Traces to:** Brand Bible D8 interfaces recede · Creative Direction Book L9, §12 ·
Visual Language Atlas §23 why interfaces should become invisible

### 16.1 Background hierarchy — Fixed

> **There are two backgrounds: Paper, and Ink. There is no third.**

- **Paper** is the default state of every surface.
- **Ink** is a whole field inverted, and it is a structural device rather than a
  style: it marks a change of chapter that the reader feels before they read
  (Creative Direction Book §22.1), or it isolates a held moment
  ([§23.6](#23-sections-chapters-and-the-held-moment)).

**Bounded — at most one inverted field per surface**, because an inversion used
twice stops being a change and becomes a pattern, and a pattern of alternating
fields is a template signature.

### 16.2 Surface hierarchy — Fixed

> **There is one recessed value, and it exists only to bind a record together.**

A table, a specification block, a form — a set of facts that belong to each other —
may sit on `Recessed`. Nothing else may. In particular: not a passage of prose, not
a photograph, not a statement, not a navigation area, not a footer, not a
"section".

The reason is L9 and D8. Every surface level is a container, and every container is
UI competing with the work. One level is the minimum that lets a record read as a
single object; a second level would exist only to nest containers, and nested
containers are the visual signature of a system that could not decide what belonged
to what.

**There is no elevation system.** Depth in this brand is photographic — three planes
in a frame (Brand Bible §16.1) — and a simulated depth on a flat surface is the same
false material claim as a simulated texture ([§14.5](#14-why-our-surfaces-are-almost-colourless)).

### 16.3 Shadows — Fixed

> **There are no shadows in this system. None. On any element, at any strength.**

Three derivations, any one of which is sufficient:

1. **Our light is the room's** (Photography Direction §17, Creative Direction Book
   §14.2). A shadow beneath an interface element asserts a light source with a
   position and a hardness, and that source does not exist. It is studio light,
   which the Photography Direction rejects by name.
2. **A shadow implies an uncaused elevation.** Motion Direction M6 requires every
   movement to have a visible cause; a floating panel is the static form of the same
   failure — something is held up and nothing is holding it.
3. **L13.** Remove every shadow in a conventional interface and nothing is lost
   except the impression of an interface, which D8 wants removed anyway.

**The one thing that must read as in front — a dialog — is separated by the veil in
[§40.3](#40-disclosure-accordions-dialogs-search-and-pagination), not by a shadow.**
The field behind it recedes; the dialog does not rise.

### 16.4 Border hierarchy — Fixed

Two marks. That is the whole set.

| Mark | Value | Used for | Never used for |
| --- | --- | --- | --- |
| **Hairline** | 1px, Ink at 12% | Separating the rows of a record; the top edge of a footer; the underside of a form field | Enclosing anything |
| **Focus ring** | 2px, Ink, 2px offset | The keyboard focus indicator, and nothing else ([§47.3](#47-accessibility-as-respect)) | Anything else, ever |

> **Fixed — Nothing in this system is enclosed on four sides except a dialog.**

This single rule removes cards, panels, tinted boxes, bordered callouts, outlined
buttons, framed images and boxed quotes in one stroke, and it is the most
consequential rule in Part III. It is L9 taken literally: a border is the least
valuable mark available, and enclosing something is the most emphatic use of the
least valuable mark.

Grouping is done by **space** ([§4](#4-silence-and-the-seven-space-ranks)), which
the reader does not notice being used, rather than by outline, which they do.

### 16.5 Corner radius — Fixed

> **Zero, everywhere, on everything: buttons, fields, images, dialogs, tables,
> the veil, every surface.**

Derivations, in order:

1. **Permanence.** A radius value is the single most reliable way to date an
   interface — the decade can usually be named from the corner alone. Atlas §35.10
   fails anything traceable to a current practice, "however well executed".
2. **Material.** A radius asserts a moulded, softened object. Our materials meet at
   cut edges: a knife through a hide, a press through a die, a sheet of paper, a
   concrete floor. A rounded rectangle is a claim about a manufacturing process we
   do not use ([§14.5](#14-why-our-surfaces-are-almost-colourless)).
3. **Photography.** A rounded photograph is a photograph with its corners cropped —
   a second crop, which Photography Direction §22.4 forbids — and it converts a view
   into an object, which Creative Direction Book §11.2 identifies as the difference
   between being in a place and looking at a picture.

There is no exception for pills, avatars, tags or badges, because
[§39](#39-records-tables-lists-badges-and-tags) removes those shapes for the same
reason.

### 16.6 Stroke weight — Fixed

| Weight | Where |
| --- | --- |
| **1px** | Hairlines and record separators. Rendered as one device pixel, not scaled with the field: a rule that thickens on a large screen has become a graphic element |
| **1.25–1.5px** | Icon strokes, matched to the stem weight of the sans at the same size ([§43.4](#43-icons)) |
| **2px** | Focus ring only |

Nothing above 2px exists. A heavier line is a graphic device, and L14 removes
devices that carry no argument.

---

## 17. Text hierarchy and contrast

**Traces to:** Brand Bible §3.2 Evidence, "can a stranger check it" · Creative
Direction Book §14.3 shadow keeps its detail · Visual Language Atlas §14 hierarchy
is a kindness

### 17.1 The three text values — Fixed

| Value | On Paper | On Ink | Job |
| --- | --- | --- | --- |
| **Primary** | `#1C1A17` | `#F2EFE9` | Statements, body, everything a reader is meant to read |
| **Secondary** | `#4F4A44` | `#ADA79F` | Captions, meta, record annotations. Never body |
| **Functional** | Oxide / Enamel / Brass | The same, checked at [§17.2](#17-text-hierarchy-and-contrast) | State only |

Three, not five. A "muted" and a "disabled" and a "placeholder" grey are the
standard four-value set, and each of the extra two is a way of showing something
the reader cannot use — which [§38.5](#38-forms) removes rather than dims.

### 17.2 Contrast targets — Fixed, and above the legal minimum

| Text | Minimum contrast | Actual |
| --- | --- | --- |
| Primary on Paper | 12 : 1 | **15.1 : 1** |
| Secondary on Paper | 7 : 1 | **7.6 : 1** |
| Any functional hue as text | 4.5 : 1 | 5.5 – 8.0 : 1 |
| Any non-text mark that carries meaning | 3 : 1 | Focus ring 15.1 : 1 |

The published accessibility minimum for body text is 4.5 : 1. This system sets 12:1
for primary text and 7:1 for secondary, and the reason is not compliance:

> A buyer reads a specification on a phone, in a warehouse, in daylight, on a screen
> that is three years old and slightly yellowed. **Contrast set to the minimum is
> contrast set for the reviewer's monitor rather than for the reader's.**

That is Brand Bible §3.2 applied to rendering: a stranger must be able to check the
thing. If they cannot read it where they are, they cannot check it.

### 17.3 The rule that prevents grey drift

> **Fixed — Secondary text never carries a sentence a reader must read.**

Greying text to signal "less important" is how a system ends up with three greys and
a body copy nobody can read. Importance is carried by size, space and position
([§2.4](#2-hierarchy-expressed-as-a-number)). Secondary exists for one thing:
records that annotate something else and would compete with it at full strength.

---

## 18. Colour on and around photographs

**Traces to:** Photography Direction §19.4, §22 cropping, §16 negative space ·
Creative Direction Book §6.1 evidence must be examinable, §11.4

### 18.1 The surround — Fixed

> **A photograph sits on Paper or on Ink, and on nothing else.** No tinted field
> behind an image, no coloured band, no gradient ground, no duotone panel.

Simultaneous contrast is not a subtlety here: a coloured surround changes the
apparent colour of the image, and Photography Direction §19.2 makes colour a factual
obligation. A tinted background is a grade applied without touching the file.

### 18.2 Overlays — Bounded, and reluctantly

Text over a photograph is discouraged by [§33](#33-text-and-image) and permitted only
in the case defined there. Where it is permitted:

| Rule | Value | Why |
| --- | --- | --- |
| Overlay type | Uniform Ink, flat | A gradient scrim is a named look and fails the Permanence Test |
| Maximum strength | **25%** | Above that, shadow detail in the image is destroyed, which is Creative Direction Book §14.3 — a place where information has been discarded |
| Extent | The whole field, never a shape behind the text | A shaped scrim is a container ([§16.4](#16-background-surface-and-border-hierarchy)) |
| If 25% is not enough for [§17.2](#17-text-hierarchy-and-contrast) | **The text moves off the image** | Photography Direction §19.4: design accommodates the photographs, never the reverse |

That last row is the whole chapter. When an overlay and a photograph disagree, the
photograph wins, and the layout changes.

### 18.3 What is never done to an image — Fixed

Inherited from Photography Direction §19.6 and §21, and restated here only in the
forms a design system can commit:

Duotone. Monochrome conversion. A brand-tinted wash. Selective saturation. A blur
applied for text legibility. A colour-burn or multiply blend against a brand colour.
An image used as a texture behind text. A hue-rotate, filter, or render-time colour
adjustment of any kind.

**A photograph is placed. It is not treated.**

---

## 19. Dark mode

**Traces to:** Photography Direction §23 the single grade, §19.4 · Brand Bible §3.3
Repeatability · Motion Direction §19.3 one behaviour per class of event

### 19.1 There is no dark mode — Fixed

Not "not yet". Not "deferred to Phase 8". The brand does not have one, and the
reasoning is constitutional rather than practical:

1. **A second rendering is a second statement.** Photography Direction §23 fixes one
   grade across the whole library, forever, on the grounds that variation in the
   work is failure. A user-selectable palette is two renderings of the same brand,
   which is the same failure one level up.
2. **Dark mode re-grades every photograph.** Perceived image tone shifts with its
   surround. Offering a dark surround means offering a second appearance of every
   image in the library — precisely what §19.4 forbids, achieved without touching a
   file.
3. **It would spend the inversion.** Ink-on-Paper inversion is this system's
   structural marker for a chapter change and a held moment
   ([§16.1](#16-background-surface-and-border-hierarchy)). If the whole site can be
   dark, an inverted field means nothing.

### 19.2 What is honoured instead

The brand answers the real needs behind the request without adopting a second skin:

| Signal | Response |
| --- | --- |
| `prefers-reduced-motion` | Honoured absolutely ([§42.7](#42-component-behaviour-in-time)) |
| `prefers-contrast: more` | Honoured: secondary text is promoted to primary, hairlines are raised to Ink at 25% |
| `prefers-color-scheme: dark` | **Not honoured.** The surface remains Paper |
| Forced-colours / high-contrast mode | Honoured by not fighting it: the system carries no colour-dependent meaning that would break ([§15.2](#15-the-palette)) |

The third row is the one that will be challenged. The answer to a challenge is this
chapter, and the remedy is a new version of this document rather than a toggle.

---

## 20. The colour budget

**Traces to:** Brand Bible §3.4 Restraint · Visual Language Atlas §6 restraint feels
expensive · Creative Direction Book §25 failure modes

### 20.1 The measured budget — Fixed

Measured over any single viewport, excluding photographs:

| Class | Share of non-photographic area | Rule |
| --- | --- | --- |
| Paper or Ink | **≥ 90%** | The field is the background |
| Ink secondary and hairlines | ≤ 10% | Records and separators |
| Functional hue | **< 0.5%**, and zero on most surfaces | A state indicator is a few dozen pixels of text |

A surface where chromatic pixels outside the photographs exceed half a percent has
acquired decoration, and the correct response is to find which element started it.

### 20.2 The counting test

> Screenshot the surface. Remove the photographs. Count the distinct colours that
> remain.

**The answer must be four or fewer** — Paper, Ink, Ink secondary, hairline — with a
fifth permitted only where a state is genuinely present. Five or more without a
state present means colour has been used to decorate, and Brand Bible §3.6 rejects
what serves none of the five DNA words.

### 20.3 The failure this budget exists to prevent

The category's default move is a gold or amber accent used to signal quality. It
fails four ways at once, which is why it is named here rather than left to taste:
D3 (three competitors already own it), the Factory Test (any trading house can buy
a gold accent), Brand Bible §11.2 (it is the visual form of the word *luxurious*,
which the reader is supposed to decide), and the Permanence Test (it is a signature
of this decade's premium web design).

---
---

# PART IV — SPACING SYSTEM

---

## 21. The spacing scale

**Traces to:** Brand Bible D2, §16.2 whitespace · Creative Direction Book §12, L6,
L7 · Visual Language Atlas §7 empty space feels confident

### 21.1 Why breathing space creates trust

The reasoning belongs to the locked documents and is not repeated; only the
mechanism is needed here, because the mechanism is what the numbers must serve.

Brand Bible §16.2: a brand that crowds is a brand that is worried you will leave
before it finishes talking. Atlas §7: allocated space reads as confidence, leftover
space reads as residue. Both describe the same inference a viewer makes without
knowing they are making it: **space is expensive, and a party that spends it is not
in a hurry.** A crowded surface is read as a party with more to say than room to say
it, which is the posture of somebody who needs the sale.

For a supplier being assessed on whether they will still be there in five years,
that inference is doing more work than any sentence on the page.

### 21.2 The base unit — Fixed

> **4px.**

Two constraints produce it and nothing else was considered:

1. **It divides the body line exactly.** Body is 18px at 1.55 leading, which is
   28px; 28 ÷ 4 = 7. Every vertical space in the system is therefore expressible in
   whole body lines or clean fractions of one, which is what makes a stack of mixed
   elements sit together without a baseline grid that mixed type sizes would break
   anyway.
2. **It is a whole device pixel at every common density**, so a hairline gap does
   not become a half-pixel blur on one machine and a full one on another.

The unit is not a value with meaning. **The ranks in [§4.2](#4-silence-and-the-seven-space-ranks)
carry the meaning; the scale below is only the set of legal values.**

### 21.3 The scale — Fixed

```
4   8   12   16   24   32   48   64   96   128   192   256
```

Twelve values. Below 16 the steps are linear because small spaces are read as
adjustments rather than as relationships; from 16 upward each step is 1.5× or
1.33× the last, which satisfies the steepness rule
([§2.2](#2-hierarchy-expressed-as-a-number)) in the spatial dimension.

**Fixed — No spacing value outside this scale appears anywhere.** Not 20, not 40,
not 56, not 72, not a percentage, not a viewport unit, except where
[§4.2](#4-silence-and-the-seven-space-ranks) rank S7 specifies a viewport height
and [§25](#25-responsive-space) specifies a fluid margin.

The prohibition matters more than the scale. A designer with twelve values makes
relationships; a designer with arbitrary values makes adjustments, and adjustments
accumulate into the undifferentiated density Creative Direction Book §12.5 forbids.

### 21.4 How a value is chosen

Never by eye, and never by what fits.

1. Name the **relationship** between the two things: are they one thing, a thing and
   its annotation, two things in a group, two groups, two passages, two chapters?
2. Read the **rank** from [§4.2](#4-silence-and-the-seven-space-ranks).
3. Take the value.

If step 1 has no answer, the two things do not have a relationship, and the question
is not how far apart to put them but whether one of them should exist (L13).

---

## 22. Vertical rhythm and the heading rule

**Traces to:** Creative Direction Book §22.1 how a chapter begins, L11 · Visual
Language Atlas §14 · Brand Bible D7

### 22.1 Space is not symmetrical, and the asymmetry carries meaning

The most common spacing error in careful work is equal space above and below a
heading. It is read as an accident because it is one: the heading belongs to the
content beneath it, and equal space says it belongs to neither.

### 22.2 The heading rule — Fixed

> **The space above a heading is at least twice the space below it. At T1 and D, at
> least three times.**

| Rank | Space above | Space below | Ratio |
| --- | --- | --- | --- |
| D | 128 – 192 | 32 – 48 | 4 : 1 |
| T1 | 96 – 128 | 32 | 3 : 1 |
| T2 | 64 – 96 | 24 – 32 | 3 : 1 |
| T3 | 48 | 16 – 24 | 2 : 1 |

The ratio is the rule; the values are its expression at the ranks in
[§4.2](#4-silence-and-the-seven-space-ranks). The larger the heading, the steeper
the ratio — because a larger heading opens a larger unit of content, and the space
above it is doing the work of the chapter opening that Creative Direction Book
§22.1 requires to be felt before it is read.

### 22.3 Grouping is done by proximity, not by outline

L9 removed the containers ([§16.4](#16-background-surface-and-border-hierarchy)), so
proximity is the only grouping instrument left, and it is a stronger one:

> **Fixed — Within any group, no internal gap may equal or exceed the gap
> separating that group from its neighbours.** The internal gap is at least one full
> rank smaller.

This single constraint is what makes a bordered box unnecessary. If the space inside
a record is S1 and the space around it is S4, the record is a unit — visibly,
without a mark.

### 22.4 The vertical stack of a typical passage

Given for calibration, not as a template:

```
                            ← S5 (96) from the previous passage
T2 section heading
                            ← 32
body paragraph
                            ← 24
body paragraph
                            ← S4 (48)
photograph
                            ← S2 (16)
caption
                            ← S5 (96) to the next passage
```

Four distinct values in one passage, each naming a different relationship. A passage
built with one repeated value has not said anything about how its parts relate.

---

## 23. Sections, chapters and the held moment

**Traces to:** Documentary Storyboard §8 chapter philosophy, §12 chapter handoff ·
Creative Direction Book §22 chapters, tension and breathing, §12.4 the held moment

### 23.1 The three break sizes — Fixed

| Break | Desktop | Small field | What it separates |
| --- | --- | --- | --- |
| **Section** | 96 | 64 | Two passages of one argument |
| **Chapter** | 192 | 96 | Two chapters — a change of subject |
| **Held** | ≥ 1 viewport height, minimum 560 | ≥ 1 viewport height, minimum 480 | Nothing. It is the moment itself |

The chapter break is exactly twice the section break, which is the minimum at which
a reader distinguishes "new part of this" from "new thing" without counting.

### 23.2 Chapters are unequal — Fixed

Documentary Storyboard §8 establishes that chapters are unequal and extractable.
The system must not flatten them:

> **A surface whose chapters all occupy similar heights has flattened the
> structure.** Chapter length is set by what the chapter has to prove, and the
> longest chapter on a surface is followed by the largest break on that surface
> (Creative Direction Book §22.5, proportion).

### 23.3 How a chapter ends — Fixed

Creative Direction Book §22.2: a chapter ends by releasing, not by concluding, and
the last thing asked is smaller than the thing before it.

> **The final element of a chapter is of lower visual weight than the element
> before it, and is followed by a chapter break.** A chapter ending on its
> photograph, its statement, or an action has not ended; it has stopped.

The practical consequence: the call to action does not live at the bottom of every
chapter. It lives once, where the argument has been made
([§35.2](#35-action-buttons-and-links)).

### 23.4 The held moment — Fixed

Creative Direction Book §12.4 and §22.4 define it; this system measures it.

| Property | Requirement |
| --- | --- |
| Extent | Not less than one full viewport height, and never less than 560px |
| Contents | **One element**, or none |
| Persistent elements in view | **Zero.** No header, no bar, no control, no offer, no back-to-top, no chat widget, no cookie notice |
| Frequency | Exactly one per surface longer than three viewport heights ([§6.3](#6-rhythm-and-the-breathing-rule)) |
| What may occupy it | A single photograph at or above the evidence threshold, a single statement, or nothing at all |

**The zero is the rule.** Creative Direction Book §22.4: space around an element that
still shares its field with a persistent control is not silence, it is padding. A
held moment with a sticky header in it does not exist, however much space it has.

### 23.5 The permitted chapter openings

[§6.4](#6-rhythm-and-the-breathing-rule) requires consecutive chapters to open in
different manners. The manners are these, and the list is closed:

1. A photograph at full bleed, with no text in the field.
2. An inverted (Ink) field.
3. A statement alone, with S6 above it.
4. A held moment ([§23.4](#23-sections-chapters-and-the-held-moment)) immediately
   preceding.
5. A change of column structure — from the reading column to the paired field, or
   back.

**Not permitted:** a horizontal rule, a background tint, a label, a numbered badge,
an icon, or a heading doing the work alone. Creative Direction Book §22.1 names the
first of these as "the announced opening" and rejects it by name.

### 23.6 The inverted field

The Ink field is the strongest chapter marker available and is therefore rationed:

| Rule | Value |
| --- | --- |
| Frequency | At most once per surface ([§16.1](#16-background-surface-and-border-hierarchy)) |
| Minimum extent | One viewport height. A short inverted band is a decorative stripe |
| Contents | A statement, a held moment, or a photograph that was exposed for a dark surround |
| Transitions | Hard edge, full bleed. No gradient into or out of it, ever |

---

## 24. Horizontal space and margins

**Traces to:** Creative Direction Book §12.3 silence proportional to importance ·
Visual Language Atlas §7.3 · Brand Bible §16.2

### 24.1 Margins — Fixed

| Field width | Page margin | Why |
| --- | --- | --- |
| < 720px | **24** | The floor. Below 24 the text touches the device's own edge treatment and the field stops reading as a page |
| 720 – 1535px | **48** | Two ranks up. The field is wide enough that a 24px margin would read as an overflow rather than as a decision. It holds across this whole range because the arithmetic at [§27.1](#27-container-widths-and-breakpoints) depends on it: a margin of 64 at 1280px would take the 5-unit column below the evidence threshold |
| ≥ 1536px | Whatever remains after the 1440px field is centred, and never less than 48 | 1440 + 2 × 48 = 1536. The field is capped ([§27.2](#27-container-widths-and-breakpoints)); surplus width becomes margin, which is the correct destination for it |

The last row is the point of the table. On a very wide screen the system does not
stretch: it gains silence. That is Brand Bible §16.2 — space is never reclaimed to
fit more in — expressed as the behaviour of a window being dragged wider.

### 24.2 Horizontal rhythm inside a field — Fixed

> **Gutter: 32px at and above 1024px, 24px below.**

Derived: the gutter must exceed the largest intra-group space (S3 = 24–32) so that
two columns read as two, and must not reach the smallest inter-group space (S4 = 48)
or the columns read as separate surfaces.

### 24.3 Optical alignment

> **Fixed — Elements align on their optical edges, not on their boxes.**

A statement's leftmost glyph, a photograph's frame edge and a caption's first
character stand on one line. Where a glyph's side bearing or a quotation mark would
break that line, it is hung outside. This is invisible when done and conspicuous
when not, which makes it exactly the class of work Atlas §24 describes: the best
work is never noticed.

---

## 25. Responsive space

**Traces to:** Creative Direction Book §12.2 space is allocated, never surrendered ·
Visual Language Atlas §7 · Brand Bible D2

### 25.1 The principle that governs every value in [§4.2](#4-silence-and-the-seven-space-ranks)

Space does not scale linearly with the field, and treating it as though it does is
the commonest responsive error.

- **Small spaces are set by the type and do not change.** S1 and S2 exist to bind a
  label to its value and a caption to its image. That relationship is identical on
  a phone and on a monitor, because the type is nearly identical.
- **Large spaces are set by the field and change a great deal.** S5 and S6 exist to
  separate passages and chapters, and separation is judged against the height of
  the field the reader is looking through.

Hence the table in [§4.2](#4-silence-and-the-seven-space-ranks): S1 and S2 are
constant, S3 through S6 halve, and S7 is defined in viewport heights at every size.

### 25.2 What is never compressed — Fixed

Three spaces hold their rank at every field width, because compressing them would
remove something the brand needs rather than something it can spare:

| Space | Why it holds |
| --- | --- |
| The held moment (S7) | It is defined by isolation, and a compressed held moment is padding ([§23.4](#23-sections-chapters-and-the-held-moment)) |
| Space above a T1 or D heading | It is the chapter opening; compressing it makes the opening announced rather than felt |
| Space around the single most important element on a surface | L7. If everything compresses equally, importance stops being expressed by space |

### 25.3 The late-addition rule — Fixed

L6, transcribed because it is broken at implementation rather than at design:

> **When something must be added and there is no room, something is removed. Space
> is never reclaimed to accommodate it, at any breakpoint.**

The measurable form: if a surface's space ranks were correct at approval and are
smaller at release, the surface has been broken, whatever was added.

---
---

# PART V — GRID SYSTEM

---

## 26. The columns the content asks for

**Traces to:** Creative Direction Book §15 composition, §21 L5, L11 · Visual
Language Atlas §12 symmetry becomes boring, §13 asymmetry feels human

### 26.1 Why not a twelve-column grid

Because a twelve-column grid is a machine for producing halves, thirds and quarters,
and every one of those is a symmetrical division. L5 makes asymmetry the resting
state and requires symmetry to argue for itself; a grid whose easiest moves are all
symmetrical will produce symmetrical work no matter what the designer intends.
Atlas §12 supplies the deeper reason: the eye resolves a symmetrical arrangement
immediately and then has nothing further to do.

There is a second reason, and it is stronger. **A twelve-column grid makes a row of
three or four equal cards the path of least resistance**, and the card grid is the
single most damaging layout available to this brand ([§36](#36-containers-and-why-there-are-almost-no-cards)).
A grid should make the right thing easy.

### 26.2 The eight-unit field — Fixed

> **The field is eight units and one gutter width. The only permitted splits are
> 8, 5 + 3, and 3 + 5.**

| Split | Use |
| --- | --- |
| **8** | Full field: a full-bleed photograph, a statement, a held moment |
| **5 + 3** | Evidence leading, annotation following |
| **3 + 5** | The same, mirrored — used to break an established rhythm, not for variety |

No 4 + 4. No 3 + 3 + 2. No four-up, no three-up, no equal columns of any kind
outside a record table ([§39.1](#39-records-tables-lists-badges-and-tags)).

**Where 5 : 3 comes from.** [§30.4](#30-the-evidence-threshold) requires the
evidence to hold at least 60% of a shared field. Of the splits an eight-unit field
permits, 5/8 = 62.5% is the smallest that clears it. The proportion was not chosen
for its appearance and is not a golden ratio; it is the nearest legal split above a
threshold set by what a buyer must be able to inspect.

### 26.3 The arithmetic — Fixed

At a 1440px field with a 32px gutter:

| Quantity | Value |
| --- | --- |
| Unit | (1440 − 7 × 32) ÷ 8 = **152** |
| 5-unit column | 5 × 152 + 4 × 32 = **888** (61.7% of the field) |
| 3-unit column | 3 × 152 + 2 × 32 = **520** |
| Check | 888 + 32 + 520 = **1440** |

A 3 : 2 photograph in the 5-unit column renders 888 × 592 — comfortably above the
480px shorter-side threshold ([§30.2](#30-the-evidence-threshold)). That is the
arithmetic the split exists to satisfy.

### 26.4 The reading column is not a grid column — Fixed

The reading column is 640px, set by measure ([§10.1](#10-measure-leading-and-the-paragraph)),
and it does not resize to fit a unit count. It is **positioned** on the grid and
**sized** by reading.

> **At and above 1280px, the reading column begins at the left edge of unit 2** —
> an offset of one unit plus one gutter, 184px — leaving 616px of field to its
> right for photography, annotation, or nothing.

That asymmetry is deliberate and permanent. A reading column centred in a wide field
is the template signature L5 rejects, and it wastes the margin that annotations,
captions and marginal records need.

---

## 27. Container widths and breakpoints

**Traces to:** [§10.1](#10-measure-leading-and-the-paragraph) · Creative Direction
Book L15 a visitor may arrive anywhere · Visual Language Atlas §14

### 27.1 Breakpoints are read off the content — Fixed

Not off devices. Devices change every three years and Brand Bible §3.5 gives this
system a twenty-year horizon; the measure of a line of text does not change at all.

| Breakpoint | Arithmetic that produces it | What changes |
| --- | --- | --- |
| **720** | 640 reading column + 2 × 24 minimum margin = 688, plus tolerance | Margins rise to 48. T3 becomes available ([§9.4](#9-the-type-scale)) |
| **1024** | 640 reading column + 32 gutter + 256 minimum annotation column + 2 × 48 margin = **1024 exactly** | A second column becomes possible |
| **1280** | Field = 1280 − 2 × 48 = 1184; unit = (1184 − 7 × 32) ÷ 8 = 120; the 5-unit column = 5 × 120 + 4 × 32 = **728**, so a 3 : 2 photograph in it renders 728 × 485 and clears the 480px threshold | The eight-unit field opens |
| **1440** | The field cap ([§3.2](#3-scale-and-proportion)), reached at a viewport of 1536 | Nothing grows. Surplus becomes margin |

Four numbers, each the output of a calculation stated in full. None was chosen
because a device has that width, and it is a coincidence rather than a reason that
two of them nearly match common screens.

### 27.2 The containers — Fixed

| Container | Width | Set by |
| --- | --- | --- |
| **Reading column** | 640 | 66-character measure at 18px ([§10.1](#10-measure-leading-and-the-paragraph)) |
| **Record column** | 480 | 45–65 characters at 15px |
| **Annotation column** | 256 – 520 | The 3-unit column, floored at the caption's minimum useful measure |
| **Field** | up to 1440 | [§3.2](#3-scale-and-proportion) |
| **Full bleed** | The viewport, edge to edge | [§31.3](#31-dominance-pairing-and-bleed) |

Five containers. Nothing else exists, and there is no "narrow", "medium", "wide" set
of arbitrary widths — every one of these is the output of a measurement.

### 27.3 What full bleed means here — Fixed

Edge to edge of the viewport, including below 720px. **A photograph is never inset
by the page margin on a small field**, because the margin would take roughly 12% of
the width from an image that is already at the threshold
([§45.3](#45-responsive-behaviour)).

---

## 28. Alignment, symmetry and asymmetry

**Traces to:** Brand Bible D5 · Creative Direction Book §15.1, §15.2, §15.3, L5 ·
Visual Language Atlas §13

### 28.1 One alignment per surface — Fixed

> **Everything on a surface aligns left, on the grid, to one of at most three
> vertical lines.**

Three lines: the field's left edge, the reading column's left edge (unit 2), and the
annotation column's left edge. A fourth alignment is not a refinement; it is the
point at which the reader stops perceiving a structure.

### 28.2 Asymmetry is the resting state

Restated from [§5.2](#5-visual-weight-and-asymmetry) only to record the operational
default: **a designer who has not made a decision produces a 5 + 3 field with the
evidence leading.** The default is asymmetric so that the absence of a decision does
not produce the template signature.

### 28.3 Balance without symmetry — Bounded

Creative Direction Book §15.3: a large quiet mass balances a small dense one.
Measurably:

> An asymmetric field is balanced when the heavier column's visual weight
> ([§5.1](#5-visual-weight-and-asymmetry)) is between 1.5× and 3× the lighter's.

Below 1.5× the field reads as a failed attempt at equality. Above 3× the lighter
column reads as an afterthought rather than as an annotation, and the composition
has become a photograph with something stuck beside it.

### 28.4 When symmetry is allowed — Fixed

Three conditions. Any one permits it; each must be recorded in the design rationale
([§5.2](#5-visual-weight-and-asymmetry)):

1. **A single final statement standing alone**, with nothing else in the field —
   the closing of an experience, where stillness is the point.
2. **Content that is genuinely a set of equals** — a record table, a specification
   list, a set of dispatch destinations. Equality of treatment here is a factual
   claim about the content, not a compositional default.
3. **A formal register deliberately invoked** — a certificate, a signed document, a
   record reproduced as it exists.

Outside those three, a centred or mirrored arrangement is a defect.

### 28.5 When asymmetry is required — Fixed

- Wherever a photograph shares a field with text.
- Wherever one element leads and others follow.
- Wherever the eye is meant to travel.
- Every chapter opening except the closing one.

---

## 29. Editorial layouts

**Traces to:** Creative Direction Book §15.4 editorial composition, L11 · Visual
Language Atlas §32 the page that assumes a reader · Documentary Storyboard §11
scene relationships

### 29.1 The unit of design is the field, not the row

L11, and the reason this part is called a grid system rather than a layout library:
elements are composed **against** each other. A photograph and the text beside it
are one composition, not two components that happen to be adjacent.

The operational test: **move one of the two elements 100px.** If nothing about the
other looks wrong, they were never composed — they were stacked, and the layout is a
sequence of independent blocks with a shared width.

### 29.2 The four field types — Fixed

The complete set. Every surface in this brand is built from these and nothing else.

| Field | Structure | Used for |
| --- | --- | --- |
| **The reading field** | Reading column at unit 2, annotation column right | Argument, process, any continuous passage |
| **The paired field** | 5 + 3 or 3 + 5, evidence leading | Evidence with its annotation — the primary editorial unit |
| **The full field** | 8 units, or full bleed | A photograph carrying a chapter alone; a statement; a held moment |
| **The record field** | Reading column or full field, single column, on Recessed | Specifications, tables, forms |

### 29.3 The spread — Bounded

Creative Direction Book §15.4 asks for the facing-page tradition: the eye crosses
as well as descends. In a scrolling medium the equivalent is a field in which two
elements are related **across** rather than stacked, and it is available only at and
above 1280px.

> **At most two spreads per surface**, separated by at least a chapter break.
> A surface composed entirely of spreads has produced a rhythm, and a rhythm of one
> kind is the metronome [§6.2](#6-rhythm-and-the-breathing-rule) forbids.

### 29.4 What a field may never contain — Fixed

| Never | Breaks |
| --- | --- |
| Two photographs of equal weight | Creative Direction Book §11.3 — the eye compares instead of examining |
| Three or more items in an equal row | [§26.2](#26-the-columns-the-content-asks-for); it is the card grid under another name |
| A column of text narrower than 45 characters | [§10.1](#10-measure-leading-and-the-paragraph) |
| A photograph below the evidence threshold | [§30](#30-the-evidence-threshold) |
| More than one action | [§35.2](#35-action-buttons-and-links) |
| Two elements within 1.25× of each other in weight, outside a record set | [§5.3](#5-visual-weight-and-asymmetry) |

---
---

# PART VI — PHOTOGRAPHY INTEGRATION

---

## 30. The evidence threshold

**Traces to:** Creative Direction Book §6.1 a photograph too small to be examined is
decoration, §27.1 the withheld number · Photography Direction §5 the evidence
hierarchy, §13 depth, §30.1 the numeric threshold belongs to this phase · Brand
Bible D1, §16.1 three planes

### 30.1 The number four documents deferred

Creative Direction Book §6.1 states the law and declines the number:

> A photograph too small to be examined is not evidence. It is decoration.
> There is a threshold — different in every medium, unspecifiable here — below which
> an image stops functioning as proof.

The Photography Direction defers it again, explicitly, to this document. It is
therefore the single most load-bearing value in this system: **it decides which
photographs on a surface are arguments and which are ornament**, and every layout
rule in Part V was arithmetic performed to satisfy it.

### 30.2 The threshold — Calibrated

> **An image functions as evidence when its shorter rendered dimension is not less
> than 480 layout pixels, delivered at not less than 2× that in real pixels.**

**How the number was produced.** Not by layout convenience, and not by picking a
common breakpoint. By asking what a buyer must be able to resolve:

1. The thing a buyer inspects in a photograph of our work is the **stitch and the
   grain**. Saddlery hand-stitching runs at roughly six to eight stitches per inch —
   a pitch of about 3.6mm.
2. A three-plane bench-height frame (Brand Bible §16.1) typically contains
   **250–350mm of subject across its shorter dimension**. Take 300mm.
3. At a rendered shorter side of 480px, that is **1.6 pixels per millimetre**, so a
   3.6mm stitch pitch renders at about **5.8 pixels**.
4. Around five to six pixels is the point at which a repeating detail can be
   **counted** rather than inferred. Below it, a viewer sees a line where stitches
   are and must take our word for what it contains — which Creative Direction Book
   §6.1 identifies as precisely the position the brand exists to avoid.

**Marked Calibrated because** step 2 is an estimate until the first shoot exists.
The threshold is to be re-derived once against real frames from the real library,
using the same four steps, and then becomes Fixed. If the frames come in tighter
than assumed, the number falls; if wider, it rises. **The method is Fixed; only the
output is Calibrated.**

### 30.3 The decoration line — Fixed

> **Below a shorter rendered dimension of 320px, an image is decoration and may not
> appear at all**, with one exception: an **E6** object record inside a
> specification, where the image documents an object's own condition and is not
> asked to prove a factory (Photography Direction §5.1).

Between 320 and 480 there is no legitimate use. An image in that band is being asked
to do a job it cannot do, and Creative Direction Book §6.1 is blunt about the cost:
a thumbnail of the factory floor makes a weaker claim than no photograph at all,
because it asserts and withholds simultaneously.

### 30.4 Presence by evidence rank — Fixed

Photography Direction §5 grades photographs E1 to E6 and states what each may be
asked to carry. This system converts the grades into presence:

| Rank | What it proves | Minimum presence | Notes |
| --- | --- | --- | --- |
| **E1** — a decision being taken | A standard exists and somebody applies it | **Full bleed, or the full field.** It is the only rank that produces Recognition, and it carries a chapter alone | Never paired with another image |
| **E2** — an act with its context | The work is done here, at this scale | The 5-unit column at minimum; full field where it opens a chapter | |
| **E3** — a repeated act | System rather than incident | A set, sharing a field, of not fewer than three and not more than five, each at or above threshold | The set is one element ([§5.3](#5-visual-weight-and-asymmetry)) |
| **E4** — a record | The work was documented | Record column. Never before the work it records | Photography Direction §5.2 rule 3 |
| **E5** — a located view | The place exists and is used | Full bleed, used for silence and place, never to carry an argument | |
| **E6** — an object alone | Its own condition | ≥ 320px shorter side, inside a specification | The only rank permitted below threshold |

**The rule that follows, and it governs page design more than any other:** if a
surface's argument needs an E1 or E2 image and the library has none, **the surface
is designed around its absence** (Photography Direction §30, implementation row).
It is not filled with an E5, and it is never filled with a placeholder.

### 30.5 Dominance is not a percentage, but it has a floor

Creative Direction Book §11.1: dominance means the photograph is the primary carrier
of meaning and everything else is annotation. The structural claim cannot be reduced
to a ratio — but a ratio can catch the case where it has plainly failed:

> **Fixed — Where a photograph shares a field with text, the photograph occupies not
> less than 60% of the field's width.** Below that, whatever the intent, the text is
> leading.

This floor is where the 5 : 3 split came from ([§26.2](#26-the-columns-the-content-asks-for)),
and it is the reason this system has no 4 + 4 layout.

### 30.6 The test, in the form a reviewer can apply

> **Remove the words. Does the surface still make its argument?**

Creative Direction Book §11.1 supplies both outcomes: if it does, the photography is
doing its job; if it collapses, the photograph was illustrating rather than proving,
and either the image or the claim is wrong.

---

## 31. Dominance, pairing and bleed

**Traces to:** Creative Direction Book §11.2 immersion, §11.3 one image at a time ·
Photography Direction §16 negative space · Visual Language Atlas §10 one image is
stronger than ten

### 31.1 One image at a time — Fixed

Creative Direction Book §11.3: two photographs of equal weight beside each other
halve each other, and comparison is a shopping behaviour.

> **No two photographs of similar weight appear in one viewport.** Where several
> must coexist they are unequal, and the ratio between the leading image and any
> other is not less than **2 : 1 in area**.

The exception is an **E3 set** — three to five frames of the same operation, treated
identically — because there the comparison *is* the argument: the same act, the same
way, repeatedly. That is Repeatability made visible, and it is the one case where
equal treatment of images is a factual claim rather than an abdication.

### 31.2 Pairing rules — Fixed

| Pairing | Permitted | Condition |
| --- | --- | --- |
| Photograph + text | Yes, the primary editorial unit | 5 + 3, photograph leading ([§30.5](#30-the-evidence-threshold)) |
| Photograph + photograph, unequal | Yes | ≥ 2 : 1 in area, and the two must be of different subjects. Two frames of the same subject is a contact sheet |
| Photograph + photograph, equal | Only as an E3 set | Three to five frames, one operation |
| Photograph + statement, overlaid | Only under [§33.2](#33-text-and-image) | |
| Photograph + action | **Never** | An action beside evidence converts the evidence into an advertisement (Museum Test) |

### 31.3 Bleed — Fixed

Creative Direction Book §11.2 is the authority: an image that continues past the edge
of the field implies a world that continues past the edge of the frame; an image
bounded on all sides is an object on a page.

> **Bleed is the default for E1, E2 and E5. Bounded placement is the exception and
> must be a deliberate change of register.**

| Placement | When |
| --- | --- |
| **Full bleed, both edges** | A photograph opening or carrying a chapter; a held moment; any E5 carrying place and silence |
| **One-edge bleed** | The paired field at and above 1280px: the photograph runs off the outer edge of the field, the annotation stays inside the margin. This is the system's characteristic asymmetry |
| **Bounded on four sides** | An E4 record or an E6 object — a document, a stamp, a finished piece — where the frame is part of what is being shown |

**A bleeding image is never bounded by a margin on a small field**
([§27.3](#27-container-widths-and-breakpoints)).

### 31.4 Vertical extent — Bounded

> A full-bleed photograph occupies between **60% and 100% of the viewport height**.

Below 60% it reads as a band rather than as a view, and a band is a decorative
device. At 100% it is a held moment and is governed by
[§23.4](#23-sections-chapters-and-the-held-moment). **Never above 100%**: an image
taller than the field can never be seen whole, and an image that cannot be seen whole
cannot be examined.

---

## 32. Ratio, crop and delivery

**Traces to:** Photography Direction §22 cropping philosophy, §22.4 the crop is
decided once, §16.3 room for placement · Brand Bible §3.3 Repeatability

### 32.1 The layout adapts to the image — Fixed

This is the most operationally demanding rule in the document and it is not
negotiable, because Photography Direction §22.4 is not negotiable:

> An image has one canonical crop, decided when it enters the library, and every
> medium uses it or uses the uncropped original. Two different crops of the same
> frame in circulation are two different statements.

Therefore:

> **Fixed — Containers are defined by width. Height follows from the image's own
> ratio. No image in this system is cropped by its container.**

The consequences, each of which will be argued with during implementation:

- **No fixed-height image areas.** A row of images of unequal height is correct.
- **No cover-fit.** Scaling an image to fill a box and clipping the remainder is a
  second crop performed at render time, by a machine, on every viewport
  independently. It is the most common technique in modern web layout and it is
  unavailable here.
- **No responsive art direction by crop.** Different viewports receive different
  *resolutions* of the canonical crop, never different crops of it.
- **Where a surface needs a shape the library does not have, the answer is a
  different photograph** (Photography Direction §22.4), which is why frames are made
  with room around the subject on more than one side (§16.3).

### 32.2 The ratios the system expects

Not prescribed — reported, because the library decides them. Design accommodates
what arrives:

| Ratio | Typical rank | Placement |
| --- | --- | --- |
| 3 : 2 landscape | E1, E2, E5 | Full bleed, full field, or the 5-unit column |
| 2 : 3 portrait | E2, E6 | The 3-unit column, or the 5-unit column at reduced height |
| 4 : 5 and 5 : 4 | Any | Both columns |
| 1 : 1 | Only if shot that way | Anywhere; never produced by cropping |
| Panoramic beyond 2 : 1 | E5 | Full bleed only, and never as a decorative band ([§31.4](#31-dominance-pairing-and-bleed)) |

**Fixed — This system defines no aspect-ratio tokens.** A list of approved ratios
would become a set of boxes, and boxes crop.

### 32.3 Delivery — Fixed

| Rule | Value | Why |
| --- | --- | --- |
| Delivered resolution | ≥ 2× the largest rendered size | The grain must survive examination on a high-density screen, which is the whole point of the threshold |
| Upscaling | **Never** | An upscaled image invents detail, which is retouching by a different route |
| Compression | Visually lossless at the delivered size, judged on grain and shadow detail, never on file size alone | Creative Direction Book §14.3: a shadow that loses its detail has discarded information |
| Placeholder imagery | **Forbidden at every stage, including internal design development** | Photography Direction §24.5. There is no such thing as a temporary image |
| Provenance | Every published image has a retained original, capture date, location, photographer and permission | Photography Direction §24.4. An image with no retained original is not publishable |

### 32.4 What never gets cropped

Restated from Photography Direction §22.3 in the terms a layout can breach:

- **The place.** A container that tightens onto a subject and loses the room behind
  it has removed the proof.
- **A three-plane frame into a flat one.** Any crop that removes the background plane
  discards the brand's central argument.
- **Past the point of examination.** A crop that takes the shorter dimension below
  480px has produced decoration ([§30.2](#30-the-evidence-threshold)).
- **A person, to change who was there.** Falsification.

---

## 33. Text and image

**Traces to:** Creative Direction Book §6.1, §11.4 what photography must never
become · Photography Direction §16 negative space · Visual Language Atlas §22.2

### 33.1 The default — Fixed

> **Text sits beside a photograph, below it, or on its own field. Not on it.**

Photography Direction §11.4 forbids a photograph becoming a texture behind text, and
Creative Direction Book §6.1 requires the image to be examinable. Text over an image
removes part of what can be examined and adds nothing that could not have been said
beside it.

### 33.2 The single permitted exception — Bounded

One case, and it is conditional:

> A statement may sit on a photograph **only** where the photograph was made with
> allocated negative space for it (Photography Direction §16.3), and the statement
> sits **in that space**, over floor, wall or bench — never over the subject.

All of the following must hold:

| Condition | Requirement |
| --- | --- |
| The space was made at capture | Not found afterwards by moving the text around until it fits |
| Contrast | [§17.2](#17-text-hierarchy-and-contrast) is met with an overlay of ≤25% ([§18.2](#18-colour-on-and-around-photographs)) |
| Rank | D or T1 only. Never body, never a record, never a caption |
| Quantity | One statement. No second line of supporting copy, no action |
| Failure | If any condition fails, the text moves off the image. The image is not darkened further and is not blurred |

### 33.3 The relationship between a caption and its image — Fixed

Governed at [§12.2](#12-figures-captions-eyebrows-and-pull-quotes). The layout
obligations:

- The caption's left edge aligns with the image's left edge, optically
  ([§24.3](#24-horizontal-space-and-margins)).
- S2 (16px) between them, at every field width. This relationship never scales
  ([§25.1](#25-responsive-space)).
- The caption never exceeds the image's width, and never runs to a second column.
- On a full-bleed image, the caption returns to the page margin rather than bleeding
  with it. The image is a view; the caption is a record, and records live inside the
  margin.

### 33.4 How evidence outranks decoration, operationally

The ordering used when a field cannot hold everything, in strict priority:

1. **The photograph, at or above threshold.** Nothing else is permitted to reduce it.
2. **The caption.** It carries the provenance that makes the image evidence.
3. **The statement.**
4. **The body.**
5. **The action.**

When a field runs out of room, **removal begins at 5 and works upward.** No layout
in this system resolves a space problem by shrinking a photograph, because that
converts evidence into decoration, and Brand Bible §3.6 rejects an element that
contradicts Evidence regardless of what else it serves.

---
---

# PART VII — COMPONENT LANGUAGE

---

## 34. The law of components

**Traces to:** Brand Bible D8 interfaces recede · Creative Direction Book §23 the
visual gate, L9, L13 · Visual Language Atlas §23 why interfaces should become
invisible

### 34.1 A component is a liability until it earns its place

The category treats a component library as an asset: the more components, the more
capable the system. This brand inverts that, because L9 makes every border, box,
container, shadow and control the least valuable mark available, and Atlas §23
settles that an interface is working when it is not noticed.

> **Fixed — Every component in this part answers three questions, in this order:
> why it exists, when it exists, and when it disappears. A component whose third
> answer is "never" has not been examined.**

The third question is the one this document adds to the usual practice. A component
that is always present is not a component; it is furniture, and furniture accumulates.

### 34.2 The complete vocabulary

Six element types exist ([§7.1](#7-visual-confidence-and-the-removal-standard)):
**photograph, statement, passage, record, action, mark.** Every component in this
part is one of those six, arranged. Nothing in this system is a seventh thing.

| Type | What it is | Components that express it |
| --- | --- | --- |
| Photograph | Evidence | [§30](#30-the-evidence-threshold)–[§33](#33-text-and-image) |
| Statement | The company speaking | Serif ranks D, T1, T2 |
| Passage | The argument | Body, lists |
| Record | A checkable fact | Tables, specification lists, captions, form fields |
| Action | A commitment the visitor may make | Buttons, links |
| Mark | A functional line | Hairline, focus ring |

### 34.3 The addition test — Fixed

Before any component not in this part is built:

1. Which of the six types is it? If none, it does not exist.
2. Which locked-document law requires it? If none, it does not exist.
3. What is removed to make room for it ([§25.3](#25-responsive-space))?
4. When does it disappear?

**A proposed component that survives all four is added by amending this document,
never by building it first.** Atlas §35.13: the danger is never the first exception,
it is the second, which cites the first.

---

## 35. Action: buttons and links

**Traces to:** Brand Bible §3.4 Restraint — one action rather than a choice of
three, §11 vocabulary · Creative Direction Book §10 visual confidence, L10 · Visual
Language Atlas §35.1 the Museum Test

### 35.1 Why an action exists at all

A button is the brand asking for something, and Brand Bible §16.4 establishes that
a luxury brand does not chase. The Museum Test is the constraint: would this survive
in a room where nothing is for sale? An action survives it only when it is the
answer to a question the visitor has already formed — *how do I reach you* — rather
than an interruption inviting them to form it.

**Therefore an action is not a persuasion device. It is a door, placed where somebody
would look for one.**

### 35.2 The button — Fixed

| Question | Answer |
| --- | --- |
| **Why it exists** | To carry the one commitment a surface makes available: begin an enquiry, request a specification, send a drawing |
| **When it exists** | Once per surface, after the argument has been made, never before it |
| **When it disappears** | During any held moment ([§23.4](#23-sections-chapters-and-the-held-moment)); beside any photograph ([§31.2](#31-dominance-pairing-and-bleed)); on any surface whose purpose is a record; anywhere the visitor has not yet been given a reason |

| Property | Value | Derivation |
| --- | --- | --- |
| Form | A solid Ink rectangle, Paper text. Corner radius **0** | [§16.5](#16-background-surface-and-border-hierarchy) |
| Border, shadow, gradient | None | [§16.3](#16-background-surface-and-border-hierarchy), [§16.4](#16-background-surface-and-border-hierarchy) |
| Type | Sans, rank R (15px), medium weight, sentence case | It is interface, so it is the record voice ([§8.4](#8-the-two-voices-and-the-typefaces-that-perform-them)) |
| Height | **48px**, from 14px vertical padding on a 20px line box | Not less than the 44px minimum reliable touch target ([§47.5](#47-accessibility-as-respect)), on the 4px scale |
| Horizontal padding | **24px** | S3. The label is a group; the padding binds it |
| Label | Names the act, in the vocabulary of Brand Bible §11.1 | "Send the drawing", not "Submit", never "Learn more" |
| Width | Fits its label. Never full-bleed, never stretched to a column | A stretched button is a band, and a band is decoration |
| Count per viewport | **One** | [§29.4](#29-editorial-layouts) |

**There is no secondary button.** Brand Bible §3.4: one action rather than a choice
of three. A second action on a surface is a second door, and offering two doors is
the visible form of not knowing what the visitor came for. Where a lesser action is
genuinely needed, it is a link.

**There is no outlined, ghost, tinted or text button.** Each is a button pretending
to be less than a button, which is a hierarchy problem solved by decoration rather
than by deciding.

### 35.3 The link — Fixed

| Question | Answer |
| --- | --- |
| **Why it exists** | To let a reader follow a fact to its source, or a chapter to the next chapter. It is the mechanism of Evidence: a claim a stranger can check |
| **When it exists** | Inside a passage, in a record, in navigation, in the footer |
| **When it disappears** | Never, within prose — a link that vanishes on a small field has removed a route to proof |

| Property | Value | Derivation |
| --- | --- | --- |
| Form in prose | Ink text with a **1px underline at 1px offset** | An underline is the one interface convention old enough to be invisible; colour is unavailable ([§11.2](#11-how-emphasis-works)) |
| Form in navigation and records | No underline. Position identifies it | [§37](#37-navigation-and-footer) |
| Colour | Ink. Never a hue | [§15.2](#15-the-palette) |
| Hover | The underline thickens to 2px. Nothing else changes | [§42.5](#42-component-behaviour-in-time) |
| External links | Marked with the one permitted glyph ([§43.3](#43-icons)), because leaving the site is a fact about where the reader is going |
| Visited state | None. The brand does not record where a buyer has been on its own site, visually or otherwise |

**Fixed — An underline in this system means a link and nothing else**
([§11.2](#11-how-emphasis-works)).

### 35.4 What an action may never do

| Never | Breaks |
| --- | --- |
| Appear twice on one surface with the same label | L10 — a call appears once; repetition reads as insecurity |
| Sit in a persistent bar that follows the reader | Creative Direction Book §22.4 — it destroys every held moment on the surface |
| Appear beside or over a photograph | [§31.2](#31-dominance-pairing-and-bleed) — Museum Test |
| Carry urgency: a countdown, a limited offer, a "book now" | Brand Bible §7.2 agitation; Creative Direction Book §22.3 |
| Animate to attract attention | Motion Direction M3, M15 |
| Use a functional hue | [§15.2](#15-the-palette) |

---

## 36. Containers, and why there are almost no cards

**Traces to:** Creative Direction Book L9, L13 · Brand Bible D8 · Visual Language
Atlas §23, §34 why work fails

### 36.1 The card is the category's default and this brand's clearest failure

A card is a bordered or shadowed container holding an image, a heading and a line of
text, repeated in a grid of three or four. It fails, simultaneously:

| Test | Failure |
| --- | --- |
| L9 | It is a border, a container and usually a shadow — three of the least valuable marks, combined |
| L8 | Every card in a grid is the same size, so the grid states that nothing in it matters more than anything else |
| Creative Direction Book §11.3 | It places photographs of equal weight beside each other, so the eye compares rather than examines |
| [§30.2](#30-the-evidence-threshold) | Its image is almost always below the evidence threshold, which converts evidence into decoration |
| The Factory Test | Any trading house can produce a card grid. Nothing in it requires owning a floor |
| The Museum Test | It is a catalogue unit. It exists to be chosen from |

Six failures from one component. That is why this part is short.

### 36.2 What replaces it — Fixed

> **The record row.** A full-width row: an image at or above threshold on the 5-unit
> column, a specification beside it on the 3-unit column, a hairline separating one
> row from the next. Rows are unequal in height because their images are unequal in
> ratio ([§32.1](#32-ratio-crop-and-delivery)).

| Question | Answer |
| --- | --- |
| **Why it exists** | Because a set of things genuinely does sometimes need to be shown as a set: product families, process stages, dispatch records |
| **When it exists** | Only where the content is a genuine set of equals ([§28.4](#28-alignment-symmetry-and-asymmetry) condition 2) |
| **When it disappears** | When the set has fewer than three members — then they are passages, not a set |

The row is not a card unrolled. It is a record: one fact per line, aligned, readable
top to bottom, with an image that can actually be examined.

### 36.3 The one permitted container — Fixed

`Recessed` behind a record block ([§16.2](#16-background-surface-and-border-hierarchy)),
with no border and no radius. It exists to bind a specification into one object. It
is the only fill in the system that is not Paper or Ink.

### 36.4 What does not exist

No card. No panel. No tile. No well. No bordered callout. No quote box. No feature
box. No stat box. No "highlight" surface. No nested container of any kind.

---

## 37. Navigation and footer

**Traces to:** Creative Direction Book L15 a visitor may arrive anywhere, §22.4
persistent elements, §12.4 the held moment · Brand Bible D8 · Documentary
Storyboard §8 chapters are extractable

### 37.1 Navigation

| Question | Answer |
| --- | --- |
| **Why it exists** | Because a visitor may arrive anywhere (L15) and must be able to establish where they are and what else exists |
| **When it exists** | At the top of every surface, at rest |
| **When it disappears** | **The moment the field is given to evidence or to silence** |

The disappearance rule is the substantive one and it is inherited directly:
Creative Direction Book §22.4 states that space shared with a persistent bar is
padding rather than silence, and §12.4 states that a held moment interrupted by a
bar is an advertisement with a picture behind it.

> **Fixed — Navigation is not present over a full-bleed photograph, over an inverted
> field, or during a held moment. It does not overlay a photograph at any time.**

| Property | Value | Derivation |
| --- | --- | --- |
| Height | **80px** at and above 720px; **64px** below | The 48px action height plus S2 above and below on a large field, S1 on a small one |
| Contents | The company name, set as text; not more than **five** destinations; nothing else | Atlas §14.4 few levels; a sixth destination is a structure that needs an index, not a bar |
| Type | Sans, rank R, regular weight | Interface is the record voice |
| Current location | Marked with a 1px Ink underline at 4px offset | The one mark that is not a container |
| Separator from the field | **None** — no border, no shadow, no background change on scroll | [§16.3](#16-background-surface-and-border-hierarchy), [§16.4](#16-background-surface-and-border-hierarchy) |
| Behaviour on scroll | It leaves with the field ([§42.6](#42-component-behaviour-in-time)) | A sticky bar is a persistent element |
| Below 720px | The five destinations become a full-field index reached from a single labelled control ([§43.3](#43-icons)) | |

**No mega-menu, no dropdown, no hover-revealed panel.** A structure that needs a
dropdown has more than five destinations, and the remedy is the structure, not the
control.

### 37.2 The footer

| Question | Answer |
| --- | --- |
| **Why it exists** | It is the record of the company: legal identity, address, registration, contact, the index of everything |
| **When it exists** | At the end of every surface |
| **When it disappears** | Never — but it is the only element in the system for which that answer is correct, because it is a record rather than furniture |

| Property | Value |
| --- | --- |
| Voice | Entirely sans, rank R and C. No statement, no serif, no photograph |
| Separator | A single hairline above it — one of the four permitted uses ([§16.4](#16-background-surface-and-border-hierarchy)) |
| Space above | S6 (192 desktop / 96 small). The footer is a different kind of thing, not the last section |
| Contents | Named address of the floor; registration and identifiers; the index; contact. Facts, each on the Facts Register (Brand Bible §19) |
| Never | A newsletter capture, a social row, a repeated call to action, an award badge, a "trusted by" strip, a certification logo that is not a checkable fact |

The footer is where Ownership is stated plainly: a named building at a named
address. That is the strongest sentence on most surfaces and it costs nothing.

---

## 38. Forms

**Traces to:** Brand Bible §3.2 Evidence, §18.5 how buyers are treated · Creative
Direction Book L9 · Visual Language Atlas §14 hierarchy is a kindness · Motion
Direction M11 motion never conceals

### 38.1 Why a form exists

It is the one place the visitor becomes the author of a record. Everything else on
these surfaces is the company's record; a form is the buyer's. That reframing
decides every rule below: **a form is a document being filled in, not an interface
being operated.**

### 38.2 When it exists, when it disappears

- **Exists:** on the enquiry surface, and nowhere else.
- **Disappears:** it is never embedded in a chapter, never in a footer, never in a
  dialog, never beside evidence. A form inside a passage converts the passage into a
  capture mechanism, which the Museum Test rejects.

### 38.3 Structure — Fixed

| Property | Value | Derivation |
| --- | --- | --- |
| Field form | A 1px hairline **underneath only**, no box, no fill, no radius | [§16.4](#16-background-surface-and-border-hierarchy): nothing is enclosed on four sides |
| Field height | 48px | Matches the action; [§47.5](#47-accessibility-as-respect) |
| Label | Sans, rank R, above the field, S1 (8px) below the label | Always visible. A label inside a field disappears when it is needed |
| Placeholder text | **None** | It vanishes at the moment of use and cannot be checked afterwards; it is a label that hides |
| Field width | The measure of what it holds: a postcode is not as wide as an address | A uniform column of equal fields is a form that did not read its own questions |
| Between fields | S3 (24px). Between groups, S4 (48px) | [§22.3](#22-vertical-rhythm-and-the-heading-rule) |
| Required and optional | Every field required unless marked "optional" in words at rank C | An asterisk is a symbol where a word fits ([§43.2](#43-icons)) |

### 38.4 Validation — Fixed

| Rule | Value | Derivation |
| --- | --- | --- |
| When | On leaving a field, and again on submission. **Never while typing** | Correcting somebody mid-sentence is a discourtesy, and Motion Direction §14.3 makes the brand's posture toward buyers explicit |
| Error form | Oxide text at rank R below the field, plus the field's hairline at Oxide, plus a word | Hue is never the only carrier ([§15.2](#15-the-palette)) |
| Error copy | States what is wrong and what to do. Never "invalid input" | Brand Bible §12: say what was checked |
| Success | Enamel, one line, at the point of the act | |
| Waiting | The state is **stated in words**, never disguised by a spinner or a skeleton | Motion Direction M11: a wait disguised is a false statement about the system, of the same class as an unverified number |

That last row removes the loading skeleton and the indeterminate spinner from this
system entirely. If a submission takes four seconds, the surface says so.

### 38.5 Disabled states — Fixed

> **A control the visitor cannot use is not shown dimmed. It is not shown.**

A greyed control is a claim that something exists and is being withheld, which is the
posture Brand Bible §16.4 forbids. Where an action becomes available only after a
condition is met, the condition is stated in words and the action appears when it is
true.

---

## 39. Records: tables, lists, badges and tags

**Traces to:** Brand Bible §16.3 the sans is the record, §19 the Facts Register ·
Documentary Storyboard §13.6 captions as specification · Creative Direction Book
§12.5 density is permitted

### 39.1 Tables

| Question | Answer |
| --- | --- |
| **Why it exists** | It is the purest expression of Evidence available in a layout: facts, aligned, comparable, checkable |
| **When it exists** | Wherever a set of facts shares a structure — specifications, tolerances, lead times, dispatch records |
| **When it disappears** | When it has one row, or when its columns are not comparable. Two facts about one thing is a specification list, not a table |

| Property | Value | Derivation |
| --- | --- | --- |
| Voice | Sans throughout. Figures tabular, aligned on the digit | Brand Bible §16.3 |
| Header | Sans medium, rank C, sentence case | |
| Separators | A hairline between rows. **No vertical rules, no outer border, no zebra striping** | [§16.4](#16-background-surface-and-border-hierarchy). Alignment separates columns; a rule between them is a mark doing work space already did |
| Row height | 48px minimum, from 14px padding on a 20px line | Density is permitted, crowding is not |
| Alignment | Text left, figures right, units in the header not in every cell | |
| Equal treatment | Permitted and required here | [§28.4](#28-alignment-symmetry-and-asymmetry) condition 2: it is a factual claim about the content |
| Small fields | The table does not become cards. It scrolls horizontally within its own field, with the first column held | [§46.2](#46-what-is-preserved-what-is-sacrificed) |

### 39.2 Lists

| Kind | Form | Used for |
| --- | --- | --- |
| **Sequence** | Numbered, sans figures, hanging outside the measure | Process stages, ordered operations. The order is the fact |
| **Set** | Unnumbered, marked by a single 4px Ink square at the x-height, hanging | Members of a set where order carries nothing |
| **Specification** | Label at rank C secondary, value at rank R primary, on one line, S1 between pairs | The most-used record form in this brand |

**No icon bullets, no checkmarks, no tick lists.** Creative Direction Book §6.2:
show the mechanism, not the symbol — the report, not a checkmark. A tick list is the
capability grid the Factory Test eliminates.

### 39.3 Badges and tags — Fixed

> **Neither exists.**

A badge is a coloured pill asserting a status; a tag is a coloured pill asserting a
category. Both fail on four counts: they require a radius
([§16.5](#16-background-surface-and-border-hierarchy)), a fill ([§16.2](#16-background-surface-and-border-hierarchy)),
a hue ([§15.2](#15-the-palette)), and a container
([§16.4](#16-background-surface-and-border-hierarchy)). All four are unavailable, and what remains
after removing them is a word — which was the content all along.

Where a status must be shown, it is **a word at rank C**, in Ink, in the record
voice. Where a category must be shown, it is a word, and if it is navigable it is a
link.

**Certification marks are the one adjacent case, and they are not badges.** A
third-party audit mark is a record, reproduced as the issuing body publishes it,
placed in a record field with the certificate number and date beside it, and shown
only where Brand Bible §19 confirms the underlying fact. It is never decorative,
never a row of logos, never resized to match its neighbours.

---

## 40. Disclosure: accordions, dialogs, search and pagination

**Traces to:** Creative Direction Book §22.3 withholding, L1 · Motion Direction
M11, M14 · Brand Bible §3.2 Evidence · Visual Language Atlas §23

### 40.1 The disclosure principle

Hiding content is a claim that it is secondary. Sometimes that claim is true and
useful; usually it is a way of avoiding a decision about what belongs on a surface.

> **Fixed — Content is hidden only when the hidden thing is a record a reader
> consults rather than reads.** Never an argument, never evidence, never a
> photograph, never a fact a sceptical buyer would look for.

### 40.2 Accordions

| Question | Answer |
| --- | --- |
| **Why it exists** | So a long reference set — specifications by product family, questions of fact — can be consulted without being read |
| **When it exists** | Only on a record surface, only with three or more items, only where each item is independent |
| **When it disappears** | On any surface carrying an argument; wherever the hidden content is something a buyer would look for; at three items or fewer, where the content simply appears |

| Property | Value |
| --- | --- |
| Form | A full-width row, hairline between rows, no box, no fill, no radius |
| Marker | A 12px plus/minus in the sans's stroke weight, right-aligned. No chevron, no rotation ([§43.3](#43-icons)) |
| Behaviour | Multiple items may be open. Opening one does not close another — closing something the reader did not close is the interface changing its mind (Motion Direction M14) |
| Motion | The 200–260ms band ([§42.3](#42-component-behaviour-in-time)); content does not fade in behind the opening |

### 40.3 Dialogs

| Question | Answer |
| --- | --- |
| **Why it exists** | For one case only: a task that must be completed or abandoned before the surface beneath it means anything |
| **When it exists** | Almost never. In this brand: a required legal acknowledgement, and a destructive confirmation in an internal tool |
| **When it disappears** | Everywhere else. Not for images, not for videos, not for forms, not for newsletters, not for cookies, not for "welcome" |

| Property | Value | Derivation |
| --- | --- | --- |
| The field behind | Recedes under an Ink veil at **80%** | [§16.3](#16-background-surface-and-border-hierarchy): the field recedes, the dialog does not rise |
| The dialog itself | Paper, no radius, no shadow, no border. Max width 640 (the reading column) | It is a document |
| Entry and exit | The 320–400ms band, veil and dialog together as one movement | Motion Direction M10: one movement per field |
| Dismissal | Escape, the veil, and a labelled control. All three, always | |
| Focus | Trapped while open, returned to the originating control on close | [§47.3](#47-accessibility-as-respect) |

**No lightbox.** An image worth opening was worth placing at threshold on the
surface ([§30](#30-the-evidence-threshold)).

### 40.4 Search

| Question | Answer |
| --- | --- |
| **Why it exists** | Only when the record set is large enough that a person who knows what they want cannot reach it by structure |
| **When it exists** | On a specification or catalogue surface with more than roughly fifty records |
| **When it disappears** | On every editorial surface. A site whose story needs a search field has a structure problem, and search is being used to conceal it |

Form: a labelled field with a hairline beneath, matching [§38.3](#38-forms). No icon
in place of a label, no magnifier glyph standing alone, no type-ahead overlay that
covers the content beneath, no results that reorder while the reader is looking at
them (Motion Direction M14).

### 40.5 Pagination

| Question | Answer |
| --- | --- |
| **Why it exists** | To state where a reader is in a finite set — page four of nine — which is a fact about the record |
| **When it exists** | Where a record set exceeds what one surface can carry at threshold |
| **When it disappears** | Wherever the set is short enough to place whole |

Form: rank R sans, numerals tabular, current page marked with the same 1px underline
as current navigation. No boxes, no arrows-only controls, no ellipsis-heavy widget.

**No infinite scroll.** It removes the reader's knowledge of the extent of the set,
which is a fact being withheld (Motion Direction M11 in its spatial form), and it
makes the footer — the company's own record — unreachable.

---

## 41. What does not exist

**Traces to:** Creative Direction Book §23 the default answer is no, §25 failure
modes · Motion Direction M3, M15 · Visual Language Atlas §35.1 the Museum Test,
§35.10 the Permanence Test

The list is as much a part of this system as the components. Each entry names the
law that removes it, so that a future proposal is answered by the document rather
than by taste.

| Does not exist | Removed by |
| --- | --- |
| **Carousels and sliders** | L1 one idea per view; Creative Direction Book §11.3 the eye compares; Motion Direction M15 a treatment set running; and the practical fact that a carousel hides evidence behind an interaction |
| **Autoplaying video or background loops** | Motion Direction M3 attention that cannot be declined; M15 |
| **Hero video with text over it** | [§33.1](#33-text-and-image); Motion Direction §5.3 no movement beside anything being examined |
| **Parallax, scroll-jacking, scroll-driven reveals of any kind** | Motion Direction M7 the frame never moves; M6 visible cause; M13 noticed motion has failed |
| **Sticky bars, floating action buttons, back-to-top buttons, chat widgets** | Creative Direction Book §22.4 persistent elements destroy silence |
| **Modal newsletter or offer interruptions** | The Museum Test; Brand Bible §16.4 a luxury brand does not chase |
| **Glass, frost, blur, translucency, gradient overlays** | [§14.5](#14-why-our-surfaces-are-almost-colourless) false material; the Permanence Test — the clearest signature of this decade available |
| **Card grids** | [§36.1](#36-containers-and-why-there-are-almost-no-cards) |
| **Testimonial sliders and logo walls** | Brand Bible §11.2 "trusted by" requires named, permissioned proof |
| **Animated counters and statistic panels** | Brand Bible §16.3 a number set as a statement becomes rhetoric |
| **Progress bars on reading, reading-time estimates** | The reader decides (Brand Bible P4); a progress bar is a persistent element |
| **Tooltips carrying meaning** | If a fact needs explaining it is written; a tooltip is a fact hidden behind a hover, unavailable on touch |
| **Skeleton screens and indeterminate spinners** | [§38.4](#38-forms); Motion Direction M11 |
| **Breadcrumbs** | Five destinations do not need a trail ([§37.1](#37-navigation-and-footer)) |
| **Tabs** | L1; content behind a tab is content that lost an argument about whether it belongs on the surface |
| **Dark-mode toggle** | [§19](#19-dark-mode) |
| **Cookie or consent overlays covering the field** | Where consent is legally required it is a surface, or a footer-anchored record — never an overlay on a held moment |

---

## 42. Component behaviour in time

**Traces to:** Motion Direction M1–M15, §36.1 the deferred values, §9.4 rate is
proportional to the thing, §14.2 the ratio, §18 rhythm, §19.3 one behaviour per
class of event

### 42.1 What this chapter owes

Motion Direction §36.1 defers exactly four things to this document: **durations and
delays, easing curves, intervals, and nothing else.** It also states the condition
under which they may be written: each value must be derived from mass, scale or
cause, never from a preference or a current practice.

This chapter does not restate the Movement Laws. It converts three of them into
numbers and leaves the rest as they are.

### 42.2 The one behaviour per class rule — Fixed

Motion Direction §19.3: the same class of event moves the same way, forever, and any
change is a change to all of them retrospectively or it is not made.

> **There are four classes of event in this system, four duration bands, and one
> curve. Nothing has its own timing.**

### 42.3 The duration bands — Fixed

Derived from Motion Direction §9: rate is proportional to the thing, and anything
that moves fast reads as small. The bands are therefore set by **the longest
dimension of the thing moving**, and they step by roughly 1.5×, which is the same
steepness rule this system uses for type and space
([§2.2](#2-hierarchy-expressed-as-a-number)).

| Band | The thing moving | Duration |
| --- | --- | --- |
| **1 — a mark** | ≤ 48px: an underline, a plus/minus, a focus ring | **120–160ms** |
| **2 — an element** | ≤ 320px: a field message, a menu item, a disclosure row | **200–260ms** |
| **3 — a panel** | ≤ 800px: a dialog, an index, a drawer | **320–400ms** |
| **4 — a field** | The whole viewport: an inverted field, a surface transition | **480–600ms** |

**The ceiling of 600ms** is not comfort. Beyond roughly 600ms a movement is
perceived as an event in its own right rather than as a change of state, and
Motion Direction M13 fails anything noticed as movement. **The floor of 120ms** is
Motion Direction §11: the fastest motion feels cheapest, and below about 120ms a
transition is not perceived as motion at all — it is perceived as a flicker, which
states nothing about mass.

### 42.4 The curve — Fixed

Motion Direction M8 and §14.2: deceleration is longer than acceleration, and the
ratio is the brand's register. Expressed measurably, with no curve library and no
spring:

> **Acceleration occupies not more than one third of the duration; deceleration not
> less than two thirds. The final quarter of the distance takes not less than 40% of
> the time. No control point may take the value outside 0 to 1 in either direction.**

That last clause is M5 stated as arithmetic: **no overshoot is representable**, so
nothing can bounce, spring, wobble or settle twice. The prohibition is enforced by
the shape of the curve rather than by a reviewer noticing it.

There is **one** curve. Not an entrance curve and an exit curve and a standard
curve: Motion Direction §19.3 requires one behaviour per class of event, and
entrance and exit are the same class of event seen twice.

### 42.5 States — Fixed

| State | Behaviour | Derivation |
| --- | --- | --- |
| **Hover** | One property changes, in band 1. A link's underline thickens; a row's hairline darkens | Motion Direction §29: response explains, never narrates |
| **Hover — never** | Scale, lift, shadow, colour change, image zoom, translation | M4 a claim about mass; M6 uncaused elevation; [§16.3](#16-background-surface-and-border-hierarchy) |
| **Press** | No movement. The state changes on release | Nothing in this brand depresses; a pressed button is a skeuomorphic claim |
| **Focus** | The ring appears in band 1, or instantly | It must never be slower than the key that summoned it |
| **Appear** | Content is present when the surface is. **Nothing fades in on scroll** | M6 visible cause: a reader scrolling did not cause an element to materialise. M13: its absence would not be noticed, so it was never necessary |

The last row removes scroll-triggered reveals from the entire system. It is the
single most common motion pattern in contemporary web design and the one the
Permanence Test names most directly.

### 42.6 Intervals and stagger — Bounded

Motion Direction §18.4: regular enough to be felt, irregular enough not to be
counted.

| Rule | Value |
| --- | --- |
| Stagger between members of a set | **40–90ms**, and only within a record list |
| Maximum staggered members | **Five.** Beyond that the reader counts, and a counted rhythm is a metronome |
| Stagger on photographs | **Never.** Evidence does not arrive in sequence ([§30](#30-the-evidence-threshold)) |
| Simultaneous movements in one field | **One** | Motion Direction M10 |

### 42.7 Reduced motion — Fixed

> **Where reduced motion is requested, every movement becomes an instantaneous state
> change. Nothing is substituted — no fade in place of a movement, no shortened
> version.**

Derived from Motion Direction M13's second half: a movement whose absence would be
noticed was necessary. If removing a movement breaks the comprehension of a surface,
that movement was carrying meaning it should never have carried, and the surface is
wrong. Reduced motion is therefore also a **test**: run every surface with motion
disabled, and nothing should become harder to understand.

---
---

# PART VIII — ICONOGRAPHY

---

## 43. Icons

**Traces to:** Creative Direction Book §6.2 show the mechanism, not the symbol · D8
interfaces recede · Visual Language Atlas §22 typography should disappear, §35.2
the Factory Test · Brand Bible §11 vocabulary

### 43.1 Why icons should disappear behind language

Creative Direction Book §6.2 is the whole argument and it is about evidence, not
about style:

> Show the mechanism, not the symbol. The press cutting, not an icon of a press. The
> report, not a checkmark.

An icon is a symbol standing in for a thing. This brand's entire position is that
the thing itself is available for inspection — so substituting a symbol for it is a
small retreat from the one claim we are making. A row of icons above three
capability statements is the visual form of a company that cannot show its floor.

There is a second argument, from Ownership: **icon sets are bought.** Every icon
library available to us is available to every competitor, so anything drawn from one
fails the Factory Test on sight. A photograph of our press cannot be bought at any
price; a press glyph costs nothing and proves nothing.

### 43.2 When icons are forbidden — Fixed

| Forbidden | Why |
| --- | --- |
| As a substitute for a word that would fit | The word is more precise and cannot be misread |
| Beside a heading, as decoration | It is a mark that carries no argument (L14) |
| In a feature or capability list | Creative Direction Book §6.2; the Factory Test |
| As a bullet | [§39.2](#39-records-tables-lists-badges-and-tags) |
| Inside a circle, square, or any container | [§16.4](#16-background-surface-and-border-hierarchy) |
| Carrying a functional hue | [§15.2](#15-the-palette) |
| As the only label on a control | [§47.4](#47-accessibility-as-respect) |
| Filled, duotone, three-dimensional, or illustrative | It becomes an image, and a second image halves the first (Atlas §22.2) |
| Animated | Motion Direction M15 |

### 43.3 When icons exist — Fixed, and the list is closed

An icon exists only where **no word is available that is both short enough and
unambiguous**, and where the mark has been in continuous use long enough to be read
without instruction. Four:

| Icon | Where | Why no word |
| --- | --- | --- |
| **Index / close** | The small-field navigation control, and its dismissal | A control at 48px cannot carry a legible word at rank R; it carries an accessible name instead ([§47.4](#47-accessibility-as-respect)) |
| **Plus / minus** | The accordion state marker | It states open or closed positionally, and the word would repeat the row's own label |
| **External** | Beside a link leaving the site | It marks a fact about destination inline, where a parenthetical would break the sentence |
| **Arrow** | Pagination direction only, always beside a word or a numeral | Direction is the one meaning a glyph carries more precisely than a word |

That is the complete set. A fifth icon requires an amendment to this document
([§34.3](#34-the-law-of-components)).

### 43.4 How they are drawn — Fixed

| Property | Value | Derivation |
| --- | --- | --- |
| Style | Line only, open ends, no fill, no rounding of joins or caps | [§16.5](#16-background-surface-and-border-hierarchy): our materials meet at cut edges |
| Stroke | **1.25–1.5px**, matched to the stem weight of the sans at the same size | The icon is punctuation in a sentence of type. If its weight differs from the type beside it, it is a graphic rather than a mark |
| Size | The cap height of the text it accompanies, and **never larger** | [§2.3](#2-hierarchy-expressed-as-a-number): an enlarged icon claims a level it does not have |
| Colour | Ink or Ink secondary, matching its text exactly | |
| Grid | Drawn on the same 4px unit as everything else ([§21.2](#21-the-spacing-scale)) | |
| Optical alignment | Aligned to the text's optical baseline, not to its box ([§24.3](#24-horizontal-space-and-margins)) | |

### 43.5 The test

> **Cover the icon. Is anything lost?**

L13, applied to the smallest element in the system. Four survive it. Everything else
a designer will want to add does not, and the correct response to "the section needs
an icon" is that the section needs a photograph.

---
---

# PART IX — ILLUSTRATION

---

## 44. Illustration, drawing and map

**Traces to:** Brand Bible D1 photography carries the argument, §3.2 Evidence ·
Photography Direction §4 evidence and advertising · Visual Language Atlas §35.3 the
Documentary Test · Creative Direction Book §6.2

### 44.1 There is no illustration — Fixed

Not restrained illustration, not a small amount, not "a light illustrative
language". None.

The argument is one sentence long: **an illustration is an interpretation, and this
brand's position is that interpretation is unnecessary because the thing itself can
be shown.** Every illustration is a picture of something that was drawn rather than
found, which fails the Documentary Test at the first question — was this found, or
was it arranged? An illustration is arranged by definition.

The secondary argument is Permanence. Illustration style is the fastest-moving
surface in commercial design; a house illustration style adopted now would be
datable within three years, and Brand Bible §3.5 sets a twenty-year horizon.

**A brand mascot, a spot illustration, a hand-drawn texture, an isometric factory, a
stylised leather motif, an abstract pattern, a generated image of any kind: none of
these exists, at any size, in any medium, including internal decks.**

### 44.2 The one permitted class — Bounded

A **technical drawing that is a record the company actually produces.**

| Permitted | Why it is not illustration |
| --- | --- |
| A pattern or cutting layout | It is a working document. It exists whether or not there is a website |
| A dimensioned specification drawing | It is what a buyer is sent with a sample; reproducing it is showing the record |
| A process route through the floor | It states the sequence of operations, which is the argument of Brand Bible §16.5 — the process is the product |
| A dispatch map, where destinations are on the Facts Register | It is a record of fact, not a picture of reach |

Conditions, all of which must hold:

1. **It exists independently of design.** If it was drawn for the website, it is
   illustration.
2. **It is reproduced, not styled.** No brand colours, no rounded corners, no
   flourish, no perspective added, no "cleaned up" version that changes a
   dimension.
3. **It is set in the record voice** — sans, rank C or R, 1px strokes, Ink on Paper
   ([§16.6](#16-background-surface-and-border-hierarchy)).
4. **It carries the same provenance as a photograph**: what it is, what it is of, and
   when it was made ([§12.2](#12-figures-captions-eyebrows-and-pull-quotes)).
5. **It never substitutes for a photograph that exists.** A drawing of an operation
   we have photographed is a weaker statement of the same fact.

### 44.3 The logotype

Named here because it is the one mark the brand carries and it is not an
illustration:

> **The company name, set in the serif, at the size the surface requires.** No
> symbol, no monogram, no emblem, no crest, no lockup with a tagline.

Brand Bible D3 removes the alternatives: a crest is what every heritage-leaning
manufacturer in the category owns, and a company that owns its floor does not need a
symbol standing in for it. The name is the mark, which also means the mark cannot
date.

---
---

# PART X — RESPONSIVE PHILOSOPHY

---

## 45. Responsive behaviour

**Traces to:** Creative Direction Book §12.2, L15 · Visual Language Atlas §14, §36
medium independence · Brand Bible D1, D2 · Photography Direction §5

### 45.1 The small field is not a compressed large one

The category's default is subtraction by scaling: the same layout, narrower, with
everything smaller. It fails here immediately, because the two things this brand
cannot afford to shrink — the photograph and the space around what matters — are
exactly the two things that scaling shrinks first.

> **Fixed — Responsive behaviour is a change in what a field carries, not a change
> in the size of what it carries.**

### 45.2 How hierarchy changes

| Field | Levels available | What changes |
| --- | --- | --- |
| ≥ 1280 | Four ([§2.3](#2-hierarchy-expressed-as-a-number)) | The full scale; D available |
| 1024 – 1279 | Four | D available, at interpolated size |
| 720 – 1023 | Four, T3 available | Statements compress fastest ([§9.2](#9-the-type-scale)) |
| < 720 | **Three.** T3 is removed ([§9.4](#9-the-type-scale)) | Fewer levels, more steeply separated |

Hierarchy gets **steeper** as the field narrows, not flatter. A small field has less
distinguishability to spend, so it spends it on fewer distinctions — which is Atlas
§14.4 applied rather than conceded.

### 45.3 How photography changes

| Field | Behaviour |
| --- | --- |
| ≥ 1280 | The paired field: photograph on 5 units, one-edge bleed, annotation inside the margin |
| 1024 – 1279 | The photograph takes the full field width; the annotation moves beneath it |
| < 1024 | **Full bleed, edge to edge, no margin** ([§27.3](#27-container-widths-and-breakpoints)) |

The photograph's share of the field therefore **rises** as the field falls: from
about 62% at desktop to 100% on a phone. That is the opposite of the category
default and it is required by [§30.2](#30-the-evidence-threshold) — the threshold is
absolute, so on a 390px field the only way to approach it is to give the image
everything. On the smallest field, **the photograph takes the whole field and the
words wait.**

### 45.4 How whitespace changes

Governed by [§25.1](#25-responsive-space): small spaces hold, large spaces halve.
The consequence is that a small field is **relatively** more generous around its
chapters than a desktop field is, because the halved S6 (96px) is a larger share of
a 700px-tall viewport than the full S6 (192px) is of a 900px one. Silence is
protected in the dimension the reader actually perceives it.

### 45.5 How actions change

The action does not become sticky, does not become full-width, and does not multiply.
It stays where the argument ends ([§35.2](#35-action-buttons-and-links)). A phone is
not a reason to start chasing.

---

## 46. What is preserved, what is sacrificed

**Traces to:** Creative Direction Book §21 L1–L15 · Visual Language Atlas §35.12 the
one test · Brand Bible §3.6

### 46.1 Preserved at every field width — Fixed

Nothing on this list is negotiable at any size, on any device, under any constraint:

1. **The evidence threshold.** A photograph is at threshold or it is not published on
   that field ([§30](#30-the-evidence-threshold)).
2. **One idea per field** (L1).
3. **Steep hierarchy** ([§2.2](#2-hierarchy-expressed-as-a-number)).
4. **The held moment, with zero persistent elements**
   ([§23.4](#23-sections-chapters-and-the-held-moment)).
5. **The two voices, and figures in the sans** ([§8](#8-the-two-voices-and-the-typefaces-that-perform-them)).
6. **Space proportional to importance** (L7).
7. **The measure**: 45–75 characters, always ([§10.1](#10-measure-leading-and-the-paragraph)).
8. **Every fact reachable.** No content is removed from a small field
   ([§46.3](#46-what-is-preserved-what-is-sacrificed)).
9. **Contrast at [§17.2](#17-text-hierarchy-and-contrast)**.
10. **The caption on every evidential image.**

### 46.2 Sacrificed, in this order — Fixed

When a field cannot hold everything, these go, and in this sequence:

1. **The second column.** The paired field becomes a sequence.
2. **The spread.** Cross-field composition becomes vertical order.
3. **Simultaneous comparison.** An E3 set becomes a horizontally scrolling record
   within its own field, or fewer members shown at threshold.
4. **T3 as a level** ([§9.4](#9-the-type-scale)).
5. **Absolute space.** S3–S6 halve ([§25.1](#25-responsive-space)).
6. **Optical refinements.** Hanging punctuation and marginal annotation give up
   their margin.

**Nothing below item 6 exists.** If a field still cannot hold the content after all
six, the content is wrong for that surface, and the remedy is editorial.

### 46.3 What is never sacrificed to fit

| Never removed on a small field | Why |
| --- | --- |
| A fact, a specification, a figure | Evidence is not a desktop feature. A buyer on a phone is the same buyer |
| A photograph that carries an argument | [§30.4](#30-the-evidence-threshold) |
| The caption and its provenance | Photography Direction §24.4 |
| The footer's record of the company | [§37.2](#37-navigation-and-footer) — it is where Ownership is stated |
| The link that lets a claim be checked | Brand Bible §3.2 |

### 46.4 The medium-independence check

Atlas §35.12 asks whether the work would still be right if the medium disappeared.
Applied to this part: **every rule in Parts I to VI is stated in terms that survive
without a screen** — proportion, measure, rank, threshold, silence. Only Parts VII,
X and XI are screen-specific, and they are marked as such so that a future medium
inherits the first six and rewrites only the last three.

---
---

# PART XI — ACCESSIBILITY

---

## 47. Accessibility as respect

**Traces to:** Brand Bible §18.5 how buyers are treated, §3.2 Evidence — can a
stranger check it · Visual Language Atlas §14 hierarchy is a kindness · Motion
Direction §14.3 respect toward the viewer · Creative Direction Book §10

### 47.1 Why this is not a compliance chapter

Compliance asks what the minimum is. This brand's relationship to its buyers is
stated as colleagues rather than an audience being processed (Motion Direction
§14.3), and the Brand Bible's central promise is that a stranger can check what we
say without taking our word for it.

> **A person who cannot read, reach, or operate the record cannot check it. For this
> brand specifically, an inaccessible surface is not a compliance failure. It is a
> withdrawal of the offer to be examined.**

That is why the targets in this part exceed the published minimums, and why they are
stated as brand requirements rather than as legal ones. The relevant standard is met
as a floor, not as a goal.

### 47.2 Contrast

Governed at [§17.2](#17-text-hierarchy-and-contrast): 12:1 primary, 7:1 secondary,
3:1 for any non-text mark that carries meaning, where the published minimum is 4.5:1.
The reason is stated there and is worth repeating in one line: contrast set to the
minimum is contrast set for the reviewer's monitor rather than for the reader's.

### 47.3 Focus and keyboard

| Rule | Value | Why |
| --- | --- | --- |
| Focus indicator | 2px Ink ring, 2px offset, on every interactive element, always | A visitor who cannot see where they are is being asked to take our word for it |
| Never | Removing the outline, or replacing it with a colour change alone | |
| Reachability | Every action, link, field and control reachable and operable by keyboard alone | |
| Order | Focus order follows the reading order, which follows the documentary order (Documentary Storyboard §7) | The story has a sequence; the surface must not contradict it |
| Skip | A first-focusable route past the navigation to the content | The navigation is five items; the route past it is still owed |
| Trap | Only inside a dialog, and released on close ([§40.3](#40-disclosure-accordions-dialogs-search-and-pagination)) | Motion Direction M14: nothing changes its mind in front of the visitor |

### 47.4 Names, labels and alternative text

**Every control carries a name in words**, whether or not it shows one. The four
permitted icons ([§43.3](#43-icons)) each carry an accessible name; an icon alone is
never the whole label.

**Alternative text is a caption, written by whoever wrote the caption**
(Documentary Storyboard §13.6): a place, a material, a state, a date. Never "image
of", never a keyword list, never a sentence of marketing.

> **There are no decorative images in this system**
> ([§30](#30-the-evidence-threshold)), so an image whose alternative text would be
> empty is an image that should not be published. The empty-alt case is a signal to
> remove the image, not a technique for hiding it.

### 47.5 Targets and reach

| Rule | Value | Why |
| --- | --- | --- |
| Minimum interactive target | **44 × 44px**; the system uses 48px | Below roughly 44px, error rates rise sharply for anyone whose hands are not steady, which on a factory floor is most people some of the time |
| Spacing between targets | S3 (24px) minimum | An adjacent mis-hit is worse than a miss |
| Hover-only meaning | **None exists** ([§41](#41-what-does-not-exist), tooltips) | A touch device has no hover; meaning behind hover is meaning withheld |

### 47.6 Motion

Governed at [§42.7](#42-component-behaviour-in-time). Reduced motion is honoured
absolutely and is also used as a test of the system: with motion removed, nothing
should become harder to understand, because Motion Direction M1 establishes that
motion is never evidence.

### 47.7 Reading order and structure

| Rule | Why |
| --- | --- |
| One first-rank heading per surface, then ranks in order without skipping | The heading structure is the surface's table of contents for anybody not looking at it |
| Visual order equals document order | A surface whose visual arrangement contradicts its underlying order tells two different stories |
| Records marked as records — a table is a table, a list is a list | Brand Bible §16.3: the record voice must be legible to a machine as well as to an eye |
| Language, units and figures stated explicitly | A specification read aloud must be as checkable as one read on screen |

### 47.8 The test

> **Turn off the images, the styles and the motion, one at a time. Is the argument
> still there?**

With images off, the captions and records carry the facts. With styles off, the
order carries the story. With motion off, nothing is lost. A surface that fails any
of the three has put something load-bearing into a layer that not everybody
receives.

---
---

# PART XII — IMPLEMENTATION HANDOFF

---

## 48. What Phase 8 must build

**Traces to:** Visual Language Atlas §25.4 rules that survive their author · Motion
Direction §36.2 · Brand Bible §3.3 Repeatability — one source of truth per fact

### 48.1 The handoff principle

This document contains no code and names no framework, and Phase 8 must not read it
as though it did. What it hands over is a **closed set of values and a closed set of
rules**, and the implementation's only obligation is that both remain closed:

> **Fixed — Every value in this document exists in exactly one place in the
> implementation, and no value outside this document exists at all.**

That is Brand Bible §3.3 applied to a codebase: one source of truth per fact, no
fact expressible in two places. A hard-coded colour, a one-off spacing value or a
local font size is the same defect as a hard-coded statistic.

### 48.2 The value groups Phase 8 must express

Named by what they are, not by how they are stored:

| Group | Contents | Source |
| --- | --- | --- |
| Type | Two families; seven ranks; sizes at two anchor widths; leading; tracking; four weights | [§8](#8-the-two-voices-and-the-typefaces-that-perform-them), [§9](#9-the-type-scale) |
| Colour | Eight values, closed | [§15.3](#15-the-palette) |
| Space | Twelve values; seven ranks | [§21.3](#21-the-spacing-scale), [§4.2](#4-silence-and-the-seven-space-ranks) |
| Layout | Five containers; four breakpoints; eight-unit field; two gutters; four margins | [§26](#26-the-columns-the-content-asks-for), [§27](#27-container-widths-and-breakpoints), [§24.1](#24-horizontal-space-and-margins) |
| Marks | Two: hairline and focus ring. Radius 0. No shadow, no elevation | [§16](#16-background-surface-and-border-hierarchy) |
| Motion | Four duration bands; one curve; one stagger range | [§42](#42-component-behaviour-in-time) |
| Photography | Threshold, decoration line, delivery rules | [§30](#30-the-evidence-threshold), [§32.3](#32-ratio-crop-and-delivery) |

### 48.3 The rules Phase 8 must make enforceable rather than remembered

A rule a developer has to remember is a rule that will be broken during the second
sprint. Where a rule can be made mechanical, it must be:

| Rule | Mechanism to build |
| --- | --- |
| No value outside the scales | The scales are the only values available; arbitrary values fail the build |
| No image below the evidence threshold | A build-time or render-time check on rendered shorter dimension ([§30.2](#30-the-evidence-threshold)) |
| No cropping by container | No cover-fit anywhere; containers set width, height follows ([§32.1](#32-ratio-crop-and-delivery)) |
| Every published image has provenance | An image without capture date, location, photographer and permission does not publish ([§32.3](#32-ratio-crop-and-delivery)) |
| Every evidential image has a caption and alternative text | Same gate |
| No radius, no shadow | Not expressible: the values do not exist |
| One action per surface | A count, checked in review |
| Reduced motion honoured | Every movement defined once, in one place, so one switch removes them all |
| No hard-coded fact or figure | Brand Bible §19: figures derive from the record at publication |

### 48.4 What Phase 8 inherits that is not in this document

- **Copy** — Brand Bible §11, §12.
- **Which facts may appear at all** — Brand Bible §19, binding at publication.
- **Which photographs exist and what they may be asked to prove** — Photography
  Direction §5.
- **The order of the story on any surface** — Documentary Storyboard §7.
- **Whether a movement happens at all** — Motion Direction §33. This document says
  only how it behaves if it does.

---

## 49. What Phase 8 may not decide

**Traces to:** Visual Language Atlas §35.13 on failure · Creative Direction Book
§23 the visual gate

### 49.1 Not available to implementation

| Not available | Where it is decided |
| --- | --- |
| Adding a colour, including a tint or a state variant | This document, by amendment |
| Adding a type rank, weight or family | This document |
| Adding a spacing value | This document |
| Adding a component | [§34.3](#34-the-law-of-components), by amendment |
| Introducing a radius, shadow, gradient, blur or texture | Nowhere. They are removed by derivation, not by preference |
| Changing a duration or curve for one component | [§42.2](#42-component-behaviour-in-time): one behaviour per class, changed everywhere or not at all |
| Cropping a photograph to fit a layout | Photography Direction §22.4 |
| Substituting a placeholder image | Photography Direction §24.5 |
| Relaxing a contrast target to match a design | [§17.2](#17-text-hierarchy-and-contrast) |

### 49.2 The exception procedure

There is one, and it is deliberately expensive. Atlas §35.13: a brand built on
restraint is destroyed by exceptions, not by mistakes.

1. Name the rule and the locked-document law behind it.
2. Show that the law is satisfied by other means, or that the law does not apply.
3. Amend **this document**, with a version number and a change-log line.
4. Apply the amendment everywhere the rule applies, retrospectively.

**A change adopted in one place and not the others is not an amendment. It is the
first exception, and the danger is the second, which will cite it.**

---

## 50. Known collisions with the current build

**Traces to:** Photography Direction §24.5 no placeholders · Visual Language Atlas
§35.10 the Permanence Test · Brand Bible D3

### 50.1 Why this chapter exists

An implementation already exists, written before this document. It was built
competently against a reasonable reading of the earlier phases, and several of its
decisions are nonetheless incompatible with the rules derived here. Recording the
collisions now converts them from surprises into a work list, and prevents the
system from being quietly bent to match what is already coded.

**This chapter is a statement of consequence, not a task list.** Sequencing belongs
to Phase 8 planning.

### 50.2 The collisions

| Present in the build | Rule it collides with | Consequence |
| --- | --- | --- |
| Display serif and interface sans, both released after 2010 | [§8.2](#8-the-two-voices-and-the-typefaces-that-perform-them) criteria 1 and 2; the Permanence Test | Both faces are replaced. This is the largest single change and it touches every surface |
| A gold accent used as a brand colour, with subtle and foreground variants | [§14.3](#14-why-our-surfaces-are-almost-colourless), [§15.2](#15-the-palette), [§20.3](#20-the-colour-budget) | The accent is removed. Nothing replaces it |
| Corner radii of 14–24px on buttons, inputs, cards and images | [§16.5](#16-background-surface-and-border-hierarchy) | All radii become 0 |
| Four shadow levels, including a floating level | [§16.3](#16-background-surface-and-border-hierarchy) | All shadows removed; the dialog uses the veil |
| A glass/frost blur token | [§14.5](#14-why-our-surfaces-are-almost-colourless); [§41](#41-what-does-not-exist) | Removed |
| An eight-level elevation index | [§16.2](#16-background-surface-and-border-hierarchy) | Reduced to what the veil and the dialog require |
| Four durations and four easing curves | [§42.2](#42-component-behaviour-in-time), [§42.4](#42-component-behaviour-in-time) | Four duration bands, one curve |
| A sticky header with a condensed state | [§37.1](#37-navigation-and-footer), Creative Direction Book §22.4 | The header leaves with the field and never overlays a photograph |
| A fixed-height hero at 70vh | [§31.4](#31-dominance-pairing-and-bleed), [§32.1](#32-ratio-crop-and-delivery) | Height follows the photograph; a fixed height implies cropping |
| A card component and category cards | [§36](#36-containers-and-why-there-are-almost-no-cards) | Replaced by the record row |
| Badge component with pill radius and warning tone | [§39.3](#39-records-tables-lists-badges-and-tags) | Replaced by a word |
| Generated placeholder imagery in the repository | Photography Direction §24.5 | **Blocking.** No surface using them may be published, internally or externally |
| Body text at 16px, serif display for statements at fluid sizes | [§9.2](#9-the-type-scale) | Rescaled to the seven ranks |
| Background at a lighter, cooler value than Paper | [§15.1](#15-the-palette) | Adjusted; it is a small change and it affects how every photograph reads |

### 50.3 The one that is blocking

Placeholder imagery. Photography Direction §24.5 forbids borrowed or generated
images at any stage of design development, including internally, and the
Photography Direction's dependency notes make provenance a publication gate. Until
real photography exists, **surfaces are designed around the absence of images**
rather than around stand-ins, because a layout built to a placeholder's shape will
not survive contact with a real frame ([§32.1](#32-ratio-crop-and-delivery)).

---

## 51. Dependency notes and withheld items

**Traces to:** the dependency-note convention of all six locked documents

### 51.1 What inherits from this document

| Phase | Inherits | Must not contradict |
| --- | --- | --- |
| **Homepage Design** | Parts I–VI entire; [§29.2](#29-editorial-layouts) the four field types; [§30](#30-the-evidence-threshold) | One peak per surface; the evidence threshold; the held moment with zero persistent elements; asymmetry as the resting state |
| **Implementation** | Parts VII–XII; [§48.2](#48-what-phase-8-must-build) the value groups; [§48.3](#48-what-phase-8-must-build) the enforceable rules | No value outside the scales; no radius, shadow, gradient or blur; no cropping by container; provenance is a publication gate |
| **Picture editing** | [§30](#30-the-evidence-threshold), [§32](#32-ratio-crop-and-delivery) | One canonical crop; the layout adapts to the image; frames must be made with room in them |
| **Any future medium** | Parts I–VI, which are stated without reference to a screen | [§46.4](#46-what-is-preserved-what-is-sacrificed): the first six parts survive the medium; only VII, X and XI are rewritten |

### 51.2 What this document deliberately withheld

Recorded so the omissions read as decisions rather than gaps.

| Withheld | Belongs to |
| --- | --- |
| Any page, surface, section or arrangement | Homepage Design and placement |
| Any markup, class, token syntax, framework or file | Implementation |
| Image formats, compression codecs, delivery mechanics | Implementation; they change every few years |
| Which photographs exist and what each may prove | Photography Direction §5 and the library |
| Whether a given element moves at all | Motion Direction §33 |
| The words of any statement, caption or label | Brand Bible §11, §12 |
| Print specification: stock, ink, finish, trim | A print annex, derived from Parts I–VI |

### 51.3 Open items

Carried forward, and new. The first three are blocking for release rather than for
approval of this document.

**Carried from the locked documents, still unresolved:**

1. Access to a working shift. Every E1 and E2 image depends on it, and
   [§30.4](#30-the-evidence-threshold) makes E1 and E2 the only ranks that can open
   a chapter or carry a surface.
2. Confirmation of the company name.
3. Confirmation or removal of every item in Brand Bible §19.4.
4. Whether saddles are in scope.
5. Whether any real, attributable, permissioned buyer quote exists — without one,
   [§12.4](#12-figures-captions-eyebrows-and-pull-quotes) pull quotes attributed to
   buyers are unavailable.

**Introduced by this document:**

6. **Typeface licensing.** [§8.3](#8-the-two-voices-and-the-typefaces-that-perform-them)
   is Calibrated: the two faces must be confirmed as licensable in perpetuity for
   web and print, and confirmed to carry true tabular figures in the cuts purchased.
   Until then the roles are fixed and the faces are not.
7. **The evidence threshold's second derivation.**
   [§30.2](#30-the-evidence-threshold) must be re-derived once against real frames
   from the first shoot, using the four stated steps, and then becomes Fixed.
8. **Functional-hue verification.** [§15.2](#15-the-palette) must be checked once on
   the final rendering, against Paper, against Ink, and adjacent to a real
   photograph.
9. **Agreement that there is no dark mode** ([§19](#19-dark-mode)) and no accent
   colour ([§14.3](#14-why-our-surfaces-are-almost-colourless)). Both will be
   requested later; both are constitutional rather than stylistic, and the remedy
   for a challenge is an amendment, not a toggle.
10. **Agreement that the collisions in [§50](#50-known-collisions-with-the-current-build)
    are resolved in favour of this document**, including the replacement of both
    typefaces.

---

## 52. Approval checklist

To be completed by the approver before implementation begins.

**The derivations**

- [ ] Every number in this document is traceable to a locked-document constraint,
      and the approver has spot-checked at least five
- [ ] The steepness rule ([§2.2](#2-hierarchy-expressed-as-a-number)) is accepted as
      the single mechanism behind type, space, motion and contrast
- [ ] The evidence threshold ([§30.2](#30-the-evidence-threshold)) and its method of
      derivation are accepted, and the Calibrated status is understood
- [ ] The 5 : 3 field split is accepted as arithmetic from the threshold rather than
      as a proportion chosen for its appearance

**The decisions that will be challenged later**

- [ ] Body text is set in the sans, because the sans is the record (Brand Bible
      §16.3)
- [ ] There is no accent colour, and the palette is closed at eight values
- [ ] There is no dark mode ([§19](#19-dark-mode))
- [ ] Corner radius is zero everywhere, and there are no shadows anywhere
- [ ] Nothing is enclosed on four sides except a dialog
      ([§16.4](#16-background-surface-and-border-hierarchy))
- [ ] Cards, badges, tags, carousels and scroll-triggered reveals do not exist
      ([§41](#41-what-does-not-exist))
- [ ] Figures are never enlarged, at any importance
      ([§12.1](#12-figures-captions-eyebrows-and-pull-quotes))
- [ ] The navigation leaves with the field and never overlays a photograph
- [ ] Containers set width only; images are never cropped to fit
      ([§32.1](#32-ratio-crop-and-delivery))

**Governance**

- [ ] The three number classes — Fixed, Bounded, Calibrated — are accepted as
      binding
- [ ] The exception procedure ([§49.2](#49-what-phase-8-may-not-decide)) is accepted,
      including that an amendment applies retrospectively and everywhere
- [ ] The collisions in [§50](#50-known-collisions-with-the-current-build) are
      accepted, and the placeholder-imagery collision is accepted as blocking
- [ ] The open items in [§51.3](#51-dependency-notes-and-withheld-items) are
      acknowledged as client actions
- [ ] Every rule in this document has been asked to survive L13: if a rule would
      never resolve a real dispute, it is removed before approval

---

## 53. Phase completion checklist and self-audit

### 53.1 Scope compliance

| Required by the brief | Delivered | Where |
| --- | --- | --- |
| Visual principles: hierarchy, rhythm, scale, proportion, whitespace, asymmetry, visual weight, silence, visual confidence | ✅ | [§2](#2-hierarchy-expressed-as-a-number)–[§7](#7-visual-confidence-and-the-removal-standard) |
| Typography: display, H1, H2, H3, body, captions, eyebrow, pull quotes | ✅ | [§9.2](#9-the-type-scale) ranks D, T1, T2, T3, B, R, C; [§12](#12-figures-captions-eyebrows-and-pull-quotes) |
| When serif appears, when sans appears | ✅ | [§8.4](#8-the-two-voices-and-the-typefaces-that-perform-them) |
| Maximum line lengths, paragraph spacing, reading rhythm | ✅ | [§10](#10-measure-leading-and-the-paragraph) |
| Editorial composition | ✅ | [§29](#29-editorial-layouts) |
| How emphasis works; what must never happen | ✅ | [§11](#11-how-emphasis-works), [§13](#13-what-typography-must-never-do) |
| Colour: primary, secondary, accent, success, warning, backgrounds, surfaces, borders, text, overlays, dark mode, percentages | ✅ | [§14](#14-why-our-surfaces-are-almost-colourless)–[§20](#20-the-colour-budget). The accent is answered by removal, with the derivation |
| Spacing: vertical, horizontal, section, chapter, content, image, grid, hierarchy, responsive; why space creates trust | ✅ | [§21](#21-the-spacing-scale)–[§25](#25-responsive-space); [§21.1](#21-the-spacing-scale) |
| Grid: desktop, laptop, tablet, mobile, containers, reading column, photography column, editorial layouts, alignment, symmetry | ✅ | [§26](#26-the-columns-the-content-asks-for)–[§29](#29-editorial-layouts) |
| Photography: relation to text, dominance, crops, bleed, portrait vs landscape, pairings, what is never cropped, evidence over decoration | ✅ | [§30](#30-the-evidence-threshold)–[§33](#33-text-and-image) |
| Components: buttons, links, cards, navigation, footer, forms, tables, lists, badges, tags, accordions, dialogs, search, pagination, carousels — each with why, when, when it disappears | ✅ | [§34](#34-the-law-of-components)–[§41](#41-what-does-not-exist). Cards, badges, tags and carousels are answered by removal, with derivations |
| Iconography | ✅ | [§43](#43-icons) |
| Illustration | ✅ | [§44](#44-illustration-drawing-and-map) |
| Responsive philosophy as behaviour | ✅ | [§45](#45-responsive-behaviour)–[§46](#46-what-is-preserved-what-is-sacrificed) |
| Accessibility as respect | ✅ | [§47](#47-accessibility-as-respect) |
| Implementation handoff | ✅ | [§48](#48-what-phase-8-must-build)–[§51](#51-dependency-notes-and-withheld-items) |
| Appendices A, B, C | ✅ | [A](#appendix-a--visual-decision-trees), [B](#appendix-b--common-design-mistakes), [C](#appendix-c--implementation-checklist) |

### 53.2 Self-audit against the brief's eight conditions

| Condition | Result | Evidence |
| --- | --- | --- |
| **No contradiction with the six locked documents** | Pass | Every chapter that states a rule carries a Traces to line naming its parents. Three points of apparent tension were checked and resolved in favour of the locked document: body in the sans rather than the serif (Brand Bible §16.3 over editorial instinct); functional hue permitted while decorative colour is not ([§15.2](#15-the-palette) reconciles it with §14.3); equal treatment permitted inside a record set while forbidden between elements ([§28.4](#28-alignment-symmetry-and-asymmetry) condition 2) |
| **No duplicated philosophy** | Pass | Locked reasoning is cited, never restated. Where a sentence from a locked document appears, it is quoted and attributed because it is the object being converted into a number |
| **No implementation** | Pass | No markup, class, framework, file or syntax. [§48](#48-what-phase-8-must-build) names value *groups*, not storage |
| **Every number justified** | Pass | Each number states its derivation in the same paragraph, and carries one of the three classes in [§1.3](#1-what-this-system-is-permitted-to-decide) |
| **Every chapter has traceability** | Pass | Chapters 1–51 carry Traces to lines. Chapters 52 and 53 are the approval and completion checklists, which carry none in any of the six locked documents either |
| **Internal anchors resolve** | Pass | Every cross-reference points to a chapter-level anchor, and all were checked mechanically against the document's headings. Five broken references were found and corrected before release |
| **Medium independence preserved where appropriate** | Pass | Parts I–VI are stated without reference to a screen; Parts VII, X and XI are screen-specific and are marked as such at [§46.4](#46-what-is-preserved-what-is-sacrificed) |
| **Sufficient for Phase 8** | Pass, with three Calibrated values | [§51.3](#51-dependency-notes-and-withheld-items) items 6, 7 and 8 are the only values not final, and none blocks the start of implementation |

### 53.3 The one thing this document cannot do

It cannot supply the photographs. Every rule in Part VI is a rule about how evidence
is presented, and the library that produces the evidence does not yet exist. Until
access to a working shift is granted, this system can be built and cannot be
finished — and building it around stand-ins would violate the one rule the
Photography Direction marks as having no acceptable exception.

---
---

# APPENDICES

---

## Appendix A — Visual decision trees

**Traces to:** Brand Bible §23 decision framework · Creative Direction Book §24
element decision trees · Motion Direction §33 · Visual Language Atlas §35 the ten
tests

Each tree terminates YES or NO. Where a tree and a designer disagree, the tree is
right; where a tree and a locked document disagree, the document is right and the
tree is a defect to be reported.

---

### A.1 Should this be larger?

```
Is it the most important thing in this field?
├─ NO  → NO. Making it larger creates a second peak (L3).
└─ YES → Is it already the heaviest thing in the field (§5.1)?
         ├─ YES → Have you tried giving it more space instead (L7)?
         │        ├─ NO  → NO. Space first, always.
         │        └─ YES → Would enlarging it break the 1/12 ceiling
         │                 against the photograph beside it (§3.1)?
         │                 ├─ YES → NO. Enlarge the photograph, or accept the size.
         │                 └─ NO  → YES.
         └─ NO  → Reduce or remove the competitor first, then re-ask.
```

---

### A.2 Should this be centred?

```
Is it a single final statement standing alone in the field?
├─ YES → YES.
└─ NO  → Is the content a genuine set of equals — a record, a table,
         a specification?
         ├─ YES → YES, and equal treatment is a factual claim here (§28.4).
         └─ NO  → Is a formal register being deliberately invoked — a
                  certificate, a reproduced document?
                  ├─ YES → YES, and record the argument.
                  └─ NO  → NO. Asymmetry is the resting state (L5).
```

---

### A.3 Should this image bleed?

```
Is it at or above the evidence threshold (§30.2)?
├─ NO  → It does not appear at all. Fix the size first (§30.3).
└─ YES → What rank is it (Photography Direction §5)?
         ├─ E1 → YES. Full bleed, alone, carrying the chapter.
         ├─ E2 → Is it opening a chapter?
         │       ├─ YES → YES, full bleed.
         │       └─ NO  → One-edge bleed in the paired field.
         ├─ E3 → NO. A set shares a field and stays inside it.
         ├─ E4 → NO. It is a record; records live inside the margin.
         ├─ E5 → YES, where it carries place or silence.
         └─ E6 → NO. It is a specification, bounded on four sides.
```

---

### A.4 Should this animate?

```
Would its absence make something harder to reach (Motion Direction M13)?
├─ NO  → NO. It was never doing the only job motion has.
└─ YES → Does the movement have a visible cause the visitor produced (M6)?
         ├─ NO  → NO. Uncaused motion implies an unseen agent.
         └─ YES → Is anything being examined in this field right now
                  — a photograph, a record, a specification?
                  ├─ YES → NO. Nothing moves beside evidence (M1, §5.3).
                  └─ NO  → Is another movement already running in this field?
                           ├─ YES → NO. One movement per field (M10).
                           └─ NO  → YES. Band by size (§42.3), the one curve
                                    (§42.4), and it completes once begun (M14).
```

---

### A.5 Should this use colour?

```
Is it stating a state — failure, confirmation, or caution?
├─ NO  → NO. There is no decorative colour in this system (§14.3).
└─ YES → Is the state also carried by a word?
         ├─ NO  → Add the word first. Hue is never the only carrier (§15.2).
         └─ YES → Is another functional hue already present in this viewport?
                  ├─ YES → NO. One state at a time.
                  └─ NO  → YES. Oxide, Enamel or Brass, at rank R, as text.
```

---

### A.6 Does this element exist at all?

```
Which of the six types is it (§34.2)?
├─ None of them → NO.
└─ One of them  → Which locked-document law requires it?
                  ├─ None → NO. The default answer is no (CDB §23).
                  └─ One  → Remove it. Is anything lost (L13)?
                            ├─ NO  → It stays removed.
                            └─ YES → What is removed to make room (§25.3)?
                                     ├─ Nothing → NO. Space is never reclaimed.
                                     └─ Named   → When does it disappear (§34.1)?
                                                  ├─ Never → NO. It is furniture.
                                                  └─ Stated → YES.
```

---

### A.7 May text sit on this photograph?

```
Was negative space allocated in the frame at capture (Photography §16.3)?
├─ NO  → NO. Move the text off the image (§33.1).
└─ YES → Will the text sit in that space, clear of the subject?
         ├─ NO  → NO.
         └─ YES → Is contrast met with an overlay of 25% or less (§18.2)?
                  ├─ NO  → NO. The text moves; the image is not darkened further.
                  └─ YES → Is it a single statement at D or T1, with no body,
                           no caption and no action?
                           ├─ NO  → NO.
                           └─ YES → YES.
```

---

### A.8 Is this surface finished?

```
Run the ten tests (Atlas §35), cheapest first.
├─ Any test fails → Return the work with the failed test named. Do not negotiate
│                   the test (Atlas §35.13).
└─ All pass → Does the surface carry exactly one peak (L4)?
              ├─ NO  → Not finished.
              └─ YES → Does it carry a held moment with zero persistent
                       elements (§23.4)?
                       ├─ NO  → Not finished.
                       └─ YES → Cover it, uncover for one second: is the entry
                                point unambiguous (§2.5)?
                                ├─ NO  → Not finished.
                                └─ YES → Remove the words: does the argument
                                         survive (§30.6)?
                                         ├─ NO  → Not finished.
                                         └─ YES → YES.
```

---

## Appendix B — Common design mistakes

**Traces to:** Creative Direction Book §25 everything that would damage the brand ·
Visual Language Atlas §34 why work fails · Photography Direction §28

Each entry names what it looks like, which law it breaks, and the fix. These are the
failures this system was shaped to prevent, and a reviewer should be able to find any
observed defect in this table.

| # | The mistake | What it looks like | Breaks | The fix |
| --- | --- | --- | --- | --- |
| **B1** | **Everything the same size** | Three headings at 24px, a body at 16px, and no way to tell what matters | L8; Atlas §14.2 — uniformity mistaken for discipline | Apply [§2.2](#2-hierarchy-expressed-as-a-number). Decide the four levels and separate them steeply |
| **B2** | **Cards everywhere** | A grid of three or four bordered boxes, each with a small image and a heading | Six laws at once ([§36.1](#36-containers-and-why-there-are-almost-no-cards)) | The record row ([§36.2](#36-containers-and-why-there-are-almost-no-cards)), or fewer things, larger |
| **B3** | **Too many colours** | A brand accent, two greys, three state colours and a tinted section background | [§20.1](#20-the-colour-budget) | Run the counting test ([§20.2](#20-the-colour-budget)). Four values, plus a state if one is present |
| **B4** | **Over-designed typography** | Letter-spaced capitals, a display face at body size, a gradient headline, three weights in one heading | [§13](#13-what-typography-must-never-do); Atlas §22.5 | If a reader could describe the typography afterwards, remove what they would describe |
| **B5** | **Luxury clichés** | Gold accents, thin uppercase serif, a crest, a "heritage since" mark, dark-and-gold sections | Brand Bible §11.2, D3; the Factory Test | Remove. Restraint is the only luxury signal available that a competitor cannot buy |
| **B6** | **Too much glass** | Frosted navigation, translucent panels, blurred overlays | [§14.5](#14-why-our-surfaces-are-almost-colourless); the Permanence Test | Remove. It is the clearest signature of this decade in the whole interface |
| **B7** | **Too much motion** | Elements fading up on scroll, staggered reveals, hover lifts, a parallax hero | Motion Direction M3, M6, M13; [§42.5](#42-component-behaviour-in-time) | Content is present when the surface is. Motion only where absence would be noticed |
| **B8** | **Tiny photography** | A 300px-wide image of the floor beside three paragraphs | [§30.2](#30-the-evidence-threshold), [§30.3](#30-the-evidence-threshold); CDB §6.1 | Enlarge past the threshold or remove. A thumbnail asserts and withholds simultaneously |
| **B9** | **Rounded everything** | 12px radii on buttons, cards, images, inputs and dialogs | [§16.5](#16-background-surface-and-border-hierarchy) | Zero. Our materials meet at cut edges |
| **B10** | **Hero too busy** | A full-bleed image with a headline, a subheading, two buttons, a scroll cue and a sticky bar over it | L1, L3; [§33.1](#33-text-and-image); [§35.4](#35-action-buttons-and-links) | One photograph. At most one statement, in allocated space ([§33.2](#33-text-and-image)) |
| **B11** | **Catalogue feeling** | Products in a grid, filters, prices, "view all", equal treatment throughout | The Museum Test; Brand Bible §16.5 — the process is the product | Show the process. A catalogue is a surface a buyer reaches after they believe us, never before |
| **B12** | **Uniform section spacing** | The same 80px between every section, all the way down | [§6.2](#6-rhythm-and-the-breathing-rule) — a metronome | Vary by relationship. Never the same value more than three times consecutively |
| **B13** | **Padding impersonating silence** | A large empty area with a sticky header, a chat bubble and a cookie bar in it | CDB §22.4; [§23.4](#23-sections-chapters-and-the-held-moment) | Zero persistent elements, or it is not a held moment |
| **B14** | **The enlarged statistic** | "4,000+" set at 72px in the serif | Brand Bible §16.3 — rhetoric rather than record | Set it at 18px in the sans, tabular, beside what it is a count of |
| **B15** | **Icons in place of evidence** | Three glyphs above three capability lines | CDB §6.2; the Factory Test | A photograph of the mechanism, or nothing |
| **B16** | **Two photographs side by side, equal** | A before-and-after, or two views of the same subject at equal size | CDB §11.3 — the eye compares instead of examining | Make them unequal at 2:1, or show one |
| **B17** | **The announced chapter** | A horizontal rule, a tinted band, or a numbered label opening every section | CDB §22.1 | Open with a change the reader feels: a photograph, an inversion, a statement, silence ([§23.5](#23-sections-chapters-and-the-held-moment)) |
| **B18** | **Centred everything** | Centred headings, centred body, centred buttons, on a centred column | L5; [§10.4](#10-measure-leading-and-the-paragraph) | Flush left, on the grid, asymmetric field |
| **B19** | **Grey body text** | Body at a mid grey "for softness" | [§17.3](#17-text-hierarchy-and-contrast) | Primary ink. Secondary is for annotation only |
| **B20** | **The disguised wait** | A skeleton screen or a spinner where a system is slow | Motion Direction M11 — a wait disguised is a false statement | Say what is happening, in words |

---

## Appendix C — Implementation checklist

**Traces to:** [§48](#48-what-phase-8-must-build) · Creative Direction Book §26 the
universal review · Photography Direction §29 · Visual Language Atlas §35

Pass/fail, per surface, before release. A surface that fails any line is not
released; the failed line is named in the return
([§49.2](#49-what-phase-8-may-not-decide)).

**Structure**

- [ ] Exactly one peak on the surface, and one D-rank statement at most
- [ ] Exactly one held moment, with **zero** persistent elements in view during it
- [ ] Consecutive chapters open in different manners
      ([§23.5](#23-sections-chapters-and-the-held-moment))
- [ ] No chapter ends on its loudest element
- [ ] At least three distinct space ranks used between top and bottom
- [ ] No space value used to separate more than three consecutive passages
- [ ] The longest passage is followed by the largest break
- [ ] The surface makes sense arrived at directly (L15)

**Type**

- [ ] Two families only; no third face anywhere, including in an image
- [ ] Serif appears only in statements, chapter openings and pull quotes
- [ ] Every figure is sans, tabular, and no larger than 18px
- [ ] Every measure between 45 and 75 characters
- [ ] No size, leading or tracking outside [§9.2](#9-the-type-scale)
- [ ] All text flush left; nothing justified; nothing centred without a recorded
      argument
- [ ] At most one eyebrow, at most one pull quote

**Colour and marks**

- [ ] Screenshot minus photographs contains four colours or fewer, plus at most one
      state
- [ ] No radius anywhere; no shadow anywhere; no gradient, blur or texture anywhere
- [ ] Nothing enclosed on four sides except a dialog
- [ ] Hairlines are 1px and used only to separate records
- [ ] Contrast: primary ≥12:1, secondary ≥7:1, marks ≥3:1
- [ ] No hue used decoratively; every state also carried by a word

**Photography**

- [ ] Every image's shorter rendered dimension ≥480px, at every breakpoint
- [ ] No image cropped by its container; no cover-fit; no fixed-height image area
- [ ] Every image is the canonical crop, at 2× delivery, never upscaled
- [ ] Every image carries a caption, alternative text, and retained provenance
- [ ] **No placeholder, borrowed or generated image anywhere in the build**
- [ ] No two images of similar weight in one viewport, outside an E3 set
- [ ] Where a photograph shares a field with text, it holds ≥60% of the width
- [ ] No text over a photograph except under [§33.2](#33-text-and-image)

**Components**

- [ ] One action per surface, after the argument, never beside a photograph
- [ ] No card, badge, tag, carousel, tab, breadcrumb, tooltip or lightbox
- [ ] Navigation leaves with the field; nothing sticky, floating or persistent
- [ ] Forms: labels above, no placeholders, no disabled states, waits stated in words
- [ ] Tables: hairlines between rows only; no vertical rules, no striping
- [ ] At most four icons on the whole site, from the closed list, at text cap height

**Motion**

- [ ] Every movement falls in one of four bands, and uses the one curve
- [ ] Nothing overshoots, springs, bounces or loops
- [ ] Nothing fades or moves on scroll
- [ ] One movement per field; no movement beside anything being examined
- [ ] Reduced motion removes every movement, substituting nothing
- [ ] With motion disabled, nothing is harder to understand

**Accessibility**

- [ ] Keyboard reaches everything, in reading order, with a visible 2px focus ring
- [ ] Every control has a name in words; no meaning behind hover alone
- [ ] Targets ≥44px, separated by ≥24px
- [ ] Heading ranks in order without skipping; one first-rank heading
- [ ] With images off, styles off, and motion off, the argument survives
      ([§47.8](#47-accessibility-as-respect))

**Governance**

- [ ] No value in the build that is not in this document
- [ ] No fact hard-coded; figures derive from the record at publication
      (Brand Bible §19)
- [ ] The ten tests run in order (Atlas §35.11), and every one passes
- [ ] Any exception taken is recorded, and has amended this document rather than
      bypassed it

---

*End of document.*
