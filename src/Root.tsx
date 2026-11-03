import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./Video";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DataWarehouse"
      component={MainVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};