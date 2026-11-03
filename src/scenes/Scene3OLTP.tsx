import React from "react";
import {
  Easing,
  interpolate,
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
  CashRegister,
  DashboardIcon,
  DbIcon,
  Gear,
  Minimarket,
  Person,
  Product,
  ProductType,
  ReceiptCard,
  WarehouseIcon,
} from "../components/Art";
import { Basket, BoxStack, Clipboard, Clock } from "../components/Art2";

const SCENE = getScene("oltp");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);

// Awal tiap bagian narasi (detik absolut)
const T = {
  b1: 73.2,
  b2: 77.42,
  b3: 85.51,
  b4: 91.19,
  b5: 93.98,
  b6: 101.82,
  b8: 111.09,
  b9: 119.28,
};

const rel = (t: number, s: number): number => Math.round((t - s) * FPS);
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const Mark: React.FC<{ ok: boolean; size?: number }> = ({ ok, size = 72 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: ok ? COLORS.bi : COLORS.warn,
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT,
      fontSize: size * 0.6,
      fontWeight: 900,
    }}
  >
    {ok ? "✓" : "✕"}
  </div>
);

const Chip: React.FC<{ text: string; opacity: number; top: number }> = ({
  text,
  opacity,
  top,
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top,
      textAlign: "center",
      opacity,
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
      {text}
    </span>
  </div>
);

/* ---------- 1: OLTP = Online Transaction Processing ---------- */
const Panel1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b1);
  const titleP = pop(frame, r(73.4), fps);
  const chipP = fade(frame, r(74.0), 12);
  const ring = 1 + 0.04 * Math.sin(frame / 12);
  const words = [
    { label: "Online", at: 74.9, color: COLORS.dw },
    { label: "Transaction", at: 75.5, color: COLORS.oltp },
    { label: "Processing", at: 76.2, color: COLORS.etl },
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
            "radial-gradient(circle, rgba(249,115,22,0.18), rgba(249,115,22,0) 66%)",
          opacity: titleP,
          transform: `scale(${ring})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 230,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 300,
          fontWeight: 900,
          letterSpacing: 10,
          color: COLORS.oltp,
          opacity: titleP,
          transform: `scale(${0.85 + 0.15 * titleP})`,
        }}
      >
        OLTP
      </div>
      <Chip text="SINGKATAN DARI" opacity={chipP} top={585} />
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
                padding: "14px 40px",
                borderRadius: 24,
                background: w.color,
                color: "#ffffff",
                fontSize: 66,
                fontWeight: 800,
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p})`,
                boxShadow: "0 16px 40px rgba(15,39,71,0.18)",
              }}
            >
              {w.label}
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ---------- 2: kegiatan operasional sehari-hari ---------- */
const Panel2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b2);
  const chipP = fade(frame, 2, 12);
  const headP = pop(frame, r(77.9), fps);
  const cards = [
    {
      label: "Transaksi penjualan",
      at: 81.1,
      color: COLORS.oltp,
      icon: <CashRegister size={250} color={COLORS.oltp} />,
    },
    {
      label: "Pemesanan",
      at: 82.88,
      color: COLORS.etl,
      icon: <Clipboard size={190} color={COLORS.etl} />,
    },
    {
      label: "Pengelolaan persediaan",
      at: 83.75,
      color: COLORS.dw,
      icon: <BoxStack size={240} color={COLORS.dw} />,
    },
  ];

  return (
    <>
      <Chip text="OLTP MENDUKUNG" opacity={chipP} top={170} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 240,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 68,
          fontWeight: 900,
          color: COLORS.ink,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 30}px)`,
        }}
      >
        Kegiatan operasional <span style={{ color: COLORS.oltp }}>sehari-hari</span>
      </div>

      {cards.map((c, i) => {
        const left = 160 + i * 560;
        const p = pop(frame, r(c.at), fps);
        const slotO = fade(frame, r(79.0), 12) * (1 - Math.min(1, p * 1.5));
        return (
          <React.Fragment key={c.label}>
            <div
              style={{
                position: "absolute",
                left,
                top: 390,
                width: 480,
                height: 470,
                borderRadius: 36,
                border: `4px dashed ${c.color}66`,
                opacity: slotO,
              }}
            />
            <Card
              style={{
                left,
                top: 390,
                width: 480,
                height: 470,
                border: `3px solid ${c.color}`,
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
                  height: 270,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 350,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontSize: 36,
                  fontWeight: 800,
                  color: COLORS.ink,
                }}
              >
                {c.label}
              </div>
            </Card>
          </React.Fragment>
        );
      })}
    </>
  );
};

/* ---------- 3: pelanggan membeli 2 air mineral dan 1 roti di minimarket ---------- */
const Panel3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b3);
  const chipP = fade(frame, 2, 12);
  const storeP = pop(frame, r(85.7), fps);
  const personP = pop(frame, r(86.54), fps);
  const basketP = pop(frame, r(87.0), fps);
  const water1 = pop(frame, r(87.7), fps);
  const water2 = pop(frame, r(88.15), fps);
  const breadP = pop(frame, r(89.1), fps);

  const pillStyle = (o: number): React.CSSProperties => ({
    position: "absolute",
    top: 490,
    textAlign: "center",
    fontFamily: FONT,
    fontSize: 28,
    fontWeight: 800,
    color: COLORS.ink,
    background: "#ffffff",
    border: "2px solid #e3ebf6",
    borderRadius: 20,
    padding: "6px 0",
    boxShadow: "0 10px 26px rgba(15,39,71,0.10)",
    opacity: o,
  });

  return (
    <>
      <Chip text="CONTOH TRANSAKSI" opacity={chipP} top={170} />

      <div
        style={{
          position: "absolute",
          left: 1160,
          top: 400,
          opacity: storeP,
          transformOrigin: "50% 100%",
          transform: `translateY(${(1 - storeP) * 60}px) scale(${0.85 + 0.15 * storeP})`,
        }}
      >
        <Minimarket width={620} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 160,
          top: 440,
          opacity: personP,
          transform: `translateY(${(1 - personP) * 40}px)`,
        }}
      >
        <Person size={230} color={COLORS.dw} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          width: 290,
          top: 760,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.dw,
          opacity: personP,
        }}
      >
        Pelanggan
      </div>

      {/* Produk (digambar sebelum keranjang agar tampak masuk) */}
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 575,
          opacity: water1,
          transform: `translateY(${(1 - water1) * -180}px)`,
        }}
      >
        <Product type="water" size={110} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 790,
          top: 575,
          opacity: water2,
          transform: `translateY(${(1 - water2) * -180}px)`,
        }}
      >
        <Product type="water" size={110} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 575,
          opacity: breadP,
          transform: `translateY(${(1 - breadP) * -180}px)`,
        }}
      >
        <Product type="bread" size={110} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 640,
          top: 560,
          opacity: basketP,
          transform: `translateY(${(1 - basketP) * 40}px)`,
        }}
      >
        <Basket size={380} color={COLORS.oltp} />
      </div>

      <div style={{ ...pillStyle(water1), left: 680, width: 220 }}>
        Air mineral ×2
      </div>
      <div style={{ ...pillStyle(breadP), left: 900, width: 110 }}>Roti ×1</div>
    </>
  );
};

/* ---------- 4: kasir memasukkan barang ke dalam sistem ---------- */
const Panel4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b4);
  const personP = pop(frame, 2, fps);
  const regP = pop(frame, 6, fps);
  const cues = [91.45, 92.0, 92.55];
  const types: ProductType[] = ["water", "water", "bread"];
  const progress = cues.map((c) =>
    interpolate(frame, [r(c), r(c) + 22], [0, 1], { ...clamp, easing: ease })
  );
  const glow = Math.max(
    ...cues.map((c) =>
      interpolate(
        frame,
        [r(c) + 14, r(c) + 22, r(c) + 36],
        [0, 1, 0],
        clamp
      )
    )
  );

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 420,
          opacity: personP,
          transform: `translateY(${(1 - personP) * 40}px)`,
        }}
      >
        <Person size={200} color={COLORS.oltp} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          width: 260,
          top: 710,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.oltp,
          opacity: personP,
        }}
      >
        Kasir
      </div>

      <div
        style={{
          position: "absolute",
          left: 380,
          top: 700,
          width: 520,
          height: 26,
          borderRadius: 13,
          background: "#cbd5e1",
          opacity: personP,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 330,
          opacity: regP,
          transform: `scale(${0.85 + 0.15 * regP})`,
          filter: `drop-shadow(0 0 ${glow * 36}px rgba(249,115,22,0.85))`,
        }}
      >
        <CashRegister size={560} color={COLORS.oltp} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1000,
          width: 560,
          top: 830,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: regP,
        }}
      >
        Sistem OLTP
      </div>

      {types.map((t, i) => {
        const p = progress[i];
        const x = lerp(460 + i * 140, 1250, p);
        const y = lerp(640, 500, p) - Math.sin(p * Math.PI) * 110;
        const o = fade(frame, 4 + i * 3, 10) * (1 - interpolate(p, [0.9, 1], [0, 1], clamp));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 55,
              top: y - 55,
              opacity: o,
              transform: `scale(${1 - 0.5 * p})`,
            }}
          >
            <Product type={t} size={110} />
          </div>
        );
      })}
    </>
  );
};

/* ---------- 5: sistem mencatat informasi transaksi ---------- */
const Panel5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b5);
  const cardP = pop(frame, 2, fps);
  const cols = [
    { head: "Nama produk", at: 96.0, left: 60, width: 560 },
    { head: "Jumlah barang", at: 97.3, left: 640, width: 300 },
    { head: "Harga", at: 98.37, left: 960, width: 380 },
  ];
  const rows: { name: string; type: ProductType; qty: string }[] = [
    { name: "Air mineral", type: "water", qty: "2" },
    { name: "Roti", type: "bread", qty: "1" },
  ];
  const cp = cols.map((c) => fade(frame, r(c.at), 12));
  const timeP = pop(frame, r(99.14), fps);
  const totalP = pop(frame, r(100.24), fps);

  const bar = (w: number, c: string): React.ReactNode => (
    <div style={{ width: w, height: 20, borderRadius: 10, background: c }} />
  );

  return (
    <Card
      style={{
        left: 260,
        top: 250,
        width: 1400,
        height: 640,
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
        Informasi yang dicatat sistem
      </div>

      {cols.map((c, ci) => (
        <React.Fragment key={c.head}>
          <div
            style={{
              position: "absolute",
              left: c.left,
              top: 110,
              width: c.width,
              height: 64,
              borderRadius: 16,
              background: cp[ci] > 0.5 ? "#fff3e6" : "#f1f5fb",
              color: COLORS.oltp,
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              paddingLeft: 24,
              boxSizing: "border-box",
              opacity: cp[ci],
            }}
          >
            {c.head}
          </div>
          {rows.map((row, ri) => (
            <div
              key={row.name + ci}
              style={{
                position: "absolute",
                left: c.left,
                top: 196 + ri * 96,
                width: c.width,
                height: 88,
                display: "flex",
                alignItems: "center",
                paddingLeft: 24,
                boxSizing: "border-box",
                fontFamily: FONT,
                opacity: cp[ci],
              }}
            >
              {ci === 0 && (
                <>
                  <Product type={row.type} size={64} />
                  <div
                    style={{
                      marginLeft: 18,
                      fontSize: 36,
                      fontWeight: 800,
                      color: COLORS.ink,
                    }}
                  >
                    {row.name}
                  </div>
                </>
              )}
              {ci === 1 && (
                <div style={{ fontSize: 46, fontWeight: 900, color: COLORS.ink }}>
                  {row.qty}
                </div>
              )}
              {ci === 2 && bar(200, "#cbd5e1")}
            </div>
          ))}
        </React.Fragment>
      ))}

      {[0, 1].map((ri) => (
        <div
          key={ri}
          style={{
            position: "absolute",
            left: 60,
            width: 1280,
            top: 286 + ri * 96,
            height: 2,
            background: COLORS.line,
            opacity: cp[0],
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 420,
          width: 640,
          height: 130,
          borderRadius: 24,
          background: "#f8fafc",
          border: "2px solid #e3ebf6",
          display: "flex",
          alignItems: "center",
          paddingLeft: 30,
          boxSizing: "border-box",
          fontFamily: FONT,
          opacity: timeP,
          transform: `scale(${0.9 + 0.1 * timeP})`,
        }}
      >
        <Clock size={80} color={COLORS.oltp} minute={frame * 6} />
        <div style={{ marginLeft: 24 }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.ink }}>
            Waktu transaksi
          </div>
          <div style={{ marginTop: 10 }}>{bar(220, "#cbd5e1")}</div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 720,
          top: 420,
          width: 620,
          height: 130,
          borderRadius: 24,
          background: COLORS.oltp,
          display: "flex",
          alignItems: "center",
          paddingLeft: 36,
          boxSizing: "border-box",
          fontFamily: FONT,
          opacity: totalP,
          transform: `scale(${0.9 + 0.1 * totalP})`,
          boxShadow: "0 16px 40px rgba(249,115,22,0.35)",
        }}
      >
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#ffffff" }}>
            Total pembayaran
          </div>
          <div style={{ marginTop: 10 }}>{bar(260, "rgba(255,255,255,0.7)")}</div>
        </div>
      </div>
    </Card>
  );
};

/* ---------- 6 + 7: tersimpan di database operasional, jadi sumber Data Warehouse ---------- */
const Panel67: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b6);
  const dbP = pop(frame, 2, fps);
  const dbX = interpolate(frame, [r(105.2), r(106.1)], [960, 560], {
    ...clamp,
    easing: ease,
  });
  const okP = pop(frame, r(103.0), fps);
  const labelP = pop(frame, r(103.3), fps);
  const arrowP = interpolate(frame, [r(107.3), r(108.0)], [0, 1], clamp);
  const srcP = pop(frame, r(107.6), fps);
  const whP = pop(frame, r(109.2), fps);
  const whLabelP = pop(frame, r(109.4), fps);
  const appear = fade(frame, 0, 10);

  const rec = [0, 1, 2].map((i) =>
    interpolate(frame, [r(102.0 + i * 0.4), r(102.0 + i * 0.4) + 26], [0, 1], {
      ...clamp,
      easing: ease,
    })
  );

  return (
    <>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Arrow x1={790} x2={1130} y={510} progress={arrowP} color={COLORS.ink} width={10} />
      </svg>

      <div
        style={{
          position: "absolute",
          left: dbX - 165,
          top: 330,
          opacity: dbP,
          transform: `scale(${0.8 + 0.2 * dbP})`,
        }}
      >
        <DbIcon size={330} color={COLORS.oltp} />
      </div>
      <div
        style={{
          position: "absolute",
          left: dbX + 40,
          top: 310,
          opacity: okP,
          transform: `scale(${okP})`,
        }}
      >
        <Mark ok={true} size={84} />
      </div>
      <div
        style={{
          position: "absolute",
          left: dbX - 250,
          width: 500,
          top: 715,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.oltp,
          opacity: labelP,
          transform: `translateY(${(1 - labelP) * 16}px)`,
        }}
      >
        Database operasional
      </div>

      {rec.map((p, i) => {
        const x = lerp(240 + i * 50, 960, p);
        const y = lerp(430 + i * 30, 520, p);
        const o = appear * (1 - interpolate(p, [0.8, 1], [0, 1], clamp));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 100,
              top: y - 141,
              opacity: o,
              transform: `scale(${1 - 0.8 * p}) rotate(${(1 - p) * (i - 1) * 8}deg)`,
            }}
          >
            <ReceiptCard
              width={200}
              rows={2}
              accent={i === 1 ? COLORS.dw : COLORS.oltp}
              seed={i}
            />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 780,
          width: 350,
          top: 430,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: srcP,
          transform: `translateY(${(1 - srcP) * 14}px)`,
        }}
      >
        Sumber data
      </div>

      <div
        style={{
          position: "absolute",
          left: 1200,
          top: 340,
          opacity: whP,
          transform: `translateY(${(1 - whP) * 40}px) scale(${0.85 + 0.15 * whP})`,
        }}
      >
        <WarehouseIcon size={400} color={COLORS.dw} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1200,
          width: 400,
          top: 715,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 800,
          color: COLORS.dw,
          opacity: whLabelP,
        }}
      >
        Data Warehouse
      </div>
    </>
  );
};

/* ---------- 8: dirancang untuk transaksi harian, bukan analisis besar ---------- */
const Panel8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b8);
  const leftP = pop(frame, r(111.4), fps);
  const leftTextP = fade(frame, r(113.3), 12);
  const rightP = pop(frame, r(115.6), fps);
  const markP = pop(frame, r(115.9), fps);
  const rTextP = fade(frame, r(116.2), 12);
  const subP = fade(frame, r(117.6), 12);
  const dbs = [0, 1, 2, 3, 4, 5];

  return (
    <>
      <Card
        style={{
          left: 160,
          top: 270,
          width: 760,
          height: 580,
          border: `3px solid ${COLORS.bi}`,
          opacity: leftP,
          transform: `translateY(${(1 - leftP) * 40}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 36,
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: FONT,
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.bi,
          }}
        >
          <Mark ok={true} />
          Dirancang untuk
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 140,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CashRegister size={310} color={COLORS.oltp} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 468,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.ink,
            opacity: leftTextP,
          }}
        >
          Mencatat transaksi sehari-hari
        </div>
      </Card>

      <Card
        style={{
          left: 1000,
          top: 270,
          width: 760,
          height: 580,
          border: `3px solid ${COLORS.warn}`,
          opacity: rightP,
          transform: `translateY(${(1 - rightP) * 40}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 36,
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: FONT,
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.warn,
            opacity: markP,
            transform: `scale(${0.8 + 0.2 * markP})`,
            transformOrigin: "left center",
          }}
        >
          <Mark ok={false} />
          Bukan untuk
        </div>
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 150,
            height: 290,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            gap: 24,
          }}
        >
          {dbs.map((i) => {
            const p = pop(frame, r(116.4 + i * 0.3), fps);
            return (
              <div
                key={i}
                style={{
                  opacity: p,
                  transform: `scale(${0.5 + 0.5 * p})`,
                }}
              >
                <DbIcon size={104} color="#94a3b8" />
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 450,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.ink,
            opacity: rTextP,
          }}
        >
          Analisis data historis
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 504,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.warn,
            opacity: subP,
          }}
        >
          dalam jumlah besar
        </div>
      </Card>
    </>
  );
};

/* ---------- 9: data perlu dipersiapkan sebelum dianalisis ---------- */
const Panel9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = (t: number): number => rel(t, T.b9);
  const headP = pop(frame, 2, fps);
  const aP = pop(frame, r(120.1), fps);
  const a1 = interpolate(frame, [r(120.4), r(120.9)], [0, 1], clamp);
  const bP = pop(frame, r(120.6), fps);
  const a2 = interpolate(frame, [r(122.6), r(123.2)], [0, 1], clamp);
  const cP = pop(frame, r(123.5), fps);

  const label = (cx: number, text: string, color: string, o: number) => (
    <div
      style={{
        position: "absolute",
        left: cx - 230,
        width: 460,
        top: 700,
        textAlign: "center",
        fontFamily: FONT,
        fontSize: 36,
        fontWeight: 800,
        color,
        opacity: o,
      }}
    >
      {text}
    </div>
  );

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
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.ink,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 30}px)`,
        }}
      >
        Karena itu,
      </div>

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Arrow x1={470} x2={800} y={520} progress={a1} color={COLORS.sub} width={10} />
        <Arrow x1={1120} x2={1410} y={520} progress={a2} color={COLORS.sub} width={10} />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 240,
          top: 410,
          opacity: aP,
          transform: `scale(${0.8 + 0.2 * aP})`,
        }}
      >
        <DbIcon size={200} color={COLORS.oltp} />
      </div>
      {label(340, "Data OLTP", COLORS.oltp, aP)}

      <div
        style={{
          position: "absolute",
          left: 830,
          top: 390,
          width: 260,
          height: 260,
          borderRadius: 40,
          border: `5px dashed ${COLORS.etl}`,
          background: "#f5f3ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: bP,
          transform: `scale(${0.8 + 0.2 * bP})`,
        }}
      >
        <Gear size={180} color={COLORS.etl} rotate={frame * 2} />
      </div>
      {label(960, "Dipersiapkan terlebih dahulu", COLORS.etl, bP)}

      <div
        style={{
          position: "absolute",
          left: 1430,
          top: 403,
          opacity: cP,
          transform: `scale(${0.8 + 0.2 * cP})`,
        }}
      >
        <DashboardIcon size={300} color={COLORS.bi} />
      </div>
      {label(1580, "Analisis", COLORS.bi, cP)}
    </>
  );
};

/* ---------- Scene 3 ---------- */
export const Scene3OLTP: React.FC = () => (
  <>
    <SceneTag no={SCENE.no} title={SCENE.title} />
    <Beat scene={SCENE} start={T.b1} end={T.b2}>
      <Panel1 />
    </Beat>
    <Beat scene={SCENE} start={T.b2} end={T.b3}>
      <Panel2 />
    </Beat>
    <Beat scene={SCENE} start={T.b3} end={T.b4}>
      <Panel3 />
    </Beat>
    <Beat scene={SCENE} start={T.b4} end={T.b5}>
      <Panel4 />
    </Beat>
    <Beat scene={SCENE} start={T.b5} end={T.b6}>
      <Panel5 />
    </Beat>
    <Beat scene={SCENE} start={T.b6} end={T.b8}>
      <Panel67 />
    </Beat>
    <Beat scene={SCENE} start={T.b8} end={T.b9}>
      <Panel8 />
    </Beat>
    <Beat scene={SCENE} start={T.b9}>
      <Panel9 />
    </Beat>
  </>
);