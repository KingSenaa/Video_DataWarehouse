import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneInfo } from "../timing";

const pad2 = (n: number): string => (n < 10 ? "0" + n : String(n));

const fmt = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  const cs = Math.floor((totalSeconds % 1) * 100);
  return pad2(m) + ":" + pad2(s) + "." + pad2(cs);
};

export const ScenePlaceholder: React.FC<{ scene: SceneInfo }> = ({ scene }) => {
  const frame = useCurrentFrame(); // frame lokal di dalam Sequence
  const { fps } = useVideoConfig();

  const globalFrame = scene.from + frame;
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const progress = frame / scene.duration;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0b1220 0%, #14213d 100%)",
        color: "white",
        fontFamily: "Segoe UI, Arial, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      <div style={{ fontSize: 36, color: "#7dd3fc", letterSpacing: 6 }}>
        SCENE {scene.no} / 8
      </div>
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          marginTop: 24,
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.15,
        }}
      >
        {scene.title}
      </div>

      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 120,
          height: 10,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 5,
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: "#38bdf8",
            borderRadius: 5,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 120,
          bottom: 50,
          fontSize: 30,
          color: "#cbd5e1",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        Waktu narasi {fmt(globalFrame / fps)} · frame global {globalFrame} ·
        frame scene {frame}/{scene.duration}
      </div>
    </AbsoluteFill>
  );
};