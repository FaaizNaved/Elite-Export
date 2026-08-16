/**
 * The layout gate — the four ways a composition fails in a browser and nowhere
 * else.
 *
 * `check:content` reads the content tree and `check:publication` reads the
 * company record; neither renders anything, so neither can see a plate painted
 * over a record rail. This runs the site at every field width the design is
 * composed at and applies the rules in `layout-probe.mjs`.
 *
 * Usage:
 *   node scripts/check-layout.mjs [origin] [path...]
 *
 * The site must be running (`npm run dev`, or `build` then `start`).
 *
 * **Playwright is not a dependency of this project and should not become one**
 * for a check that runs on demand — `decisions/0007-platform-over-dependencies`
 * is the standing rule. The driver is imported at run time and the script says
 * what to install if it is absent, so the rules stay versioned and runnable
 * whether or not a browser driver is present. The same probe is what an agent
 * or a devtools console evaluates by hand.
 */

import { FIELDS, LAYOUT_PROBE } from "./layout-probe.mjs";

const ORIGIN = process.argv[2] ?? "http://localhost:3000";
const PATHS = process.argv.slice(3).length ? process.argv.slice(3) : ["/"];

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "check:layout needs a browser driver, and Playwright is not installed.\n\n" +
      "  npm i -D playwright && npx playwright install chromium\n\n" +
      "It is deliberately not a dependency: every other check in this project runs in plain Node\n" +
      "(decisions/0007). The rules themselves live in scripts/layout-probe.mjs and can be\n" +
      "evaluated in any browser console without installing anything.",
  );
  process.exit(2);
}

const browser = await chromium.launch();
const page = await browser.newPage();
const failures = [];

for (const path of PATHS) {
  for (const [width, height] of FIELDS) {
    await page.setViewportSize({ width, height });
    await page.goto(ORIGIN + path, { waitUntil: "networkidle" });

    /* Walk the document: `elementFromPoint` only answers for what is on screen,
       so paint order — the half that matters — is only readable in view. */
    const merged = new Map();
    const docHeight = await page.evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < docHeight; y += height * 0.8) {
      await page.evaluate(`window.scrollTo(0, ${y})`);
      for (const f of await page.evaluate(LAYOUT_PROBE)) {
        merged.set(f.kind + f.where + f.detail, f);
      }
    }

    for (const f of merged.values()) failures.push({ path, width, height, ...f });
    process.stdout.write(merged.size ? "✗" : "·");
  }
}

await browser.close();
process.stdout.write("\n");

if (failures.length === 0) {
  console.log(`✓ layout OK — ${PATHS.length} surface(s) × ${FIELDS.length} field widths, no findings`);
  process.exit(0);
}

for (const f of failures) {
  console.error(`  ${f.kind.padEnd(9)} ${f.path} @ ${f.width}×${f.height}  ${f.detail}\n            ${f.where}`);
}
console.error(`\n✗ ${failures.length} layout finding(s)`);
process.exit(1);
