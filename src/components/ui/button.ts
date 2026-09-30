import { cx } from "@/lib/cx";

// Button styles as a class string, so they work on any element: next-intl
// <Link>, an external <a>, or a <button>. `group` lets an arrow inside move
// on hover (group-hover:translate-x-1).
const VARIANTS = {
  primary: "border-accent bg-accent text-paper hover:border-accent-ink hover:bg-accent-ink",
  // Next to a primary button (hero "Let's work together").
  outline: "border-ink text-ink hover:border-accent hover:text-accent-ink",
  // Quieter actions (GitHub, CV, "See all questions").
  secondary: "border-line text-ink hover:border-accent hover:text-accent-ink",
} as const;

const SIZES = {
  // min-h + py rather than a fixed h: long French labels can wrap to two
  // lines and the button grows instead of cropping them. One line is
  // exactly 48px: 11px + 24px line + 11px + 2px border.
  md: "min-h-12 gap-2.5 px-5 py-[11px] text-[15px] leading-6",
  sm: "h-11 gap-2 px-4 text-sm",
  // Matches the 40px language switch in the nav bar.
  xs: "h-10 gap-2 px-4 text-sm",
} as const;

export function buttonClass({
  variant = "primary",
  size = "md",
  display = "inline-flex",
  className,
}: {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  // Replaces inline-flex (never add a second display class via className):
  // e.g. "hidden lg:inline-flex" for a button shown from desktop up.
  display?: string;
  className?: string;
} = {}) {
  return cx(
    display,
    "group items-center justify-center border text-center font-medium transition-colors",
    VARIANTS[variant],
    SIZES[size],
    className
  );
}
