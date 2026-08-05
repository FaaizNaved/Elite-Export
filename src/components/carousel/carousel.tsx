"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export type CarouselSlideWidth = "full" | "half" | "third" | "quarter";

export interface CarouselProps {
  children: ReactNode;
  /** How many slides are visible at the widest breakpoint. */
  slideWidth?: CarouselSlideWidth;
  label: string;
  arrows?: boolean;
  pagination?: boolean;
  /** Seconds between advances. `false` disables autoplay. */
  autoplay?: number | false;
  /** Wraps back to the first slide at the end (autoplay and arrows). */
  loop?: boolean;
  className?: string;
}

/**
 * Reusable carousel for products, categories, testimonials, machines or gallery
 * tiles — it never inspects its children.
 *
 * Built on CSS scroll-snap: touch swipe, momentum, trackpad gestures and
 * keyboard scrolling all come from the platform. Pointer drag, arrows,
 * pagination and autoplay are the only JavaScript.
 *
 * ponytail: `loop` rewinds to the start rather than cloning slides. True
 * infinite scrolling needs slide virtualisation — worth adding only if a
 * design calls for a genuinely endless track.
 */
export function Carousel({
  children,
  slideWidth = "third",
  label,
  arrows = true,
  pagination = false,
  autoplay = false,
  loop = false,
  className,
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const slides = Children.toArray(children);
  const count = slides.length;

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const step = useCallback(
    (delta: number) => {
      const next = activeIndex + delta;
      if (next < 0) return scrollToIndex(loop ? count - 1 : 0);
      if (next >= count) return scrollToIndex(loop ? 0 : count - 1);
      scrollToIndex(next);
    },
    [activeIndex, count, loop, scrollToIndex],
  );

  // Derive the active slide and the edge states from the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      setAtStart(scrollLeft < 8);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);

      const children = Array.from(track.children) as HTMLElement[];
      const nearest = children.reduce(
        (best, child, index) => {
          const distance = Math.abs(child.offsetLeft - track.offsetLeft - scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActiveIndex(nearest.index);
    };

    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count]);

  useEffect(() => {
    if (!autoplay || paused || prefersReducedMotion || count < 2) return;
    const timer = window.setInterval(() => step(1), autoplay * 1000);
    return () => window.clearInterval(timer);
  }, [autoplay, paused, prefersReducedMotion, count, step]);

  // Drag-to-scroll for mouse users; touch already scrolls natively.
  const drag = useRef<{ startX: number; startScroll: number } | null>(null);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn("relative", className)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          drag.current = {
            startX: event.clientX,
            startScroll: event.currentTarget.scrollLeft,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          event.currentTarget.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerLeave={() => {
          drag.current = null;
        }}
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className={cn("shrink-0 snap-start", slideBasis[slideWidth])}
          >
            {slide}
          </li>
        ))}
      </ul>

      {arrows && count > 1 && (
        <div className="mt-6 flex items-center gap-2">
          <ArrowButton
            direction="previous"
            disabled={!loop && atStart}
            onClick={() => step(-1)}
          />
          <ArrowButton direction="next" disabled={!loop && atEnd} onClick={() => step(1)} />
        </div>
      )}

      {pagination && count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-badge transition-base",
                index === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-border-strong",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Slide widths, expressed as a share of the track minus the gap.
 *
 * On small screens a slide stops short of the viewport edge on purpose: the
 * next one peeks in, which is what tells you the track continues. These are
 * layout arithmetic for this component, not design tokens — a shared token
 * could not carry the `calc()` that subtracts the gap.
 */
const slideBasis: Record<CarouselSlideWidth, string> = {
  full: "w-full",
  half: "w-[85%] sm:w-[calc(50%-0.75rem)]",
  third: "w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]",
  quarter: "w-[70%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]",
};

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "previous" ? "Previous slide" : "Next slide"}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-badge border border-border",
        "text-foreground transition-fast hover:border-primary hover:bg-primary hover:text-primary-foreground",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <Icon icon={direction === "previous" ? ChevronLeft : ChevronRight} size="sm" />
    </button>
  );
}
