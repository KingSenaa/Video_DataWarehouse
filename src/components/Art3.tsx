import React from "react";
import { COLORS } from "../theme";

/* ---------- Paket data (kotak kecil beraksen garis) ---------- */
export const Packet: React.FC<{ size?: number; color: string }> = ({
  size = 60,
  color,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      background: color,
      boxShadow: `0 8px 20px ${color}66`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: size * 0.1,
    }}
  >
    <div
      style={{
        width: size * 0.6,
        height: size * 0.09,
        borderRadius: 4,
        background: "rgba(255,255,255,0.88)",
      }}
    />
    <div
      style={{
        width: size * 0.6,
        height: size * 0.09,
        borderRadius: 4,
        background: "rgba(255,255,255,0.88)",
      }}
    />
    <div
      style={{
        width: size * 0.36,
        height: size * 0.09,
        borderRadius: 4,
        background: "rgba(255,255,255,0.88)",
        alignSelf: "flex-start",
        marginLeft: size * 0.2,
      }}
    />
  </div>
);

/* ---------- Corong (Extract) ---------- */
export const Funnel: React.FC<{ size?: number; color?: string }> = ({
  size = 130,
  color = COLORS.oltp,
}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <path d="M10 14 h100 l-38 46 v38 l-24 10 v-48 z" fill={color} />
    <rect x="10" y="14" width="100" height="10" rx="5" fill="#000" opacity={0.12} />
  </svg>
);

/* ---------- Pos pemeriksaan (Staging Area) ---------- */
export const Checkpoint: React.FC<{
  size?: number;
  color?: string;
  open?: number; // 0 = palang tertutup, 1 = terbuka
}> = ({ size = 340, color = "#b45309", open = 0 }) => (
  <svg width={size} height={(size * 180) / 220} viewBox="0 0 220 180">
    <ellipse cx="110" cy="170" rx="104" ry="8" fill="rgba(15,39,71,0.10)" />
    <path d="M110 72 L160 36 L210 72 Z" fill={color} />
    <rect x="120" y="72" width="80" height="90" fill={color} opacity={0.16} />
    <rect
      x="120"
      y="72"
      width="80"
      height="90"
      fill="none"
      stroke={color}
      strokeWidth="5"
    />
    <rect
      x="136"
      y="92"
      width="48"
      height="36"
      rx="6"
      fill="#ffffff"
      stroke={color}
      strokeWidth="4"
    />
    <rect x="22" y="76" width="16" height="86" rx="4" fill="#94a3b8" />
    <g transform={`rotate(${-open * 70} 30 85)`}>
      <rect
        x="30"
        y="78"
        width="92"
        height="14"
        rx="7"
        fill="#ffffff"
        stroke="#ef4444"
        strokeWidth="3"
      />
      <rect x="44" y="78" width="12" height="14" fill="#ef4444" />
      <rect x="68" y="78" width="12" height="14" fill="#ef4444" />
      <rect x="92" y="78" width="12" height="14" fill="#ef4444" />
    </g>
  </svg>
);

/* ---------- Kaca pembesar (Diperiksa) ---------- */
export const Magnifier: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = COLORS.etl,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="42" cy="42" r="28" fill="#ffffff" stroke={color} strokeWidth="9" />
    <line
      x1="63"
      y1="63"
      x2="88"
      y2="88"
      stroke={color}
      strokeWidth="12"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- Perisai centang (Divalidasi) ---------- */
export const ShieldCheck: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = COLORS.bi,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 8 L86 22 V50 c0 24 -16 38 -36 46 c-20 -8 -36 -22 -36 -46 V22 z"
      fill={color}
    />
    <path
      d="M32 52 l12 12 l24 -26"
      stroke="#ffffff"
      strokeWidth="9"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- Kunci pas (Diperbaiki) ---------- */
export const Wrench: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = COLORS.oltp,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g transform="rotate(45 50 50)">
      <rect x="42" y="30" width="16" height="62" rx="8" fill={color} />
      <circle cx="50" cy="28" r="22" fill={color} />
      <rect x="41" y="2" width="18" height="24" fill="#ffffff" />
    </g>
  </svg>
);

/* ---------- Berkas (File eksternal) ---------- */
export const FileIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 170,
  color = COLORS.gold,
}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
    <path
      d="M16 6 h46 l24 24 v78 a6 6 0 0 1 -6 6 h-64 a6 6 0 0 1 -6 -6 v-96 a6 6 0 0 1 6 -6z"
      fill="#ffffff"
      stroke={color}
      strokeWidth="6"
    />
    <path
      d="M62 6 v24 h24"
      fill={color}
      opacity={0.35}
      stroke={color}
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <rect x="24" y="56" width="52" height="8" rx="4" fill="#cbd5e1" />
    <rect x="24" y="74" width="52" height="8" rx="4" fill="#cbd5e1" />
    <rect x="24" y="92" width="34" height="8" rx="4" fill="#cbd5e1" />
  </svg>
);

/* ---------- Sasaran (Tujuan analisis) ---------- */
export const Target: React.FC<{ size?: number; color?: string }> = ({
  size = 70,
  color = COLORS.bi,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill={color} />
    <circle cx="50" cy="50" r="32" fill="#ffffff" />
    <circle cx="50" cy="50" r="20" fill={color} />
    <circle cx="50" cy="50" r="8" fill="#ffffff" />
  </svg>
);