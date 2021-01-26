import React, { FC, useRef } from "react";
import TitleScene from "./scenes/title/TitleScene";
import UnknownScene from "./scenes/unknown/UnknownScene";
import ExampleScene from "./scenes/example/ExampleScene";
import { usePhaserLifecycle } from "./stores/game/phaser.store";
import "./Game.scss";
import { SceneState, useSceneData } from "./stores/game/scene.store";
import { useWorldsLifecycle } from "./stores/game/server.store";

const scenes: { [key: string]: FC } = {
  title: TitleScene,
  example: ExampleScene,
};
const getCurrentScene = ({ currentScene }: SceneState) =>
  scenes[currentScene] || UnknownScene;

function Game() {
  const Scene: FC = useSceneData(getCurrentScene);
  const ref = useRef<HTMLCanvasElement | null>(null);
  const phaser = usePhaserLifecycle(ref);
  useWorldsLifecycle();
  return (
    <div className="game">
      <canvas ref={ref} />
      {phaser.game && <Scene />}
    </div>
  );
}

export default Game;
