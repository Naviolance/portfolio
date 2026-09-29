"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { restorePlace } from "@/lib/lang-switch";

// Zoom-in reveal for anything marked `data-reveal`: it starts slightly
// smaller and transparent, then eases to full size the first time it
// scrolls into view (see globals.css).
//
// Content is only hidden once this script has run (the `reveal-ready`
// class), so without JS, and for crawlers, everything is simply visible.
export function RevealOnScroll() {
  const pathname = usePathname();

  // Layout effect: runs before the browser paints, so a page reached through
  // the language switch never shows a frame at the top or a hero animation.
  useLayoutEffect(() => {
    const root = document.documentElement;
    // Arrived through the EN/FR switch: go back to the section the reader
    // was on, and show what's on screen instantly instead of revealing it.
    const switched = restorePlace();
    if (switched) root.classList.add("reveal-instant");

    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
    );

    // Whatever is already on screen stays visible, so nothing flashes
    // out and back in on page load.
    for (const el of items) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-revealed");
      }
    }
    root.classList.add("reveal-ready");
    // Two frames: the instantly-revealed items have painted in their final
    // state, so turning transitions back on can't animate them.
    if (switched) {
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("reveal-instant")));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target); // play once
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    for (const el of items) {
      if (!el.classList.contains("is-revealed")) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]); // re-scan after client-side navigation

  return null;
}
