import type { ReactNode } from "react";
import type { EvidenceRank, Image } from "../../types";

/**
 * The scene — Documentary Storyboard §9, §10, §11.
 *
 * A chapter is not a container of images. Documentary Storyboard builds it out
 * of **scenes**, grades them, and states what the order of two of them proves.
 * This module is that vocabulary, expressed once so every chapter on every
 * surface is composed the same way.
 *
 * **It is not a new component.** MIB R10.3 closes the inventory at §11, §12 and
 * §13, and there is no "Scene" entry. A scene is the interior of the Chapter
 * component — §11.1 lists Chapter as a *Composite* — so what is defined here is
 * a **shape and its rules**, and `Chapter` composes it. R2.6: what is built is
 * decided; how it is built is the builder's.
 *
 * Traces to: Documentary Storyboard §9.1 (what a scene is), §9.2 (scene versus
 * view), §10.1 (the rules of the hierarchy), §11.1 (the permitted
 * relationships), §11.3 (adjacency), §11.4 (composition, not sequence), §8.4
 * (how a chapter ends); Photography Direction §5.1, §5.2, §31.3; Creative
 * Direction Book §17.3, §22.2; Brand Bible D1; VDS §23.1, §31.1, §31.3.
 */

/**
 * §11.1 — the permitted relationships, and the list is closed.
 *
 * §11.4 is why this is a required field rather than a nicety: *a production
 * plan that lists scenes without stating what each pair proves has planned a
 * running order, not a story.* The type makes the plan state it.
 *
 * The forbidden six at §11.2 — hand against machine, before and after, ironic
 * juxtaposition, us against them, two scenes making the same point, escalation
 * for its own sake — are absent rather than validated against, which is the
 * same technique VDS §49 uses for a forbidden value.
 */
export type SceneRelationship =
  /** An act, then what it made possible later. §11.1: the strongest available. */
  | "cause-and-consequence"
  /** Place, then the detail inside it. Earns the right to close attention (N4). */
  | "establish-and-examine"
  /** Detail, then the room it is inside. Scale. */
  | "examine-and-locate"
  /** The same act, different hands, identical treatment. Repeatability. */
  | "repetition-and-variation"
  /** A piece rejected beside a piece passed. The threshold has a location. */
  | "refusal-and-acceptance"
  /** An operation, then the document it produced. Trust, without a word. */
  | "act-and-record"
  /** A thing completed, then the next thing arriving. The chapter handoff (§12). */
  | "answer-and-question";

/**
 * One continuous act of work, in one place, with one consequence (§9.1).
 *
 * A scene is a unit of argument, not a unit of production — so it is the frames
 * *and* what they are for, together.
 */
export interface Scene {
  /**
   * The photographs that show the act. §9.2: if nothing changes it is a view,
   * and a view can never carry a chapter's question — which the rank of the
   * frames expresses (E5 is a located view) and `sceneRefusal` enforces.
   */
  readonly frames: readonly Image[];
  /**
   * What this scene and the one before it prove together (§11.1). Required
   * after the first scene, because a pair with no stated relationship is a
   * running order (§11.4).
   */
  readonly relationship?: SceneRelationship;
  /**
   * Brand Bible D1: photography carries the argument, everything else
   * annotates. It follows the frames for that reason, never precedes them.
   */
  readonly annotation?: ReactNode;
  /**
   * §8.4 and Creative Direction Book §22.2: a chapter ends by releasing rather
   * than concluding — the last thing asked of the reader is smaller than the
   * thing before it, and then there is space. Rendered last, once, on the final
   * scene.
   */
  readonly release?: ReactNode;
}

/**
 * §31.3 — bleed is the default for E1, E2 and E5, because an image that
 * continues past the edge of the field implies a world that continues past the
 * edge of the frame. Bounded placement is the **exception and a deliberate
 * change of register**: an E4 record or an E6 object, where the frame is part
 * of what is being shown.
 *
 * Presence therefore follows the rank of the photograph, not the preference of
 * the surface. A frame whose rank is unrecorded is not published at all, so the
 * fallback here is never reached in a published state.
 */
export const bleedsAtRank = (rank: EvidenceRank | undefined): boolean =>
  rank === "E1" || rank === "E2" || rank === "E5";

/**
 * §31.1 — three to five frames of the same operation, treated identically,
 * because there the comparison *is* the argument. Below three it is not a set.
 */
export const isEvidenceSet = (frames: readonly Image[]): boolean =>
  frames.length >= 3 &&
  frames.length <= 5 &&
  frames.every((frame) => frame.evidenceRank === "E3");

/**
 * Why a chapter may not be told, in the words of the rule that refuses it.
 *
 * §10.1 gives six rules and three of them are checkable against what the
 * archive records. The other three — a chapter's weight is its highest grade,
 * steep-or-absent adjacency, and testimony never standing alone — are
 * judgements about scenes rather than facts about frames, and Photography §22.5
 * puts those with the person who was in the room.
 */
export function sceneRefusal(
  scenes: readonly Scene[],
  options: {
    readonly isRecognition?: boolean;
    /** Whether this is the chapter the telling opens on (N6). */
    readonly opensTheTelling?: boolean;
  } = {},
): string | undefined {
  const frames = scenes.flatMap((scene) => [...scene.frames]);
  if (frames.length === 0) return "no frame in the archive can prove it";

  const ranks = frames.map((frame) => frame.evidenceRank);

  /*
   * §10.1 rule 2 and Photography §5.2 rule 2: no chapter may consist only of
   * located views, and no accumulation of E5 produces E2. Twenty views of empty
   * rooms prove a building and nothing else — §9.2 calls the result a mood
   * piece, which "will be described as beautiful and will prove nothing".
   */
  if (ranks.every((rank) => rank === "E5")) {
    return "every frame is a located view — a chapter built from views is a mood piece (§9.2, §10.1 rule 2)";
  }

  /*
   * §10.1 rule 5, Photography §5.2 rule 3, N6: *every claim is earned before it
   * is made — no credential, no capability, no number arrives before the work
   * that justifies it.*
   *
   * The rule is about position **in the telling**, not inside a chapter. C8's
   * whole subject is the record (§7.1), and by the canonical order the work it
   * records is six chapters behind it — so a record opening C8 is earned. What
   * is forbidden is a record opening the telling, before any work has been
   * shown, which is the badge N6 names.
   */
  if (options.opensTheTelling && ranks[0] === "E4") {
    return "the telling opens on a record, and no claim arrives before the work that justifies it (N6, §10.1 rule 5)";
  }

  /*
   * §10.1 rule 3 and Photography §5.1: Recognition is bought only with the
   * consequential grade, and E1 is the only rank that produces it. No
   * accumulation of anything else will do.
   */
  if (options.isRecognition && !ranks.includes("E1")) {
    return "it is the Recognition chapter and holds no E1 frame — Recognition is bought only with a decision being taken (§10.1 rule 3, Photography §5.1)";
  }

  /*
   * §11.3: no two adjacent scenes may be the same grade and the same
   * relationship. Two scenes in the same relationship are experienced as one
   * long scene, and one long scene is where attention leaves.
   */
  const repeated = scenes.findIndex(
    (scene, index) => index > 0 && scene.relationship === scenes[index - 1].relationship,
  );
  if (repeated > 0) {
    return `two adjacent scenes share the ${scenes[repeated].relationship} relationship — they are experienced as one long scene (§11.3)`;
  }

  return undefined;
}
