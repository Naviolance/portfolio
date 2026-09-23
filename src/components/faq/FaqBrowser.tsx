"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/whatsapp";
import { FaqItem, type FaqItemData } from "./FaqItem";

type Props = {
  items: FaqItemData[];
  categories: { id: string; label: string }[];
};

// Lowercase and drop accents, so "cout" finds "coût" and "delai" finds
// "délai" (people often skip accents when typing on a phone).
function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function FaqBrowser({ items, categories }: Props) {
  const t = useTranslations("faq");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
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
      if (category && item.category !== category) return false;
      const haystack = normalize(`${item.question} ${item.answer}`);
      return words.every((word) => haystack.includes(word));
    });
  }, [items, query, category]);

  const counts = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, items.filter((i) => i.category === c.id).length])),
    [items, categories]
  );

  const chip = (active: boolean) =>
    `whitespace-nowrap border px-3 py-1.5 text-sm transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink hover:text-ink"
    }`;

  return (
    <div>
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

      <div role="group" aria-label={t("filterLabel")} className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button type="button" aria-pressed={category === null} onClick={() => setCategory(null)} className={chip(category === null)}>
          {t("all")} <span className="opacity-60">{items.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => setCategory(category === c.id ? null : c.id)}
            className={chip(category === c.id)}
          >
            {c.label} <span className="opacity-60">{counts[c.id]}</span>
          </button>
        ))}
      </div>

      {/* Announced to screen readers as the list changes. */}
      <p aria-live="polite" className="mt-6 font-mono text-xs text-label">
        {t("resultCount", { count: visible.length })}
      </p>

      {visible.length > 0 ? (
        <div className="mt-2 border-t border-line">
          {visible.map((item) => (
            <FaqItem key={item.id} item={item} open={item.id === hashId || undefined} />
          ))}
        </div>
      ) : (
        <div className="mt-4 border border-line bg-panel p-6">
          <p className="font-semibold text-ink">{t("noResults")}</p>
          <p className="mt-1 text-ink-soft">{t("noResultsHint")}</p>
          <a
            href={whatsappLink(t("askMessage", { question: query.trim() || "…" }))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent hover:text-paper"
          >
            {t("askWhatsapp")}
          </a>
        </div>
      )}
    </div>
  );
}
