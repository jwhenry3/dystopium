import React, {FC, useEffect, useRef, useState} from "react";
import TitleScene                               from "./scenes/title/TitleScene";
import UnknownScene                             from "./scenes/unknown/UnknownScene";
import {SceneProps}                             from "./scenes/props";
import ExampleScene                             from "./scenes/example/ExampleScene";
import {PhaserState, withPhaser}                from "./phaser";
import "./Game.scss";


const scenes: { [key: string]: FC<SceneProps> } = {
  title  : TitleScene,
  example: ExampleScene
};

function Game({game, setGame}: PhaserState & any) {
  const [scene, setScene]     = useState('title');
  const Scene: FC<SceneProps> = scenes[scene] || UnknownScene;
  const ref                   = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!game && ref.current) {
      const newGame = new Phaser.Game({
        type  : Phaser.CANVAS,
        canvas: ref.current,
        scale : {
          mode: Phaser.Scale.RESIZE
        },
        scene : []
      });
      setGame(newGame);
    }
    return () => {
      if (game) {
        (game as Phaser.Game).destroy(false, true);
      }
    };
  }, [ref, game, setGame]);
  return <div className="game">
    <canvas ref={ref}/>
    {game ? <Scene onScene={setScene} game={game}/> : ''}
  </div>;
}

export default withPhaser(Game);
