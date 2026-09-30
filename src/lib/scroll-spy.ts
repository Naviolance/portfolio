import type { CSSProperties } from "react";

// "You are here" for an on-page index, in CSS only (scroll-driven
// animations, see .spy-link in globals.css). Each target section names a
// view timeline; its index link runs a colour animation on that timeline.
// view-timeline-inset shrinks the "view" to a line 30% down the screen, so
// only the section crossing that line lights its link: one at a time.
//
// Browsers without scroll-driven animations (Firefox, older Safari) ignore
// all of this: the index still works, just without the marker.
//
// Usage: spyScope(ids) on an element containing both the index and the
// sections (the index and sections live in different subtrees), spyTarget(id)
// on each section, and className="spy-link" + spyLink(id) on each link.

const name = (id: string) => `--spy-${id}`;

export const spyScope = (ids: readonly string[]): CSSProperties => ({
  timelineScope: ids.map(name).join(", "),
});

export const spyTarget = (id: string): CSSProperties => ({
  viewTimelineName: name(id),
  viewTimelineInset: "30% 69.9%",
});

export const spyLink = (id: string): CSSProperties => ({ animationTimeline: name(id) });
