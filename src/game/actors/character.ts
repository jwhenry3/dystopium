import { BaseScene } from "../scenes/base-scene";
import { KeyMap } from "../interfaces/keys";
import { DirectionVector } from "../utils/get-direction";
// @ts-ignore
import MoveTo from "phaser3-rex-plugins/plugins/moveto";
import { rules } from "../stores/game/rules.store";

export interface MoveToInstance {
  moveTo(x: number, y: number): void;
  setEnable(value: boolean): void;
  enable: boolean;
  pause(): void;
  resume(): void;
  stop(): void;
  isRunning: boolean;
}

export class Character extends Phaser.GameObjects.Arc {
  keys: KeyMap = {};
  lastVel = { x: 0, y: 0 };
  directions: DirectionVector = [0, 0];
  nextPosition: DirectionVector = [0, 0];
  moveTo: MoveToInstance = new MoveTo(this, {
    speed: 90 * rules.movementSpeed,
    rotateToTarget: false,
  });

  constructor(
    public scene: BaseScene,
    public name: string,
    x: number,
    y: number,
    public isLocalPlayer = false
  ) {
    super(
      scene,
      x,
      y,
      16,
      0,
      360,
      false,
      Phaser.Display.Color.GetColor(30, 100, 200),
      0.5
    );
    this.nextPosition = [x, y];
    this.scene.actors.add(this, true);
    this.scene.characters[this.name] = this;
  }

  update(...args: any[]): void {
    super.update(...args);
  }
  setNextPosition(x: number, y: number) {
    this.nextPosition[0] = typeof x !== "undefined" ? x : this.nextPosition[0];
    this.nextPosition[1] = typeof y !== "undefined" ? y : this.nextPosition[1];
    this.moveTo.moveTo(this.nextPosition[0], this.nextPosition[1]);
  }
}
