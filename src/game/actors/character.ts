import { BaseScene }   from "../scenes/base-scene";
import { KeyMap }      from "../scenes/input/keys";
import { getVelocity } from "../input/get-velocity";

export class Character extends Phaser.GameObjects.Arc {

  keys: KeyMap = {};
  lastVel = { x: 0, y: 0 };

  constructor(public scene: BaseScene, x: number, y: number) {
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
    this.scene.actors.add(this, true);
    this.scene.physics.add.existing(this);
  }

  update(...args: any[]): void {
    super.update(...args);
    const { x, y } = getVelocity(this.keys as KeyMap);
    if (x !== this.lastVel.x || y !== this.lastVel.y) {
      this.lastVel = { x, y };
      (this.body as Phaser.Physics.Arcade.Body).setVelocity(x, y);
    }
  }
}
