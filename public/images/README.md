# Images

Every file here is a generated placeholder (`npm run generate:placeholders`), and
`.placeholders.json` beside this file is the exact list of them. Photography
Direction §24.5 refuses all of it: **there is no such thing as a temporary
image.**

## Bringing real photography in

Dropping a file in is **not** enough, and this instruction used to say it was.
A photograph reaches a surface through the archive, not through a path: a chapter
and Gallery both ask `chapterFrames` what the library holds for a chapter
(MIB R8.7, R15.4), and a frame is not evidence until its record says so.

Four steps, in order:

1. **Put the file under `public/images/…`.** The folder is yours to choose; the
   archive keys on the path. Deliver it at not less than 2× the largest size it
   will render at (VDS §32.3) — 960px on the shorter side is the floor for
   anything that must reach the evidence threshold.

2. **Run `npm run images:record`.** It measures the file and writes it into
   `src/content/images.json` with every authored field left blank. It never
   invents one.

3. **Type the record into `src/content/images.json`**, once per frame:

   | Field | What it is |
   | --- | --- |
   | `alt` | What is in the frame, for somebody who cannot see it |
   | `caption` | Place, material, state, date — the specification (Storyboard §13.6) |
   | `chapter` | Which of the ten canonical chapters it belongs to (`C1`–`C10`) |
   | `evidenceRank` | `E1`–`E6` (Photography Direction §5). Presence follows it: E1, E2 and E5 bleed; E4 and E6 are bounded |
   | `provenance` | `place`, `capturedOn`, `photographer`, `permission` |

   Missing any of them and the frame does not render, anywhere. `npm run
   images:record` prints what each frame still needs.

4. **Remove its line from `.placeholders.json`.** That file is the generator's
   record of what it produced; a frame that has been re-shot is no longer on it,
   and the Placeholder gate goes quiet for that file alone.

## What to expect

Nothing appears because a file exists. A chapter with no frame is **absent, not
empty** (MIB R11.1), and it fills the moment the archive can carry it — with no
code change, which is the whole point of the arrangement.

Check the state at any time:

```
npm run images:record -- --check    what each frame still needs
npm run check:publication           what still refuses publication, and who owns it
```

**Do not run `npm run generate:placeholders` again once real photography is
here.** It writes over every path on its list.
