# Elite Export — UX Blueprint

**Phase 7.5**

| | |
| --- | --- |
| **Document** | UX Blueprint |
| **Version** | 1.1 |
| **Status** | **APPROVED** |
| **Phase** | Phase 7.5 |
| **Authority above this document** | Brand Bible v1.1 · Creative Direction Book v1.1 · Documentary Storyboard v1.0 · Photography Direction v1.0 · Visual Language Atlas v1.1 · Motion Direction v1.0 · Visual Design System v1.0 |
| **Owner** | Creative Director |
| **Audience** | Product designers, information architects, content authors, developers, and any agency inheriting this brand |
| **Supersedes** | Nothing |

### Change log

| Version | Change |
| --- | --- |
| 1.0 | Initial UX Blueprint. Fifty-five chapters, sixteen parts. Defines the experience architecture: why the site exists, who arrives, what every surface is responsible for, how visitors move, what is measured, and what Phase 8 must build. |
| 1.1 | Approved with amendments. Six chapters added in place — [6A Cognitive load principles](#6a-cognitive-load-principles), [13A Trust progression](#13a-trust-progression), [13B The emotional journey](#13b-the-emotional-journey), [38A Navigation logic](#38a-navigation-logic), [39A Decision fatigue](#39a-decision-fatigue), [51A Implementation priority](#51a-implementation-priority) — and R16.1 clarified so that Home may open the story without indexing the site. **No chapter was removed, renumbered or rewritten**, and no page responsibility changed. |

### On the numbering of v1.1

The six added chapters carry letter-suffixed numbers so that they sit where they
belong without renumbering an approved document. Chapters 1 to 55 are unchanged and
every reference to them written against v1.0 remains correct. The convention is the
same one the brand-document track used when the Visual Language Atlas was inserted:
**insert and record, never renumber.**

---

## Purpose

Seven documents precede this one. They establish who the company is, what it looks
like, how it tells its story, how it photographs it, why that works, how it moves,
and the measured rules that govern every surface.

**None of them says what pages exist.**

That is deliberate. The Creative Direction Book gives every page an emotional brief
and refuses to design one; the Brand Bible gives every page a buyer question and a
brand obligation and stops there; the Visual Design System supplies numbers and
explicitly withholds "any page, surface, section or arrangement".

This document is the bridge. It defines **the experience architecture**: what
surfaces exist, what each is responsible for, how a visitor moves between them,
what they are asked, what they are never asked, what is recorded, and what must be
true before implementation begins.

### What this document contains

Responsibility, sequence and behaviour. A designer reading this and the seven above
it should be able to state, for any surface: why it exists, what question it
answers, what evidence discharges that obligation, what the visitor does next, and
what may never appear on it.

### What this document does not contain

No typography, spacing, colour, photography direction, motion, layout, grid,
component design, measurement or code. Those belong to the seven locked documents
above and to Phase 8 below. Where a rule here has a visual consequence, this
document names the locked rule that governs it and stops.

**No page is designed here.** A page's *responsibility* is architecture; a page's
*arrangement* is Phase 8 working under the Visual Design System.

### The rule of this document

Where this document conflicts with any of the seven above it, **the earlier
document wins and this one is wrong**, and the remedy is a new version of this
document rather than an exception.

Every chapter carries four things: **Traces to**, **Purpose**, **Rules**, and
**Dependencies**. A chapter that cannot fill all four is not a chapter — it is an
opinion, and there are to be no more opinions.

### The test this document must pass

> **A developer should never have to ask: what page is this, what happens next,
> what is the action, and what is the visitor trying to do.**

If any of those four questions can be asked during implementation and this document
does not answer it, this document is incomplete and is amended — not improvised
around.

---

## Table of contents

**Part I — Experience principles**

1. [Why the website exists](#1-why-the-website-exists)
2. [Success, and how it is judged](#2-success-and-how-it-is-judged)
3. [The visitor](#3-the-visitor)
4. [Objectives: the company's and the visitor's](#4-objectives-the-companys-and-the-visitors)
5. [Experience principles](#5-experience-principles)
6. [The experience laws](#6-the-experience-laws)
   - [6A. Cognitive load principles](#6a-cognitive-load-principles)

**Part II — User psychology**

7. [How to read the buyer profiles](#7-how-to-read-the-buyer-profiles)
8. [The OEM buyer](#8-the-oem-buyer)
9. [The retail brand owner](#9-the-retail-brand-owner)
10. [The procurement manager](#10-the-procurement-manager)
11. [The international importer and distributor](#11-the-international-importer-and-distributor)
12. [The secondary visitors](#12-the-secondary-visitors)
13. [The evidence ladder: what actually changes a mind](#13-the-evidence-ladder-what-actually-changes-a-mind)
    - [13A. Trust progression](#13a-trust-progression)
    - [13B. The emotional journey](#13b-the-emotional-journey)
14. [The objection register](#14-the-objection-register)

**Part III — Information architecture**

15. [The page set, and the rule that closes it](#15-the-page-set-and-the-rule-that-closes-it)
16. [Home](#16-home)
17. [Manufacturing](#17-manufacturing)
18. [Technology](#18-technology)
19. [Products](#19-products)
20. [Quality](#20-quality)
21. [Export](#21-export)
22. [About](#22-about)
23. [Gallery](#23-gallery)
24. [Journal](#24-journal)
25. [Enquiry](#25-enquiry)
26. [System and legal surfaces](#26-system-and-legal-surfaces)

**Part IV — User journeys**

27. [How a journey is written](#27-how-a-journey-is-written)
28. [Journey: the first-time visitor](#28-journey-the-first-time-visitor)
29. [Journey: the returning visitor](#29-journey-the-returning-visitor)
30. [Journey: the OEM buyer](#30-journey-the-oem-buyer)
31. [Journey: the retail brand](#31-journey-the-retail-brand)
32. [Journey: the procurement manager](#32-journey-the-procurement-manager)
33. [Journey: the international buyer](#33-journey-the-international-buyer)

**Part V — Page hierarchy**

34. [The six classes of surface](#34-the-six-classes-of-surface)

**Part VI — Content priority**

35. [The five priority bands](#35-the-five-priority-bands)
36. [Priority by surface](#36-priority-by-surface)

**Part VII — Navigation**

37. [Navigation behaviour](#37-navigation-behaviour)
38. [Cross-linking, breadcrumbs and the small field](#38-cross-linking-breadcrumbs-and-the-small-field)
    - [38A. Navigation logic](#38a-navigation-logic)

**Part VIII — Call to action**

39. [The action strategy](#39-the-action-strategy)
    - [39A. Decision fatigue](#39a-decision-fatigue)

**Part IX — Forms**

40. [The enquiry flow](#40-the-enquiry-flow)
41. [Fields, validation, error and success](#41-fields-validation-error-and-success)

**Part X — Content models**

42. [How a content model is written](#42-how-a-content-model-is-written)
43. [The work: category, product, stage, machine](#43-the-work-category-product-stage-machine)
44. [The proof: certification, factory, country, testimony](#44-the-proof-certification-factory-country-testimony)
45. [The words: article, question, person](#45-the-words-article-question-person)

**Part XI — Search and discovery**

46. [Search, filtering, browsing and relatedness](#46-search-filtering-browsing-and-relatedness)

**Part XII — States**

47. [The ten states](#47-the-ten-states)

**Part XIII — Responsive experience**

48. [What survives a smaller field](#48-what-survives-a-smaller-field)

**Part XIV — Accessibility experience**

49. [Accessibility as experience](#49-accessibility-as-experience)

**Part XV — Analytics**

50. [What is recorded, and what is never recorded](#50-what-is-recorded-and-what-is-never-recorded)

**Part XVI — Implementation handoff**

51. [What Phase 8 must build](#51-what-phase-8-must-build)
    - [51A. Implementation priority](#51a-implementation-priority)
52. [What Phase 8 may not decide](#52-what-phase-8-may-not-decide)
53. [Open questions and dependencies](#53-open-questions-and-dependencies)
54. [Approval checklist](#54-approval-checklist)
55. [Self audit](#55-self-audit)

---
---

# PART I — EXPERIENCE PRINCIPLES

---

## 1. Why the website exists

**Traces to:** Brand Bible §5 why we exist, §6.2 what the buyer is actually doing,
§22 the one sentence · Documentary Storyboard §25.2 the medium table · Creative
Direction Book §19 what a page is for

### Purpose

To state the single job of this medium, so that every later decision in this
document can be measured against it rather than against preference.

### Rules

**R1.1 — The website exists to let a buyer verify a manufacturer without leaving
their desk.** Brand Bible §22: the company would rather be verified than believed.
The website is the instrument of verification, and nothing else it does matters if
that fails.

**R1.2 — The website answers exactly one question**, and it is the buyer's, not
ours (Brand Bible §6.2):

> *Is this a real factory, or a trading house with a good website?*

Everything published either helps answer it or wastes the visitor's time. That is
the standing test for admitting any surface, any section, any field and any
sentence to this system.

**R1.3 — The website is the only medium that carries the whole story.** Documentary
Storyboard §25.2 assigns it C1–C10 complete, with Evidence as its leading DNA word,
and names its characteristic failure: **becoming a brochure**. Brand Bible §8.3
assigns it all seven emotional stages, complete, handing off to an enquiry.

No other medium is asked to do this. A stand carries three chapters; a catalogue
carries six. The website is the complete telling, and it is therefore the only
place where dropping a chapter is a defect rather than a compression.

**R1.4 — The website is not a shop, a catalogue, a lead funnel or a campaign
target.** Each of those is a different medium with a different job, and adopting any
of their mechanics converts this one into the brochure §25.2 forbids.

**R1.5 — The website ends in one action, once** (Documentary Storyboard §25.2,
"Ends by: one action, once"). Not a sequence of conversions, not a nurture path, not
a choice of three ways to engage.

### Dependencies

- The Facts Register (Brand Bible §19) is binding at publication on every surface
  here. Where a fact required by a surface is unconfirmed, the surface is built
  without it ([§53](#53-open-questions-and-dependencies)).
- The photography library does not yet exist. Every surface in Part III specifies
  what it needs from the library, and several cannot be completed until it does
  (Photography Direction §30.2).

---

## 2. Success, and how it is judged

**Traces to:** Brand Bible §8.1 stage 7, §19.5 standing instructions · Visual
Language Atlas §35.4 the Memory Test · Creative Direction Book §26 the universal
review

### Purpose

To define what a successful visit is, in terms the company can act on, and to
remove the measures that would quietly redesign the site if they were adopted
instead.

### Rules

**R2.1 — The definition of a successful visit:**

> **A buyer who arrived sceptical leaves able to state one specific thing about how
> this company works that they could not have learned from a competitor's website —
> and knows exactly how to start a conversation.**

Both halves are required. The first is Recognition (Brand Bible §8.1 stage 3); the
second is Conversation (stage 7). A visit that produces the first without the second
has done the hard part and failed at the easy one. A visit that produces the second
without the first produces an enquiry that will not survive the buyer's own internal
review.

**R2.2 — The definition of a successful enquiry:**

> **An enquiry that contains a specification, a drawing or a reference sample, from
> somebody with the authority to place an order, that a named person at Elite Export
> can answer in one reply.**

Volume of enquiries is not a measure. Ten enquiries with no specification are worth
less than one with a drawing attached, and a site optimised for the first number
will produce exactly that.

**R2.3 — Success is judged at three horizons**, because a supplier relationship is
measured in decades (Brand Bible P5):

| Horizon | Question | Judged by |
| --- | --- | --- |
| **The visit** | Did Recognition occur? | The depth reached in the Manufacturing chapter set, and whether the Gallery was opened ([§50](#50-what-is-recorded-and-what-is-never-recorded)) |
| **The enquiry** | Was it specific? | Whether a specification, drawing or sample reference arrived with it |
| **The relationship** | Was the site the reason the conversation was easy? | Reported by the person who answers the enquiries, not inferred |

**R2.4 — Measures that are explicitly rejected**, and the reason each would damage
the brand if adopted:

| Rejected measure | What it would cause |
| --- | --- |
| Time on site | Rewards padding and punishes the surfaces that answer quickly (Creative Direction Book §19.1) |
| Bounce rate | A visitor who arrives on Quality, reads it, and writes an email has bounced. That is a success |
| Conversion rate | Optimising it means adding actions, and Brand Bible §3.4 permits one |
| Page views per session | Rewards fragmenting a chapter across surfaces |
| Newsletter signups | The medium does not have a newsletter ([§39.5](#39-the-action-strategy)) |
| Ranking for category terms | Category terms are what an intermediary competes for (Atlas §35.2) |

### Dependencies

- [§50](#50-what-is-recorded-and-what-is-never-recorded) defines what may be
  recorded, under a constraint inherited from the Visual Design System: the brand
  does not track an individual's route through its own site.
- Brand Bible §19.5: any promise published becomes an operational commitment. A
  stated reply time is a commitment, not a conversion device
  ([§41.6](#41-fields-validation-error-and-success)).

---

## 3. The visitor

**Traces to:** Brand Bible §6 the buyer, §6.3 what they bring, §6.4 what they need
to leave with · Creative Direction Book §4 how a buyer should experience the brand

### Purpose

To fix who this system is designed for, and — equally important — who it is not
designed for, so that no surface is later justified by an audience the brand does
not serve.

### Rules

**R3.1 — The primary visitor is a professional performing due diligence.** Brand
Bible §6.1: a sourcing manager, product developer, brand owner or importer,
frequently in Germany, the UK, the United States or Australia, with two or three
competitors open in other tabs. **They are not shopping.**

**R3.2 — The primary visitor is assumed to be:**

- **Sceptical**, from previous suppliers (§6.3)
- **Accountable**, personally, for a compliance obligation (§6.3)
- **Impatient with marketing language** (§6.3)
- **In possession of a specification, a drawing or a physical sample** (§6.3)
- **Technically literate about leather and about manufacturing** — able to tell an
  informed sentence from a plausible one, which is why Recognition works at all

**R3.3 — The secondary visitors, in order of weight**, are defined at
[§12](#12-the-secondary-visitors): the buyer's technical colleague, the buyer's
compliance or procurement colleague, an agent or sourcing consultant, an existing
buyer returning for a record, a candidate, and a journalist or student. **No surface
exists for a secondary visitor alone**; secondary visitors are served by surfaces
built for the primary one.

**R3.4 — Explicitly not the visitor.** The consumer. This is not a consumer brand,
the products are frequently sold under somebody else's label (Brand Bible §4), and
a single consumer-facing mechanic — a price, a cart, a wishlist, a review — would
reclassify the whole system for the professional visitor within seconds.

**R3.5 — The visitor is assumed to arrive anywhere.** Creative Direction Book L15:
no surface may depend on another to make sense. This is not a courtesy; a buyer
performing due diligence arrives from a search result, a colleague's link, or a
supplier list, and the Home surface is frequently not the first thing they see.

### Dependencies

- Part II defines each buyer type in the detail required to design for them.
- [§15.3](#15-the-page-set-and-the-rule-that-closes-it) states the standing rule
  that every surface must independently establish that a real factory is speaking.

---

## 4. Objectives: the company's and the visitor's

**Traces to:** Brand Bible §5 why we exist, §6.4 what they need to leave with, §21
how every page supports the brand

### Purpose

To separate what the company needs from what the visitor needs, so that a conflict
between them is resolved by rule rather than by whoever is in the room.

### Rules

**R4.1 — The company's objectives**, in priority order:

1. **Be verifiable.** Every claim checkable, every figure traceable to the record.
2. **Produce Recognition.** The one effect the brand exists to create.
3. **Receive specific enquiries** from buyers with authority
   ([§2](#2-success-and-how-it-is-judged)).
4. **Cost nothing in trust.** No promise published that operations cannot keep
   (Brand Bible §19.5).
5. **Outlast a decade** without a redesign (Brand Bible P5).

**R4.2 — The visitor's objectives**, in the order they pursue them:

1. **Establish that the building exists and the company is in it.**
2. **Establish that the work is done to a standard**, and see the standard applied.
3. **Establish that the standard is checked by somebody outside the company.**
4. **Establish that capability matches their requirement** — process, equipment,
   breadth, reach.
5. **Establish the risk of contacting** — who reads it, what happens next.
6. **Leave with something they can show a colleague.**

Objective 6 is routinely forgotten and it decides the shape of several surfaces: a
buyer rarely decides alone. **Every surface must survive being sent as a link to a
technical or compliance colleague who has not read anything else.**

**R4.3 — The conflict rule.** Where a company objective and a visitor objective
conflict, **the visitor's objective wins**, with one exception: where the visitor
wants a fact the Facts Register forbids publishing, neither is served — the fact is
withheld and the surface says plainly that it is available on enquiry.

That exception is not a hedge. Brand Bible §19.2: anything unconfirmed is removed,
not softened. Saying "on enquiry" is a statement about process, not a softened
claim.

### Dependencies

- Brand Bible §19.4 lists what is currently unconfirmed. It includes capacity, lead
  times, MOQs, incoterms and machine specifications — several of which are exactly
  what a procurement visitor arrives to find ([§10](#10-the-procurement-manager)).
- [§39](#39-the-action-strategy) defines the single action that serves objective 5.

---

## 5. Experience principles

**Traces to:** Brand Bible P1–P5, §3 Brand DNA · Creative Direction Book §19.1 the
three rules for every page · Visual Language Atlas §35 the ten tests

### Purpose

To convert the brand's principles into the small number of statements that decide
experience questions — sequence, disclosure, friction and demand.

### Rules

**E1 — Evidence before assertion, on every surface.** A surface states nothing it
has not already shown or cannot immediately support. This is P1 applied to sequence:
the order of a surface is evidence, then claim, never claim, then evidence.

**E2 — The visitor draws the conclusion.** P4. No surface summarises itself, tells
the visitor what to think, or supplies the sentence the visitor should repeat to a
colleague. Supply the facts and the photographs; the sentence forms on its own and
is believed because it did.

**E3 — Every surface answers its question before it elaborates** (Creative Direction
Book §19.1). The obligation is discharged first. Elaboration is for the visitor who
stayed.

**E4 — Every surface can be somebody's first** (L15, Creative Direction Book §19.1).
No surface assumes a prior visit, a prior surface, or a remembered fact.

**E5 — Every surface ends knowing what comes next** (Creative Direction Book §19.1)
— stated plainly, never demanded.

**E6 — Friction is removed from the visitor and accepted by the company.** A form
field that exists to qualify a lead is friction moved onto the buyer. Where
information can be obtained by asking a human being later, it is not asked for now
([§41](#41-fields-validation-error-and-success)).

**E7 — Nothing is gated.** No content behind a form, an email address, a login, or
a "request access". A brand whose position is *you may examine us* does not charge
admission for the examination. This removes the gated capability deck, the gated
catalogue and the gated specification sheet from the system permanently.

**E8 — Depth is available, never imposed.** The visitor who wants the specification
reaches it in one step; the visitor who wants the argument is never made to pass
through the specification. This is what the surface hierarchy in
[§34](#34-the-six-classes-of-surface) exists to arrange.

**E9 — The company's limits are published as readily as its capabilities.** Brand
Bible §8.1 stage 6: Respect is generated almost entirely by what is not there, and
by the sentence admitting a limit.

**E10 — No surface asks twice.** L10: a fact, a mark or a call appears once. An
action repeated three times down a surface reads as insecurity, and insecurity is
the one impression a manufacturer cannot afford.

### Dependencies

- E7 has a commercial consequence the company must accept: there is no mechanism in
  this system for capturing an email address in exchange for a document. Recorded as
  an open question at [§53](#53-open-questions-and-dependencies) only because it will
  be requested, not because it is undecided.
- E6 and E10 govern Part IX in full.

---

## 6. The experience laws

**Traces to:** Creative Direction Book §21 L1–L15 · Documentary Storyboard §2 N1–N14
· Motion Direction §2 M1–M15 · Visual Design System §2, §23, §35

### Purpose

The locked documents each carry a set of laws for their own discipline. This chapter
adds the set for experience, and it is the last set this brand will produce. They
bind every surface, every journey and every state.

### Rules

**X1 — One question per surface.** Every surface answers the question assigned to it
at Part III. A surface answering two questions has answered neither, and the second
question belongs to a surface that does not exist yet.

**X2 — The chapter order is never re-ordered.** Documentary Storyboard N14 and §25.1:
drop chapters, never re-order them. The site's structure is the canonical chapter
order, and no navigation, no filter and no cross-link may present the story out of
sequence.

**X3 — Recognition is never optional.** Every journey in Part IV passes through C3
or C7 (Documentary Storyboard §25.1 rule 2). A path through this site that reaches
the enquiry without passing through a decision being taken is a broken path.

**X4 — Trust arrives after Recognition, never before** (Brand Bible §8.1 stage 4).
No certification, audit mark or credential appears earlier in a journey than the
process that earned it.

**X5 — One action per surface, and one action for the site**
([§39](#39-the-action-strategy); Visual Design System §35.2).

**X6 — Nothing follows the visitor.** No persistent bar, no re-appearing offer, no
exit-intent interruption, no chat widget, no notification. Creative Direction Book
§22.4: an element that follows the visitor destroys every held moment on the surface.

**X7 — No surface is a dead end.** Every surface states the next reasonable step,
and every deep surface offers a route back up its own hierarchy that does not rely
on the browser.

**X8 — Nothing is invented to fill a surface.** Where the evidence for a section
does not exist, the section does not exist. Photography Direction §30 and Brand
Bible §19.2 are identical in shape: absent evidence is designed around, never
substituted for.

**X9 — The visitor is never asked to identify themselves to receive information**
(E7).

**X10 — No surface names or characterises a competitor.** Brand Bible §7.2:
defensiveness is the subtlest failure.

**X11 — A limit is stated where the capability would be claimed**, on the same
surface, not on a separate one (E9).

**X12 — Every fact carries its route to verification** where one exists: an
issuing body, a certificate reference, a date, a named place. A fact with no route
to verification is either on the Facts Register or it is removed.

**X13 — Every surface survives being sent as a link, alone, to a colleague**
(R4.2 objective 6, L15).

**X14 — Time is never disguised.** A wait is stated (Motion Direction M11; Visual
Design System §38.4). This applies to a form submission, a search, and a promised
reply time equally.

**X15 — The site does not remember the visitor at them.** No "welcome back", no
"continue where you left off", no personalised ordering, no recently-viewed rail.
The Visual Design System removed the visited-link state for this reason; the
architecture removes the rest of the pattern. A supplier that surveils a buyer's
browsing has changed the relationship the Brand Bible describes.

### Dependencies

- X15 constrains [§50](#50-what-is-recorded-and-what-is-never-recorded) absolutely:
  measurement is aggregate, never a per-person trail.
- X2 constrains [§37](#37-navigation-behaviour) and
  [§46](#46-search-filtering-browsing-and-relatedness): navigation and relatedness
  may not reorder the story.

---

## 6A. Cognitive load principles

**Traces to:** Visual Language Atlas §2 why we see before we read, §14 hierarchy is a
kindness, §23 why interfaces should become invisible · Creative Direction Book §16.1
one entry point, L1, L13 · Brand Bible §6.3 very little patience for marketing
language · Motion Direction §19.1 consistency is a refund of attention

### Purpose

To state how much mental work this system is permitted to ask of a visitor, and to
fix the rules that keep that work spent on the company rather than on the site.

The Atlas establishes that flatness transfers labour to the reader — somebody with
less context, less time and no obligation to do it — and that the labour is felt as
*this is tiring* rather than identified as a defect. This chapter is the experience
form of that finding. It contains no layout: every rule here is about **what the
visitor is asked to do**, not about how anything is arranged.

### Rules

**R6A.1 — One important decision at any one moment.** A visitor is never holding two
open questions about what to do next. Where a surface would present a second, it is
moved to a different moment in the journey or it is removed (L13).

The site's decisions are few and are enumerable: *do I open a second surface*
(R28.2), *do I go deeper into this hierarchy*, *do I send this to a colleague*, and
*do I write*. Nothing else in this system is a decision, and nothing may be added to
that list without amending this document.

**R6A.2 — Never ask two major questions together.** A major question is one whose
answer changes what the visitor does next. "Which category is mine?" and "should I
enquire?" are both major; presenting them at the same moment produces arbitration
rather than either answer.

Minor questions — which of five destinations, which sibling record — may coexist,
because their answers are reversible in one step (R37.10).

**R6A.3 — Reduce reading before proof.** The visitor's first act is to look, not to
read (Atlas §2: the frame is set before reading). Before Recognition, the words on a
surface are the smallest quantity that lets the evidence be understood — because a
sceptical buyer reads marketing prose as a cost and evidence as a reason to stay.

After Recognition the tolerance for reading rises sharply, which is why
Manufacturing may be the longest surface in the brand (R17.1) and Home may not.

**R6A.4 — Evidence before explanation, always** (E1). An explanation preceding its
evidence asks the visitor to hold a claim in mind while deciding whether to believe
it. Reversing the order removes that work entirely: they see the thing, and the
sentence beside it costs nothing to accept.

**R6A.5 — One dominant thing to attend to per view.** Inherited from L1 and Creative
Direction Book §16.1: every field has one entry point, and two elements of equal
claim produce a small act of arbitration experienced as friction. This document adds
only the experience consequence — **the visitor is never required to choose what to
look at first**, and a surface where two people would name different entry points has
failed the test at Visual Design System §2.5.

**R6A.6 — Remove unnecessary mental work.** The complete list of work this system
refuses to impose:

| Never required | Instead |
| --- | --- |
| Converting a unit | Every dimension carries its unit (R33.4) |
| Decoding jargon | A term used is a term explained where it is first used, or it is the buyer's own vocabulary (Brand Bible §11.1) |
| Performing arithmetic | A derived fact is stated, not implied by two others |
| Remembering something from another surface | Every surface is complete alone (E4) |
| Guessing a format | Dates, references and identifiers are unambiguous (R49.10) |
| Classifying themselves | No audience selectors, no "I am a…" paths (R7.3) |
| Working out what a mark means | Every state and status is also a word (R49.7) |
| Reconstructing a hierarchy | Position is stated where a hierarchy is real (R38.4) |

**R6A.7 — Nothing must be held in mind across surfaces.** A visitor who has to
remember a figure from Technology to understand a sentence on Products has been given
homework. Where two facts depend on each other, they appear together or the second
restates what it depends on.

**R6A.8 — Load spent on the interface is load stolen from the subject.** Motion
Direction §19.1 establishes that predictable behaviour is a *refund* of attention.
The same is true structurally: a visitor who has learned how one surface behaves
should never have to re-learn it, which is why every surface class behaves
identically ([§34](#34-the-six-classes-of-surface)) and why the action is worded the
same everywhere (R39.8).

**R6A.9 — The one-sentence test.** After any surface, the visitor should be able to
say in one sentence what it established. If a surface needs two sentences, it is
answering two questions and violates X1.

**R6A.10 — The colleague test.** A visitor should be able to forward one surface to a
colleague with no covering explanation (X13). If an explanation is needed, the
surface has left work undone and moved it onto the buyer.

### Dependencies

- R6A.5 depends on the Visual Design System §2.5 and §5.4 for its measurable form;
  this document states only the obligation.
- R6A.3 constrains content authoring more than design: it is a limit on quantity of
  prose before the Recognition moment of each surface
  ([§36](#36-priority-by-surface)).
- R6A.6 row four is a constraint on the Facts Register presentation: a derived figure
  is still a figure and is still governed by Brand Bible §19.

---

---

# PART II — USER PSYCHOLOGY

---

## 7. How to read the buyer profiles

**Traces to:** Brand Bible §6 the buyer, §8 the emotional journey · Creative
Direction Book §4 how a buyer should experience the brand

### Purpose

To state what a profile in this Part is, and what it is not, so that the four
profiles are used to decide architecture rather than to write copy about personas.

### Rules

**R7.1 — These are not personas.** No names, no photographs, no invented biography,
no "day in the life". Brand Bible §19.3 classifies invented detail as unpublishable;
a persona is invented detail used to make decisions, which is worse than publishing
it. Each profile below states only what is **structurally true of the role**.

**R7.2 — Every profile answers the same eleven questions**, in the same order, so
they can be compared: who they are, what they already know, what they doubt, what
they need, what evidence changes their mind, typical objections, decision timeline,
buying behaviour, risk level, confidence level, and the surface that serves them
first.

**R7.3 — The four profiles are roles, not people, and one person may be two of
them.** In a small brand the owner is the OEM buyer and the procurement manager at
once. The architecture must therefore serve all four without segmenting the site:
**there are no audience paths, no "I am a…" selectors, and no role-based
navigation.** A site that asks a buyer to classify themselves has asked them to work
before it has proved anything.

**R7.4 — All four share one doubt**, and it outranks the differences between them
(Brand Bible §6.2): *is this a real factory, or a trading house with a good
website?* The differences below decide **which evidence resolves that doubt
fastest**, not whether it must be resolved.

### Dependencies

- Part IV converts each profile into a journey.
- [§13](#13-the-evidence-ladder-what-actually-changes-a-mind) collects the evidence
  types the profiles reference.

---

## 8. The OEM buyer

**Traces to:** Brand Bible §4 who we are, §5 the two fears, §6, §17 material
philosophy · Documentary Storyboard §7 C3, C5

### Purpose

The primary visitor: a product developer or sourcing manager at a brand that will
sell the goods under **its own label**, made to **its own specification**.

### Rules

| Question | Answer |
| --- | --- |
| **Who they are** | Product development or sourcing, at an equestrian, outdoor or leather-goods brand. Frequently technical: they have handled a skiving machine or watched a stitching line, or they work with somebody who has |
| **What they already know** | Leather grades and their commercial names. What a specification contains. That most "manufacturers" they find online are intermediaries. That the sample is always good and the fourth hundred is the question |
| **What they doubt** | That the floor is ours. That the sample-maker and the line are the same operation. That the standard survives volume and staff turnover |
| **What they need** | To see a decision being taken by a person, on our floor, with consequences; to see the joining operation in detail; to know a specification can be held and a reference sample matched |
| **What changes their mind** | **C3, the decision** — cutting along the backbone, a hide judged and refused. It is unglamorous, costly, consequential and specific, and it cannot be faked by an intermediary. Second: **C5, the joining**, watched twice |
| **Typical objections** | "Every supplier says they own the factory." "The photographs could be anyone's." "You can make one; can you make four thousand the same?" "What happens when the piece is wrong?" |
| **Decision timeline** | Weeks to months. The site visit is one of several; a sample round follows; the first order is small and is a test |
| **Buying behaviour** | Comparative and evidential. Shortlists three, sends the same specification to all three, judges the replies as much as the samples |
| **Risk level** | **High.** Their name is on the product; a failure is theirs, not ours |
| **Confidence level** | Low at arrival, and it recovers only through observed mechanism — never through assertion |
| **Served first by** | [Manufacturing](#17-manufacturing), reached from anywhere in one step |

**R8.1 — The OEM buyer is the visitor the site is architected around.** Where two
profiles want different things, this one decides, because Brand Bible §4 establishes
that the company's work frequently carries somebody else's label and this is the
person who owns that label.

**R8.2 — The C5 rule.** Documentary Storyboard §7.1: C5 is the chapter a buyer's
technical colleague will watch twice. Therefore **the joining passage must be
independently linkable and must make sense alone** (X13).

### Dependencies

- Requires E1-rank photography of a decision being taken (Photography Direction
  §5.1). Without it, the OEM buyer's journey cannot reach Recognition and no other
  surface compensates.
- Brand Bible §19.4 forbids publishing rejection rate and AQL band — the figures
  this buyer would most like. [§20](#20-quality) states the mechanism instead.

---

## 9. The retail brand owner

**Traces to:** Brand Bible §6.1, §16.4 luxury, §18 people philosophy · Creative
Direction Book §20 Products · Documentary Storyboard §7 C6, C9

### Purpose

A founder or owner of a small or mid-sized brand, buying a line rather than
commissioning a specification, and buying a partner as much as a product.

### Rules

| Question | Answer |
| --- | --- |
| **Who they are** | Owner, or head of product, at a brand of five to fifty people. Often the person who will also answer the customer complaint personally |
| **What they already know** | Their market and their customer. Materials, in commercial rather than technical terms. Less about manufacturing process than the OEM buyer, and they know it |
| **What they doubt** | That a factory of our scale will take them seriously. That their volume is worth our attention. That the finish and the consistency will match the story they tell their own customers |
| **What they need** | To see breadth without being sold a catalogue; to see finishing done where nobody is checking; to see whose name goes on the goods; to feel that the company would still answer the phone at their order size |
| **What changes their mind** | **C6, the finishing** — care taken after it stops being visible. Then **C9, what leaves** — the fact that the label is frequently not ours, which tells them exactly what relationship is on offer |
| **Typical objections** | "We're probably too small for you." "Will it look like everything else in the category?" "Can I get consistency across a repeat order in a year's time?" |
| **Decision timeline** | Weeks. Faster than the OEM buyer, and more emotional: they are choosing somebody to work with |
| **Buying behaviour** | Relationship-led. Reads the About and Journal surfaces properly, which the other profiles skim. Decides partly on tone |
| **Risk level** | **High and personal.** Their brand is their livelihood, and a bad supplier is an existential event rather than a procurement error |
| **Confidence level** | Moderate at arrival, and easily lost by any hint of being processed |
| **Served first by** | [Products](#19-products), then [Manufacturing](#17-manufacturing) |

**R9.1 — This is the only profile for whom tone is load-bearing evidence.** Brand
Bible §9's floor manager — answers the question, then stops talking — is what
persuades this visitor. It is also why [Journal](#24-journal) exists at all.

**R9.2 — Minimum order quantity is this visitor's first real question and it is on
the unconfirmed list** (Brand Bible §19.4). Until confirmed, the Products surface
states plainly that quantities are discussed on enquiry, and the Enquiry surface asks
for the quantity rather than filtering by it ([§41](#41-fields-validation-error-and-success)).

### Dependencies

- Requires C6 and C9 coverage in the library.
- [§19](#19-products) must not become a store, and this is the profile that most
  invites it to (Creative Direction Book §20, Products: "never behave like a store").

---

## 10. The procurement manager

**Traces to:** Brand Bible §6.3 compliance obligation, §19 the Facts Register ·
Documentary Storyboard §7 C7, C8 · Creative Direction Book §20 Quality, Export

### Purpose

The visitor who arrives with a checklist, is accountable to an auditor, and is often
the person who can veto but not select.

### Rules

| Question | Answer |
| --- | --- |
| **Who they are** | Procurement, compliance, or quality at a larger buyer. Frequently arrives second, after a colleague has shortlisted us |
| **What they already know** | Their own compliance framework and what it will accept. Which certifications are real and which are decorative. That a certificate PDF proves less than the process behind it |
| **What they doubt** | That documentation exists at the time the work happens rather than being assembled afterwards. That a failure would be traceable. That we would tell them about a problem |
| **What they need** | Named issuing bodies, certificate references and dates; evidence of documentation produced during the work; a stated route for a complaint or a non-conformance; export documentation competence |
| **What changes their mind** | **C7, the gate** — a rejection observed, not an approval. Then **C8, the record** — documentation produced during the work. Both are process evidence, and both outrank a certificate |
| **Typical objections** | "Anyone can buy a certificate." "Who audits you, and when did they last visit?" "What is your non-conformance procedure?" "Can you provide documentation for customs in my market?" |
| **Decision timeline** | Days for the check, then it stops being their decision. They are a gate, not a buyer |
| **Buying behaviour** | Checklist-driven, unemotional, adversarial by role rather than by temperament. Will look for the thing that is missing |
| **Risk level** | **High professionally, low personally.** Their exposure is being the person who approved a supplier that failed |
| **Confidence level** | Neutral. They neither believe nor disbelieve; they verify |
| **Served first by** | [Quality](#20-quality), then [Export](#21-export) |

**R10.1 — This is the profile most damaged by an unverifiable number.** Brand Bible
§8.1 stage 5: an unverifiable capacity figure turns Confidence permanently back into
scepticism. For this visitor, one unconfirmed figure invalidates the surface it sits
on.

**R10.2 — This visitor must be able to reach every certification record in one step
from anywhere**, and each record must carry its issuing body, reference and date
([§44](#44-the-proof-certification-factory-country-testimony)). A certification
without those three is not published (X12).

**R10.3 — The limits are evidence for this visitor.** A plainly stated "we do not do
X" is read as a control, not as a weakness (E9, Brand Bible §8.1 stage 6).

### Dependencies

- Everything this profile wants is exposed to the Facts Register. Brand Bible §19.4
  currently forbids the AQL band, rejection rate, inspection gate count and lead
  times. [§20](#20-quality) is therefore built on **mechanism** rather than on
  figures, and is structured so that confirmed figures can be added later without
  redesign.
- Requires C7 coverage, which Documentary Storyboard §29.3 item 7 records as
  unresolved: a rejection must be observed rather than arranged.

---

## 11. The international importer and distributor

**Traces to:** Brand Bible §6.1 geography, §19.4 incoterms · Creative Direction Book
§20 Export · Documentary Storyboard §7 C9

### Purpose

The visitor buying for a market rather than for a product line: an importer,
distributor or agent whose question is whether the goods can reach them, correctly
documented, repeatedly.

### Rules

| Question | Answer |
| --- | --- |
| **Who they are** | Importer, distributor, or a buyer at a business that stocks rather than designs. Germany, the UK, the United States, Australia, and adjacent markets |
| **What they already know** | Their own customs regime, duties, and what documentation their broker requires. Shipping realities. That most suppliers are optimistic about lead times |
| **What they doubt** | That documentation will be right first time. That the stated lead time survives a real order. That somebody will answer when a shipment is delayed |
| **What they need** | To see dispatch and packing as an operation; to know which markets we already ship to; to know what documentation is issued and by whom; to know who answers when something goes wrong |
| **What changes their mind** | **C9, what leaves** — packing, labelling, and the fact that the name on the goods is frequently not ours. Then the plain statement of markets already served |
| **Typical objections** | "Have you shipped to my market before?" "Who prepares the documents?" "What are your terms?" "What happens if a container is held?" |
| **Decision timeline** | Days to weeks. Practical rather than exploratory |
| **Buying behaviour** | Transactional but long-term. Once a supplier works, they stop looking |
| **Risk level** | **Moderate.** A failure costs a season, not a business |
| **Confidence level** | Moderate, and driven almost entirely by the specificity of logistics answers |
| **Served first by** | [Export](#21-export) |

**R11.1 — Reach is stated as a record, never dramatised.** Creative Direction Book
§20, Export: no maps, globes, arcs or aircraft as decoration. A list of markets
served, on the record, is stronger than any illustration of reach and is the only
form permitted ([§44](#44-the-proof-certification-factory-country-testimony)).

**R11.2 — Incoterms and lead times are unconfirmed** (Brand Bible §19.4). Until
confirmed, Export states the documentation process and the fact that terms are agreed
per order, and asks the buyer for their destination and terms at enquiry.

**R11.3 — There are no country surfaces.** A page per market is a doorway page: it
serves a search engine rather than a buyer, and it fails the Factory Test because any
intermediary can produce one. Markets are records on Export
([§44.3](#44-the-proof-certification-factory-country-testimony)).

### Dependencies

- Requires C9 coverage.
- The list of markets served is a Facts Register item and must be confirmed before
  publication.

---

## 12. The secondary visitors

**Traces to:** Brand Bible §18 people philosophy, §20.3 personality · Documentary
Storyboard §7.4 what is deliberately not a chapter · Creative Direction Book §20

### Purpose

To record who else arrives, what they need, and the standing rule that none of them
gets a surface of their own.

### Rules

| Visitor | What they need | Served by | Never given |
| --- | --- | --- | --- |
| **The buyer's technical colleague** | The joining and finishing operations, in detail, without the argument around them | [Manufacturing](#17-manufacturing), linkable at chapter level | A separate "technical" surface |
| **The buyer's compliance colleague** | Certification records with issuer, reference and date | [Quality](#20-quality) | A gated document, an email capture |
| **An agent or sourcing consultant** | Breadth, and a fast read of capability | [Products](#19-products), [Technology](#18-technology) | A partner programme, a commission scheme |
| **An existing buyer** | A record, a specification, a person to contact | [Products](#19-products), [Enquiry](#25-enquiry) | A login, a portal, an account |
| **A candidate** | What it is like to work here | [About](#22-about), [Journal](#24-journal) | A careers section, unless there is a real vacancy — see R12.2 |
| **A journalist or student** | Facts, and permission to use images | [About](#22-about), [Enquiry](#25-enquiry) | A press kit of assets assembled for reuse |

**R12.1 — No surface is created for a secondary visitor.** Every need above is met by
a surface built for the primary buyer. A "for suppliers", "for partners" or "for
press" surface fragments the story and produces the brochure Documentary Storyboard
§25.2 forbids.

**R12.2 — Careers is a conditional surface, not a standing one.** It exists only
while a real vacancy exists, states the vacancy plainly, and is removed when filled.
Documentary Storyboard §7.4: the people are never a section. A permanent careers
surface with no vacancy is a values list with faces.

**R12.3 — There is no team surface**, for the same reason. People appear throughout —
named, in captions, at their work (Brand Bible §18) — and are never collected into a
grid of portraits.

### Dependencies

- [§45](#45-the-words-article-question-person) defines the Person content model,
  which exists to attribute a caption or a quotation and not to populate a team page.

---

## 13. The evidence ladder: what actually changes a mind

**Traces to:** Photography Direction §5 the evidence hierarchy · Documentary
Storyboard §19 evidence philosophy, §20 recognition philosophy · Brand Bible §3.2

### Purpose

To rank the kinds of proof this site can offer, so that any surface can be judged on
whether it carries the rank its obligation requires.

### Rules

**R13.1 — The ladder**, strongest first. This is the experience-level companion to
Photography Direction §5, which ranks photographs; this ranks *evidence of any kind*:

| Rank | Kind of proof | Why it works | Example |
| --- | --- | --- | --- |
| **1** | **A decision being taken, with a cost** | It cannot be arranged, and it proves a standard exists because the standard refused something | A hide rejected at the door; a piece failed at the gate |
| **2** | **A mechanism described precisely enough to be checked** | Only somebody who does the work can describe it correctly, and a reader who knows the trade can verify the description | Cutting along the backbone, and why |
| **3** | **A third-party finding, with issuer, reference and date** | It is checkable independently of us | An audit report |
| **4** | **A record produced during the work** | It proves documentation is contemporaneous rather than assembled | An inspection sheet |
| **5** | **An unretouched photograph of the place, in use** | It proves the place exists and is used | The floor mid-shift |
| **6** | **A plainly stated limit** | It costs us something to say, which is why it is believed | "We do not do X" |
| **7** | **A named person, at a named place, answerable** | It converts a company into somebody | A named contact |
| **8** | **A specification** | It is checkable, but it proves capability rather than conduct | A product record |

**R13.2 — Ranks 1 and 2 are the only ones that produce Recognition.** Everything
below consolidates. A surface whose evidence is entirely ranks 5 to 8 is a surface
nobody's mind changed on.

**R13.3 — No accumulation of a lower rank produces a higher one.** Twenty
photographs of the place do not equal one decision being taken (Photography Direction
§5.2). This is why volume of content is never a goal in this architecture.

**R13.4 — Every surface in Part III declares the ranks it must carry.** A surface
that cannot carry its required rank is not published in a weakened form; it is
published without the section that needed it (X8).

### Dependencies

- Ranks 1, 4 and 5 depend entirely on access to a working shift (Photography
  Direction §30.2, blocking).
- Rank 3 depends on the Facts Register.

---

## 13A. Trust progression

**Traces to:** Brand Bible §8 the emotional journey, §8.2 rules of the journey, §5 the
two fears · Documentary Storyboard §21 trust philosophy, §20 recognition philosophy ·
Creative Direction Book §4 how a buyer should experience the brand · Photography
Direction §5 the evidence hierarchy

### Purpose

To show trust being built as a sequence of transitions rather than as a quality a
site has — and to name, for each transition, the evidence that causes it and the
surface that owns it.

[§13](#13-the-evidence-ladder-what-actually-changes-a-mind) ranks the kinds of proof.
This chapter states **the order they must arrive in** for a sceptical professional to
move from looking to writing.

### The progression

```
Curiosity  →  Observation  →  Recognition  →  Evidence  →  Confidence  →  Conversation  →  Relationship
```

### Rules

**R13A.1 — The progression is the Brand Bible's seven stages, seen from the evidence
side.** It is not a second journey and it does not replace the locked one. The
mapping, stated so no reader can take this chapter as a competing sequence:

| This chapter | Brand Bible §8.1 | Note |
| --- | --- | --- |
| Curiosity | Stage 1 Arrival + Stage 2 Curiosity | Arrival is the condition; Curiosity is the first movement |
| Observation | Within Stage 2 | The act the visitor performs before they will read anything |
| **Recognition** | **Stage 3 Recognition** | The hinge. Unchanged |
| Evidence | Stage 4 Trust | External verification. Named here for what causes it |
| Confidence | Stage 5 Confidence | Unchanged |
| — | **Stage 6 Respect** | Carried inside the Confidence → Conversation transition, and mapped in full at [§13B](#13b-the-emotional-journey) |
| Conversation | Stage 7 Conversation | Unchanged |
| Relationship | Beyond the site | Owned by the reply (R40.1 step 4), not by a surface |

**Respect is not dropped.** Brand Bible §8.2 rule 1 states that no stage may be
skipped, and this chapter would breach it if Respect were absent. It is present as
the condition of the Confidence → Conversation transition (R13A.8) and is mapped
explicitly in the next chapter.

**R13A.2 — Curiosity.**

| | |
| --- | --- |
| **What changes** | The visitor stops classifying and starts attending. They have not decided anything; they have decided not to leave yet |
| **Evidence that causes it** | Rank 5: the place, in use, unretouched. It works because it is not addressed to them — a room mid-shift is not a sales artefact |
| **What destroys it** | Anything readable as advertising in the first seconds (Brand Bible §8.1 stage 1 failure mode) |
| **Owned by** | Whichever surface they arrived on. In practice [Home](#16-home), [Products](#19-products) or [Quality](#20-quality) |

**R13A.3 — Observation.**

| | |
| --- | --- |
| **What changes** | The visitor begins examining rather than scanning. This is the first act that costs them something, and it is given freely only if the evidence rewards it |
| **Evidence that causes it** | A photograph large enough to be examined (Visual Design System §30) with something in it worth examining — a bench in use, a mark, a state |
| **What destroys it** | An image below the evidence threshold; an image that could be of anywhere; a surface that starts talking before it has shown anything (R6A.3) |
| **Owned by** | [Home](#16-home) and [Gallery](#23-gallery). Gallery is the surface a visitor reaches when observation is what they want to do |

**R13A.4 — Recognition — the hinge.**

| | |
| --- | --- |
| **What changes** | Scepticism loosens. The visitor concludes that whoever made this has been on a factory floor. **This is the moment the entire brand exists to produce** (Brand Bible §8.1 stage 3) |
| **Evidence that causes it** | Rank 1: a decision being taken, with a cost — C3, the cut along the backbone; or C7, a rejection. Rank 2 supports it: a mechanism described precisely enough to be checked |
| **What destroys it** | Generality. A buyer who reaches this point and finds only adjectives concludes we are a trading house with a good website, and no later evidence recovers it |
| **Owned by** | [Manufacturing](#17-manufacturing) (C3), with [Quality](#20-quality) (C7) as the reserve, and [Home](#16-home) carrying its own so that a single-surface visit still reaches it (R16.2) |

**R13A.5 — Evidence.**

| | |
| --- | --- |
| **What changes** | The burden of judgement partially lifts. The visitor no longer has to decide alone, because somebody outside the company has checked |
| **Evidence that causes it** | Rank 3: a third-party finding with issuer, reference and date. Rank 4: records produced during the work rather than assembled afterwards |
| **What destroys it** | Arriving early. A credential presented before Recognition is a badge and reads as compensating (X4). A certificate without issuer, reference and date invites the check and fails it (R32.2) |
| **Owned by** | [Quality](#20-quality) |

**R13A.6 — Confidence.**

| | |
| --- | --- |
| **What changes** | Emotional assessment is replaced by practical assessment: *they could actually take my order* |
| **Evidence that causes it** | Rank 2 and rank 8: equipment named plainly and what it makes repeatable; the range of work; dispatch as an operation; markets already served |
| **What destroys it** | An unverifiable figure. Brand Bible §8.1 stage 5: it turns Confidence permanently back into stage 1 scepticism. This is why every capability surface is built to stand without the unconfirmed numbers (R20.3, R21.3, R36.3) |
| **Owned by** | [Technology](#18-technology), [Products](#19-products), [Export](#21-export) |

**R13A.7 — Conversation.**

| | |
| --- | --- |
| **What changes** | The visitor decides the risk of writing is low, and writes |
| **Evidence that causes it** | Rank 7: a named person, at a named place, answerable. Rank 6: a plainly stated limit, which is what makes the rest believable |
| **What destroys it** | Selling. Pressure applied here undoes the stage before it (Brand Bible §8.1 stage 7 failure mode) |
| **Owned by** | [Enquiry](#25-enquiry) |

**R13A.8 — The Confidence → Conversation transition is gated by Respect.** A visitor
who is confident we are capable still needs to believe we would tell them if we were
not (Brand Bible §8.1 stage 6). The gate is passed by what is **absent**: no
testimonial, no unverified statistic, no superlative — and by one thing present: the
stated limit (E9, R20.5, R22.4).

This is why the limits are published on Quality, About and Export rather than
collected on a surface of their own: they are load-bearing at the point of the final
transition, and a limit read a week earlier does not help.

**R13A.9 — Relationship.**

| | |
| --- | --- |
| **What changes** | The buyer stops assessing and starts working with us. The site's part is over |
| **Evidence that causes it** | The reply: from a named person, answering the question that was asked, in one message (R40.1 step 4). Sustained afterwards by [Journal](#24-journal) and by the site not having changed underneath them (R29.2, R29.4) |
| **What destroys it** | A reply that does not come, or a promise the operation cannot keep (Brand Bible §19.5) |
| **Owned by** | **No surface.** It is owned by the company, and the site's only contribution is not to have overstated anything before it |

**R13A.10 — No transition may be skipped, and none may be accelerated** (Brand Bible
§8.2 rule 1). A surface that offers Conversation to a visitor who has not reached
Confidence has not shortened the progression; it has ended it.

**R13A.11 — The progression is not linear in time.** A returning visitor resumes at
Confidence or Respect (R29). A procurement visitor may enter at Evidence and leave
without ever reaching Conversation, and that is a complete success (R32.5). What is
fixed is the **order of the transitions**, not the duration of any of them.

### Dependencies

- Recognition depends on rank-1 evidence, which depends on access to a working shift
  ([§53.1](#53-open-questions-and-dependencies)). Without it the progression stalls at
  Observation and no later surface compensates.
- The Evidence transition depends entirely on the Facts Register.
- The Relationship stage depends on an operational commitment the site cannot make on
  the company's behalf (Brand Bible §19.5).

---

## 13B. The emotional journey

**Traces to:** Brand Bible §7 emotional territory, §8 the emotional journey ·
Creative Direction Book §20 the pages, §4 · Documentary Storyboard §15 emotional
rhythm

### Purpose

To map what the visitor **feels** across the site, and to name which surface owns
each emotion — so that a surface can be judged on the state it produces rather than
only on the facts it carries.

[§13A](#13a-trust-progression) states what changes in the visitor's assessment. This
chapter states what accompanies it, because the two are not the same: a buyer can be
convinced and still not write.

### The progression

```
Curiosity  →  Observation  →  Recognition  →  Confidence  →  Respect  →  Conversation
```

### Rules

**R13B.1 — The emotions are the Brand Bible's, not new ones.** §7.1 names six the
brand must create — Recognition, Reassurance, Calm, Competence, Permanence, Respect —
and §7.2 names six that must never appear. This chapter assigns them to surfaces; it
does not add to either list.

**R13B.2 — The map:**

| Emotion | What produces it (Brand Bible §7.1) | Primary owner | Supported by | Locked emotional brief (Creative Direction Book §20) |
| --- | --- | --- | --- | --- |
| **Curiosity** | Structural unfamiliarity — the sense that this is not laid out like the others | [Home](#16-home) | Every surface, on arrival | Home: *arrival somewhere real and already working* |
| **Observation** | Space, silence, and something worth examining | [Home](#16-home), [Gallery](#23-gallery) | [Manufacturing](#17-manufacturing) | Gallery: *unmediated access — the file, not the presentation* |
| **Recognition** | Detail only somebody who has been on a factory floor would know | [Manufacturing](#17-manufacturing) | [Home](#16-home), [Quality](#20-quality), [Gallery](#23-gallery), [Journal](#24-journal) | Manufacturing: *the primary engine of Recognition and Confidence* |
| **Reassurance** | Third-party audit, documented process, a named place | [Quality](#20-quality) | [Export](#21-export) | Quality: *somebody outside this building checked, and here is what they checked* |
| **Competence** | Precision of language; mechanisms explained, not asserted | [Technology](#18-technology) | [Manufacturing](#17-manufacturing), [Journal](#24-journal) | Technology: *serious capital equipment, plainly presented* |
| **Confidence** | Capability made legible — equipment, sequence, reach | [Technology](#18-technology), [Products](#19-products) | [Export](#21-export), [Manufacturing](#17-manufacturing) | Products: *a catalogue of capability, not an inventory of stock* |
| **Permanence** | A founding date, a location, an unhurried pace | [About](#22-about) | [Home](#16-home), and C10 wherever it appears | About: *meeting the people and the place* |
| **Respect** | Being told what we cannot do as readily as what we can | [About](#22-about), [Export](#21-export) | [Quality](#20-quality) | Export: *Confidence, then Respect* |
| **Calm** | Space, silence, an absence of urgency | Every surface | — | Home: *composure — an unhurried introduction by someone with nothing to prove* |
| **Conversation** | One action, clearly stated, with a human being at the other end | [Enquiry](#25-enquiry) | — | Contact / Enquiry: *low risk. A person will read this* |

**R13B.3 — Calm is not a stage; it is a condition of every stage.** It is the only
emotion in this map owned by no surface and required of all of them, and it is
produced structurally — by the absence of urgency, repetition and demand (X6, E10).

**R13B.4 — Each surface's emotional brief is locked** at Creative Direction Book §20
and is reproduced above only in the right-hand column. **Where this chapter and §20
differ, §20 is correct and this chapter is wrong.**

**R13B.5 — The emotions that must never appear** (Brand Bible §7.2), with the
architectural mechanism that keeps each out:

| Must never appear | Kept out by |
| --- | --- |
| Excitement | No announcements, no launches, no news (R24.1) |
| Urgency | No countdown, no scarcity, no aggressive action (R39.4, X6) |
| Aspiration as fantasy | No lifestyle imagery; every photograph is evidence with provenance (R42.5) |
| Flattery | No second-person praise; no audience selectors that flatter a role (R7.3) |
| **Defensiveness** | **No surface names or characterises a competitor** (X10). The subtlest failure, and the one most likely to appear in a comparison section that does not exist |
| Novelty | No trend content, no "next generation", no redesign as an event (R24.1, Brand Bible P5) |

**R13B.6 — An emotion is produced or it is not; it is never named.** No surface tells
the visitor that the company is trustworthy, careful, permanent or respectful. P4:
the reader draws the conclusion, and a named emotion is the conclusion supplied for
them.

**R13B.7 — The emotional contour is uneven by design.** Documentary Storyboard §15
and Creative Direction Book §17.1: uniform intensity is monotony. Recognition
deserves the most room; Arrival deserves the fewest words (Brand Bible §8.2 rule 2).
A site where every surface works equally hard has no peak and therefore no hinge.

### Dependencies

- Every emotional brief in the right-hand column is locked at Creative Direction Book
  §20 and may not be altered here.
- The Calm condition depends on the Visual Design System's held moment (§23.4) and on
  X6; it cannot be produced by content alone.

---

## 14. The objection register

**Traces to:** Brand Bible §6.3, §7.2 defensiveness, §23 decision framework ·
Creative Direction Book §19.1

### Purpose

To list every objection a buyer arrives with, and to assign each one to the surface
that answers it — so that no objection is answered twice, in the wrong voice, or
nowhere.

### Rules

**R14.1 — Every objection is answered by evidence on a surface, never by a rebuttal.**
Brand Bible §7.2: naming an adversary is the subtlest failure. The site never says
"unlike trading houses"; it shows the floor.

**R14.2 — The register:**

| # | Objection | Answered by | With evidence of rank |
| --- | --- | --- | --- |
| O1 | "This is probably a trading house." | [Home](#16-home), then [Manufacturing](#17-manufacturing) | 1, 2, 5 |
| O2 | "The photographs could be from anywhere." | [Gallery](#23-gallery), continuity of place across surfaces | 5, at volume |
| O3 | "Anyone can write this." | [Manufacturing](#17-manufacturing) — mechanism described precisely | 2 |
| O4 | "You can make one; can you make four hundred the same?" | [Manufacturing](#17-manufacturing) C3–C6, [Technology](#18-technology) | 1, 2 |
| O5 | "Who checks you?" | [Quality](#20-quality) | 3, 4 |
| O6 | "What happens when something is wrong?" | [Quality](#20-quality) C7 | 1, 4 |
| O7 | "Could you answer a question about an order from three years ago?" | [Quality](#20-quality) C8 | 4 |
| O8 | "Are we too small for you?" | [Products](#19-products), [Enquiry](#25-enquiry) | 6, 7 |
| O9 | "Can you hold my tolerance?" | [Technology](#18-technology) | 2, 8 |
| O10 | "Have you shipped to my market?" | [Export](#21-export) | 3, 4 |
| O11 | "Will the documentation be right?" | [Export](#21-export) | 4 |
| O12 | "Who am I dealing with?" | [About](#22-about) | 7 |
| O13 | "Do you actually know leather?" | [Journal](#24-journal) | 2 |
| O14 | "What happens if I write to you?" | [Enquiry](#25-enquiry) | 6, 7 |
| O15 | "Will you still exist in five years?" | Carried by the whole, and by C10 wherever it appears | 5, 7 |

**R14.3 — An objection with no assigned surface is an architecture defect**, and the
remedy is to amend this document rather than to add a section to whichever surface is
nearest.

**R14.4 — No FAQ surface answers these.** An objection answered in a list of
questions is an objection the surfaces failed to answer, and the list is the symptom
([§45.2](#45-the-words-article-question-person)).

### Dependencies

- O2 depends on the library reaching sufficient volume for continuity of place
  (Creative Direction Book §7.2).
- O5, O10 and O11 depend on the Facts Register.

---
---

# PART III — INFORMATION ARCHITECTURE

---

## 15. The page set, and the rule that closes it

**Traces to:** Brand Bible §21 how every page supports the brand · Creative Direction
Book §19, §20 the pages · Documentary Storyboard §7 the canonical chapter set, §25.1
the compression law

### Purpose

To fix the complete set of surfaces, to state where it came from, and to close it so
that later additions are amendments rather than accretions.

### Rules

**R15.1 — The set is inherited, not invented.** Brand Bible §21 assigns eleven
surfaces a buyer question and a brand obligation; Creative Direction Book §20 gives
the same eleven an emotional brief. This document adds only responsibility, sequence
and relationship. **No surface in this Part is new**, and none of the eleven has been
dropped.

**R15.2 — The complete set:**

| Surface | Buyer question (Brand Bible §21) | Class ([§34](#34-the-six-classes-of-surface)) |
| --- | --- | --- |
| [Home](#16-home) | Is this a real factory? | Destination |
| [Manufacturing](#17-manufacturing) | How is it made? | Destination |
| [Technology](#18-technology) | Can you hold a tolerance? | Supporting |
| [Products](#19-products) | What can you make? | Destination |
| [Quality](#20-quality) | Why should I believe you? | Evidence |
| [Export](#21-export) | Can you ship to me? | Supporting |
| [About](#22-about) | Who am I dealing with? | Relationship |
| [Gallery](#23-gallery) | Is any of this real? | Evidence |
| [Journal](#24-journal) | Do you know your material? | Relationship |
| [Enquiry](#25-enquiry) | How do I start? | Transactional |
| [System and legal](#26-system-and-legal-surfaces) | — | Legal / system |

**R15.3 — Three surfaces have sub-surfaces, and no other surface may acquire one:**

| Parent | Sub-surface | Why it exists |
| --- | --- | --- |
| Products | Category → sub-category → product record | A specification is a record consulted individually, and a buyer arrives at one directly from a search |
| Technology | Machine record | Equipment is named plainly where it is used; a record per machine is a specification, not a feature page |
| Journal | Article | An article is one chapter told in depth (Documentary Storyboard §25.2) |

**R15.4 — The site structure is the canonical chapter order** (X2). Manufacturing
carries C1–C10 in order; every other surface is an extraction from that spine, never
a re-ordering of it:

| Chapter | Primary home | Extracted to |
| --- | --- | --- |
| C1 The place | Manufacturing | Home, About, Gallery |
| C2 What arrives | Manufacturing | Quality |
| **C3 The decision** | Manufacturing | Home — this is Home's Recognition moment |
| C4 The shaping | Manufacturing | Technology |
| C5 The joining | Manufacturing | Technology, Products |
| C6 The finishing | Manufacturing | Products |
| **C7 The gate** | Manufacturing | Quality — this is Quality's Recognition moment |
| C8 The record | Manufacturing | Quality, Export |
| C9 What leaves | Manufacturing | Export, Products |
| C10 Tomorrow | Manufacturing | About, and the close of any surface that needs one |

**R15.5 — A new surface is admitted only by answering four questions in writing**
(the form of Documentary Storyboard §25.4): which buyer question it answers that no
existing surface answers; which chapters it carries; which evidence rank it requires;
and what is removed to make room for it. If any cannot be answered, it is not built.

**R15.6 — Surfaces that will be requested and do not exist**, recorded now so the
answer is on file:

| Requested | Why it does not exist |
| --- | --- |
| Team | Documentary Storyboard §7.4 — people are never a section |
| Certifications | §7.4 — a finding inside the record, never a wall |
| Case studies | We do not exhibit our clients (§7.4, Brand Bible §19.5) |
| Testimonials | Brand Bible §19.4 — all testimonials are currently unconfirmed |
| Country or market landing surfaces | [R11.3](#11-the-international-importer-and-distributor) — doorway pages, and they fail the Factory Test |
| FAQ | [§14.4](#14-the-objection-register) — a symptom that surfaces did not answer their question |
| Blog, news, press | Journal is the only editorial surface, and it is not a feed (Creative Direction Book §20) |
| Careers | Conditional only ([R12.2](#12-the-secondary-visitors)) |
| Downloads or resources | E7 — nothing is gated, and a resources surface exists to gate things |

### Dependencies

- The Manufacturing surface is the spine; every other surface's evidence is an
  extraction from the same library and must maintain continuity of place (Creative
  Direction Book §7.2).
- The current build names the editorial surface *blog* and carries two separate
  contact routes. Both are recorded as collisions at
  [§52.3](#52-what-phase-8-may-not-decide).

---

## 16. Home

**Traces to:** Brand Bible §21 Home, §8 the emotional journey · Creative Direction
Book §20 Home · Documentary Storyboard §7 C1, C3 · Visual Design System §23.4

### Purpose

To establish, before anything is claimed, that a real factory is speaking — and to
produce Recognition in a visitor who may never open a second surface.

### Primary question answered

> Is this a real factory?

### Evidence provided

| Required | Rank ([§13](#13-the-evidence-ladder-what-actually-changes-a-mind)) | Chapter |
| --- | --- | --- |
| The place, in use | 5 | C1 |
| **One decision being taken** | **1** | **C3** |
| One precisely described mechanism | 2 | C3 |
| A named place and a named company | 7 | — |

### Required outcome

The visitor knows the building exists and we are in it, has encountered one specific
unglamorous detail they could not have read on a competitor's site, and knows the two
next reasonable steps: the process, or a conversation.

### Relationship with other pages

Home is the only surface that touches all ten chapters and completes none. It hands
to **Manufacturing** as its primary route, **Products** as its secondary, and
**Enquiry** as its close. It is never the only route to anything.

### Rules

**R16.1 — Home opens the story; it does not index the site.**

Creative Direction Book §20 is unchanged and remains the authority: Home *must never
explain itself, summarise the site, open with a claim, or move on arrival.* The same
brief also assigns Home all seven stages of the emotional journey, which means Home
is required to **begin** the story rather than merely point at it. This rule states
the distinction between the two, because conflating them is what produces the
failure §20 names.

| Home does | Home does not |
| --- | --- |
| Open the story — C1 and C3 told as passages that prove something in their own right | Describe the other surfaces |
| Show the place, and one decision being taken (R16.2) | Carry a route to every surface with a sentence of explanation each |
| Hand on, plainly, to the process and to the range (E5) | Restate what another surface will establish |
| Establish the register and the standard the rest of the site keeps | Preview a surface with content lifted from it |

**The test:** *does this passage prove something, or does it describe a surface that
proves something?* A passage that proves is the story opening, and it is what Home is
for. A passage that describes is a summary — and a row of surface descriptions is the
commonest form of the failure Creative Direction Book §20 forbids.

The philosophy is unchanged: **Home is not a table of contents.** What this rule adds
is that Home is also not a doorway — it is the first chapter, and a visitor who reads
only Home has read something complete (R16.2, E4).

**R16.2 — Home carries its own Recognition moment, and it is C3.** Documentary
Storyboard §25.1 rule 2: Recognition is never dropped from any telling. A Home
surface that defers Recognition to Manufacturing has assumed a second surface, which
breaks E4 for the visitor who leaves after one.

**R16.3 — Home carries the held moment for the site** (Visual Design System §23.4).
It is the surface with the most room to spend and the one where an emotional shift
most needs to register.

**R16.4 — Home makes no capability claim, states no figure, and shows no
certification.** Trust arrives after Recognition (X4); a certification on Home is a
badge (Brand Bible §8.1 stage 4).

**R16.5 — Home ends with one action, stated plainly, once** (X5).

### Dependencies

- Requires an E1 photograph. Without one, Home cannot discharge its obligation and
  the surface is built to the extent the library permits, with the Recognition
  passage absent rather than substituted (X8).
- Depends on Manufacturing existing, because R16.1 forbids Home from carrying the
  argument itself.

---

## 17. Manufacturing

**Traces to:** Brand Bible §21 Manufacturing, §16.5 the process is the product ·
Creative Direction Book §20 Manufacturing · Documentary Storyboard §7 the complete
chapter set, §7.2

### Purpose

To be the complete telling: the spine of the site, carrying C1–C10 in canonical
order, and the primary engine of Recognition and Confidence.

### Primary question answered

> How is it made?

### Evidence provided

All ten chapters, each carrying the rank Documentary Storyboard §7 requires of it —
including the two consequential chapters, C3 and C7, and the records of C8.

### Required outcome

The visitor understands the sequence, has seen at least one decision taken with a
cost, and can describe one operation to a colleague in their own words.

### Relationship with other pages

The parent of the story. **Technology, Products, Quality and Export are all
extractions from it**, and each links back to the chapter it was extracted from. It
is reachable in one step from every surface, including from a deep product record.

### Rules

**R17.1 — This is the longest and most immersive surface in the brand** (Creative
Direction Book §20). It is not summarised, paginated into steps, or compressed into a
diagram.

**R17.2 — The process is never compressed into a diagram, an icon row or an
infographic** (Creative Direction Book §20, Manufacturing: must never). This removes
the numbered-steps pattern from the surface entirely.

**R17.3 — Each chapter is independently linkable and makes sense alone** (X13). A
technical colleague sent the joining chapter must not have to read the nine around
it.

**R17.4 — Chapters are told whole or not at all** (Documentary Storyboard §25.1 rule
3). A chapter with insufficient evidence is absent from the surface; it does not
appear as a heading with a sentence beneath it.

**R17.5 — Chapters are unequal, and C3 is the longest** (Documentary Storyboard §7.2,
N5). A surface where all ten chapters are the same length has flattened the argument.

**R17.6 — No chapter on this surface carries an action** (X5, X6). The surface's
single action is at its close, after C10.

**R17.7 — Equipment is named where it is used, and elaborated on
[Technology](#18-technology)** — never celebrated here (Brand Bible §16.6).

### Dependencies

- Requires the widest coverage of any surface: E1 and E2 photography across ten
  chapters, obtainable only during a working shift.
- C7 depends on a rejection being observable rather than arranged (Documentary
  Storyboard §29.3 item 7). If it cannot be, C7 is absent here and
  [Quality](#20-quality) loses its Recognition moment — recorded at
  [§53](#53-open-questions-and-dependencies).

---

## 18. Technology

**Traces to:** Brand Bible §21 Technology, §16.6 technology philosophy · Creative
Direction Book §20 Technology · Documentary Storyboard §7 C4, C5, §7.4

### Purpose

To make capability legible by naming the equipment plainly, so that a buyer can judge
whether a tolerance can be held — without the equipment being celebrated.

### Primary question answered

> Can you hold a tolerance?

### Evidence provided

| Required | Rank | Source |
| --- | --- | --- |
| Named equipment, in the room, at work | 5 | C4, C5 |
| The operation each machine performs, described precisely | 2 | C4, C5 |
| What the machine guarantees — repeatability, not speed | 2 | Brand Bible §16.6 |
| A machine record per machine | 8 | [§43.4](#43-the-work-category-product-stage-machine) |

### Required outcome

The visitor believes the operation has the equipment to repeat a result, and can name
at least one machine and what it does.

### Relationship with other pages

A supporting extraction from Manufacturing C4 and C5. Each machine record links to
the manufacturing chapter where that operation appears, and to the product categories
the machine is used for. It never links directly to Enquiry from a machine record —
a machine is not a reason to make contact.

### Rules

**R18.1 — A press is a press** (Brand Bible §16.6). Named plainly, never dramatised,
never described as advanced, modern, state-of-the-art or automated-as-a-boast.

**R18.2 — The surface never becomes a specification grid or a features section**
(Creative Direction Book §20, Technology: must never). Machines are records, reached
individually.

**R18.3 — Machinery is not a chapter** (Documentary Storyboard §7.4). This surface
exists because a buyer asks a capability question, not because equipment is a
subject. It is therefore Supporting, never a Destination
([§34](#34-the-six-classes-of-surface)).

**R18.4 — No machine record may publish tonnage, speed, per-shift capacity,
manufacturer or country of origin** until each is confirmed. All five are on the
unconfirmed list (Brand Bible §19.4). The record publishes what the machine **does**,
which is not a Register item.

**R18.5 — Photographs of machinery are of machines in use, in our rooms**
(Photography Direction §7). A manufacturer's product photograph of the same model is
a borrowed image and fails on sight.

### Dependencies

- The machine content model ([§43.4](#43-the-work-category-product-stage-machine))
  must carry a field for every currently unconfirmed attribute, unpublished until
  the Register confirms it.
- The current build carries five machine records already; their unconfirmed
  attributes are a publication gate, not a content gap.

---

## 19. Products

**Traces to:** Brand Bible §21 Products, §4 who we are · Creative Direction Book §20
Products · Documentary Storyboard §7 C6, C9, §7.4 the offer

### Purpose

To show the breadth of what the company can make, as a catalogue of capability rather
than an inventory of stock.

### Primary question answered

> What can you make?

### Evidence provided

| Required | Rank | Source |
| --- | --- | --- |
| Finished work, unretouched | 5, 8 | C6 |
| The range of forms and constructions the floor can produce | 2, 8 | C4–C6 |
| Specifications per product record | 8 | [§43.2](#43-the-work-category-product-stage-machine) |
| The fact that the label is frequently not ours | 6 | C9 |

### Required outcome

The visitor can locate their own requirement inside our range — or establish plainly
that it is outside it — and knows that a specification is the beginning of a
conversation rather than an order.

### Relationship with other pages

Three levels: **category → sub-category → product record**. Each level links up to
its parent and across to the manufacturing chapter that produced the work. The
product record is the deepest surface in the system and the one most likely to be
arrived at directly from a search.

### Rules

**R19.1 — It is a catalogue of capability, not an inventory** (Creative Direction
Book §20, Products). No counting of items, no stock, no availability, no "new", no
sorting by popularity.

**R19.2 — No price, no cart, no wishlist, no quantity selector, no configurator**
(R3.4). One consumer mechanic reclassifies the whole system.

**R19.3 — Each product record is a specification, and specifications are
records** — the record voice, per the Visual Design System. It states materials,
construction, dimensions where they are fixed, finishes available, and what varies.

**R19.4 — A product record never claims quality** (Brand Bible §11.2, the `quality`
rule). It states what was checked, or it states nothing.

**R19.5 — Minimum order quantity is not published** until confirmed (Brand Bible
§19.4). Until then the category surface states that quantities are agreed per order,
which is a statement about process rather than a hedged figure.

**R19.6 — Every product record ends at Enquiry, and it is the only deep surface that
does.** A buyer at a product record has a specific requirement and the next reasonable
step is a conversation about it (E5). The action states what to send.

**R19.7 — A category with fewer than three product records is not a category.** It is
a product, and it sits one level up. Structure is not created in advance of content
(X8).

### Dependencies

- Requires finished-work photography (E6 and E5 ranks) and at least one C6 passage.
- Product photography must survive the evidence threshold at every level (Visual
  Design System §30); a category surface of small images is decoration.
- The build's three-level product hierarchy is derived from content folders; the
  content model at [§43](#43-the-work-category-product-stage-machine) governs what
  each level must carry.

---

## 20. Quality

**Traces to:** Brand Bible §21 Quality, §19 the Facts Register · Creative Direction
Book §20 Quality · Documentary Storyboard §7 C2, C7, C8, §21 trust philosophy

### Purpose

To show that the standard is applied, that it costs something, and that somebody
outside the company has checked — in that order.

### Primary question answered

> Why should I believe you?

### Evidence provided

| Required | Rank | Source |
| --- | --- | --- |
| **A rejection: something refused** | **1** | C7 |
| The first gate, at the door | 1, 2 | C2 |
| Records produced during the work | 4 | C8 |
| Third-party findings, with issuer, reference and date | 3 | Certification records |
| The stated route for a non-conformance | 6 | — |

### Required outcome

A procurement visitor can complete their check without writing to us, and a buyer
understands that the standard has refused something.

### Relationship with other pages

The Evidence surface of the system. It is extracted from Manufacturing C2, C7 and C8,
and is linked from every surface that makes a claim about consistency. It is the
surface most often arrived at directly by a colleague of the primary buyer.

### Rules

**R20.1 — Never lead with badges** (Creative Direction Book §20, Quality). The audit
finding arrives after the process that earned it (X4). A row of certification marks
at the top of this surface is the single most damaging arrangement available to it.

**R20.2 — The rejection is the argument.** Documentary Storyboard §7.1: a gate shown
passing things is a formality; a gate shown refusing something is a threshold with a
cost. This surface's Recognition moment is C7.

**R20.3 — Mechanism before figures, and the surface is designed to work without
figures.** The AQL band, rejection rate and inspection gate count are unconfirmed
(Brand Bible §19.4). The surface states how inspection works and where it happens;
confirmed figures are added later into a structure that already holds them.

**R20.4 — Every certification record carries issuer, reference and date** or it is not
published (X12, [§44.1](#44-the-proof-certification-factory-country-testimony)).

**R20.5 — The limits are stated here** (E9, R10.3): what is not tested, what is not
certified, what is checked by sampling rather than by unit.

**R20.6 — It is the least decorated surface in the brand** (Creative Direction Book
§20). Sober and evidential is the register; this is an architecture note because it
decides what may be added later, not a visual instruction.

### Dependencies

- **Blocking on C7**: whether a rejection can be observed rather than arranged
  (Documentary Storyboard §29.3 item 7). If it cannot, this surface loses its
  Recognition moment and carries C2 and C8 only.
- Certification records depend on the Facts Register confirming each body, reference
  and date.

---

## 21. Export

**Traces to:** Brand Bible §21 Export, §19.4 incoterms · Creative Direction Book §20
Export · Documentary Storyboard §7 C8, C9

### Purpose

To show that goods leave correctly, documented, to markets already served — presented
as logistics competence rather than as reach.

### Primary question answered

> Can you ship to me?

### Evidence provided

| Required | Rank | Source |
| --- | --- | --- |
| Packing and dispatch as an operation | 5, 2 | C9 |
| The documents issued, and who issues them | 4 | C8, C9 |
| Markets already served, as a record | 3, 8 | Country records |
| A named person responsible for a shipment | 7 | — |

### Required outcome

An importer knows whether we have shipped to their market, what documentation
accompanies a shipment, and who answers when something goes wrong.

### Relationship with other pages

A supporting extraction from C8 and C9. Linked from Products (what leaves) and from
Quality (the record). It hands to Enquiry with the destination and terms as the
opening subject.

### Rules

**R21.1 — Reach is never dramatised** (Creative Direction Book §20, Export): no maps,
globes, arcs, aircraft or animated route lines. Markets are a record.

**R21.2 — Markets served are named only where the Register confirms them.** An
aspirational market list is a fabricated capability claim.

**R21.3 — Incoterms and lead times are not published** until confirmed (Brand Bible
§19.4). The surface states that terms are agreed per order and what information is
needed to agree them — a statement about process.

**R21.4 — No country surfaces** (R11.3). A country is a record on this surface.

**R21.5 — The failure path is published**: what happens if a shipment is held or
documentation is queried. This is rank-6 evidence and it is the reason an importer
believes the rest.

### Dependencies

- The markets list is a Facts Register item.
- Requires C9 photography.

---

## 22. About

**Traces to:** Brand Bible §21 About, §18 people philosophy, §1 the brand myth ·
Creative Direction Book §20 About · Documentary Storyboard §7 C1, C10, §7.4

### Purpose

To answer who the visitor is dealing with — the people and the place — without
becoming a founder legend, a timeline or a values list.

### Primary question answered

> Who am I dealing with?

### Evidence provided

| Required | Rank | Source |
| --- | --- | --- |
| The place, named and located | 5, 7 | C1 |
| People at their work, named | 7, 5 | C10 |
| The founding fact, stated once | 8 | — |
| What the company does not do | 6 | — |

### Required outcome

The visitor can name the place, has seen at least one person who works there, and
believes the company will still exist in five years.

### Relationship with other pages

A relationship surface, linked from Home and from the footer's record. It hands to
Manufacturing for the argument and to Enquiry for the conversation. It is not on the
critical path of any journey — and that is deliberate.

### Rules

**R22.1 — No founder mythology, no milestone timeline, no values list** (Creative
Direction Book §20, About; Brand Bible §21). A founding date is a fact stated once,
never a passage (Documentary Storyboard §7.4).

**R22.2 — No portrait grid** (R12.3). People appear at their work, named, in the
places they work.

**R22.3 — A person is named only with written consent** (Photography Direction §8.5,
Documentary Storyboard §14.4). Consent obtained afterwards is not consent.

**R22.4 — The company's limits appear here as well as on Quality** (E9). This is the
surface where "we do not do X" is least defensive and most credible.

**R22.5 — About carries C10 and therefore ends by continuing**, not by concluding
(Documentary Storyboard N13).

### Dependencies

- Blocking on the written consent process for individuals (Photography Direction
  §30.3 item 7).
- The company name itself is unconfirmed (Brand Bible §25 item 1) and this surface is
  where the discrepancy would be most visible.

---

## 23. Gallery

**Traces to:** Brand Bible §21 Gallery · Creative Direction Book §20 Gallery ·
Photography Direction §25 the library is the argument · Documentary Storyboard §22

### Purpose

To offer unmediated access to the evidence — the file rather than the presentation —
where the volume of evidence is itself the argument.

### Primary question answered

> Is any of this real?

### Evidence provided

Photographs at volume, unretouched, each carrying its record: place, date, and what is
happening. Rank 5 at volume, with ranks 1 and 4 present wherever the library holds
them.

### Required outcome

A sceptical visitor, having seen the argued surfaces, can check them against
unargued material and find nothing that contradicts.

### Relationship with other pages

The corroborating surface. It is linked from every surface that makes a photographic
claim, and it links back to the chapter each set belongs to. It is never the entry
point of a journey and never carries the argument alone.

### Rules

**R23.1 — It is documentary, not an art project** (Creative Direction Book §20,
Gallery): not retouched toward beauty, not sequenced for drama.

**R23.2 — Volume is the argument here, and only here.** Every other surface obeys
"one image at a time" (Creative Direction Book §11.3). This surface's obligation is
extent, and it is the single exception in the system — governed by the Visual Design
System's rules on sets rather than by an exception to them.

**R23.3 — Every photograph carries its record** (Photography Direction §24.4): place,
date, what is happening. A gallery of uncaptioned images is decoration at volume,
which is worse than decoration.

**R23.4 — Sets are organised by chapter, never by aesthetic theme.** "The floor",
"the gate", "dispatch" — not "details", "textures", "moments".

**R23.5 — No lightbox, no slideshow, no autoplay** (Visual Design System §40.3,
§41). An image worth opening was worth placing at full presence.

**R23.6 — The Gallery is never the site's proof of ownership on its own.** Twenty
views of a place prove a building (Photography Direction §5.2); the decision being
taken proves the company.

### Dependencies

- Depends entirely on library volume, which depends on access to a working shift.
- Until the library exists, this surface does not exist — it cannot be built around
  the absence of images, because images at volume are its whole content. Recorded at
  [§53](#53-open-questions-and-dependencies).

---

## 24. Journal

**Traces to:** Brand Bible §21 Journal, §16.6 · Creative Direction Book §20 Journal ·
Documentary Storyboard §25.2 the journal passage

### Purpose

To demonstrate knowledge of the material by telling one chapter in depth — for a
visitor who arrives from outside, and for the buyer deciding whether we know our
trade.

### Primary question answered

> Do you know your material?

### Evidence provided

Mechanism described precisely (rank 2), at a depth that only somebody who does the
work could sustain.

### Required outcome

The visitor learns something they did not know about leather or manufacturing, from
an article that does not sell anything.

### Relationship with other pages

Relationship surface. Each article is one chapter told in depth (Documentary
Storyboard §25.2) and links to the manufacturing chapter it belongs to. Articles never
link to Products as a recommendation.

### Rules

**R24.1 — It is not content marketing, opinion, or a news feed** (Creative Direction
Book §20, Journal). No announcements, no trade-show reports, no seasonal posts, no
"we are pleased to announce".

**R24.2 — An article is one chapter, told whole** (Documentary Storyboard §25.1 rule
3, §25.2). An article covering four chapters lightly is a trailer.

**R24.3 — An article ends with space, not with an action** (Documentary Storyboard
§25.2, "Ends by: space"). This is the one surface class whose close is not a next
step, and the exception is inherited rather than granted here.

**R24.4 — Expertise is demonstrated, never asserted** (Brand Bible §21). No article
states that the company is expert; the article being correct is the argument.

**R24.5 — Frequency is not a commitment.** Publishing on a schedule turns the surface
into a feed. An article exists when there is a chapter worth telling in depth.

**R24.6 — Articles are attributed to a named person** who could answer a question
about the content (rank 7).

### Dependencies

- [§45.1](#45-the-words-article-question-person) defines the Article model.
- The current build names this surface *blog*, which carries the register the
  Creative Direction Book rejects. Recorded at
  [§52.3](#52-what-phase-8-may-not-decide).

---

## 25. Enquiry

**Traces to:** Brand Bible §21 Contact / Enquiry, §8.1 stage 7 · Creative Direction
Book §20 Contact / Enquiry · Documentary Storyboard §25.2, ends by one action, once ·
Visual Design System §38

### Purpose

To be the single closing surface of the site: one action, low risk, with a human
being at the other end.

### Primary question answered

> How do I start?

### Evidence provided

| Required | Rank | Source |
| --- | --- | --- |
| A named person who reads what arrives | 7 | — |
| What happens next, stated plainly | 6 | — |
| The named place, with its address | 7, 5 | C1 |

### Required outcome

A buyer sends a specification, a drawing or a reference sample, and knows what will
happen and roughly when.

### Relationship with other pages

The terminal surface. Every Destination and Supporting surface hands to it; it hands
to nothing. It is the only surface in the system permitted to ask the visitor for
anything.

### Rules

**R25.1 — It sells nothing, adds no urgency, asks for no more than is needed, and
presents no alternatives** (Creative Direction Book §20, Contact / Enquiry).

**R25.2 — There is one enquiry surface, not two.** A "contact" surface and an
"enquiry" surface are two doors, and Brand Bible §3.4 permits one. The single surface
carries both the form and the direct means of contact (address, and a person).

**R25.3 — A direct route always exists beside the form.** A buyer who prefers to
write directly is not required to use a form; requiring it is friction moved onto the
visitor (E6).

**R25.4 — The surface states who reads it and what happens next** — and any stated
reply time is an operational commitment (Brand Bible §19.5). If operations cannot
guarantee it, it is not stated.

**R25.5 — The close is a statement of what happens next, not a request** (Brand
Bible §8.1 stage 7).

**R25.6 — Nothing is offered in exchange for contact** (E7): no brochure, no price
list, no sample kit as an incentive.

### Dependencies

- Part IX defines the flow, fields and states in full.
- "Replies within two business days" is unconfirmed as an operational guarantee
  (Brand Bible §25 item 6) and may not be published until it is.

---

## 26. System and legal surfaces

**Traces to:** Brand Bible §20.3 personality, §19 governance · Creative Direction
Book §20 404 · Visual Design System §41

### Purpose

To define the surfaces that exist for reasons other than the argument, and to keep
them from acquiring content that belongs elsewhere.

### Rules

**R26.1 — The set:**

| Surface | Purpose | Class |
| --- | --- | --- |
| **404** | State plainly that the address does not exist, and offer the two most likely destinations | System |
| **Privacy** | State what is recorded and why ([§50](#50-what-is-recorded-and-what-is-never-recorded)) | Legal |
| **Terms of use** | Only if legal counsel requires one | Legal |
| **Legal identity record** | Registration details, address, and the company's formal identity | Legal |
| **Search results** | Only if search exists ([§46](#46-search-filtering-browsing-and-relatedness)) | System |

**R26.2 — 404 is the one place personality is permitted** (Brand Bible §20.3,
Creative Direction Book §20). Brief and dry; it does not apologise at length, does
not sell, and does not break the register of the brand.

**R26.3 — A legal surface is a record, in the record voice**, and is never used to
carry marketing copy that could not be placed elsewhere.

**R26.4 — The privacy surface must be true of what the system actually does**
([§50](#50-what-is-recorded-and-what-is-never-recorded)). A privacy statement
describing tracking the brand has forbidden itself is a published falsehood, which on
this brand is the most expensive kind.

**R26.5 — No system surface carries the site's action** (X5). A 404 offers routes,
not an enquiry.

### Dependencies

- The legal identity record depends on the company name being confirmed (Brand Bible
  §25 item 1).
- [§50](#50-what-is-recorded-and-what-is-never-recorded) must be settled before the
  privacy surface can be written.

---
---

# PART IV — USER JOURNEYS

---

## 27. How a journey is written

**Traces to:** Brand Bible §8 the emotional journey · Documentary Storyboard §25.1
the compression law · Creative Direction Book §4

### Purpose

To state the form every journey below takes, and the rules that make a journey a
design instrument rather than a description of clicking.

### Rules

**R27.1 — Every journey has six parts**, in this order: **Arrival, Questions,
Evidence needed, Trust building, Decision, Exit.** No journey adds a seventh and none
omits one.

**R27.2 — Every journey runs the seven emotional stages** (Brand Bible §8.1) and no
stage may be skipped. The journeys differ in **where each stage happens**, never in
whether it does.

**R27.3 — Every journey passes through Recognition** (X3): C3 or C7. A journey that
reaches Exit without passing through one is a defect in the journey, not a variant of
it.

**R27.4 — A journey is not a funnel.** It has no required order of surfaces, because
every surface can be somebody's first (E4). What is fixed is which surfaces must be
**reachable in one step** at each stage — not which the visitor takes.

**R27.5 — Every journey is written from the visitor's questions**, not from the
company's sections. Where a question has no surface, the register at
[§14](#14-the-objection-register) is amended and so is Part III.

**R27.6 — Exit is designed.** Most visits end without an enquiry, and that is not a
failure ([§2.4](#2-success-and-how-it-is-judged)). Every journey states what the
visitor leaves with, because what they leave with is what they bring to the second
visit.

### Dependencies

- Part III must be settled before a journey can be validated: a journey referencing a
  surface that does not exist is an architecture defect.

---

## 28. Journey: the first-time visitor

**Traces to:** Brand Bible §8.1 stages 1–3, §6.2 · Creative Direction Book §4 ·
Documentary Storyboard §7 C1, C3

### Purpose

The base journey. Every other journey is a variation on it, and it assumes the
visitor has no prior knowledge of the company and low patience.

### The journey

| Part | Definition |
| --- | --- |
| **Arrival** | Any surface. Most often Home, Products or a product record from a search, or Quality from a colleague's link. Stage 1: neutral, mildly guarded, in assessment mode |
| **Questions** | "What is this?" then, within seconds, "Is this a real factory or a trading house?" |
| **Evidence needed** | The place in use (rank 5) within the first view; **one decision being taken** (rank 1) before they leave the first surface |
| **Trust building** | Structural unfamiliarity first (stage 2), then Recognition (stage 3). No credential appears yet (X4) |
| **Decision** | Whether to open a second surface. That is the only decision available at this stage, and the whole first surface is designed for it |
| **Exit** | Either to Manufacturing — the intended path — or away, carrying one specific detail. **A visitor who leaves after one surface must leave with the detail**, because it is what brings them back |

### Rules

**R28.1 — The first surface must discharge its obligation before elaborating** (E3).
A first-time visitor gives the site seconds, not minutes.

**R28.2 — The second-surface decision is the site's real first conversion**, and the
only mechanism permitted to influence it is evidence.

**R28.3 — No first-time visitor is asked for anything** on their first surface (X5,
R25.1). The action exists at the close, not at the entry.

**R28.4 — Nothing on a first surface may be interpretable as advertising** (Brand
Bible §8.1 stage 1 failure mode). A visitor who classifies us as marketing in the
first two seconds spends the rest of the visit confirming it.

### Dependencies

- Every surface must be able to serve as surface one (L15, E4).
- Requires E1 photography on the surfaces most likely to be arrived at first: Home,
  Manufacturing, Quality, Products.

---

## 29. Journey: the returning visitor

**Traces to:** Brand Bible §8.2 rules of the journey · UX Blueprint X15 · Creative
Direction Book L15

### Purpose

The visitor who has been here before — usually days later, usually with a colleague,
usually to find one specific thing.

### The journey

| Part | Definition |
| --- | --- |
| **Arrival** | Directly to the surface they remember, or to Home as a hub. Stage: they resume at Confidence or Respect, not at Arrival |
| **Questions** | "Where was that thing about the cutting?" "Can I show this to my technical colleague?" "What did they say about audits?" |
| **Evidence needed** | The same evidence, in the same place, unchanged. **Stability is the evidence for this visitor** |
| **Trust building** | Consistency. Finding the surface where they left it is a small proof of repeatability, and finding it moved is a small proof of the opposite |
| **Decision** | Whether to involve a colleague, and whether to write |
| **Exit** | To Enquiry, or to a link sent to a colleague — which starts a first-time journey for somebody else (X13) |

### Rules

**R29.1 — The site does not recognise them** (X15). No "welcome back", no resumed
position, no personalised ordering, no recently-viewed. A returning buyer who is
greeted by name has learned that they were being watched.

**R29.2 — Addresses are permanent.** A surface's address does not change; if content
moves, the old address continues to resolve to it. A broken link sent to a colleague
is a failure of Repeatability in the only place the buyer can see it.

**R29.3 — Every surface is linkable at chapter depth** (X13, R17.3), because the
returning visitor's most valuable act is sending one to somebody else.

**R29.4 — Nothing is time-sensitive.** No content that expires, no "latest", no
dated banner. A surface that looked current last month and looks stale this month has
aged the company (Brand Bible P5).

### Dependencies

- R29.2 makes address stability a Phase 8 obligation
  ([§51](#51-what-phase-8-must-build)).

---

## 30. Journey: the OEM buyer

**Traces to:** [§8](#8-the-oem-buyer) · Documentary Storyboard §7 C3, C5 · Brand
Bible §8.1 stages 3–7

### Purpose

The primary journey. The site is architected so that this one is short, complete and
unforced.

### The journey

| Part | Definition |
| --- | --- |
| **Arrival** | Home, or Manufacturing from a search on a process term, or a product record from a specification search |
| **Questions** | "Is the floor theirs?" → "Where is the skill?" → "Will four hundred match?" → "What happens when one is wrong?" → "Can they hold my specification?" |
| **Evidence needed** | C3 the decision (rank 1) — the mind-changing moment; C5 the joining (rank 2) — read twice; C4 and C6 for process; C7 for the gate; the equipment named on Technology; product records for their own category |
| **Trust building** | Recognition at C3, then Trust from the audit finding on Quality, then Confidence from Technology and the record. **In that order** (X4) |
| **Decision** | Whether to send a specification. This is the decision the whole site exists to enable |
| **Exit** | Enquiry, carrying a specification, a drawing or a reference sample. Or a saved link and a return in a week — an equally successful outcome at this stage |

### Rules

**R30.1 — Manufacturing must be reachable in one step from every surface**, because
this journey routes through it from wherever it starts.

**R30.2 — C5 must be independently linkable** (R8.2), because the technical colleague
is brought in at this stage and is sent that chapter alone.

**R30.3 — The path from a product record to the process that produces it is one
step.** A buyer looking at a specification asks "how is this made" immediately, and
the answer is a chapter, not a paragraph on the record.

**R30.4 — Nothing on this journey asks for the enquiry before Confidence** (Brand
Bible §8.2 rule 1). Conversation offered before Confidence is not taken.

### Dependencies

- **Blocking on E1 photography of a decision.** Without C3, this journey has no
  Recognition moment and the site's primary purpose is unmet.

---

## 31. Journey: the retail brand

**Traces to:** [§9](#9-the-retail-brand-owner) · Documentary Storyboard §7 C6, C9 ·
Creative Direction Book §20 Products

### Purpose

The relationship journey: a visitor choosing a company as much as a capability.

### The journey

| Part | Definition |
| --- | --- |
| **Arrival** | Products, usually from a category search, or Journal from a material question |
| **Questions** | "Do they make things like mine?" → "Would they take an order my size?" → "Will it be consistent?" → "What are they like to deal with?" |
| **Evidence needed** | Breadth across categories; C6 the finishing — care taken where nobody is checking; C9 what leaves — whose name goes on it; the tone of About and Journal, which for this visitor is evidence |
| **Trust building** | Slower and more diffuse than the OEM journey. Built by consistency of register across several surfaces rather than by one moment |
| **Decision** | Whether to write, and whether to say how small they are |
| **Exit** | Enquiry, frequently with a question rather than a specification. **That is a valid enquiry** and the form must not punish it ([§41](#41-fields-validation-error-and-success)) |

### Rules

**R31.1 — Nothing on any surface implies a minimum size of buyer.** No "for leading
brands", no client-scale signalling, no volume thresholds stated as qualification.
Brand Bible §11.2 removes the vocabulary; this removes the architecture.

**R31.2 — Products must not read as a store to this visitor**, who is the most likely
to expect one (R19.1, R19.2).

**R31.3 — The enquiry accepts a question, not only a specification**
([§40](#40-the-enquiry-flow)). A form that requires a drawing turns this visitor away
at the last step.

**R31.4 — Journal is on this journey's critical path** and is therefore not optional
content. It is the surface where tone becomes evidence (R9.1).

### Dependencies

- Requires C6 coverage and finished-work photography across more than one category.

---

## 32. Journey: the procurement manager

**Traces to:** [§10](#10-the-procurement-manager) · Documentary Storyboard §7 C7, C8
· Brand Bible §19

### Purpose

The verification journey. Short, adversarial by role, and the one most likely to end
in a veto.

### The journey

| Part | Definition |
| --- | --- |
| **Arrival** | Quality, directly, from a colleague's link or a supplier questionnaire |
| **Questions** | "Who audits them and when?" → "Is documentation contemporaneous?" → "What is the non-conformance route?" → "What are they not telling me?" |
| **Evidence needed** | Certification records with issuer, reference and date (rank 3); C8 records produced during the work (rank 4); C7 the gate (rank 1); the stated limits (rank 6) |
| **Trust building** | Entirely evidential. Nothing about register or tone moves this visitor. **The absence of an expected item is what they notice**, which is why the limits are published |
| **Decision** | Approve, query, or veto. Frequently they never contact us at all — the check is silent |
| **Exit** | Usually back to the colleague who sent the link, with an answer. Sometimes to Enquiry with a documentation question |

### Rules

**R32.1 — Quality must be complete without any other surface** (E4, X13). This
visitor frequently sees exactly one surface, and it is this one.

**R32.2 — Every certification record must be checkable independently** (X12). A logo
without an issuer, reference and date is worse than no logo: it invites the check and
fails it.

**R32.3 — Nothing on this journey may state an unconfirmed figure** (R10.1). One
unverifiable number invalidates the surface for this visitor permanently.

**R32.4 — The non-conformance route is published**, because this visitor's real
question is what happens when something is wrong, and the answer is a process
(rank 6).

**R32.5 — The silent exit is a success.** This journey frequently produces no
enquiry and no signal. Measuring it as a drop-off would be wrong
([§50](#50-what-is-recorded-and-what-is-never-recorded)).

### Dependencies

- Depends entirely on the Facts Register for certification records.
- **Blocking on C7** if the Recognition moment is to be present.

---

## 33. Journey: the international buyer

**Traces to:** [§11](#11-the-international-importer-and-distributor) · Documentary
Storyboard §7 C9 · Creative Direction Book §20 Export

### Purpose

The logistics journey: practical, fast, and decided almost entirely by the specificity
of the answers.

### The journey

| Part | Definition |
| --- | --- |
| **Arrival** | Export, directly, or Products then Export |
| **Questions** | "Have they shipped to my market?" → "Who prepares the documents?" → "What terms?" → "Who answers if a container is held?" |
| **Evidence needed** | Markets served, as a record (rank 3, 8); C9 dispatch as an operation (rank 5); the documents issued and by whom (rank 4); a named person (rank 7); the failure path (rank 6) |
| **Trust building** | Specificity. A vague logistics answer is read as inexperience faster than a vague manufacturing answer is |
| **Decision** | Whether we are worth a trial shipment |
| **Exit** | Enquiry, opening with destination and terms |

### Rules

**R33.1 — Export must state what is known and name what is agreed per order**
(R21.3). Silence on terms reads as inexperience; a fabricated term is worse.

**R33.2 — The enquiry must ask for destination**, because it is the first thing the
answer depends on ([§41.3](#41-fields-validation-error-and-success)).

**R33.3 — No market is named that the Register has not confirmed** (R21.2).

**R33.4 — Language and units are stated explicitly** on any record this visitor
reads. A dimension without a unit and a date without a format are both failures of
the record voice for an international reader.

### Dependencies

- The markets list, the documentation list and any terms are all Facts Register
  items ([§53](#53-open-questions-and-dependencies)).

---
---

# PART V — PAGE HIERARCHY

---

## 34. The six classes of surface

**Traces to:** Brand Bible §21 · Creative Direction Book §19, §20 · Documentary
Storyboard §8 chapters are unequal · Visual Design System §2.3 the level budget

### Purpose

To classify every surface by the role it plays in the experience, so that questions
about prominence, navigation, linking and content priority are answered by class
rather than case by case.

### Rules

**R34.1 — The six classes:**

| Class | Definition | Behaviour it earns |
| --- | --- | --- |
| **Destination** | Carries a buyer question the site exists to answer, and can hold a visitor alone | In primary navigation; reachable in one step from everywhere; may carry a peak |
| **Supporting** | Answers a narrower question that follows from a Destination | In primary navigation only if a journey depends on reaching it directly; always reachable in two steps |
| **Evidence** | Exists to be checked rather than read; frequently the only surface a visitor sees | In primary navigation; complete alone; never summarised elsewhere |
| **Relationship** | Builds regard rather than capability; off the critical path by design | Reachable, not promoted; never carries the site's action as its purpose |
| **Transactional** | Asks the visitor for something | Exactly one in the system; reachable from every surface; never asks before Confidence |
| **Legal / system** | Exists for correctness rather than argument | Reachable from the footer record; never promoted; never carries the action |

**R34.2 — The classification:**

| Surface | Class | Why |
| --- | --- | --- |
| **Home** | Destination | Carries the site's first obligation — prove the building exists — and must hold a visitor who sees nothing else |
| **Manufacturing** | Destination | Carries the complete story and the primary Recognition moment. It is the surface the site is built around |
| **Products** | Destination | Answers a buyer question directly and is the most common arrival point from search |
| **Quality** | **Evidence** | Its job is to be checked, not read. It is frequently the only surface a compliance visitor sees, and it must be complete alone (R32.1) |
| **Gallery** | **Evidence** | It corroborates rather than argues. Volume is its content; it never carries a claim by itself (R23.6) |
| **Technology** | Supporting | Machinery is not a chapter (Documentary Storyboard §7.4). It answers a question that follows from Manufacturing |
| **Export** | Supporting | Logistics follows from capability. It is a Destination only for one profile, and that profile arrives directly |
| **About** | Relationship | It answers who, not whether. Brand Bible §21 keeps it free of mythology; keeping it off the critical path is what allows that |
| **Journal** | Relationship | Expertise demonstrated, never asserted. It ends in space, not in an action (R24.3), which is the defining behaviour of this class |
| **Enquiry** | Transactional | The only surface permitted to ask (R25.1) |
| **404, privacy, terms, legal record, search results** | Legal / system | Correctness, not argument (R26) |

**R34.3 — Class decides prominence, not quality.** A Supporting surface is not a
lesser surface: Technology may be the most-read surface for a technical buyer. Class
states what the surface is responsible for, and therefore how the system treats it.

**R34.4 — A surface may not change class to gain prominence.** If Export is being
promoted to a Destination because a campaign needs it, the campaign is wrong, not the
classification.

**R34.5 — There is exactly one Transactional surface**, and no other surface may
acquire transactional behaviour — no inline forms, no embedded capture, no
sub-enquiry (X5, E7).

### Dependencies

- [§36](#36-priority-by-surface) assigns content priority by class.
- [§37](#37-navigation-behaviour) derives primary navigation from class, under the
  five-destination limit set by the Visual Design System.

---
---

# PART VI — CONTENT PRIORITY

---

## 35. The five priority bands

**Traces to:** Creative Direction Book §19.1 answer before elaborating, L13 · Brand
Bible §12 writing standards · Visual Design System §2.3

### Purpose

To give every surface a fixed order of content responsibility, so that a decision
about what to cut, what to defer and what to refuse is already made before the
argument starts.

### Rules

**R35.1 — The five bands:**

| Band | Definition | Test |
| --- | --- | --- |
| **Primary message** | The one thing the surface exists to establish. Discharged first, before elaboration (E3) | If removed, the surface has no reason to exist |
| **Secondary message** | The thing that follows immediately for the visitor who stayed | If removed, the surface is thinner but still honest |
| **Supporting information** | The detail that lets a professional verify the first two | If removed, the surface becomes an assertion |
| **Optional information** | Present where the evidence exists; absent without comment where it does not (X8) | If removed, nobody notices |
| **Forbidden information** | Content that would damage the surface, however well made | If present, the surface fails a locked-document law |

**R35.2 — Bands are an order of responsibility, not a position on a surface.** Where
content sits is a Visual Design System and Phase 8 question. What must be discharged
first is this document's.

**R35.3 — Optional information never becomes primary because it is available.** A
surface does not lead with the thing that happens to be easiest to produce — which is
how a site ends up leading with certifications (X4).

**R35.4 — Forbidden information is forbidden on that surface even when true.** A
capability figure is not false; it is forbidden on Home because Trust arrives after
Recognition.

### Dependencies

- [§36](#36-priority-by-surface) applies the bands.
- The Facts Register decides publishability independently of priority: a Primary item
  that is unconfirmed is not published, and the surface is built without it (R4.3).

---

## 36. Priority by surface

**Traces to:** Brand Bible §21, §19.4 · Creative Direction Book §20 · Documentary
Storyboard §7

### Purpose

To state, for every surface, the five bands — so that content authors and developers
never have to infer them.

### Rules

**R36.1 — Home**

| Band | Content |
| --- | --- |
| Primary | The place, in use, and one decision being taken |
| Secondary | What the company does, in one plain descriptor, and where |
| Supporting | The route into the process; the route into the range |
| Optional | A single named person; a single record |
| **Forbidden** | Certifications; capability figures; a summary of the site; a services list; testimonials; any claim before evidence; more than one action |

**R36.2 — Manufacturing**

| Band | Content |
| --- | --- |
| Primary | The ten chapters, in order, told whole |
| Secondary | The mechanism of each operation, described precisely |
| Supporting | Equipment named where used; records where produced |
| Optional | Named people at their work; material detail |
| **Forbidden** | A process diagram, icon row or infographic; step counting; an action mid-surface; a partial chapter |

**R36.3 — Technology**

| Band | Content |
| --- | --- |
| Primary | The equipment, named plainly, in the room, at work |
| Secondary | What each machine does, and what it guarantees — repeatability |
| Supporting | Machine records; the manufacturing chapter each belongs to |
| Optional | Maintenance and calibration practice, where confirmed |
| **Forbidden** | Tonnage, speed, capacity, manufacturer, country of origin (all unconfirmed); futurism; celebration; a specification grid; a features section |

**R36.4 — Products**

| Band | Content |
| --- | --- |
| Primary | The range of work the floor can produce |
| Secondary | What each category is, in construction terms |
| Supporting | Product records: materials, construction, dimensions, finishes, what varies |
| Optional | The manufacturing chapter that produced the category |
| **Forbidden** | Price; stock; availability; MOQ (unconfirmed); "new"; sorting by popularity; a cart, wishlist or configurator; item counts; an unqualified quality claim |

**R36.5 — Quality**

| Band | Content |
| --- | --- |
| Primary | The gate: something refused, and what happened to it |
| Secondary | Where inspection happens in the sequence, and how |
| Supporting | Certification records with issuer, reference and date; records produced during the work; the non-conformance route |
| Optional | Confirmed figures, when the Register confirms them |
| **Forbidden** | Badges before process; AQL band, rejection rate, gate count (all unconfirmed); the word *quality* as a standalone claim; any assertion of quality preceding a demonstration of inspection |

**R36.6 — Export**

| Band | Content |
| --- | --- |
| Primary | Dispatch as an operation, and the documents issued |
| Secondary | Markets already served, as a record |
| Supporting | Who prepares documentation; the failure path; a named person |
| Optional | Confirmed terms and lead times, when the Register confirms them |
| **Forbidden** | Maps, globes, arcs, aircraft; unconfirmed incoterms or lead times; unconfirmed markets; reach as drama |

**R36.7 — About**

| Band | Content |
| --- | --- |
| Primary | The place, named and located; people at their work |
| Secondary | What the company does and does not do |
| Supporting | The founding fact, stated once; the legal identity |
| Optional | One person's account of their own work, attributed |
| **Forbidden** | Founder mythology; a milestone timeline; a values list; a portrait grid; awards; a mission statement |

**R36.8 — Gallery**

| Band | Content |
| --- | --- |
| Primary | Photographs at volume, unretouched, organised by chapter |
| Secondary | Each photograph's record: place, date, what is happening |
| Supporting | The route from a set to the chapter it belongs to |
| Optional | — |
| **Forbidden** | Aesthetic themes; sequencing for drama; retouching toward beauty; uncaptioned images; a lightbox or slideshow |

**R36.9 — Journal**

| Band | Content |
| --- | --- |
| Primary | One chapter, told in depth, correctly |
| Secondary | The named author who could answer a question about it |
| Supporting | The link to the manufacturing chapter it belongs to |
| Optional | Material references and sources |
| **Forbidden** | Announcements; opinion; trade-show reports; seasonal content; a publishing schedule as a commitment; a product recommendation; an action at the close |

**R36.10 — Enquiry**

| Band | Content |
| --- | --- |
| Primary | The single action, and what to send |
| Secondary | Who reads it and what happens next |
| Supporting | The direct route: address, and a person |
| Optional | The named place, photographed |
| **Forbidden** | Selling; urgency; alternatives; an incentive for contact; more fields than are needed; an unconfirmed reply-time promise |

### Dependencies

- Every "Forbidden" row traces to a locked-document law; the table is the operational
  form of Creative Direction Book §20's "must never" column and Brand Bible §19.4.
- Content authors work from this chapter; [§42](#42-how-a-content-model-is-written)
  gives them the field-level form.

---
---

# PART VII — NAVIGATION

---

## 37. Navigation behaviour

**Traces to:** Creative Direction Book L15, §22.4 persistent elements · Visual Design
System §37 navigation and footer · Documentary Storyboard §25.1 never re-order ·
Brand Bible §3.4 Restraint

### Purpose

To define what navigation is responsible for and how it behaves, without designing
it.

### Rules

**R37.1 — Navigation exists for one reason**: a visitor may arrive anywhere (L15) and
must be able to establish where they are and what else exists. It is not a menu of
offers and it is not a summary of the site.

**R37.2 — Primary navigation carries the Destinations and the Evidence surfaces, and
nothing else.** The Visual Design System permits not more than five destinations;
this document assigns them:

| Position | Surface | Class | Why it earns the position |
| --- | --- | --- | --- |
| 1 | Manufacturing | Destination | The spine, and the surface every journey routes through |
| 2 | Products | Destination | The most common arrival from search, and the retail journey's entry |
| 3 | Quality | Evidence | Complete alone, and the only surface a compliance visitor sees |
| 4 | Export | Supporting | Promoted because the international journey arrives directly and would otherwise need two steps |
| 5 | About | Relationship | The only surface answering *who*, and the shortest route to a person |

**Home is reached by the company name**, which is not a navigation item — it is the
identity, and it is present on every surface. **Enquiry is not in primary
navigation**: it is the close of the journey, and placing it in the bar puts the ask
before Confidence (X5, Brand Bible §8.2 rule 1).

**R37.3 — Technology, Gallery and Journal are reached from the surfaces they belong
to**, and from the footer record. Technology follows from Manufacturing; Gallery is
linked from every surface making a photographic claim; Journal is linked from About
and from the chapter each article belongs to.

**R37.4 — Navigation order is the chapter order, not a ranking of importance** (X2).
Manufacturing before Products before Quality before Export reproduces C1–C9, which is
the order the story is told in every medium.

**R37.5 — Navigation states location.** The current surface is identifiable from the
navigation itself; a visitor who cannot tell where they are has been asked to
remember.

**R37.6 — Navigation does not persist over evidence or silence** (Visual Design
System §37.1, Creative Direction Book §22.4). This is an experience rule as much as a
visual one: an element that follows the visitor converts a held moment into an
advertisement.

**R37.7 — No dropdown, no mega-menu, no hover-revealed panel** (Visual Design System
§37.1). A structure needing a dropdown has more than five destinations, and the
remedy is the structure.

**R37.8 — Secondary navigation exists only within a surface that has depth** —
Products, Technology, Journal, and the chapter set of Manufacturing. It lists
siblings and the route up. It never lists the whole site again.

**R37.9 — The footer is the index and the record.** It carries the legal identity,
the named place and address, every surface including the ones absent from primary
navigation, and the legal surfaces. It is the one place a complete index is correct,
because a record is meant to be complete.

**R37.10 — No surface is more than two steps from any other.** Primary navigation
plus the footer index guarantees it; a third step means the structure has grown a
level it did not earn.

### Dependencies

- The five-item limit is set by the Visual Design System §37.1; this chapter decides
  which five.
- R37.6 constrains Phase 8's implementation of scroll behaviour, which is already
  fixed by Visual Design System §42.6.

---

## 38. Cross-linking, breadcrumbs and the small field

**Traces to:** Documentary Storyboard §25.1 the compression law · Creative Direction
Book L10, L15 · Visual Design System §35.3, §41

### Purpose

To define how surfaces refer to each other, how a visitor knows where they are in a
hierarchy, and what navigation becomes when the field is small.

### Rules

**R38.1 — Cross-link philosophy: a link exists to let a claim be checked or a story
be continued.** Two legitimate kinds, and no third:

| Kind | Example | Rule |
| --- | --- | --- |
| **Verification link** | A claim about cutting links to the chapter that shows it | Points to evidence, always downward in specificity |
| **Continuation link** | A chapter ends by naming the next reasonable surface | Points forward in the chapter order, never backward (X2) |

**R38.2 — A link is never a recommendation.** No "you may also like", no "related
products", no promotional cross-sell. A recommendation is the store mechanic Products
is forbidden from acquiring (R19.2).

**R38.3 — A fact links once per surface** (L10). The same destination linked three
times in one surface reads as insistence.

**R38.4 — Breadcrumb philosophy: breadcrumbs exist only where a hierarchy is real and
deeper than two levels.** In this system that is Products alone — category,
sub-category, product record. Everywhere else the primary navigation states location
(R37.5) and a breadcrumb would be a trail through a structure that has no depth.

The Visual Design System removes breadcrumbs from the surfaces where five
destinations do not need a trail; this chapter states the one place the hierarchy
earns them: **a product record, arrived at directly from a search, whose visitor
needs to know what category they are inside.**

**R38.5 — A breadcrumb states position; it is not a second navigation.** It shows the
route up and nothing else.

**R38.6 — Small-field navigation philosophy: the same five destinations, reached from
one control, presented as a full field.** Nothing is removed on a small field and
nothing is added (X13, [§48](#48-what-survives-a-smaller-field)). A visitor on a phone
is the same buyer.

**R38.7 — Navigation on a small field does not float, dock, or follow.** R37.6 holds
at every size; the persistent bar is more damaging on a small field, not less,
because it occupies a larger share of the visitor's attention.

**R38.8 — The footer index is identical at every field size.** It is a record, and a
record is not abridged for convenience.

### Dependencies

- R38.4 is the one place this document adds a component behaviour the Visual Design
  System did not anticipate; it is recorded as a dependency at
  [§53](#53-open-questions-and-dependencies) so the two documents stay consistent.

---

## 38A. Navigation logic

**Traces to:** Documentary Storyboard §7 the canonical chapter set, §25.1 the
compression law · Creative Direction Book L15, §19.1 · Brand Bible §21 · Visual
Design System §37

### Purpose

To state the logical relationship between surfaces — which is the parent of which,
which is an extraction from which, and which paths exist — so that a developer never
has to infer structure from a navigation bar.

**This chapter defines logic, not navigation.** The behaviour of navigation is fixed
at [§37](#37-navigation-behaviour); the arrangement of it belongs to the Visual
Design System and Phase 8. What follows is a diagram of relationships, and it would
be equally true of a printed contents page or a spoken tour.

### The conceptual diagram

```
                              ┌──────────────┐
                              │     HOME     │  origin — carries C1 and C3,
                              └──────┬───────┘  produces Recognition alone
                                     │
                                     ▼
                        ┌────────────────────────┐
                        │     MANUFACTURING      │  the spine — C1…C10, in order
                        └────────────┬───────────┘
                                     │
        ┌──────────────┬─────────────┼─────────────┬──────────────┐
        │              │             │             │              │
        ▼              ▼             ▼             ▼              ▼
  ┌───────────┐  ┌───────────┐ ┌───────────┐ ┌──────────┐  ┌───────────┐
  │TECHNOLOGY │  │ PRODUCTS  │ │  QUALITY  │ │  EXPORT  │  │  GALLERY  │
  │  C4 · C5  │  │ C6 · C9   │ │C2·C7·C8   │ │ C8 · C9  │  │ corrobo-  │
  │           │  │           │ │           │ │          │  │  ration   │
  └─────┬─────┘  └─────┬─────┘ └─────┬─────┘ └────┬─────┘  └─────┬─────┘
        │              │             │            │              │
        ▼              ▼             │            │              │
  ┌───────────┐  ┌───────────┐       │            │              │
  │  machine  │  │ category  │       │            │              │
  │  record   │  │     ▼     │       │            │              │
  └───────────┘  │sub-category│      │            │              │
                 │     ▼     │       │            │              │
                 │  product  │       │            │              │
                 └─────┬─────┘       │            │              │
                       │             │            │              │
                       └─────────────┴────────────┴──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   ENQUIRY    │  terminal — hands to a person
                              └──────────────┘

        ┌──────────┐        ┌──────────┐
        │  ABOUT   │        │ JOURNAL  │   relationship surfaces — reachable
        │ C1 · C10 │        │ one      │   from anywhere, on no critical path,
        │          │        │ chapter  │   Journal ends in space, not in Enquiry
        └──────────┘        └──────────┘

        ┌─────────────────────────────────────────────────────┐
        │  FOOTER RECORD — complete index, every surface,     │
        │  identical at every field size, on every surface    │
        └─────────────────────────────────────────────────────┘
```

### Rules

**R38A.1 — There are five kinds of relationship, and no sixth:**

| Relationship | Meaning | Example |
| --- | --- | --- |
| **Origin** | Carries a compressed form of the whole and hands to the spine | Home → Manufacturing |
| **Spine** | Carries the complete story in canonical order; everything else derives from it | Manufacturing |
| **Extraction** | Answers a narrower question using chapters lifted from the spine, in the same order | Manufacturing C4–C5 → Technology |
| **Corroboration** | Holds evidence that other surfaces reference but does not argue on its own | Gallery |
| **Terminal** | Receives; hands to nothing | Enquiry |

**R38A.2 — Every extraction links back to the chapter it came from.** A surface that
lifts C7 and does not name where C7 lives has detached a chapter from the story, and
Documentary Storyboard §25.1 rule 3 requires a chapter to be told whole or not at all.

**R38A.3 — Every path to Enquiry passes through Recognition** (X3). This is the one
property of the graph that is load-bearing: whatever route a visitor takes, C3 or C7
is on it. A path that reaches the terminal without one is a defect in the graph, not a
shortcut through it.

**R38A.4 — Descent is permitted; re-ordering is not** (X2). A visitor may go
Manufacturing → Technology → machine record — deeper into the same subject — but no
surface, filter or link may present C7 before C3, or Export before the work it
dispatches.

**R38A.5 — The logical descent and the navigation order are different things, and
both are correct.**

- **Navigation order** is the canonical chapter order: Manufacturing, Products,
  Quality, Export, About (R37.2, R37.4). It states what exists and in what sequence
  the story runs.
- **Logical descent** is how a buyer actually deepens: from the spine into an
  extraction, and from an extraction into a record.

A visitor going Home → Manufacturing → Technology → Quality → Products → Enquiry has
descended legitimately at every step. Nothing in this system requires the navigation
order and a visitor's path to match, and nothing may force a path (E8: depth is
available, never imposed).

**R38A.6 — Every surface has a route up and a route on.** Up is its parent in the
diagram; on is the next reasonable step (E5). A product record's route up is its
sub-category; its route on is Enquiry (R19.6).

**R38A.7 — The relationship surfaces sit outside the graph deliberately.** About and
Journal are reachable from everywhere and are on no critical path
([§34](#34-the-six-classes-of-surface)). Placing them on a path would make them
obligatory, and an obligatory relationship surface becomes the founder story and the
content marketing that Creative Direction Book §20 forbids.

**R38A.8 — The footer record closes the graph.** Every surface, including those
absent from primary navigation, is reachable from every surface in one step via the
footer index (R37.9, R37.10). This is what guarantees no dead ends (X7) without
adding links to the surfaces themselves.

**R38A.9 — No cycle exists back from Enquiry.** The terminal hands to a person, not
to another surface (R25). A "return to the site" path after an enquiry is a
continuation of selling after the ask, which Brand Bible §8.1 stage 7 forbids.

### Dependencies

- The graph is the canonical chapter set; if Documentary Storyboard §7 were ever
  amended, this diagram is amended with it.
- R38A.3 depends on Recognition existing on Home, Manufacturing and Quality, which
  depends on rank-1 evidence ([§53.1](#53-open-questions-and-dependencies)).

---

---

# PART VIII — CALL TO ACTION STRATEGY

---

## 39. The action strategy

**Traces to:** Brand Bible §3.4 Restraint, §8.1 stage 7, §16.4 luxury · Creative
Direction Book §20 Contact / Enquiry · Documentary Storyboard §25.2 ends by one
action, once · Visual Design System §35.2

### Purpose

To define the single action of the site, the one lesser action permitted, where each
belongs, where they are forbidden, and what emotional state each answers.

### Rules

**R39.1 — There is one primary action for the entire site:**

> **Send us the specification, the drawing or the sample.**

It is one action, once (Documentary Storyboard §25.2). Its wording is copy and
belongs to Brand Bible §11.1 and §12; its **behaviour** is fixed here: it names the
act, it names what to send, and it leads to [Enquiry](#25-enquiry) and to nothing
else.

**R39.2 — There is one secondary action, and it is a link rather than a demand:**

> **Continue to the next chapter.**

It is the continuation link (R38.1). It is not a conversion, is never styled or
counted as one, and exists because every surface ends knowing what comes next (E5).

**R39.3 — Where the primary action appears:**

| Surface | Appears | Position in the journey |
| --- | --- | --- |
| Home | Once, at the close | After the Recognition moment |
| Manufacturing | Once, after C10 | After the complete telling |
| Products — category | Once, at the close | After the range is shown |
| Products — product record | Once, at the close | After the specification |
| Quality | Once, at the close | After the evidence, never before |
| Export | Once, at the close | After documentation is explained |
| About | Once, at the close | After the people and the place |
| Technology | **Never** | A machine is not a reason to make contact |
| Gallery | **Never** | Evidence is not a sales surface |
| Journal | **Never** | It ends in space (R24.3) |
| Enquiry | It is the surface | — |
| Legal / system | **Never** | R26.5 |

**R39.4 — Where the action must never appear:**

| Never | Why |
| --- | --- |
| Above or beside evidence being examined | Visual Design System §31.2; an action beside a photograph converts evidence into advertising |
| During a held moment | Creative Direction Book §12.4; a held moment sharing its field with an offer is not one |
| Mid-surface, in the middle of a chapter | X5, R17.6; the argument is not interrupted to ask |
| More than once on a surface | L10; repetition reads as insecurity |
| Before Confidence in any journey | Brand Bible §8.2 rule 1; conversation offered before confidence is not taken |
| In primary navigation | R37.2 |
| In a persistent bar, floating control or exit interruption | X6 |
| On Technology, Gallery, Journal or any system surface | R39.3 |

**R39.5 — Actions that do not exist in this system:**

| Does not exist | Removed by |
| --- | --- |
| Newsletter subscription | E7, R25.6; and the brand has nothing to send on a schedule (R24.5) |
| Download the catalogue / capability deck | E7 — nothing is gated |
| Request a quote as a distinct action | It is the same act as the enquiry; two names for one door is two doors |
| Book a call / schedule a meeting | The close is a statement of what happens next, not a calendar |
| Live chat | X6 |
| Sample request as a separate flow | It is an enquiry with a sentence in it ([§40](#40-the-enquiry-flow)) |
| Account creation, login, portal | R3.4, E7 |

**R39.6 — The emotional state each action belongs to** (Brand Bible §8.1):

| Action | Stage | Why there |
| --- | --- | --- |
| Continue to the next chapter | Stages 2–5: Curiosity through Confidence | The visitor is still assessing; the only reasonable request is attention |
| **Send the specification** | **Stage 7: Conversation** | It is the only stage at which an ask is not an interruption. Offered earlier, it undoes stage 6 |

**R39.7 — Action hierarchy:** primary above secondary, and nothing below. There is no
tertiary action, no "learn more", no soft conversion. Where a designer wants a third
level, the answer is a continuation link or nothing.

**R39.8 — The action never changes its wording between surfaces.** One behaviour for
one class of event: a buyer who sees the same act named the same way on five surfaces
learns that the company says the same thing every time it speaks.

### Dependencies

- The Visual Design System permits exactly one action per surface and forbids a
  secondary button; R39.2's continuation is a link, which is consistent with it.
- R39.1's wording is copy and is not fixed here.

---

## 39A. Decision fatigue

**Traces to:** Brand Bible §3.4 Restraint — one action rather than a choice of three,
§16.4 luxury as the absence of anxiety · Creative Direction Book L3 no competing
focal points, L10, §23 the default answer is no · Visual Language Atlas §14 hierarchy
is a kindness

### Purpose

To govern the **accumulated** cost of choosing across a visit — as distinct from
[§6A](#6a-cognitive-load-principles), which governs the cost at any one moment.

Fatigue is cumulative and invisible. A buyer who has made eleven small choices
arrives at the twelfth — the one that matters — with less capacity than they had, and
the twelfth is ours.

### Rules

**R39A.1 — Never present two equal actions.** Brand Bible §3.4: one action rather
than a choice of three. Two actions of equal weight do not double the chance of
either; they produce arbitration, and arbitration at the moment of the ask is
experienced as pressure.

Where a lesser action is genuinely needed, it is a continuation link and is
unmistakably subordinate (R39.2, R39.7).

**R39A.2 — Never present multiple equal destinations.** The five in primary
navigation are unequal by class and by order (R37.2, R37.4): a spine, two
destinations, an evidence surface and a relationship surface. A set of five presented
as interchangeable is a menu, and a menu asks the visitor to do the prioritising the
company declined to do (Atlas §14.2).

This is why Home does not carry a row of equal routes to every surface (R16.1) and
why there is no audience selector (R7.3).

**R39A.3 — Never ask an unnecessary question.** Fixed at
[§41.4](#41-fields-validation-error-and-success): no job title, no budget, no "how
did you hear about us", no marketing consent. Each is a decision imposed on the
buyer for the company's convenience, and E6 places friction on the company instead.

**R39A.4 — Every decision must have a purpose the visitor can see.** A choice whose
consequence is not visible is a choice the visitor cannot make well, and they will
either guess or stop. Before any decision is introduced, three things must be true:
the visitor can tell what each option leads to, the decision is reversible in one
step, and the decision is theirs rather than ours.

**R39A.5 — The system never asks the visitor to choose what it can determine.** If
the answer is derivable from what they have already done, it is derived. If it is
ours to decide, we decide it. A question asked to avoid making a decision internally
is fatigue exported.

**R39A.6 — The decision budget for a complete journey is small, and it is
enumerable.** Across an entire visit, a buyer should face no more than a handful of
genuine decisions ([§6A.1](#6a-cognitive-load-principles) lists them). **If a journey
in Part IV cannot be walked within that budget, the architecture is wrong**, not the
visitor.

**R39A.7 — No decision is presented before its evidence.** Asking a visitor to choose
a category before they believe the factory exists is asking them to invest in a
premise they have not accepted. This is X4 and E1 in decision form: the order is
evidence, then choice.

**R39A.8 — The enquiry is the last decision, and nothing follows it.** No upsell, no
"while you wait", no related products on the confirmation (R41.8). A decision offered
after the final decision converts a completed act into an open one.

**R39A.9 — Remove, then simplify, then explain — in that order.** The instinct on
encountering a difficult choice is to explain it better. L13 says otherwise: first
ask whether the choice needs to exist, then whether it can be made for the visitor,
and only then how to state it clearly. Most fatigue in commercial sites is
well-explained choices that should never have been offered.

**R39A.10 — Fatigue is why the site does not personalise.** Every personalisation
mechanic — a recommendation, a recently-viewed rail, a "for you" ordering — presents
additional options at the moment the visitor was about to stop choosing. It is also
forbidden for a separate and stronger reason (X15), and the two reasons are
independent.

### Dependencies

- The decision list at [§6A.1](#6a-cognitive-load-principles) is the operative
  inventory; adding to it requires amending this document.
- R39A.6 makes the journeys in Part IV testable: walk each and count.

---

---

# PART IX — FORMS

---

## 40. The enquiry flow

**Traces to:** Brand Bible §8.1 stage 7, §18.5 how buyers are treated, §19.5 ·
Creative Direction Book §20 Contact / Enquiry · Visual Design System §38

### Purpose

To define the enquiry as an experience: what the visitor is doing, what the company
is doing, and the sequence between them.

### Rules

**R40.1 — The flow has four steps and no more:**

| Step | Who acts | What happens |
| --- | --- | --- |
| 1 | The visitor | Says what they want made, or asks a question |
| 2 | The visitor | Says who they are and where they are |
| 3 | The visitor | Sends it |
| 4 | **The company** | A named person reads it and replies |

Step 4 is in the flow deliberately. The enquiry is not complete when the form is
submitted; it is complete when a person replies, and designing the first three steps
without the fourth is how a form becomes a capture mechanism.

**R40.2 — There is one flow, not several.** No separate quote flow, sample flow,
partnership flow or general-contact flow. One door (R25.2, R39.5).

**R40.3 — A question is as valid as a specification** (R31.3). The flow accepts
"can you make something like this?" without penalty, because the retail journey ends
there and because a question is the beginning of the same conversation.

**R40.4 — Nothing is required that a person could ask for later** (E6). Every field
is justified at [§41.3](#41-fields-validation-error-and-success) or it is not in the
form.

**R40.5 — The flow is one continuous act, not a wizard.** No multi-step progression,
no progress indicator, no partial save. A buyer's enquiry is one message.

**R40.6 — The flow states its own cost before it begins**: what to have ready, and
roughly how long it takes. A visitor who knows the shape of the ask is not being
processed.

**R40.7 — No qualification, scoring, routing or filtering of the visitor** occurs in
the flow. A form that decides whether a buyer is worth answering has moved the
company's judgement onto the buyer's screen — and R31.1 forbids implying a minimum
size of buyer anywhere.

**R40.8 — The direct route is always available beside the flow** (R25.3): an address
and a person. Some buyers will always prefer to write, and requiring the form is
friction the company should absorb.

### Dependencies

- Step 4 is an operational commitment, not a design element (Brand Bible §19.5). A
  stated reply time cannot be published until operations guarantee it
  ([§53](#53-open-questions-and-dependencies)).
- Attachment handling is a Phase 8 concern; the requirement that a specification,
  drawing or sample reference can be attached is fixed here
  ([§41.3](#41-fields-validation-error-and-success)).

---

## 41. Fields, validation, error and success

**Traces to:** Visual Design System §38 forms · Brand Bible §3.2 Evidence, §12
writing standards · Motion Direction M11 · Creative Direction Book §20

### Purpose

To fix what is asked, what is never asked, and how the system behaves when the
visitor is wrong, when the system is wrong, and when everything works.

### Rules

**R41.1 — Trust principles for the whole form:**

1. **Every field must justify itself to the visitor**, not to the company. A field
   whose only purpose is qualification is friction moved onto the buyer (E6).
2. **Nothing is asked twice**, in the form or afterwards (L10).
3. **What happens to the information is stated** where it is asked, not in a policy
   the visitor must go and find.
4. **The information is used to answer the enquiry and for nothing else** — no list,
   no sequence, no third party (X15, [§50](#50-what-is-recorded-and-what-is-never-recorded)).
5. **A named person receives it** (R40.1 step 4).

**R41.2 — Required fields**, and the justification of each:

| Field | Why it is required |
| --- | --- |
| **What you want made, or your question** | It is the enquiry. Without it there is nothing to answer |
| **Name** | A reply is written to a person, not to an address |
| **Email address** | The reply has to go somewhere |
| **Country** | The answer depends on it — documentation, shipping, and often materials (R33.2) |

Four. Nothing else is required, in any circumstance.

**R41.3 — Optional fields**, each of which makes the reply better and none of which
blocks the enquiry:

| Field | Why it is offered |
| --- | --- |
| **Company** | Context for the reply; frequently absent for a new brand, which must not be penalised |
| **Specification, drawing or reference sample** | The single most valuable thing an enquiry can carry ([§2.2](#2-success-and-how-it-is-judged)) |
| **Quantity, or expected order size** | Asked, never used to filter (R40.7) |
| **Timing** | It changes the answer, and buyers frequently do not know it yet |
| **Telephone** | Offered because some buyers prefer it. Never required — requiring it is a sales posture |

**R41.4 — Fields that are never asked:**

| Never asked | Why |
| --- | --- |
| Job title, role, seniority | Qualification (R40.7) |
| Budget | It is a negotiation, not an entry condition, and asking reclassifies the relationship |
| How you heard about us | It serves our measurement, not their enquiry (E6) |
| Marketing consent, newsletter opt-in | Nothing is sent on a schedule (R39.5) |
| Anything the visitor already told us | L10 |
| A "message" field in addition to the enquiry | Two boxes for one thought |

**R41.5 — Validation philosophy: validate on leaving a field and again on
submission, never while typing** (Visual Design System §38.4). Correcting somebody
mid-sentence is a discourtesy, and this brand treats buyers as colleagues.

Validation checks only what the system genuinely needs: that an address could receive
a reply, that the enquiry is not empty. **It does not police format beyond that** — a
telephone number written in any national convention is a valid telephone number.

**R41.6 — Error philosophy: an error message states what is wrong and what to do**
(Brand Bible §12; Visual Design System §38.4). It never blames, never says "invalid
input", and never discards what the visitor has written. **Nothing typed is ever
lost** — a failed submission returns the enquiry intact, because losing a buyer's
words is the most expensive error this system can make.

**R41.7 — Where the failure is ours, we say so.** A system error states that the
fault is on our side and gives the direct route (R40.8). It never implies the visitor
did something wrong.

**R41.8 — Success philosophy: the confirmation states what happens next and who is
handling it.** Not "thank you for your interest". It confirms what was received, and
names the next step (E5, Brand Bible §8.1 stage 7).

- **A copy of the enquiry goes to the visitor**, because they have just sent a
  specification to a stranger and should hold a record of it. That is Evidence
  applied to our own conduct.
- **Nothing is sold on the confirmation.** No related products, no downloads, no
  "while you wait" (R25.1).
- **The confirmation does not promise a time unless operations guarantee it**
  (Brand Bible §19.5).

**R41.9 — Waiting is stated in words** (X14, Motion Direction M11, Visual Design
System §38.4). If a submission takes time, the surface says so.

**R41.10 — Disabled controls do not exist** (Visual Design System §38.5). Where an
action is unavailable, the condition is stated in words and the action appears when
it is true.

### Dependencies

- The four required fields must be reviewed against whatever the company's own reply
  process needs; if a fifth is genuinely required, this chapter is amended rather
  than the form extended ([§53](#53-open-questions-and-dependencies)).
- R41.8's copy-to-sender has a data consequence that the privacy surface must state
  (R26.4).

---
---

# PART X — CONTENT MODELS

---

## 42. How a content model is written

**Traces to:** Brand Bible §3.3 one source of truth per fact, §19 the Facts Register
· Documentary Storyboard §13.6 captions as specification · Photography Direction
§24.4 provenance

### Purpose

To state the form every model in this Part takes, and the rules that apply to all of
them, so that each model can be short.

### Rules

**R42.1 — Every model states six things**: purpose, mandatory fields, optional
fields, relationships, validation rules, and an example. Nothing else. A model is a
contract about meaning, not a database design.

**R42.2 — A field is mandatory only if the content type is meaningless without it.**
Everything else is optional, and an optional field that is absent is absent — never
filled with a placeholder value (X8, Photography Direction §24.5 in its content
form).

**R42.3 — Every field that could carry a Register-governed fact is marked
`REGISTER`.** A `REGISTER` field may hold a value in the record and **may not be
published** until Brand Bible §19.3 classifies it Confirmed. This is the mechanism by
which the site can be built now and published truthfully later.

**R42.4 — One source of truth per fact** (Brand Bible §3.3). A fact lives in exactly
one model. Where two surfaces show the same fact, they reference the same record;
they do not each hold a copy.

**R42.5 — Every model that carries a photograph carries its provenance**: what it
shows, where, when, by whom, and with what permission (Photography Direction §24.4).
A photograph without provenance is not publishable, so the field is mandatory
wherever an image is.

**R42.6 — Every model carries an authoring note stating which chapter it belongs
to** (C1–C10). This is what keeps the site's structure identical to the story's
structure (X2), and it is what lets any record be linked back to the chapter that
proves it.

**R42.7 — No model carries presentational fields.** No layout choice, no variant, no
"featured style", no colour, no ordering intended to create emphasis. Emphasis is a
Visual Design System matter, and a content model that carries it has moved design
into the content layer where it cannot be governed.

**Ordering fields are permitted** where order is a fact — the sequence of
manufacturing stages, the order of operations in a process — and forbidden where it
is a preference.

### Dependencies

- The existing build derives hierarchy from content structure; these models define
  what each record must mean, not how it is stored.
- [§52.3](#52-what-phase-8-may-not-decide) records where existing content already
  carries `REGISTER` values that are currently unpublishable.

---

## 43. The work: category, product, stage, machine

**Traces to:** Brand Bible §21, §19.4 · Creative Direction Book §20 Products,
Technology · Documentary Storyboard §7 C3–C6

### Purpose

The four models that describe what the company makes and how.

### Rules

**R43.1 — Product Category**

| | |
| --- | --- |
| **Purpose** | To name a family of work the floor can produce, in construction terms, so a buyer can locate their requirement |
| **Mandatory** | Name · what the category is, in construction terms · the manufacturing chapter it derives from · at least one photograph with provenance |
| **Optional** | Parent category · constructions available · materials typically used · the machines involved · a note on what varies |
| **Relationships** | Parent category (0–1) · child categories (0–n) · products (0–n) · manufacturing stage (1) · machines (0–n) |
| **Validation** | A category with fewer than three products is not a category (R19.7) · no price, stock, availability or MOQ field exists on this model at all · the quality claim is unavailable (Brand Bible §11.2) |
| **Example** | *Western tack* — a category naming a family of constructions, deriving from the cutting and joining chapters, with the sub-categories the floor actually distinguishes |

**R43.2 — Product**

| | |
| --- | --- |
| **Purpose** | To be a specification: what a piece is, what it is made of, how it is constructed, and what varies |
| **Mandatory** | Name · category · materials · construction · at least one photograph with provenance |
| **Optional** | Dimensions where fixed · finishes available · hardware options · what varies between orders · the manufacturing chapters that produced it · `REGISTER` lead time · `REGISTER` minimum quantity |
| **Relationships** | Category (1) · manufacturing stages (0–n) · machines (0–n) · articles (0–n) |
| **Validation** | Every dimension carries its unit (R33.4) · no unqualified quality claim (Brand Bible §11.2) · `REGISTER` fields unpublished until Confirmed · no price, stock or availability field exists |
| **Example** | *One-ear headstall* — materials, construction, the finishes offered, and the note that hardware is specified per order |

**R43.3 — Manufacturing Stage**

| | |
| --- | --- |
| **Purpose** | To hold one chapter of the canonical set as a content record, so that every other model can reference the chapter that proves it |
| **Mandatory** | Chapter identifier (C1–C10) · name · the question it answers (Documentary Storyboard §7) · the operation described precisely · canonical order |
| **Optional** | Machines used · materials involved · records produced · people named, with consent · photographs with provenance |
| **Relationships** | Machines (0–n) · categories (0–n) · articles (0–n) · certifications (0–n, for C7 and C8) |
| **Validation** | Exactly ten stages exist; an eleventh requires amending the Documentary Storyboard (§7) · order is fixed and may not be edited (X2) · a stage with insufficient evidence is unpublished, never partially published (R17.4) |
| **Example** | *C3 — The decision.* Question: where is the skill that cannot be seen? Operation: cutting along the backbone, and why |

**R43.4 — Machine**

| | |
| --- | --- |
| **Purpose** | To record a piece of equipment plainly: what it is, what it does, and what it guarantees |
| **Mandatory** | Name · the operation it performs · the manufacturing stage it belongs to · what it makes repeatable · at least one photograph of it in use, with provenance |
| **Optional** | `REGISTER` manufacturer · `REGISTER` country of origin · `REGISTER` tonnage or force · `REGISTER` speed · `REGISTER` per-shift capacity · `REGISTER` any performance specification · applications · calibration practice |
| **Relationships** | Manufacturing stage (1) · categories (0–n) · products (0–n) |
| **Validation** | **Every specification-like attribute is `REGISTER`** and unpublished until Confirmed (Brand Bible §19.4) · no superlative, no futurism, no celebration (Brand Bible §16.6) · the machine record never carries the site's action (R39.3) |
| **Example** | *Clicking press* — what it cuts, why even pressure decides whether an edge burnishes, and which stage it belongs to. Force, area, manufacturer and origin held as `REGISTER` and withheld |

### Dependencies

- **The existing machine records carry manufacturer, country of origin, cutting
  force, capacity and power as published values.** All five are on Brand Bible §19.4
  and are therefore currently unpublishable. Recorded at
  [§52.3](#52-what-phase-8-may-not-decide).

---

## 44. The proof: certification, factory, country, testimony

**Traces to:** Brand Bible §19 the Facts Register, §19.5 · Documentary Storyboard §7.4
· Creative Direction Book §20 Quality, Export

### Purpose

The four models that carry verification, and the strictest validation rules in the
system.

### Rules

**R44.1 — Certification**

| | |
| --- | --- |
| **Purpose** | To record a third-party finding so that a stranger can check it without asking us |
| **Mandatory** | Name of the standard or scheme · **issuing body** · **reference or certificate number** · **date of issue** · what it covers · what it does not cover |
| **Optional** | Expiry or next audit date · scope limitations · the manufacturing stage it applies to · the document itself, where the issuer permits publication |
| **Relationships** | Manufacturing stage (0–n) · factory (1) |
| **Validation** | **All six mandatory fields present or the record is not published** (X12) · the whole record is `REGISTER` · it never appears earlier in a journey than the process that earned it (X4) · it is never rendered as part of a row of marks (Documentary Storyboard §7.4) |
| **Example** | A social-compliance audit: scheme, body, reference, date, the sites covered, and plainly what the audit did not examine |

The "what it does not cover" field is mandatory and is unusual. It exists because
this visitor's real question is what the certificate does not prove
([§10](#10-the-procurement-manager)), and because a scope stated by us is rank-6
evidence (E9).

**R44.2 — Factory**

| | |
| --- | --- |
| **Purpose** | To record the place: the single fact the entire brand rests on |
| **Mandatory** | Name · full address · country · what happens there |
| **Optional** | `REGISTER` floor area · `REGISTER` number of lines · `REGISTER` headcount · year established · photographs with provenance |
| **Relationships** | Certifications (0–n) · manufacturing stages (0–n) · countries served (0–n) |
| **Validation** | Every quantitative attribute is `REGISTER` (Brand Bible §19.4) · the address is the real address or the record is not published · there is exactly one factory record unless a second real site exists |
| **Example** | The named building, its address, and the operations carried out in it. Floor area, lines and headcount held and withheld |

**R44.3 — Country**

| | |
| --- | --- |
| **Purpose** | To record a market the company has actually shipped to |
| **Mandatory** | Country name · `REGISTER` confirmation that goods have been shipped there |
| **Optional** | `REGISTER` documentation issued for that market · notes on requirements |
| **Relationships** | Factory (1) |
| **Validation** | **A country record is a record of fact, not of ambition** (R21.2) · a country never becomes a surface (R11.3) · it is never rendered as a map, arc or globe (Creative Direction Book §20) |
| **Example** | A destination market, confirmed, with the documentation set that accompanies a shipment to it |

**R44.4 — Testimony**

| | |
| --- | --- |
| **Purpose** | To carry a real, attributed, permissioned statement by a named person at a named company |
| **Mandatory** | Exact words · name · role · company · country · **written permission on file** · date |
| **Optional** | The product or programme it refers to |
| **Relationships** | Country (0–1) · category (0–1) |
| **Validation** | **All seven mandatory fields or it is not published** (Brand Bible §19.5) · it is never edited for length or polish · it is never rendered as a rotating set or a wall (Visual Design System §41) |
| **Example** | **None exists.** Brand Bible §19.4 lists all testimonials as unconfirmed |

**R44.5 — The zero rule.** Brand Bible §19.5: one real quote outperforms three
invented ones; **zero outperforms one invented one.** The Testimony model exists so
that a real one can be published the day it arrives — not so that the site can be
built expecting some.

### Dependencies

- Every model in this chapter is blocked on the Facts Register
  ([§53](#53-open-questions-and-dependencies)).
- The existing build carries a testimonials record; under R44.4 it is unpublishable
  until each entry has all seven fields ([§52.3](#52-what-phase-8-may-not-decide)).

---

## 45. The words: article, question, person

**Traces to:** Brand Bible §12 writing standards, §18 people philosophy ·
Documentary Storyboard §25.2 the journal passage, §7.4 · Creative Direction Book §20
Journal

### Purpose

The three models that carry written knowledge and human attribution.

### Rules

**R45.1 — Article**

| | |
| --- | --- |
| **Purpose** | To tell one chapter in depth, demonstrating knowledge of the material |
| **Mandatory** | Title · the chapter it tells · the body · a named author who could answer a question about it · date written |
| **Optional** | Photographs with provenance · the categories it relates to · sources or references · a stated limit of the author's knowledge |
| **Relationships** | Manufacturing stage (1) · categories (0–n) · person (1, as author) |
| **Validation** | **One chapter, told whole** (R24.2) · no announcement, opinion, event report or seasonal content (R24.1) · no product recommendation · no action at the close (R24.3) · no publishing-schedule field, because frequency is not a commitment (R24.5) |
| **Example** | An article on why a cut follows the backbone, told as the cutting chapter in depth, by the person who cuts |

**R45.2 — Question (FAQ)**

| | |
| --- | --- |
| **Purpose** | To answer a question of fact that a buyer asks after the surfaces have done their work — never instead of them |
| **Mandatory** | The question, in the buyer's words · the answer · **the surface it belongs to** |
| **Optional** | The manufacturing stage or certification it references |
| **Relationships** | Exactly one parent surface (1) — a question is never free-floating |
| **Validation** | **A question attaches to the surface whose subject it concerns; there is no FAQ surface** (R15.6, [§14.4](#14-the-objection-register)) · a question that duplicates an objection in [§14](#14-the-objection-register) is a signal that the surface failed and is fixed there instead · answers state facts, never reassurance |
| **Example** | On Export: what documentation accompanies a shipment. Not: "why choose us?" |

**R45.3 — Person**

| | |
| --- | --- |
| **Purpose** | To attribute — a caption, a quotation, an article, an enquiry reply. **Not to populate a team page** (R12.3) |
| **Mandatory** | Name · role · **written consent on file** (Photography Direction §8.5) |
| **Optional** | The operations they perform · a photograph at their work, with provenance · years at the company, where they consent to it |
| **Relationships** | Manufacturing stages (0–n) · articles (0–n) · photographs (0–n) |
| **Validation** | **No consent, no record** · never rendered as a portrait grid or a leadership list (Documentary Storyboard §7.4) · no biography, no personal narrative, no quotation about the company's values |
| **Example** | The cutter named in a caption on the cutting chapter, with consent recorded |

**R45.4 — The attribution rule.** Every rank-7 piece of evidence in this system —
a named person, answerable — comes from this model. It is small, and it is the model
that converts a company into somebody.

### Dependencies

- Blocking on the written consent process (Photography Direction §30.3 item 7).
- R45.2's parent-surface requirement means questions cannot be authored before Part
  III surfaces exist.

---
---

# PART XI — SEARCH AND DISCOVERY

---

## 46. Search, filtering, browsing and relatedness

**Traces to:** Visual Design System §40.4 search, §41 · Documentary Storyboard §25.1
never re-order · Creative Direction Book L1, §23 the default answer is no

### Purpose

To decide how a visitor finds things, and to remove the discovery mechanics that
would convert this system into a catalogue.

### Rules

**R46.1 — Search philosophy: search is a fallback for a structure that has become
large, not a substitute for one.** It is available only where the record set exceeds
what structure can reach comfortably — in this system, potentially the product
records and nowhere else.

**A site whose story needs search has a structure problem** (Visual Design System
§40.4), and adding search would conceal it.

**R46.2 — Search is never the primary means of reaching a Destination or Evidence
surface.** Those five are reachable in one step, always (R37.2).

**R46.3 — Search returns records, not marketing.** Results are the specification-level
facts that matched, with the surface each belongs to. No promoted results, no
sponsored ordering, no "did you mean" that guesses commercially.

**R46.4 — Zero results is a real answer** ([§47](#47-the-ten-states)): it states
plainly that nothing matched and offers the two most likely destinations. It never
substitutes approximate results and pretends they matched, which is a small false
statement of the kind X12 exists to prevent.

**R46.5 — Filtering philosophy: filters exist only where the visitor already knows
what they are filtering by.** In this system that is product attributes — construction,
material, category — and nothing else.

**Filters that do not exist:** price, availability, popularity, newness, rating,
"best for", lead time, minimum quantity. Each is either a store mechanic (R19.2) or
an unconfirmed fact (Brand Bible §19.4).

**R46.6 — Filtering never reorders the story** (X2). A filter narrows a record set;
it may not present manufacturing chapters out of canonical order, and there is no
filter on Manufacturing, Quality, Export or Gallery — those are told, not queried.

**R46.7 — Browsing philosophy: browsing is descent through a real hierarchy**, and
the only real hierarchies in this system are the product structure, the chapter set,
and the machine records. A visitor browses by going deeper into something that exists,
never by shuffling a flat set.

**R46.8 — Internal linking philosophy** is fixed at [§38.1](#38-cross-linking-breadcrumbs-and-the-small-field):
verification links and continuation links, and no third kind. **No link exists to
distribute authority, to build an internal link graph, or to serve a search engine.**
A link that serves a machine rather than a reader is the category filler the Factory
Test removes.

**R46.9 — Related content philosophy: relatedness is structural, never behavioural.**
Two records are related because one is the chapter that produced the other, or because
they share a category — never because visitors who looked at one looked at the other.
Behavioural relatedness requires watching visitors, which X15 forbids.

**R46.10 — There is no recommendation anywhere in this system** (R38.2, X15).

### Dependencies

- Whether search exists at all depends on the eventual size of the product record
  set; it is an open question at [§53](#53-open-questions-and-dependencies) rather
  than a decision deferred to Phase 8.

---
---

# PART XII — STATES

---

## 47. The ten states

**Traces to:** Motion Direction M11 motion never conceals · Visual Design System
§38.4, §38.5 · Brand Bible §3.2 Evidence, §12 writing standards · Creative Direction
Book §20 404

### Purpose

To define what the system says when something is missing, slow, broken or complete —
because these are the moments a buyer learns most about how a company behaves.

### Rules

**R47.1 — The principle that governs all ten:**

> **A state is a fact about the system, and facts are stated plainly.** No state is
> disguised, softened, apologised for at length, or used as an opportunity to sell.

This is the Facts Register applied to the system's own condition: a system that
misrepresents its own state to a buyer has done a small version of the thing the
whole brand exists not to do.

**R47.2 — The ten states:**

| State | What the visitor is told | What is forbidden |
| --- | --- | --- |
| **Loading** | That something is being fetched, in words, if it takes long enough to notice (X14) | A skeleton screen, an indeterminate spinner, a progress animation that does not reflect real progress (Motion Direction M11) |
| **Empty** | That there is nothing here yet, and why — a category with no records, a Journal with no articles | Placeholder records, sample content, "coming soon" as a permanent state (X8) |
| **Error** | What failed, whether the fault is ours, and what to do next (R41.7) | Blame, jargon, an error code alone, a comic apology |
| **Offline** | That the connection is gone and nothing was lost | Pretending to work; queuing an enquiry silently and losing it |
| **Maintenance** | That the site is briefly unavailable, and the direct route to a person (R40.8) | An indefinite notice with no route to contact |
| **404** | That the address does not exist, briefly and dryly, with the two most likely destinations (R26.2) | Apologising at length, selling, breaking the register, an action (R26.5) |
| **Permission denied** | Does not occur. **Nothing in this system is permissioned** (E7) — if it appears, it is a defect | A login prompt, a "request access" route |
| **No results** | That nothing matched, plainly, with the two most likely destinations (R46.4) | Approximate results presented as matches; "we found these instead" |
| **Timeout** | That it took too long, that nothing was lost, and the direct route | Silent failure; a retry that resubmits an enquiry twice |
| **Success** | What was received, who has it, and what happens next (R41.8) | Selling; a promise of time operations cannot keep; "thank you for your interest" |

**R47.3 — Nothing the visitor has written is ever lost, in any state** (R41.6). This
applies to error, offline, timeout and maintenance equally, and it is the single most
important behaviour in this Part.

**R47.4 — No state carries the site's action** except Success, which carries what
happens next rather than a new ask.

**R47.5 — Every state has a route to a person.** Where a system fails, the direct
route is the answer (R40.8), and offering it is the clearest possible demonstration
that a human being is behind this.

**R47.6 — An empty state is a content decision, not a design one.** A category with
no products is not published (R19.7); a Gallery with no photographs does not exist
(R23). Empty states exist for genuine transience — a search with no match — not as
a way to ship a structure before its content.

### Dependencies

- The Visual Design System already forbids skeletons and indeterminate spinners
  (§38.4) and disabled controls (§38.5); this chapter states the experience
  consequence rather than restating the rule.
- R47.3 makes enquiry persistence a Phase 8 obligation
  ([§51](#51-what-phase-8-must-build)).

---
---

# PART XIII — RESPONSIVE EXPERIENCE

---

## 48. What survives a smaller field

**Traces to:** Visual Design System §45, §46 · Creative Direction Book L15 · Brand
Bible §6.4 · Documentary Storyboard §25.1

### Purpose

To state what the experience owes a visitor on a small field — in terms of
responsibility rather than arrangement, which belongs to the Visual Design System.

### Rules

**R48.1 — The governing principle:**

> **A buyer on a phone is the same buyer.** They are frequently on a factory floor, in
> a warehouse, or in transit between the two — which is to say, they are frequently
> in the exact circumstance the company is being assessed for.

Nothing is withheld from them on the grounds of field size.

**R48.2 — What must never disappear:**

| Never removed | Why |
| --- | --- |
| Any fact, specification or figure | Evidence is not a desktop feature (Visual Design System §46.3) |
| Any photograph that carries an argument | It is the argument (D1) |
| The provenance of any photograph | Photography Direction §24.4 |
| The route to every surface | X7, R38.8 — the footer index is identical at every size |
| The route to a person | R47.5 |
| The single action, at the close of the surfaces that carry it | R39.3 |
| Recognition — C3 or C7 in any journey | X3 |
| The stated limits | E9 |
| Every certification record's issuer, reference and date | X12 |

**R48.3 — What may collapse:**

| May collapse | Into |
| --- | --- |
| Primary navigation | A single control opening the same five destinations as a full field (R38.6) |
| Side-by-side comparison of records | Sequence, in the same order |
| A multi-level product hierarchy shown at once | One level at a time, with the route up always present |
| Secondary navigation within a surface | The route up and the siblings, nothing more |
| An extended set of photographs | Fewer, each at full presence — never more, each smaller (Visual Design System §30) |

**R48.4 — What changes priority:**

| On a small field | Change |
| --- | --- |
| The photograph | Rises. It takes the whole field, and the words wait (Visual Design System §45.3) |
| The chapter route | Rises. Reaching the next chapter matters more when less is visible at once |
| Supporting detail | Falls in position, never in availability |
| Cross-links within a passage | Fall, because a link tapped by accident is worse than a link found later |

**R48.5 — What remains identical:**

- The order of the story (X2).
- The obligation each surface discharges, and the order it discharges it in (E3).
- The single action, its wording, and where it is forbidden (R39.4).
- The number of questions asked at enquiry — **four required fields, at every size**
  ([§41.2](#41-fields-validation-error-and-success)). A shortened mobile form implies
  the desktop form asked for things it did not need.
- Every state's behaviour ([§47](#47-the-ten-states)).
- The footer record (R38.8).

**R48.6 — Nothing is added on a small field.** No app prompt, no "call us" bar, no
sticky action, no device-specific offer (X6).

### Dependencies

- The Visual Design System (§45, §46) governs how these behaviours are expressed;
  this chapter governs what is owed.

---
---

# PART XIV — ACCESSIBILITY EXPERIENCE

---

## 49. Accessibility as experience

**Traces to:** Visual Design System §47 accessibility as respect · Brand Bible §3.2
Evidence, §18.5 how buyers are treated · Documentary Storyboard §7 the chapter order

### Purpose

To state the experience obligations that follow from the Visual Design System's
position — that accessibility here is respect rather than compliance — without
restating its measured rules.

### Rules

**R49.1 — The philosophy, in one line:**

> **A person who cannot read, reach or operate the record cannot check it — and this
> brand's entire position is that it may be checked** (Brand Bible §3.2, Visual Design
> System §47.1).

An inaccessible surface is therefore not a failure of compliance. It is a withdrawal
of the offer the company exists to make.

**R49.2 — Keyboard experience.** Every action, link, field and control reachable and
operable without a pointing device, in the order the surface reads. The first
available route on any surface skips the navigation and reaches the content, because
a visitor arriving at the fifth product record should not traverse five destinations
to read it.

**R49.3 — Reading order is the documentary order.** The order a surface is read in —
by a person, by a screen reader, by a keyboard — is the canonical chapter order (X2).
A surface whose underlying order differs from its visible order tells two different
stories, and one of them is the one the machine reads aloud.

**R49.4 — Screen reader priorities**, in order:

1. **Where am I** — the surface's identity, immediately.
2. **What is here** — the structure of the surface, traversable without reading it
   all.
3. **The evidence** — every photograph's record read as the specification it is
   (Documentary Storyboard §13.6), never as "image of".
4. **The records** — a table announced as a table, a specification as a list of
   label-and-value pairs, so a fact can be checked rather than heard as prose.
5. **The action** — named by the act it performs (R39.1).

**R49.5 — There are no decorative images** (Visual Design System §47.4). Every
photograph in this system is evidence and carries a record; an image whose description
would be empty is an image that should not be published. This is an architecture
consequence, not a markup instruction: **the content model makes the record mandatory**
([§42.5](#42-how-a-content-model-is-written)).

**R49.6 — Motion reduction.** The system's motion is minimal by construction (Motion
Direction M1: motion is never evidence). With motion removed, nothing becomes harder
to understand — and that is a **test of the architecture**, not only of the
implementation: if a chapter's meaning depended on a transition, the chapter was
structured wrongly.

**R49.7 — Contrast philosophy.** Fixed by the Visual Design System §17.2 above the
published minimum, for a stated reason: the buyer reads in a warehouse, in daylight,
on an old screen. This document adds only the architectural consequence — **no
information is carried by appearance alone**, so every state, every status and every
category is also a word ([§47](#47-the-ten-states),
[§39](#39-the-action-strategy)).

**R49.8 — Error communication.** An error states what is wrong, whether the fault is
ours, and what to do (R41.6, R41.7). It reaches a person who is not looking at the
screen at the moment it occurs, and it never depends on position or appearance to be
found.

**R49.9 — Nothing meaningful is behind hover** (Visual Design System §47.5). A fact
revealed only by hovering is a fact withheld from every touch device and every
keyboard, which is a large share of the buyers this site is for.

**R49.10 — Language and units are stated** (R33.4). An international buyer and a
screen reader need the same thing: a dimension with its unit, a date in an unambiguous
form, a language declared.

### Dependencies

- The measured requirements — contrast, focus, target size, reduced motion — are
  fixed by the Visual Design System §47 and are not restated here.
- R49.5 is enforced by the content models, not by review.

---
---

# PART XV — ANALYTICS

---

## 50. What is recorded, and what is never recorded

**Traces to:** X15 · Visual Design System §35.3 no visited state · Brand Bible §3.2
Evidence, §18.5, §19 governance · Visual Language Atlas §35.1 the Museum Test

### Purpose

To define what the company may learn from the site, under a constraint the brand has
already accepted: that it does not watch its buyers.

### Rules

**R50.1 — The governing constraint.** The Visual Design System removed the
visited-link state on the grounds that **the brand does not record where a buyer has
been on its own site**. That is a brand position, not a technical one, and it governs
this Part:

> **Measurement is aggregate and anonymous. There is no per-person trail, no
> profile, no identity resolution, no cross-site record, and no re-marketing.**

A supplier that surveils a buyer's browsing has changed the relationship the Brand
Bible describes, and no measurement is worth that.

**R50.2 — What may be recorded**, all of it aggregate:

| Class | Events | Why it is worth knowing |
| --- | --- | --- |
| **Critical business** | An enquiry completed · an enquiry containing a specification, drawing or sample reference · a reply sent by a named person | These are the only two definitions of success this document accepts ([§2](#2-success-and-how-it-is-judged)) |
| **User success** | Reaching the Recognition chapter of a surface · reaching the end of the Manufacturing chapter set · opening a certification record · opening a product record · a surface being sent onward, where that is observable without identifying anybody | These indicate the journey happened, not who took it |
| **Trust** | Certification records opened · the Gallery entered · the limits passage reached · Quality reached directly from outside | Each is a visitor performing a check, which is the behaviour the site exists to enable |
| **Drop-off** | Enquiries begun and not sent · surfaces where a journey commonly ends before Recognition | The first is a form problem; the second is an evidence problem |
| **Search** | Terms entered · **terms returning nothing** | Zero-result terms are the single most useful signal the site produces: they are buyers telling us what our structure does not answer |
| **Enquiry** | Where the enquiry was begun from · which optional fields were used · errors encountered before sending | All three improve the form; none identifies the person |

**R50.3 — What is never recorded:**

| Never | Why |
| --- | --- |
| An individual's path through the site | X15, Visual Design System §35.3 |
| Any identity, profile, fingerprint or cross-site identifier | X15 |
| Session replay, mouse movement, scroll heatmapping of individuals | It is surveillance of a professional at work |
| Third-party advertising or re-marketing signals | The Museum Test: it is addressed to the sale, not to the subject |
| Anything shared with a party who is not answering the enquiry | R41.1 principle 4 |
| Personal data placed in an address, a link or a query | It leaks the buyer's interest to every system that touches the address |

**R50.4 — Measurement never changes the architecture without evidence of a real
failure.** A surface is not redesigned because a number moved; it is redesigned
because a buyer could not do something this document says they must be able to do.

**R50.5 — The measures explicitly rejected at [§2.4](#2-success-and-how-it-is-judged)
are not recorded either**, because a number that exists will eventually be optimised
toward.

**R50.6 — What is measured is stated publicly** on the privacy surface (R26.4), in
plain words, because a company whose position is *you may examine us* publishes what
it collects.

**R50.7 — The silent exit is not a failure** (R32.5). A compliance visitor who checks
Quality and leaves has been served completely, and any measure that treats that as a
loss is measuring the wrong thing.

### Dependencies

- No tool, platform or implementation is named or implied here; the events are the
  requirement.
- R50.6 makes this chapter a dependency of the privacy surface
  ([§26](#26-system-and-legal-surfaces)).

---
---

# PART XVI — IMPLEMENTATION HANDOFF

---

## 51. What Phase 8 must build

**Traces to:** Visual Design System §48 · Brand Bible §3.3 one source of truth ·
Documentary Storyboard §25.1

### Purpose

To state the complete set of things Phase 8 is responsible for producing, so that
implementation is a matter of execution rather than interpretation.

### Rules

**R51.1 — The surfaces**, exactly as specified in Part III: eleven, plus the system
and legal set, plus three sub-surface types. No more, and none omitted.

**R51.2 — The structural obligations:**

| Obligation | Source |
| --- | --- |
| Every surface complete alone, and linkable | E4, X13 |
| Every chapter of Manufacturing independently addressable | R17.3 |
| Addresses permanent; old addresses continue to resolve | R29.2 |
| Every surface reachable in at most two steps | R37.10 |
| The footer index complete at every field size | R38.8 |
| Reading order identical to the canonical chapter order | R49.3 |
| Nothing the visitor has written is ever lost | R47.3 |
| Four required fields at enquiry, at every field size | R41.2, R48.5 |

**R51.3 — The content models** at Part X, including the `REGISTER` mechanism
([§42.3](#42-how-a-content-model-is-written)) — which is the single most important
thing Phase 8 must build, because it is what allows the site to exist before the
Facts Register is settled without publishing anything unconfirmed.

**A `REGISTER` field must be structurally unpublishable until confirmed.** Not
hidden by a content author's discipline: unpublishable by the system.

**R51.4 — The states** at [§47](#47-the-ten-states), all ten, including the two that
should never occur (permission denied, and any state that loses a visitor's words).

**R51.5 — The measurement events** at [§50.2](#50-what-is-recorded-and-what-is-never-recorded),
and **the absence of everything at [§50.3](#50-what-is-recorded-and-what-is-never-recorded)**
— which is equally a build requirement.

**R51.6 — The publication gates.** Phase 8 builds the checks, not the habit:

| Gate | Refuses to publish |
| --- | --- |
| Provenance | A photograph without place, date, photographer and permission |
| Register | Any `REGISTER` field not classified Confirmed |
| Consent | A named person without consent on file |
| Certification | A certification record missing issuer, reference or date |
| Testimony | A testimony missing any of its seven mandatory fields |
| Category | A category with fewer than three products |
| Chapter | A partially told chapter |

### Dependencies

- The Visual Design System §48 governs how values are held; this chapter governs what
  behaviour exists.

---

## 51A. Implementation priority

**Traces to:** Documentary Storyboard §25.1 the compression law, §25.2 the medium
table · Brand Bible §8.3 where each medium enters and exits, §19 governance ·
Photography Direction §30 the library's dependency on access · Visual Design System
§50 known collisions

### Purpose

To state the order in which the surfaces are built, and why that order and not
another — so that a partially built site is at every point a **shorter telling
rather than a broken one**.

### The principle that produces the order

Documentary Storyboard §25.1: there is one story and there are many lengths;
chapters are dropped, never re-ordered, and Recognition is never dropped at any
extent. **A build order is a sequence of lengths.** The correct order is therefore
the one where each stage is a complete, honest telling of the company — not the one
where the most surfaces are finished fastest.

The test applied at every stage: *if the build stopped here, would what exists run
the seven stages and reach Recognition?*

### Rules

**R51A.1 — The order:**

| Priority | Surfaces | What it makes possible |
| --- | --- | --- |
| **1** | [Home](#16-home) · [Manufacturing](#17-manufacturing) · [Enquiry](#25-enquiry) | **The shortest complete telling.** Arrival through Conversation, with Recognition present at C3. A buyer can arrive, be convinced, and write |
| **2** | [Technology](#18-technology) · [Products](#19-products) · [Quality](#20-quality) | **Confidence and Evidence.** The two transitions after Recognition ([§13A](#13a-trust-progression)), and the surfaces three of the four buyer profiles arrive on directly |
| **3** | [Export](#21-export) · [Gallery](#23-gallery) · [Journal](#24-journal) · [About](#22-about) | **Respect, corroboration and relationship.** The international journey, the volume evidence, and the two surfaces that carry regard rather than capability |
| **4** | [System and legal](#26-system-and-legal-surfaces) | Correctness. Built last, **present at launch** — see R51A.6 |

**R51A.2 — Why Priority 1 is these three.** They are the minimum set that runs Brand
Bible §8.3's assignment for this medium — stages 1 to 7, complete, handing to an
enquiry. Home produces Recognition alone (R16.2); Manufacturing produces it at depth
and carries Confidence; Enquiry carries Conversation. **Remove any one and the medium
stops carrying the sequence it is assigned**, which no later surface repairs.

**R51A.3 — Why Quality is Priority 2 and not Priority 1**, despite being the surface a
compliance visitor arrives on directly. Two reasons, and they are structural rather
than a judgement about its importance:

1. **Trust arrives after Recognition** (X4). A Quality surface published before
   Manufacturing exists would be a credential with no process behind it, which is the
   badge failure Brand Bible §8.1 stage 4 names.
2. **It is the surface most exposed to the Facts Register.** Its certification
   records, AQL band, rejection rate and gate count are all unconfirmed (Brand Bible
   §19.4), so building it earlier does not make it publishable earlier.

**R51A.4 — Why Products is Priority 2 and not 1**, despite being the most common
arrival from search: a product record reached before the process exists produces
Confidence without Recognition, and Brand Bible §8.2 rule 1 states that a stage
offered out of order is not received. It also carries the heaviest content
requirement in the system — a three-level hierarchy with a specification per record —
and building it first would consume the effort that Recognition needs.

**R51A.5 — Why Gallery is Priority 3 and not earlier.** It is the only surface whose
content *is* volume (R23.2), so it cannot be built ahead of the library. Every other
surface can be built to the extent the library permits and completed later; this one
cannot exist at all until there are photographs at volume (R23, dependencies).

**R51A.6 — Priority 4 is a build order, not a launch scope.** The legal and system
surfaces are built last because they depend on decisions made elsewhere — the privacy
surface must state what [§50](#50-what-is-recorded-and-what-is-never-recorded)
actually does, and the legal record depends on the company name being confirmed. But
**404, the privacy surface and the legal identity record are present at launch**, in
every case. A site that publishes before it can say who it legally is has failed the
first thing the brand claims about itself.

**R51A.7 — Every priority stage is publishable on its own, or it is not a stage.**
The build never passes through a state where the site is live and the story is
incomplete in the middle. A stage that would require "coming soon" anywhere is
re-planned, because a permanent empty state is forbidden (R47.6, X8).

**R51A.8 — Evidence availability outranks the order.** If access to a working shift
produces C7 before C3 — a rejection observed before a cutting decision — Quality's
Recognition passage may be built before Manufacturing's, because the reserve
Recognition chapter is legitimate (Documentary Storyboard §7.2). **The order above
governs surfaces; the library governs what can be told, and the library wins.**

**R51A.9 — The collisions are resolved before the surfaces they affect are built**
([§52.3](#52-what-phase-8-may-not-decide), Visual Design System §50). Specifically:
the two contact routes merge before Priority 1 ships; the machine `REGISTER` fields
are withheld before Priority 2 ships; the Journal naming is settled before Priority 3
ships. Resolving a collision after a surface is built means building it twice.

**R51A.10 — Nothing in this order is a deadline.** Brand Bible P5 sets a ten-year
horizon and Documentary Storyboard §25.1 rule 4 sets the floor: below one chapter
containing one rank-1 scene, **make nothing**. A stage that cannot be completed
honestly is not shipped early in a weakened form.

### Dependencies

- The whole order is subordinate to the photography library and therefore to access
  to a working shift ([§53.1](#53-open-questions-and-dependencies) item 1).
- Priority 2 is gated by the Facts Register for the sections that need it, not for
  the surfaces as a whole.
- Priority 4 depends on [§50](#50-what-is-recorded-and-what-is-never-recorded) being
  settled and on the company name being confirmed.

---

## 52. What Phase 8 may not decide

**Traces to:** Visual Design System §49 · Visual Language Atlas §35.13 on failure ·
Creative Direction Book §23

### Purpose

To close the decisions this document has made, and to record the places where the
existing build has already decided differently.

### Rules

**R52.1 — Not available to implementation:**

| Not available | Decided at |
| --- | --- |
| Adding a surface | [§15.5](#15-the-page-set-and-the-rule-that-closes-it), by amendment |
| Adding a second action, anywhere | [§39](#39-the-action-strategy) |
| Placing the action on Technology, Gallery, Journal or a system surface | R39.3 |
| Adding a field to the enquiry | [§41.2](#41-fields-validation-error-and-success), by amendment |
| Gating any content behind a form or a login | E7 |
| Re-ordering the chapter set for navigation, filtering or search | X2 |
| Recording an individual's path | X15, [§50.3](#50-what-is-recorded-and-what-is-never-recorded) |
| Publishing a `REGISTER` field | Brand Bible §19.3 |
| Adding a recommendation, related-products rail or personalisation | R46.9, R46.10 |
| Creating a country, team, certifications, FAQ or case-study surface | R15.6 |

**R52.2 — The exception procedure** is the Visual Design System's (§49.2) and applies
here unchanged: name the rule and the law behind it, show the law is otherwise
satisfied, amend **this document**, and apply the amendment everywhere.

**R52.3 — Known collisions with the current build.** Recorded so they are resolved
deliberately rather than inherited:

| In the build | Collides with | Consequence |
| --- | --- | --- |
| Two contact routes — a contact surface and a buyer-enquiry surface | R25.2, R39.5 — one door | They become one surface |
| The editorial surface is named *blog* | R24.1, Creative Direction Book §20 Journal | It is the Journal; the register the name implies is what §20 rejects |
| Machine records publish manufacturer, country of origin, cutting force, capacity and power | R18.4, R43.4, Brand Bible §19.4 | All five become `REGISTER` and are withheld until Confirmed |
| A testimonials record exists | R44.4, Brand Bible §19.4 | Unpublishable until every entry carries all seven mandatory fields |
| A standing FAQ record exists | R45.2, R15.6 | Questions attach to the surface whose subject they concern; no FAQ surface |
| Product records carry availability-like or promotional fields | R19.2, R36.4 | Removed from the model |
| Generated placeholder photography | Photography Direction §24.5, X8 | **Blocking**: no surface using it may be published |
| Home carries a preview section per surface | R16.1 — Home opens the story but does not index the site | Previews that are themselves evidence passages (C1, C3) are retained and strengthened; sections that exist only to describe another surface are removed |

**R52.4 — The blocking collision is the placeholder photography**, inherited
unchanged from the Visual Design System §50.3. Surfaces are designed around the
absence of images; they are not built around stand-ins.

### Dependencies

- Several collisions are content decisions rather than code: the Journal naming, the
  machine `REGISTER` fields and the testimonials record are all resolved in the
  content layer.

---

## 53. Open questions and dependencies

**Traces to:** the dependency-note convention of all seven locked documents

### Purpose

To record what must be answered before this architecture can be fully built, and by
whom.

### Rules

**R53.1 — Blocking on the client, carried from the locked documents:**

1. **Access to a working shift.** Every rank-1 and rank-4 evidence requirement in
   Part III depends on it. Without it: Home has no Recognition moment, Manufacturing
   cannot tell C3, Quality cannot tell C7, and Gallery does not exist.
2. **Confirmation of the company name** (Brand Bible §25 item 1). It appears on every
   surface and in the legal record.
3. **The Facts Register items at Brand Bible §19.4.** They decide what Quality,
   Export, Technology and Products may state. The architecture is designed to work
   without them; the surfaces are thinner until they are settled.
4. **Whether a rejection can be observed rather than arranged** (Documentary
   Storyboard §29.3 item 7). Quality's Recognition moment depends on it.
5. **Written consent process for individuals** (Photography Direction §30.3 item 7).
   The Person model, and every named caption, depends on it.
6. **Written permission for any buyer's product appearing** (Photography Direction
   §30.3 item 8). It governs Products and Gallery.
7. **Whether "replies within two business days" is operationally guaranteed** (Brand
   Bible §25 item 6). Until it is, no reply time is stated (R25.4).
8. **Whether saddles are in scope** (Brand Bible §25 item 3). It changes the product
   hierarchy.

**R53.2 — Introduced by this document, for the client or the approver:**

9. **Acceptance that nothing is gated** (E7). There will be no capability deck behind
   an email capture, and no downloadable catalogue in exchange for contact. This is
   the single commercial habit this architecture removes, and it should be accepted
   knowingly.
10. **Acceptance that there is one action and one enquiry surface** (R25.2, R39.1),
    which means retiring one of the two contact routes now in the build.
11. **Acceptance that the site does not track individuals**
    ([§50](#50-what-is-recorded-and-what-is-never-recorded)), including no
    re-marketing and no session replay. This constrains any future advertising
    activity and should be agreed by whoever owns that.
12. **Whether search exists at all** (R46.1). It depends on the eventual size of the
    product record set, and the default is that it does not.
13. **Whether a vacancy exists** (R12.2). A careers surface exists only while one
    does.
14. **Confirmation of the five primary navigation destinations** (R37.2). It is the
    most visible decision in this document and the easiest to challenge later.

### Dependencies

**R53.3 — Dependencies on other documents:**

| Depends on | For |
| --- | --- |
| Documentary Storyboard §7 | The chapter set, which is the site's structure (X2) |
| Photography Direction §5 | The evidence ranks every surface declares |
| Brand Bible §19 | Every `REGISTER` field |
| Visual Design System §30 | The presence at which a photograph counts as evidence, which decides how many images a surface can hold |
| Visual Design System §35, §37, §38, §41, §47 | The behaviour of the action, navigation, forms and states |
| Brand Bible §11, §12 | Every word on every surface |

**R53.4 — One thing this document introduced that the Visual Design System did not
anticipate**: breadcrumbs on the product hierarchy (R38.4). The Visual Design System
§41 removes breadcrumbs on the grounds that five destinations do not need a trail;
this document permits them on the one hierarchy deeper than two levels. **This is
recorded as a reconciliation, not an exception** — see
[§55.2](#55-self-audit).

---

## 54. Approval checklist

**Traces to:** the approval-checklist convention of all seven locked documents ·
Brand Bible §24 decision checklists · Visual Language Atlas §35.13 on failure

### Purpose

To put every decision this document makes in front of the approver in the form it
will be challenged in later, so that agreement is recorded before implementation
rather than assumed after it.

### Rules

**R54.1 — The checklist is completed by the approver, not by the author.**

**R54.2 — An unticked line blocks Phase 8 for the surface it concerns**, not for the
whole build. Where a line concerns the architecture as a whole — the surface set, the
single action, the tracking position — it blocks everything.

**R54.3 — A line the approver disagrees with is resolved by amending this document**
(R52.2), never by an unrecorded exception.

### The checklist

**Architecture**

- [ ] The eleven surfaces, and only those eleven, are the complete set
      ([§15.2](#15-the-page-set-and-the-rule-that-closes-it))
- [ ] The surfaces that do not exist, and the reason each does not
      ([§15.6](#15-the-page-set-and-the-rule-that-closes-it))
- [ ] The site's structure is the canonical chapter order, and navigation may not
      re-order it (X2, R37.4)
- [ ] Every surface is complete alone and can be sent as a link (E4, X13)
- [ ] The six classes and the classification of every surface
      ([§34.2](#34-the-six-classes-of-surface))
- [ ] The five primary navigation destinations (R37.2)

**The visitor**

- [ ] The four buyer profiles are correct, and the OEM buyer is the one the
      architecture serves first (R8.1)
- [ ] The objection register is complete, and every objection has a surface
      ([§14.2](#14-the-objection-register))
- [ ] The definition of success, and the rejected measures
      ([§2](#2-success-and-how-it-is-judged))

**The decisions that will be challenged later**

- [ ] Nothing is gated: no document, deck or catalogue behind a form (E7)
- [ ] One action, one enquiry surface, and the action is absent from primary
      navigation (R25.2, R37.2, R39.1)
- [ ] No newsletter, no live chat, no booking, no account (R39.5)
- [ ] No testimonials until one is real, attributed and permissioned (R44.4)
- [ ] No country, team, certifications, FAQ or case-study surfaces (R15.6)
- [ ] No recommendations, no personalisation, no individual tracking (X15, R46.10)
- [ ] Four required fields at enquiry, and nothing asked that qualifies the visitor
      ([§41.2](#41-fields-validation-error-and-success), R40.7)
- [ ] Journal ends in space rather than in an action (R24.3)

**Governance**

- [ ] `REGISTER` fields are structurally unpublishable until Confirmed (R51.3)
- [ ] The publication gates at [§51.6](#51-what-phase-8-must-build) are accepted as
      build requirements rather than review habits
- [ ] The collisions at [§52.3](#52-what-phase-8-may-not-decide) are resolved in
      favour of this document
- [ ] The blocking items at [§53.1](#53-open-questions-and-dependencies) are
      acknowledged as client actions
- [ ] The exception procedure (R52.2) is accepted: amend this document, apply
      everywhere, never bypass

### Dependencies

- The blocking items at [§53.1](#53-open-questions-and-dependencies) are client
  actions and cannot be discharged by the approver.
- The collisions at [§52.3](#52-what-phase-8-may-not-decide) require a content
  decision as well as an approval.

---

## 55. Self audit

**Traces to:** the self-audit convention of the Visual Design System §53 ·
Visual Language Atlas §35 the ten tests · Creative Direction Book §26

### Purpose

To state what this document is missing, what it found in tension with the locked
documents, how each tension was resolved, and whether the brief was met — before
anybody else has to find out.

### Rules

**R55.1 — A missing dependency is recorded, never worked around.** An architecture
that conceals a gap will be built and the gap discovered at publication.

**R55.2 — Every contradiction is resolved in favour of the earlier document**, and
the resolution is recorded so it is not re-litigated.

**R55.3 — Scope is verified against the brief line by line**, including the
prohibitions.

### 55.1 Missing dependencies

Recorded honestly, because an architecture that pretends it is unblocked will be
built and then discovered.

| Missing | What cannot be completed | Severity |
| --- | --- | --- |
| The photography library | Home's Recognition moment, Manufacturing C1–C10, Gallery entirely, every surface's evidence rank | **Blocking for publication** |
| Access to a working shift | Every rank-1 and rank-4 evidence requirement | **Blocking**, and it is the root of the item above |
| The Facts Register items at Brand Bible §19.4 | Technology's machine attributes, Quality's figures, Export's terms and markets, Products' quantities | **Blocking for those sections only** — every surface is designed to stand without them |
| Confirmation that a rejection can be observed | Quality's Recognition moment | High |
| The consent process | Every named person, and the Person model | High |
| Operational confirmation of a reply time | The stated next step at Enquiry | Moderate; the surface works without a time |
| The company name | Every surface and the legal record | Moderate, and cheap now, expensive later |
| Copy | Everything. Copy is Brand Bible §11 and §12 and is not this document's | Expected, not a gap |

### 55.2 Contradictions found, and how they were resolved

Five points of tension surfaced while writing. Each was resolved in favour of the
earlier document, and each is recorded so the resolution is not re-litigated.

| # | Tension | Resolution |
| --- | --- | --- |
| 1 | **Breadcrumbs.** Visual Design System §41 removes them; the product hierarchy is three levels deep and a visitor arriving at a record from a search needs to know where they are | The Visual Design System's reason is stated precisely — *five destinations do not need a trail* — and it is about the primary navigation, not about a deep content hierarchy. The two are reconciled at R38.4: breadcrumbs exist **only** on the product hierarchy, state position only, and are not a second navigation. Recorded at R53.4 so the Visual Design System can absorb it at its next version |
| 2 | **The Gallery and "one image at a time."** Creative Direction Book §11.3 forbids photographs of equal weight beside each other; the Gallery's obligation is volume | Resolved by Creative Direction Book §20 itself, which assigns the Gallery "the one place where volume of evidence is itself the argument". The Gallery is the named exception in the locked document, not an exception granted here (R23.2) |
| 3 | **An action on Products' deep records.** X5 permits one action per surface and R39.4 forbids it beside evidence; a product record is both a specification and a place where a buyer is ready to write | Resolved at R19.6: the action appears once, at the close, after the specification — never beside the photograph. The buyer at a product record has reached Confidence, which is the condition Brand Bible §8.2 rule 1 requires |
| 4 | **Journal ending in space, against E5** — every surface ends knowing what comes next | Documentary Storyboard §25.2 explicitly assigns the journal passage "ends by: space". The locked document wins; R24.3 states the exception and names its source. E5 is satisfied by the article stating where it belongs in the chapter set, which is a next step without being a demand |
| 5 | **Measurement against X15.** The company needs to know whether the site works; the brand refuses to watch buyers | Resolved at [§50.1](#50-what-is-recorded-and-what-is-never-recorded): measurement is aggregate and anonymous, the events are defined, and the rejected measures are named so they cannot be reintroduced. Nothing recorded identifies a person or reconstructs a path |

| 6 | **The trust progression omits Respect.** The amendment requesting [§13A](#13a-trust-progression) named seven stages — Curiosity, Observation, Recognition, Evidence, Confidence, Conversation, Relationship — and Brand Bible §8.2 rule 1 states that no stage may be skipped | Resolved at R13A.1 and R13A.8. The progression is presented as the locked seven stages *seen from the evidence side*, with an explicit mapping table; Respect is named as the gate on the Confidence → Conversation transition, and is mapped in full at [§13B](#13b-the-emotional-journey), which carries it. Nothing is dropped, and the locked sequence remains the authority |
| 7 | **"Home does not summarise the site" against Home carrying all seven stages.** Creative Direction Book §20 forbids Home summarising the site and, in the same brief, assigns it the whole emotional journey — which requires Home to begin the story | Resolved at R16.1 (v1.1). The philosophy is unchanged and §20 is quoted intact; the rule now states the distinction that makes both true — a passage that *proves* is the story opening, a passage that *describes another surface* is a summary. Home is neither a table of contents nor a doorway; it is the first chapter |

**No contradiction with a locked document survives in this text.** Where this
document appeared to want something a locked document forbids, the locked document
won and the want is recorded above.

### 55.3 Scope verification

| Required by the brief | Delivered | Where |
| --- | --- | --- |
| Why the website exists; success; primary and secondary user; intentions; business and user objectives; principles; laws | ✅ | [§1](#1-why-the-website-exists)–[§6](#6-the-experience-laws) |
| For every buyer: who, what they know, doubt, need, evidence, objections, timeline, behaviour, risk, confidence | ✅ | [§8](#8-the-oem-buyer)–[§11](#11-the-international-importer-and-distributor), in the eleven-question form fixed at R7.2 |
| Every page: purpose, primary question, evidence, required outcome, relationships — no layouts | ✅ | [§16](#16-home)–[§26](#26-system-and-legal-surfaces) |
| Journeys: first-time, returning, OEM, retail, procurement, international — arrival, questions, evidence, trust, decision, exit | ✅ | [§28](#28-journey-the-first-time-visitor)–[§33](#33-journey-the-international-buyer) |
| Page hierarchy: destination, supporting, evidence, legal, transactional, relationship, with reasons | ✅ | [§34](#34-the-six-classes-of-surface) |
| Content priority: primary, secondary, supporting, optional, forbidden, per page | ✅ | [§35](#35-the-five-priority-bands)–[§36](#36-priority-by-surface) |
| Navigation: primary, secondary, footer, cross-link, search, breadcrumb, mobile — behaviour only | ✅ | [§37](#37-navigation-behaviour)–[§38](#38-cross-linking-breadcrumbs-and-the-small-field) |
| CTA: primary, secondary, where it appears, where it never appears, emotional state, hierarchy | ✅ | [§39](#39-the-action-strategy) |
| Forms: flow, validation, error, success, trust, required and optional fields | ✅ | [§40](#40-the-enquiry-flow)–[§41](#41-fields-validation-error-and-success) |
| Content models: the ten types named in the brief | ✅ | [§43](#43-the-work-category-product-stage-machine)–[§45](#45-the-words-article-question-person). Product Category, Manufacturing Stage, Technology (as Machine), Certification, Article, Country, Factory, FAQ (as Question), Testimonial (as Testimony), Team Member (as Person), plus Product |
| Search and discovery: search, filtering, browsing, internal linking, related content | ✅ | [§46](#46-search-filtering-browsing-and-relatedness) |
| States: loading, empty, error, offline, maintenance, 404, permission denied, no results, timeout, success | ✅ | [§47.2](#47-the-ten-states), all ten |
| Responsive experience: never disappears, may collapse, changes priority, remains identical — no breakpoints | ✅ | [§48](#48-what-survives-a-smaller-field). No breakpoint appears in this document |
| Accessibility experience | ✅ | [§49](#49-accessibility-as-experience) |
| Analytics: business, success, trust, drop-off, search, enquiry events — no tools | ✅ | [§50](#50-what-is-recorded-and-what-is-never-recorded). No tool, platform or product is named |
| Handoff: what Phase 8 must build, may not decide, open questions, dependencies, approval | ✅ | [§51](#51-what-phase-8-must-build)–[§54](#54-approval-checklist) |
| Every chapter carries Purpose, Rules, Dependencies, Traces to | ✅ | All sixty-one |

**Added at v1.1, against the approved amendments:**

| Amendment | Delivered | Where |
| --- | --- | --- |
| 1 — Trust progression: what changes, what evidence causes each transition, which page owns each stage | ✅ | [§13A](#13a-trust-progression), with the mapping to the locked seven stages at R13A.1 |
| 2 — Cognitive load principles | ✅ | [§6A](#6a-cognitive-load-principles), ten rules, no layout |
| 3 — Emotional journey, with page ownership | ✅ | [§13B](#13b-the-emotional-journey); the emotional briefs are reproduced from Creative Direction Book §20 and remain locked (R13B.4) |
| 4 — Navigation logic, as a conceptual diagram | ✅ | [§38A](#38a-navigation-logic). It is a relationship graph, not a navigation design: no arrangement, position or control is specified, and it would be equally true of a printed contents page |
| 5 — Decision fatigue | ✅ | [§39A](#39a-decision-fatigue), ten rules, distinguished from [§6A](#6a-cognitive-load-principles) as cumulative rather than momentary cost |
| 6 — Implementation priority, with reasons | ✅ | [§51A](#51a-implementation-priority), four priorities, each justified by the compression law and by the trust transition it unlocks |
| 7 — Review "Home does not summarise the site" | ✅ | R16.1 clarified, philosophy unchanged, Creative Direction Book §20 quoted intact. The collision row at [§52.3](#52-what-phase-8-may-not-decide) updated to match |
| Version 1.1, status APPROVED | ✅ | Header and change log |
| No chapter removed, renumbered or rewritten; no page responsibility altered | ✅ | Chapters 1–55 are unchanged apart from R16.1, one collision row, the change log, the header and the table of contents |

**Prohibited content check.** This document contains no typography, spacing, colour,
photographic direction, motion specification, layout, component design, grid, token,
measurement, breakpoint or code. Where a rule has a visual consequence, the locked
document that governs it is named and the consequence is not described.

Re-run at v1.1 across the six added chapters: the only diagram in the document is the
relationship graph at [§38A](#38a-navigation-logic), which states parentage and
permitted paths and specifies no arrangement, position, control or appearance. No
number in this document is a measurement — the only quantities that appear are counts
of things: four required fields, five destinations, ten chapters, four priorities.

**The test at the head of this document.** A developer reading Part III knows what
every surface is; Part IV knows what happens next; Part VIII knows what the action is
and where it may not appear; Parts I and II know what the visitor is trying to do.
The four questions this document exists to pre-empt are answered.

### Dependencies

- [§53](#53-open-questions-and-dependencies) holds the actionable form of 55.1; this
  chapter records severity, that chapter records ownership.
- Item 1 of [§55.2](#55-self-audit) is a dependency on the Visual Design System's
  next version, which should absorb R38.4.

### 55.4 What this document cannot do

**It cannot supply the evidence.** Every surface here
declares the evidence rank it requires, and most of those ranks can only come from a
working shift that has not yet been photographed. The architecture is complete; the
site is not buildable to publication until the library exists.

---

*End of document.*
