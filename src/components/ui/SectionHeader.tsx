import { Eyebrow } from "./Eyebrow";
import { SectionTitle } from "./SectionTitle";

// Eyebrow + title on the left, a short intro on the right from desktop up
// (stacked on phones): the header of Featured work, Services and Pricing.
export function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  intro: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle className="mt-3">{title}</SectionTitle>
      </div>
      <p className="max-w-sm text-ink-soft">{intro}</p>
    </div>
  );
}
