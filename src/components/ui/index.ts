/**
 * The design system's public surface — the six element types of Visual Design
 * System §34.2, and nothing else.
 *
 *   photograph  `image`       ContentImage
 *   statement   `typography`  Statement
 *   passage     `typography`  Passage
 *   record      `typography`  Record, Eyebrow, Caption
 *   action      `action`      Action, TextLink, Continuation
 *   mark        `icon`        Mark — four of them, and the list is closed (§43.3)
 *
 * Plus the two things that are not elements but the space they sit in: the
 * field (§29.2) and the break (§23.1).
 *
 * The inventory is closed (MIB R10.3). A component not listed at §11, §12 or
 * §13 does not exist, and adding one requires the §34.3 addition test followed
 * by an amendment — never a file.
 */
export * from "./action";
export * from "./breadcrumb";
export * from "./field";
export * from "./icon";
export * from "./image";
export * from "./pagination";
export * from "./section";
export * from "./typography";
