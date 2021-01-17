import React, {FC, useCallback, useRef} from "react";
import TitleScene                       from "./scenes/title/TitleScene";
import UnknownScene         from "./scenes/unknown/UnknownScene";
import ExampleScene         from "./scenes/example/ExampleScene";
import {usePhaserLifecycle} from "./stores/game/phaser.store";
import "./Game.scss";
import {useSceneData} from "./stores/game/scene.store";


const scenes: { [key: string]: FC } = {
  title: TitleScene,
  example: ExampleScene
};

function Game() {
  const Scene:FC = useSceneData(useCallback(({currentScene}) => scenes[currentScene] || UnknownScene, []));
  const ref = useRef<HTMLCanvasElement | null>(null);
  const phaser = usePhaserLifecycle(ref);
  return <div className="game">
    <canvas ref={ref}/>
    {phaser.game && <Scene/>}
  </div>;
}

export default Game;
