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
};

// Mosaic of screens: the first one large, the rest as tiles. Every tile
// opens the full-size lightbox. Tiles are cropped from the top, where the
// important part of a screen is; the lightbox shows the whole screenshot.
export function ScreenshotGallery({ projectTitle, screenshots }: Props) {
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
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {screenshots.map((shot, i) => (
          <li key={shot.key} className={i === 0 ? "col-span-2 sm:row-span-2" : undefined}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={t("viewFullSize", { label: shot.label[locale] })}
              className="group relative block h-full min-h-full w-full cursor-zoom-in overflow-hidden border border-line bg-panel"
            >
              <span className={`relative block w-full ${i === 0 ? "aspect-[16/10] sm:h-full sm:aspect-auto" : "aspect-[16/10]"}`}>
                <Image
                  src={shot.src}
                  alt={shot.alt[locale]}
                  placeholder="blur"
                  sizes={i === 0 ? "(min-width: 1024px) 520px, 100vw" : "(min-width: 1024px) 260px, 50vw"}
                  className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2.5 pt-6 pb-2 text-left font-mono text-[11px] text-white">
                {shot.label[locale]}
              </span>
            </button>
          </li>
        ))}
      </ul>

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
