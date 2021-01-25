export interface SceneHook<T = Phaser.Scene> {
  scene: T;
}

export interface SceneHookWithData<C = {}, T = Phaser.Scene> {
  scene: T;
  data: C
}
