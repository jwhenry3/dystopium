import { BaseScene } from "../scenes/base-scene";
import { KeyMap } from "../interfaces/keys";
import { getVelocity } from "../utils/get-velocity";
import { DirectionVector } from "../utils/get-direction";

export class Character extends Phaser.GameObjects.Arc {
  keys: KeyMap = {};
  lastVel = { x: 0, y: 0 };
  directions: DirectionVector = [0, 0];

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
    this.scene.actors.add(this, true);
    this.scene.physics.add.existing(this);
    this.scene.characters[this.name] = this;
  }

  update(...args: any[]): void {
    super.update(...args);
    const directions: DirectionVector = this.directions;
    const { x, y } = getVelocity(...directions);
    if (x !== this.lastVel.x || y !== this.lastVel.y) {
      this.lastVel = { x, y };
      (this.body as Phaser.Physics.Arcade.Body).setVelocity(x, y);
      console.log("moving character", this.name, this.lastVel);
    }
  }
}
