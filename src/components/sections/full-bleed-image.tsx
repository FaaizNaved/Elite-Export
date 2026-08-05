"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ContentImage } from "@/components/ui/image";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

export interface FullBleedImageProps {
  image: ImageToken;
  /**
   * A specification label, not a caption. Blueprint §8: documentation raises
   * perceived authenticity, sentiment lowers it — "One ear headstall, dark oil.
   * Kanpur, 2026." reads as a museum label. Omit it entirely to ship silent,
   * which is the blueprint's recommendation.
   */
  label?: string;
  /** Aspect ratio of the frame. The Pause is 21:9. */
  ratio?: "ultrawide" | "wide";
  className?: string;
}

/** How far the image drifts against the scroll. 0.92× — barely perceptible. */
const PARALLAX_RANGE = "8%";

/**
 * A single photograph, edge to edge, with nothing to read.
 *
 * The section's only job is to stop the page talking (blueprint §5). The
 * parallax is one of exactly three interactions budgeted for this page: the
 * image drifts at 0.92× scroll speed, which registers as depth rather than as
 * movement, and is disabled outright under `prefers-reduced-motion`.
 */
export function FullBleedImage({
  image,
  label,
  ratio = "ultrawide",
  className,
}: FullBleedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${PARALLAX_RANGE}`, PARALLAX_RANGE]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden bg-primary",
        ratio === "ultrawide" ? "aspect-[21/9]" : "aspect-video",
        // A photograph this large needs a floor on small screens, or a 21:9
        // crop becomes a letterbox strip.
        "max-md:aspect-[4/5]",
        className,
      )}
    >
      {/* The image is oversized so the drift never exposes an edge. */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y }}
        className="absolute inset-x-0 -top-[8%] h-[116%]"
      >
        <ContentImage
          image={image}
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </motion.div>

      {label && (
        <p className="absolute bottom-6 left-6 font-sans text-caption text-primary-foreground/60 md:bottom-8 md:left-8">
          {label}
        </p>
      )}
    </section>
  );
}
