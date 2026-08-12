"use client";

import { useEffect } from "react";

/**
 * The reveal — the surface's one cross dissolve.
 *
 * Motion Direction M6: every movement has a visible cause, and the cause here
 * is the reader arriving at the element. It dissolves; it does not move the
 * frame, scale, zoom, float or parallax, and nothing is staggered inside a
 * field — one movement per field (M10).
 *
 * Three properties make it safe to have at all:
 *
 * 1. **It cannot hide content.** The hidden state is gated on
 *    `html[data-reveal="on"]`, which only this component sets, and it sets it
 *    on mount. A visitor whose script never runs is served the whole surface,
 *    painted.
 * 2. **It happens once.** Each element is unobserved the moment it arrives, so
 *    nothing re-fades on the way back up — a thing that disappears when you
 *    scroll away from it is the medium announcing itself (M7).
 * 3. **It disappears under `prefers-reduced-motion`.** The global rule in
 *    `globals.css` collapses the transition to 0.01ms and the end state paints
 *    immediately, with nothing substituted for the movement (§42.7).
 *
 * Mounted by the surface that uses it rather than by the shell, so the
 * observer is re-established on navigation.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.reveal = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      /* A little inside the fold, so a thing is arrived at rather than caught. */
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    for (const element of document.querySelectorAll("[data-reveal]")) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
