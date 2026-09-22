export function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <h2 className="font-display text-2xl font-bold text-ink">About</h2>
          <div className="max-w-2xl space-y-5 text-ink-soft">
            <p>
              I&apos;m a full-stack developer who builds the kind of software a
              real business runs on: storefronts that take real payments,
              booking systems that can&apos;t double-sell the same day, and
              admin panels the people running the business actually use.
            </p>
            <p>
              My stack is Next.js and TypeScript on the frontend, Node
              (NestJS) on the backend, and PostgreSQL for anything that has to
              stay correct under concurrency — orders, stock, bookings. I also
              build and maintain WordPress sites where that&apos;s the right
              tool for the job, rather than reaching for a custom build every
              time.
            </p>
            <p>
              I care less about a project looking finished and more about it
              being right: payments that verify themselves instead of
              trusting a webhook blindly, checkout that can&apos;t oversell
              stock, and admin tools that are actually usable from a phone —
              because in practice, they often are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
