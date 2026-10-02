import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { fontVariables } from "@/lib/fonts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";

// Message namespaces used by "use client" components. A client component
// using another namespace would show raw keys: add it here (the e2e tests
// catch that on the pages they visit).
const CLIENT_NAMESPACES = ["nav", "whatsapp", "hero", "work", "gallery", "faq"] as const;

// The page frame around every page: <html>, fonts, nav, footer, WhatsApp
// button, analytics. Used by [locale]/layout.tsx and by the global 404
// (app/global-not-found.tsx), so a 404 looks and works like the rest of the
// site. The caller must have called setRequestLocale(locale).
export async function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  // Only the text that client components use (see CLIENT_NAMESPACES), not
  // the whole site's: server components read their text on the server.
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));

  // slug → title, for the WhatsApp buttons' "I saw your <project>" message.
  const projectTitles = Object.fromEntries(projects.map((p) => [p.slug, p.title]));

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Hands this language's interface text to the client components. */}
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <Nav projectTitles={projectTitles} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton projectTitles={projectTitles} />
          <RevealOnScroll />
        </NextIntlClientProvider>
        <SiteAnalytics />
      </body>
    </html>
  );
}
