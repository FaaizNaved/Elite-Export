"use client";

import { useEffect } from "react";

/**
 * The two movements that respond to a reader.
 *
 * **The rise** — an element arrives at 0 opacity and 20px low, and takes 1.1s
 * to be placed. Once. It is never re-hidden on the way back up.
 *
 * **The drift** — a plate moves against the scroll by at most 28px across its
 * whole travel through the viewport. It is under the threshold at which a
 * reader can watch it happen, and over the one at which a page reads as flat.
 *
 * Both are gated on `html[data-motion="on"]`, set here on mount: a visitor
 * whose script never runs is served the whole surface, painted. Reduced motion
 * removes both — the transition through the global rule, the drift through its
 * own media query.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    for (const element of document.querySelectorAll("[data-reveal]")) {
      observer.observe(element);
    }

    /* The drift. One loop, one read of the layout per frame, written straight
       to a custom property so no layout is invalidated. */
    const drifting = [...document.querySelectorAll<HTMLElement>("[data-drift]")];
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = () => {
      frame = 0;
      const viewport = window.innerHeight;

      for (const element of drifting) {
        const box = element.getBoundingClientRect();
        if (box.bottom < -200 || box.top > viewport + 200) continue;

        /* -1 when the element is entering from below, +1 when it has left
           above. Multiplied by half the amplitude, so total travel is 28px. */
        const progress = (box.top + box.height / 2 - viewport / 2) / (viewport / 2 + box.height / 2);
        const amount = Number(element.dataset.drift) || 14;
        element.style.setProperty("--drift", `${(-progress * amount).toFixed(2)}px`);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(place);
    };

    if (!reduced && drifting.length > 0) {
      place();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
