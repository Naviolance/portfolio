import { cx } from "@/lib/cx";

const SIZES = {
  // Homepage sections (Services, Pricing, Contact, About…).
  lg: "text-3xl sm:text-[2.75rem] sm:leading-[1.05]",
  // Beside a column of content (FAQ teaser).
  md: "text-3xl sm:text-[2.5rem] sm:leading-[1.08]",
} as const;

// A section's big <h2>. `className` is for spacing and width only (mt-3,
// max-w-3xl): the size and style live here, so every section matches.
export function SectionTitle({
  size = "lg",
  className,
  children,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className={cx("font-display font-bold tracking-tight text-ink", SIZES[size], className)}>{children}</h2>
  );
}
