import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { faq, FAQ_CATEGORIES, faqCategoryLabels } from "@/data/faq";
import { FaqBrowser } from "@/components/faq/FaqBrowser";
import { JsonLd } from "@/components/JsonLd";
import { languageAlternates } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

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
  const items = faq.map((item) => ({
    id: item.id,
    category: item.category,
    question: item.question[locale],
    answer: item.answer[locale],
    link: item.link && { href: item.link.href, label: item.link.label[locale] },
  }));
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
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.replace(/• /g, "") },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <JsonLd data={faqSchema} />
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{t("intro")}</p>

      <div className="mt-10">
        <FaqBrowser items={items} categories={categories} />
      </div>

      <div className="mt-14 border border-line bg-panel p-6">
        <p className="font-display text-lg font-bold text-ink">{t("stillQuestion")}</p>
        <p className="mt-1 text-ink-soft">{t("stillQuestionHint")}</p>
        <a
          href={whatsappLink(t("askGeneralMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          {t("askWhatsapp")}
        </a>
      </div>
    </div>
  );
}
