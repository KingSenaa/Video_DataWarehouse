import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { SceneInfo } from "../timing";
import { local } from "../anim";

const Fade: React.FC<{
  duration: number;
  fadeIn: number;
  fadeOut: number;
  children: React.ReactNode;
}> = ({ duration, fadeIn, fadeOut, children }) => {
  const frame = useCurrentFrame();
  const a =
    fadeIn > 0
      ? interpolate(frame, [0, fadeIn], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;
  const b =
    fadeOut > 0
      ? interpolate(frame, [duration - fadeOut, duration], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;
  return <AbsoluteFill style={{ opacity: a * b }}>{children}</AbsoluteFill>;
};

type BeatProps = {
  scene: SceneInfo;
  start: number; // detik absolut narasi
  end?: number; // detik absolut; kosong = sampai akhir scene
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
};

// Satu "adegan kecil" yang tampil di jendela waktu tertentu.
// Fade-out dibuat menumpang ke beat berikutnya, sehingga pergantian halus.
export const Beat: React.FC<BeatProps> = ({
  scene,
  start,
  end,
  fadeIn = 8,
  fadeOut = 8,
  children,
}) => {
  const from = local(scene, start);
  const hasEnd = end !== undefined;
  const to = hasEnd
    ? Math.min(scene.duration, local(scene, end as number))
    : scene.duration;
  const extra = hasEnd ? fadeOut : 0;
  const duration = Math.max(2, Math.min(scene.duration - from, to - from + extra));

  return (
    <Sequence from={from} durationInFrames={duration}>
      <Fade
        duration={duration}
        fadeIn={fadeIn}
        fadeOut={hasEnd ? fadeOut : 0}
      >
        {children}
      </Fade>
    </Sequence>
  );
};