import { Subject } from "rxjs";

export interface SceneHook {
  scene: BaseScene;
}

export interface SceneHookWithData<C = {}> {
  scene: BaseScene;
  data: C
}

export class BaseScene extends Phaser.Scene {

  hasPreloaded = false;
  hasCreated = false;

  onPreload = new Subject<SceneHook>();
  onCreate = new Subject<SceneHook>();
  onUpdate = new Subject<SceneHookWithData<{ time: number, delta: number }>>();

  preload() {
    this.onPreload.next({ scene: this });
    this.hasPreloaded = true;
    this.hasCreated = false;
  }

  create() {
    this.onCreate.next({ scene: this });
    this.hasCreated = true;
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
    this.onUpdate.next({ scene: this, data: { time, delta } });
  }
}
