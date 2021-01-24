import { BehaviorSubject, Subject } from "rxjs";

export interface SceneHook {
  scene: BaseScene;
}

export interface SceneHookWithData<C = {}> {
  scene: BaseScene;
  data: C
}

export class BaseScene extends Phaser.Scene {

  actors!: Phaser.GameObjects.Group;
  hasPreloaded = false;
  hasCreated = false;

  onPreload = new BehaviorSubject<SceneHook | null>(null);
  onCreate = new BehaviorSubject<SceneHook | null>(null);
  onUpdate = new Subject<SceneHookWithData<{ time: number, delta: number }>>();

  preload() {
    this.onPreload.next({ scene: this });
    this.hasPreloaded = true;
    this.hasCreated = false;
  }

  create() {
    this.actors = this.add.group({ runChildUpdate: true });
    this.hasCreated = true;
    this.onCreate.next({ scene: this });
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
    this.onUpdate.next({ scene: this, data: { time, delta } });
  }
}
