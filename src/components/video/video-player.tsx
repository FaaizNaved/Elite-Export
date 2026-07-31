"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";

export interface VideoPlayerProps {
  /** A local path (`/videos/factory.mp4`), a YouTube URL, or a YouTube ID. */
  src: string;
  /** Required — used as the iframe title and the media's accessible name. */
  title: string;
  poster?: ImageToken;
  /**
   * `player` shows native controls behind a click-to-play poster.
   * `background` autoplays muted and silent behind other content.
   */
  variant?: "player" | "background";
  className?: string;
}

/** Extracts a YouTube video id from a watch/short/embed URL, or a bare id. */
export function youTubeId(src: string): string | null {
  if (/^[\w-]{11}$/.test(src)) return src;
  const match = src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match?.[1] ?? null;
}

/**
 * One video component for local files and YouTube.
 *
 * YouTube is loaded through a facade: nothing from youtube.com is requested
 * until the user presses play, which keeps third-party JS off the critical path
 * and out of the performance budget.
 */
export function VideoPlayer({
  src,
  title,
  poster,
  variant = "player",
  className,
}: VideoPlayerProps) {
  /** Facade dismissed — the real player (or iframe) is mounted. */
  const [started, setStarted] = useState(false);
  /** Mirrors the media element's own state, for the background pause control. */
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const youtube = youTubeId(src);

  const isBackground = variant === "background";

  // Subscribe to the element rather than tracking play state by hand — the
  // browser can pause a video for reasons we never initiated.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [started]);

  // Autoplaying background video is decoration; honour the OS preference.
  useEffect(() => {
    if (!isBackground) return;
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) video.pause();
    else void video.play().catch(() => undefined);
  }, [isBackground, prefersReducedMotion]);

  if (youtube) {
    return (
      <div className={cn("relative overflow-hidden rounded-image bg-primary", className)}>
        {started ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <PosterButton poster={poster} title={title} onPlay={() => setStarted(true)} />
        )}
      </div>
    );
  }

  if (isBackground) {
    return (
      <div className={cn("relative size-full overflow-hidden", className)}>
        <video
          ref={videoRef}
          src={src}
          poster={poster?.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          className="size-full object-cover"
        />
        {/* WCAG 2.2.2: anything that moves for more than five seconds needs a
            pause control. */}
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            // `playing` updates from the element's own play/pause events.
            if (video.paused) void video.play().catch(() => undefined);
            else video.pause();
          }}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute right-4 bottom-4 z-raised inline-flex size-9 items-center justify-center rounded-badge bg-primary/60 text-primary-foreground backdrop-blur-sm transition-fast hover:bg-primary/80"
        >
          <Icon icon={playing ? Pause : Play} size="xs" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-image bg-primary", className)}>
      {started ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster?.src}
          controls
          autoPlay
          playsInline
          aria-label={title}
          className="size-full object-cover"
        />
      ) : (
        <PosterButton poster={poster} title={title} onPlay={() => setStarted(true)} />
      )}
    </div>
  );
}

function PosterButton({
  poster,
  title,
  onPlay,
}: {
  poster?: ImageToken;
  title: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play video: ${title}`}
      className="group/play relative block size-full cursor-pointer"
    >
      {poster && (
        <Image
          src={poster.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      )}
      <span aria-hidden className="absolute inset-0 bg-primary/30 transition-base group-hover/play:bg-primary/45" />
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-badge bg-surface/90 text-primary transition-premium group-hover/play:scale-110 motion-reduce:group-hover/play:scale-100"
      >
        <Icon icon={Play} size="lg" className="ml-0.5" />
      </span>
    </button>
  );
}
