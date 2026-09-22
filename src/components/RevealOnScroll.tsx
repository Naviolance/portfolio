"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Zoom-in reveal for anything marked `data-reveal`: it starts slightly
// smaller and transparent, then eases to full size the first time it
// scrolls into view (see globals.css).
//
// Content is only hidden once this script has run (the `reveal-ready`
// class), so without JS, and for crawlers, everything is simply visible.
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
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
    document.documentElement.classList.add("reveal-ready");

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
