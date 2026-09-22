"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { ScreenshotSlot } from "@/data/projects";

// Every screenshot is a 1920×1080 desktop capture, so the 16:9 thumbnails
// never crop anything.
const SHOT_WIDTH = 1920;
const SHOT_HEIGHT = 1080;

// Widths must be in Next's default deviceSizes, or /_next/image rejects them.
const LIGHTBOX_WIDTHS = [640, 1080, 1920];

// Route the lightbox through Next's image optimizer so a phone downloads a
// ~640px WebP instead of the 1.7MB PNG, and only fetches the full size when
// the viewer zooms in.
function toSlide(shot: ScreenshotSlot, projectTitle: string): SlideImage {
  return {
    src: shot.src,
    alt: `${projectTitle}: ${shot.label}`,
    width: SHOT_WIDTH,
    height: SHOT_HEIGHT,
    srcSet: LIGHTBOX_WIDTHS.map((width) => ({
      src: `/_next/image?url=${encodeURIComponent(shot.src)}&w=${width}&q=75`,
      width,
      height: Math.round((width * SHOT_HEIGHT) / SHOT_WIDTH),
    })),
  };
}

type Props = {
  projectTitle: string;
  screenshots: ScreenshotSlot[];
  // "cover" shows only the first shot (project cards); "grid" shows them all.
  variant: "cover" | "grid";
  sizes: string;
};

export function ScreenshotGallery({ projectTitle, screenshots, variant, sizes }: Props) {
  const [index, setIndex] = useState(-1);
  const slides = screenshots.map((shot) => toSlide(shot, projectTitle));
  const visible = variant === "cover" ? screenshots.slice(0, 1) : screenshots;

  return (
    <>
      <div className={variant === "grid" ? "grid gap-4 sm:grid-cols-2" : "w-full"}>
        {visible.map((shot, i) => (
          <figure
            key={shot.key}
            className={variant === "grid" ? "border border-line" : undefined}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${shot.label} full size${
                variant === "cover" ? ` (${screenshots.length} screenshots)` : ""
              }`}
              className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden bg-panel"
            >
              <Image
                src={shot.src}
                alt={`${projectTitle}: ${shot.label}`}
                fill
                sizes={sizes}
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-2 right-2 bg-ink/80 px-2 py-1 font-mono text-[11px] text-paper opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                {variant === "cover" ? `See all ${screenshots.length} screenshots` : "View"}
              </span>
            </button>
            {variant === "grid" && (
              <figcaption className="border-t border-line px-3 py-2 font-mono text-xs text-ink-soft">
                {shot.label}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        on={{ view: ({ index: current }) => setIndex(current) }}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        animation={{ fade: 280, swipe: 320 }}
        className="portfolio-lightbox"
        render={{
          controls: () =>
            index >= 0 && (
              <>
                {/* Persistent, small: which screen you're on, announced on swipe. */}
                <p
                  aria-live="polite"
                  className="absolute left-4 top-4 max-w-[60vw] truncate bg-ink/85 px-3 py-1.5 font-mono text-xs text-paper"
                >
                  {index + 1} / {screenshots.length} · {screenshots[index].label}
                </p>
                {/* Big, centred, temporary: re-keyed per slide so the
                    animation restarts on every swipe, then fades away. */}
                <div
                  key={index}
                  aria-hidden="true"
                  className="lightbox-title-flash pointer-events-none absolute inset-0 flex items-center justify-center p-6"
                >
                  <div className="max-w-md bg-ink/90 px-6 py-4 text-center shadow-2xl backdrop-blur-sm">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-paper/70">
                      {projectTitle}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-paper sm:text-2xl">
                      {screenshots[index].label}
                    </p>
                  </div>
                </div>
              </>
            ),
        }}
      />
    </>
  );
}
