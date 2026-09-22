export function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <h2 className="font-display text-2xl font-bold text-ink">About</h2>
          <div className="max-w-2xl space-y-5 text-ink-soft">
            <p>
              I&apos;m a full-stack developer. I build software that businesses
              use every day: online stores that take real payments, booking
              systems that don&apos;t double-book, and admin panels that are
              easy for the owner to use.
            </p>
            <p>
              I work with Next.js and TypeScript on the frontend, Node.js
              (NestJS) on the backend, and PostgreSQL when the data has to stay
              correct, like orders, stock and bookings. I also build and
              maintain WordPress sites when that&apos;s the better choice. Not
              every project needs custom code.
            </p>
            <p>
              For me, a project isn&apos;t done just because it looks
              finished. It has to work properly. Payments get checked, not
              just trusted. Checkout can&apos;t sell stock that isn&apos;t
              there. And the admin tools work on a phone, because that&apos;s
              where a lot of business owners use them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
