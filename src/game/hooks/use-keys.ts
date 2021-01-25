import { useCallback, useEffect, useRef } from "react";
import { usePhaser } from "../stores/game/phaser.store";
import { BaseScene } from "../scenes/base-scene";
import { KeyMap } from "../interfaces/keys";

function buildKeys(scene: Phaser.Scene, keys: string[]) {
  const map: KeyMap = {};
  for (let key of keys) {
    map[key] = scene.input.keyboard.addKey(key, true);
  }
  return map;
}
export default function useKeys(sceneKey: string, keys: string[]) {
  const game = usePhaser(useCallback(({ game }) => game as Phaser.Game, []));
  const keyMap = useRef<KeyMap>({});
  useEffect(() => {
    const scene = game.scene.getScene(sceneKey) as BaseScene;
    if (scene) {
      keyMap.current = buildKeys(scene, keys);
      return () => {};
    }
  }, [sceneKey, game, keys]);
  return keyMap;
}
