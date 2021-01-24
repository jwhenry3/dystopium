import { useCallback, useEffect }                  from "react";
import { BaseScene, SceneHook, SceneHookWithData } from "./base-scene";
import { usePhaser }                               from "../stores/game/phaser.store";
import { Subject }                                 from "rxjs";
import { takeUntil }                               from "rxjs/operators";


export interface SceneHookConfig {
  preload?: (hook: SceneHook) => void;
  create?: (hook: SceneHook) => void;
  update?: (hook: SceneHookWithData<{ time: number, delta: number }>) => void;
  destroy?: (hook: SceneHook) => void;
}

export function useSceneHooks(key: string, config: SceneHookConfig) {
  const game = usePhaser(useCallback(({ game }) => game as Phaser.Game, []));
  const scene = game.scene.getScene(key) as BaseScene;
  useEffect(() => {
    if (!scene) {
      return;
    }
    const stop = new Subject();
    if (config.preload) {
      scene?.hasPreloaded && config.preload({ scene });
      scene.onPreload.pipe(takeUntil(stop)).subscribe((hook: SceneHook) => {
        config.preload && config.preload(hook);
      });
    }
    if (config.create) {
      scene?.hasCreated && config.create({ scene });
      scene.onCreate.pipe(takeUntil(stop)).subscribe((hook: SceneHook) => {
        config.create && config.create(hook);
      });
    }
    if (config.update) {
      scene.onUpdate.pipe(takeUntil(stop)).subscribe((hook: SceneHookWithData<{ time: number, delta: number }>) => {
        config.update && config.update(hook);
      });
    }
    return () => {
      stop.next();
      config.destroy && config.destroy({ scene });
    };
  }, [key, game, config, scene]);
}
