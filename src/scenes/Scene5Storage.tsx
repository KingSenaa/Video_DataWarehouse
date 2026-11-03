import React from "react";
import {
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { FPS, getScene } from "../timing";
import { fade, pop } from "../anim";
import { Beat } from "../components/Beat";
import { Card, SceneTag } from "../components/Chrome";
import { Arrow, DbIcon, Product, WarehouseIcon } from "../components/Art";
import { Clock } from "../components/Art2";
import { Target } from "../components/Art3";

const SCENE = getScene("storage");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Awal tiap bagian narasi (detik absolut)
const T = { a: 238.57, b: 244.78, c: 254.69, d: 263.57, g: 283.74, h: 289.35 };
const rel = (t: number, s: number): number => Math.round((t - s) * FPS);

/* ================= Komponen bantu ================= */

const ChipLabel: React.FC<{
  text: string;
  p: number;
  top: number;
  color?: string;
}> = ({ text, p, top, color = COLORS.ink }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top,
      textAlign: "center",
      opacity: p,
      transform: `translateY(${(1 - p) * 14}px)`,
    }}
  >
    <span
      style={{
        display: "inline-block",
        padding: "10px 30px",
        borderRadius: 40,
        background: color,
        color: "#ffffff",
        fontFamily: FONT,
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: 6,
      }}
    >
      {text}
    </span>
  </div>
);

const Tag: React.FC<{
  text: string;
  color: string;
  p: number;
  size?: number;
  solid?: boolean;
}> = ({ text, color, p, size = 30, solid = true }) => (
  <div
    style={{
      display: "inline-block",
      padding: "10px 26px",
      borderRadius: 30,
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 800,
      background: solid ? color : `${color}22`,
      color: solid ? "#ffffff" : color,
      border: `3px solid ${color}`,
      opacity: p,
      transform: `scale(${0.6 + 0.4 * p})`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);

const MapPin: React.FC<{ size?: number; color?: string }> = ({
  size = 100,
  color = COLORS.bi,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 94 C50 94 18 58 18 38 a32 32 0 0 1 64 0 c0 20 -32 56 -32 56z"
      fill={color}
    />
    <circle cx="50" cy="38" r="12" fill="#ffffff" />
  </svg>
);

/* ================= A: DW = tempat penyimpanan untuk analisis dan pelaporan ================= */
const PanelA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.a);
  const whP = pop(frame, r(238.8), fps);
  const titleP = pop(frame, r(238.9), fps);
  const subP = pop(frame, r(239.6), fps);
  const forP = fade(frame, r(240.5), 12);
  const p1 = pop(frame, r(242.0), fps);
  const p2 = pop(frame, r(243.2), fps);
  const ring = 1 + 0.04 * Math.sin(frame / 12);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 200,
          width: 760,
          height: 760,
          borderRadius: 380,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.20), rgba(37,99,235,0) 66%)",
          opacity: whP,
          transform: `scale(${ring})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 330,
          opacity: whP,
          transform: `translateY(${(1 - whP) * 50}px) scale(${0.85 + 0.15 * whP})`,
        }}
      >
        <WarehouseIcon size={560} color={COLORS.dw} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 900,
          top: 290,
          fontFamily: FONT,
          fontSize: 120,
          fontWeight: 900,
          color: COLORS.dw,
          opacity: titleP,
          transform: `translateX(${(1 - titleP) * 60}px)`,
        }}
      >
        Data Warehouse
      </div>
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 440,
          fontFamily: FONT,
          fontSize: 58,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: subP,
          transform: `translateX(${(1 - subP) * 60}px)`,
        }}
      >
        Tempat penyimpanan data
      </div>
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 560,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.sub,
          opacity: forP,
        }}
      >
        Dirancang untuk kebutuhan
      </div>
      <div style={{ position: "absolute", left: 900, top: 640, display: "flex", gap: 24 }}>
        <Tag text="Analisis" color={COLORS.dw} p={p1} size={52} />
        <Tag text="Pelaporan" color={COLORS.bi} p={p2} size={52} />
      </div>
    </>
  );
};

/* ================= B: berbeda dari database operasional ================= */
const PanelB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b);
  const leftP = pop(frame, 2, fps);
  const subP = fade(frame, r(246.99), 12);
  const rightP = pop(frame, r(249.19), fps);
  const vsP = pop(frame, r(249.4), fps);
  const pillA = pop(frame, r(251.0), fps);
  const pillB = pop(frame, r(252.3), fps);
  const srcLabel = fade(frame, r(253.4), 12);
  const srcColors = [COLORS.oltp, COLORS.etl, COLORS.gold];

  return (
    <>
      <Card
        style={{
          left: 160,
          top: 250,
          width: 700,
          height: 600,
          border: `3px solid ${COLORS.oltp}`,
          opacity: leftP,
          transform: `translateY(${(1 - leftP) * 40}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 40,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DbIcon size={170} color={COLORS.oltp} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 255,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 42,
            fontWeight: 900,
            color: COLORS.oltp,
          }}
        >
          Database operasional
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 322,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.sub,
            opacity: subP,
          }}
        >
          Berfokus pada transaksi sehari-hari
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 430,
            display: "flex",
            justifyContent: "center",
            gap: 30,
            opacity: subP,
          }}
        >
          <Product type="water" size={90} />
          <Product type="bread" size={90} />
          <Product type="milk" size={90} />
        </div>
      </Card>

      <Card
        style={{
          left: 1060,
          top: 250,
          width: 700,
          height: 600,
          border: `3px solid ${COLORS.dw}`,
          opacity: rightP,
          transform: `translateY(${(1 - rightP) * 40}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WarehouseIcon size={250} color={COLORS.dw} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 255,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 42,
            fontWeight: 900,
            color: COLORS.dw,
          }}
        >
          Data Warehouse
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 325,
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Tag text="Dipersiapkan" color={COLORS.dw} p={pillA} size={28} />
          <Tag text="Diintegrasikan" color={COLORS.etl} p={pillB} size={28} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 430,
            display: "flex",
            justifyContent: "center",
            gap: 36,
          }}
        >
          {srcColors.map((c, i) => {
            const p = pop(frame, r(253.3) + i * 5, fps);
            return (
              <div key={i} style={{ opacity: p, transform: `scale(${0.6 + 0.4 * p})` }}>
                <DbIcon size={80} color={c} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 540,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.sub,
            opacity: srcLabel,
          }}
        >
          dari berbagai sumber
        </div>
      </Card>

      <div
        style={{
          position: "absolute",
          left: 910,
          top: 500,
          width: 100,
          height: 100,
          borderRadius: 50,
          background: COLORS.ink,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: vsP,
          transform: `scale(${vsP})`,
        }}
      >
        VS
      </div>
    </>
  );
};

/* ================= C: perkembangan bisnis dari waktu ke waktu ================= */
const PanelC: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.c);
  const cardP = pop(frame, 2, fps);
  const titleP = fade(frame, r(255.0), 12);
  const tagP = pop(frame, r(258.7), fps);
  const lineP = interpolate(frame, [r(257.5), r(259.0)], [0, 1], clamp);
  const axisP = interpolate(frame, [r(258.7), r(259.4)], [0, 1], clamp);
  const hlNow = fade(frame, r(261.2), 12);
  const hlPrev = fade(frame, r(262.2), 12);

  const hs = [0.38, 0.5, 0.44, 0.62, 0.7, 0.8, 0.96];
  const BASE = 470;
  const pts = hs.map((h, i) => ({ x: 170 + i * 170, y: BASE - 300 * h }));
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }

  return (
    <Card
      style={{
        left: 260,
        top: 250,
        width: 1400,
        height: 600,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 30,
          fontFamily: FONT,
          fontSize: 42,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: titleP,
        }}
      >
        Perkembangan bisnis
      </div>
      <div style={{ position: "absolute", left: 60, top: 92 }}>
        <Tag text="dari waktu ke waktu" color={COLORS.dw} p={tagP} size={28} solid={false} />
      </div>

      {hs.map((h, i) => {
        const g = interpolate(
          frame,
          [r(257.3) + i * 4, r(257.3) + i * 4 + 28],
          [0, 1],
          { ...clamp, easing: Easing.out(Easing.cubic) }
        );
        const bh = 300 * h * g;
        const ov = i === 5 ? hlPrev : i === 6 ? hlNow : 0;
        const ovColor = i === 5 ? COLORS.dw : COLORS.bi;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: 110 + i * 170,
                top: BASE - bh,
                width: 120,
                height: bh,
                borderRadius: "14px 14px 4px 4px",
                background: "#bfdbfe",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 110 + i * 170,
                top: BASE - bh,
                width: 120,
                height: bh,
                borderRadius: "14px 14px 4px 4px",
                background: ovColor,
                opacity: ov,
              }}
            />
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 90,
          top: BASE,
          width: 1160,
          height: 4,
          borderRadius: 2,
          background: COLORS.line,
        }}
      />

      <svg
        width={1400}
        height={600}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <polyline
          points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={COLORS.oltp}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - lineP)}
        />
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={10}
            fill="#ffffff"
            stroke={COLORS.oltp}
            strokeWidth={5}
            opacity={lineP > i / 6 ? 1 : 0}
          />
        ))}
        <Arrow x1={110} x2={1240} y={520} progress={axisP} color={COLORS.sub} width={8} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 1262,
          top: 494,
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 800,
          color: COLORS.sub,
          opacity: axisP,
        }}
      >
        Waktu
      </div>

      <div
        style={{
          position: "absolute",
          left: 1190 - 120,
          width: 240,
          top: BASE - 300 * hs[6] - 56,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.bi,
          opacity: hlNow,
        }}
      >
        Bulan ini
      </div>
      <div
        style={{
          position: "absolute",
          left: 1020 - 110,
          width: 220,
          top: BASE - 300 * hs[5] - 56,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 26,
          fontWeight: 800,
          color: COLORS.dw,
          opacity: hlPrev,
        }}
      >
        Bulan sebelumnya
      </div>
    </Card>
  );
};

/* ================= D: tabel fakta dan tabel dimensi (skema bintang) ================= */
type Dim = {
  key: string;
  left: number;
  top: number;
  w: number;
  h: number;
  color: string;
  name: string;
  cue: number;
};

const FACT = { left: 750, top: 400, w: 420, h: 300 };
const DIMS: Dim[] = [
  { key: "produk", left: 130, top: 400, w: 420, h: 300, color: COLORS.oltp, name: "Produk", cue: 280.5 },
  { key: "waktu", left: 1370, top: 400, w: 420, h: 300, color: COLORS.etl, name: "Waktu", cue: 281.88 },
  { key: "lokasi", left: 750, top: 790, w: 420, h: 230, color: COLORS.bi, name: "Lokasi", cue: 282.72 },
];
const CONNS = [
  { x1: 550, y1: 550, x2: 750, y2: 550 },
  { x1: 1170, y1: 550, x2: 1370, y2: 550 },
  { x1: 960, y1: 700, x2: 960, y2: 790 },
];

const PanelD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.d);

  const c1 = fade(frame, r(263.7), 12) * (1 - fade(frame, r(268.9), 10));
  const c2 = fade(frame, r(269.2), 12) * (1 - fade(frame, r(275.2), 10));
  const c3 = fade(frame, r(276.5), 12);
  const factP = pop(frame, r(266.2), fps);
  const ghostP = pop(frame, r(267.5), fps);
  const lineP = interpolate(frame, [r(267.5), r(268.2)], [0, 1], clamp);
  const factHl = fade(frame, r(269.0), 12) * (1 - fade(frame, r(275.3), 10));
  const jumlahP = fade(frame, r(273.2), 10);
  const nilaiP = fade(frame, r(274.0), 10);

  const caption = (text: string, o: number): React.ReactNode => (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 200,
        textAlign: "center",
        fontFamily: FONT,
        fontSize: 46,
        fontWeight: 800,
        color: COLORS.ink,
        opacity: o,
        transform: `translateY(${(1 - o) * 14}px)`,
      }}
    >
      {text}
    </div>
  );

  return (
    <>
      {caption("Data disusun menggunakan tabel fakta dan tabel dimensi", c1)}
      {caption("Tabel fakta menyimpan informasi utama yang akan dianalisis", c2)}
      {caption("Tabel dimensi menyediakan konteks untuk memahami data", c3)}

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {CONNS.map((c, i) => {
          const l = Math.hypot(c.x2 - c.x1, c.y2 - c.y1);
          return (
            <line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="#94a3b8"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={l}
              strokeDashoffset={l * (1 - lineP)}
            />
          );
        })}
      </svg>

      {/* Tabel fakta */}
      <div
        style={{
          position: "absolute",
          left: FACT.left,
          top: FACT.top,
          width: FACT.w,
          height: FACT.h,
          borderRadius: 28,
          background: "#ffffff",
          border: `4px solid ${COLORS.dw}`,
          overflow: "hidden",
          boxShadow: `0 20px 60px rgba(15,39,71,0.12), 0 0 0 ${factHl * 10}px ${COLORS.dw}33`,
          opacity: factP,
          transform: `scale(${0.85 + 0.15 * factP})`,
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            height: 70,
            background: COLORS.dw,
            color: "#ffffff",
            fontSize: 38,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Tabel fakta
        </div>
        {[0, 1].map((ci) => {
          const p = ci === 0 ? jumlahP : nilaiP;
          return (
            <React.Fragment key={ci}>
              <div
                style={{
                  position: "absolute",
                  left: 18 + ci * 196,
                  top: 86,
                  width: 184,
                  height: 42,
                  borderRadius: 10,
                  background: p > 0.5 ? `${COLORS.dw}22` : "#f1f5fb",
                  color: COLORS.dw,
                  fontSize: 22,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ opacity: p }}>
                  {ci === 0 ? "Jumlah" : "Nilai penjualan"}
                </span>
              </div>
              {[0, 1, 2].map((ri) => (
                <div
                  key={ri}
                  style={{
                    position: "absolute",
                    left: 40 + ci * 196,
                    top: 146 + ri * 48,
                    width: 140,
                    height: 22,
                    borderRadius: 11,
                    background: p > 0.5 ? COLORS.dw : "#cbd5e1",
                    opacity: p > 0.5 ? 0.85 : 1,
                  }}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>

      {/* Tabel dimensi: hantu (dashed) lalu kartu solid */}
      {DIMS.map((d, idx) => {
        const solidP = pop(frame, r(276.46) + idx * 3, fps);
        const named = fade(frame, r(d.cue), 10);
        const ring = interpolate(
          frame,
          [r(d.cue), r(d.cue) + 8, r(d.cue) + 30],
          [0, 1, 0],
          clamp
        );
        let icon: React.ReactNode = null;
        if (d.key === "produk") {
          icon = (
            <div style={{ display: "flex", gap: 14 }}>
              <Product type="water" size={96} />
              <Product type="bread" size={96} />
            </div>
          );
        } else if (d.key === "waktu") {
          icon = <Clock size={110} color={COLORS.etl} minute={frame * 6} />;
        } else {
          icon = <MapPin size={110} color={COLORS.bi} />;
        }
        return (
          <React.Fragment key={d.key}>
            <div
              style={{
                position: "absolute",
                left: d.left,
                top: d.top,
                width: d.w,
                height: d.h,
                borderRadius: 28,
                border: `4px dashed ${d.color}88`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT,
                fontSize: 34,
                fontWeight: 800,
                color: d.color,
                opacity: ghostP * (1 - Math.min(1, solidP * 2)),
                transform: `scale(${0.85 + 0.15 * ghostP})`,
              }}
            >
              Tabel dimensi
            </div>
            <div
              style={{
                position: "absolute",
                left: d.left,
                top: d.top,
                width: d.w,
                height: d.h,
                borderRadius: 28,
                background: "#ffffff",
                border: `4px solid ${d.color}`,
                overflow: "hidden",
                boxShadow: `0 20px 60px rgba(15,39,71,0.12), 0 0 0 ${ring * 10}px ${d.color}33`,
                opacity: solidP,
                transform: `scale(${0.85 + 0.15 * solidP})`,
                fontFamily: FONT,
              }}
            >
              <div
                style={{
                  height: 70,
                  background: d.color,
                  color: "#ffffff",
                  fontSize: 38,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {named > 0.5 ? d.name : "Dimensi"}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 40,
                  top: 100,
                  width: 200,
                  height: 22,
                  borderRadius: 11,
                  background: "#cbd5e1",
                  opacity: 1 - named,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 40,
                  top: 140,
                  width: 140,
                  height: 22,
                  borderRadius: 11,
                  background: "#cbd5e1",
                  opacity: 1 - named,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 70,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: named,
                  transform: `scale(${0.7 + 0.3 * named})`,
                }}
              >
                {icon}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

/* ================= G: granularity = tingkat rincian data ================= */
const GridLayer: React.FC<{ n: number; size: number; o: number }> = ({
  n,
  size,
  o,
}) => {
  const cells = Array.from({ length: n * n }, (_, i) => i);
  const gap = n > 4 ? 4 : 8;
  const cell = (size - gap * (n - 1)) / n;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: size,
        height: size,
        opacity: o,
      }}
    >
      {cells.map((i) => {
        const c = i % n;
        const rw = Math.floor(i / n);
        const v = 0.25 + 0.75 * random("g" + n + "-" + i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c * (cell + gap),
              top: rw * (cell + gap),
              width: cell,
              height: cell,
              borderRadius: cell * 0.16,
              background: COLORS.dw,
              opacity: v,
            }}
          />
        );
      })}
    </div>
  );
};

const PanelG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.g);
  const chipP = fade(frame, 4, 12);
  const wordP = pop(frame, r(284.9), fps);
  const subP = fade(frame, r(286.97), 14);
  const cardP = pop(frame, r(285.2), fps);
  const l4 = fade(frame, r(287.4), 8);
  const l8 = fade(frame, r(288.3), 8);
  const moreP = fade(frame, r(288.3), 12);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 250,
          opacity: chipP,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "10px 30px",
            borderRadius: 40,
            background: COLORS.ink,
            color: "#ffffff",
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 6,
          }}
        >
          HAL PENTING LAINNYA
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 330,
          fontFamily: FONT,
          fontSize: 150,
          fontWeight: 900,
          color: COLORS.dw,
          opacity: wordP,
          transform: `translateX(${(1 - wordP) * -60}px)`,
        }}
      >
        Granularity
      </div>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 540,
          width: 800,
          fontFamily: FONT,
          fontSize: 58,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: subP,
          transform: `translateY(${(1 - subP) * 20}px)`,
        }}
      >
        Tingkat rincian data yang disimpan
      </div>

      <Card
        style={{
          left: 1100,
          top: 260,
          width: 640,
          height: 660,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px)`,
        }}
      >
        <div style={{ position: "absolute", left: 80, top: 80, width: 480, height: 480 }}>
          <GridLayer n={2} size={480} o={1 - l4} />
          <GridLayer n={4} size={480} o={l4 * (1 - l8)} />
          <GridLayer n={8} size={480} o={l8} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 590,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.dw,
            opacity: moreP,
          }}
        >
          Semakin rinci →
        </div>
      </Card>
    </>
  );
};

/* ================= H: contoh rinci vs dirangkum + sesuai kebutuhan analisis ================= */
const PanelH: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.h);
  const chipP = fade(frame, 4, 12);
  const leftP = pop(frame, r(290.5), fps);
  const rightP = pop(frame, r(294.7), fps);
  const arrowP = pop(frame, r(294.8), fps);
  const bannerP = pop(frame, r(296.7), fps);
  const keyP = fade(frame, r(299.0), 12);
  const ids = ["#0231", "#0232", "#0233", "#0234", "#0235", "#0236"];
  const days = [
    { label: "Hari 1", w: 430 },
    { label: "Hari 2", w: 330 },
    { label: "Hari 3", w: 500 },
  ];

  return (
    <>
      <ChipLabel text="SEBAGAI CONTOH" p={chipP} top={170} />

      <Card
        style={{
          left: 160,
          top: 240,
          width: 780,
          height: 520,
          border: `3px solid ${COLORS.oltp}`,
          opacity: leftP,
          transform: `translateY(${(1 - leftP) * 40}px)`,
        }}
      >
        <div style={{ position: "absolute", left: 40, top: 26 }}>
          <Tag text="Rinci: setiap transaksi" color={COLORS.oltp} p={1} size={32} />
        </div>
        {ids.map((id, i) => {
          const p = pop(frame, r(291.0) + i * 10, fps);
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: 40,
                top: 112 + i * 62,
                width: 700,
                height: 50,
                borderRadius: 12,
                background: i % 2 === 0 ? "#fff7ed" : "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 20,
                paddingLeft: 18,
                boxSizing: "border-box",
                opacity: p,
                transform: `translateX(${(1 - p) * -40}px)`,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  background: COLORS.oltp,
                }}
              />
              <div
                style={{
                  fontFamily: "Consolas, monospace",
                  fontSize: 28,
                  color: COLORS.ink,
                  fontWeight: 700,
                  width: 120,
                }}
              >
                {id}
              </div>
              <div
                style={{
                  width: 300 - (i % 3) * 50,
                  height: 14,
                  borderRadius: 7,
                  background: "#fdba74",
                }}
              />
            </div>
          );
        })}
      </Card>

      <div
        style={{
          position: "absolute",
          left: 880,
          top: 460,
          width: 160,
          height: 90,
          borderRadius: 45,
          background: COLORS.gold,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 56,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: arrowP,
          transform: `scale(${arrowP})`,
          boxShadow: "0 12px 30px rgba(245,158,11,0.45)",
        }}
      >
        →
      </div>

      <Card
        style={{
          left: 980,
          top: 240,
          width: 780,
          height: 520,
          border: `3px solid ${COLORS.bi}`,
          opacity: rightP,
          transform: `translateY(${(1 - rightP) * 40}px)`,
        }}
      >
        <div style={{ position: "absolute", left: 40, top: 26 }}>
          <Tag text="Dirangkum per hari" color={COLORS.bi} p={1} size={32} />
        </div>
        {days.map((d, i) => {
          const p = pop(frame, r(295.0) + i * 12, fps);
          return (
            <div
              key={d.label}
              style={{
                position: "absolute",
                left: 40,
                top: 130 + i * 118,
                width: 700,
                height: 92,
                borderRadius: 18,
                background: "#ecfdf5",
                display: "flex",
                alignItems: "center",
                gap: 24,
                paddingLeft: 26,
                boxSizing: "border-box",
                opacity: p,
                transform: `translateX(${(1 - p) * 40}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 34,
                  fontWeight: 800,
                  color: COLORS.bi,
                  width: 130,
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  width: d.w * 0.95,
                  height: 36,
                  borderRadius: 18,
                  background: COLORS.bi,
                  maxWidth: 500,
                }}
              />
            </div>
          );
        })}
      </Card>

      <Card
        style={{
          left: 260,
          top: 810,
          width: 1400,
          height: 120,
          border: `3px solid ${COLORS.dw}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          opacity: bannerP,
          transform: `translateY(${(1 - bannerP) * 30}px)`,
        }}
      >
        <Target size={70} color={COLORS.dw} />
        <div
          style={{
            fontFamily: FONT,
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.ink,
          }}
        >
          Tingkat rincian ditentukan sesuai{" "}
          <span
            style={{
              color: interpolate(keyP, [0, 1], [0, 1]) > 0.5 ? COLORS.dw : COLORS.ink,
              fontWeight: 900,
              textDecoration: keyP > 0.5 ? "underline" : "none",
            }}
          >
            kebutuhan analisis
          </span>
        </div>
      </Card>
    </>
  );
};

/* ================= Scene 5 ================= */
export const Scene5Storage: React.FC = () => (
  <>
    <SceneTag no={SCENE.no} title={SCENE.title} />
    <Beat scene={SCENE} start={T.a} end={T.b}>
      <PanelA />
    </Beat>
    <Beat scene={SCENE} start={T.b} end={T.c}>
      <PanelB />
    </Beat>
    <Beat scene={SCENE} start={T.c} end={T.d}>
      <PanelC />
    </Beat>
    <Beat scene={SCENE} start={T.d} end={T.g}>
      <PanelD />
    </Beat>
    <Beat scene={SCENE} start={T.g} end={T.h}>
      <PanelG />
    </Beat>
    <Beat scene={SCENE} start={T.h}>
      <PanelH />
    </Beat>
  </>
);