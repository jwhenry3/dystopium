import { BaseScene } from "../base-scene";

export default class Example extends BaseScene {

  constructor() {
    super({
      key: 'example'
    });
  }

  preload() {
    this.load.image('grass', '/grasstest_0.png');
    super.preload();
  }

  create() {
    super.create();
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        this.add.image(x * 32, y * 32, 'grass');
      }
    }
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}
