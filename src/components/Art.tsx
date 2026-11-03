import React from "react";
import { COLORS, FONT } from "../theme";

/* ---------- Minimarket ---------- */
export const Minimarket: React.FC<{ width?: number }> = ({ width = 560 }) => {
  const stripes = Array.from({ length: 8 }, (_, i) => i);
  const shelfColors = [
    COLORS.dw,
    COLORS.gold,
    COLORS.warn,
    COLORS.bi,
    "#38bdf8",
    COLORS.etl,
  ];
  return (
    <svg width={width} height={(width * 440) / 560} viewBox="0 0 560 440">
      <ellipse cx="280" cy="412" rx="270" ry="18" fill="rgba(15,39,71,0.10)" />
      <rect
        x="40"
        y="110"
        width="480"
        height="292"
        rx="18"
        fill="#ffffff"
        stroke="#d6e0ee"
        strokeWidth="3"
      />
      <rect x="30" y="52" width="500" height="78" rx="16" fill={COLORS.dw} />
      <text
        x="280"
        y="105"
        textAnchor="middle"
        fontSize="44"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="8"
        fontFamily={FONT}
      >
        MINIMARKET
      </text>
      {stripes.map((i) => (
        <path
          key={i}
          d={`M${40 + i * 60} 130 h60 v34 a30 30 0 0 1 -60 0 z`}
          fill={i % 2 === 0 ? COLORS.oltp : "#fff3e6"}
        />
      ))}
      <rect
        x="72"
        y="210"
        width="256"
        height="150"
        rx="12"
        fill="#e0f2fe"
        stroke="#93c5fd"
        strokeWidth="4"
      />
      <line x1="72" y1="264" x2="328" y2="264" stroke="#93c5fd" strokeWidth="4" />
      <line x1="72" y1="314" x2="328" y2="314" stroke="#93c5fd" strokeWidth="4" />
      {shelfColors.map((c, i) => (
        <rect
          key={"a" + i}
          x={88 + i * 38}
          y={236}
          width={24}
          height={28}
          rx={4}
          fill={c}
        />
      ))}
      {shelfColors.map((c, i) => (
        <rect
          key={"b" + i}
          x={88 + i * 38}
          y={286}
          width={24}
          height={28}
          rx={4}
          fill={shelfColors[(i + 2) % 6]}
          opacity={0.9}
        />
      ))}
      <rect
        x="352"
        y="210"
        width="140"
        height="192"
        rx="10"
        fill="#dbeafe"
        stroke="#93c5fd"
        strokeWidth="4"
      />
      <line x1="422" y1="252" x2="422" y2="402" stroke="#93c5fd" strokeWidth="4" />
      <rect x="392" y="222" width="60" height="26" rx="6" fill={COLORS.bi} />
      <text
        x="422"
        y="241"
        textAnchor="middle"
        fontSize="16"
        fontWeight="800"
        fill="#fff"
        fontFamily={FONT}
      >
        BUKA
      </text>
      <rect x="404" y="300" width="8" height="40" rx="4" fill="#64748b" />
      <rect x="432" y="300" width="8" height="40" rx="4" fill="#64748b" />
    </svg>
  );
};

/* ---------- Produk ---------- */
export type ProductType = "water" | "bread" | "milk" | "snack" | "can";

export const Product: React.FC<{ type: ProductType; size?: number }> = ({
  type,
  size = 100,
}) => {
  let body: React.ReactNode = null;
  if (type === "water") {
    body = (
      <g>
        <rect x="41" y="5" width="18" height="9" rx="3" fill="#1d4ed8" />
        <path
          d="M42 14 h16 v8 c10 6 14 14 14 26 v38 c0 7-5 12-12 12 h-20 c-7 0-12-5-12-12 v-38 c0-12 4-20 14-26z"
          fill="#7dd3fc"
        />
        <rect x="28" y="46" width="44" height="26" fill="#ffffff" opacity="0.92" />
        <path
          d="M34 60 q4-5 8 0 t8 0 t8 0"
          stroke="#2563eb"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  } else if (type === "bread") {
    body = (
      <g>
        <path
          d="M12 62 c-4-26 20-36 38-36 s42 10 38 36 c-1 6-4 9-8 10 v10 c0 6-4 9-9 9 h-42 c-5 0-9-3-9-9 v-10 c-4-1-7-4-8-10z"
          fill="#f2b45a"
        />
        <path
          d="M30 44 q4-6 8-2 M46 40 q4-6 8-2 M62 44 q4-6 8-2"
          stroke="#c9822b"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  } else if (type === "milk") {
    body = (
      <g>
        <path
          d="M26 34 l24-20 l24 20 v54 c0 5-4 8-8 8 h-32 c-4 0-8-3-8-8z"
          fill="#ffffff"
          stroke="#93c5fd"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M26 34 h48" stroke="#93c5fd" strokeWidth="3" />
        <rect x="34" y="50" width="32" height="24" rx="6" fill="#3b82f6" />
        <circle cx="50" cy="62" r="6" fill="#ffffff" />
      </g>
    );
  } else if (type === "snack") {
    body = (
      <g>
        <path
          d="M24 10 l7 6 l7-6 l7 6 l7-6 l7 6 l7-6 l7 6 V90 q0 6-6 6 H30 q-6 0-6-6z"
          fill="#ef4444"
        />
        <circle cx="48.5" cy="55" r="16" fill="#fde68a" />
        <circle cx="48.5" cy="55" r="8" fill="#f59e0b" />
      </g>
    );
  } else {
    body = (
      <g>
        <rect x="28" y="14" width="44" height="76" rx="8" fill="#10b981" />
        <ellipse cx="50" cy="14" rx="22" ry="5" fill="#a7f3d0" />
        <rect x="28" y="40" width="44" height="26" fill="#ecfdf5" />
        <circle cx="50" cy="53" r="8" fill="#059669" />
      </g>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {body}
    </svg>
  );
};

/* ---------- Struk ---------- */
export const ReceiptCard: React.FC<{
  width?: number;
  rows?: number;
  accent?: string;
  seed?: number;
}> = ({ width = 260, rows = 5, accent = COLORS.oltp, seed = 0 }) => {
  const widths = [62, 46, 70, 54, 66, 42, 58];
  const height = 190 + rows * 46;
  return (
    <div
      style={{
        width,
        height,
        boxSizing: "border-box",
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #e3ebf6",
        boxShadow: "0 16px 44px rgba(15,39,71,0.16)",
        padding: "24px 24px",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          height: 14,
          width: "46%",
          background: accent,
          borderRadius: 7,
          margin: "0 auto",
        }}
      />
      <div
        style={{
          marginTop: 14,
          textAlign: "center",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 4,
          color: COLORS.sub,
        }}
      >
        STRUK
      </div>
      <div style={{ borderTop: "3px dashed #d6e0ee", margin: "18px 0 14px" }} />
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 46,
          }}
        >
          <div
            style={{
              height: 12,
              width: `${widths[(i + seed) % 7]}%`,
              background: "#dbe5f3",
              borderRadius: 6,
            }}
          />
          <div
            style={{ height: 12, width: 34, background: "#c3d2e8", borderRadius: 6 }}
          />
        </div>
      ))}
      <div style={{ borderTop: "3px dashed #d6e0ee", margin: "10px 0 14px" }} />
      <div
        style={{
          height: 22,
          width: "100%",
          background: accent,
          borderRadius: 8,
          opacity: 0.9,
        }}
      />
    </div>
  );
};

/* ---------- Database ---------- */
export const DbIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 140,
  color = COLORS.dw,
}) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 100 110">
    <path
      d="M10 22 v66 c0 9 18 16 40 16 s40-7 40-16 v-66z"
      fill={color}
      opacity={0.9}
    />
    <ellipse cx="50" cy="22" rx="40" ry="14" fill={color} />
    <ellipse cx="50" cy="22" rx="40" ry="14" fill="#fff" opacity={0.25} />
    <path
      d="M10 46 c0 9 18 16 40 16 s40-7 40-16"
      stroke="#fff"
      strokeWidth="3"
      fill="none"
      opacity={0.6}
    />
    <path
      d="M10 70 c0 9 18 16 40 16 s40-7 40-16"
      stroke="#fff"
      strokeWidth="3"
      fill="none"
      opacity={0.6}
    />
  </svg>
);

/* ---------- Gudang (Data Warehouse) ---------- */
export const WarehouseIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 260,
  color = COLORS.dw,
}) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 200 170">
    <path d="M8 72 L100 14 L192 72 Z" fill={color} />
    <rect x="24" y="72" width="152" height="90" fill={color} opacity={0.16} />
    <rect
      x="24"
      y="72"
      width="152"
      height="90"
      fill="none"
      stroke={color}
      strokeWidth="5"
    />
    <rect
      x="62"
      y="96"
      width="76"
      height="66"
      fill="#ffffff"
      stroke={color}
      strokeWidth="4"
    />
    {[108, 120, 132, 144].map((y) => (
      <line
        key={y}
        x1="62"
        x2="138"
        y1={y}
        y2={y}
        stroke={color}
        strokeWidth="3"
        opacity={0.55}
      />
    ))}
    <rect x="31" y="134" width="22" height="22" rx="3" fill={color} opacity={0.85} />
    <rect x="148" y="138" width="22" height="18" rx="3" fill={color} opacity={0.85} />
  </svg>
);

/* ---------- Roda gigi (ETL) ---------- */
export const Gear: React.FC<{
  size?: number;
  color?: string;
  rotate?: number;
  teeth?: number;
}> = ({ size = 150, color = COLORS.etl, rotate = 0, teeth = 10 }) => {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  const p = (ang: number, r: number): string =>
    `${50 + Math.cos(ang) * r},${50 + Math.sin(ang) * r}`;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const w1 = step * 0.3;
    const w2 = step * 0.18;
    pts.push(p(a - w1, 34));
    pts.push(p(a - w2, 46));
    pts.push(p(a + w2, 46));
    pts.push(p(a + w1, 34));
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`rotate(${rotate} 50 50)`}>
        <polygon points={pts.join(" ")} fill={color} />
        <circle cx="50" cy="50" r="26" fill={color} />
        <circle cx="50" cy="50" r="11" fill="#ffffff" />
      </g>
    </svg>
  );
};

/* ---------- Mesin kasir (OLTP) ---------- */
export const CashRegister: React.FC<{ size?: number; color?: string }> = ({
  size = 230,
  color = COLORS.oltp,
}) => {
  const keys: React.ReactNode[] = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      keys.push(
        <circle
          key={`${r}-${c}`}
          cx={76 + c * 16}
          cy={74 + r * 16}
          r={5}
          fill="#ffffff"
          opacity={0.9}
        />
      );
    }
  }
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 200 170">
      <rect x="62" y="10" width="76" height="44" rx="8" fill="#0f2747" />
      <rect x="70" y="18" width="60" height="28" rx="4" fill="#bbf7d0" />
      <text
        x="124"
        y="39"
        fontSize="20"
        fontWeight="800"
        fill="#065f46"
        textAnchor="end"
        fontFamily={FONT}
      >
        Rp
      </text>
      <path d="M40 112 L62 56 H138 L160 112 Z" fill={color} />
      {keys}
      <rect x="18" y="112" width="164" height="48" rx="10" fill={color} />
      <rect x="18" y="112" width="164" height="48" rx="10" fill="#000" opacity={0.12} />
      <rect x="62" y="128" width="76" height="12" rx="6" fill="#ffffff" opacity={0.85} />
    </svg>
  );
};

/* ---------- Dashboard / BI ---------- */
export const DashboardIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 260,
  color = COLORS.bi,
}) => (
  <svg width={size} height={size * 0.78} viewBox="0 0 220 170">
    <rect
      x="6"
      y="6"
      width="208"
      height="158"
      rx="16"
      fill="#ffffff"
      stroke={color}
      strokeWidth="6"
    />
    <path d="M6 22 a16 16 0 0 1 16-16 h176 a16 16 0 0 1 16 16 v14 h-208z" fill={color} />
    <circle cx="26" cy="21" r="5" fill="#ffffff" />
    <circle cx="42" cy="21" r="5" fill="#ffffff" opacity={0.7} />
    <circle cx="58" cy="21" r="5" fill="#ffffff" opacity={0.4} />
    <rect x="28" y="100" width="22" height="44" rx="4" fill={color} opacity={0.45} />
    <rect x="62" y="78" width="22" height="66" rx="4" fill={color} opacity={0.7} />
    <rect x="96" y="56" width="22" height="88" rx="4" fill={color} />
    <rect x="140" y="52" width="56" height="7" rx="3.5" fill="#cbd5e1" />
    <rect x="140" y="66" width="40" height="7" rx="3.5" fill="#cbd5e1" />
    <circle cx="168" cy="116" r="20" fill="none" stroke="#e2e8f0" strokeWidth="12" />
    <circle
      cx="168"
      cy="116"
      r="20"
      fill="none"
      stroke={COLORS.gold}
      strokeWidth="12"
      strokeDasharray="78 130"
      transform="rotate(-90 168 116)"
    />
  </svg>
);

/* ---------- Pemilik usaha ---------- */
export const Person: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = COLORS.dw,
}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 120 156">
    <path d="M18 154 c0-36 14-64 42-64 s42 28 42 64z" fill={color} />
    <path d="M40 100 h40 v54 h-40z" fill="#fff7ed" />
    <rect x="48" y="122" width="24" height="16" rx="3" fill="#fed7aa" />
    <circle cx="60" cy="42" r="26" fill="#fcd9b6" />
    <path
      d="M34 38 c0-18 14-28 26-28 s26 10 26 28 c-6-9-16-13-26-13 s-20 4-26 13z"
      fill="#1f2937"
    />
    <circle cx="50" cy="44" r="3" fill="#1f2937" />
    <circle cx="70" cy="44" r="3" fill="#1f2937" />
    <path
      d="M52 54 q8 7 16 0"
      stroke="#1f2937"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- Panah beranimasi (dipakai di dalam <svg>) ---------- */
export const Arrow: React.FC<{
  x1: number;
  x2: number;
  y: number;
  progress: number; // 0..1
  color: string;
  width?: number;
}> = ({ x1, x2, y, progress, color, width = 8 }) => {
  const len = Math.max(1, x2 - x1 - 16);
  return (
    <g opacity={progress > 0 ? 1 : 0}>
      <line
        x1={x1}
        y1={y}
        x2={x1 + len}
        y2={y}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
      />
      <polygon
        points={`${x2},${y} ${x2 - 22},${y - 15} ${x2 - 22},${y + 15}`}
        fill={color}
        opacity={progress >= 1 ? 1 : 0}
      />
    </g>
  );
};