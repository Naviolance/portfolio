import { cx } from "@/lib/cx";

// The small uppercase mono label above titles and on rows ("CONTACT",
// "01 · FIT"). `as` picks the element; spacing comes from the caller.
export function Eyebrow({
  as: Tag = "p",
  className,
  children,
}: {
  as?: "p" | "span" | "h2" | "h3" | "dt";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cx("font-mono text-xs uppercase tracking-wider text-label", className)}>{children}</Tag>;
}
