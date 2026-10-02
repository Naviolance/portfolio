"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ScreenshotSlot } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

// Same lazy chunk as ScreenshotGallery: fetched on first open only.
const ScreenshotLightbox = dynamic(() => import("./ScreenshotLightbox"), {
  ssr: false,
});

type Props = {
  projectTitle: string;
  host: string;
  screenshots: ScreenshotSlot[]; // all of them, for the lightbox
  showcase: string[]; // keys of the ones featured here
};

// A browser window showing one featured screen, thumbnails to switch
// between them (crossfade), and a click-through to the full-size lightbox.
export function ProjectScreens({ projectTitle, host, screenshots, showcase }: Props) {
  const t = useTranslations("work");
  const g = useTranslations("gallery");
  const locale = useLocale() as Locale;
  const shots = showcase
    .map((key) => screenshots.find((s) => s.key === key))
    .filter((s): s is ScreenshotSlot => Boolean(s));

  const [current, setCurrent] = useState(0);
  // Big versions are only mounted once wanted (hover or click), so a visitor
  // who never touches the thumbnails downloads one large image, not four.
  const [mounted, setMounted] = useState<number[]>([0]);
  const [lightbox, setLightbox] = useState(-1);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const warm = (k: number) => setMounted((m) => (m.includes(k) ? m : [...m, k]));
  const show = (k: number) => {
    warm(k);
    // Wait a frame so a newly mounted image starts transparent and fades in.
    requestAnimationFrame(() => requestAnimationFrame(() => setCurrent(k)));
  };
  const openLightbox = () => {
    setLightboxLoaded(true);
    setLightbox(screenshots.indexOf(shots[current]));
  };

  const label = (s: ScreenshotSlot) => s.label[locale];

  return (
    <div>
      <BrowserFrame host={host}>
        <button
          type="button"
          onClick={openLightbox}
          aria-label={g("viewFullSize", { label: label(shots[current]) })}
          className="group relative block aspect-[2/1] w-full cursor-zoom-in overflow-hidden"
        >
          {shots.map((shot, k) =>
            mounted.includes(k) ? (
              <Image
                key={shot.key}
                src={shot.src}
                alt={shot.alt[locale]}
                sizes="(min-width: 1024px) 540px, 100vw"
                placeholder="blur"
                className={`absolute inset-0 h-full w-full screen-shot object-cover object-top ${k === current ? "is-on" : ""}`}
              />
            ) : null
          )}
          <span className="absolute bottom-2 right-2 bg-brand-navy/85 px-2 py-1 font-mono text-[11px] text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            {g("seeAll", { count: screenshots.length })}
          </span>
        </button>
      </BrowserFrame>

      <div className="mt-3 grid grid-cols-4 gap-2.5">
        {shots.map((shot, k) => (
          <button
            key={shot.key}
            type="button"
            aria-label={t("showScreen", { label: label(shot) })}
            aria-pressed={k === current}
            onPointerEnter={() => warm(k)}
            onFocus={() => warm(k)}
            onClick={() => show(k)}
            className={`relative h-11 overflow-hidden border bg-panel transition-[opacity,border-color,translate] duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:h-auto sm:aspect-[2/1] ${k === current ? "border-accent opacity-100" : "border-line opacity-55"}`}
          >
            <Image src={shot.src} alt="" sizes="140px" className="absolute inset-0 h-full w-full object-cover object-top" />
          </button>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-soft" aria-live="polite">
        {current + 1} / {shots.length} · {label(shots[current])}
      </p>

      {lightboxLoaded && (
        <ScreenshotLightbox
          projectTitle={projectTitle}
          screenshots={screenshots}
          index={lightbox}
          onIndexChange={setLightbox}
        />
      )}
    </div>
  );
}
