import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS } from "../MainVideo";
import { Icon } from "../Icon";

const STATS = [
  { icon: "check", value: "Verificati", label: "Idraulici controllati", iconColor: COLORS.green },
  { icon: "bolt", value: "10 min", label: "Tempo medio risposta", iconColor: "#FFB300" },
  { icon: "home", value: "Tutta Italia", label: "Copertura nazionale", iconColor: COLORS.blue },
  { icon: "euro", value: "Gratis", label: "Servizio per te", iconColor: COLORS.greenDark },
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name={s.icon} size={80} color={s.iconColor} />
              <div style={{ fontSize: 44, fontWeight: 900, color: COLORS.green, lineHeight: 1, marginTop: 8 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.ink }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
