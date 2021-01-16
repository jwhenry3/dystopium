
export default class Title extends Phaser.Scene {

  constructor() {
    super({
      key: 'title'
    });
  }
  preload() {

  }

  create() {
    console.log('Title Scene Loaded');
  }
  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}
