import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { faq, FAQ_CATEGORIES, faqCategoryLabels } from "@/data/faq";
import { FaqBrowser } from "@/components/faq/FaqBrowser";
import { JsonLd } from "@/components/JsonLd";
import { languageAlternates } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { updated } from "@/data/dates";
import { formatDate } from "@/lib/format";
import { localizeFaq } from "@/components/faq/FaqItem";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";

export async function generateMetadata(props: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = (await props.params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: languageAlternates(locale, "/faq"),
    openGraph: { title: t("title"), description: t("metaDescription"), url: `/${locale}/faq` },
  };
}

export default async function FaqPage(props: PageProps<"/[locale]/faq">) {
  const { locale } = (await props.params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  // Only this language's text goes to the browser.
  const items = faq.map((entry) => localizeFaq(entry, locale));
  const categories = FAQ_CATEGORIES.filter((c) => faq.some((i) => i.category === c)).map((c) => ({
    id: c,
    label: faqCategoryLabels[c][locale],
  }));

  // Valid FAQ markup. Google only shows FAQ rich results for a few
  // authoritative sites now, but other search engines and AI assistants
  // still read it, and it costs nothing.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    dateModified: updated.faq,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.replace(/• /g, "") },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <JsonLd data={faqSchema} />
      <FaqBrowser
        items={items}
        categories={categories}
        header={
          <>
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.08]">
              {t("heading")}
            </h1>
            <p className="mt-4 text-ink-soft">{t("intro")}</p>
          </>
        }
        ask={
          <div className="mt-8 border border-line bg-panel p-5">
            <p className="font-semibold text-ink">{t("stillQuestion")}</p>
            <p className="mt-1 text-sm text-ink-soft">{t("stillQuestionHint")}</p>
            <a
              href={whatsappLink(t("askGeneralMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ size: "sm", className: "mt-4" })}
            >
              {t("askWhatsapp")} ↗
            </a>
            {/* A visible date: readers and AI answer tools both favour
                answers that say when they were last checked. */}
            <p className="mt-4 font-mono text-xs text-label">
              {t("updated", { date: formatDate(updated.faq, locale) })}
            </p>
          </div>
        }
      />
    </div>
  );
}
