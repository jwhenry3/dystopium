import React, {FC, useRef}  from "react";
import TitleScene           from "./scenes/title/TitleScene";
import UnknownScene         from "./scenes/unknown/UnknownScene";
import {SceneProps}         from "./scenes/props";
import ExampleScene         from "./scenes/example/ExampleScene";
import {usePhaserLifecycle} from "./stores/game/phaser.store";
import "./Game.scss";
import {useSceneData} from "./stores/game/scene.store";


const scenes: { [key: string]: FC<SceneProps> } = {
  title: TitleScene,
  example: ExampleScene
};

function Game() {
  const {currentScene, changeScene} = useSceneData();
  const Scene: FC<SceneProps> = scenes[currentScene] || UnknownScene;
  const ref = useRef<HTMLCanvasElement | null>(null);
  const phaser = usePhaserLifecycle(ref);
  return <div className="game">
    <canvas ref={ref}/>
    {phaser.game && <Scene onScene={changeScene}/>}
  </div>;
}

export default Game;
