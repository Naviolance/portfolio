"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/whatsapp";
import { spyLink, spyScope, spyTarget } from "@/lib/scroll-spy";
import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pad2 } from "@/lib/format";
import { FaqPreview, type FaqItemData } from "./FaqItem";
import { CopyLink } from "./CopyLink";

type Props = {
  items: FaqItemData[];
  categories: { id: string; label: string }[];
  // Server-rendered parts: the page heading, and the "ask me" card.
  header: ReactNode;
  ask: ReactNode;
};

// Lowercase and drop accents, so "cout" finds "coût" and "delai" finds
// "délai" (people often skip accents when typing on a phone).
function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

// The FAQ page: topics index + search on the side, questions grouped by
// topic as answer previews. The whole list is in the server HTML; search
// only hides what doesn't match.
export function FaqBrowser({ items, categories, header, ask }: Props) {
  const t = useTranslations("faq");
  const [query, setQuery] = useState("");
  // Opened from a shared link like /fr/faq#timeline.
  const [hashId, setHashId] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setHashId(decodeURIComponent(window.location.hash.slice(1)) || null);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  useEffect(() => {
    if (hashId) document.getElementById(hashId)?.scrollIntoView({ block: "start" });
  }, [hashId]);

  // Filters as you type: every word must appear in the question or answer.
  const visible = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      const haystack = normalize(`${item.question} ${item.answer}`);
      return words.every((word) => haystack.includes(word));
    });
  }, [items, query]);

  const labels = { answer: t("answer"), details: t("details") };

  return (
    <div
      style={spyScope(categories.map((c) => c.id))}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14"
    >
      <aside>
        {header}
        <div className="mt-8 lg:sticky lg:top-24">
          <label htmlFor="faq-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            autoComplete="off"
            className="w-full border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
          />

          {/* A row of jump links on phones, a list with a marker on desktop. */}
          <nav aria-label={t("topics")} className="mt-6">
            <Eyebrow className="hidden lg:block">{t("topics")}</Eyebrow>
            <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:mt-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    style={spyLink(c.id)}
                    className="spy-link flex items-center justify-between gap-3 whitespace-nowrap border border-line px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-accent-ink lg:border-0 lg:border-l-2 lg:py-2"
                  >
                    {c.label}
                    <span className="font-mono text-xs text-label">
                      {items.filter((i) => i.category === c.id).length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">{ask}</div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Announced to screen readers as the list changes. */}
        <p aria-live="polite" className={query ? "mb-4 font-mono text-xs text-label" : "sr-only"}>
          {t("resultCount", { count: visible.length })}
        </p>

        {categories.map((c, i) => {
          const inTopic = visible.filter((item) => item.category === c.id);
          if (inTopic.length === 0) return null;
          return (
            <section
              key={c.id}
              id={c.id}
              style={spyTarget(c.id)}
              className="scroll-mt-24 pb-10 last:pb-0"
            >
              <Eyebrow as="h2" className="mb-3">
                {pad2(i + 1)} · {c.label}
              </Eyebrow>
              {inTopic.map((item) => (
                <FaqPreview
                  key={item.id}
                  item={item}
                  anchorId={item.id}
                  labels={labels}
                  open={item.id === hashId || undefined}
                  action={<CopyLink id={item.id} label={t("copyLink")} copiedLabel={t("copied")} />}
                />
              ))}
            </section>
          );
        })}

        {visible.length === 0 && (
          <div className="border border-line bg-panel p-6">
            <p className="font-semibold text-ink">{t("noResults")}</p>
            <p className="mt-1 text-ink-soft">{t("noResultsHint")}</p>
            <a
              href={whatsappLink(t("askMessage", { question: query.trim() || "…" }))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ variant: "outline", size: "sm", className: "mt-4" })}
            >
              {t("askWhatsapp")} ↗
            </a>
          </div>
        )}

        <div className="lg:hidden">{ask}</div>
      </div>
    </div>
  );
}
