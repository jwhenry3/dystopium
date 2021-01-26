import { BaseScene } from "../scenes/base-scene";
import { KeyMap } from "../interfaces/keys";
import { getVelocity } from "../utils/get-velocity";
import { DirectionVector, getDirection } from "../utils/get-direction";
import { isInWebWorker } from "../../server/util";

export class Character extends Phaser.GameObjects.Arc {
  keys: KeyMap = {};
  lastVel = { x: 0, y: 0 };
  directions: DirectionVector = [0, 0];

  constructor(
    public scene: BaseScene,
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
    this.scene.actors.add(this, true);
    this.scene.physics.add.existing(this);
  }

  update(...args: any[]): void {
    super.update(...args);
    const directions: DirectionVector =
      isInWebWorker() || !this.isLocalPlayer
        ? this.directions
        : getDirection(this.keys as KeyMap);
    const { x, y } = getVelocity(...directions);
    if (x !== this.lastVel.x || y !== this.lastVel.y) {
      this.lastVel = { x, y };
      (this.body as Phaser.Physics.Arcade.Body).setVelocity(x, y);
      console.log("moving character", this.name, this.lastVel);
    }
  }
}
