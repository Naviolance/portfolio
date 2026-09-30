// Joins class names, skipping empty ones: cx("a", cond && "b", undefined).
// Callers must not pass two classes that set the same property (no
// tailwind-merge here), e.g. two different heights.
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
