import Phaser from "phaser";

export default class Example extends Phaser.Scene {

  constructor() {
    super({
      key: 'example'
    });
  }
  preload() {

  }

  create() {
    console.log('created!');
  }
  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}
