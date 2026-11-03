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
import {
  Arrow,
  DashboardIcon,
  DbIcon,
  Minimarket,
  Person,
  Product,
  ProductType,
  ReceiptCard,
  WarehouseIcon,
} from "../components/Art";

const SCENE = getScene("opening");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Awal tiap kalimat/bagian narasi (detik absolut)
const W = { a: 0, b: 7.18, c: 12.84, d: 16.15, e: 20.63, f: 25.88, g: 29.31 };
const rel = (t: number, s: number): number => Math.round((t - s) * FPS);

const PANEL = { left: 930, top: 240, width: 900, height: 640 };

/* ---------- Minimarket (kiri, scene 0:00 - 0:25) ---------- */
const Store: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, 4, fps);
  const bob = Math.sin(frame / 28) * 5;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 300,
        opacity: p,
        transformOrigin: "50% 100%",
        transform: `translateY(${bob + (1 - p) * 70}px) scale(${0.85 + 0.15 * p})`,
      }}
    >
      <Minimarket width={720} />
    </div>
  );
};

/* ---------- A: produk apa yang paling banyak terjual selama satu tahun? ---------- */
const PanelA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heights = [0.55, 0.82, 0.42, 0.96, 0.68];
  const types: ProductType[] = ["water", "bread", "milk", "snack", "can"];
  const colors = [COLORS.dw, COLORS.gold, "#38bdf8", COLORS.warn, COLORS.bi];
  const cardP = pop(frame, 4, fps);
  const hot = fade(frame, 130, 12);

  return (
    <Card
      style={{
        ...PANEL,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div style={{ position: "absolute", left: 56, top: 38, fontFamily: FONT }}>
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.ink,
            maxWidth: 790,
          }}
        >
          Produk apa yang paling banyak terjual?
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.oltp,
            marginTop: 8,
          }}
        >
          selama satu tahun
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 215,
          height: 280,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {heights.map((h, i) => {
          const g = interpolate(frame, [24 + i * 7, 62 + i * 7], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          const q = fade(frame, 62 + i * 7, 10);
          const pulse = i === 3 ? 1 + hot * 0.12 * Math.sin(frame / 5) : 1;
          return (
            <div
              key={i}
              style={{
                width: 110,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 52,
                  fontWeight: 800,
                  color: colors[i],
                  opacity: q,
                  marginBottom: 8,
                  transform: `scale(${pulse})`,
                }}
              >
                ?
              </div>
              <div
                style={{
                  width: 100,
                  height: 210 * h * g,
                  borderRadius: "18px 18px 6px 6px",
                  background: colors[i],
                  boxShadow:
                    i === 3 ? `0 0 0 ${hot * 8}px rgba(239,68,68,0.22)` : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 50,
          right: 50,
          top: 497,
          height: 4,
          background: COLORS.line,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 515,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {types.map((t, i) => (
          <div
            key={t}
            style={{
              width: 110,
              display: "flex",
              justifyContent: "center",
              opacity: fade(frame, 18 + i * 6, 12),
            }}
          >
            <Product type={t} size={100} />
          </div>
        ))}
      </div>
    </Card>
  );
};

/* ---------- B: membandingkan pendapatan bulan ini dengan bulan sebelumnya ---------- */
const PanelB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardP = pop(frame, 4, fps);
  const cols = [
    { label: "Bulan sebelumnya", h: 0.6, color: "#94a3b8", at: 16, left: 90 },
    { label: "Bulan ini", h: 0.9, color: COLORS.dw, at: 34, left: 510 },
  ];
  const vsP = pop(frame, 72, fps);

  return (
    <Card
      style={{
        ...PANEL,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div style={{ position: "absolute", left: 56, top: 38, fontFamily: FONT }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.ink }}>
          Pendapatan bulan ini
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.dw,
            marginTop: 6,
          }}
        >
          dibandingkan bulan sebelumnya
        </div>
      </div>

      {cols.map((c) => {
        const g = interpolate(frame, [c.at, c.at + 40], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            key={c.label}
            style={{
              position: "absolute",
              left: c.left,
              top: 190,
              width: 300,
              height: 310,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 46,
                fontWeight: 800,
                color: c.color,
                opacity: fade(frame, c.at + 34, 10),
                marginBottom: 10,
              }}
            >
              Rp ?
            </div>
            <div
              style={{
                width: 170,
                height: 220 * c.h * g,
                borderRadius: "20px 20px 6px 6px",
                background: c.color,
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 50,
          right: 50,
          top: 503,
          height: 4,
          background: COLORS.line,
          borderRadius: 2,
        }}
      />
      {cols.map((c) => (
        <div
          key={"l" + c.label}
          style={{
            position: "absolute",
            left: c.left,
            top: 530,
            width: 300,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.ink,
            opacity: fade(frame, c.at, 12),
          }}
        >
          {c.label}
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: 402,
          top: 320,
          width: 96,
          height: 96,
          borderRadius: 48,
          background: COLORS.gold,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: vsP,
          transform: `scale(${vsP * (1 + 0.05 * Math.sin(frame / 6))})`,
          boxShadow: "0 12px 30px rgba(245,158,11,0.45)",
        }}
      >
        VS
      </div>
    </Card>
  );
};

/* ---------- C: setiap hari, minimarket mencatat banyak transaksi ---------- */
const PanelC: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accents = [COLORS.oltp, COLORS.dw, COLORS.bi, COLORS.etl, COLORS.gold];

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 930,
          top: 240,
          fontFamily: FONT,
          opacity: fade(frame, 0, 12),
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 800, color: COLORS.ink }}>
          Setiap hari,
        </div>
        <div style={{ fontSize: 46, fontWeight: 700, color: COLORS.oltp }}>
          banyak transaksi tercatat
        </div>
      </div>
      {accents.map((c, i) => {
        const p = pop(frame, 8 + i * 9, fps);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 930 + i * 150,
              top: 430 + (i % 2) * 28,
              opacity: p,
              transform: `translateX(${(1 - p) * 320}px) rotate(${(i - 2) * 3}deg)`,
            }}
          >
            <ReceiptCard width={260} rows={5} accent={c} seed={i} />
          </div>
        );
      })}
    </>
  );
};

/* ---------- D: data terkumpul belum tentu menjadi informasi berguna ---------- */
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
  "Rp 4.200",
  "x2",
];

const PanelD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardP = pop(frame, 2, fps);
  const chips = Array.from({ length: 34 }, (_, i) => i);
  const dim = interpolate(frame, [50, 80], [1, 0.3], clamp);
  const qP = pop(frame, 66, fps);
  const bannerP = pop(frame, 48, fps);

  return (
    <Card
      style={{
        ...PANEL,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 38,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Data transaksi yang terkumpul
      </div>

      {chips.map((i) => {
        const p = pop(frame, 6 + i * 2, fps);
        const x = 40 + random("cx" + i) * 640;
        const y = 120 + random("cy" + i) * 320;
        const rot = (random("cr" + i) - 0.5) * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              padding: "8px 16px",
              borderRadius: 12,
              background: i % 3 === 0 ? "#eef3fb" : "#ffffff",
              border: "2px solid #d6e0ee",
              fontFamily: "Consolas, monospace",
              fontSize: 26,
              color: COLORS.sub,
              opacity: p * dim,
              transform: `rotate(${rot}deg) scale(${0.6 + 0.4 * p})`,
            }}
          >
            {CHIP_TEXTS[i % CHIP_TEXTS.length]}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 190,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 230,
          fontWeight: 900,
          color: COLORS.warn,
          opacity: qP * 0.92,
          transform: `scale(${0.6 + 0.4 * qP + 0.03 * Math.sin(frame / 7)})`,
        }}
      >
        ?
      </div>

      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          top: 528,
          height: 82,
          borderRadius: 24,
          background: "#fff1f2",
          border: "2px solid #fecdd3",
          color: "#be123c",
          fontFamily: FONT,
          fontSize: 30,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: bannerP,
          transform: `translateY(${(1 - bannerP) * 24}px)`,
        }}
      >
        Belum tentu langsung menjadi informasi yang berguna
      </div>
    </Card>
  );
};

/* ---------- E: bagaimana data diolah agar membantu pemilik usaha mengambil keputusan? ---------- */
const PanelE: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, W.e);
  const cardP = pop(frame, 2, fps);
  const dataP = pop(frame, r(21.5), fps);
  const a1 = interpolate(frame, [r(22.0), r(22.4)], [0, 1], clamp);
  const midP = pop(frame, r(22.5), fps);
  const a2 = interpolate(frame, [r(23.3), r(23.8)], [0, 1], clamp);
  const ownerP = pop(frame, r(24.0), fps);
  const bubbleP = pop(frame, r(25.0), fps);
  const pulse = 1 + 0.06 * Math.sin(frame / 6);

  return (
    <Card
      style={{
        ...PANEL,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 38,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        Bagaimana data diolah?
      </div>

      <svg
        width={900}
        height={640}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Arrow x1={245} x2={362} y={330} progress={a1} color={COLORS.sub} />
        <Arrow x1={540} x2={668} y={330} progress={a2} color={COLORS.sub} />
      </svg>

      {/* Data */}
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 256,
          opacity: dataP,
          transform: `scale(${dataP})`,
        }}
      >
        <DbIcon size={130} color={COLORS.dw} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          width: 200,
          top: 440,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 800,
          color: COLORS.dw,
          opacity: dataP,
        }}
      >
        Data
      </div>

      {/* Diolah */}
      <div
        style={{
          position: "absolute",
          left: 375,
          top: 255,
          width: 150,
          height: 150,
          borderRadius: 36,
          border: `6px dashed ${COLORS.etl}`,
          background: "#f5f3ff",
          color: COLORS.etl,
          fontFamily: FONT,
          fontSize: 110,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: midP,
          transform: `scale(${midP * pulse})`,
        }}
      >
        ?
      </div>
      <div
        style={{
          position: "absolute",
          left: 350,
          width: 200,
          top: 440,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 800,
          color: COLORS.etl,
          opacity: midP,
        }}
      >
        Diolah
      </div>

      {/* Pemilik usaha */}
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 252,
          opacity: ownerP,
          transform: `translateY(${(1 - ownerP) * 30}px)`,
        }}
      >
        <Person size={120} color={COLORS.dw} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 640,
          width: 200,
          top: 440,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: ownerP,
        }}
      >
        Pemilik usaha
      </div>
      <div
        style={{
          position: "absolute",
          left: 585,
          top: 140,
          padding: "12px 28px",
          borderRadius: 40,
          background: COLORS.bi,
          color: "#ffffff",
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 800,
          opacity: bubbleP,
          transform: `scale(${bubbleP})`,
          boxShadow: "0 12px 30px rgba(5,150,105,0.35)",
        }}
      >
        ✓ Keputusan
      </div>
    </Card>
  );
};

/* ---------- F: jawabannya adalah melalui proses Data Warehouse ---------- */
const PanelF: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, W.f);
  const iconP = pop(frame, r(26.05), fps);
  const textP = pop(frame, r(27.8), fps);
  const chipP = fade(frame, r(26.0), 12);
  const ring = 1 + 0.05 * Math.sin(frame / 10);
  const bar = interpolate(frame, [r(27.9), r(28.9)], [0, 1], clamp);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 580,
          top: 60,
          width: 760,
          height: 760,
          borderRadius: 380,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.22), rgba(37,99,235,0) 68%)",
          opacity: iconP,
          transform: `scale(${(0.6 + 0.4 * iconP) * ring})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 170,
          textAlign: "center",
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
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 6,
          }}
        >
          JAWABANNYA
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          display: "flex",
          justifyContent: "center",
          opacity: iconP,
          transform: `translateY(${(1 - iconP) * 50}px) scale(${0.8 + 0.2 * iconP})`,
        }}
      >
        <WarehouseIcon size={440} color={COLORS.dw} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 690,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 128,
          fontWeight: 900,
          color: COLORS.dw,
          opacity: textP,
          transform: `translateY(${(1 - textP) * 40}px)`,
        }}
      >
        Data Warehouse
      </div>
      <div
        style={{
          position: "absolute",
          left: 960 - 330,
          top: 850,
          width: 660 * bar,
          height: 10,
          borderRadius: 5,
          background: COLORS.oltp,
        }}
      />
    </>
  );
};

/* ---------- G: pada video ini kita akan membahas tahapan ... ---------- */
const PanelG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, W.g);
  const titleP = pop(frame, r(29.4), fps);
  const move = interpolate(frame, [r(32.8), r(33.7)], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const leftP = pop(frame, r(33.0), fps);
  const arrowP = interpolate(frame, [r(34.4), r(35.0)], [0, 1], clamp);
  const rightP = pop(frame, r(35.07), fps);
  const glow = fade(frame, r(35.07), 14);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 220,
          display: "flex",
          justifyContent: "center",
          opacity: titleP * (1 - move),
          transform: `scale(${0.8 + 0.2 * titleP})`,
        }}
      >
        <WarehouseIcon size={190} color={COLORS.dw} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 440 - move * 225,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 100,
          fontWeight: 900,
          color: COLORS.ink,
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 40}px)`,
        }}
      >
        Tahapan dalam <span style={{ color: COLORS.dw }}>Data Warehouse</span>
      </div>

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Arrow x1={845} x2={1075} y={600} progress={arrowP} color={COLORS.ink} width={10} />
      </svg>

      <Card
        style={{
          left: 220,
          top: 370,
          width: 600,
          height: 460,
          opacity: leftP,
          transform: `translateY(${(1 - leftP) * 40}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 28,
            transform: "rotate(-3deg)",
          }}
        >
          <ReceiptCard width={200} rows={3} accent={COLORS.oltp} seed={2} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 372,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 800,
            color: COLORS.oltp,
          }}
        >
          Data transaksi sehari-hari
        </div>
      </Card>

      <Card
        style={{
          left: 1100,
          top: 370,
          width: 600,
          height: 460,
          opacity: rightP,
          transform: `translateY(${(1 - rightP) * 40}px) scale(${0.96 + 0.04 * rightP})`,
          boxShadow: `0 0 0 ${glow * 8}px rgba(5,150,105,0.18), 0 30px 80px rgba(5,150,105,0.25)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 70,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DashboardIcon size={300} color={COLORS.bi} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 372,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 800,
            color: COLORS.bi,
          }}
        >
          Informasi yang bermanfaat
        </div>
      </Card>
    </>
  );
};

/* ---------- Scene 1 ---------- */
export const Scene1Opening: React.FC = () => (
  <>
    <SceneTag no={SCENE.no} title={SCENE.title} />
    <Beat scene={SCENE} start={0} end={W.f} fadeIn={10} fadeOut={10}>
      <Store />
    </Beat>
    <Beat scene={SCENE} start={W.a} end={W.b}>
      <PanelA />
    </Beat>
    <Beat scene={SCENE} start={W.b} end={W.c}>
      <PanelB />
    </Beat>
    <Beat scene={SCENE} start={W.c} end={W.d}>
      <PanelC />
    </Beat>
    <Beat scene={SCENE} start={W.d} end={W.e}>
      <PanelD />
    </Beat>
    <Beat scene={SCENE} start={W.e} end={W.f}>
      <PanelE />
    </Beat>
    <Beat scene={SCENE} start={W.f} end={W.g}>
      <PanelF />
    </Beat>
    <Beat scene={SCENE} start={W.g}>
      <PanelG />
    </Beat>
  </>
);