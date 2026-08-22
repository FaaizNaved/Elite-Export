# Photography brief

The single highest-impact piece of work left on this site. Every frame below is
already built, sized and placed; the layout does not change when the pictures
arrive. Shoot to these and drop the files into the paths given.

## How to shoot

Documentary observation of a working leather house. A photographer spends two
days on the floor and photographs what is actually happening.

**Do**

Natural light, wherever it falls. Working hands. Worn benches, cut edges,
leather dust, offcuts, brass hardware, thread cones, stamps and creasers,
burnishing gum, the marks a bench acquires after twenty years. Real depth —
racks, other people, the rest of the room behind the subject. Cartons, tape,
packing lists. Let things be a little untidy.

**Do not**

Posed workers. Anyone looking at the lens and smiling. Generic warehouse aisles.
A wall of identical closeups of leather grain. Staged luxury still life on
seamless paper. Orange-and-teal grading or heavy vignettes. Anything that could
have come from a stock library.

**Technical**

- Colour: neutral. The palette is warm ivory and charcoal and will do the
  warming. Do not warm the files.
- No heavy retouching. Grain and dust are the subject, not defects.
- Deliver 16-bit originals; the site converts to WebP/AVIF at build.
- Shoot wider than the target crop. Every frame is `object-cover`, so the short
  edge is what survives — see "crop-safe" on each frame.

## How the crops behave

Every image is absolutely positioned `fill` with `object-cover` inside a frame
that sets its own aspect ratio. That means:

- **The frame decides the shape. The photograph is cropped to fit it, centred.**
- Anything that must be kept belongs near the **centre** of the frame's axis,
  not at an edge.
- A portrait file in a landscape frame loses its top and bottom, and vice versa.
  Match the orientation asked for.

Ratio names are the tokens in `src/components/ui/aspect-ratio`
(`square 1:1`, `portrait 3:4`, `landscape 4:3`, `wide 16:9`, `product 4:5`).

---

## 1. Home hero — the most important photograph on the site

| | |
|---|---|
| Path | `public/images/hero/home-hero.webp` |
| Frame | Full bleed, edge to edge, `min-height: 100dvh`. Effectively 16:9 and wider on desktop, very tall on phones |
| Deliver | 2400x1350 minimum, landscape, composed to survive a 9:16 crop |
| Distance | Mid — close enough to read a hand and a tool, far enough to see the room |
| People | One person, **not identifiable**. Hands, forearms, the bend of a back. No face to camera |
| Background | Yes, and it matters. The workshop must be legible behind the subject |
| Lighting | Whatever the windows give. A pool of daylight on the bench with the room falling off darker behind is ideal |

**Subject.** Someone burnishing the edge of a strap at the bench. The existing
alt text describes exactly this and should stay true.

**Crop-safe.** The bottom-left quadrant carries the wordmark, the display line
"Cut, stitched and finished in Kanpur.", one line of body copy and one link,
over a dark gradient scrim. **Keep the lower-left third quiet** — no faces, no
high-contrast highlights, no busy hardware there. Put the working hands in the
upper-right half. The top 160px also sits under a scrim for the navigation.

Brass appears as a mark in only two places on the site; do not add gold here.

---

## 2. Act III — the people frame

| | |
|---|---|
| Path | `public/images/about/workshop.webp` |
| Frame | **4:5 portrait**, about 550px wide at 1440, five of twelve columns, **inset in the page** — it touches no edge |
| Distance | Close. The most intimate frame on the site |
| People | Yes. One worker. Identifiable only with **written permission**; otherwise shoot over the shoulder or from the side |
| Background | Partially. Let the bench and some depth show, thrown soft |
| Lighting | Side light from a window. Let the shadows go dark |

**Subject.** Someone actually working — hands, tool, leather, bench in one
frame. Not a portrait. Not posed. The picture you get by standing quietly
nearby for ten minutes.

**Crop-safe.** Portrait, so the sides are trimmed. Compose the hands and the
work on the **vertical centre line**. Keep the bottom quarter calm — the caption
sits beside the foot of the plate and the eye travels between them.

This frame carries the entire human weight of the homepage. It rewards a real
photograph more than any other frame, and exposes a bad one fastest.

---

## 3. Act IV — the material sequence

Three frames, shot as one continuous transformation: same day, same light, same
bench if possible. The page steps them down in scale — roughly 95%, then 54%,
then 30% of the measure — so the eye reads raw, work, resolved even with the
captions ignored. Shoot so that progression is true of the content too: wide and
material, then closer and human, then one finished object.

### 3a. Hide

| | |
|---|---|
| Path | `public/images/manufacturing/hide-selection.webp` |
| Frame | **3:1 letterbox** on desktop, 5:2 at tablet, 4:3 on phones. Near-full measure |
| Deliver | Very wide landscape, 3000px+ on the long edge |
| Distance | Wide. The whole sorting table |
| People | Hands only, or nobody |
| Background | Yes — the grading area |
| Lighting | Flat, even daylight. A document of material, not a mood piece |

**Subject.** Hides on the sorting table being graded — stacked, folded, spread.

**Crop-safe.** A 3:1 band takes a thin horizontal slice from the middle of
whatever is delivered. **Everything important must sit on the horizontal centre
line.** Nothing near the top or bottom of the file will survive.

### 3b. Work

| | |
|---|---|
| Path | `public/images/manufacturing/assembly.webp` |
| Frame | **3:2 landscape**, just over half the measure, set right |
| Distance | Closer. Hands and the component fill the frame |
| People | Hands and forearms. No face |
| Background | Softly — enough to place it on a bench |
| Lighting | Directional, raking across the leather so stitch and grain catch |

**Subject.** Components cemented and stitched — the moment the page describes as
"by hand at the stress points where a saddle stitch outlasts a lock stitch".
Show the saddle stitch being pulled if it can be caught.

**Crop-safe.** Close to a straight 3:2, so little is lost. Keep the hands
slightly left of centre; it reads better against the caption at the left of the
row.

### 3c. Finished

| | |
|---|---|
| Path | `public/images/manufacturing/finishing.webp` |
| Frame | **3:4 portrait**, about 427px wide at 1440 — deliberately the smallest plate in the sequence, with an empty column beside it |
| Distance | Object distance. One finished piece, whole |
| People | None. The work is done |
| Background | Minimal but real — a bench, not a studio sweep |
| Lighting | Softer and cleaner than the two before it. This is the resolution |

**Subject.** One finished object — a burnished one ear headstall, or a completed
strap — set down and looked at. Edge paint visible. Hardware visible.

**Crop-safe.** Portrait. Stand the object on the **vertical centre** with air
above and below. The empty column to its right is intentional page design; do
not compensate by filling the frame edge to edge.

---

## 4. The floor — dark workshop section

| | |
|---|---|
| Paths | machine thumbnails under `public/images/machinery/[slug]/` |
| Frame | **4:3 landscape**, about 29% of the measure, sitting on warm charcoal |
| Distance | Machine distance — the whole machine and some floor |
| People | Optional; an operator's hands are good, a posed operator is not |
| Background | Yes. Workshop depth is the point of this section |
| Lighting | Available light. The section is already dark — **do not deliver dark files** or they vanish into the ground |

**Subject.** The clicking press, the stitching head, the edge painting line, as
they actually stand, with their tooling and their wear.

**Crop-safe.** Mild crop. Keep the machine off the extreme edges.

---

## 5. Product photography

| | |
|---|---|
| Paths | `public/images/products/[category]/[subcategory]/[product]/` |
| Main plate | Height-bound on desktop (62vh, max 46rem); 4:5 on phones, 3:2 at tablet |
| Thumbnails | **1:1 square** at 80px on the homepage index; **4:5** in catalogue grids |
| Distance | Object. Fill the frame with the piece |
| People | None |
| Background | Plain and identical across the whole catalogue — one neutral surface, ideally a real bench top rather than seamless white |
| Lighting | Even, soft, one direction. Show edge paint, stitch pitch, hardware finish and grain honestly |

**Subject.** The piece and only the piece. Every product needs a front view;
supply detail frames of the edge, the stitching and the hardware as additional
images — they feed the lightbox on the detail page.

**Crop-safe.** The same master is cropped **square** for the index and **4:5**
for grids. **Centre the object with even margin on all four sides** so one file
serves both. This is the most common way a good product photograph breaks here.

Colour accuracy matters more here than anywhere else — buyers order in colours
named Chestnut, Dark Oil, Natural. Shoot a grey card.

---

## 6. Export and packing

| | |
|---|---|
| Paths | `public/images/export/packing-line.webp`, `public/images/export/container-loading.webp` |
| Distance | Wide to mid |
| People | Working hands; no faces required |
| Background | Yes |
| Lighting | Available light, including the flat light of a loading bay |

**Subject.** Cartons packed, labelled, taped, stacked, loaded. Packing lists.
Shipping marks. This is where "goods leave here" becomes physical, and it is the
least glamorous and most convincing material on the site. Photograph the boring
parts properly.

---

## 7. Kanpur

There is **no frame anywhere on this site for a photograph of the city**, and
none should be added. No skylines, no landmarks, no street scenes, no tannery
tourism. Kanpur is carried typographically — the hero line, the manifest, the
closing signature — and becomes physical through the workshop itself: this room,
these benches, this light, these cartons with an address on them.

If a shipping mark or a packing list carries the address, that is worth a frame.
It is the only "Kanpur photograph" the site wants.

---

## Not needed

No portraits of management. No team group shots. No office, meeting-room or
computer photography. No handshakes. No aerials of the building. No stock
"global logistics" imagery — no world maps, no aeroplanes, no container ships at
sunset. The eight export markets are a typographic list and stay one.

## Checklist before delivery

- [ ] Every frame's orientation matches the table above
- [ ] Subjects sit on the centre axis, not near an edge
- [ ] The home hero's lower-left third is quiet
- [ ] Product masters are centred so both 1:1 and 4:5 crops work from one file
- [ ] Machinery files are not dark
- [ ] Colour neutral; product colours accurate against a grey card
- [ ] Written permission held for anyone identifiable
- [ ] Files dropped at the exact paths above — no layout change required
