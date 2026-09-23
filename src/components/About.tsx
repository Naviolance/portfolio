import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div data-reveal className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <h2 className="font-display text-2xl font-bold text-ink">{t("heading")}</h2>
          <div className="max-w-2xl space-y-5 text-ink-soft">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
