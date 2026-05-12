import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../MainVideo";

const STATS = [
  { icon: "✅", value: "Verificati", label: "Idraulici controllati" },
  { icon: "⚡", value: "10 min", label: "Tempo medio risposta" },
  { icon: "🏠", value: "Tutta Italia", label: "Copertura nazionale" },
  { icon: "💸", value: "Gratis", label: "Servizio per te" },
];

export const Scene4Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.blue} 0%, ${COLORS.blueDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -30}px)`,
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          marginBottom: 70,
          lineHeight: 1.1,
        }}
      >
        Perché<br />
        <span style={{ color: COLORS.yellow }}>fidarsi di noi</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, width: "100%" }}>
        {STATS.map((s, i) => {
          const delay = 20 + i * 10;
          const a = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                opacity: a,
                transform: `scale(${0.6 + a * 0.4})`,
                background: COLORS.white,
                borderRadius: 30,
                padding: "36px 24px",
                textAlign: "center",
                boxShadow: `0 8px 0 ${COLORS.blueDark}`,
                border: `4px solid ${COLORS.yellow}`,
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: COLORS.green, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.ink, marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
