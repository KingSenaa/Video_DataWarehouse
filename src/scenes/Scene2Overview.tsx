import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";
import { getScene } from "../timing";
import { fade, local, pop } from "../anim";
import { SceneTag } from "../components/Chrome";
import {
  Arrow,
  CashRegister,
  DashboardIcon,
  Gear,
  WarehouseIcon,
} from "../components/Art";

const SCENE = getScene("overview");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CARD = { w: 360, h: 480, top: 290, gap: 110, left: 75 };
const cardLeft = (i: number): number => CARD.left + i * (CARD.w + CARD.gap);

type Pill = { label: string; at: number };
type ItemDef = {
  no: number;
  title: string;
  desc: string;
  color: string;
  start: number; // awal kalimat (Pertama / Kedua / Ketiga / Terakhir)
  titleAt: number; // saat nama tahap diucapkan
  descAt: number;
  pills: Pill[];
};

const ITEMS: ItemDef[] = [
  {
    no: 1,
    title: "OLTP",
    desc: "Sistem operasional",
    color: COLORS.oltp,
    start: 42.23,
    titleAt: 45.2,
    descAt: 44.4,
    pills: [],
  },
  {
    no: 2,
    title: "ETL",
    desc: "",
    color: COLORS.etl,
    start: 46.75,
    titleAt: 48.4,
    descAt: 0,
    pills: [
      { label: "Extract", at: 49.65 },
      { label: "Transform", at: 50.27 },
      { label: "Load", at: 51.2 },
    ],
  },
  {
    no: 3,
    title: "Data Warehouse",
    desc: "Tempat data disimpan",
    color: COLORS.dw,
    start: 52.78,
    titleAt: 54.3,
    descAt: 55.0,
    pills: [],
  },
  {
    no: 4,
    title: "Penyajian",
    desc: "",
    color: COLORS.bi,
    start: 56.19,
    titleAt: 56.95,
    descAt: 0,
    pills: [
      { label: "Laporan", at: 58.0 },
      { label: "Grafik", at: 58.9 },
      { label: "Dashboard", at: 60.0 },
    ],
  },
];

const VERBS = ["Diambil", "Diolah", "Disimpan", "Disajikan", "Informasi"];
const VERB_CUES = [63.6, 64.44, 65.25, 66.3, 67.3];
const VERB_COLORS = [COLORS.oltp, COLORS.etl, COLORS.dw, COLORS.bi, COLORS.gold];
const LINK_CUES = [68.6, 69.8, 71.0];

const StageCard: React.FC<{
  index: number;
  item: ItemDef;
  frame: number;
  fps: number;
  highlight: number;
}> = ({ index, item, frame, fps, highlight }) => {
  const left = cardLeft(index);
  const startF = local(SCENE, item.start);
  const p = pop(frame, startF, fps);
  const slotOpacity = fade(frame, 4 + index * 4, 12) * (1 - Math.min(1, p * 1.5));
  const titleO = fade(frame, local(SCENE, item.titleAt), 10);
  const descO = fade(frame, local(SCENE, item.descAt), 10);

  let icon: React.ReactNode = null;
  if (index === 0) {
    icon = <CashRegister size={230} color={item.color} />;
  } else if (index === 1) {
    icon = (
      <div style={{ position: "relative", width: 220, height: 200 }}>
        <div style={{ position: "absolute", left: 10, top: 40 }}>
          <Gear size={150} color={item.color} rotate={frame * 1.8} />
        </div>
        <div style={{ position: "absolute", left: 112, top: 2 }}>
          <Gear size={98} color="#a78bfa" rotate={-frame * 2.7 + 18} teeth={8} />
        </div>
      </div>
    );
  } else if (index === 2) {
    icon = <WarehouseIcon size={250} color={item.color} />;
  } else {
    icon = <DashboardIcon size={250} color={item.color} />;
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          left,
          top: CARD.top,
          width: CARD.w,
          height: CARD.h,
          borderRadius: 36,
          border: `4px dashed ${item.color}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontSize: 150,
          fontWeight: 900,
          color: `${item.color}44`,
          opacity: slotOpacity,
        }}
      >
        {item.no}
      </div>

      <div
        style={{
          position: "absolute",
          left,
          top: CARD.top,
          width: CARD.w,
          height: CARD.h,
          borderRadius: 36,
          background: "#ffffff",
          border: `3px solid ${item.color}`,
          boxShadow: `0 30px 80px rgba(15,39,71,0.12), 0 0 0 ${highlight * 10}px ${item.color}33`,
          opacity: p,
          transform: `translateY(${(1 - p) * 40}px) scale(${(0.92 + 0.08 * p) * (1 + 0.04 * highlight)})`,
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 22,
            width: 56,
            height: 56,
            borderRadius: 28,
            background: item.color,
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.no}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 70,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 302,
            textAlign: "center",
            fontSize: 40,
            fontWeight: 900,
            color: COLORS.ink,
            opacity: titleO,
            transform: `translateY(${(1 - titleO) * 14}px)`,
          }}
        >
          {item.title}
        </div>

        {item.desc !== "" && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 366,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 600,
              color: COLORS.sub,
              opacity: descO,
            }}
          >
            {item.desc}
          </div>
        )}

        {item.pills.length > 0 && (
          <div
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              top: 366,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {item.pills.map((pl) => {
              const pp = pop(frame, local(SCENE, pl.at), fps);
              return (
                <div
                  key={pl.label}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 30,
                    border: `2px solid ${item.color}`,
                    background: `${item.color}22`,
                    color: item.color,
                    fontSize: 24,
                    fontWeight: 800,
                    opacity: pp,
                    transform: `scale(${0.6 + 0.4 * pp})`,
                  }}
                >
                  {pl.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export const Scene2Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = (t: number): number => local(SCENE, t);

  const titleP = pop(frame, 2, fps);
  const captionP = pop(frame, L(68.6), fps);

  // Sorot kartu saat verba diucapkan (diambil, diolah, disimpan, disajikan)
  const hl = [0, 1, 2, 3].map((i) =>
    interpolate(
      frame,
      [L(VERB_CUES[i]), L(VERB_CUES[i]) + 8, L(VERB_CUES[i]) + 34],
      [0, 1, 0],
      clamp
    )
  );

  return (
    <>
      <SceneTag no={SCENE.no} title={SCENE.title} />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 140,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.ink,
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * -30}px)`,
        }}
      >
        <span style={{ color: COLORS.dw }}>Empat</span> Tahapan Utama Data
        Warehouse
      </div>

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {[0, 1, 2].map((i) => {
          const s = L(ITEMS[i + 1].start);
          const prog = interpolate(frame, [s, s + 14], [0, 1], clamp);
          const active = frame >= L(LINK_CUES[i]);
          return (
            <Arrow
              key={i}
              x1={cardLeft(i) + CARD.w + 12}
              x2={cardLeft(i + 1) - 12}
              y={CARD.top + CARD.h / 2}
              progress={prog}
              color={active ? COLORS.ink : "#94a3b8"}
              width={active ? 12 : 8}
            />
          );
        })}
      </svg>

      {ITEMS.map((item, i) => (
        <StageCard
          key={item.no}
          index={i}
          item={item}
          frame={frame}
          fps={fps}
          highlight={hl[i]}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 812,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
          fontFamily: FONT,
        }}
      >
        {VERBS.map((label, i) => {
          const pp = pop(frame, L(VERB_CUES[i]), fps);
          const isInfo = i === VERBS.length - 1;
          return (
            <React.Fragment key={label}>
              {i > 0 && (
                <div style={{ fontSize: 40, color: COLORS.sub, opacity: pp }}>
                  →
                </div>
              )}
              <div
                style={{
                  padding: "14px 34px",
                  borderRadius: 40,
                  background: VERB_COLORS[i],
                  color: isInfo ? COLORS.ink : "#ffffff",
                  fontSize: 36,
                  fontWeight: 800,
                  opacity: pp,
                  transform: `scale(${0.6 + 0.4 * pp})`,
                  boxShadow: isInfo
                    ? "0 0 0 8px rgba(245,158,11,0.25)"
                    : "none",
                }}
              >
                {label}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 940,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "18px 44px",
            borderRadius: 28,
            background: "#ffffff",
            border: "2px solid #e3ebf6",
            boxShadow: "0 16px 44px rgba(15,39,71,0.12)",
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.ink,
            opacity: captionP,
            transform: `translateY(${(1 - captionP) * 24}px)`,
          }}
        >
          Setiap tahap saling berkaitan dan memengaruhi kualitas informasi
        </div>
      </div>
    </>
  );
};