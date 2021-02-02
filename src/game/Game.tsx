import React, { FC, useEffect, useRef } from "react";
import TitleScene from "./scenes/title/TitleScene";
import UnknownScene from "./scenes/unknown/UnknownScene";
import ExampleScene from "./scenes/example/ExampleScene";
import { usePhaserLifecycle } from "./stores/game/phaser.store";
import "./Game.scss";
import { SceneState, useSceneData } from "./stores/game/scene.store";
import { connect } from "../connection";

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
  useEffect(() => {
    connect();
  }, []);
  return (
    <div className="game">
      <canvas ref={ref} />
      {phaser.game && <Scene />}
    </div>
  );
}

export default Game;
