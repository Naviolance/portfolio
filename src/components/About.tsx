import Image from "next/image";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import photo from "@/assets/photo/priestly.webp";

const FACTS = ["since", "cases", "langs", "place"] as const;

// "Facts first": one sentence on who, a short paragraph, a photo, then four
// short facts. Short, true, specific statements are what visitors skim and
// what AI answer tools quote. Every fact must stay true: "cases" counts the
// projects in data/projects.ts.
export function About() {
  const t = useTranslations("about");

  return (
    <section id="about">
      <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 sm:pt-24 sm:pb-12">
        <div
          data-reveal
          className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-label">{t("heading")}</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.08]">
              {t("statement")}
            </h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{t("intro")}</p>
          </div>
          {/* First on phones, so the face comes before the text. */}
          <figure className="order-first w-40 border border-line bg-panel sm:w-48 lg:order-none lg:w-full">
            <Image
              src={photo}
              alt={t("photoAlt")}
              sizes="(min-width: 1024px) 240px, 192px"
              placeholder="blur"
              className="aspect-[6/7] h-auto w-full object-cover"
            />
          </figure>
        </div>

        {/* gap-px over a line-coloured background draws the hairlines between
            cells, whatever the number of columns. */}
        <ul data-reveal className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {FACTS.map((fact) => (
            <li key={fact} className="bg-paper p-5 sm:p-6">
              <p className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {t(`facts.${fact}.value`, { count: projects.length })}
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-soft">{t(`facts.${fact}.label`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
