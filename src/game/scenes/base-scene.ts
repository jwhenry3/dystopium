import { BehaviorSubject, Subject } from "rxjs";
import { Character } from "../actors/character";
import { SceneHook, SceneHookWithData } from "../interfaces/scene-hook";

export class BaseScene extends Phaser.Scene {
  actors!: Phaser.GameObjects.Group;
  characters: { [name: string]: Character } = {};
  hasPreloaded = false;
  hasCreated = false;

  onPreload = new BehaviorSubject<SceneHook<BaseScene> | null>(null);
  onCreate = new BehaviorSubject<SceneHook<BaseScene> | null>(null);
  onUpdate = new Subject<
    SceneHookWithData<{ time: number; delta: number }, BaseScene>
  >();

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
