import { BaseScene } from "../base-scene";

export default class Example extends BaseScene {
  get music() {
    if (!this.sound.get("forest")) {
      this.sound.add("forest", {
        loop: true,
        volume: 0.2,
      });
    }
    return this.sound.get("forest");
  }
  constructor() {
    super({
      key: "example",
    });
  }

  preload() {
    this.load.image("grass", "/grasstest_0.png");
    this.load.audio("forest", "/music/forest.mp3");
    super.preload();
  }

  create() {
    super.create();
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        this.add.image(x * 32, y * 32, "grass");
      }
    }
    this.music.play();
  }
  destroy() {
    this.music.stop();
  }
}
