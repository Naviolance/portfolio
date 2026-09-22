import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div data-reveal className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <h2 className="font-display text-2xl font-bold text-ink">Services</h2>
          <div className="max-w-2xl divide-y divide-line border-t border-line">
            {services.map((service) => (
              <div key={service.title} className="py-6 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <span className="font-mono text-[11px] text-label">
                    {service.evidence}
                  </span>
                </div>
                <p className="mt-2 text-ink-soft">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
