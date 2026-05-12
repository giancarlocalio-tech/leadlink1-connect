import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../MainVideo";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 12 } });
  const ctaIn = spring({ frame: frame - 30, fps, config: { damping: 10 } });
  const urlIn = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const pulse = 1 + Math.sin(frame * 0.18) * 0.04;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: logoIn,
          transform: `scale(${0.5 + logoIn * 0.5})`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1,
            textShadow: `0 6px 0 ${COLORS.greenDark}`,
            letterSpacing: -2,
          }}
        >
          IDRAULICI
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: COLORS.yellow,
            lineHeight: 1,
            textShadow: `0 6px 0 ${COLORS.greenDark}`,
            letterSpacing: -2,
            marginTop: 6,
          }}
        >
          SUBITO
        </div>
      </div>

      {/* WhatsApp CTA button */}
      <div
        style={{
          opacity: ctaIn,
          transform: `scale(${ctaIn * pulse})`,
          background: COLORS.whatsapp,
          padding: "36px 60px",
          borderRadius: 80,
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: `0 12px 40px rgba(0,0,0,0.4)`,
          marginBottom: 50,
        }}
      >
        <div style={{ fontSize: 64 }}>💬</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.white }}>
          Scrivici ORA
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlIn,
          transform: `translateY(${(1 - urlIn) * 30}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.white,
            opacity: 0.9,
            marginBottom: 8,
          }}
        >
          oppure visita
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.white,
            background: COLORS.ink,
            padding: "20px 36px",
            borderRadius: 20,
            border: `4px solid ${COLORS.yellow}`,
          }}
        >
          idraulicisubito.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
