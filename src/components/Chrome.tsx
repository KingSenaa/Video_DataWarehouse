import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, SHOW_DEBUG } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const d = Math.sin(frame / 120) * 30;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #f8fbff 0%, #e8f0fb 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -300 + d,
          top: -380,
          width: 1000,
          height: 1000,
          borderRadius: 500,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.13), rgba(37,99,235,0) 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -300 - d,
          bottom: -420,
          width: 1100,
          height: 1100,
          borderRadius: 550,
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12), rgba(249,115,22,0) 68%)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,39,71,0.07) 2px, transparent 2px)",
          backgroundSize: "48px 48px",
        }}
      />
    </AbsoluteFill>
  );
};

export const SceneTag: React.FC<{ no: number; title: string }> = ({
  no,
  title,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 14], [-14, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 52,
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: o,
        transform: `translateY(${y}px)`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: COLORS.ink,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        {no}
      </div>
      <div>
        <div
          style={{
            fontSize: 18,
            letterSpacing: 3,
            color: COLORS.sub,
            fontWeight: 700,
          }}
        >
          CHAPTER 4 · TAHAPAN DALAM DATA WAREHOUSE
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.ink }}>
          {title}
        </div>
      </div>
    </div>
  );
};

export const Card: React.FC<{
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ style, children }) => (
  <div
    style={{
      position: "absolute",
      background: "#ffffff",
      borderRadius: 36,
      boxShadow: "0 30px 80px rgba(15,39,71,0.12)",
      border: "1px solid #e3ebf6",
      ...style,
    }}
  >
    {children}
  </div>
);

const pad2 = (n: number): string => (n < 10 ? "0" + n : String(n));

export const DebugBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!SHOW_DEBUG) {
    return null;
  }
  const t = frame / fps;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const cs = Math.floor((t % 1) * 100);
  return (
    <div
      style={{
        position: "absolute",
        right: 24,
        top: 16,
        padding: "6px 14px",
        borderRadius: 10,
        background: "rgba(15,39,71,0.82)",
        color: "#fff",
        fontSize: 20,
        fontFamily: "Consolas, monospace",
      }}
    >
      {pad2(m)}:{pad2(s)}.{pad2(cs)} · f{frame}
    </div>
  );
};