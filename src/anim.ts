import { interpolate, spring } from "remotion";
import { SceneInfo, sec } from "./timing";

// Detik absolut narasi -> frame lokal di dalam scene
export const local = (scene: SceneInfo, t: number): number =>
  Math.max(0, sec(t) - scene.from);

// Animasi "muncul membal" (0 -> 1) mulai dari frame `at`
export const pop = (frame: number, at: number, fps: number): number =>
  spring({
    frame: Math.max(0, frame - at),
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.7 },
  });

// Fade linear (0 -> 1) mulai dari frame `at`
export const fade = (frame: number, at: number, dur: number = 10): number =>
  interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });