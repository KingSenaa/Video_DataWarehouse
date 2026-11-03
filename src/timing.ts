export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 13364; // 445,47 detik x 30 fps

// "menit:detik.frame" -> nomor frame absolut
export const tc = (t: string): number => {
  const [m, rest] = t.split(":");
  const [s, f] = rest.split(".");
  return (Number(m) * 60 + Number(s)) * FPS + Number(f);
};

// detik (desimal) -> frame, dipakai untuk cue kalimat di tahap berikutnya
export const sec = (s: number): number => Math.round(s * FPS);

const SCENE_DEFS = [
  { id: "opening", title: "Opening", start: "00:00.00" },
  { id: "overview", title: "Gambaran Umum", start: "00:37.20" },
  { id: "oltp", title: "OLTP", start: "01:13.06" },
  { id: "etl", title: "Proses ETL", start: "02:04.25" },
  { id: "storage", title: "Penyimpanan dalam Data Warehouse", start: "03:58.17" },
  { id: "olap", title: "Analisis Data dan OLAP", start: "05:01.00" },
  { id: "dashboard", title: "Penyajian Data melalui Dashboard dan BI", start: "05:56.13" },
  { id: "closing", title: "Kesimpulan dan Penutup", start: "06:34.19" },
] as const;

export type SceneId = (typeof SCENE_DEFS)[number]["id"];

export type SceneInfo = {
  id: SceneId;
  no: number;
  title: string;
  from: number; // frame mulai
  duration: number; // durasi dalam frame
};

// Setiap scene berakhir tepat saat scene berikutnya mulai (tanpa celah / tumpang tindih)
export const SCENES: SceneInfo[] = SCENE_DEFS.map((def, i) => {
  const from = tc(def.start);
  const end =
    i < SCENE_DEFS.length - 1 ? tc(SCENE_DEFS[i + 1].start) : TOTAL_FRAMES;
  return {
    id: def.id,
    no: i + 1,
    title: def.title,
    from,
    duration: end - from,
  };
});

export const getScene = (id: SceneId): SceneInfo =>
  SCENES.find((s) => s.id === id) as SceneInfo;