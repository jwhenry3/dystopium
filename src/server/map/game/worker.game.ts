const FPS = 30;
(global as any).phaserOnNodeFPS = FPS;
export class WorkerGame extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.HEADLESS,
      width: 800,
      height: 600,
      audio: false as any,
      scene: [],
      fps: {
        target: FPS,
      },
      physics: {
        default: "arcade",
      },
    });
  }
}
