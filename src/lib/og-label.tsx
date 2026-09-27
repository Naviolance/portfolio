import type { ReactNode } from "react";
import { ogColors } from "./og";

// The "shipping label" share card, shared by the homepage and project cards.
// Drawn by next/og (Satori), which only does flexbox: every element with
// more than one child needs display: flex, and there is no CSS grid.

type Field = { label: string; value: string; width?: number };

type Props = {
  fields: [Field, Field, Field]; // top row: FROM / TO / SERVICE...
  contentsLabel: string;
  children: ReactNode; // the big CONTENTS block
  items: string[]; // ticked list along the bottom
  panel: ReactNode; // dark box on the right
  stamp: string;
  code: string; // number under the barcode
};

const INK = ogColors.navy;
const RULE = `6px solid ${INK}`;
// Bar widths for the (decorative) barcode; odd entries are the gaps.
const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 4, 1, 1, 2, 3, 1, 2];

// Fits ~26 characters at full size in the middle field.
const valueSize = (value: string) => (value.length > 32 ? 18 : value.length > 26 ? 22 : 27);

const small = { fontFamily: "Plex Mono", fontSize: 15, letterSpacing: 3, color: ogColors.soft };

export function ShippingLabel({ fields, contentsLabel, children, items, panel, stamp, code }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 34,
        background: INK,
        fontFamily: "Sora",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: ogColors.paper,
          color: INK,
          border: RULE,
        }}
      >
        <div style={{ display: "flex", height: 104, borderBottom: RULE }}>
          {fields.map((field, i) => (
            <div
              key={field.label}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 26px",
                borderLeft: i ? RULE : "none",
                ...(field.width ? { width: field.width } : { flex: 1 }),
              }}
            >
              <div style={small}>{field.label}</div>
              <div
                style={{
                  marginTop: 6,
                  // Long values (French categories) get smaller, never wrap.
                  fontSize: valueSize(field.value),
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {field.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: "flex" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "26px 32px 24px",
            }}
          >
            <div style={small}>{contentsLabel}</div>
            {children}
            <div style={{ display: "flex", gap: 24, fontFamily: "Plex Mono", fontSize: 21 }}>
              {items.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* An SVG tick: the mono font file has no ✓ glyph. */}
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M3 9.5l4 4 8-9" fill="none" stroke={ogColors.blue} strokeWidth="2.6" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 318, display: "flex", flexDirection: "column", borderLeft: RULE }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: INK,
                color: ogColors.cyan,
              }}
            >
              {panel}
            </div>
            <div style={{ display: "flex", justifyContent: "center", height: 100, padding: "16px 20px 6px" }}>
              {BARS.map((w, i) => (
                <div key={i} style={{ width: w * 2.6, background: i % 2 ? "transparent" : INK }} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 10,
                fontFamily: "Plex Mono",
                fontSize: 14,
                letterSpacing: 4,
              }}
            >
              {code}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 26,
            top: 392,
            display: "flex",
            padding: "6px 12px",
            border: `4px solid ${ogColors.blue}`,
            borderRadius: 6,
            background: "rgba(243, 241, 234, 0.92)",
            color: ogColors.blue,
            fontFamily: "Plex Mono",
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: 3,
            transform: "rotate(-8deg)",
          }}
        >
          {stamp}
        </div>
      </div>
    </div>
  );
}
