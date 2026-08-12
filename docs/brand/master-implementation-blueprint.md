# Elite Export — Master Implementation Blueprint

**Phase 8**

| | |
| --- | --- |
| **Document** | Master Implementation Blueprint |
| **Version** | 1.0 |
| **Status** | Draft |
| **Phase** | Phase 8 |
| **Authority above this document** | Brand Bible v1.1 · Creative Direction Book v1.1 · Documentary Storyboard v1.0 · Photography Direction v1.0 · Visual Language Atlas v1.1 · Motion Direction v1.0 · Visual Design System v1.0 · UX Blueprint v1.1 |
| **Owner** | Creative Director, jointly with the technical lead |
| **Audience** | The team or agency that builds, tests, launches and maintains this site |
| **Supersedes** | Nothing |

### Change log

| Version | Change |
| --- | --- |
| 1.0 | Initial Master Implementation Blueprint. Thirty chapters, fifteen parts. Defines how the eight approved documents are converted into a built thing: the hierarchy and its ownership, the construction order, the component and content inventories, the photography pipeline, the dependency register, the strategies for performance, accessibility and search, the review and launch régimes, the definition of done, the rules for future expansion, and thirty implementation commandments. |

---

## Purpose

Eight documents precede this one. Between them they establish who the company is,
what it looks like, how it tells its story, how it photographs it, why that works,
how it moves, the measured rules that govern every surface, and the experience
architecture that decides what surfaces exist and how a visitor passes through them.

**Nothing remains to be decided.** That is the condition this document was written
into, and it is the whole reason it exists: a body of work this complete fails only
one way, which is at the moment somebody has to build it and finds a gap.

This blueprint is the construction document. It is what an architecture practice
issues after the design is signed off and before anybody pours concrete: not a design,
not the engineering, but the instruction set that binds the two — order of works,
schedule of parts, schedule of materials, dependencies, inspection régime, and the
conditions under which the building is accepted.

### What this document contains

Sequence, responsibility, inventory, dependency and acceptance. It states what gets
built, in what order, by what authority, what it may not do, what blocks it, how it
is reviewed, and when it is finished.

### What this document does not contain

No code, no framework, no markup, no styling, no tokens, no layouts, no typographic
or spatial values, no colours, no motion timings, no page designs, and no philosophy
that is not already locked. Every one of those exists in a document above this one,
and **a value repeated here would immediately become a second source of truth** —
which Brand Bible §3.3 forbids more strictly than it forbids most things.

Where this document needs a number, it names the document and section that holds it.
That is not deference for its own sake: it is the mechanism by which the system stays
changeable, because a value that exists once can be changed once.

### The rule of this document

Where this blueprint conflicts with any of the eight above it, **the earlier document
wins and this one is wrong**, and the remedy is a new version of this document — never
an exception. Authority runs in the order the documents were written.

Every chapter carries four things: **Traces to**, **Purpose**, **Rules**, and
**Dependencies**.

### The test this document must pass

> **An agency handed the eight approved documents and this blueprint, and nothing
> else — no meetings, no clarifications, no access to the people who wrote them —
> should build the intended site.**

If a builder must ask a question this document could have answered, the document is
incomplete and is amended. If they must ask a question only a locked document can
answer, this document should have named which one.

---

## Table of contents

**Part I — Implementation philosophy**

1. [What implementation is for](#1-what-implementation-is-for)
2. [Developers interpret nothing](#2-developers-interpret-nothing)
3. [Traceability](#3-traceability)
4. [Performance, simplicity and restraint as engineering](#4-performance-simplicity-and-restraint-as-engineering)

**Part II — Project architecture**

5. [The hierarchy](#5-the-hierarchy)
6. [Ownership at every level](#6-ownership-at-every-level)
7. [One source of truth](#7-one-source-of-truth)

**Part III — Implementation order**

8. [The order of works](#8-the-order-of-works)
9. [Stage gates and stop conditions](#9-stage-gates-and-stop-conditions)

**Part IV — Component inventory**

10. [How a component enters the inventory](#10-how-a-component-enters-the-inventory)
11. [Structural components](#11-structural-components)
12. [Evidence and record components](#12-evidence-and-record-components)
13. [Action, disclosure and system components](#13-action-disclosure-and-system-components)
14. [Components that must never be built](#14-components-that-must-never-be-built)

**Part V — Content architecture**

15. [The content objects](#15-the-content-objects)
16. [Publication gates](#16-publication-gates)
17. [The editing boundary](#17-the-editing-boundary)

**Part VI — Photography pipeline**

18. [The image categories](#18-the-image-categories)
19. [What blocks, what waits, and the order of capture](#19-what-blocks-what-waits-and-the-order-of-capture)

**Part VII — Implementation dependencies**

20. [The dependency register](#20-the-dependency-register)

**Part VIII — Performance strategy**

21. [Performance is trust](#21-performance-is-trust)

**Part IX — Accessibility strategy**

22. [Accessibility is evidence, respect and permanence](#22-accessibility-is-evidence-respect-and-permanence)

**Part X — Search philosophy**

23. [How search should understand this company](#23-how-search-should-understand-this-company)

**Part XI — Quality assurance philosophy**

24. [How review happens](#24-how-review-happens)
25. [The review questions](#25-the-review-questions)

**Part XII — Launch philosophy**

26. [The launch gates](#26-the-launch-gates)

**Part XIII — Acceptance criteria**

27. [When implementation is finished](#27-when-implementation-is-finished)

**Part XIV — Future expansion**

28. [How anything is added later](#28-how-anything-is-added-later)

**Part XV — Implementation commandments**

29. [The thirty commandments](#29-the-thirty-commandments)

**Self audit**

30. [Self audit](#30-self-audit)

---
---

# PART I — IMPLEMENTATION PHILOSOPHY

---

## 1. What implementation is for

**Traces to:** Brand Bible §22 the one sentence, §3.5 Permanence · Visual Language
Atlas §24 why the best work is never noticed, §25.4 rules that survive their author ·
Visual Design System §48.1 the handoff principle · UX Blueprint §1

### Purpose

To state what the build is answerable for, so that every later decision in this
document has something to be measured against.

### Rules

**R1.1 — Implementation exists to preserve intent.** Not to express it, not to improve
it, not to interpret it. Eight documents decided what this company looks like, sounds
like, proves and refuses; the build's job is to make that arrive at a stranger's
screen without loss.

**R1.2 — The build is judged by what survives, not by what is achieved.** A feature
delivered that dilutes Recognition is a net loss even when it works perfectly. Brand
Bible §3.6: contradiction outranks contribution, always.

**R1.3 — Engineering serves the brand, and the brand serves the buyer.** The order is
not negotiable and it resolves most disputes in advance: where an engineering
convenience and a brand rule conflict, the rule wins; where a brand rule and a buyer's
ability to verify something conflict, the verification wins (UX Blueprint R4.3).

**R1.4 — The best implementation is invisible.** Atlas §24: the best work is never
noticed. A visitor should finish a visit thinking about a factory in Kanpur, not about
a website. Any build decision a visitor could describe afterwards has spent attention
that belonged to the company.

**R1.5 — The build is for a ten-year horizon** (Brand Bible P5). This has one
practical consequence that should govern every technical choice made in Phase 8:
**prefer the boring, durable option over the clever one.** Brand Bible §3.5 already
states it as a design rule — *developers recognise Permanence as boring, durable
choices over clever ones* — and it is repeated here because it is the single most
useful sentence this document can give a technical lead.

**R1.6 — Nothing is built to be replaced.** Where a decision is genuinely temporary,
it is recorded as temporary with the condition that ends it (UX Blueprint R51A.7). A
temporary thing with no stated end is a permanent thing that nobody defended.

### Dependencies

- The whole of this document depends on the eight approved documents remaining
  unamended during the build. Where one is amended, the build stops long enough to
  find what the amendment invalidates ([§28](#28-how-anything-is-added-later)).

---

## 2. Developers interpret nothing

**Traces to:** Visual Design System §49 what Phase 8 may not decide · UX Blueprint
§52 · Visual Language Atlas §35.13 on failure · Brand Bible §23 decision framework

### Purpose

To remove interpretation from the build, and to state what a builder does instead when
they encounter a decision that appears to be theirs.

### Rules

**R2.1 — A question that arises during the build is answered from a document, or it
is escalated. It is never resolved by taste.** Not because builders lack taste, but
because taste distributed across a team produces eight slightly different companies,
and the whole apparatus above this document exists to produce one.

**R2.2 — The escalation path, in order.** A builder facing an undecided question works
down this list and stops at the first answer:

| Step | Where to look | Kind of question |
| --- | --- | --- |
| 1 | Visual Design System | Any number, mark, behaviour or component property |
| 2 | UX Blueprint | Any question about what a surface is for, what happens next, or what may be asked |
| 3 | This blueprint | Order, ownership, inventory, dependency, acceptance |
| 4 | Motion Direction, Photography Direction, Documentary Storyboard | Whether a thing may move, may be photographed, or may be told |
| 5 | Creative Direction Book, Brand Bible | Whether it should exist at all |
| 6 | **Escalate to the document owner** | Everything else |

**R2.3 — Step 6 produces an amendment, not a decision.** Visual Language Atlas §35.13:
a brand built on restraint is destroyed by exceptions, not by mistakes. An answer
given in a message thread is an exception; an answer written into the governing
document is a rule. **Only the second is allowed to change the build.**

**R2.4 — Silence is not permission.** Where no document answers a question and no
amendment has been made, the default answer is the Creative Direction Book's: **no**.
The element is not built, and the question is escalated.

**R2.5 — A builder is required to refuse work that contradicts a locked document**,
and the refusal is a professional obligation rather than an act of resistance. The
refusal names the document and section; the requester amends or withdraws.

**R2.6 — Interpretation is permitted in exactly one place: the technical means.** How
a rule is satisfied — the mechanism, the technique, the tooling — belongs entirely to
the builder, provided the rule is satisfied and the choice survives R1.5. **What is
built is decided; how it is built is not.**

### Dependencies

- R2.2 assumes every builder has access to all eight documents. Partial distribution
  of the document set is a project failure, not a builder's error
  ([§20](#20-the-dependency-register)).

---

## 3. Traceability

**Traces to:** Brand Bible §19 the Facts Register, §3.2 Evidence · Visual Design
System §1.3 the derivation obligation · UX Blueprint X12 · Visual Language Atlas §35.7
the Evidence Test

### Purpose

To require that every built thing can be traced back to the rule that produced it —
and to state what happens to the things that cannot.

### Rules

**R3.1 — Every element in the built site traces to a rule.** Not to a wireframe, not
to a reference site, not to a previous project. The chain is: *element → component
responsibility ([Part IV](#10-how-a-component-enters-the-inventory)) → surface
obligation (UX Blueprint Part III) → buyer question (Brand Bible §21) → the one
sentence (Brand Bible §22).*

**R3.2 — The traceability test is applied to anything nobody can explain.** Point at
any element and ask which rule required it. If no answer arrives within a sentence,
the element is decoration and is removed (Creative Direction Book L13).

**R3.3 — Every published fact traces to the company record** (Brand Bible §19.2). No
figure is typed into a template, a component, a translation file or a comment. This is
the single most-broken rule in commercial builds and the one this brand can least
afford to break.

**R3.4 — Traceability is recorded where the work is, not in a separate register.**
A note that names the governing section, kept beside the thing it governs, survives
the project; a spreadsheet listing decisions does not.

**R3.5 — An untraceable element found after launch is removed, not documented.** The
temptation at that point is to write the missing justification. Atlas §35.7: complete
the sentence *this proves ___* with something specific, or it must not exist.

### Dependencies

- R3.3 depends on the Facts Register being maintained by the client as a live record
  ([§20](#20-the-dependency-register)).

---

## 4. Performance, simplicity and restraint as engineering

**Traces to:** Brand Bible §3.4 Restraint, §3.5 Permanence · Visual Language Atlas §6
why restraint feels expensive, §23 · Visual Design System §7 visual confidence ·
Motion Direction M3 attention cannot be declined

### Purpose

To state the engineering dispositions that follow from the brand, so that technical
choices are made with the same instincts as design choices.

### Rules

**R4.1 — Simplicity is the engineering form of restraint.** Brand Bible §3.4: fewer
elements, larger; the confidence not to fill a space. The same instinct applied to a
codebase produces fewer moving parts, fewer dependencies, fewer abstractions and fewer
places for the brand to leak away. **A build with less in it is a build that can be
kept correct for ten years by somebody who did not write it.**

**R4.2 — Performance is part of brand quality, not a phase at the end.** A site that
hesitates is a company that hesitates. The buyer never separates the two, and the
inference is made before any content is read — which is precisely the moment Brand
Bible §8.1 stage 1 warns about.

**R4.3 — Nothing is added because it is available.** A capability that exists in a
tool is not a reason to use it, exactly as an image that exists is not a reason to
place it (UX Blueprint R35.3).

**R4.4 — The cheapest thing to maintain is the thing that was never built.** Every
component, dependency, integration and abstraction has a ten-year cost. Where two
approaches satisfy the rules, the one with fewer parts is correct — and where the
simpler approach is slightly worse on some metric nobody in the brand's audience
measures, it is still correct.

**R4.5 — Restraint applies to tooling as forcefully as to design.** A build that
requires a large apparatus to produce a quiet site has misunderstood the brief. The
test is Atlas §35.10 applied to engineering: **could a knowledgeable person name the
year this was built from the stack?** The more emphatically yes, the more the choice
should be examined.

**R4.6 — Elegance is measured by what a successor can change safely**, not by what the
original team found expressive. Atlas §25.4: rules that survive their author.

### Dependencies

- [§21](#21-performance-is-trust) states the performance philosophy in full; this
  chapter states only that it is a brand matter rather than a technical one.

---
---

# PART II — PROJECT ARCHITECTURE

---

## 5. The hierarchy

**Traces to:** UX Blueprint Part III the surfaces, §34 the six classes · Visual Design
System §34 the law of components, §29.2 the four field types · Documentary Storyboard
§7 the canonical chapter set · Brand Bible §3.3 Repeatability

### Purpose

To define the levels the site is composed of, what each level is responsible for, and
what may not cross between them.

### Rules

**R5.1 — The hierarchy has six levels and no seventh:**

```
        WEBSITE          one company, one story, one action
            ↓
        SURFACE          a buyer question, answered            (UX Blueprint Part III)
            ↓
        CHAPTER          a passage of the canonical story      (Documentary Storyboard §7)
            ↓
        COMPONENT        a reusable responsibility             (Part IV of this document)
            ↓
        ELEMENT          one of six things                     (Visual Design System §34.2)
            ↓
        CONTENT          a fact, a photograph, a sentence      (UX Blueprint Part X)
```

**R5.2 — "Section" is deliberately not a level.** The word invites arbitrary
division — a section is whatever somebody decided to put a heading on — and it is how
a documentary structure becomes a stack of blocks. **The level between a surface and a
component is a chapter**, and chapters are enumerated, ordered and finite
(Documentary Storyboard §7).

Where a surface needs a division that is not a chapter, it is a **passage**: a
subdivision *within* one chapter, which may never be promoted to a chapter and may
never be reordered independently of it.

**R5.3 — Each level may only be composed of the level directly below it.** A surface
is chapters; a chapter is components; a component is elements; an element is content.
A surface that reaches past chapters to place an element directly has produced an
arrangement nobody can govern, and it is where every unmaintainable build begins.

**R5.4 — Only six element types exist** (Visual Design System §34.2): photograph,
statement, passage, record, action, mark. Everything at the element level is one of
those six, and the inventory in [Part IV](#10-how-a-component-enters-the-inventory) is
a schedule of arrangements of them.

**R5.5 — Content never carries presentation, and presentation never carries content**
(UX Blueprint R42.7). A photograph's meaning lives in the content layer with its
provenance; its size lives in the design system; its placement lives in the chapter.
Three homes, no overlap.

**R5.6 — The chapter set is fixed at ten** (Documentary Storyboard §7). An eleventh
chapter requires amending a locked document, and no build may introduce one under
another name.

### Dependencies

- The chapter-to-surface mapping is fixed at UX Blueprint §15.4 and is not restated
  here.
- The element vocabulary is fixed at Visual Design System §34.2.

---

## 6. Ownership at every level

**Traces to:** Brand Bible §23 decision framework · Visual Design System §49 · UX
Blueprint §52 · Photography Direction §22.5 composition belongs to the person who was
in the room

### Purpose

To assign every level of the hierarchy to a document and to a role, so that no
question about who decides something is ever open.

### Rules

**R6.1 — Ownership by level:**

| Level | Decided by | Governing document | May the build change it? |
| --- | --- | --- | --- |
| **Website** | The Creative Director | Brand Bible | No |
| **Surface** | The Creative Director | UX Blueprint Part III | No — a new surface requires UX Blueprint §15.5 |
| **Chapter** | The Creative Director, with the picture editor | Documentary Storyboard §7 | No |
| **Component** | This blueprint, under the Visual Design System | [Part IV](#10-how-a-component-enters-the-inventory), Visual Design System §34.3 | No — a new component requires an amendment |
| **Element** | The Visual Design System | Visual Design System §34.2 | No |
| **Content** | The content author, gated by the Facts Register | UX Blueprint Part X, Brand Bible §19 | Only within the model, and only through the gates |
| **Technical means** | **The technical lead** | — | **Yes. This is theirs** (R2.6) |

**R6.2 — The last row is as binding as the others.** How the site is built, hosted,
composed, deployed and tested is the technical lead's to decide, and no document above
this one has an opinion about it. That authority is real, and it comes with R1.5: the
choices are theirs, and they are answerable for the choices still being defensible in
ten years.

**R6.3 — Photography composition is not the build's to change.** Photography Direction
§22.5: composition belongs to the person who was in the room. A build that crops,
fits, fills or reframes an image has taken authority it was never given (Visual Design
System §32.1).

**R6.4 — Copy is not the build's to change**, including microcopy. Every word — a
label, an error, a confirmation, an action — is governed by Brand Bible §11 and §12.
A developer writing a placeholder sentence has authored brand voice, and it will
survive to launch, because nobody re-reads a string that looks finished.

**R6.5 — Where ownership is unclear, the build stops and asks.** It does not proceed
on the most likely reading. A wrong assumption compounds through the hierarchy, and by
the time it is visible it is in every surface.

### Dependencies

- R6.4 requires copy to exist before the surfaces that carry it are finished
  ([§20](#20-the-dependency-register)).

---

## 7. One source of truth

**Traces to:** Brand Bible §3.3 Repeatability — one source of truth per fact, §19.5 ·
Visual Design System §48.1 · UX Blueprint R42.4

### Purpose

To state the single structural discipline that every part of the build depends on, and
to name what it forbids.

### Rules

**R7.1 — Every fact exists in exactly one place**, and every surface that shows it
references that place. Brand Bible §3.3 states it for the company record; the Visual
Design System states it for values; the UX Blueprint states it for content. This
chapter states it for the build as a whole:

> **If a thing is expressible in two places, it will eventually disagree with itself —
> and a company whose position is "you may check us" cannot afford to disagree with
> itself in public.**

**R7.2 — What this forbids, concretely:**

| Forbidden | Because |
| --- | --- |
| A figure typed into a surface, a component, a caption or a comment | Brand Bible §19.5: figures derive from the record at publication |
| A design value held anywhere but the design system | Visual Design System §48.1 |
| The same photograph existing in two crops | Photography Direction §22.4 |
| The same fact stated on two surfaces from two sources | R7.1 |
| A rule restated in a second document rather than referenced | It creates two rules, and one of them will be amended alone |
| Content duplicated to make a surface look fuller | Creative Direction Book L10 |

**R7.3 — A reference is always preferable to a copy**, even when a copy is easier.
This is the only place in this document where the harder option is required by default,
and it is required because the cost of a copy arrives years later, in public, as an
inconsistency a buyer finds.

**R7.4 — Where a fact must appear on two surfaces, the second surface references the
first** and says where it came from. This is X12 in the build layer: a fact carries its
route to verification, and internally that route is a reference.

### Dependencies

- Depends on the Facts Register existing as a maintained record rather than a document
  snapshot ([§20](#20-the-dependency-register)).

---
---

# PART III — IMPLEMENTATION ORDER

---

## 8. The order of works

**Traces to:** UX Blueprint §51A implementation priority · Documentary Storyboard
§25.1 the compression law · Brand Bible §8.3 where each medium enters and exits ·
Photography Direction §30 the library's dependency on access

### Purpose

To state the order in which the site is constructed, and to reconcile the construction
order with the surface priority already fixed in the UX Blueprint.

### Rules

**R8.1 — The surface order is not this document's to set.** UX Blueprint §51A fixed it
and it is locked:

| Priority | Surfaces |
| --- | --- |
| 1 | Home · Manufacturing · Enquiry |
| 2 | Technology · Products · Quality |
| 3 | Export · Gallery · Journal · About |
| 4 | System and legal |

**R8.2 — What this document adds is Stage 0: the substrate.** Navigation, the footer
record, the shared components and the content engine are not surfaces, so §51A does not
order them — and they must exist before Priority 1 can be built, because Priority 1
surfaces are composed of them.

> **This is a reconciliation, not a change.** §51A orders *what the site says*; this
> chapter orders *what has to exist for it to say anything*. The surface sequence is
> untouched.

**R8.3 — The order of works:**

| Stage | Contents | Why here |
| --- | --- | --- |
| **0 — Substrate** | The design system as a single source of values · the content engine and its models · **the publication gates** · navigation · the footer record · the shared component set at [Part IV](#11-structural-components) · the state behaviours | Everything above is composed of these. Building a surface first means building its parts twice |
| **1 — The shortest complete telling** | Home · Manufacturing · Enquiry | UX Blueprint R51A.2: the minimum set that runs Brand Bible §8.3's assignment for this medium — arrival through conversation, with Recognition present |
| **2 — Confidence and Evidence** | Technology · Products · Quality | The two transitions after Recognition (UX Blueprint §13A), and the surfaces three of the four buyer profiles arrive on directly |
| **3 — Respect, corroboration, relationship** | Export · Gallery · Journal · About | The international journey, the volume evidence, and the two surfaces carrying regard rather than capability |
| **4 — Correctness** | 404 · privacy · legal identity record · search results, if search exists | Depends on decisions made in the stages above. **Built last, present at launch** (UX Blueprint R51A.6) |

**R8.4 — The publication gates are built in Stage 0, before any surface.** They are
listed in UX Blueprint §51.6 and restated as a build item at
[§16](#16-publication-gates). Building them last means every surface built before them
must be re-audited by hand, which is the same work done twice and done worse.

**R8.5 — Within a stage, the shared thing is built before the thing that uses it**, and
never the reverse. A component extracted from a finished surface carries that surface's
assumptions into every later surface.

**R8.6 — Each stage ends in something publishable** (UX Blueprint R51A.7). The build
never passes through a state where the site is live and the story is incomplete in the
middle.

**R8.7 — Evidence availability outranks the order** (UX Blueprint R51A.8). If the
library yields C7 before C3, the surfaces that C7 serves may be brought forward. The
order governs surfaces; the library governs what can be told, and the library wins.

**R8.8 — The collisions are resolved before the surfaces they affect are built**
(UX Blueprint R51A.9, Visual Design System §50). Resolving a collision after a surface
exists means building that surface twice.

### Dependencies

- Stage 0 depends on the typefaces being licensed (Visual Design System §51.3) and on
  the content models being approved (UX Blueprint Part X).
- Stage 1 depends on rank-1 photography; without it, Stage 1 can be constructed but not
  published ([§19](#19-what-blocks-what-waits-and-the-order-of-capture)).

---

## 9. Stage gates and stop conditions

**Traces to:** Visual Language Atlas §35.13 on failure · Creative Direction Book §26
the universal review · Visual Design System Appendix C · UX Blueprint §54

### Purpose

To define what must be true before a stage is considered complete, and the conditions
under which the build stops rather than continues.

### Rules

**R9.1 — A stage is complete when three things are true**, in this order:

1. **Every surface in the stage passes its own review** ([§24](#24-how-review-happens)).
2. **Nothing in the stage introduced an untraceable element** (R3.2).
3. **The stage is publishable as it stands** — not "would be, once X arrives".

**R9.2 — Stage 0 has an additional gate**, because everything inherits from it:

- Every value in the build comes from one place, and an arbitrary value is not
  expressible (Visual Design System §48.3).
- The publication gates refuse what they are supposed to refuse — **tested by
  attempting to publish something that should be refused**, not by inspection.
- Every state at UX Blueprint §47 behaves as specified, including the two that should
  never occur.
- Navigation and the footer record satisfy UX Blueprint §37 and §38.

**R9.3 — The stop conditions.** The build **halts** — it does not proceed with a
workaround — when any of these is true:

| Stop condition | Why it stops everything |
| --- | --- |
| A locked document is amended mid-build | The amendment may invalidate work already done, and finding out later is more expensive than stopping now (R1.1) |
| A publication gate is bypassed to ship something | The gates are the only mechanism preventing an unverified claim reaching a buyer (Brand Bible §19) |
| A placeholder image is used anywhere, including internally | Photography Direction §24.5 has no acceptable exception |
| An unconfirmed fact is published | Brand Bible §19.2 |
| A surface is shipped that cannot reach Recognition | UX Blueprint X3: the site's only purpose is unmet |
| The exception procedure is used twice for the same rule | Atlas §35.13: the danger is the second exception, which cites the first |

**R9.4 — A stop is not an escalation of tone.** It is a normal, expected event in a
build governed this tightly, and it is resolved by amending a document or removing the
work — usually within a day. A team that treats a stop as a failure will stop hiding
the conditions that cause one.

**R9.5 — Work may continue on unaffected stages during a stop**, provided the cause is
recorded and the affected work is not built on top of.

**R9.6 — No stage is compressed by deferring its review.** Review is inside the stage,
not after the build ([§24.2](#24-how-review-happens)).

### Dependencies

- R9.2's gate testing depends on the gates existing in Stage 0 (R8.4).
- R9.3 row 1 depends on document amendments being communicated to the build team, which
  is an owner obligation rather than a builder's.

---
---

# PART IV — COMPONENT INVENTORY

---

## 10. How a component enters the inventory

**Traces to:** Visual Design System §34 the law of components, §34.3 the addition test
· Creative Direction Book L9, L13, §23 · Brand Bible D8 interfaces recede

### Purpose

To state what a component is in this system, what the inventory below is, and the test
anything must pass to be added to it.

### Rules

**R10.1 — A component is a responsibility, not an appearance.** The inventory that
follows defines what each component is answerable for, when it exists and when it
disappears. **It does not define how any of them look**, because that is fixed by the
Visual Design System and is not this document's to restate.

**R10.2 — Every component answers three questions** (Visual Design System §34.1): why
it exists, when it exists, and **when it disappears**. A component whose third answer
is "never" is furniture, and furniture accumulates.

**R10.3 — The inventory is closed.** A component not listed in
[§11](#11-structural-components), [§12](#12-evidence-and-record-components) or
[§13](#13-action-disclosure-and-system-components) does not exist. Adding one requires
the Visual Design System §34.3 addition test — which of the six element types is it,
which locked law requires it, what is removed to make room, when does it disappear —
and then an amendment to this document.

**R10.4 — Every component maps to one of the six element types** (Visual Design System
§34.2). The mapping is stated in each entry, and a component that maps to two is two
components.

**R10.5 — Components are extracted from need, never anticipated.** A component built
because it might be reused is speculative infrastructure with a ten-year cost (R4.4).
Two surfaces needing the same responsibility is the trigger; one is not.

**R10.6 — The inventory below is the complete schedule of parts for the whole site.**
If a surface in UX Blueprint Part III cannot be built from these components, either the
surface's obligation has been misread or the inventory is wrong — and both are resolved
by escalation rather than by adding a part.

### Dependencies

- Every entry depends on the Visual Design System for its appearance and behaviour; the
  section that governs each is named in the entry.
- [§14](#14-components-that-must-never-be-built) is part of the inventory and carries
  equal weight.

---

## 11. Structural components

**Traces to:** Visual Design System §37 navigation and footer, §29.2 the four field
types · UX Blueprint §37, §38, §38A · Documentary Storyboard §7, §8

### Purpose

The components that carry the shape of a surface: how it is entered, how it is
divided, and how it is left.

### Rules

**R11.1 — The structural set:**

| Component | Element type | Why it exists | When it exists | When it disappears | Governed by |
| --- | --- | --- | --- | --- | --- |
| **Navigation** | Mark + action | A visitor may arrive anywhere and must establish where they are and what else exists | At the top of every surface, at rest | **The moment the field is given to evidence or silence**; never over a photograph; never during a held moment | Visual Design System §37.1; UX Blueprint R37.6 |
| **Index (small field)** | Action | The same five destinations, reachable from one control on a small field | Below the field width at which five destinations can be shown | When the field can carry the destinations directly | UX Blueprint R38.6 |
| **Footer record** | Record | The company's own record: legal identity, named place, the complete index | At the end of every surface | **Never** — the only component in the system for which that is the correct answer, because it is a record rather than furniture | Visual Design System §37.2; UX Blueprint R37.9 |
| **Chapter** | Composite | To carry one passage of the canonical story, whole, and to be linkable alone | Where a surface carries a chapter of C1–C10 | When the evidence for it does not exist — it is absent, never partial | Documentary Storyboard §25.1 rule 3; UX Blueprint R17.3, R17.4 |
| **Chapter opening** | Statement or photograph | To mark that something new has begun, felt before it is read | At the start of a chapter | Where consecutive chapters would open the same way — the manner changes instead | Visual Design System §23.5; Creative Direction Book §22.1 |
| **Held moment** | Photograph, statement, or nothing | To create the silence in which an emotional shift can register | **Exactly once** per surface longer than three viewport heights | Never removed to fit content; the content is removed instead | Visual Design System §23.4 |
| **Reading passage** | Passage | To carry the argument in continuous prose at the measure | Wherever a surface must explain rather than show | After eight consecutive paragraphs — an element must intervene | Visual Design System §10.5 |
| **Section header** | Statement | To name a chapter or a passage within one | Where a chapter or passage begins | Where a photograph or an inversion has already marked the change — a heading and a structural opening are not both needed | Visual Design System §9.2, §22.2 |
| **Sibling index** | Action | To list the siblings of a deep record and the route up | Only within Products, Technology and Journal | On any surface without real depth | UX Blueprint R37.8 |
| **Breadcrumb** | Mark + action | To state position in a hierarchy deeper than two levels | **Products only** — category, sub-category, product record | Everywhere else; it is not a second navigation | UX Blueprint R38.4 |

**R11.2 — The chapter is the most important component in the inventory** and the one
most likely to be built wrongly, because every content system in the world encourages
it to be built as a generic "section". It is not generic: it is one of ten named
things, it has a fixed position in an order, it is told whole or not at all, and it
must make sense alone.

**R11.3 — The held moment is a component, not an absence.** It is listed here because
things that are not built do not survive a sprint. It has an owner, a rule, and a
review line ([§25](#25-the-review-questions)).

**R11.4 — Navigation and the footer are built in Stage 0** and are not revised per
surface. A surface that needs different navigation has misunderstood its class.

### Dependencies

- The chapter component depends on the Documentary Storyboard chapter set and on the
  Manufacturing Stage content object ([§15](#15-the-content-objects)).
- The breadcrumb is the one component this system carries that the Visual Design System
  removed generally and the UX Blueprint reinstated for one hierarchy; it is recorded
  at UX Blueprint R53.4 and must not be generalised.

---

## 12. Evidence and record components

**Traces to:** Photography Direction §5 the evidence hierarchy, §24.4 provenance ·
Visual Design System §30 the evidence threshold, §32 ratio and crop, §39 records ·
UX Blueprint §13 the evidence ladder, Part X

### Purpose

The components that carry proof: photographs, specifications, findings and records.
This is where the brand is won or lost, and it is the largest group in the inventory.

### Rules

**R12.1 — The evidence set:**

| Component | Element type | Why it exists | When it exists | When it disappears | Governed by |
| --- | --- | --- | --- | --- | --- |
| **Editorial image** | Photograph | To present a photograph as evidence — at a presence where it can be examined, with its record attached | Wherever an image is at or above the evidence threshold | **Below the threshold it does not appear at all**; between the decoration line and the threshold there is no legitimate use | Visual Design System §30, §31 |
| **Image record (caption)** | Record | To state place, material, state and date — the provenance that makes a photograph evidence | With **every** evidential image | Never; an image whose record cannot be stated is not published | Documentary Storyboard §13.6; Photography Direction §24.4 |
| **Evidence set** | Photograph ×3–5 | To show a repeated act — the same operation, treated identically, which is Repeatability made visible | Only for an E3 rank set | With fewer than three members, or where the frames are of different subjects | Visual Design System §31.1 |
| **Evidence block** | Composite | To bind one claim to the proof of it: a mechanism described, with the photograph that shows it and the record that dates it | Wherever a surface makes a checkable claim | Where the proof does not exist — **the claim goes with it** | UX Blueprint E1, X8 |
| **Specification table** | Record | To present facts that share a structure so they can be compared and checked | Wherever a set of facts shares a structure | With one row, or where the columns are not comparable — that is a specification list | Visual Design System §39.1 |
| **Specification list** | Record | Label-and-value pairs for a single subject | On product records, machine records, certification records | Where the content is prose rather than fact | Visual Design System §39.2 |
| **Certification record** | Record | To carry a third-party finding so a stranger can check it without asking us | Where a finding exists **and** carries issuer, reference and date | **Missing any of the three, it is not published**; and never before the process that earned it | UX Blueprint R44.1, X4 |
| **Country record** | Record | To state a market actually shipped to | On Export, where the Facts Register confirms it | Where it is ambition rather than record; and it never becomes a surface or a map | UX Blueprint R44.3, R21.1 |
| **Machine record** | Record | To state what a machine does and what it makes repeatable | On Technology | Its specification attributes disappear until the Register confirms them — the record still exists without them | UX Blueprint R18.4, R43.4 |
| **Process chapter** | Composite | The chapter component ([§11](#11-structural-components)) carrying a manufacturing stage specifically — the operation, its evidence, its records | On Manufacturing, and extracted to Technology, Products, Quality, Export | Partially: never. A chapter is whole or absent | Documentary Storyboard §7, §25.1 |
| **Gallery item** | Photograph + record | To present one photograph in a set organised by chapter, each carrying its own record | On Gallery only | Where the record is missing; and it never opens into a lightbox | UX Blueprint R23.3, R23.5 |
| **Pull quote** | Statement | To carry the company speaking, once, isolated | At most once per surface | Where it would duplicate text already on the surface; where it cannot be attributed | Visual Design System §12.4 |
| **Testimony** | Record | To carry a real, attributed, permissioned statement | When one exists with all seven mandatory fields | **Now, and until then** — zero outperforms one invented | UX Blueprint R44.4, R44.5 |
| **Journal entry** | Composite | To present one chapter told in depth, attributed to a named person | On Journal | It carries no action at its close, ever | UX Blueprint R24.2, R24.3 |
| **Journal index item** | Record + action | To list an article by what it is about, not by when it was posted | On Journal's index | Where it would carry a date-led, feed-like ordering that implies a schedule | UX Blueprint R24.5 |
| **Product record** | Composite | To be a specification: what a piece is, what it is made of, how it is constructed, what varies | On Products, at the deepest level | It never carries price, stock, availability or quantity | UX Blueprint R19.3, R36.4 |
| **Category record** | Composite | To name a family of work in construction terms | On Products | With fewer than three products — it is a product, one level up | UX Blueprint R19.7 |
| **Limit statement** | Passage | To state plainly what the company does not do | On Quality, About and Export | Never collected onto a surface of its own — it is load-bearing where the capability is claimed | UX Blueprint E9, R13A.8 |

**R12.2 — The image record is not optional metadata.** It is what converts a photograph
from a picture into evidence, and it is mandatory in the content model
([§15](#15-the-content-objects)) precisely so that the build cannot ship an image
without one.

**R12.3 — The evidence block is the component that most needs discipline.** Its failure
mode is a claim built first and a photograph found afterwards, which reverses D1 and
produces illustration. The build order inside it is fixed: **the photograph exists, then
the claim is written to it.**

**R12.4 — No component in this group may be rendered below the evidence threshold** at
any field width (Visual Design System §30.2). Where a field cannot hold one at
threshold, the component is absent from that field — never shrunk.

### Dependencies

- Every component here depends on the photography library and therefore on access to a
  working shift ([§19](#19-what-blocks-what-waits-and-the-order-of-capture)).
- The certification, country, machine and testimony records depend on the Facts
  Register.

---

## 13. Action, disclosure and system components

**Traces to:** Visual Design System §35 action, §38 forms, §40 disclosure · UX
Blueprint §39 the action strategy, §40–§41 forms, §47 the ten states

### Purpose

The components that ask, reveal, or report the system's own condition.

### Rules

**R13.1 — The action, disclosure and system set:**

| Component | Element type | Why it exists | When it exists | When it disappears | Governed by |
| --- | --- | --- | --- | --- | --- |
| **Action** | Action | To carry the one commitment the site makes available: send the specification, the drawing or the sample | **Once per surface**, at the close, after the argument | On Technology, Gallery, Journal and every system surface; beside any photograph; during a held moment; in navigation; before Confidence in any journey | Visual Design System §35.2; UX Blueprint §39.3, §39.4 |
| **Link** | Action | To let a claim be checked or a chapter be continued | Inside a passage, a record, navigation, the footer | Never within prose — a link that vanishes on a small field has removed a route to proof | Visual Design System §35.3; UX Blueprint R38.1 |
| **Continuation** | Action | To state the next reasonable step at the end of a chapter or surface | At the close of every surface that has one | On Journal, which ends in space | UX Blueprint R39.2, R24.3 |
| **Enquiry form** | Composite | To let a visitor become the author of a record | **On the Enquiry surface only** | Everywhere else: never embedded in a chapter, a footer, a dialog or beside evidence | Visual Design System §38.2; UX Blueprint R40.2 |
| **Field** | Record | To ask one thing, with its label always visible | Four required, five optional, and no others | A field that qualifies rather than serves the enquiry does not exist | UX Blueprint §41.2–§41.4 |
| **Validation message** | Record | To state what is wrong and what to do | On leaving a field, and on submission | **While typing: never** | Visual Design System §38.4; UX Blueprint R41.5 |
| **Confirmation** | Record | To state what was received, who has it, and what happens next | After a successful enquiry | It never sells, never promises a time operations cannot keep | UX Blueprint R41.8 |
| **State notice** | Record | To state the system's own condition in words | For each of the ten states | It is never a skeleton, a spinner, or a disguised wait | UX Blueprint §47; Motion Direction M11 |
| **Accordion** | Composite | To let a reference set be consulted without being read | Record surfaces only, three or more independent items | On any surface carrying an argument; where the hidden content is something a buyer would look for | Visual Design System §40.2; UX Blueprint R40.1 |
| **Dialog** | Composite | For a task that must be completed or abandoned before the surface beneath means anything | Almost never — a required legal acknowledgement | Everywhere else: not for images, video, forms, newsletters, cookies or welcomes | Visual Design System §40.3 |
| **Search** | Composite | A fallback where a record set exceeds what structure can reach | **Only if** the product record set grows large enough | On every editorial surface | Visual Design System §40.4; UX Blueprint R46.1 |
| **Pagination** | Record + action | To state where a reader is in a finite set | Where a record set exceeds what one surface can carry at threshold | Where the set can be placed whole; and never as infinite scroll | Visual Design System §40.5 |
| **Icon** | Mark | Only where no word is short enough and unambiguous | **Four exist**: index/close, plus/minus, external, arrow | Everywhere else, including feature lists, headings and bullets | Visual Design System §43.3 |

**R13.2 — There is one action for the whole site, and its wording never changes between
surfaces** (UX Blueprint R39.8). A component that renders the action must not accept a
per-surface label; making that configurable is how five variants appear by launch.

**R13.3 — The enquiry form is a document being filled in, not an interface being
operated** (Visual Design System §38.1). Every technical decision inside it follows
from that: nothing is lost, nothing is disabled, nothing is hidden behind a step, and
no wait is disguised.

**R13.4 — Search is conditional and its default is not to exist** (UX Blueprint
R53.2 item 12). It is not built in Stage 0 on the assumption it will be needed.

### Dependencies

- The enquiry form depends on the reply process existing operationally (UX Blueprint
  R40.1 step 4) — a form that submits into nothing is the most damaging possible
  failure of this brand's central promise.
- State notices depend on copy, which is Brand Bible §12 (R6.4).

---

## 14. Components that must never be built

**Traces to:** Visual Design System §41 what does not exist · UX Blueprint §15.6,
§39.5, §46.10 · Creative Direction Book §25 failure modes · Visual Language Atlas §34

### Purpose

To carry the negative inventory with the same authority as the positive one, so that a
request for any of these is answered by the document rather than by a discussion.

### Rules

**R14.1 — The negative inventory.** None of these exists in this system, at any size,
on any surface, in any phase:

| Never built | Removed by |
| --- | --- |
| Card, panel, tile, well, bordered callout, quote box, feature box, stat box | Visual Design System §16.4, §36 |
| Card grid, three-up or four-up equal rows | Visual Design System §26.2, §36.1 |
| Carousel, slider, testimonial rotator, logo wall | Visual Design System §41 |
| Autoplaying video, background loop, hero video with text over it | Motion Direction M3, M15; Visual Design System §41 |
| Parallax, scroll-jacking, scroll-triggered reveal, fade-up-on-scroll | Motion Direction M6, M7, M13; Visual Design System §42.5 |
| Sticky bar, floating action button, back-to-top, chat widget, exit-intent | Creative Direction Book §22.4; UX Blueprint X6 |
| Modal newsletter, offer interruption, cookie overlay covering the field | Visual Design System §41; UX Blueprint R26.1 |
| Glass, frost, blur, translucency, gradient overlay | Visual Design System §14.5, §41 |
| Badge, tag, pill, chip | Visual Design System §39.3 |
| Skeleton screen, indeterminate spinner, progress bar on reading | Visual Design System §38.4, §41; Motion Direction M11 |
| Lightbox, image zoom, gallery slideshow | Visual Design System §40.3; UX Blueprint R23.5 |
| Tabs, breadcrumbs outside Products, tooltips carrying meaning | Visual Design System §41; UX Blueprint R38.4 |
| Animated counter, statistic panel, enlarged figure | Brand Bible §16.3; Visual Design System §12.1 |
| Recommendation, related-products rail, recently-viewed, personalised ordering | UX Blueprint X15, R46.9, R46.10 |
| Newsletter capture, gated download, capability-deck request, sample-request flow | UX Blueprint E7, R39.5 |
| Account, login, portal, saved items, wishlist | UX Blueprint R3.4, E7 |
| Price, cart, quantity selector, configurator, availability indicator | UX Blueprint R19.2 |
| Audience selector, "I am a…" path, role-based navigation | UX Blueprint R7.3 |
| Dark-mode toggle | Visual Design System §19 |
| Country landing surface, team surface, certifications surface, FAQ surface, case studies | UX Blueprint §15.6 |
| Session replay, heatmapping, advertising or re-marketing signal, cross-site identifier | UX Blueprint §50.3 |
| Placeholder, borrowed, stock or generated imagery — **including internally, during development** | Photography Direction §24.5 |

**R14.2 — This list is not exhaustive and does not need to be.** Anything not in the
positive inventory does not exist (R10.3). The list above exists because these specific
things will be proposed, and a named refusal is faster than a derivation.

**R14.3 — A request for any of these is answered with the row.** Not with a discussion
about whether this instance would be different. Atlas §35.13: do not negotiate the
test.

**R14.4 — The last row is the one that will be broken.** Placeholder imagery is the
default working method of every web team, and it is forbidden here without exception.
The alternative is stated at UX Blueprint X8: **surfaces are designed around the
absence of images, not around stand-ins.**

### Dependencies

- R14.4 has a real cost to the build's velocity, and it is accepted deliberately. The
  mitigation is [§19](#19-what-blocks-what-waits-and-the-order-of-capture): capture is
  scheduled early, not late.

---
---

# PART V — CONTENT ARCHITECTURE

---

## 15. The content objects

**Traces to:** UX Blueprint Part X the content models · Brand Bible §19 the Facts
Register, §3.3 one source of truth · Photography Direction §24.4 provenance ·
Documentary Storyboard §7

### Purpose

To map every object the content layer must hold, with what each is for, what it relates
to, what it waits on, what it must satisfy before it may be published, and what the
Facts Register requires of it.

**The models themselves are locked at UX Blueprint Part X and are not restated.** This
chapter is the build-layer map: the objects, their relationships, and their gates.

### Rules

**R15.1 — The object map:**

| Object | Purpose | Relationships | Depends on | Publication requirement | Facts Register |
| --- | --- | --- | --- | --- | --- |
| **Category** | A family of work, in construction terms | Parent category · child categories · products · manufacturing stage · machines | Photography; construction descriptions | Three or more products, or it is not a category | None directly. Quantities and lead times are `REGISTER` and live on Product |
| **Product** | A specification: what a piece is, what it is made of, how built, what varies | Category · manufacturing stages · machines · articles | Photography; materials and construction copy | An image at or above threshold, with its record; every dimension carries its unit | `REGISTER`: lead time, minimum quantity. Both withheld until Confirmed |
| **Manufacturing stage** | One chapter of the canonical set, held as a record so everything else can reference the chapter that proves it | Machines · categories · articles · certifications · people · images | The library, chapter by chapter | Told whole or absent; canonical order fixed | Two of the ten (C8, C9) are heavily exposed; a chapter is told **without** an unconfirmed fact, never with it softened |
| **Machine** | What a machine does and what it makes repeatable | Manufacturing stage · categories · products · images | A photograph of it in use, on our floor | The operation and what it guarantees; nothing else is required | **`REGISTER`: manufacturer, country of origin, tonnage or force, speed, per-shift capacity, power, every performance attribute.** All withheld |
| **Certification** | A third-party finding a stranger can check without asking us | Manufacturing stage · factory | The certificate itself | **Issuer, reference and date, or it is not published**; plus what it does **not** cover | Entire object is `REGISTER` |
| **Factory** | The place: the single fact the brand rests on | Certifications · manufacturing stages · countries · images | The confirmed company name and address | Real address, or not published; exactly one record unless a second real site exists | `REGISTER`: floor area, number of lines, headcount |
| **Country** | A market actually shipped to. **Also the "export market" object — they are one thing, not two** (R7.1) | Factory · documents | Client confirmation | Record of fact, never ambition; never becomes a surface or a map | Entire object is `REGISTER` |
| **Article** | One chapter told in depth | Manufacturing stage · categories · person (author) | A named author who can answer questions about it | One chapter, whole; a named author; no action at the close | Any figure inside an article is subject to the Register like any other |
| **Question** | A question of fact, attached to the surface whose subject it concerns | **Exactly one parent surface** | The surfaces existing first | Attaches to a parent, or it does not exist. **There is no FAQ surface** | Answers containing facts are gated like any other fact |
| **Person** | To attribute a caption, a quotation, an article or a reply | Manufacturing stages · articles · images | **Written consent on file** | No consent, no record. Never rendered as a portrait grid | Years of service and role titles are Register items if stated as fact |
| **Testimony** | A real, attributed, permissioned statement | Country · category | A real buyer quote with written permission | All seven mandatory fields, or not published | Entire object is `REGISTER`. **Currently: zero publishable** |
| **Image** | One photograph, with everything that makes it evidence | Any object may reference one; **an image belongs to a chapter** | The shoot | Place · date · photographer · permission · what is happening · evidence rank · the canonical crop | Anything a caption asserts is a fact and is gated |
| **Document** | A record the company or an issuer actually produces, made available as a file | Certification · country · product | The issuer's permission where it is theirs | **Never gated, never exchanged for an email address** (UX Blueprint E7). Only a genuine record — never a brochure, capability deck or sales sheet | The document's contents are Register-governed exactly as a page's would be |

**R15.2 — The Image object is first-class, and this is a build-layer consolidation
rather than a new model.** UX Blueprint R42.5 requires every model carrying a photograph
to carry its provenance; R7.1 requires one source of truth. Holding provenance on each
referencing object would produce the same photograph described differently in three
places. **One image, one record, referenced everywhere** — which is also the only way
Photography Direction §22.4's single canonical crop can be enforced by the system rather
than by discipline.

**R15.3 — "Factory images" and "export markets" are not separate objects.** The first is
an Image whose chapter is C1; the second is a Country. Creating either as its own type
would duplicate a fact and break R7.1.

**R15.4 — Every object carries the chapter it belongs to** (UX Blueprint R42.6). It is
what keeps the content structure identical to the story structure, and it is what makes
every record traceable back to the passage that proves it.

**R15.5 — No object carries presentational fields** (UX Blueprint R42.7). No layout,
variant, featured style, emphasis or display order intended to create prominence.
Ordering is permitted only where order is a fact — the sequence of stages, the order of
operations.

**R15.6 — An object with no content is not created in advance.** No empty category, no
placeholder machine, no unpublished certification stub. Structure is not created ahead
of content (UX Blueprint X8, R47.6).

**R15.7 — The Document object is the one most likely to be misused.** It exists for
certificates, specification drawings and shipping documentation — records that exist
whether or not there is a website. **A "brochure", "capability deck", "line sheet" or
"company profile" is not a document; it is marketing in a file**, and E7 forbids
exchanging any of it for contact details.

### Dependencies

- Every `REGISTER` marking depends on Brand Bible §19.4 and the client's confirmations.
- The Image object depends on the archive existing with retained originals (Photography
  Direction §24.4) — without it, provenance cannot be asserted truthfully.

---

## 16. Publication gates

**Traces to:** UX Blueprint §51.6 the publication gates, §42.3 the `REGISTER` mechanism
· Brand Bible §19.2, §19.3 · Photography Direction §24.4, §24.5

### Purpose

To specify the gates the build must make mechanical, so that the brand's central
promise is enforced by the system rather than by anybody remembering.

### Rules

**R16.1 — A gate refuses publication. It does not warn.** A warning is a note somebody
dismisses at the end of a long day; a refusal is a rule. Brand Bible §19.2 is absolute
about unconfirmed facts, and a mechanism that merely flags them has not implemented it.

**R16.2 — The gates:**

| Gate | Refuses | Traces to |
| --- | --- | --- |
| **Register** | Any `REGISTER` field not classified Confirmed | Brand Bible §19.3 |
| **Provenance** | Any image without place, date, photographer and permission | Photography Direction §24.4 |
| **Record** | Any evidential image without its caption and its alternative text | Documentary Storyboard §13.6; UX Blueprint R49.5 |
| **Threshold** | Any image rendered below the evidence threshold at any field width | Visual Design System §30.2 |
| **Crop** | Any image rendered as a crop other than its canonical one, including by container fitting | Photography Direction §22.4; Visual Design System §32.1 |
| **Consent** | Any named person without written consent on file | Photography Direction §8.5 |
| **Certification** | Any certification missing issuer, reference or date | UX Blueprint R44.1 |
| **Testimony** | Any testimony missing any of its seven mandatory fields | UX Blueprint R44.4 |
| **Category** | Any category with fewer than three products | UX Blueprint R19.7 |
| **Chapter** | Any partially told chapter | Documentary Storyboard §25.1 rule 3 |
| **Placeholder** | Any borrowed, stock, generated or placeholder image, **at any stage including development** | Photography Direction §24.5 |
| **Action** | More than one action on a surface, or an action on a surface where it is forbidden | UX Blueprint §39.3, §39.4 |
| **Value** | Any design value not drawn from the single source | Visual Design System §48.3 |

**R16.3 — The gates are built in Stage 0 and are tested by trying to defeat them**
(R9.2). A gate nobody has attempted to break is a gate nobody knows works.

**R16.4 — A gate is never bypassed to meet a date.** It is a stop condition (R9.3). If
a launch date and a gate conflict, the launch date moves — because the gate is the only
thing standing between this brand and the failure it was built to avoid.

**R16.5 — Gate failures are visible to the person who can fix them**, stated as what is
missing rather than as an error. "This image has no capture date" is actionable; "asset
validation failed" is not, and Brand Bible §12 governs these words as much as any
others.

**R16.6 — The gates apply to every medium the content layer feeds**, not only the
website (Brand Bible §19.6). If the same records ever produce a print sheet or a
presentation, the gates travel with them.

### Dependencies

- The Register gate depends on the Facts Register being maintained as live state with a
  classification per fact, not as a document.
- The Threshold and Crop gates depend on the Visual Design System's values, which are
  Calibrated until the first shoot (Visual Design System §51.3 item 7).

---

## 17. The editing boundary

**Traces to:** Brand Bible §19.5 standing instructions, §12 writing standards · UX
Blueprint §42, R6.4 · Visual Design System §49

### Purpose

To state what a content editor may change without review, what requires review, and
what is not theirs at all — so that the system stays correct after the build team has
left.

### Rules

**R17.1 — The boundary:**

| A content editor may | Requires review | Is not theirs |
| --- | --- | --- |
| Add a product to an existing category | Adding a category | Adding a surface |
| Add an article, attributed | Adding a chapter's content | Re-ordering chapters |
| Add an image with complete provenance | Replacing an image used as a chapter's primary evidence | Cropping or adjusting an image |
| Correct a factual error | Changing a `REGISTER` classification | Publishing an unconfirmed fact |
| Update an address, a name, a certificate reference | Adding a country | Adding a component |
| Add a question to a surface | Changing what a surface is for | Changing the action or its wording |

**R17.2 — Everything in column one is still gated** ([§16](#16-publication-gates)). The
boundary decides who may act; the gates decide what may publish, and they are
independent.

**R17.3 — The editing surface exposes the model, never the arrangement.** An editor
chooses what a thing *is* and never how it appears — no layout picker, no emphasis
toggle, no featured flag, no ordering intended to create prominence (R15.5). The moment
an editor can change appearance, the design system stops governing the site.

**R17.4 — Copy is authored under Brand Bible §11 and §12, by somebody who has read
them.** This includes every label, error, confirmation and state notice (R6.4). A
system that lets any string be edited by anybody has distributed brand voice to
everybody.

**R17.5 — The content layer must be portable.** Brand Bible §3.5 sets a ten-year
horizon, and no editing tool survives it. The models, the records and the images must be
movable to a different editing surface without loss of meaning, provenance or
classification. **The store of record is the content itself, never the tool.**

**R17.6 — Every published promise is an operational commitment** (Brand Bible §19.5).
An editor adding "we reply within two business days" has committed the company, and the
editing surface should make that consequence visible where such a statement is entered.

### Dependencies

- R17.5 constrains the technical means more than most rules here; it is a durability
  requirement rather than a preference (R1.5).
- R17.4 depends on at least one person in the content chain being trained on the Brand
  Bible ([§20](#20-the-dependency-register)).

---
---

# PART VI — PHOTOGRAPHY PIPELINE

---

## 18. The image categories

**Traces to:** Photography Direction §5 the evidence hierarchy, §25 the library is the
argument · Documentary Storyboard §7 the canonical chapter set · Visual Design System
§30 · UX Blueprint §13

### Purpose

To map every category of image the site needs, what each is for, which chapter it
belongs to, what evidence rank it must reach, and which surfaces cannot be published
without it.

**Not filenames, not a shot list.** The shot list belongs to production planning
(Photography Direction §30.1). This is the schedule of what the built site consumes.

### Rules

**R18.1 — The image categories:**

| Category | What it must show | Chapter | Rank required | Feeds |
| --- | --- | --- | --- | --- |
| **The place** | Rooms in use, from angles only somebody who works there would take | C1 | E5, and E2 where people are working | Home · About · Gallery · Manufacturing |
| **Arrival of material** | A hide entering, and the standard applied before any value is added | C2 | E2, ideally E1 (a hide refused) | Manufacturing · Quality |
| **The decision** | **Cutting: a decision being taken, with a cost** | **C3** | **E1** | **Home · Manufacturing** |
| **Shaping** | Skiving, forming, edges worked in stages | C4 | E2, E3 for the repeated act | Manufacturing · Technology |
| **Joining** | The stitch, the seam, the hardware, close enough to be examined | C5 | E2, E3 | Manufacturing · Technology · Products |
| **Finishing** | Burnishing, oiling — care taken after it stops being visible | C6 | E2 | Manufacturing · Products |
| **The gate** | **A rejection: something refused, and what happened to it** | **C7** | **E1** | **Quality · Manufacturing** |
| **The record** | Documentation being produced during the work | C8 | E4 | Quality · Export |
| **What leaves** | Packing, labelling, dispatch | C9 | E2 | Export · Products |
| **Tomorrow** | The floor continuing; people who will be here in the morning | C10 | E2, E5 | About · the close of any surface |
| **Machines** | Equipment in use, in our rooms, at work | C4, C5 | E2 | Technology · machine records |
| **Material** | Leather itself: grain, substance, variation, at a presence where it can be judged | C2, C4 | E6 with context, E2 in hand | Products · Journal · Manufacturing |
| **Finished work** | Pieces as they are, unretouched | C6, C9 | E6, E5 | Products · category and product records |
| **People** | Named individuals at their work, with consent | C3, C6, C10 | E2 | About · Manufacturing · Journal |
| **Journal** | Whatever the article's chapter requires | Per article | E2 or E6 | Journal |

**R18.2 — Rank is not quality** (Photography Direction §5.2 rule 5). A superb photograph
of an empty room is still E5, and no quantity of E5 produces E2. The table above states
what each category must be *asked to prove*, not how good the frames are.

**R18.3 — Two categories carry the site's entire purpose.** *The decision* (C3) and *the
gate* (C7) are the only ones that produce Recognition (UX Blueprint R13A.4). Everything
else consolidates. A library rich in every other category and empty of these two
produces a beautiful site that changes nobody's mind.

**R18.4 — Every image, in every category, arrives with its record** — place, date,
photographer, permission, what is happening (Photography Direction §24.4). An image
without one cannot be published and therefore was not worth capturing.

**R18.5 — Frames are made with room in them** (Photography Direction §16.3), because the
layout adapts to the image and never the reverse (Visual Design System §32.1). Where a
surface needs a shape the library lacks, the answer is a different photograph.

**R18.6 — There is no "hero" category.** A hero image is a role a photograph is given by
a layout, not a kind of photograph. The image that opens a surface is an E1 or E2 frame
from that surface's chapter, chosen for what it proves.

### Dependencies

- Every category depends on access to a working shift; **E1 and E2 cannot be obtained any
  other way** (Photography Direction §5.3).
- The people categories depend on the written consent process.
- The finished-work categories depend on written permission where a buyer's product
  appears (Photography Direction §10.5).

---

## 19. What blocks, what waits, and the order of capture

**Traces to:** Photography Direction §5.3 access decides the library's ceiling, §30.2
blocking items · UX Blueprint §51A, §55.1 · Documentary Storyboard §25.1 rule 4

### Purpose

To separate the images without which the site cannot be published from those that
improve it, and to state the order in which capture should happen so that the build
is unblocked in the order it needs.

### Rules

**R19.1 — Blocking. Without these, the corresponding surface cannot be published:**

| Image category | Blocks | Why nothing substitutes |
| --- | --- | --- |
| **The decision (C3, E1)** | **Home · Manufacturing** | It is the site's Recognition moment. Without it the medium fails its only purpose (UX Blueprint X3) |
| **The gate (C7, E1)** | **Quality** | A gate shown passing things is a formality; the rejection is the argument |
| The place (C1, E5/E2) | Home · About · Manufacturing | Nothing establishes that the building exists except the building |
| Joining (C5) | Manufacturing · Technology | The chapter a technical buyer watches twice |
| Machines in use (C4, C5) | Technology · machine records | A manufacturer's product photograph is a borrowed image |
| Finished work (C6, C9) | Products at every level | A category surface without work shown is a claim |
| What leaves (C9) | Export | Dispatch as an operation is the whole argument of the surface |
| The place, at volume | **Gallery** | Volume is Gallery's content; it cannot be built thin and filled later (UX Blueprint R23) |

**R19.2 — Waiting, not blocking. These improve surfaces that can be published without
them:**

Arrival of material (C2) · shaping (C4) · finishing (C6) · the record (C8) · tomorrow
(C10) · material in hand · people · journal imagery.

Each is absent rather than substituted (UX Blueprint X8), and each surface is designed
to stand without it.

**R19.3 — The order of capture follows the blocking list, not the story order.** The
shoot exists to obtain E1 first (Photography Direction §5.2 rule 1): **everything in a
production plan exists to put a photographer in front of an E1 moment, and they cannot
be arranged, only attended.**

Practically, that means the shoot is scheduled around when a real cut and a real
rejection happen — not around a convenient day.

**R19.4 — A second visit is assumed, not hoped for.** E1 moments cannot be scheduled, so
a single visit that fails to catch one is a normal outcome rather than a failure. The
plan should assume the shoot is a relationship with the floor, not an event.

**R19.5 — Nothing is published from a shoot until the archive exists** — originals
retained, capture dates, locations, photographer, permissions (Photography Direction
§24.4). The archive is a precondition of publication, not a tidy-up afterwards.

**R19.6 — The threshold is re-derived once against real frames** (Visual Design System
§30.2, Calibrated). This happens after the first shoot and before Stage 1 is published,
because every surface's image presence depends on the number.

**R19.7 — Below the floor, make nothing** (Documentary Storyboard §25.1 rule 4). If the
library after every attempt contains no E1 frame, the correct response is not to publish
a weaker site: it is to say so, and to fix the access problem, because no amount of
design compensates for the missing chapter.

### Dependencies

- Everything in this chapter depends on a single client action — **access to a working
  shift** — which is the root dependency of the entire project
  ([§20](#20-the-dependency-register)).

---
---

# PART VII — IMPLEMENTATION DEPENDENCIES

---

## 20. The dependency register

**Traces to:** Brand Bible §25 open items · Photography Direction §30.2 · Documentary
Storyboard §29.2 · Visual Design System §51.3 · UX Blueprint §53

### Purpose

To collect, in one place, everything the build cannot start or cannot finish without —
with who owns each, what it blocks, and what happens while it is outstanding.

### Rules

**R20.1 — Three classes of dependency**, and the distinction decides whether work stops
or continues:

| Class | Meaning | Build behaviour |
| --- | --- | --- |
| **Blocking** | Work cannot start | Do not begin the affected work |
| **Gating** | Work can be built but not published | Build it, design around the absence, do not ship |
| **Soft** | Work is weaker without it | Build, ship, improve later |

**R20.2 — The register:**

| # | Dependency | Owner | Class | Blocks | While outstanding |
| --- | --- | --- | --- | --- | --- |
| 1 | **Access to a working shift** | Client | **Blocking** | The entire photography library; Home, Manufacturing, Quality, Gallery at publication | Surfaces are designed around the absence of images. **Never around placeholders** |
| 2 | **Confirmation of the company name** | Client | **Blocking** | Every surface; the legal record; the logotype | Nothing is published carrying a name that may be wrong |
| 3 | **The Facts Register items at Brand Bible §19.4** | Client | Gating | Machine attributes, Quality figures, Export terms and markets, product quantities | Every `REGISTER` field is withheld; surfaces stand on mechanism instead |
| 4 | **Whether a rejection can be observed** | Client | Gating | Quality's Recognition moment | Quality carries C2 and C8 only, and says so honestly |
| 5 | **Written consent process for individuals** | Client | **Blocking** for people imagery | Every named person; the Person object | No person appears, named or unnamed, in any image |
| 6 | **Written permission for buyers' products** | Client | Gating | Finished-work imagery on Products and Gallery | Only work the company may show is shown |
| 7 | **Certificates: issuer, reference, date, scope** | Client | Gating | Every certification record | Quality states mechanism; no marks appear |
| 8 | **Country confirmation — markets actually shipped to** | Client | Gating | Export's market records | Export states process; no markets are named |
| 9 | **Machine verification** — what each machine is and does, and every specification attribute | Client | Gating | Machine records' attributes | Records state the operation and what it makes repeatable, nothing more |
| 10 | **Whether a reply time is operationally guaranteed** | Client | Gating | The stated next step at Enquiry | The surface states who reads it and what happens, without a time |
| 11 | **Whether saddles are in scope** | Client | Gating | The product hierarchy's shape | Category structure is not finalised |
| 12 | **Copy, authored under Brand Bible §11–§12** | Client / copywriter | **Blocking** per surface | Every surface it belongs to | The surface is not built with stand-in text (R6.4) |
| 13 | **Typeface licensing, in perpetuity, with tabular figures** | Client | **Blocking** | Stage 0; every surface | Stage 0 cannot be completed; the roles are fixed and the faces are not (Visual Design System §51.3 item 6) |
| 14 | **The logotype decision** | Creative Director | Soft | Navigation and the footer record | The company name set in the serif is the mark (Visual Design System §44.3); nothing else is needed |
| 15 | **The evidence threshold's second derivation** | Creative Director, after the first shoot | Gating | The Threshold gate's final value | The Calibrated value stands; it is re-derived before Stage 1 publishes |
| 16 | **Functional-hue verification against a real photograph** | Creative Director | Soft | Nothing structural | The Calibrated values stand |
| 17 | **The five primary navigation destinations** | Approver | **Blocking** | Stage 0 navigation | Navigation is not built to a guess (UX Blueprint R53.2 item 14) |
| 18 | **Acceptance that nothing is gated, and that individuals are not tracked** | Client | **Blocking** | Enquiry; measurement; the privacy surface | Neither is built provisionally, because both are architecture rather than settings |
| 19 | **The archive, with retained originals** | Client / picture editor | **Blocking** for publication of any image | Every image | No image publishes without provenance |
| 20 | **The reply process — a named person who answers** | Client | **Blocking** | Enquiry | A form that submits into nothing fails the brand's central promise |
| 21 | **Distribution of all eight documents to every builder** | Project owner | **Blocking** | The whole build | A builder without the documents will interpret, and R2.1 forbids it |

**R20.3 — Dependency 1 is the root.** Items 4, 5, 6, 15 and 19 all descend from it, and
so does most of the site's evidence. **It should be pursued before anything else in this
project, including design work**, because everything downstream is shaped by what access
yields.

**R20.4 — A gating dependency never becomes an invention.** Brand Bible §19.2: anything
unconfirmed is removed, not softened. The build's response to a gate is always the same —
state the mechanism, withhold the fact, and say the fact is available on enquiry where
that is true.

**R20.5 — Dependencies are reviewed at every stage gate** (R9.1), and the register is
kept current. A dependency silently resolved is a surface that could have been finished
weeks earlier; a dependency silently unresolved is a launch that fails at the last gate.

**R20.6 — No dependency is discharged verbally.** "The client confirmed on a call" is not
a Register classification (Brand Bible §19.3, which requires written confirmation). This
rule will be unpopular and it is the one that prevents the failure §19.1 records — a
fabricated audit body that survived a full review.

### Dependencies

- This chapter is itself the dependency list; its own dependency is that somebody owns
  it and keeps it current, which is a project-management obligation rather than a
  builder's.

---
---

# PART VIII — PERFORMANCE STRATEGY

---

## 21. Performance is trust

**Traces to:** Brand Bible §8.1 stage 1, §3.4 Restraint, §16.4 luxury as the absence of
anxiety · Motion Direction M3, M11 · Visual Design System §30 the evidence threshold ·
Visual Language Atlas §23, §35.10

### Purpose

To state how performance is to be thought about, so that technical decisions are made
for brand reasons rather than for scores.

**No technique, no budget, no metric.** How performance is achieved is the technical
lead's (R6.2). What it is *for* is this chapter's.

### Rules

**R21.1 — Performance is a brand quality, and the buyer reads it as one.** A site that
hesitates is a company that hesitates; a site that is heavy is a company that is
disorganised. The inference is made in the first seconds, before any evidence is
examined, and Brand Bible §8.1 stage 1 warns that a visitor who classifies us wrongly
in those seconds spends the rest of the visit confirming it.

**R21.2 — Images load because evidence matters.** This is the ordering rule, and it
resolves the one genuine tension in this brand's performance thinking:

> **The photograph is the argument (D1). It is therefore the thing performance exists to
> deliver — never the thing sacrificed to improve a number.**

An image degraded, deferred, blurred-up, or delivered below the evidence threshold to
save weight has converted evidence into decoration (Visual Design System §30.2) and has
optimised away the site's reason for existing. **Weight is spent on photographs and
saved everywhere else.**

**R21.3 — Everything that is not evidence is a candidate for removal.** The cheapest
thing to deliver is the thing that was never built (R4.4). Before any optimisation
technique is considered, the negative inventory
([§14](#14-components-that-must-never-be-built)) has already removed most of what
normally makes a site heavy.

**R21.4 — Motion never delays content.** Motion Direction M1: motion is never evidence.
Content is present when the surface is (Visual Design System §42.5); nothing waits for a
sequence to finish before it can be read.

**R21.5 — A wait is stated, never disguised** (Motion Direction M11). No skeleton, no
spinner, no shimmer standing in for an answer. If something takes time, the surface says
so in words. **Disguising a wait is a false statement about the system**, of the same
class as an unverified number.

**R21.6 — Perceived honesty outranks perceived speed.** A technique that makes a site
feel faster by misrepresenting its state is unavailable here, however standard it is.
This removes a whole family of conventional practice, and it is a deliberate cost.

**R21.7 — Accessibility before decoration, always.** Where a technique improves the
appearance of loading for some visitors and degrades the experience for any, it is not
used ([§22](#22-accessibility-is-evidence-respect-and-permanence)).

**R21.8 — Performance is measured against a real buyer's conditions**, not a laboratory:
a mid-range device, a factory-floor connection, an office network in Germany or
Australia. Optimising for a fast machine on a fast line is optimising for the reviewer
rather than the reader — the same error Visual Design System §17.2 names about contrast.

**R21.9 — Durability is a performance property.** Brand Bible P5: a ten-year horizon.
A build whose speed depends on a technique that will be unfashionable in three years has
borrowed its performance. The boring approach that stays fast is correct (R1.5).

**R21.10 — Nothing loads that the visitor did not ask for.** No prefetching of things
they may never want, no background fetching of measurement, no third-party script that
watches them (UX Blueprint §50.3). Every request the site makes on a buyer's connection
should be one the buyer would recognise as being for their benefit.

### Dependencies

- R21.2 depends on the evidence threshold and the delivery rules at Visual Design System
  §30 and §32.3, which are the only numbers involved and are not restated here.
- R21.10 depends on the measurement position at UX Blueprint §50 being accepted.

---
---

# PART IX — ACCESSIBILITY STRATEGY

---

## 22. Accessibility is evidence, respect and permanence

**Traces to:** Visual Design System §47 accessibility as respect · UX Blueprint §49
accessibility as experience · Brand Bible §3.2 Evidence, §18.5 how buyers are treated ·
Visual Language Atlas §14 hierarchy is a kindness

### Purpose

To state why this brand treats accessibility as constitutive rather than compliant, so
that it is never traded against appearance, schedule or convenience.

**No standards, no levels, no measured values.** Those are fixed at Visual Design System
§47 and are not repeated. This chapter is the reasoning that keeps them from being
negotiated.

### Rules

**R22.1 — Accessibility is evidence.** The brand's entire position is that a stranger may
check what we say without taking our word for it (Brand Bible §3.2, §22). **A person who
cannot read, reach or operate the record cannot check it.** An inaccessible surface is
therefore not a compliance failure — it is a withdrawal of the offer the company exists
to make, and it fails the Evidence Test at the first question.

**R22.2 — Accessibility is respect.** The relationship this brand describes is
colleagues rather than an audience being processed (Motion Direction §14.3). Requiring a
buyer to see, to hover, to have steady hands, or to tolerate movement in order to do
their job is a small discourtesy repeated at every visit. Brand Bible §18.5 governs how
buyers are treated, and it does not carve out the ones with a disability.

**R22.3 — Accessibility is permanence.** An accessible structure is a structure whose
meaning is carried by what it *is* rather than by how it appears — headings that are
headings, records that are records, order that is order. That structure survives a
redesign, a new medium, a screen reader written in fifteen years, and whatever replaces
the browser. Decorative structure does not. Brand Bible P5 makes this a brand
requirement rather than a technical courtesy.

**R22.4 — The targets exceed the minimum, and the reason is stated once**: the minimum is
set for a reviewer's monitor, and our buyer is reading in a warehouse, in daylight, on an
old screen (Visual Design System §17.2). Meeting a floor is not the same as being
readable.

**R22.5 — Nothing meaningful is carried by appearance alone.** Every state, status,
category and relationship is also a word (UX Blueprint R49.7). This is the same rule as
X12 — a fact carries its route to verification — applied to perception.

**R22.6 — There are no decorative images in this system**, so there is no such thing as
an image that needs no description (Visual Design System §47.4). An image whose
description would be empty is an image that should not be published, and the content
model enforces it (R16.2, the Record gate).

**R22.7 — Reduced motion is a test, not a concession.** With motion removed, nothing
should become harder to understand — because Motion Direction M1 establishes that motion
is never evidence. **If a surface breaks with motion off, the surface was wrong**, and
the fix is structural.

**R22.8 — Accessibility is built in, never retrofitted.** Retrofitting produces a second
version of a surface that behaves differently, which is two statements about one thing
(R7.1). It is also, in practice, how sites end up with an accessibility overlay — a
mechanism that announces a company did the minimum, late, and bought a product to hide
it.

**R22.9 — Accessibility work is never traded against a launch date.** It sits with the
publication gates (R16.4): the date moves.

**R22.10 — The three-switch test** (UX Blueprint §47.8, Visual Design System §47.8):
turn off the images, the styles, and the motion, one at a time. With images off, the
records carry the facts. With styles off, the order carries the story. With motion off,
nothing is lost. **A surface failing any of the three has put something load-bearing
into a layer not every visitor receives.**

### Dependencies

- Every measured requirement is at Visual Design System §47 and is not restated.
- R22.6 depends on the Record gate at [§16](#16-publication-gates) being built in
  Stage 0.

---
---

# PART X — SEARCH PHILOSOPHY

---

## 23. How search should understand this company

**Traces to:** Brand Bible §3.2 Evidence, §19 the Facts Register, §22 · Visual Language
Atlas §35.2 the Factory Test · UX Blueprint §46.8 internal linking, R11.3 no country
surfaces, §2.4 rejected measures · Documentary Storyboard §25.1

### Purpose

To state how this site should be understood by machines that index it — as a
consequence of what it is, rather than as an activity performed on top of it.

**No keywords, no targets, no tactics.** This chapter states the position; the technical
means of expressing structure and identity to an indexer belong to the technical lead
(R6.2).

### Rules

**R23.1 — The site is found because of what it proves, not because of what it repeats.**
The company's advantage is a floor it owns and evidence nobody else can produce
(Atlas §35.2). That advantage is the only durable position in search too: **material
that could only be written by somebody who owns a factory is the material an
intermediary cannot publish.**

**R23.2 — Nothing is written for a machine.** A sentence added to a surface because a
term should appear there is a claim addressed to something other than the buyer, and
Brand Bible §12 governs every sentence on this site. If a passage would embarrass the
floor manager, it does not go on the page — whatever it does for a ranking.

**R23.3 — A page exists because a buyer question exists** (UX Blueprint X1). This
removes, permanently, the largest category of search practice available to a
manufacturer: **there are no location pages, no market pages, no "leather goods
manufacturer in ___" pages, no service-area pages, no comparison pages.** Each is a
doorway page, and each fails the Factory Test because any intermediary can produce one
(UX Blueprint R11.3, §15.6).

**R23.4 — Canonical thinking is the same discipline as the canonical crop.** Photography
Direction §22.4: one canonical crop per image, because two crops in circulation are two
statements. Applied here:

> **One canonical address per thing. One statement of a fact. One route to it.**

No duplicate surfaces, no parameterised variants of the same content, no printer
versions, no near-identical pages differing by a term. A thing has one address, and every
reference points at it (R7.4).

**R23.5 — Addresses are permanent** (UX Blueprint R29.2). A surface's address does not
change; where content moves, the old address continues to resolve. This is Repeatability
in the one place a buyer can see it: a link sent to a colleague a year ago still works.

**R23.6 — Authority comes from being cited, and being cited comes from being useful.**
No link acquisition, no exchanges, no guest placements, no directories bought. UX
Blueprint §46.8 already forbids internal links that serve a machine rather than a reader;
this extends it outward. **The Journal exists to be worth citing** (UX Blueprint §24) —
that is the entire strategy, and it is a ten-year one.

**R23.7 — The machine-readable layer states the same things the human-readable one
does.** Same facts, same order, same emphasis, nothing hidden. Text a visitor cannot see
but an indexer can is an unverifiable claim made to a party that cannot check it, which
is the exact shape Brand Bible §19 exists to prevent.

**R23.8 — The records are structured because they are records** (UX Blueprint R49.7,
Visual Design System §39). A specification marked as a specification, a certification
carrying its issuer and date, a place carrying its address — these are legible to a
machine as a by-product of being legible to a person. **Structure is described because
it is true, never because it produces a richer result.**

**R23.9 — Ranking is not a measure of success** (UX Blueprint §2.4). A term the whole
category competes for is a term an intermediary can win. The measures that matter are at
UX Blueprint §2.2: a specific enquiry, from somebody with authority, that a named person
can answer in one reply.

**R23.10 — Patience is the strategy.** A brand built for a decade is indexed over years,
by publishing things that are true and specific, at whatever pace the floor produces
them (UX Blueprint R24.5: frequency is not a commitment). Every technique that
accelerates this is a technique that dates, and Atlas §35.10 fails anything traceable to
a current practice.

### Dependencies

- R23.4 and R23.5 constrain the technical means: address permanence must be designed in
  Stage 0, because retrofitting it means breaking every link already sent.
- R23.6 depends on the Journal existing and being genuinely useful, which depends on
  somebody at the company being willing to write (dependency 12,
  [§20](#20-the-dependency-register)).

---
---

# PART XI — QUALITY ASSURANCE PHILOSOPHY

---

## 24. How review happens

**Traces to:** Creative Direction Book §26 the universal review · Visual Language Atlas
§35 the ten tests, §35.13 on failure · Visual Design System Appendix C · Photography
Direction §29 · UX Blueprint §54

### Purpose

To define the review régime: who reviews, when, against what, and what happens when
something fails.

### Rules

**R24.1 — Review is against documents, never against opinion.** Every review in this
project is a comparison between a built thing and a written rule. "I don't like it" is
not a review finding; "this fails L13, and here is the element that survives removal" is.

**R24.2 — Review happens inside the stage, not after the build** (R9.6). A surface is
reviewed when it is built, by somebody who did not build it. A review held at the end
finds fifty problems, all of them expensive.

**R24.3 — The four reviews, and what each covers:**

| Review | Runs | Against | Owner |
| --- | --- | --- | --- |
| **Build review** | Per surface, on completion | Visual Design System Appendix C — the implementation checklist | Technical lead |
| **Architecture review** | Per surface, on completion | UX Blueprint Part III obligations, Part VI content priority, §39 the action | Creative Director |
| **Evidence review** | Per surface, before publication | Photography Direction §29 QA · the publication gates ([§16](#16-publication-gates)) | Picture editor, with the Facts Register owner |
| **The ten tests** | Per surface, and on the whole site before launch | Visual Language Atlas §35, in the order at §35.11 | Creative Director |

**R24.4 — The ten tests are run cheapest-first and most tests fail at the second**
(Atlas §35.11): Evidence, Factory, Brand DNA, Documentary, Ownership, Recognition,
Silence, Museum, Permanence, Memory. Running them in this order is not a formality — it
stops expensive review time being spent on work that has already failed.

**R24.5 — Failure returns the work with the failed test named** (Atlas §35.13). The
review does not redesign the work, propose alternatives, or negotiate the test. It names
the failure; the maker fixes it.

**R24.6 — No exception is granted on grounds of deadline, budget, client preference or
beauty** (Atlas §35.13). If a reviewer believes a rule is wrong, the remedy is to amend
the governing document in a new version — not to pass the work.

**R24.7 — Every exception that is granted is recorded.** Atlas §35.13: the danger is
never the first exception, it is the second, which cites the first. Two exceptions
against the same rule is a stop condition (R9.3).

**R24.8 — The reviewer must be able to fail things.** A review conducted by somebody who
cannot stop a release is a report, not a review. This is an organisational requirement
and it is the one most often absent when a brand of this discipline degrades after
launch.

**R24.9 — Review continues after launch.** Every change, every new product record, every
article passes the same gates and the same tests, forever. A régime that applies only
during the build produces a site that is correct on day one and unrecognisable in three
years — which is precisely the failure Brand Bible P5 exists to prevent.

### Dependencies

- The build review depends on Visual Design System Appendix C; the evidence review
  depends on the gates existing (R8.4).
- R24.8 depends on the client agreeing that the Creative Director may stop a release.

---

## 25. The review questions

**Traces to:** Visual Language Atlas §35 the ten tests · Creative Direction Book §26 ·
Brand Bible §3.6 using the DNA · UX Blueprint §6A, §39A

### Purpose

To give a reviewer the plain-language questions that catch the failures this brand is
most exposed to — as a fast pass before the formal tests, not as a replacement for them.

### Rules

**R25.1 — The questions, in the order they are cheapest to answer:**

| # | Question | What it catches | Fails against |
| --- | --- | --- | --- |
| 1 | **What does this prove?** | Decoration at every scale. If the sentence *this proves ___* cannot be completed specifically, it must not exist | Atlas §35.7 |
| 2 | **Could a company that owns no floor have made this?** | Category filler — the stock substitute, the capability grid, the benefit statement | Atlas §35.2 |
| 3 | **Does this reduce Recognition?** | Anything that competes with, delays, dilutes or replaces the decision being taken | Brand Bible §8.1 stage 3 |
| 4 | **Does this add marketing?** | A claim without evidence; a superlative; an adjective doing work a fact should do | Brand Bible P1, §11.2 |
| 5 | **Does this feel like a catalogue?** | Equal treatment, item counts, a grid of things to choose from, a shopping posture | UX Blueprint R19.1; Atlas §35.1 |
| 6 | **Does this create cognitive load?** | Two questions at once; a decision without a visible purpose; work moved onto the buyer | UX Blueprint §6A, §39A |
| 7 | **Does this violate the Brand Bible?** | Anything contradicting one of the five DNA words. **Contradiction outranks contribution** | Brand Bible §3.6 |
| 8 | **Does this increase trust?** | Work that is well made and moves nobody. If the answer is "it looks better", the answer is no | Brand Bible §22 |
| 9 | **Was this found, or was it arranged?** | Staging in any discipline — a tidied bench, a composed spread, a rehearsed sentence | Atlas §35.3 |
| 10 | **Could a knowledgeable person name the decade this was made in?** | Technique, which is the only thing that dates | Atlas §35.10 |
| 11 | **In a week, what remains — and is it the right thing?** | Work whose residue is itself rather than the company | Atlas §35.4 |
| 12 | **Does this feel like Elite Export?** | The question that is asked first and answered last. It is the summary of the eleven above, and it is never the sole basis for a rejection | The whole body of work |

**R25.2 — Question 12 is deliberately last.** "Does this feel right" is where every
undisciplined review starts and where this one ends, because a feeling is not a finding.
When it is the only objection, the reviewer's obligation is to locate which of the first
eleven is actually failing — and if none is, the work passes.

**R25.3 — Question 3 outranks the others in practice.** Recognition is the hinge (Brand
Bible §8.1), and most damage to this brand will not arrive as an obvious violation. It
will arrive as something reasonable placed where it competes with the decision being
taken.

**R25.4 — Anybody may ask these questions.** They require no design training, no
technical knowledge and no seniority. A developer who asks *what does this prove* about
their own work has done the most valuable review in this document.

**R25.5 — The questions are asked of small things too.** A field label, an error message,
a caption, a link. Atlas §35.7 is the most-used test on the list precisely because it
scales down.

### Dependencies

- These questions do not replace the four reviews at [§24](#24-how-review-happens) or
  the ten tests; they are the fast pass that precedes them.

---
---

# PART XII — LAUNCH PHILOSOPHY

---

## 26. The launch gates

**Traces to:** Visual Language Atlas §35 the ten tests, §35.12 the one test · Brand
Bible §19 governance, §8 the emotional journey · UX Blueprint §51A.6, §54 · Visual
Design System Appendix C · Photography Direction §24.4

### Purpose

To define what must be true before the site is made public — as a set of gates that are
passed or not, rather than as a checklist that is mostly done.

### Rules

**R26.1 — Launch is not a date. It is a condition.** A site that publishes before its
gates are passed has spent the one thing this brand cannot rebuild: the first impression
of a buyer performing due diligence, who will not return to see whether it improved.

**R26.2 — The launch gates**, each pass/fail, in the order they are cheapest to fail:

| # | Gate | Passed when |
| --- | --- | --- |
| 1 | **Facts** | Every published figure, certification, market and capability claim is classified Confirmed in the Facts Register. **No `REGISTER` field is published.** No fact is typed anywhere (Brand Bible §19) |
| 2 | **Photography** | Every image is real, from the company's own library, with complete provenance; **no placeholder, borrowed, stock or generated image exists anywhere in the build**; every image publishes at or above the evidence threshold; every image is its canonical crop |
| 3 | **Recognition** | Every journey in UX Blueprint Part IV passes through C3 or C7. **The site produces the one effect it exists to produce** (Atlas §35.9) |
| 4 | **Content** | Every surface's obligation is discharged; every priority band at UX Blueprint §36 is satisfied; nothing forbidden is present; all copy is authored under Brand Bible §11–§12 |
| 5 | **Navigation** | Five destinations; the action absent from them; every surface reachable in two steps; the footer record complete at every field size; every address permanent |
| 6 | **The emotional journey** | All seven stages present and in order; Trust does not precede Recognition; a held moment exists on every long surface, with zero persistent elements in it |
| 7 | **Trust** | The limits are published; every certification carries issuer, reference and date; the non-conformance route is stated; nothing overclaims |
| 8 | **Accessibility** | The three-switch test passes on every surface (R22.10); keyboard reaches everything in reading order; every control has a name in words; no meaning behind hover |
| 9 | **Performance** | Measured on a real buyer's device and connection (R21.8); images deliver at threshold; no wait is disguised; nothing loads that the visitor did not ask for |
| 10 | **Enquiry** | An enquiry submitted from every surface that carries the action arrives, intact, to a named person who is ready to reply. **Tested with a real message, by a real person, end to end** |
| 11 | **States** | All ten behave as specified, including offline, timeout and error — and **nothing the visitor has written is ever lost** |
| 12 | **Brand DNA** | The whole site scored against Ownership, Evidence, Repeatability, Restraint and Permanence. **Contradicting any one is a fail regardless of what else it serves** (Brand Bible §3.6) |
| 13 | **The ten tests** | Run in order (Atlas §35.11) against the site as a whole, not surface by surface |
| 14 | **The one test** | *Would this still be right if the medium disappeared?* (Atlas §35.12) |

**R26.3 — Gate 10 is tested with a real enquiry, not a staging simulation.** The most
damaging possible failure of this brand is a form that submits into nothing: it converts
the site's entire argument into a demonstration that we do not answer. It is tested by
sending a genuine message and having a genuine person reply to it.

**R26.4 — Gate 2 has no partial pass.** One placeholder image anywhere fails the gate.
Brand Bible §16.1: a single stock photograph will undo the credibility of everything else
on the site, and there is no acceptable exception.

**R26.5 — A failed gate moves the date.** Not the scope, not the standard, not the gate
(R16.4). This is the rule the whole launch depends on and the one that will be
challenged; the answer is that a brand whose position is *you may verify us* cannot
launch a version of itself that has not been verified.

**R26.6 — Launch scope is not build order.** UX Blueprint R51A.6: the legal and system
surfaces are built last and are **present at launch**. A site that publishes before it
can say who it legally is has failed the first thing the brand claims about itself.

**R26.7 — Launch is silent.** No announcement, no launch campaign, no "we are pleased to
announce", no countdown. Brand Bible §7.2 forbids excitement and novelty; a redesign
presented as an event tells a buyer that the company thinks its website is news.
**The site simply exists, and then it has always existed.**

**R26.8 — Nothing incomplete is published behind a "coming soon".** UX Blueprint R47.6:
a permanent empty state is forbidden. A surface that is not ready is not linked and not
published; the site is a shorter telling until it is (Documentary Storyboard §25.1).

**R26.9 — The launch record.** On the day, one record is written and kept: which gates
passed, on what evidence, who signed each, and every exception granted with its
amendment reference. It is the company's own evidence about its own conduct, and it is
the first thing a successor team will need.

### Dependencies

- Gates 1, 2, 7 and 10 depend entirely on client actions in
  [§20](#20-the-dependency-register), items 1–11 and 19–20.
- Gate 3 depends on the library containing at least one E1 frame — the root dependency of
  the project (R20.3).

---
---

# PART XIII — ACCEPTANCE CRITERIA

---

## 27. When implementation is finished

**Traces to:** Creative Direction Book §26 the universal review · Visual Language Atlas
§35 · Brand Bible §22, §3.6 · UX Blueprint §2 success, §54 · Visual Design System §53

### Purpose

To define done — in terms that can be checked by somebody who was not present, and that
cannot be satisfied by the work merely looking finished.

### Rules

**R27.1 — "It looks good" is not an acceptance criterion**, and neither is "the client
approved it", "it matches the design", or "everything works". Each can be true of a site
that fails every test in this document.

**R27.2 — Implementation is finished when all of the following are true.** They are
verified independently and any one failing means the work is not accepted:

| # | Criterion | Verified by |
| --- | --- | --- |
| 1 | **Brand Bible satisfied.** Every surface scores three or more of the five DNA words and contradicts none | Brand Bible §3.6, applied surface by surface |
| 2 | **Recognition achieved.** A person outside the company, shown the site cold, can name one specific unglamorous thing about how this factory works that they could not have learned elsewhere | Atlas §35.9, tested on a real stranger — not on the team |
| 3 | **Evidence visible.** Every claim on the site has its proof on the same surface; every photograph is at or above threshold; every fact carries its route to verification | Atlas §35.7; UX Blueprint X12 |
| 4 | **No contradiction.** No element, behaviour, word or value contradicts any of the eight approved documents | [§24](#24-how-review-happens), the four reviews |
| 5 | **Every surface traceable.** Each surface's obligation, question, evidence and outcome match UX Blueprint Part III exactly | Architecture review |
| 6 | **Every interaction justified.** Every action, link, disclosure and movement traces to a rule; anything that survives removal is removed | Creative Direction Book L13; Motion Direction M13 |
| 7 | **Nothing invented.** No fact, figure, image, quotation, name or capability exists that is not on the record | Brand Bible §19; the publication gates |
| 8 | **Nothing duplicated.** Every fact exists in one place, every value in one place, every image in one crop | R7.1 |
| 9 | **The journeys complete.** All six journeys in UX Blueprint Part IV can be walked end to end, each passing through Recognition, within the decision budget | UX Blueprint R39A.6 |
| 10 | **The enquiry answered.** A real message sent from the live site reaches a named person and receives a real reply | R26.3 |
| 11 | **The three switches.** Images off, styles off, motion off — the argument survives all three | R22.10 |
| 12 | **The successor test.** Somebody who has never met the team can add a product, an article and a certification correctly, using only the documents and the editing surface | [§17](#17-the-editing-boundary), [§28](#28-how-anything-is-added-later) |

**R27.3 — Criterion 2 is tested on a stranger and it is the only one that cannot be
faked.** Everybody who built the site knows what it is trying to say, and that knowledge
makes them unable to judge whether it says it. **Test it on somebody who buys leather
goods for a living and has never heard of this company.**

**R27.4 — Criterion 12 is what makes the work finished rather than merely delivered.**
A build only its authors can maintain has a hidden end date. Atlas §25.4: rules that
survive their author.

**R27.5 — Acceptance is recorded once, with its evidence** (R26.9). "We think it is
done" is not an acceptance; a signed record of twelve criteria with how each was
verified is.

**R27.6 — Acceptance is not the end of the régime.** Every later change passes the same
gates, the same reviews and the same tests (R24.9). The site is finished; the discipline
is not.

### Dependencies

- Criterion 2 depends on the library containing an E1 frame; without it the criterion
  cannot be met by any amount of build quality.
- Criterion 10 depends on the reply process existing (dependency 20).

---
---

# PART XIV — FUTURE EXPANSION

---

## 28. How anything is added later

**Traces to:** UX Blueprint §15.5 admitting a surface, §52.2 · Visual Design System
§34.3, §49.2 the exception procedure · Documentary Storyboard §25.4 how a new medium is
added · Visual Language Atlas §35.13 · Brand Bible §19.3

### Purpose

To collect every amendment procedure the approved documents contain, so that the answer
to "can we add…" is always a written route rather than a judgement call — including in
five years, when nobody involved in this project is still here.

### Rules

**R28.1 — The universal shape.** Every addition, of any kind, answers four questions in
writing before it is built:

1. **What does it prove**, that nothing existing proves? (Atlas §35.7)
2. **Which locked rule requires it**, or which buyer question does it answer that no
   surface answers? (UX Blueprint X1)
3. **What is removed to make room for it?** (Creative Direction Book L6; UX Blueprint
   R25.3)
4. **When does it disappear?** (Visual Design System §34.1)

If any cannot be answered, it is not built. **The default answer is no** (Creative
Direction Book §23).

**R28.2 — The procedures, by what is being added:**

| Adding | Route | Decided by |
| --- | --- | --- |
| **A page** | UX Blueprint §15.5 — the four questions, then an amendment to the UX Blueprint. It is then classified under UX Blueprint §34 and given its priority bands | Creative Director |
| **A product** | Content only. Add to an existing category, satisfy the model and the gates. No amendment | Content editor |
| **A product category** | Review: three or more products (R19.7), a construction description, a manufacturing chapter it derives from, and photography at threshold | Creative Director |
| **A country** | Content only, **after** the Facts Register confirms goods have actually shipped there. It is a record, never a surface | Facts Register owner |
| **A certification** | Content only, with issuer, reference, date and scope, and what it does not cover. It appears after the process that earned it, never before | Facts Register owner |
| **A machine** | Content only. Operation and what it makes repeatable; every specification attribute stays `REGISTER` until confirmed | Content editor |
| **An article** | Content only. One chapter, told whole, attributed. No schedule implied | Content editor |
| **A person** | Content only, with written consent. Never a team page | Content editor |
| **A testimony** | Content only, with all seven mandatory fields. Zero remains better than one that is short of them | Facts Register owner |
| **A component** | Visual Design System §34.3 addition test, then an amendment to this blueprint's inventory | Creative Director with technical lead |
| **A design value** — colour, size, space, duration | Visual Design System §49: not available to implementation. Amendment to the Visual Design System, applied everywhere at once | Creative Director |
| **A chapter** | Amend the Documentary Storyboard. This is the most expensive amendment in the system: every telling in every medium inherits the spine | Creative Director |
| **A medium** — print, exhibition, film, packaging | Documentary Storyboard §25.4: answer four questions and add a row to the medium table | Creative Director |
| **A feature** | R28.1, then the negative inventory ([§14](#14-components-that-must-never-be-built)) is checked first — most requests are already refused there | Creative Director with technical lead |
| **A measurement event** | UX Blueprint §50.2 and §50.3. Nothing that identifies an individual is ever added | Creative Director |

**R28.3 — An amendment applies everywhere, retrospectively, or it is not made** (Visual
Design System §49.2). A rule changed in one place and not the others is not an
amendment; it is the first exception, and the danger is the second, which cites it.

**R28.4 — Growth is content, not structure.** The site is designed so that a company
three times this size needs more records — not more surfaces, more components or more
navigation. **If growth is producing structure, something is being solved in the wrong
layer.**

**R28.5 — A request that fails the four questions is answered with the answer, once.**
Not re-litigated per instance. Atlas §35.13: do not negotiate the test.

**R28.6 — The documents are amended in versions, with change logs**, in the manner every
document in this set already uses. A rule changed without a version is a rule nobody can
audit, and a successor will assume it was always that way.

**R28.7 — Every expansion re-enters the review régime** ([§24](#24-how-review-happens)).
There is no lightweight path for small additions: a product record added carelessly in
year three is exactly how a catalogue feeling arrives.

### Dependencies

- Every route above depends on somebody holding the role named in the third column. If a
  role becomes vacant, the additions it governs stop until it is filled — which is
  correct, and is preferable to the alternative.

---
---

# PART XV — IMPLEMENTATION COMMANDMENTS

---

## 29. The thirty commandments

**Traces to:** Brand Bible P1–P5, D1–D8, §3 Brand DNA, §22 · Creative Direction Book
L1–L15 · Documentary Storyboard N1–N14 · Motion Direction M1–M15 · Visual Language Atlas
§35 · Visual Design System · UX Blueprint X1–X15

### Purpose

The short form. Thirty laws that bind the build, each traceable, each usable by somebody
who has read nothing else that day.

They add nothing new. They are the compression of eight documents into the sentences a
builder can hold in mind — and where one of them and a governing document disagree, the
document is right.

### Rules

**The work**

1. **Nothing decorative.** If it proves nothing, it does not exist. *(Atlas §35.7)*
2. **Nothing invented.** No fact, figure, image, name or claim that is not on the record.
   *(Brand Bible §19.2)*
3. **Nothing duplicated.** One fact, one place; one value, one place; one image, one
   crop. *(Brand Bible §3.3)*
4. **Nothing borrowed.** No stock, no placeholder, no generated image, at any stage,
   including internally. *(Photography Direction §24.5)*
5. **Nothing that could belong to a competitor.** *(Brand Bible D3)*

**The order**

6. **Evidence before explanation.** Show, then say. *(UX Blueprint E1)*
7. **Recognition before confidence.** Nobody believes a capability claim from a company
   they have not recognised. *(Brand Bible §8.2)*
8. **Trust after Recognition, never before.** A credential presented early is a badge.
   *(UX Blueprint X4)*
9. **The story order never changes.** Drop chapters; never re-order them. *(Documentary
   Storyboard N14)*
10. **A chapter is told whole or not at all.** *(Documentary Storyboard §25.1)*

**The visitor**

11. **One question per surface.** *(UX Blueprint X1)*
12. **One idea per view.** *(Creative Direction Book L1)*
13. **One action, once.** *(Brand Bible §3.4; UX Blueprint X5)*
14. **Never two major questions at the same moment.** *(UX Blueprint R6A.2)*
15. **Nothing follows the visitor.** No bar, no widget, no interruption, no return
    prompt. *(Creative Direction Book §22.4)*
16. **The site does not remember the visitor at them.** No tracking of an individual, no
    personalisation, no recommendation. *(UX Blueprint X15)*
17. **Nothing is gated.** No document, deck or catalogue in exchange for an email
    address. *(UX Blueprint E7)*
18. **The visitor draws the conclusion.** We supply facts and photographs, never the
    summary. *(Brand Bible P4)*

**The evidence**

19. **The photograph is the argument; everything else annotates.** *(Brand Bible D1)*
20. **An image too small to be examined is decoration.** *(Creative Direction Book §6.1)*
21. **The layout adapts to the image; the image is never cropped to fit.** *(Photography
    Direction §22.4)*
22. **Every image carries its record**, or it is not published. *(Photography Direction
    §24.4)*
23. **Where the evidence does not exist, the section does not exist.** Design around the
    absence. *(UX Blueprint X8)*
24. **A limit stated is evidence.** Publish what we cannot do as readily as what we can.
    *(Brand Bible §8.1 stage 6)*

**The build**

25. **Developers interpret nothing.** Find the rule, or escalate. *(§2)*
26. **Every element traces to a rule**, or it is removed. *(§3)*
27. **Boring and durable beats clever.** Build for ten years, not for this year. *(Brand
    Bible §3.5)*
28. **Performance is trust; truth outranks the appearance of speed.** Never disguise a
    wait. *(Motion Direction M11; §21)*
29. **Accessibility before decoration.** A person who cannot check us has not been
    offered the thing this company sells. *(§22)*
30. **A brand built on restraint is destroyed by exceptions, not by mistakes.** Amend the
    document or return the work. *(Atlas §35.13)*

**The three that outrank the rest, if there is time for only three**

> **Truth before beauty. One story. One company.**

### Dependencies

- Every commandment names its source; none may be applied against the document it comes
  from.
- Where a builder finds these thirty insufficient to decide something, the escalation
  path at R2.2 applies.

---
---

## 30. Self audit

**Traces to:** the self-audit convention of the Visual Design System §53 and the UX
Blueprint §55 · Visual Language Atlas §35

### Purpose

To state what this document verified before it was presented, what it found, and what it
knows is missing.

### Rules

**R30.1 — Verification performed:**

| Condition | Result | Evidence |
| --- | --- | --- |
| **Every previous phase respected** | Pass | All thirty chapters carry Traces to lines naming their parents across the eight approved documents. Three points of tension were found and resolved in favour of the earlier document (R30.2) |
| **No implementation code** | Pass | No markup, script, stylesheet, configuration or command appears |
| **No framework or tooling chosen** | Pass | No library, framework, platform, hosting arrangement or tool is selected, recommended or assumed. [§6](#6-ownership-at-every-level) assigns the technical means to the technical lead precisely so that this document does not have to |
| **No layouts** | Pass | The component inventory defines responsibility, timing and disappearance; no arrangement, position or composition appears |
| **No visual redesign** | Pass | No surface is redesigned; every surface reference points at UX Blueprint Part III |
| **No typographic, spatial, colour or motion values** | Pass | No value of any kind appears. Where a rule needs one, the governing section is named — Visual Design System §9, §21, §15, §42 respectively |
| **No CSS, React, Tailwind** | Pass | None appears. The only mentions of any of the three in this document are in this audit row |
| **No implementation decisions beyond architecture** | Pass | R2.6 and R6.2 explicitly reserve the technical means to the technical lead; this document decides order, ownership, inventory, dependency and acceptance only |
| **Internal references valid** | Pass | Every cross-reference points to a chapter-level anchor in this document and was checked mechanically against its headings |
| **Traceability complete** | Pass | Chapters 1–29 carry Traces to, Purpose, Rules and Dependencies; chapter 30 is this audit and carries the same four |

**R30.2 — Tensions found, and how they were resolved:**

| # | Tension | Resolution |
| --- | --- | --- |
| 1 | **Implementation order.** The brief's example order begins with Home, navigation, footer and shared components; UX Blueprint §51A — locked — orders surfaces as Home/Manufacturing/Enquiry, then Technology/Products/Quality, then Export/Gallery/Journal/About, then system and legal | Resolved at R8.2 by adding **Stage 0, the substrate**, which contains navigation, the footer, the shared components, the content engine and the publication gates. §51A orders *what the site says*; Stage 0 orders *what must exist for it to say anything*. **The locked surface sequence is untouched** |
| 2 | **An Image content object.** UX Blueprint Part X holds provenance as fields on the objects that carry photographs; the build needs one canonical record per image to enforce the single canonical crop and to avoid describing one photograph three ways | Resolved at R15.2 as a **build-layer consolidation, not a new model**: provenance requirements are unchanged and come from UX Blueprint R42.5 and Photography Direction §24.4; the consolidation is required by R7.1, one source of truth. Recorded here so the UX Blueprint can absorb it at its next version |
| 3 | **"Downloads" as a content object.** The brief lists downloads; UX Blueprint E7 forbids gating anything, and the negative inventory removes capability decks and brochures | Resolved at R15.1 and R15.7: the **Document** object exists for records that exist independently of the website — certificates, specification drawings, shipping documentation — and is **never gated and never exchanged for contact details**. Marketing material in a file is not a document |

**R30.3 — What this document knows is missing:**

| Missing | Consequence | Severity |
| --- | --- | --- |
| The photography library | Gates 2 and 3 at [§26](#26-the-launch-gates) cannot pass; Stage 1 can be built but not published | **Blocking for launch** |
| Access to a working shift | The root cause of the above, and of five other dependencies (R20.3) | **Blocking** |
| The Facts Register confirmations | Every `REGISTER` field stays withheld; four surfaces are thinner than intended | Gating, by design |
| Copy | Surfaces cannot be completed; stand-in text is forbidden (R6.4) | Blocking per surface |
| Typeface licensing | Stage 0 cannot complete | Blocking |
| A named person to answer enquiries | Gate 10 cannot pass, and it is the gate whose failure would be most damaging | Blocking |

**R30.4 — What this document deliberately withheld:**

| Withheld | Belongs to |
| --- | --- |
| Any technical means: stack, framework, hosting, tooling, testing apparatus | The technical lead (R6.2) |
| Any value, token, layout or component appearance | The Visual Design System |
| Any surface design, page structure or arrangement | Phase 8's execution, under the UX Blueprint and the Visual Design System |
| Shot lists, schedules, crew and access logistics | Production planning (Photography Direction §30.1) |
| Copy of any kind, including microcopy | Brand Bible §11 and §12 |
| Estimates, timelines and resourcing | Project management; this document orders the work and does not schedule it |

**R30.5 — The one thing this document cannot do.** It cannot make the site true. Every
gate, review and criterion here verifies that what is published is on the record and that
what is claimed is shown — but the record itself, and the access that produces the
evidence, belong to the company. **This blueprint can guarantee that nothing false is
published. Only the client can make sure there is enough that is true.**

### Dependencies

- This chapter depends on the dependency register at [§20](#20-the-dependency-register)
  being kept current; the missing items above are its blocking rows.

---

*End of document.*
