import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../MainVideo";

const PROBLEMS = [
  { icon: "💧", text: "Tubo che perde" },
  { icon: "🚽", text: "WC otturato" },
  { icon: "🔥", text: "Caldaia rotta" },
  { icon: "🚿", text: "Scarico bloccato" },
];

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1a1a2e 0%, ${COLORS.ink} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -40}px)`,
          fontSize: 84,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          marginBottom: 80,
          lineHeight: 1.1,
        }}
      >
        Qualunque sia il<br />
        <span style={{ color: COLORS.yellow }}>problema...</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
        {PROBLEMS.map((p, i) => {
          const delay = 15 + i * 12;
          const inAnim = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                opacity: inAnim,
                transform: `translateX(${(1 - inAnim) * -200}px)`,
                background: COLORS.white,
                borderRadius: 30,
                padding: "32px 40px",
                display: "flex",
                alignItems: "center",
                gap: 30,
                boxShadow: `0 8px 0 ${COLORS.greenDark}`,
                border: `4px solid ${COLORS.green}`,
              }}
            >
              <div style={{ fontSize: 80 }}>{p.icon}</div>
              <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.ink }}>{p.text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
