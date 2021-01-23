import { useCallback, useEffect } from "react";
import { BaseScene }              from "./base-scene";
import PubSub                     from "pubsub-js";
import { usePhaser }              from "../stores/game/phaser.store";

export interface SceneHook {
  scene: Phaser.Scene;
}

export interface SceneHookWithData<C = {}> {
  scene: Phaser.Scene;
  data: C
}

export interface SceneHookConfig {
  preload?: (hook: SceneHook) => void;
  create?: (hook: SceneHook) => void;
  update?: (hook: SceneHookWithData<{ time: number, delta: number }>) => void;
  destroy?: (hook: SceneHook) => void;
}

export function useSceneHooks(key: string, config: SceneHookConfig) {
  const game = usePhaser(useCallback(({ game }) => game as Phaser.Game, []));
  useEffect(() => {
    const scene = game.scene.getScene(key) as BaseScene;
    let onPreload: any = null;
    let onCreate: any = null;
    let onUpdate: any = null;
    if (config.preload) {
      scene?.hasPreloaded && config.preload({ scene });
      onPreload = PubSub.subscribe(key + ':preload', (event: string, hook: SceneHook) => {
        config.preload && config.preload(hook);
      });
    }
    if (config.create) {
      scene?.hasCreated && config.create({ scene });
      onCreate = PubSub.subscribe(key + ':create', (event: string, hook: SceneHook) => {
        config.create && config.create(hook);
      });
    }
    if (config.update) {
      onUpdate = PubSub.subscribe(key + ':update', (event: string, hook: SceneHookWithData<{ time: number, delta: number }>) => {
        config.update && config.update(hook);
      });
    }
    return () => {
      onUpdate && PubSub.unsubscribe(onUpdate);
      onCreate && PubSub.unsubscribe(onCreate);
      onPreload && PubSub.unsubscribe(onPreload);
      config.destroy && config.destroy({ scene });
    };
  }, [key, game]);
}
