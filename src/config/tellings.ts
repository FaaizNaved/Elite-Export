import type { Chapter } from "../types";

/**
 * Which chapters a telling carries.
 *
 * Documentary Storyboard §25.2 assigns every medium its chapters, and §25.1
 * states the law that governs all of them:
 *
 *   > **There is one story. There are many lengths.**
 *   > 1. Drop chapters. Never re-order them.
 *   > 2. **Never drop Recognition.** C3 or C7 is present in every telling.
 *   > 3. A chapter is told whole or not at all.
 *   > 4. The shortest telling is one chapter containing one G1 scene.
 *
 * §25.2 gives the website **C1–C10, complete** — across its surfaces, not on
 * any one of them. UX Blueprint §16 assigns Home its share in one sentence:
 * *Home is the only surface that touches all ten chapters and completes none.*
 *
 * This file is where the two meet. Every chapter is declared for every telling,
 * and each carries **why** it is told here or told elsewhere — because the
 * difference between a chapter that is absent for want of evidence and one that
 * is absent because another surface owns it is the difference between a shorter
 * telling and a broken one, and neither the code nor a reader can infer it.
 *
 * Traces to: Documentary Storyboard §25.1, §25.2, §7, §8.5; UX Blueprint §16
 * (R16.1, R16.2), §15.4 the chapter-to-surface mapping; MIB R5.2, R11.1, R11.2.
 */

/**
 * `tells` — this telling carries the chapter as a passage that proves
 * something in its own right (R16.1).
 *
 * `hands` — this telling touches the chapter and hands it on. **It is not
 * rendered here.** R16.1's forbidden column: Home does not describe another
 * surface, restate what another surface will establish, or preview a surface
 * with content lifted from it. §25.1 rule 3 is the same rule from the other
 * side: a partial chapter is a highlight, and a sequence of highlights is a
 * trailer.
 */
export type ChapterRole = "tells" | "hands";

export interface ChapterPlan {
  readonly chapter: Chapter;
  readonly role: ChapterRole;
  /** Why, in the words of the rule that decided it. */
  readonly reason: string;
  /** Where a `hands` chapter is told whole. */
  readonly handsTo?: string;
}

/**
 * Home — UX Blueprint §16.
 *
 * Its evidence table requires exactly two chapters: **the place, in use** at
 * rank E5 (C1) and **one decision being taken** at rank E1 with one precisely
 * described mechanism (C3). C3 is Home's Recognition moment and R16.2 forbids
 * deferring it — *a Home surface that defers Recognition to Manufacturing has
 * assumed a second surface, which breaks E4 for the visitor who leaves after
 * one.*
 *
 * The other eight are touched and handed on. That is not a gap in the telling:
 * it is §25.1 rule 1 — chapters are dropped, never re-ordered — applied to the
 * surface whose job is to open the story rather than to complete it.
 */
export const homeTelling: readonly ChapterPlan[] = [
  {
    chapter: "C1",
    role: "tells",
    reason:
      "§16's evidence table: the place, in use, at rank E5. Its argument is accumulation — by the end of it the visitor has stopped wondering whether the building exists (§7.1)",
  },
  {
    chapter: "C2",
    role: "hands",
    reason:
      "The first gate is at the door, and that is the argument Manufacturing makes at length (§7.1). Home restating it would be a preview of a surface (R16.1)",
    handsTo: "manufacturing",
  },
  {
    chapter: "C3",
    role: "tells",
    reason:
      "**Recognition.** §7.2 designates C3, §25.1 rule 2 forbids dropping it at any extent, and R16.2 forbids deferring it to a second surface",
  },
  {
    chapter: "C4",
    role: "hands",
    reason: "Told whole on Manufacturing; on Home it would be one highlight of a process (§25.1 rule 3)",
    handsTo: "manufacturing",
  },
  {
    chapter: "C5",
    role: "hands",
    reason:
      "The chapter a technical buyer watches twice (§7.1). It carries the durability argument and needs the extent Manufacturing gives it",
    handsTo: "manufacturing",
  },
  {
    chapter: "C6",
    role: "hands",
    reason: "Care taken after it stops being visible — a Manufacturing chapter (§7.1)",
    handsTo: "manufacturing",
  },
  {
    chapter: "C7",
    role: "hands",
    reason:
      "Recognition's reserve (§7.2), and Quality's own Recognition moment (UX §20). Home spends its Recognition on C3; carrying both would give the surface two",
    handsTo: "quality",
  },
  {
    chapter: "C8",
    role: "hands",
    reason: "The record. Quality and Export carry it; on Home it is a claim about paperwork (§7.1)",
    handsTo: "quality",
  },
  {
    chapter: "C9",
    role: "hands",
    reason: "Dispatch as an operation is the whole argument of Export (MIB R19.1)",
    handsTo: "export",
  },
  {
    chapter: "C10",
    role: "hands",
    reason:
      "Every telling ends here (§24, N13) — and the telling Home belongs to ends on About, not on the first surface of it",
    handsTo: "about",
  },
] as const;

/** The chapters a telling renders, in canonical order. */
export const chaptersTold = (telling: readonly ChapterPlan[]): Chapter[] =>
  telling.filter((plan) => plan.role === "tells").map((plan) => plan.chapter);

/**
 * Manufacturing — UX Blueprint §17.
 *
 * *To be the complete telling: the spine of the site, carrying C1–C10 in
 * canonical order, and the primary engine of Recognition and Confidence.* Its
 * evidence table asks for **all ten chapters**, each at the rank Documentary
 * Storyboard §7 requires of it.
 *
 * So every row is `tells`. This is the one surface with nothing to hand on:
 * §17's relationship note runs the other way — *Technology, Products, Quality
 * and Export are all extractions from it, and each links back to the chapter it
 * was extracted from.*
 *
 * R17.5 and N5: the chapters are unequal and **C3 is the longest**. That is a
 * property of how much evidence each chapter is given, not of this table.
 */
export const manufacturingTelling: readonly ChapterPlan[] = [
  { chapter: "C1", role: "tells", reason: "§17: the complete telling carries C1–C10. The place, in use (§7.1)" },
  { chapter: "C2", role: "tells", reason: "The first gate is at the door — a claim almost no intermediary can make and none can show (§7.1)" },
  {
    chapter: "C3",
    role: "tells",
    reason:
      "**Recognition** (§7.2, R17.5). Where skill is consequential and invisible: two cutters make the same piece from the same hide and only one of them will still be flat in a year (§7.1)",
  },
  { chapter: "C4", role: "tells", reason: "The process obeys the material's requirements (§7.1, Brand Bible §17.6)" },
  { chapter: "C5", role: "tells", reason: "The durability argument, and the chapter a buyer's technical colleague will watch twice (§7.1)" },
  { chapter: "C6", role: "tells", reason: "Care taken where nobody is checking — the definition of a standard (§7.1)" },
  {
    chapter: "C7",
    role: "tells",
    reason:
      "**The most important chapter in the set after C3** (§7.1). Its subject is a rejection, never an approval: a gate shown passing things is a formality",
  },
  { chapter: "C8", role: "tells", reason: "That the company can still answer a question about something it shipped three years ago (§7.1)" },
  { chapter: "C9", role: "tells", reason: "The label going on is frequently not ours — the company's relationship to its own name (§7.1)" },
  { chapter: "C10", role: "tells", reason: "The floor continuing. Every telling ends here (§7.1, N13, §24)" },
] as const;

/**
 * Quality — UX Blueprint §20.
 *
 * *To show that the standard is applied, that it costs something, and that
 * somebody outside the company has checked — in that order.* Question: **"Why
 * should I believe you?"**
 *
 * Its evidence table names three chapters and the surface is *extracted from
 * Manufacturing C2, C7 and C8* — which MIB §12.1 permits by name: the process
 * chapter exists *on Manufacturing, and extracted to Technology, Products,
 * Quality, Export*. Extraction is not a second telling; each surface asks the
 * chapter a different question, and Quality's three are the only ones that
 * answer *why should I believe you*.
 *
 * **C7 is this surface's Recognition moment** (R20.2, §7.2's reserve), not C3.
 * R20.2 states the mechanism: *a gate shown passing things is a formality; a
 * gate shown refusing something is a threshold with a cost.* §21.2 is why it
 * is the whole argument — showing a rejection proves at once that a threshold
 * exists, that it has a location, that somebody is authorised to apply it, and
 * that applying it is more important than the piece.
 *
 * Nothing here is a badge. R20.1: *never lead with badges — a row of
 * certification marks at the top of this surface is the single most damaging
 * arrangement available to it.* Certification records are absent entirely
 * while MIB dependency 7 stands (*Quality states mechanism; no marks appear*),
 * so there is no chapter for them to lead.
 */
export const qualityTelling: readonly ChapterPlan[] = [
  { chapter: "C1", role: "hands", reason: "The place is established on Home and told at length on Manufacturing", handsTo: "manufacturing" },
  {
    chapter: "C2",
    role: "tells",
    reason:
      "**§20's evidence table: the first gate, at the door.** The standard applied before any value has been added — a claim almost no intermediary can make and none can show (§7.1)",
  },
  {
    chapter: "C3",
    role: "hands",
    reason:
      "Recognition here is bought with the gate, not the cut (R20.2). C3 needs the extent Manufacturing gives it (R17.5), and a surface carrying both would have two Recognition moments",
    handsTo: "manufacturing",
  },
  { chapter: "C4", role: "hands", reason: "How the material is shaped is Manufacturing's question, not *why should I believe you* (§7.1)", handsTo: "manufacturing" },
  { chapter: "C5", role: "hands", reason: "The durability argument is told where the joining is shown (§7.1)", handsTo: "manufacturing" },
  { chapter: "C6", role: "hands", reason: "Care taken where nobody is checking is Manufacturing's chapter; the finished work it produces is Products' (§7.1, §19)", handsTo: "manufacturing" },
  {
    chapter: "C7",
    role: "tells",
    reason:
      "**Recognition** (R20.2, §7.2's reserve). §20's evidence table ranks it 1: *a rejection: something refused*. A standard that has never cost anything is not a standard (§21.2)",
  },
  {
    chapter: "C8",
    role: "tells",
    reason:
      "**§20's evidence table: records produced during the work.** Documentation produced during the work, not written up afterwards — that the company can still answer a question about something it shipped three years ago (§7.1)",
  },
  { chapter: "C9", role: "hands", reason: "Dispatch as an operation is the whole argument of Export (MIB R19.1)", handsTo: "export" },
  { chapter: "C10", role: "hands", reason: "Every telling ends there, and this one ends at the check a stranger can make without asking us (§24, §20)", handsTo: "about" },
] as const;

/**
 * Products — UX Blueprint §19.
 *
 * *To show the breadth of what the company can make, **as a catalogue of
 * capability rather than an inventory of stock**.* Its question is "What can
 * you make?", and its evidence table names one chapter it can tell whole:
 * **finished work, unretouched — C6.**
 *
 * Everything else in that table is not a chapter. The range of forms is the
 * three-level structure §19 fixes; the specifications are the product records
 * themselves (§43.2). Neither is a passage of the story, and neither may
 * pretend to be — §7.4 is explicit that **the offer is not a chapter**: *there
 * is no chapter that sells.*
 *
 * C9 is handed to Export rather than told here. §19's evidence table cites it
 * for *the fact that the label is frequently not ours*, which is a fact a
 * product record states about itself; the chapter's own subject is dispatch as
 * an operation, and MIB R19.1 makes that the whole argument of Export. Telling
 * C9 on two surfaces would be one chapter told twice, which §25.1 rule 3 and
 * L10 both refuse.
 */
export const productsTelling: readonly ChapterPlan[] = [
  { chapter: "C1", role: "hands", reason: "The place is established on Home and told at length on Manufacturing", handsTo: "manufacturing" },
  { chapter: "C2", role: "hands", reason: "The standard applied at the door is Manufacturing's argument (§7.1)", handsTo: "manufacturing" },
  {
    chapter: "C3",
    role: "hands",
    reason:
      "Recognition belongs to the surface that can give it the extent it needs (R17.5). Products links across to it rather than restating it — §19: each level links across to the manufacturing chapter that produced the work",
    handsTo: "manufacturing",
  },
  { chapter: "C4", role: "hands", reason: "The forms the floor can produce are shown here as work; how they are shaped is Manufacturing's (§19, R17.2)", handsTo: "manufacturing" },
  { chapter: "C5", role: "hands", reason: "The chapter a technical colleague watches twice needs Manufacturing's extent (§7.1)", handsTo: "manufacturing" },
  {
    chapter: "C6",
    role: "tells",
    reason:
      "**§19's evidence table: finished work, unretouched.** The only chapter that answers *what can you make* with something observed rather than listed (§7.1)",
  },
  { chapter: "C7", role: "hands", reason: "The gate is Quality's Recognition moment (UX §20)", handsTo: "quality" },
  { chapter: "C8", role: "hands", reason: "The record arrives on Quality and Export, where the work it records has been shown (N6)", handsTo: "quality" },
  {
    chapter: "C9",
    role: "hands",
    reason:
      "Dispatch as an operation is the whole argument of Export (MIB R19.1). The label fact §19 cites is a specification a product record states, not a second telling of the chapter",
    handsTo: "export",
  },
  { chapter: "C10", role: "hands", reason: "Every telling ends there, and this one ends at a specification (§24, R19.6)", handsTo: "about" },
] as const;

/**
 * Export — UX Blueprint §21.
 *
 * *To show that goods leave correctly, documented, to markets already served —
 * presented as **logistics competence rather than as reach**.* Question: **"Can
 * you ship to me?"** Creative Direction Book §20: *competent logistics, calmly
 * handled*, and **unglamorous by design**.
 *
 * It tells **one chapter**, and MIB R19.1 is why: *What leaves (C9) → Export.
 * **Dispatch as an operation is the whole argument of the surface.*** §25.1
 * rule 4 names that shape rather than treating it as a shortfall — the shortest
 * telling is one chapter containing one scene, and below that make nothing.
 *
 * **C8 is not told here, and that is the decision this table exists to record.**
 * §21's evidence table cites C8 for *the documents issued, and who issues them*,
 * which reads like a second chapter and is not one:
 *
 * - §7's own chapter table gives C9 the grade **"Process and records"**. The
 *   documents that leave with the goods are inside the chapter about the goods
 *   leaving; lifting them out makes a record chapter whose subject is already
 *   spoken for.
 * - Quality tells C8 whole — *records produced during the work* (UX §20). The
 *   same records told again here is one fact stated twice (L10) and a chapter
 *   told twice (§25.1 rule 3). §21's own relationship line puts it the other
 *   way round: Export is *linked from Quality (the record)*, not a second
 *   telling of it.
 * - N6 confirms it from the other side. C8 precedes C9 canonically, so on this
 *   surface it would be the chapter the telling opens on — and §10.1 rule 5
 *   refuses a telling that opens on a record, *before any work has been shown*.
 *   Export cannot open on its paperwork.
 *
 * Recognition is neither C3 nor C7 here, and is not dropped: §25.1 rule 2
 * governs **a telling**, and §25.2 gives the website *C1–C10, complete* across
 * its surfaces. Recognition is spent where §7.2 puts it — C3 on Home and
 * Manufacturing, C7 on Quality. Export is a supporting extraction (§21), which
 * is the same standing Products has with C6.
 *
 * What §21 asks for and this table cannot supply is recorded rather than
 * invented: **markets served are absent** (dependency 8 — *Export states
 * process; no markets are named*), **terms and lead times are absent** (R21.3,
 * dependency 3), and R21.1 forbids the illustration that would stand in for
 * them — *no maps, globes, arcs, aircraft or animated route lines. Markets are
 * a record.*
 */
export const exportTelling: readonly ChapterPlan[] = [
  { chapter: "C1", role: "hands", reason: "The place is established on Home and told at length on Manufacturing", handsTo: "manufacturing" },
  { chapter: "C2", role: "hands", reason: "The standard applied at the door is Manufacturing's argument, and Quality's evidence (§7.1, UX §20)", handsTo: "manufacturing" },
  {
    chapter: "C3",
    role: "hands",
    reason:
      "Recognition belongs to the surface that can give it the extent it needs (R17.5). *Can you ship to me* is not answered by the cut",
    handsTo: "manufacturing",
  },
  { chapter: "C4", role: "hands", reason: "How the material is shaped is Manufacturing's question (§7.1)", handsTo: "manufacturing" },
  { chapter: "C5", role: "hands", reason: "The durability argument is told where the joining is shown (§7.1)", handsTo: "manufacturing" },
  { chapter: "C6", role: "hands", reason: "Finished work is Products' chapter — a catalogue of capability, unretouched (§19)", handsTo: "products" },
  { chapter: "C7", role: "hands", reason: "The gate is Quality's Recognition moment (R20.2, §7.2's reserve)", handsTo: "quality" },
  {
    chapter: "C8",
    role: "hands",
    reason:
      "Told whole on Quality — *records produced during the work* (UX §20). The documents that leave with the goods are inside C9, whose required grade is **process and records** (§7); a second record chapter here is the same fact stated twice (L10), and N6 refuses a telling that opens on one",
    handsTo: "quality",
  },
  {
    chapter: "C9",
    role: "tells",
    reason:
      "**Dispatch as an operation is the whole argument of the surface** (MIB R19.1). §21's evidence table ranks packing and dispatch at 5 and 2, and §7.1 states what the chapter is really about — *the label going on is frequently not ours*: the company is answerable for objects that will never carry its name",
  },
  { chapter: "C10", role: "hands", reason: "Every telling ends there, and this one ends where the goods do (§24, N13)", handsTo: "about" },
] as const;

/**
 * About — UX Blueprint §22.
 *
 * *To answer who the visitor is dealing with — **the people and the place** —
 * without becoming a founder legend, a timeline or a values list.* Question:
 * **"Who am I dealing with?"** Creative Direction Book §20: *meeting the people
 * and the place, not the founder's legend*, and **plain-spoken — a page that
 * would embarrass nobody who works there.**
 *
 * It tells the two chapters §22's evidence table names, and they are the first
 * and the last of the canonical set:
 *
 * - **C1, the place** — §22's first row, *the place, named and located*. MIB
 *   R19.1 lists *the place (C1)* as **blocking for Home, About and
 *   Manufacturing**, and a surface is not blocked by a chapter it hands on.
 * - **C10, tomorrow** — §22's second row, *people at their work, named*. R22.5:
 *   *About carries C10 and therefore **ends by continuing**, not by concluding*
 *   (N13). Every other telling in this file hands C10 here.
 *
 * **The two are a pair, and §24.3 is why both are needed on one surface.** C10
 * *comes back to where C1 began: the same rooms, work in progress, nothing
 * announced. The difference is entirely in the viewer* — and that return is
 * called **the only structural symmetry this brand permits**. A surface telling
 * C10 without C1 has nothing to return to.
 *
 * **This is not Home's C1 told twice.** §12.1 permits the extraction and §8.5
 * requires every chapter to stand alone; what makes two tellings of one chapter
 * legitimate is that they ask it different questions. Home asks C1 *is anybody
 * actually here* and annotates it with the company's own account of itself.
 * About asks it *who am I dealing with* and carries **no annotation at all** —
 * §7.1: *its argument is accumulation, not information; by the end of C1 the
 * viewer should have stopped wondering whether the building exists, **without
 * having been told that it does.*** The naming and locating half of §22's row
 * is the footer's record, on every surface already (L10: one fact, stated once).
 *
 * Recognition is neither C3 nor C7 here and is not dropped — §25.1 rule 2
 * governs a telling, §25.2 gives *the website* C1–C10 complete across its
 * surfaces, and §22 says so itself: About *is not on the critical path of any
 * journey — and that is deliberate.* The same standing Products has with C6 and
 * Export with C9.
 *
 * Two of §22's four evidence rows are not chapters and are absent rather than
 * invented: **the founding fact** (rank 8) is dependency 2 and R22.1 allows it
 * only as *a fact stated once, never a passage*; **what the company does not
 * do** (rank 6, R22.4) is dependency 12. §5's nine refused stories are what the
 * surface would otherwise fill with — the founder's journey, the growth story,
 * the mission, heritage — and §5.1 states the reason none of them can be
 * substituted: **this story has no protagonist.**
 */
export const aboutTelling: readonly ChapterPlan[] = [
  {
    chapter: "C1",
    role: "tells",
    reason:
      "**§22's evidence table: the place, named and located.** R19.1 lists the place as blocking for this surface — *nothing establishes that the building exists except the building* — and §24.3 needs it here for C10 to return to (§7.1)",
  },
  { chapter: "C2", role: "hands", reason: "The standard applied at the door is Manufacturing's argument, and Quality's evidence (§7.1, UX §20)", handsTo: "manufacturing" },
  {
    chapter: "C3",
    role: "hands",
    reason:
      "Recognition needs the extent Manufacturing gives it (R17.5), and §5.1 forbids the alternative reading of this surface — *a film about a remarkable cutter is a film about a risk*",
    handsTo: "manufacturing",
  },
  { chapter: "C4", role: "hands", reason: "How the material is shaped is Manufacturing's question (§7.1)", handsTo: "manufacturing" },
  { chapter: "C5", role: "hands", reason: "The durability argument is told where the joining is shown (§7.1)", handsTo: "manufacturing" },
  { chapter: "C6", role: "hands", reason: "Finished work is Products' chapter (§19); the finishing operation is Manufacturing's (§7.1)", handsTo: "products" },
  { chapter: "C7", role: "hands", reason: "The gate is Quality's Recognition moment (R20.2, §7.2's reserve)", handsTo: "quality" },
  { chapter: "C8", role: "hands", reason: "The record is Quality's chapter — documentation produced during the work (UX §20)", handsTo: "quality" },
  { chapter: "C9", role: "hands", reason: "Dispatch as an operation is the whole argument of Export (MIB R19.1)", handsTo: "export" },
  {
    chapter: "C10",
    role: "tells",
    reason:
      "**§22's evidence table: people at their work, named**, and R22.5 — *About carries C10 and therefore ends by continuing, not by concluding.* §24.1: not the founder, not a manager, not anybody's summary — **somebody who will be doing this work tomorrow**, because permanence cannot be stated, only implied by somebody carrying on",
  },
] as const;
