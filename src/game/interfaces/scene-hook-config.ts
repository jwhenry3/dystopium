import { SceneHook, SceneHookWithData } from "./scene-hook";
import { BaseScene }                    from "../scenes/base-scene";

export declare type BaseSceneHook = SceneHook<BaseScene>;
export declare type BaseSceneHookWithData<C = {}> = SceneHookWithData<C, BaseScene>;

export interface SceneHookConfig {
  preload?: (hook: BaseSceneHook) => void;
  create?: (hook: BaseSceneHook) => void;
  update?: (hook: BaseSceneHookWithData<{ time: number, delta: number }>) => void;
  destroy?: (hook: BaseSceneHook) => void;
}
