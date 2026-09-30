"use client";

import { useState } from "react";

// "#" beside a question: copies the link to that question, ready to paste
// into a WhatsApp reply. It's a real #link, so without JavaScript (or if
// the clipboard is blocked) it still jumps there and puts it in the URL.
export function CopyLink({ id, label, copiedLabel }: { id: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}#${id}`);
      history.replaceState(null, "", `#${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      location.hash = id;
    }
  }

  return (
    <a
      href={`#${id}`}
      onClick={copy}
      aria-label={label}
      title={label}
      className="grid size-10 shrink-0 place-items-center border border-line font-mono text-sm text-label transition-colors hover:border-accent hover:text-accent-ink"
    >
      <span aria-hidden>{copied ? "✓" : "#"}</span>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </a>
  );
}
