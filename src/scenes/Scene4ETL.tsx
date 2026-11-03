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
import { fade, local, pop } from "../anim";
import { Beat } from "../components/Beat";
import { Card, SceneTag } from "../components/Chrome";
import {
  Arrow,
  DashboardIcon,
  DbIcon,
  Gear,
  Product,
  WarehouseIcon,
} from "../components/Art";
import { Clock } from "../components/Art2";
import {
  Checkpoint,
  FileIcon,
  Funnel,
  Magnifier,
  Packet,
  ShieldCheck,
  Target,
  Wrench,
} from "../components/Art3";

const SCENE = getScene("etl");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);

// Awal tiap bagian narasi (detik absolut)
const T = {
  a: 124.83,
  b: 130.94,
  c: 142.47,
  d: 149.58,
  e: 157.18,
  f: 164.22,
  g: 168.25,
  h: 170.94,
  i: 178.22,
  j: 183.02,
  k: 186.88,
  l: 194.83,
  m: 199.41,
  n: 204.54,
  o: 214.99,
  p: 221.6,
  q: 224.13,
  r: 229.42,
  s: 233.75,
};

const rel = (t: number, s: number): number => Math.round((t - s) * FPS);
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const CHIP_TEXTS = [
  "Rp 9.500",
  "2 pcs",
  "07:42",
  "#0231",
  "Air mineral",
  "Roti",
  "12/03",
  "x1",
  "Rp 24.000",
  "3 pcs",
  "15:08",
  "#0232",
];

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

const TagAt: React.FC<{
  cx: number;
  top: number;
  text: string;
  color: string;
  p: number;
  size?: number;
  solid?: boolean;
}> = ({ cx, top, ...rest }) => (
  <div
    style={{
      position: "absolute",
      left: cx - 300,
      width: 600,
      top,
      textAlign: "center",
    }}
  >
    <Tag {...rest} />
  </div>
);

const LabelAt: React.FC<{
  cx: number;
  top: number;
  text: string;
  color: string;
  p: number;
  size?: number;
}> = ({ cx, top, text, color, p, size = 38 }) => (
  <div
    style={{
      position: "absolute",
      left: cx - 300,
      width: 600,
      top,
      textAlign: "center",
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 800,
      color,
      opacity: p,
      transform: `translateY(${(1 - p) * 14}px)`,
    }}
  >
    {text}
  </div>
);

const DownArrow: React.FC<{
  x: number;
  y: number;
  p: number;
  color: string;
}> = ({ x, y, p, color }) => (
  <>
    <div
      style={{
        position: "absolute",
        left: x - 4,
        top: y,
        width: 8,
        height: 60 * p,
        background: color,
        borderRadius: 4,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: x - 14,
        top: y + 60,
        width: 0,
        height: 0,
        borderLeft: "14px solid transparent",
        borderRight: "14px solid transparent",
        borderTop: `20px solid ${color}`,
        opacity: p >= 1 ? 1 : 0,
      }}
    />
  </>
);

const FlowSvg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    width={1920}
    height={1080}
    style={{ position: "absolute", left: 0, top: 0 }}
  >
    {children}
  </svg>
);

/* ================= Pelacak tahap (kanan atas) ================= */

const STAGES = [
  { label: "Extract", color: COLORS.oltp },
  { label: "Transform", color: COLORS.etl },
  { label: "Load", color: COLORS.dw },
];

const Tracker: React.FC = () => {
  const frame = useCurrentFrame(); // frame lokal scene
  const L = (t: number): number => local(SCENE, t);
  const o = fade(frame, L(T.c), 14);
  const active =
    frame < L(T.g) ? 0 : frame < L(T.n) ? 1 : frame < L(T.p) ? -1 : 2;

  return (
    <div
      style={{
        position: "absolute",
        left: 780,
        top: 70,
        display: "flex",
        gap: 24,
        opacity: o,
        fontFamily: FONT,
      }}
    >
      {STAGES.map((s, i) => {
        const isActive = i === active;
        const isDone = active === 2 ? i < 2 : active === -1 ? i < 2 : i < active;
        return (
          <div
            key={s.label}
            style={{
              width: 290,
              height: 62,
              borderRadius: 31,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              background: isActive ? s.color : isDone ? `${s.color}22` : "#ffffff",
              color: isActive ? "#ffffff" : isDone ? s.color : COLORS.sub,
              border: `3px solid ${isActive || isDone ? s.color : COLORS.line}`,
              transform: `scale(${isActive ? 1.06 : 1})`,
              boxShadow: isActive ? `0 10px 30px ${s.color}66` : "none",
            }}
          >
            {isDone ? "✓ " : String(i + 1) + ". "}
            {s.label}
          </div>
        );
      })}
    </div>
  );
};

/* ================= A: ETL = Extract, Transform, Load ================= */
const PanelA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.a);
  const titleP = pop(frame, r(125.0), fps);
  const chipP = fade(frame, r(126.4), 12);
  const ring = 1 + 0.04 * Math.sin(frame / 12);
  const words = [
    { label: "Extract", letter: "E", at: 128.2, color: COLORS.oltp },
    { label: "Transform", letter: "T", at: 129.23, color: COLORS.etl },
    { label: "Load", letter: "L", at: 130.0, color: COLORS.dw },
  ];

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 460,
          top: 90,
          width: 1000,
          height: 1000,
          borderRadius: 500,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18), rgba(124,58,237,0) 66%)",
          opacity: titleP,
          transform: `scale(${ring})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 220,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 300,
          fontWeight: 900,
          letterSpacing: 10,
          color: COLORS.etl,
          opacity: titleP,
          transform: `scale(${0.85 + 0.15 * titleP})`,
        }}
      >
        ETL
      </div>
      <ChipLabel text="SINGKATAN DARI" p={chipP} top={585} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 670,
          display: "flex",
          justifyContent: "center",
          gap: 36,
          fontFamily: FONT,
        }}
      >
        {words.map((w) => {
          const p = pop(frame, r(w.at), fps);
          return (
            <div
              key={w.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "12px 38px 12px 16px",
                borderRadius: 60,
                background: w.color,
                color: "#ffffff",
                fontSize: 62,
                fontWeight: 800,
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p})`,
                boxShadow: "0 16px 40px rgba(15,39,71,0.18)",
              }}
            >
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 42,
                  background: "#ffffff",
                  color: w.color,
                  fontSize: 54,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {w.letter}
              </div>
              {w.label}
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ================= B: penghubung + mengambil, mengolah, memasukkan ================= */
const PanelB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b);
  const etlP = pop(frame, 2, fps);
  const dbP = pop(frame, r(132.1), fps);
  const whP = pop(frame, r(133.7), fps);
  const a1 = interpolate(frame, [r(132.8), r(133.4)], [0, 1], clamp);
  const a2 = interpolate(frame, [r(133.9), r(134.5)], [0, 1], clamp);
  const capA = pop(frame, r(136.3), fps);
  const capB = pop(frame, r(137.41), fps);
  const capC = pop(frame, r(138.36), fps);
  const forP = pop(frame, r(139.9), fps);

  const packets = [0, 1, 2].map((i) => {
    const t0 = r(136.3 + i * 0.35);
    return interpolate(frame, [t0, t0 + 96], [0, 1], clamp);
  });
  const inZone = packets.some((q) => {
    const x = lerp(420, 1500, q);
    return q > 0 && q < 1 && x > 800 && x < 1130;
  });

  return (
    <>
      <FlowSvg>
        <Arrow x1={500} x2={790} y={520} progress={a1} color={COLORS.sub} width={10} />
        <Arrow x1={1130} x2={1410} y={520} progress={a2} color={COLORS.sub} width={10} />
      </FlowSvg>

      <div
        style={{
          position: "absolute",
          left: 210,
          top: 380,
          opacity: dbP,
          transform: `scale(${0.8 + 0.2 * dbP})`,
        }}
      >
        <DbIcon size={240} color={COLORS.oltp} />
      </div>
      <LabelAt cx={330} top={690} text="Sistem operasional" color={COLORS.oltp} p={dbP} size={36} />

      <div
        style={{
          position: "absolute",
          left: 800,
          top: 360,
          width: 320,
          height: 320,
          borderRadius: 48,
          background: "#f5f3ff",
          border: `5px solid ${COLORS.etl}`,
          boxShadow: `0 0 0 ${inZone ? 14 : 0}px ${COLORS.etl}33`,
          opacity: etlP,
          transform: `scale(${0.8 + 0.2 * etlP})`,
        }}
      >
        <div style={{ position: "absolute", left: 30, top: 100 }}>
          <Gear size={170} color={COLORS.etl} rotate={frame * 1.8} />
        </div>
        <div style={{ position: "absolute", left: 170, top: 36 }}>
          <Gear size={112} color="#a78bfa" rotate={-frame * 2.7 + 14} teeth={8} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 255,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.etl,
          }}
        >
          ETL
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 1420,
          top: 360,
          opacity: whP,
          transform: `scale(${0.8 + 0.2 * whP})`,
        }}
      >
        <WarehouseIcon size={340} color={COLORS.dw} />
      </div>
      <LabelAt cx={1590} top={690} text="Data Warehouse" color={COLORS.dw} p={whP} size={36} />

      {packets.map((q, i) => {
        const x = lerp(420, 1500, q);
        const color = x < 800 ? COLORS.oltp : x < 1130 ? COLORS.etl : COLORS.dw;
        const o = interpolate(q, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 28,
              top: 520 - 28 + Math.sin(q * 20 + i) * 4,
              opacity: o,
            }}
          >
            <Packet size={56} color={color} />
          </div>
        );
      })}

      <TagAt cx={640} top={430} text="Mengambil" color={COLORS.oltp} p={capA} />
      <TagAt cx={960} top={270} text="Mengolah" color={COLORS.etl} p={capB} />
      <TagAt cx={1270} top={430} text="Memasukkan" color={COLORS.dw} p={capC} />
      <TagAt cx={1590} top={290} text="Untuk analisis" color={COLORS.bi} p={forP} />
    </>
  );
};

/* ================= C: Extract = mengambil data dari sumber operasional ================= */
const PanelC: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.c);
  const chipP = fade(frame, 2, 12);
  const wordP = pop(frame, r(142.7), fps);
  const funnelP = pop(frame, r(144.6), fps);
  const dbP = pop(frame, r(146.2), fps);
  const a1 = interpolate(frame, [r(146.4), r(146.9)], [0, 1], clamp);
  const a2 = interpolate(frame, [r(147.6), r(148.1)], [0, 1], clamp);
  const outP = [0, 1, 2].map((i) => pop(frame, r(148.0 + i * 0.2), fps));
  const labelP = pop(frame, r(148.0), fps);

  return (
    <>
      <ChipLabel text="TAHAP PERTAMA" p={chipP} top={190} color={COLORS.oltp} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 190,
          fontWeight: 900,
          color: COLORS.oltp,
          opacity: wordP,
          transform: `scale(${0.85 + 0.15 * wordP})`,
        }}
      >
        Extract
      </div>

      <FlowSvg>
        <Arrow x1={560} x2={835} y={700} progress={a1} color={COLORS.sub} width={10} />
        <Arrow x1={1090} x2={1350} y={700} progress={a2} color={COLORS.sub} width={10} />
      </FlowSvg>

      <div
        style={{
          position: "absolute",
          left: 330,
          top: 600,
          opacity: dbP,
          transform: `scale(${0.8 + 0.2 * dbP})`,
        }}
      >
        <DbIcon size={180} color={COLORS.oltp} />
      </div>
      <LabelAt cx={420} top={820} text="Sumber operasional" color={COLORS.oltp} p={dbP} size={34} />

      <div
        style={{
          position: "absolute",
          left: 850,
          top: 590,
          width: 220,
          height: 220,
          borderRadius: 44,
          background: "#fff7ed",
          border: `5px solid ${COLORS.oltp}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: funnelP,
          transform: `scale(${0.8 + 0.2 * funnelP})`,
        }}
      >
        <Funnel size={130} color={COLORS.oltp} />
      </div>

      {[0, 1, 2].map((i) => {
        const t0 = r(146.8 + i * 0.3);
        const q = interpolate(frame, [t0, t0 + 30], [0, 1], clamp);
        const o = interpolate(q, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
        return (
          <div
            key={"p" + i}
            style={{
              position: "absolute",
              left: lerp(540, 850, q) - 28,
              top: 700 - 28,
              opacity: o,
            }}
          >
            <Packet size={56} color={COLORS.oltp} />
          </div>
        );
      })}

      {outP.map((p, i) => (
        <div
          key={"o" + i}
          style={{
            position: "absolute",
            left: 1380 + i * 90,
            top: 668,
            opacity: p,
            transform: `scale(${p})`,
          }}
        >
          <Packet size={64} color={COLORS.oltp} />
        </div>
      ))}
      <LabelAt cx={1470} top={820} text="Data yang relevan" color={COLORS.oltp} p={labelP} size={34} />
    </>
  );
};

/* ================= D: sumber data minimarket ================= */
const SOURCES = [
  { label: "Database penjualan", at: 151.9, color: COLORS.oltp, kind: "db" },
  { label: "Database produk", at: 153.17, color: COLORS.dw, kind: "db" },
  { label: "Database pelanggan", at: 154.37, color: COLORS.etl, kind: "db" },
  { label: "File eksternal", at: 155.7, color: COLORS.gold, kind: "file" },
];

const PanelD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.d);
  const headP = fade(frame, 2, 14);
  const barP = pop(frame, r(150.7), fps);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 190,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 46,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: headP,
        }}
      >
        Pada minimarket, sumbernya dapat berupa:
      </div>

      {SOURCES.map((s, i) => {
        const left = 150 + i * 420;
        const p = pop(frame, r(s.at), fps);
        const ap = interpolate(frame, [r(s.at) + 6, r(s.at) + 22], [0, 1], clamp);
        return (
          <React.Fragment key={s.label}>
            <Card
              style={{
                left,
                top: 290,
                width: 360,
                height: 380,
                border: `3px solid ${s.color}`,
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px) scale(${0.92 + 0.08 * p})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 40,
                  height: 210,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s.kind === "db" ? (
                  <DbIcon size={170} color={s.color} />
                ) : (
                  <FileIcon size={150} color={s.color} />
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 285,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontSize: 32,
                  fontWeight: 800,
                  color: COLORS.ink,
                }}
              >
                {s.label}
              </div>
            </Card>
            <DownArrow x={left + 180} y={690} p={ap} color={COLORS.oltp} />
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 150,
          top: 795,
          width: 1620,
          height: 90,
          borderRadius: 24,
          background: COLORS.oltp,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 46,
          fontWeight: 900,
          letterSpacing: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: barP,
          transform: `scaleX(${0.9 + 0.1 * barP})`,
          boxShadow: "0 16px 40px rgba(249,115,22,0.35)",
        }}
      >
        EXTRACT
      </div>
    </>
  );
};

/* ================= E: tidak semua data diambil, hanya yang sesuai tujuan ================= */
const SEL = [0, 2, 5, 7, 9, 11];

const PanelE: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.e);
  const cardP = pop(frame, 2, fps);
  const dimP = fade(frame, r(158.0), 14);
  const noP = pop(frame, r(158.0), fps);
  const targetP = pop(frame, r(161.5), fps);
  const tiles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <Card
      style={{
        left: 300,
        top: 250,
        width: 1320,
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
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Data dari sumber operasional
      </div>

      {tiles.map((i) => {
        const c = i % 4;
        const rw = Math.floor(i / 4);
        const p = pop(frame, 6 + i * 3, fps);
        const k = SEL.indexOf(i);
        const isSel = k >= 0;
        const hl = isSel ? fade(frame, r(159.9) + k * 4, 12) : 0;
        const o = p * (isSel ? 1 : 1 - 0.72 * dimP);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 60 + c * 310,
              top: 110 + rw * 132,
              width: 270,
              height: 96,
              borderRadius: 20,
              background: hl > 0.5 ? "#ecfdf5" : "#ffffff",
              border: `3px solid ${hl > 0.5 ? COLORS.bi : "#d6e0ee"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Consolas, monospace",
              fontSize: 32,
              color: hl > 0.5 ? COLORS.bi : COLORS.sub,
              fontWeight: 700,
              opacity: o,
              transform: `scale(${0.7 + 0.3 * p})`,
            }}
          >
            {CHIP_TEXTS[i]}
            {isSel && (
              <div
                style={{
                  position: "absolute",
                  right: -12,
                  top: -14,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: COLORS.bi,
                  color: "#ffffff",
                  fontSize: 26,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: hl,
                }}
              >
                ✓
              </div>
            )}
            {!isSel && (
              <div
                style={{
                  position: "absolute",
                  right: -12,
                  top: -14,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: COLORS.warn,
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: dimP,
                }}
              >
                ✕
              </div>
            )}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 515,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 800,
          color: COLORS.warn,
          opacity: noP,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            background: COLORS.warn,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
          }}
        >
          ✕
        </div>
        Tidak semua data diambil
      </div>
      <div
        style={{
          position: "absolute",
          left: 700,
          top: 508,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 800,
          color: COLORS.bi,
          opacity: targetP,
          transform: `scale(${0.8 + 0.2 * targetP})`,
          transformOrigin: "left center",
        }}
      >
        <Target size={66} color={COLORS.bi} />
        Sesuai tujuan analisis
      </div>
    </Card>
  );
};

/* ================= F: masih dalam bentuk aslinya ================= */
const RAW_ROWS = [
  { a: "12/03/2026", b: "Air mineral", c: "2" },
  { a: "2026-03-12", b: "roti", c: "1" },
  { a: "12 Mar 2026", b: "Air mineral", c: "" },
];

const PanelF: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.f);
  const cardP = pop(frame, 2, fps);
  const stampP = pop(frame, r(165.47), fps);
  const cols = [
    { head: "Tanggal", left: 50, width: 380 },
    { head: "Produk", left: 450, width: 400 },
    { head: "Jumlah", left: 870, width: 280 },
  ];

  return (
    <Card
      style={{
        left: 360,
        top: 250,
        width: 1200,
        height: 580,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 30,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.oltp,
        }}
      >
        Hasil Extract
      </div>
      {cols.map((c) => (
        <div
          key={c.head}
          style={{
            position: "absolute",
            left: c.left,
            top: 110,
            width: c.width,
            height: 60,
            borderRadius: 14,
            background: "#fff3e6",
            color: COLORS.oltp,
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            paddingLeft: 22,
            boxSizing: "border-box",
          }}
        >
          {c.head}
        </div>
      ))}
      {RAW_ROWS.map((row, i) => {
        const p = fade(frame, 14 + i * 9, 12);
        const vals = [row.a, row.b, row.c];
        return (
          <React.Fragment key={i}>
            {cols.map((c, ci) => (
              <div
                key={ci}
                style={{
                  position: "absolute",
                  left: c.left,
                  top: 190 + i * 86,
                  width: c.width,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 22,
                  boxSizing: "border-box",
                  fontFamily: "Consolas, monospace",
                  fontSize: 34,
                  color: COLORS.ink,
                  background: i % 2 === 0 ? "#f8fafc" : "#ffffff",
                  borderRadius: 12,
                  opacity: p,
                }}
              >
                {vals[ci]}
              </div>
            ))}
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 470,
          padding: "12px 34px",
          borderRadius: 20,
          border: `6px dashed ${COLORS.warn}`,
          color: COLORS.warn,
          fontFamily: FONT,
          fontSize: 52,
          fontWeight: 900,
          background: "rgba(255,255,255,0.9)",
          opacity: stampP,
          transform: `rotate(-5deg) scale(${1.4 - 0.4 * stampP})`,
        }}
      >
        Bentuk aslinya
      </div>
    </Card>
  );
};

/* ================= Judul tahap (Transform / Load) ================= */
const StageTitle: React.FC<{
  chip: string;
  word: string;
  color: string;
  icon: React.ReactNode;
  startT: number;
  wordAt: number;
  iconAt: number;
}> = ({ chip, word, color, icon, startT, wordAt, iconAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, startT);
  const chipP = fade(frame, 2, 12);
  const wordP = pop(frame, r(wordAt), fps);
  const iconP = pop(frame, r(iconAt), fps);
  return (
    <>
      <ChipLabel text={chip} p={chipP} top={190} color={color} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 210,
          fontWeight: 900,
          color,
          opacity: wordP,
          transform: `scale(${0.85 + 0.15 * wordP})`,
        }}
      >
        {word}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 570,
          display: "flex",
          justifyContent: "center",
          opacity: iconP,
          transform: `scale(${0.8 + 0.2 * iconP})`,
        }}
      >
        {icon}
      </div>
    </>
  );
};

const PanelG: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <StageTitle
      chip="TAHAP KEDUA"
      word="Transform"
      color={COLORS.etl}
      icon={<Gear size={260} color={COLORS.etl} rotate={frame * 2} />}
      startT={T.g}
      wordAt={169.76}
      iconAt={169.9}
    />
  );
};

const PanelP: React.FC = () => (
  <StageTitle
    chip="TAHAP KETIGA"
    word="Load"
    color={COLORS.dw}
    icon={<WarehouseIcon size={330} color={COLORS.dw} />}
    startT={T.p}
    wordAt={223.2}
    iconAt={223.3}
  />
);

/* ================= H: format dan struktur yang konsisten ================= */
const PanelH: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.h);
  const gearP = pop(frame, r(172.0), fps);
  const a1 = interpolate(frame, [r(171.8), r(172.3)], [0, 1], clamp);
  const a2 = interpolate(frame, [r(172.7), r(173.2)], [0, 1], clamp);
  const raw = Array.from({ length: 9 }, (_, i) => i);
  const pills = [
    { t: "Format", at: 173.1, c: COLORS.dw },
    { t: "Struktur", at: 174.3, c: COLORS.oltp },
    { t: "Konsisten", at: 175.2, c: COLORS.etl },
    { t: "Siap dianalisis", at: 176.5, c: COLORS.bi },
  ];

  return (
    <>
      {raw.map((i) => {
        const p = pop(frame, 4 + i * 2, fps);
        const x = 150 + random("hx" + i) * 380;
        const y = 330 + random("hy" + i) * 300;
        const rot = (random("hr" + i) - 0.5) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              padding: "8px 16px",
              borderRadius: 12,
              background: "#ffffff",
              border: "2px solid #d6e0ee",
              fontFamily: "Consolas, monospace",
              fontSize: 26,
              color: COLORS.sub,
              opacity: p,
              transform: `rotate(${rot}deg) scale(${0.6 + 0.4 * p})`,
            }}
          >
            {CHIP_TEXTS[i]}
          </div>
        );
      })}

      <FlowSvg>
        <Arrow x1={700} x2={830} y={520} progress={a1} color={COLORS.sub} width={10} />
        <Arrow x1={1100} x2={1225} y={520} progress={a2} color={COLORS.sub} width={10} />
      </FlowSvg>

      <div
        style={{
          position: "absolute",
          left: 830,
          top: 390,
          opacity: gearP,
          transform: `scale(${0.8 + 0.2 * gearP})`,
        }}
      >
        <Gear size={260} color={COLORS.etl} rotate={frame * 2.2} />
      </div>

      {raw.map((i) => {
        const p = pop(frame, r(173.0) + i * 5, fps);
        return (
          <div
            key={"t" + i}
            style={{
              position: "absolute",
              left: 1240 + (i % 3) * 180,
              top: 340 + Math.floor(i / 3) * 110,
              width: 160,
              height: 90,
              borderRadius: 16,
              background: "#f5f3ff",
              border: `3px solid ${COLORS.etl}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Consolas, monospace",
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.etl,
              opacity: p,
              transform: `scale(${0.6 + 0.4 * p})`,
            }}
          >
            {CHIP_TEXTS[i]}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 800,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {pills.map((pl) => (
          <Tag
            key={pl.t}
            text={pl.t}
            color={pl.c}
            p={pop(frame, r(pl.at), fps)}
            size={36}
          />
        ))}
      </div>
    </>
  );
};

/* ================= I: tanggal diseragamkan ================= */
const PanelI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.i);
  const cardP = pop(frame, 2, fps);
  const inputs = ["12/03/2026", "2026-03-12", "12 Mar 2026"];
  const inAt = [179.11, 179.9, 180.7];
  const outAt = [181.8, 182.05, 182.3];
  const tagP = pop(frame, r(181.8), fps);

  return (
    <Card
      style={{
        left: 360,
        top: 250,
        width: 1200,
        height: 580,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 30,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Tanggal transaksi
      </div>
      {inputs.map((txt, i) => {
        const ip = pop(frame, r(inAt[i]), fps);
        const op = pop(frame, r(outAt[i]), fps);
        return (
          <React.Fragment key={txt}>
            <div
              style={{
                position: "absolute",
                left: 80,
                top: 110 + i * 130,
                width: 420,
                height: 100,
                borderRadius: 22,
                border: `3px solid ${COLORS.warn}`,
                background: "#fff1f2",
                color: "#be123c",
                fontFamily: "Consolas, monospace",
                fontSize: 44,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: ip,
                transform: `translateX(${(1 - ip) * -60}px)`,
              }}
            >
              {txt}
            </div>
            <div
              style={{
                position: "absolute",
                left: 520,
                top: 110 + i * 130,
                width: 160,
                height: 100,
                textAlign: "center",
                lineHeight: "100px",
                fontSize: 64,
                color: COLORS.sub,
                fontFamily: FONT,
                opacity: op,
              }}
            >
              →
            </div>
            <div
              style={{
                position: "absolute",
                left: 700,
                top: 110 + i * 130,
                width: 420,
                height: 100,
                borderRadius: 22,
                border: `3px solid ${COLORS.bi}`,
                background: "#ecfdf5",
                color: COLORS.bi,
                fontFamily: "Consolas, monospace",
                fontSize: 44,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                opacity: op,
                transform: `translateX(${(1 - op) * 60}px)`,
              }}
            >
              12/03/2026 <span style={{ fontFamily: FONT }}>✓</span>
            </div>
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 500,
          textAlign: "center",
        }}
      >
        <Tag text="Diseragamkan" color={COLORS.bi} p={tagP} size={34} />
      </div>
    </Card>
  );
};

/* ================= J: data duplikat atau kosong ================= */
const PanelJ: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.j);
  const cardP = pop(frame, 2, fps);
  const dupP = pop(frame, r(183.5), fps);
  const emptyP = pop(frame, r(184.4), fps);
  const handled = fade(frame, r(185.2), 14);
  const rows = [
    { name: "Air mineral", qty: "2" },
    { name: "Air mineral", qty: "2" },
    { name: "Roti", qty: "" },
  ];

  return (
    <Card
      style={{
        left: 360,
        top: 250,
        width: 1200,
        height: 580,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 30,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Pemeriksaan data
      </div>
      {rows.map((row, i) => {
        const isDup = i === 1;
        const isEmpty = i === 2;
        const rowO = isDup ? 1 - 0.7 * handled : 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 50,
              top: 120 + i * 130,
              width: 1100,
              height: 100,
              borderRadius: 20,
              background: "#f8fafc",
              border: `3px solid ${
                isDup && dupP > 0.5 && handled < 0.5
                  ? COLORS.warn
                  : isEmpty && emptyP > 0.5 && handled < 0.5
                  ? COLORS.gold
                  : "#e3ebf6"
              }`,
              display: "flex",
              alignItems: "center",
              fontFamily: FONT,
              opacity: rowO,
            }}
          >
            <div
              style={{
                width: 420,
                paddingLeft: 30,
                fontSize: 40,
                fontWeight: 800,
                color: COLORS.ink,
                textDecoration: isDup && handled > 0.5 ? "line-through" : "none",
              }}
            >
              {row.name}
            </div>
            <div
              style={{
                width: 200,
                fontSize: 44,
                fontWeight: 900,
                color: COLORS.ink,
                textAlign: "center",
              }}
            >
              {isEmpty ? (
                <div
                  style={{
                    width: 90,
                    height: 54,
                    margin: "0 auto",
                    borderRadius: 12,
                    border: `3px dashed ${handled > 0.5 ? COLORS.bi : COLORS.gold}`,
                    background: handled > 0.5 ? "#ecfdf5" : "#fffbeb",
                  }}
                />
              ) : (
                row.qty
              )}
            </div>
            <div style={{ flex: 1, textAlign: "right", paddingRight: 30 }}>
              {isDup && (
                <Tag
                  text={handled > 0.5 ? "Dihapus" : "Duplikat"}
                  color={handled > 0.5 ? COLORS.sub : COLORS.warn}
                  p={dupP}
                  size={32}
                />
              )}
              {isEmpty && (
                <Tag
                  text={handled > 0.5 ? "✓ Ditangani" : "Kosong"}
                  color={handled > 0.5 ? COLORS.bi : COLORS.gold}
                  p={emptyP}
                  size={32}
                />
              )}
            </div>
          </div>
        );
      })}
    </Card>
  );
};

/* ================= K: satu produk, dua kode ================= */
const PanelK: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.k);
  const aP = pop(frame, r(186.95), fps);
  const bP = pop(frame, r(187.4), fps);
  const codeA = pop(frame, r(188.3), fps);
  const codeB = pop(frame, r(188.7), fps);
  const sameAt = r(190.3);
  const same = fade(frame, sameAt, 12);
  const eqP = fade(frame, r(192.5), 8);
  const neqP = fade(frame, r(188.9), 8) * (1 - eqP);
  const tagP = pop(frame, r(192.6), fps);

  const sysCard = (
    left: number,
    title: string,
    p: number,
    codeP: number,
    code: string
  ) => (
    <Card
      style={{
        left,
        top: 300,
        width: 560,
        height: 420,
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 26,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.sub,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 90,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Product type="water" size={130} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 228,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Air mineral
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 310,
          width: 280,
          height: 72,
          borderRadius: 18,
          border: `3px solid ${same > 0.5 ? COLORS.bi : COLORS.warn}`,
          background: same > 0.5 ? "#ecfdf5" : "#fff1f2",
          color: same > 0.5 ? COLORS.bi : "#be123c",
          fontFamily: "Consolas, monospace",
          fontSize: 42,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: codeP,
          transform: `scale(${0.7 + 0.3 * codeP})`,
        }}
      >
        {same > 0.5 ? "AM-01" : code}
      </div>
    </Card>
  );

  return (
    <>
      {sysCard(220, "Sistem A", aP, codeA, "A-001")}
      {sysCard(1140, "Sistem B", bP, codeB, "AM-01")}
      <div
        style={{
          position: "absolute",
          left: 910,
          top: 580,
          width: 100,
          height: 100,
          borderRadius: 50,
          background: eqP > 0.5 ? COLORS.bi : COLORS.warn,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 66,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: Math.max(neqP, eqP),
          transform: `scale(${0.7 + 0.3 * Math.max(neqP, eqP)})`,
        }}
      >
        {eqP > 0.5 ? "=" : "≠"}
      </div>
      <TagAt
        cx={960}
        top={790}
        text="Dikenali sebagai produk yang sama"
        color={COLORS.bi}
        p={tagP}
        size={38}
      />
    </>
  );
};

/* ================= L: perhitungan nilai untuk analisis ================= */
const PanelL: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.l);
  const cardP = pop(frame, 2, fps);
  const newP = pop(frame, r(196.5), fps);
  const tagP = pop(frame, r(198.0), fps);
  const cols = [
    { head: "Jumlah barang", left: 60, width: 320 },
    { head: "Harga", left: 400, width: 320 },
  ];

  return (
    <Card
      style={{
        left: 360,
        top: 250,
        width: 1200,
        height: 580,
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
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Perhitungan nilai
      </div>
      {cols.map((c) => (
        <React.Fragment key={c.head}>
          <div
            style={{
              position: "absolute",
              left: c.left,
              top: 110,
              width: c.width,
              height: 60,
              borderRadius: 14,
              background: "#f1f5fb",
              color: COLORS.sub,
              fontFamily: FONT,
              fontSize: 28,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              paddingLeft: 22,
              boxSizing: "border-box",
            }}
          >
            {c.head}
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: c.left + 22,
                top: 206 + i * 90,
                width: 200,
                height: 20,
                borderRadius: 10,
                background: "#cbd5e1",
              }}
            />
          ))}
        </React.Fragment>
      ))}

      <div
        style={{
          position: "absolute",
          left: 760,
          top: 110,
          width: 380,
          height: 60,
          borderRadius: 14,
          background: COLORS.etl,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 26,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          paddingLeft: 22,
          boxSizing: "border-box",
          opacity: newP,
          transform: `translateX(${(1 - newP) * 80}px)`,
        }}
      >
        Σ Nilai hasil perhitungan
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={"n" + i}
          style={{
            position: "absolute",
            left: 782,
            top: 206 + i * 90,
            width: 240,
            height: 20,
            borderRadius: 10,
            background: COLORS.etl,
            opacity: newP,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 490,
          textAlign: "center",
        }}
      >
        <Tag text="Dibutuhkan untuk analisis" color={COLORS.etl} p={tagP} size={34} />
      </div>
    </Card>
  );
};

/* ================= M: bersih, terstruktur, konsisten ================= */
const BersihIcon: React.FC = () => (
  <svg width={170} height={170} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="38" fill={COLORS.bi} />
    <path
      d="M32 52 l12 12 l24 -26"
      stroke="#ffffff"
      strokeWidth="9"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M84 10 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" fill={COLORS.gold} />
    <path d="M14 74 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2z" fill={COLORS.gold} />
  </svg>
);

const GridIcon: React.FC = () => (
  <svg width={170} height={170} viewBox="0 0 100 100">
    {[0, 1, 2].map((r1) =>
      [0, 1, 2].map((c1) => (
        <rect
          key={r1 + "-" + c1}
          x={12 + c1 * 30}
          y={12 + r1 * 30}
          width={24}
          height={24}
          rx={5}
          fill={COLORS.etl}
        />
      ))
    )}
  </svg>
);

const EqualIcon: React.FC = () => (
  <svg width={170} height={170} viewBox="0 0 100 100">
    {[22, 43, 64].map((y) => (
      <rect key={y} x={12} y={y} width={76} height={14} rx={7} fill={COLORS.dw} />
    ))}
  </svg>
);

const PanelM: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.m);
  const headP = pop(frame, 4, fps);
  const items = [
    { t: "Bersih", at: 200.56, color: COLORS.bi, icon: <BersihIcon /> },
    { t: "Terstruktur", at: 202.31, color: COLORS.etl, icon: <GridIcon /> },
    { t: "Konsisten", at: 203.2, color: COLORS.dw, icon: <EqualIcon /> },
  ];

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 190,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 60,
          fontWeight: 900,
          color: COLORS.ink,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 24}px)`,
        }}
      >
        Dengan <span style={{ color: COLORS.etl }}>Transform</span>, data menjadi
      </div>
      {items.map((it, i) => {
        const p = pop(frame, r(it.at), fps);
        return (
          <Card
            key={it.t}
            style={{
              left: 180 + i * 540,
              top: 340,
              width: 480,
              height: 420,
              border: `3px solid ${it.color}`,
              opacity: p,
              transform: `translateY(${(1 - p) * 50}px) scale(${0.9 + 0.1 * p})`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 60,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {it.icon}
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 280,
                textAlign: "center",
                fontFamily: FONT,
                fontSize: 54,
                fontWeight: 900,
                color: it.color,
              }}
            >
              {it.t}
            </div>
          </Card>
        );
      })}
    </>
  );
};

/* ================= N: Staging Area ================= */
const PanelN: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.n);
  const chipP = fade(frame, 4, 12);
  const srcP = pop(frame, r(205.5), fps);
  const stP = pop(frame, r(207.0), fps);
  const stLabel = pop(frame, r(207.6), fps);
  const chkP = pop(frame, r(211.4), fps);
  const whP = pop(frame, r(212.2), fps);
  const whLabel = pop(frame, r(213.3), fps);
  const a1 = interpolate(frame, [r(206.4), r(206.9)], [0, 1], clamp);
  const a2 = interpolate(frame, [r(212.5), r(213.0)], [0, 1], clamp);
  const open = interpolate(frame, [r(212.2), r(212.9)], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const ins = [0, 1, 2].map((i) => {
    const t0 = r(207.0 + i * 0.3);
    return interpolate(frame, [t0, t0 + 30], [0, 1], clamp);
  });
  const outs = [0, 1, 2].map((i) => {
    const t0 = r(212.9 + i * 0.3);
    return interpolate(frame, [t0, t0 + 36], [0, 1], clamp);
  });

  return (
    <>
      <ChipLabel text="DALAM PROSES ETL" p={chipP} top={170} color={COLORS.etl} />

      <FlowSvg>
        <Arrow x1={430} x2={770} y={520} progress={a1} color={COLORS.sub} width={10} />
        <Arrow x1={1140} x2={1430} y={520} progress={a2} color={COLORS.sub} width={10} />
      </FlowSvg>

      <div
        style={{
          position: "absolute",
          left: 220,
          top: 410,
          opacity: srcP,
          transform: `scale(${0.8 + 0.2 * srcP})`,
        }}
      >
        <DbIcon size={190} color={COLORS.oltp} />
      </div>
      <LabelAt cx={315} top={690} text="Sumber data" color={COLORS.oltp} p={srcP} size={34} />

      <div
        style={{
          position: "absolute",
          left: 790,
          top: 360,
          opacity: stP,
          transform: `scale(${0.8 + 0.2 * stP})`,
          filter: `drop-shadow(0 0 ${stLabel * 16}px rgba(180,83,9,0.45))`,
        }}
      >
        <Checkpoint size={340} color="#b45309" open={open} />
      </div>
      <LabelAt cx={960} top={690} text="Staging Area" color="#b45309" p={stLabel} size={42} />
      <TagAt cx={960} top={760} text="Tempat pemeriksaan" color="#b45309" p={chkP} size={30} solid={false} />

      <div
        style={{
          position: "absolute",
          left: 1450,
          top: 380,
          opacity: whP,
          transform: `scale(${0.8 + 0.2 * whP})`,
        }}
      >
        <WarehouseIcon size={340} color={COLORS.dw} />
      </div>
      <LabelAt cx={1620} top={690} text="Gudang utama" color={COLORS.dw} p={whLabel} size={38} />

      {ins.map((q, i) => (
        <div
          key={"i" + i}
          style={{
            position: "absolute",
            left: lerp(440, 800, q) - 28,
            top: 520 - 28 + (i - 1) * 18,
            opacity: interpolate(q, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <Packet size={56} color={COLORS.oltp} />
        </div>
      ))}
      {outs.map((q, i) => (
        <div
          key={"o" + i}
          style={{
            position: "absolute",
            left: lerp(1140, 1500, q) - 28,
            top: 520 - 28 + (i - 1) * 18,
            opacity: interpolate(q, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <Packet size={56} color={COLORS.dw} />
        </div>
      ))}
    </>
  );
};

/* ================= O: diperiksa, divalidasi, diperbaiki ================= */
const PanelO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.o);
  const stP = pop(frame, 2, fps);
  const warnP = pop(frame, r(219.6), fps);
  const steps = [
    { t: "Diperiksa", at: 215.72, color: COLORS.etl, icon: <Magnifier size={80} color={COLORS.etl} /> },
    { t: "Divalidasi", at: 217.25, color: COLORS.bi, icon: <ShieldCheck size={80} color={COLORS.bi} /> },
    { t: "Diperbaiki", at: 218.4, color: COLORS.oltp, icon: <Wrench size={80} color={COLORS.oltp} /> },
  ];

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 330,
          opacity: stP,
          transform: `scale(${0.8 + 0.2 * stP})`,
        }}
      >
        <Checkpoint size={440} color="#b45309" open={0} />
      </div>
      <LabelAt cx={400} top={720} text="Staging Area" color="#b45309" p={stP} size={44} />

      {steps.map((s, i) => {
        const p = pop(frame, r(s.at), fps);
        return (
          <Card
            key={s.t}
            style={{
              left: 800,
              top: 250 + i * 170,
              width: 900,
              height: 140,
              border: `3px solid ${s.color}`,
              opacity: p,
              transform: `translateX(${(1 - p) * 80}px)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 30,
                top: 38,
                width: 64,
                height: 64,
                borderRadius: 32,
                background: s.color,
                color: "#ffffff",
                fontFamily: FONT,
                fontSize: 36,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </div>
            <div style={{ position: "absolute", left: 130, top: 30 }}>{s.icon}</div>
            <div
              style={{
                position: "absolute",
                left: 250,
                top: 36,
                fontFamily: FONT,
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.ink,
              }}
            >
              {s.t}
            </div>
          </Card>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 800,
          width: 900,
          top: 770,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 800,
          color: COLORS.warn,
          opacity: warnP,
          transform: `scale(${0.9 + 0.1 * warnP})`,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            background: COLORS.warn,
            color: "#ffffff",
            fontSize: 34,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          !
        </div>
        apabila masih ditemukan kesalahan
      </div>
    </>
  );
};

/* ================= Q: memasukkan data ke Data Warehouse ================= */
const PanelQ: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.q);
  const cardP = pop(frame, r(224.3), fps);
  const labelP = pop(frame, r(226.16), fps);
  const a1 = interpolate(frame, [r(226.6), r(227.1)], [0, 1], clamp);
  const whP = pop(frame, r(227.0), fps);
  const whLabel = pop(frame, r(227.33), fps);
  const qs = [0, 1, 2, 3].map((i) => {
    const t0 = r(227.4 + i * 0.25);
    return interpolate(frame, [t0, t0 + 36], [0, 1], clamp);
  });
  const arrived = Math.max(...qs.map((q) => interpolate(q, [0.8, 1], [0, 1], clamp)));

  return (
    <>
      <FlowSvg>
        <Arrow x1={700} x2={1100} y={520} progress={a1} color={COLORS.sub} width={10} />
      </FlowSvg>

      <Card
        style={{
          left: 220,
          top: 330,
          width: 460,
          height: 380,
          border: `3px solid ${COLORS.dw}`,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const p = pop(frame, r(224.5) + i * 4, fps);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 40 + (i % 3) * 135,
                top: 60 + Math.floor(i / 3) * 150,
                opacity: p,
                transform: `scale(${p})`,
              }}
            >
              <Packet size={88} color={COLORS.dw} />
            </div>
          );
        })}
      </Card>
      <LabelAt cx={450} top={735} text="Data yang telah dipersiapkan" color={COLORS.dw} p={labelP} size={32} />

      <div
        style={{
          position: "absolute",
          left: 1130,
          top: 280,
          opacity: whP,
          transform: `scale(${0.8 + 0.2 * whP})`,
          filter: `drop-shadow(0 0 ${arrived * 30}px rgba(37,99,235,0.6))`,
        }}
      >
        <WarehouseIcon size={520} color={COLORS.dw} />
      </div>
      <LabelAt cx={1390} top={760} text="Data Warehouse" color={COLORS.dw} p={whLabel} size={44} />

      {qs.map((q, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: lerp(520, 1300, q) - 28,
            top: 520 - 28 + (i - 1.5) * 26,
            opacity: interpolate(q, [0, 0.05, 0.85, 1], [0, 1, 1, 0]),
          }}
        >
          <Packet size={56} color={COLORS.dw} />
        </div>
      ))}
    </>
  );
};

/* ================= R: dilakukan secara berkala ================= */
const PanelR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.r);
  const whP = pop(frame, 4, fps);
  const berkalaP = pop(frame, r(230.8), fps);
  const butuhP = pop(frame, r(231.9), fps);
  const arrowP = interpolate(frame, [r(229.8), r(230.3)], [0, 1], clamp);

  return (
    <>
      <TagAt cx={700} top={230} text="Dilakukan secara berkala" color={COLORS.dw} p={berkalaP} size={42} />

      <FlowSvg>
        <Arrow x1={1290} x2={1380} y={510} progress={arrowP} color={COLORS.sub} width={10} />
      </FlowSvg>

      {[0, 1, 2, 3, 4].map((i) => {
        const lit = pop(frame, r(229.9 + i * 0.6), fps);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 160 + i * 230,
              top: 410,
              width: 190,
              height: 230,
              borderRadius: 28,
              background: lit > 0.3 ? "#eff6ff" : "#ffffff",
              border: `4px solid ${lit > 0.3 ? COLORS.dw : COLORS.line}`,
              boxShadow:
                lit > 0.3
                  ? `0 0 0 ${Math.max(0, 1 - Math.abs(lit - 1)) * 10}px ${COLORS.dw}33`
                  : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              opacity: 0.4 + 0.6 * Math.min(1, lit + 0.5),
            }}
          >
            <Clock size={96} color={COLORS.dw} minute={frame * 8 + i * 70} />
            <div
              style={{
                padding: "6px 22px",
                borderRadius: 24,
                background: lit > 0.3 ? COLORS.dw : "#cbd5e1",
                color: "#ffffff",
                fontFamily: FONT,
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              Load
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 1380,
          top: 340,
          opacity: whP,
          transform: `scale(${0.8 + 0.2 * whP})`,
        }}
      >
        <WarehouseIcon size={400} color={COLORS.dw} />
      </div>
      <TagAt cx={960} top={790} text="Sesuai kebutuhan sistem" color={COLORS.etl} p={butuhP} size={40} solid={false} />
    </>
  );
};

/* ================= S: data siap untuk mendukung analisis ================= */
const PanelS: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.s);
  const chipP = fade(frame, 4, 12);
  const whP = pop(frame, 6, fps);
  const readyP = pop(frame, r(235.42), fps);
  const a1 = interpolate(frame, [r(236.4), r(236.9)], [0, 1], clamp);
  const dashP = pop(frame, r(236.9), fps);
  const anaP = pop(frame, r(237.2), fps);

  return (
    <>
      <ChipLabel text="SETELAH TAHAP LOAD" p={chipP} top={170} color={COLORS.dw} />

      <FlowSvg>
        <Arrow x1={860} x2={1120} y={540} progress={a1} color={COLORS.ink} width={12} />
      </FlowSvg>

      <div
        style={{
          position: "absolute",
          left: 360,
          top: 340,
          opacity: whP,
          transform: `scale(${0.8 + 0.2 * whP})`,
        }}
      >
        <WarehouseIcon size={440} color={COLORS.dw} />
      </div>
      <TagAt cx={580} top={270} text="✓ Data siap" color={COLORS.bi} p={readyP} size={40} />

      <div
        style={{
          position: "absolute",
          left: 1160,
          top: 360,
          opacity: dashP,
          transform: `scale(${0.8 + 0.2 * dashP})`,
        }}
      >
        <DashboardIcon size={420} color={COLORS.bi} />
      </div>
      <LabelAt cx={1370} top={740} text="Analisis" color={COLORS.bi} p={anaP} size={46} />
    </>
  );
};

/* ================= Scene 4 ================= */
export const Scene4ETL: React.FC = () => (
  <>
    <SceneTag no={SCENE.no} title={SCENE.title} />
    <Tracker />
    <Beat scene={SCENE} start={T.a} end={T.b}>
      <PanelA />
    </Beat>
    <Beat scene={SCENE} start={T.b} end={T.c}>
      <PanelB />
    </Beat>
    <Beat scene={SCENE} start={T.c} end={T.d}>
      <PanelC />
    </Beat>
    <Beat scene={SCENE} start={T.d} end={T.e}>
      <PanelD />
    </Beat>
    <Beat scene={SCENE} start={T.e} end={T.f}>
      <PanelE />
    </Beat>
    <Beat scene={SCENE} start={T.f} end={T.g}>
      <PanelF />
    </Beat>
    <Beat scene={SCENE} start={T.g} end={T.h}>
      <PanelG />
    </Beat>
    <Beat scene={SCENE} start={T.h} end={T.i}>
      <PanelH />
    </Beat>
    <Beat scene={SCENE} start={T.i} end={T.j}>
      <PanelI />
    </Beat>
    <Beat scene={SCENE} start={T.j} end={T.k}>
      <PanelJ />
    </Beat>
    <Beat scene={SCENE} start={T.k} end={T.l}>
      <PanelK />
    </Beat>
    <Beat scene={SCENE} start={T.l} end={T.m}>
      <PanelL />
    </Beat>
    <Beat scene={SCENE} start={T.m} end={T.n}>
      <PanelM />
    </Beat>
    <Beat scene={SCENE} start={T.n} end={T.o}>
      <PanelN />
    </Beat>
    <Beat scene={SCENE} start={T.o} end={T.p}>
      <PanelO />
    </Beat>
    <Beat scene={SCENE} start={T.p} end={T.q}>
      <PanelP />
    </Beat>
    <Beat scene={SCENE} start={T.q} end={T.r}>
      <PanelQ />
    </Beat>
    <Beat scene={SCENE} start={T.r} end={T.s}>
      <PanelR />
    </Beat>
    <Beat scene={SCENE} start={T.s}>
      <PanelS />
    </Beat>
  </>
);