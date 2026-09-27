"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type ShowcaseItem = {
  slug: string;
  title: string;
  category: string;
  host: string; // live demo's domain, shown in the fake browser bar
  image: StaticImageData;
  alt: string;
};

type Props = { items: ShowcaseItem[] };

// The hero's project visual. The only part of the hero that needs
// JavaScript, so it is the only client component; the headline, buttons and
// checklist around it stay server-rendered HTML.
//
// Both layouts are rendered and CSS picks one (deck from lg up, strip
// below). Choosing in JS would need the screen size, which the server
// doesn't know, so the first paint would be wrong and then jump. Images
// inside the hidden layout are lazy, so they are never downloaded.
export function ProjectShowcase({ items }: Props) {
  return (
    <>
      <Deck items={items} />
      <Strip items={items} />
    </>
  );
}

// Calls onTick after `firstDelay`, then every `interval`, but only while
// `ref` is mostly on screen and the tab is visible. Never runs for people
// who ask their OS for reduced motion. Stops for good once `enabled` goes
// false (the visitor took control).
function useAutoAdvance(
  ref: RefObject<HTMLElement | null>,
  { enabled, firstDelay, interval, onTick }: {
    enabled: boolean;
    firstDelay: number;
    interval: number;
    onTick: () => void;
  }
) {
  // Keep the latest callback without restarting the timers on every render.
  const tick = useRef(onTick);
  useEffect(() => {
    tick.current = onTick;
  });

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        tick.current();
        schedule(interval);
      }, ms);
    };
    const update = () => {
      if (onScreen && !document.hidden) schedule(firstDelay);
      else clearTimeout(timer);
    };

    // A display:none element (the layout CSS hid) never intersects, so the
    // hidden layout's timer never runs.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref, enabled, firstDelay, interval]);
}

const pad = (n: number) => String(n).padStart(2, "0");

// ---------------------------------------------------------------------------
// Desktop: a stack of browser windows that reshuffles every few seconds.

const EXIT_MS = 420; // matches the .deck-slot-exit transition

function Deck({ items }: Props) {
  const t = useTranslations("hero");
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [auto, setAuto] = useState(true); // false once someone picks a tab
  // Paused while keyboard focus is inside, so the card someone tabbed to
  // doesn't rotate away under them. Hover deliberately doesn't pause: it
  // made the motion stutter whenever the cursor crossed the deck.
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  // The front card drops away first, then every card moves up a slot.
  const go = (next: number) => {
    if (next === active || exiting !== null) return;
    setExiting(active);
    exitTimer.current = setTimeout(() => {
      setActive(next);
      setExiting(null);
    }, EXIT_MS);
  };

  useAutoAdvance(ref, {
    enabled: auto && !paused,
    firstDelay: 4200,
    interval: 4200,
    onTick: () => go((active + 1) % items.length),
  });

  return (
    <div
      ref={ref}
      role="region"
      aria-label={t("recent")}
      className="deck hidden lg:block"
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        // Focus moving between two things inside the deck isn't leaving it.
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {/* The cards are absolutely positioned, so this invisible copy of one
          card's shape gives the stack its height at any width. */}
      <div className="relative pt-16">
        <div aria-hidden className="invisible w-[calc(100%-64px)] border">
          <div className="h-7" />
          <div className="aspect-[2/1]" />
        </div>
        {items.map((item, i) => {
          const slot = (i - active + items.length) % items.length;
          const isFront = slot === 0 && exiting === null;
          return (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              // Only the front card is reachable by keyboard / screen readers;
              // the tabs below are how you get to the others.
              tabIndex={isFront ? undefined : -1}
              aria-hidden={isFront ? undefined : true}
              className={`deck-card ${i === exiting ? "deck-slot-exit" : `deck-slot-${slot}`} absolute left-0 top-16 block w-[calc(100%-64px)] border border-line bg-panel`}
            >
              <span className="flex h-7 items-center gap-1.5 border-b border-line px-3">
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <span className="ml-2.5 truncate font-mono text-[11px] text-ink-soft">{item.host}</span>
              </span>
              <span className="relative block aspect-[2/1]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="512px"
                  placeholder="blur"
                  className="object-cover object-top"
                />
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 grid w-[calc(100%-64px)] grid-cols-3 gap-5">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            aria-current={i === active ? "true" : undefined}
            onClick={() => {
              setAuto(false);
              go(i);
            }}
            className={`relative flex min-h-11 flex-col gap-0.5 border-t border-line pt-3 text-left transition-colors hover:text-ink ${i === active ? "text-ink" : "text-ink-soft"}`}
          >
            {/* Remounts (restarting from empty) whenever the timer restarts. */}
            {i === active && auto && !paused && (
              <span aria-hidden className="deck-progress absolute -top-px left-0 h-0.5 w-full bg-accent" />
            )}
            <span className="font-display text-[15px] font-semibold">{item.title}</span>
            <span className="font-mono text-[11px] text-ink-soft">{pad(i + 1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phone: a native swipe strip. The browser does the scrolling and snapping;
// JS only tracks which card is centred and, until the visitor touches it,
// advances it on its own.

function Strip({ items }: Props) {
  const t = useTranslations("hero");
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // false once the visitor interacts
  const [live, setLive] = useState(false); // has been on screen once
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Start the one-time "it swipes" nudge the first time the strip is seen,
  // not on page load (on a phone it starts below the fold).
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLive(true);
        observer.disconnect();
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (i: number) => {
    const strip = stripRef.current;
    const card = cardRefs.current[i];
    if (!strip || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: card.offsetLeft - (strip.clientWidth - card.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Whichever card's centre is closest to the strip's centre is "active".
  const onScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const centre = strip.scrollLeft + strip.clientWidth / 2;
    let nearest = 0;
    cardRefs.current.forEach((card, i) => {
      const best = cardRefs.current[nearest];
      if (!card || !best) return;
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
      const bestD = Math.abs(best.offsetLeft + best.offsetWidth / 2 - centre);
      if (d < bestD) nearest = i;
    });
    setActive(nearest);
  };

  useAutoAdvance(stripRef, {
    enabled: auto,
    firstDelay: 5000,
    interval: 4500,
    onTick: () => scrollToCard((active + 1) % items.length),
  });

  const stopAuto = () => setAuto(false);

  return (
    <div className="lg:hidden">
      <p className="font-mono text-xs uppercase tracking-wider text-label">{t("recent")}</p>
      <div
        ref={stripRef}
        onScroll={onScroll}
        // Any sign the visitor is driving: stop auto-advancing for good.
        onPointerDown={stopAuto}
        onWheel={stopAuto}
        onKeyDown={stopAuto}
        className={`strip relative -mx-5 overflow-x-auto pb-2 pt-4 ${live ? "is-live" : ""}`}
      >
        <div className="strip-row flex gap-3">
          {items.map((item, i) => (
            <Link
              key={item.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={`/projects/${item.slug}`}
              className="strip-card block border border-line bg-panel"
            >
              {/* Zoomed into the top-left of the desktop screenshot, where the
                  headline is, so it stays legible at phone size. */}
              <span className="relative block h-[210px] overflow-hidden border-b border-line">
                <Image
                  src={item.image}
                  alt={item.alt}
                  sizes="520px"
                  placeholder="blur"
                  draggable={false}
                  className="absolute left-0 top-0 h-auto w-[520px] max-w-none"
                />
              </span>
              <span className="flex flex-col gap-1 px-4 pb-4 pt-3.5">
                <span className="flex justify-between font-mono text-[11px] text-ink-soft">
                  {pad(i + 1)}
                  <span aria-hidden className="text-[15px] text-ink">↗</span>
                </span>
                <span className="font-display text-xl font-semibold text-ink">{item.title}</span>
                <span className="text-sm text-ink-soft">{item.category}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span aria-hidden className="font-mono text-xs text-ink-soft">
          {pad(active + 1)} / {pad(items.length)}
        </span>
        <div className="flex">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={t("showProject", { title: item.title })}
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                stopAuto();
                scrollToCard(i);
              }}
              className="flex size-11 items-center justify-center"
            >
              <span
                className={`block h-0.5 w-6 transition-colors duration-300 ${i === active ? "bg-accent" : "bg-line"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
