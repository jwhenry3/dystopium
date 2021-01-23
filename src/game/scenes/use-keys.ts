import { useCallback, useEffect, useRef } from "react";
import { usePhaser }                      from "../stores/game/phaser.store";
import { BaseScene }                      from "./base-scene";

export interface KeyMap {
  [key: string]: Phaser.Input.Keyboard.Key | null;
}

export default function useKeys(sceneKey: string, keys: string[]) {
  const game = usePhaser(useCallback(({ game }) => game as Phaser.Game, []));
  const keyMap = useRef<KeyMap>({});
  useEffect(() => {
    const scene = game.scene.getScene(sceneKey) as BaseScene;
    if (scene) {
      const map: KeyMap = {};
      for (let key of keys) {
        map[key] = scene.input.keyboard.addKey(key, true);
      }
      keyMap.current = map;
      return () => {
      };
    }
  }, [sceneKey, game, keys]);
  return keyMap;
}
