import React from "react";
import { COLORS } from "../theme";

/* ---------- Papan pesanan (Pemesanan) ---------- */
export const Clipboard: React.FC<{ size?: number; color?: string }> = ({
  size = 180,
  color = COLORS.etl,
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 160 200">
    <rect
      x="20"
      y="24"
      width="120"
      height="164"
      rx="14"
      fill="#ffffff"
      stroke={color}
      strokeWidth="6"
    />
    <rect x="52" y="8" width="56" height="30" rx="10" fill={color} />
    <circle cx="80" cy="22" r="5" fill="#ffffff" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path
          d={`M40 ${72 + i * 36} l8 8 l14 -16`}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="72"
          y={68 + i * 36}
          width="52"
          height="10"
          rx="5"
          fill="#cbd5e1"
        />
      </g>
    ))}
  </svg>
);

/* ---------- Tumpukan kardus (Persediaan) ---------- */
export const BoxStack: React.FC<{ size?: number; color?: string }> = ({
  size = 240,
  color = COLORS.dw,
}) => {
  const box = (x: number, y: number, key: string, op: number) => (
    <g key={key}>
      <rect x={x} y={y} width={80} height={60} rx={6} fill={color} opacity={op} />
      <rect x={x + 30} y={y} width={20} height={60} fill="#ffffff" opacity={0.35} />
    </g>
  );
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 200 170">
      <ellipse cx="100" cy="162" rx="92" ry="8" fill="rgba(15,39,71,0.10)" />
      {box(18, 100, "a", 0.85)}
      {box(102, 100, "b", 0.85)}
      {box(60, 38, "c", 1)}
    </svg>
  );
};

/* ---------- Keranjang belanja ---------- */
export const Basket: React.FC<{ size?: number; color?: string }> = ({
  size = 380,
  color = COLORS.oltp,
}) => (
  <svg width={size} height={(size * 150) / 220} viewBox="0 0 220 150">
    <path
      d="M10 50 h200 l-20 84 a14 14 0 0 1 -14 10 h-132 a14 14 0 0 1 -14 -10 z"
      fill={color}
    />
    <rect x="4" y="42" width="212" height="16" rx="8" fill={color} />
    <rect x="4" y="42" width="212" height="16" rx="8" fill="#000" opacity={0.12} />
    {[50, 80, 110, 140, 170].map((x) => (
      <line
        key={x}
        x1={x}
        y1={68}
        x2={x}
        y2={130}
        stroke="#ffffff"
        strokeWidth="5"
        opacity={0.35}
        strokeLinecap="round"
      />
    ))}
  </svg>
);

/* ---------- Jam (Waktu transaksi) ---------- */
export const Clock: React.FC<{
  size?: number;
  color?: string;
  minute?: number;
}> = ({ size = 80, color = COLORS.oltp, minute = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="#ffffff" stroke={color} strokeWidth="8" />
    <line
      x1="50"
      y1="50"
      x2="50"
      y2="28"
      stroke={COLORS.ink}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="50"
      x2="50"
      y2="20"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      transform={`rotate(${minute} 50 50)`}
    />
    <circle cx="50" cy="50" r="5" fill={COLORS.ink} />
  </svg>
);