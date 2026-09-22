export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center border border-dashed border-line bg-panel px-4 text-center">
      <span className="font-mono text-xs text-ink-soft">
        [SCREENSHOT: {label}]
      </span>
    </div>
  );
}
