/**
 * The layout probe — the part that decides what a failure *is*.
 *
 * Kept separate from anything that drives a browser, because the driver is the
 * disposable half. This project has no browser-automation dependency and does
 * not want one; the rules below still need to be written once and applied the
 * same way by whatever opens a page — a Playwright run in CI, a devtools
 * console, an agent's browser pane.
 *
 * It is a string because it is evaluated inside the page. Everything it needs
 * is on `document` and `window`; it imports nothing and leaves nothing behind.
 *
 * Four rules, each traceable:
 *
 *   COLLISION   a frame overlapping text — and whether it *paints over* it,
 *               which is the difference between a composition that still reads
 *               and one that has silently deleted its own evidence
 *   OVERFLOW    anything reaching past the layout viewport
 *   EXTENT      VDS §31.4 — a frame is never above 100% of viewport height,
 *               because an image that cannot be seen whole cannot be examined
 *   THRESHOLD   VDS §30.3 (Fixed) — below a 320px shorter side an image is
 *               decoration and may not appear
 *
 * **Roles, not names.** The collision this was built to catch was one
 * chapter's board reaching into the *previous* chapter's record rail through a
 * negative margin — two elements in different sections, invisible to a reading
 * of either file. A check written against `#the-place` or `.reserved-frame`
 * would have caught that instance and nothing else. So a frame is any figure's
 * drawn child and text is any leaf carrying words: re-compose a chapter, add a
 * surface, rename anything, and these still hold.
 *
 * Returns an array of findings. Empty means the field is clean at the scroll
 * position it was called from — `elementFromPoint` only answers for what is on
 * screen, so a caller walks the document and merges.
 */
export const LAYOUT_PROBE = `(() => {
  const n = (x) => +x.toFixed(1);
  const cw = document.documentElement.clientWidth;
  const findings = [];

  const frames = [...document.querySelectorAll('figure > :first-child')];
  const texts = [...document.querySelectorAll('h1,h2,h3,p,dt,dd,li,span,a,figcaption')]
    .filter((e) => e.textContent.trim().length > 0
      && !e.querySelector('h1,h2,h3,p,dt,dd,li,span,a')
      && !e.closest('figure'));

  /* EXTENT and THRESHOLD — one reading per frame, independent of scroll. */
  for (const f of frames) {
    const b = f.getBoundingClientRect();
    if (b.width === 0) continue;
    const pct = b.height / innerHeight * 100;
    const label = n(b.width) + '×' + n(b.height);
    if (pct > 100.5) {
      findings.push({ kind: 'EXTENT', where: label,
        detail: n(pct) + '% of viewport height (VDS 31.4: never above 100%)' });
    }
    const shorter = Math.min(b.width, b.height);
    if (shorter < 320) {
      findings.push({ kind: 'THRESHOLD', where: label,
        detail: 'shorter side ' + n(shorter) + 'px, below the 320px decoration line (VDS 30.3, Fixed)' });
    }
  }

  /* OVERFLOW — the document, then the first element responsible. */
  const doc = document.documentElement.scrollWidth - cw;
  if (doc > 0) {
    findings.push({ kind: 'OVERFLOW', where: 'document', detail: 'scrolls horizontally by ' + n(doc) + 'px' });
  }
  for (const e of document.querySelectorAll('body *')) {
    const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > cw + 1 || b.left < -1)) {
      findings.push({ kind: 'OVERFLOW',
        where: e.tagName.toLowerCase() + '.' + String(e.className || '').slice(0, 40),
        detail: 'reaches ' + n(b.right > cw ? b.right - cw : -b.left) + 'px past the viewport edge' });
      break;
    }
  }

  /* COLLISION — every frame against every text leaf, with paint order. */
  for (const f of frames) {
    const fb = f.getBoundingClientRect();
    if (fb.width === 0) continue;
    for (const t of texts) {
      const tb = t.getBoundingClientRect();
      if (tb.width === 0 || tb.height === 0) continue;
      const ox = Math.min(fb.right, tb.right) - Math.max(fb.left, tb.left);
      const oy = Math.min(fb.bottom, tb.bottom) - Math.max(fb.top, tb.top);
      if (ox <= 2 || oy <= 2) continue;
      const cx = (Math.max(fb.left, tb.left) + Math.min(fb.right, tb.right)) / 2;
      const cy = (Math.max(fb.top, tb.top) + Math.min(fb.bottom, tb.bottom)) / 2;
      if (cy < 0 || cy > innerHeight) continue;
      const top = document.elementFromPoint(cx, cy);
      const covered = top && top !== t && !t.contains(top);
      findings.push({ kind: 'COLLISION',
        where: JSON.stringify(t.textContent.trim().slice(0, 40)),
        detail: (covered ? 'frame PAINTS OVER text' : 'frame overlaps text') + ' by ' + n(ox) + '×' + n(oy) + 'px' });
    }
  }

  return findings;
})()`;

/** The widths the design is composed at, with the shorter common pairing. */
export const FIELDS = [
  [1920, 1080],
  [1600, 900],
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [658, 900],
  [390, 844],
  [375, 667],
];
