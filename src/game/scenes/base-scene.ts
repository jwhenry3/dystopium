import PubSub from "pubsub-js";

export class BaseScene extends Phaser.Scene {

  hasPreloaded = false;
  hasCreated = false;

  preload() {
    PubSub.publish(this.scene.key + ':preload', {scene: this});
    this.hasPreloaded = true;
    this.hasCreated = false;
  }

  create() {
    PubSub.publish(this.scene.key + ':create', {scene: this});
    this.hasCreated = true;
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
    PubSub.publish(this.scene.key + ':update', {scene: this, data: {time, delta}});
  }
}
