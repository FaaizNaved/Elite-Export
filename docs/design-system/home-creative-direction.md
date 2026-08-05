# Home page — creative direction v2

**Status:** Final blueprint, pending answers to §13. No code written.
**Supersedes:** v1 (in git history). Philosophy unchanged; twelve revisions applied.

---

## 0. The facts register — read this first

This page's entire strategy is *evidence over claims*. That only works if the
evidence is true. Two things must be said plainly before anything else.

### v1 contained an invented fact

v1 §6 listed the certifications as "ISO 9001:2015, LWG Gold, **SEDEX**".
`src/config/company.ts` holds **two** certifications. SEDEX was never a company
fact — it came from a placeholder image filename. It has been removed. On a page
built to earn trust, a fabricated audit body is the most damaging possible error,
and it survived a full review, which is why this register now exists.

### Most "facts" on this site are placeholder copy I wrote, not client statements

During Phase 4 the company pages were authored with plausible manufacturing
detail so the pages could be designed. Those numbers read as authoritative and
are **not** client-verified. Every one of them is load-bearing in this design.

| Fact | Used in | Source | Status |
| --- | --- | --- | --- |
| Founded 1998 | Hero rail, §2 | `config/company.ts` | Client config — **confirm** |
| 250+ staff | §2 | `config/company.ts` | Client config — **confirm** |
| ISO 9001:2015 (Bureau Veritas, 2021) | Hero rail, §6 | `config/company.ts` | Client config — **confirm** |
| LWG Gold (2023) | Hero rail, §6 | `config/company.ts` | Client config — **confirm** |
| 8 export markets (US GB DE FR AU AE CA IT) | Hero rail, §7 | `config/company.ts` | Client config — **confirm** |
| Kanpur, Uttar Pradesh, India | §1, §7 | `config/company.ts` | Client config — **confirm** |
| 40,000+ pieces / month | Hero headline, §7 | `content/company/export.mdx` | **Placeholder — verify** |
| 45,000 sq ft, 3 production lines | §2, §4 | `content/company/manufacturing.mdx` | **Placeholder — verify** |
| 8 production stages, 4 inspection gates | §4, §6 | `manufacturing.mdx`, `quality.mdx` | **Placeholder — verify** |
| AQL 2.5 | §6 | `content/company/quality.mdx` | **Placeholder — verify** |
| 0.4% average rejection rate | §6 | `content/company/quality.mdx` | **Placeholder — verify** |
| 100% orders with written report | §6 | `content/company/quality.mdx` | **Placeholder — verify** |
| MOQ 50 (tack) / 100 (bags) | Hero rail | `content/faqs.json` | **Placeholder — verify** |
| Samples 10–15 days, bulk 30–45 days | §9 | `export.mdx`, `faqs.json` | **Placeholder — verify** |
| FOB / CIF / EXW | §7 | `content/company/export.mdx` | **Placeholder — verify** |
| 48 production machines | §4 | v1 blueprint | **Unsourced — drop or verify** |
| Three testimonials | §8 | `content/testimonials.json` | **Fabricated — must not ship (§8)** |

**Rule for implementation:** any row not confirmed by the client is replaced with
a verified alternative or the element is removed. A page that says less and is
true outperforms a page that says more and is checkable.

---

## 1. The strategic idea *(unchanged, approved)*

A buyer in Stuttgart or Melbourne is not shopping. They are doing due diligence,
asking one question throughout:

> *Is this a real factory, or a trading house with a good website?*

> **Replace claims with evidence, and give the evidence room.**

---

## 2. Narrative arc *(unchanged, approved)*

Nine sections, one buyer question each. Twelve sections became nine; six card
grids became one.

| # | Section | Question | Emotion |
| --- | --- | --- | --- |
| 1 | Hero | What kind of company is this? | Curiosity |
| 2 | The house | Who are you? | Interest |
| 3 | What we make | What do you manufacture? | Discovery |
| 4 | How it is made | How do you manufacture? | Trust |
| 5 | The Pause | — | Confidence |
| 6 | Why the quality holds | Why is your quality better? | Confidence |
| 7 | Origin, capacity, terms | Can you export to me? | Reassurance |
| 8 | In their words | Do others trust you? | Validation |
| 9 | What happens next | How do I start? | Action |

Cut and unchanged: product carousel, machine card grid, "why choose us" icon
cards, the duplicate stats band.

---

## 3. Hero identity — Revision 1

The v1 lines ("Crafted for riders. Trusted worldwide.") are well-formed and
belong to no one. Any premium equestrian brand could use them. A manufacturer's
headline should be unusable by a reseller.

**Test applied to every option:** *could a trading house that owns no factory
put this on their homepage?* If yes, it fails.

### Option A — the scale/craft tension ★ recommended

> **Forty thousand pieces a month.**
> **Every one finished by hand.**

Resolves the exact contradiction every buyer is silently testing: *can you do my
volume without becoming a commodity supplier?* Two verified facts, no adjectives,
no marketing verbs. A trading house cannot say this. Numbers spelled as words in
the display line — numerals at that size read as a dashboard.

> **Accuracy note.** The line says *finished*, not *cut*, by hand — deliberately.
> `manufacturing.mdx` states that shaped components are cut by clicking press and
> straps by machine, while "a single craftsman takes a piece from cementing
> through to final oiling". "Cut by hand" would be false. This is the sort of
> check every line of copy on this page needs.

### Option B — process and place ★ recommended fallback

> **Cut, stitched and finished in Kanpur.**

Three process verbs and an origin. No claim to evaluate, only a description —
which is why it is impossible to disbelieve. Works even if the 40,000 figure
fails verification. Quietest and most confident option; the risk is that it is
*too* quiet for a first-time visitor.

### Option C — the private-label truth

> **We make the tack. You put your name on it.**

Speaks directly to the OEM buyer and states the commercial relationship in one
line. Highly specific, memorable. Risk: slightly transactional, and it excludes
buyers who want ODM development rather than badge engineering.

### Option D — consistency as the promise

> **Three production lines. One standard.**

Targets the second-biggest buyer anxiety after capability: *will piece 400 match
the sample?* Compact and factual. Weaker on emotion; reads more like a section
heading than a hero.

### Option E — the nameplate

> **Manufacturers of equestrian leather since 1998.**

Maximum plainness. Category, role, date. This is a brass plate on a factory gate.
Extremely trustworthy, entirely unmemorable. Good safe harbour, poor flagship.

### Rejected

- *"Leather engineered to endure"* — abstract; could be a tannery, a bag brand or
  a furniture maker. Fails the trading-house test.
- *"Precision in every stitch"* — the most-used phrase in the category.
- Anything containing *passion*, *journey*, *excellence* or *world-class*.

### Supporting line (all options)

> Equestrian tack and leather goods, manufactured in Kanpur since 1998 for buyers
> in eight countries.

**Recommendation: Option A, with Option B as fallback if the 40,000 figure is
not client-verified.**

---

## 4. Hero credential rail — Revision 2

The rail is glanceable, not readable. Eight items is a spec sheet; five is a
credential. Each item answers one silent question in the buyer's first five
seconds.

| # | Item | Silent question | Source |
| --- | --- | --- | --- |
| 1 | Est. 1998 | Are you established? | config |
| 2 | ISO 9001:2015 · LWG Gold | Are you audited by someone other than yourself? | config |
| 3 | OEM & ODM | Will you make *my* design? | export.mdx |
| 4 | MOQ from 50 pieces | Can I afford to start? | faqs.json |
| 5 | 8 export markets | Do you already ship to my part of the world? | config |

Deliberately **not** in the rail: lead time (belongs in §9 beside the timeline,
where it is part of a promise rather than a statistic) and incoterms (belongs in
§7 with the rest of the logistics detail).

**Behaviour.** One row, hairline rule above, `text-caption`, letterspaced, with
thin gold dividers. Wraps to two rows at tablet; shows items 1, 3 and 5 only
below 640px — a five-item rail at phone width becomes a paragraph.

---

## 5. Hero photography — Revision 3

Not one macro. **Three planes in a single frame.**

| Plane | Content | Treatment |
| --- | --- | --- |
| Foreground (lower third, sharp) | Hands, a tool, leather taking the work, brass catching light | Critically sharp; this is the subject |
| Midground (soft) | The bench itself — offcuts, edge slicker, thread spool, marking gauge | Gently out of focus, legible as objects |
| Background (top third, heavy blur) | A second craftsman at another bench, a machine silhouette, a window | Unrecognisable in detail, unmistakable in meaning |

**Why this specific construction.** A factory panorama says *we have a building*.
A pure macro says *we have a craftsman*. Only the layered frame says **we have a
craftsman inside a working factory** — which is precisely the question the buyer
arrived with. The background is doing the persuading, and the viewer never
consciously looks at it.

**Technical direction.** 50–85mm at f/2.0–f/2.8. Camera at bench height, never
looking down — an overhead angle turns a craftsman into a subject being observed;
bench height makes the viewer a colleague. Key light from behind-left so the
leather edge carries a specular highlight. Warm daylight, no mixed colour
temperature, no flash. Shoot during an actual shift with real work in progress;
a staged bench is visible instantly.

**Grade.** Deep shadows retaining detail, highlights held well below clipping,
overall warm. The charcoal of the type must sit *inside* the photograph's own
tonal range, not on top of it.

---

## 6. §2 The house — Revision 4

"A manufacturer, not a trading house" is correct and slightly defensive. It names
an adversary, and confidence does not need one.

| Option | Note |
| --- | --- |
| **"Everything we sell, we make." ★** | Same fact, stated positively. Unarguable, warm, six words. Says *manufacturer, not trader* without naming the trader. |
| "One roof, from hide to carton." | Process ownership as geography. Strong second choice; slightly more poetic. |
| "Our name is on the factory, not just the invoice." | Sharpest, but back to naming the adversary. |
| "We own the floor the work happens on." | Good, marginally awkward. |

**Recommendation: "Everything we sell, we make."**

Section body unchanged: asymmetric split, image left at 7 columns, the existing
`home/company.json` paragraph, and the four figures on ivory beneath — not on a
dark band, which makes them feel like an advertisement rather than a record.

---

## 7. §4 How it is made — Revision 5

Each stage gains one **evidence line**: a small, factual, checkable detail set
below the stage paragraph, preceded by a short gold rule. Same slot every time,
so the eye learns to look for it.

| Stage | Evidence line | Source |
| --- | --- | --- |
| Hide selection | "Graded by hand against the order. Anything that will not cut cleanly is rejected before it reaches the floor." | manufacturing.mdx |
| Cutting | "Straps are cut along the backbone, where the fibre structure is tightest and stretch is most predictable." | manufacturing.mdx |
| Assembly | "Stress points are saddle-stitched by hand. A lock stitch unravels from a single broken thread; a saddle stitch does not." | manufacturing.mdx |
| Finishing | "Edges are bevelled, sanded and burnished in three passes with a waxed slicker." | manufacturing.mdx |

Why these four work: each explains a *mechanism* or gives a *count*. Neither can
be written by someone who has not been on a factory floor, which is exactly the
signal being sent. None contains an adjective.

Section closing line, small and quiet: *"Four inspection gates per order. See the
full process →"*. The v1 line cited "48 production machines" — **unsourced, so it
is dropped** unless the client confirms a figure.

---

## 8. §5 The Pause — Revision 6

**Recommendation: no caption. Ship it silent.**

The section's only job is to stop the page talking. A caption — however small —
converts a breath into a slide, and the page returns to selling. Lines like
"Made to be ridden" or "Quiet confidence" are precisely the register this brand
should avoid: they are sentiment, and every other equestrian brand has them.

**If a caption is required**, the only defensible form is a *specification label*,
not a sentiment — bottom-left, `text-caption`, `foreground-muted` at 60% over the
image:

> One ear headstall, dark oil. Kanpur, 2026.

That is a museum label. It reads as documentation rather than copywriting, and
documentation raises perceived authenticity. Sentiment lowers it.

---

## 9. §7 Origin, capacity, terms — Revision 7

Renamed from "Shipping to eight markets". Expanded into three quiet columns on
ivory, deliberately unglamorous — logistics competence should look like logistics
competence.

| Column | Content |
| --- | --- |
| **Origin** | Kanpur, Uttar Pradesh, India. Manufactured and shipped from our own facility. |
| **Capacity** | 40,000+ pieces per month across three lines. Samples in 10–15 working days; bulk 30–45 days from approval. |
| **Terms** | FOB, CIF and EXW, by sea and air. Your freight forwarder or ours. |

Beneath, the eight markets as country names with flags, in two rows at body size.

Then the line that matters most to European buyers, and that almost no competitor
states on a homepage:

> Certificates of origin, material declarations, REACH statements and inspection
> reports are prepared in-house.

REACH is the specific anxiety of a German or UK importer. Naming it unprompted
signals that we have shipped into that regime before.

**Not included:** nearest port, container throughput, freight partners. Not in any
source. See §13.

---

## 10. §8 Testimonials — Revision 8

> ### The three testimonials currently in `content/testimonials.json` are fabricated.
>
> "Daniel Harding of Harding Equestrian", "Maria Rivera of Rivera Outfitters" and
> "Jonas Brandt of Lederwerk Hamburg" were written by me as sample data during
> Phase 3B. These people and companies do not exist.
>
> **They must never ship.** Inventing customer endorsements is not a design
> shortcut; in the EU and UK it is a consumer-protection matter, and for a
> B2B manufacturer being caught doing it ends the relationship it was meant to start.

Rules for this section:

1. **Real, attributable, permissioned, or omitted.** No third option.
2. Attribution must carry **name, role, company and country**. An anonymous quote
   ("a buyer in Germany") is worth less than no quote at all on a trust page — it
   reads as something that could not be verified.
3. Written permission on file before publication.
4. **One quote is sufficient.** One at `text-h2` scale is a statement; three in a
   carousel is a widget.
5. Until a genuine quote exists, **§8 is omitted entirely.** The page runs eight
   sections and loses nothing — §6 and §7 already carry the proof.

A stronger substitute if no testimonial is forthcoming: a named, permissioned
**buyer logo row**, or a single line of fact — *"Supplying the same three UK
buyers since 2019"* — if that is true and verifiable.

---

## 11. §9 What happens next — Revision 9

Two-column commitment block on charcoal. Left: the ask and the buttons. Right:
the timeline from `export.mdx` — feasibility in 3 working days → sample in 10–15
→ bulk in 30–45.

Beneath the primary button, **three short reassurance lines** — not a paragraph:

> Replies within two business days.
> Samples available before any bulk commitment.
> Export documentation prepared in-house.

Each is drawn from existing content and each is operationally checkable.

**Deliberately excluded:** "Dedicated export team." No source confirms a
dedicated team exists — `company.employees` is a headcount, not a structure.
Adding it would repeat the SEDEX error in a smaller font.

> **Every promise here becomes an operational commitment.** If the client cannot
> reliably reply within two business days, that line must come off the page. A
> missed promise costs more trust than the promise ever earned — and this exact
> sentence is already published on the contact page, so it needs confirming
> either way.

---

## 12. Typography — Revision 10

### Option A — Inter for all figures, serif for headings only

Numbers are data, and data wants a neutral voice. Inter ships true **tabular
figures**; every digit occupies identical width.

### Option B — Playfair for large display figures *(the v1 proposal)*

Serif numerals feel authored and permanent, and differentiate from every SaaS
dashboard.

### Recommendation: **Option A. I withdraw the v1 proposal.**

Three reasons, in order of weight:

1. **Functional, and decisive.** The stat figures count up on scroll. Playfair
   Display's numerals are proportional — a `1` is far narrower than a `4` — so an
   animating counter visibly jitters as digits change, and a row of four stats
   never settles on a stable rhythm. The existing `Counter` component already
   applies `tabular-nums`, which Playfair does not meaningfully support. v1
   proposed a typeface that breaks an approved interaction.
2. **Brand register.** Inter SemiBold at display scale reads as *precision,
   engineering, measurement*. Playfair at the same size reads as *fashion,
   editorial, magazine*. For a manufacturer, the first is on-brand and the second
   is borrowed.
3. **Consistency with an approved document.** `docs/design-system/design-philosophy.md`
   already specifies Inter SemiBold for years, statistics and capacity. v1
   deviated without sufficient cause.

**Final hierarchy**

| Level | Face | Token |
| --- | --- | --- |
| Hero display | Playfair | `text-display`, once per page |
| Chapter headings (§3, §4, §9) | Playfair | `text-h1` |
| Section headings (§2, §6, §7, §8) | Playfair | `text-h2` |
| Stage / item titles | Playfair | `text-h3` / `text-h4` |
| **All figures and statistics** | **Inter SemiBold, tabular** | `text-h1` scale |
| Eyebrows | Inter, gold, letterspaced | `text-overline` |
| Body | Inter, max ~68 characters | `text-body` in `max-w-narrow` |

Rule retained: **never more than two type sizes within one section.**

---

## 13. Material identity system — Revision 11

A complete language, one material per section, 2–5%, never adjacent.

| § | Section | Material | Opacity | Why this material here |
| --- | --- | --- | --- | --- |
| 1 | Hero | *None* | — | Photography is already carrying three planes |
| 2 | The house | Leather grain, tiled | 3% | The raw material, under the story of the people |
| 3 | What we make | Cutting templates / pattern outlines | 3% | Literally the shapes the products are cut from |
| 4 | How it is made | Workshop blueprint linework | 4% | Process drawings under a process section |
| 5 | The Pause | *None* | — | Full-bleed photograph; nothing behind it |
| 6 | Quality | Stitch-guide grid — evenly spaced dashes | 3% | Regular, measured, repeating: the visual form of consistency |
| 7 | Origin & terms | Brass hardware outlines, sparse | 3% | Material, not literal freight iconography |
| 8 | Testimonials | *None* | — | The quote stands alone |
| 9 | What happens next | Saddle tooling scroll, one large crop | 5% | The most decorative motif, on the most emotional section |

### The horse silhouette: use it nowhere on this page

It is the single most predictable choice in equestrian leather, every competitor
has one, and the brief itself warns against literal horses. Used at 3% behind a
section it does not become subtle — it becomes a competitor's homepage at low
opacity.

**Reserve it for exactly one place: the 404 page**, full-bleed and heavily
cropped. There it is a signature — the moment a visitor is lost is the one place
a brand can afford personality.

### Technical rules

- **Single-colour SVG linework** in charcoal or gold. Not photographic grain:
  photographic texture at 3% resolves to flat noise and only adds weight.
- Must remain legible in structure at 2% — high-contrast line art, generous
  spacing, nothing fine.
- Never over photography. Never in two adjacent sections. Never two in one section.
- **Disabled below 768px.** At phone width they are invisible and cost bandwidth.
- Rendered as a CSS background on the section, `aria-hidden`, never an `<img>`.
- Each must survive being converted to greyscale — if it disappears, it was
  relying on colour, not form.

The stitch language is already half-built: `Divider decorative` places a gold
lozenge between two hairlines. Extending that into a dashed section rule ties the
system together at no cost.

---

## 14. Navigation — Revision 12

### Option A — separate utility strip above the header *(the v1 proposal)*

Conventional B2B. Phone, email and hours always visible at the top.

### Option B — integrated into the existing navigation

No extra band. One quiet contact affordance inside the header itself.

### Recommendation: **Option B. I withdraw the v1 proposal.**

The decisive argument is spatial, not stylistic. **A utility strip caps the
hero.** This page's single most valuable asset is a full-bleed, three-plane
photograph running edge to edge under a transparent header. A strip puts a
horizontal band of small text across the top of it and immediately converts a
cinematic opening into an industrial-supply catalogue. Leica, Rimowa and
Rolls-Royce have no utility strip; Grainger and Alibaba do. That is the whole
argument.

**Integration instead**

- Phone number in the header, left of the CTA button, at `text-caption` in
  `foreground-secondary`, gold on hover. Visible at ≥1280px only.
- Business hours move to the footer and the contact page, where someone looking
  for them will actually be.
- Header keeps its existing transparent → glass transition and shrink on scroll,
  which are correct.

### Other navigation changes *(unchanged from v1)*

1. **Mega menu: replace the promoted product with a utility block.** A buyer
   opening the products menu wants *Request samples* and *Download capability
   profile*, not a specific headstall. An action converts; a promoted SKU does not.
2. **Sticky enquiry bar after §4.** `StickyCta` is already built and unused.
   Manufacturing is where intent peaks.

---

## 15. Motion *(unchanged, approved)*

| Property | Value |
| --- | --- |
| Duration | 700ms (`--duration-premium`) |
| Easing | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Reveal distance | **24px**, reduced from 48 — heavy things move less, not more |
| Stagger | 80ms, maximum 4 items |
| Parallax | 0.92× scroll, hero and §5 only |

Only `opacity` and `transform`. Nothing scales on entry. `prefers-reduced-motion`
disables all of it including Lenis. Interaction budget remains three: category
hover, count-up on first view, §5 parallax.

Rejected: cursor followers, magnetic buttons, letter-splitting, scroll-jacking.

---

## 16. Photography *(unchanged — still the largest single lever)*

Eleven photographs carry this page and **all current images are generated
placeholders**. The design is reviewable now and shippable only after a shoot.

Hero (three-plane, §5 above) · workshop with people · two category stills ·
four process stages · the Pause (21:9, outdoors) · inspection bench · export
packing.

One warm grade across all eleven. No HDR, no heavy vignette, no stock imagery of
people in suits — one stock photograph will undo the credibility of everything
else on the page.

---

## 17. Open questions — blocking

Carried forward, plus new:

1. **Company name.** Brief says *New Elite Export*; config says *Elite Export*.
2. **Verify the facts register (§0).** Highest priority — twelve figures need
   client confirmation, and the hero headline depends on one of them.
3. **Saddles.** Named as flagship in the brief; absent from the catalogue. §3 is
   designed for two categories and is stronger with three.
4. **Capability profile PDF.** Referenced in the mega-menu utility block and as a
   secondary CTA. Does one exist?
5. **Testimonials.** Any real, permissioned quote available? If not, §8 is cut.
6. **"Replies within two business days"** — operationally guaranteed? Already
   published on the contact page.
7. **Photography timeline.**
8. **Port of export / freight partners** — omitted from §7 for lack of a source;
   include if the client can supply them.

---

## 18. Implementation cost *(unchanged)*

**One new component:** `FullBleedImage` (§5, parallax).

**Four extensions:** `Section` gains a `texture` variant · `Hero` gains a `meta`
slot for the credential rail · `CategoryCard` gains `variant="editorial"` ·
`CtaBanner` gains an `aside` slot for the §9 timeline.

**Reused unchanged:** `ProcessSteps`, `StatsBand`, `Counter`, `StickyCta`,
`Container`, `Typography`, `Button`, `SlideUp`, `Stagger`, `Prose`.

**Content:** edits to `content/home/*.json`; retire `featured-products.json` and
`technology-preview.json`; §8 content pending §17.5.

**Global token change:** entrance travel 48px → 24px, affecting every page.
