/**
 * Publication readiness.
 *
 * The gates that decide whether something may be published, and the Facts
 * Register they consult. Nothing here renders, and nothing here is imported by
 * a page: this layer answers one question, asked before anything goes out.
 *
 * Traces to: Master Implementation Blueprint §16 (the gates), §20 (the
 * dependency register), §26 (the launch gates), R8.4 (built in Stage 0, before
 * any surface).
 */

export {
  findGovernedFacts,
  factById,
  governedFacts,
  isPublishable,
  type Classification,
  type Confirmation,
  type GovernedFact,
  type RegisterMatch,
} from "./facts-register";

export {
  companyRecord,
  factFor,
  unconfirmedRecordItems,
  type RecordItem,
} from "./company-record";

export {
  approvedDocuments,
  classOrder,
  dependencies,
  holdingGate,
  isOutstanding,
  outstanding,
  unconfirmedFactLabels,
  type Dependency,
  type DependencyClass,
  type Discharge,
} from "./dependencies";

export {
  emptySnapshot,
  gates,
  minimumIntrinsicShorterSide,
  runGates,
  thresholds,
  type AssetFile,
  type CategoryRecord,
  type CertificationRecord,
  type ChapterRecord,
  type Finding,
  type Gate,
  type GateResult,
  type ImageRecord,
  type PersonRecord,
  type Provenance,
  type RegisterField,
  type Snapshot,
  type SourceHit,
  type SurfaceActions,
  type TestimonyRecord,
  type TextRecord,
} from "./gates";
