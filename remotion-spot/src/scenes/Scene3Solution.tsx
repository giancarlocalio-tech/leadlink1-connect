import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS } from "../MainVideo";
import { Icon } from "../Icon";

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = spring({ frame, fps, config: { damping: 14 } });
  const phoneIn = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const bubble1 = spring({ frame: frame - 50, fps, config: { damping: 10 } });
  const bubble2 = spring({ frame: frame - 80, fps, config: { damping: 10 } });
  const bubble3 = spring({ frame: frame - 110, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.greenDark} 0%, ${COLORS.green} 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 60,
        paddingTop: 100,
      }}
    >
      <div
        style={{
          opacity: t1,
          transform: `translateY(${(1 - t1) * -30}px)`,
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.1,
          marginBottom: 50,
        }}
      >
        Scrivi su <span style={{ color: COLORS.yellow }}>WhatsApp</span><br />
        in 30 secondi
      </div>

      {/* Phone mockup */}
      <div
        style={{
          opacity: phoneIn,
          transform: `scale(${0.7 + phoneIn * 0.3})`,
          width: 600,
          height: 1000,
          background: COLORS.ink,
          borderRadius: 60,
          border: `10px solid #000`,
          padding: 30,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          boxShadow: `0 30px 80px rgba(0,0,0,0.5)`,
        }}
      >
        {/* WhatsApp header */}
        <div
          style={{
            background: COLORS.whatsapp,
            borderRadius: 20,
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: COLORS.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="drop" size={36} color={COLORS.blue} />
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.white }}>
              Idraulici Subito
            </div>
            <div style={{ fontSize: 22, color: COLORS.white, opacity: 0.9 }}>
              ● online
            </div>
          </div>
        </div>

        {/* Chat bubbles */}
        <div
          style={{
            opacity: bubble1,
            transform: `translateY(${(1 - bubble1) * 30}px)`,
            alignSelf: "flex-end",
            maxWidth: "85%",
            background: "#DCF8C6",
            borderRadius: "24px 24px 6px 24px",
            padding: "20px 26px",
            fontSize: 30,
            color: COLORS.ink,
            fontWeight: 600,
          }}
        >
          Ho una perdita sotto al lavandino...
        </div>
        <div
          style={{
            opacity: bubble2,
            transform: `translateY(${(1 - bubble2) * 30}px)`,
            alignSelf: "flex-start",
            maxWidth: "85%",
            background: COLORS.white,
            borderRadius: "24px 24px 24px 6px",
            padding: "20px 26px",
            fontSize: 30,
            color: COLORS.ink,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Icon name="check" size={32} color={COLORS.green} />
          Ti contattiamo subito un idraulico nella tua zona
        </div>
        <div
          style={{
            opacity: bubble3,
            transform: `translateY(${(1 - bubble3) * 30}px)`,
            alignSelf: "flex-start",
            maxWidth: "85%",
            background: COLORS.white,
            borderRadius: "24px 24px 24px 6px",
            padding: "20px 26px",
            fontSize: 30,
            color: COLORS.ink,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Icon name="phone" size={32} color={COLORS.green} />
          Mario, idraulico verificato — ti chiama in 10 min
        </div>
      </div>
    </AbsoluteFill>
  );
};
