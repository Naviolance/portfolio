import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { withFrenchSpacing } from "@/lib/typography";

// Runs for every server render: works out the language and loads the
// matching interface text from messages/<locale>.json. Pages get it from the
// [locale] URL segment (via next/root-params, built into Next 16.3); the
// global 404, which has no [locale] segment, sets it with setRequestLocale
// (requestLocale).
export default getRequestConfig(async ({ locale, requestLocale }) => {
  if (!locale) {
    const paramValue = (await rootParams.locale()) ?? (await requestLocale);
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  return {
    locale,
    // Non-breaking space before French : ; ? ! % (lib/typography.ts).
    messages: locale === "fr" ? withFrenchSpacing(messages, true) : messages,
  };
});
