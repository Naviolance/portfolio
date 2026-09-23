"use client";

import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ScreenshotSlot } from "@/data/projects";

// Widths must be in Next's default deviceSizes, or /_next/image rejects them.
const LIGHTBOX_WIDTHS = [640, 1080, 1920];

// Route the lightbox through Next's image optimizer so a phone downloads a
// ~640px WebP instead of the 1.7MB PNG, and only fetches the full size when
// the viewer zooms in. `src` is the optimized full-width copy too, so the
// original PNG is never sent to a visitor.
function toSlide(shot: ScreenshotSlot, projectTitle: string, locale: Locale): SlideImage {
  const { src, width, height } = shot.src;
  const optimized = (w: number) =>
    `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  const widths = LIGHTBOX_WIDTHS.filter((w) => w <= width);
  return {
    src: optimized(widths[widths.length - 1]),
    alt: `${projectTitle}: ${shot.label[locale]}`,
    width,
    height,
    srcSet: widths.map((w) => ({
      src: optimized(w),
      width: w,
      height: Math.round((w * height) / width),
    })),
  };
}

type Props = {
  projectTitle: string;
  screenshots: ScreenshotSlot[];
  index: number;
  onIndexChange: (index: number) => void;
};

// Loaded on demand by ScreenshotGallery, so this library (and its CSS) is
// only downloaded once someone actually opens a screenshot.
export default function ScreenshotLightbox({
  projectTitle,
  screenshots,
  index,
  onIndexChange,
}: Props) {
  const locale = useLocale() as Locale;
  const slides = screenshots.map((shot) => toSlide(shot, projectTitle, locale));

  return (
    <Lightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={() => onIndexChange(-1)}
      slides={slides}
      on={{ view: ({ index: current }) => onIndexChange(current) }}
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
                className="absolute left-4 top-4 max-w-[60vw] truncate bg-brand-navy/85 px-3 py-1.5 font-mono text-xs text-white"
              >
                {index + 1} / {screenshots.length} · {screenshots[index].label[locale]}
              </p>
              {/* Big, centred, temporary: re-keyed per slide so the
                  animation restarts on every swipe, then fades away. */}
              <div
                key={index}
                aria-hidden="true"
                className="lightbox-title-flash pointer-events-none absolute inset-0 flex items-center justify-center p-6"
              >
                <div className="max-w-md border border-brand-cyan/30 bg-brand-navy/90 px-6 py-4 text-center shadow-2xl backdrop-blur-sm">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-brand-cyan">
                    {projectTitle}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {screenshots[index].label[locale]}
                  </p>
                </div>
              </div>
            </>
          ),
      }}
    />
  );
}
