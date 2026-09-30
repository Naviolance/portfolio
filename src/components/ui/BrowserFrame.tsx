import { cx } from "@/lib/cx";

const BAR = {
  md: { bar: "h-7 px-3", dot: "size-2", host: "ml-2.5 text-[11px]" },
  // Small frames (Services' 300px screenshots).
  sm: { bar: "h-6 px-2.5", dot: "size-1.5", host: "ml-2 text-[10px]" },
} as const;

// The fake browser bar: three dots and the site's address. Built from
// spans so it can also sit inside a link (the homepage deck cards).
export function BrowserBar({ host, size = "md" }: { host?: string; size?: keyof typeof BAR }) {
  const s = BAR[size];
  return (
    <span className={cx("flex items-center gap-1.5 border-b border-line", s.bar)}>
      <span className={cx("rounded-full bg-line", s.dot)} />
      <span className={cx("rounded-full bg-line", s.dot)} />
      <span className={cx("rounded-full bg-line", s.dot)} />
      {host && <span className={cx("truncate font-mono text-ink-soft", s.host)}>{host}</span>}
    </span>
  );
}

// A screenshot in a browser window: the frame used for every project and
// service screenshot on the site.
export function BrowserFrame({
  host,
  size = "md",
  className,
  children,
}: {
  host?: string;
  size?: keyof typeof BAR;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "border border-line bg-panel",
        size === "md" ? "shadow-[0_30px_60px_var(--shade)]" : "shadow-[0_24px_50px_var(--shade)]",
        className
      )}
    >
      <BrowserBar host={host} size={size} />
      {children}
    </div>
  );
}
