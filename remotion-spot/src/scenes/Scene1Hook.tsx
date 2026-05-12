import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../MainVideo";
import { Icon } from "../Icon";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropY = interpolate(frame, [0, 50], [-300, 900], { extrapolateRight: "clamp" });
  const splash = spring({ frame: frame - 48, fps, config: { damping: 8 } });
  const titleIn = spring({ frame: frame - 55, fps, config: { damping: 14 } });
  const subIn = spring({ frame: frame - 70, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.blueDark} 0%, ${COLORS.blue} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Falling water drop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `translate(-50%, ${dropY}px) scale(${1 + splash * 0.3})`,
          width: 80,
          height: 110,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: `radial-gradient(circle at 35% 30%, #fff, ${COLORS.white}aa 40%, ${COLORS.blue}66)`,
          boxShadow: `0 10px 40px ${COLORS.white}55`,
        }}
      />
      {/* Splash ripple */}
      <div
        style={{
          position: "absolute",
          top: 980,
          left: "50%",
          width: 400 * splash,
          height: 60 * splash,
          borderRadius: "50%",
          border: `6px solid ${COLORS.white}`,
          opacity: 1 - splash,
          transform: "translateX(-50%)",
        }}
      />

      <div
        style={{
          opacity: titleIn,
          transform: `scale(${0.8 + titleIn * 0.2})`,
          textAlign: "center",
          marginTop: 200,
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1,
            textShadow: `0 6px 0 ${COLORS.blueDark}`,
            letterSpacing: -2,
          }}
        >
          PERDITA
        </div>
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: COLORS.yellow,
            lineHeight: 1,
            marginTop: 10,
            textShadow: `0 6px 0 ${COLORS.blueDark}`,
            letterSpacing: -2,
          }}
        >
          D'ACQUA?
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          opacity: subIn,
          transform: `translateY(${(1 - subIn) * 30}px)`,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Icon name="siren" size={60} color={COLORS.yellow} />
        Non aspettare i danni
      </div>
    </AbsoluteFill>
  );
};
