import create, {State}                    from "zustand";
import {useCallback, useEffect, useState} from "react";
import {usePhaser}                        from "./phaser.store";
import {Position}                         from "../shared/position";

export interface SceneData {
  scene: string
  playerSpawn?: Position
  enemy: string[]
  npc: string[]
  resource: string[]
  portal: string[]
}

export interface SceneState extends State {
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
export const getChangeScene = ({changeScene}: SceneState) => changeScene;

export const useSceneData = create<SceneState>((set): SceneState => ({
  currentScene: 'title',
  scenes: config,
  changeScene: (scene: string) => set({currentScene: scene})
}));

export function useSceneLifecycle(key: string, cb: (config: SceneData) => Phaser.Scene) {
  const {config, changeScene} = useSceneData(useCallback(({scenes, changeScene}) => ({
    config: scenes[key],
    changeScene
  }), [key]));
  const {game} = usePhaser();
  const [scene, setScene] = useState<Phaser.Scene | null>(null);
  useEffect(() => {
    if (game && key) {
      if (game.scene.getScene(key)) {
        game.scene.stop(key);
        game.scene.remove(key);
      }

      let newScene = cb(config);
      game.scene.add(key, newScene);

      setScene(newScene);
      game.scene.start(key);
      return () => {
        game.scene.stop(key);
        game.scene.remove(key);
      };
    }
  }, [config, game, cb, key]);
  if (!game && !scene)
    throw new Error("Could not load scene, Phaser or Scene not loaded.");
  return {scene, changeScene};
}
