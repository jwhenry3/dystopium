
export default class Example extends Phaser.Scene {

  constructor() {
    super({
      key: 'example'
    });
  }
  preload() {

  }

  create() {
    console.log('Example Scene Loaded');
  }
  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}
