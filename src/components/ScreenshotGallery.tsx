"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ScreenshotSlot } from "@/data/projects";

// The lightbox library only matters once someone clicks a screenshot, so it's
// split into its own chunk and fetched on first open instead of with the page.
const ScreenshotLightbox = dynamic(() => import("./ScreenshotLightbox"), {
  ssr: false,
});

type Props = {
  projectTitle: string;
  screenshots: ScreenshotSlot[];
  sizes: string;
};

export function ScreenshotGallery({ projectTitle, screenshots, sizes }: Props) {
  const t = useTranslations("gallery");
  const locale = useLocale() as Locale;
  const [index, setIndex] = useState(-1);
  // Stays true after the first open so the chunk isn't unmounted/refetched.
  const [loaded, setLoaded] = useState(false);

  const open = (i: number) => {
    setLoaded(true);
    setIndex(i);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map((shot, i) => (
          <figure key={shot.key} className="border border-line">
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={t("viewFullSize", { label: shot.label[locale] })}
              // Box takes the screenshot's own shape, so nothing gets cropped.
              style={{ aspectRatio: `${shot.src.width} / ${shot.src.height}` }}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-panel"
            >
              <Image
                src={shot.src}
                alt={`${projectTitle}: ${shot.label[locale]}`}
                placeholder="blur"
                fill
                sizes={sizes}
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-2 right-2 bg-brand-navy/85 px-2 py-1 font-mono text-[11px] text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                {t("view")}
              </span>
            </button>
            <figcaption className="border-t border-line px-3 py-2 font-mono text-xs text-ink-soft">
              {shot.label[locale]}
            </figcaption>
          </figure>
        ))}
      </div>

      {loaded && (
        <ScreenshotLightbox
          projectTitle={projectTitle}
          screenshots={screenshots}
          index={index}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
