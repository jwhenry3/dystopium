import { useCallback, useEffect } from "react";
import { BaseScene } from "../scenes/base-scene";
import { usePhaser } from "../stores/game/phaser.store";
import { Observable, Subject } from "rxjs";
import { filter, first, takeUntil } from "rxjs/operators";
import {
  BaseSceneHook,
  BaseSceneHookWithData,
  SceneHookConfig,
} from "../interfaces/scene-hook-config";

const waitForData = <T>(observable: Observable<any>): Observable<T> => {
  return observable.pipe(filter((data) => !!data));
};

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
      waitForData<BaseSceneHook>(
        scene.onPreload.pipe(takeUntil(stop))
      ).subscribe((hook: BaseSceneHook) => {
        config.preload && config.preload(hook);
      });
    }
    if (config.create) {
      scene?.hasCreated && config.create({ scene });
      scene.onUpdate
        .pipe(takeUntil(stop), first())
        .subscribe(
          (hook: BaseSceneHookWithData<{ time: number; delta: number }>) => {
            config.create && config.create(hook);
          }
        );
    }
    if (config.update) {
      scene.onUpdate
        .pipe(takeUntil(stop))
        .subscribe(
          (hook: BaseSceneHookWithData<{ time: number; delta: number }>) => {
            config.update && config.update(hook);
          }
        );
    }
    return () => {
      stop.next();
      config.destroy && config.destroy({ scene });
    };
  }, [key, game, config, scene]);
}
