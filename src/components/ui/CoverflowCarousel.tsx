"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  previewUrl?: string;
  appleMusicUrl?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 40,
  depth = 0.6,
  perspective = 3.2,
  falloff = 0.56,
  fade = 0.15,
  cardWidth = "clamp(180px, 20vw, 240px)",
  gap = 0.08,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = "3D Apple Music Cover Flow Jukebox",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    startX: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      const nextIndex = indexAt(target);
      setSelected(nextIndex);

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      startX: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  const handleCardClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    goTo(index);
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (audioRef.current) audioRef.current.pause();
    },
    [],
  );

  const active = slides[selected];

  const toggleAudio = React.useCallback(() => {
    if (!active?.previewUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(active.previewUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
    } else if (audioRef.current.src !== active.previewUrl) {
      audioRef.current.pause();
      audioRef.current = new Audio(active.previewUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback notice:", err);
          setIsPlaying(false);
        });
    }
  }, [active, isPlaying]);

  // Stop audio on slide change
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [selected]);

  return (
    <div
      className={cn("w-full select-none", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="3d coverflow jukebox"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-8 outline-none focus-visible:ring-1 focus-visible:ring-primary-container active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onClick={(e) => handleCardClick(index, e)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-square overflow-hidden rounded-md border border-outline-variant/30 bg-surface-container-lowest shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-shadow duration-300 will-change-transform cursor-pointer group",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80";
                  }}
                  className="h-full w-full select-none object-cover"
                />
                
                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-1 md:left-2 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-surface/90 p-2.5 text-primary-container border border-primary-container/40 shadow-[0_0_15px_rgba(0,255,65,0.2)] backdrop-blur transition-all duration-200 hover:bg-primary-container hover:text-on-primary hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-1 md:right-2 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-surface/90 p-2.5 text-primary-container border border-primary-container/40 shadow-[0_0_15px_rgba(0,255,65,0.2)] backdrop-blur transition-all duration-200 hover:bg-primary-container hover:text-on-primary hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && active && (
        <div
          key={selected}
          className="mt-6 flex flex-col items-center text-center px-6 duration-300 animate-in fade-in"
        >
          <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-on-background">
            {active.title}
          </h3>
          {active.subtitle && (
            <p className="font-label text-xs uppercase tracking-widest text-secondary mt-1">
              {active.subtitle}
            </p>
          )}

          {/* Audio Preview Controls & Apple Music Link */}
          <div className="flex items-center gap-4 mt-4 font-label text-xs">
            {active.previewUrl && (
              <button
                type="button"
                onClick={toggleAudio}
                className="bg-primary-container text-on-primary font-bold uppercase px-4 py-2 flex items-center gap-2 hover:bg-primary transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                <span>{isPlaying ? "PAUSE PREVIEW" : "LISTEN PREVIEW"}</span>
              </button>
            )}

            {active.appleMusicUrl && (
              <a
                href={active.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-border bg-surface-container-lowest text-on-surface-variant hover:text-primary-container px-4 py-2 flex items-center gap-1.5 uppercase tracking-widest transition-colors font-bold"
              >
                <span>APPLE MUSIC</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>

          {active.meta && active.meta.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-4 font-mono text-[11px] text-on-surface-variant border-t border-outline-variant/15 pt-3 w-full max-w-md">
              {active.meta.map((row) => (
                <div key={row.label} className="flex gap-1.5">
                  <span className="text-outline-variant uppercase">{row.label}:</span>
                  <span className="text-on-background font-bold uppercase">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 transition-all cursor-pointer rounded-full",
                index === selected
                  ? "w-6 bg-primary-container"
                  : "w-1.5 bg-outline-variant/40 hover:bg-outline-variant"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
