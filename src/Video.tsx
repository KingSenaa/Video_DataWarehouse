import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SCENES } from "./timing";
import { ScenePlaceholder } from "./scenes/ScenePlaceholder";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Overview } from "./scenes/Scene2Overview";
import { Scene3OLTP } from "./scenes/Scene3OLTP";
import { Scene4ETL } from "./scenes/Scene4ETL";
import { Scene5Storage } from "./scenes/Scene5Storage";
import { Background, DebugBar } from "./components/Chrome";

// Scene yang sudah punya animasi sungguhan. Sisanya masih placeholder.
const REAL: { [key: string]: React.FC } = {
  opening: Scene1Opening,
  overview: Scene2Overview,
  oltp: Scene3OLTP,
  etl: Scene4ETL,
  storage: Scene5Storage,
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f4f8fd" }}>
      <Background />
      <Audio src={staticFile("audio/narasi.mp3")} />

      {SCENES.map((scene) => {
        const Real = REAL[scene.id];
        return (
          <Sequence
            key={scene.id}
            name={`${scene.no}. ${scene.title}`}
            from={scene.from}
            durationInFrames={scene.duration}
          >
            {Real ? <Real /> : <ScenePlaceholder scene={scene} />}
          </Sequence>
        );
      })}

      <DebugBar />
    </AbsoluteFill>
  );
};