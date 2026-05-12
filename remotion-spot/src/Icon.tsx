import React from "react";

export const Icon: React.FC<{ name: string; size?: number; color?: string; bg?: string }> = ({
  name,
  size = 60,
  color = "#fff",
  bg,
}) => {
  const s = size;
  const stroke = Math.max(3, size * 0.06);
  const wrapper: React.CSSProperties = bg
    ? {
        width: s * 1.4,
        height: s * 1.4,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : { width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center" };

  const svgs: Record<string, React.ReactNode> = {
    drop: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 C7 9 5 13 5 16 a7 7 0 0 0 14 0 c0-3-2-7-7-14z" fill={color} />
      </svg>
    ),
    toilet: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="9" rx="2" fill="none" />
        <path d="M6 12 l2 7 h8 l2-7" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    flame: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2 c2 4 6 6 6 11 a6 6 0 0 1 -12 0 c0-3 2-5 3-7 c1 2 2 3 3 3 c0-3-1-5 0-7z" />
      </svg>
    ),
    shower: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round">
        <circle cx="12" cy="7" r="4" fill={color} />
        <line x1="9" y1="13" x2="8" y2="20" />
        <line x1="12" y1="13" x2="12" y2="21" />
        <line x1="15" y1="13" x2="16" y2="20" />
      </svg>
    ),
    check: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke + 1} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12 l5 5 L20 6" />
      </svg>
    ),
    bolt: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
        <path d="M13 2 L4 14 h6 l-2 8 l10-13 h-6 l1-7z" />
      </svg>
    ),
    home: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
        <path d="M12 3 L2 12 h3 v9 h5 v-6 h4 v6 h5 v-9 h3z" />
      </svg>
    ),
    euro: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke + 0.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 a8 8 0 1 0 0 12" />
        <line x1="3" y1="10" x2="14" y2="10" />
        <line x1="3" y1="14" x2="13" y2="14" />
      </svg>
    ),
    chat: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
        <path d="M4 4 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-9 l-5 4 v-4 h-2 a2 2 0 0 1 -2 -2 V6 a2 2 0 0 1 2-2z" />
      </svg>
    ),
    phone: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
        <path d="M5 3 h4 l2 5 l-2.5 1.5 a11 11 0 0 0 6 6 L16 13 l5 2 v4 a2 2 0 0 1 -2 2 A17 17 0 0 1 3 5 a2 2 0 0 1 2-2z" />
      </svg>
    ),
    siren: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
        <path d="M5 18 h14 v3 H5z" />
        <path d="M6 17 a6 6 0 0 1 12 0z" />
        <circle cx="12" cy="6" r="1.5" />
        <line x1="12" y1="2" x2="12" y2="4" stroke={color} strokeWidth={2} />
      </svg>
    ),
    sad: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round">
        <circle cx="12" cy="12" r="10" fill={color === "#fff" ? "#FFD54F" : "#FFD54F"} stroke="none" />
        <circle cx="9" cy="10" r="1.2" fill="#0B1B2B" />
        <circle cx="15" cy="10" r="1.2" fill="#0B1B2B" />
        <path d="M8 17 q4 -4 8 0" stroke="#0B1B2B" fill="none" strokeWidth={stroke} />
      </svg>
    ),
  };

  return <div style={wrapper}>{svgs[name] ?? null}</div>;
};
