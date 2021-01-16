import create, {State}       from "zustand";
import {useEffect, useState} from "react";
import {usePhaser}           from "./phaser.store";
import {Position}            from "../shared/position";

export interface SceneData {
  scene: string
  playerSpawn?: Position
  enemy: string[]
  npc: string[]
  resource: string[]
  portal: string[]
}

export interface SceneConfig extends State {
  currentScene: string
  scenes: { [scene: string]: SceneData }
  changeScene: (scene: string) => void
}

// Preload from file or server
const config = {
  example: {
    scene: 'example',
    playerSpawn: {x: 100, y: 100},
    enemy: [],
    npc: [],
    resource: [],
    portal: []
  }
};

export const useSceneData = create<SceneConfig>((set): SceneConfig => ({
  currentScene: 'title',
  scenes: config,
  changeScene: (scene: string) => set({currentScene: scene})
}));

export function useSceneLifecycle(key: string, cb: () => Phaser.Scene) {
  const {game} = usePhaser();
  const [scene, setScene] = useState<Phaser.Scene | null>(null);
  useEffect(() => {
    if (game && key) {
      if (game.scene.getScene(key)) {
        game.scene.stop(key);
        game.scene.remove(key);
      }

      let newScene = cb();
      game.scene.add(key, newScene);

      setScene(newScene);
      game.scene.start(key);
      return () => {
        game.scene.stop(key);
        game.scene.remove(key);
      };
    }
  }, [game, cb, key]);
  return scene;
}
