import { World, Body, Circle, WorldOptions } from "p2";
import { DirectionVector } from "../../game/utils/get-direction";
import { loadMapConfig, MapConfig } from "./loader";

export class GameWorld extends World {
  protected fixedTimeStep = 1 / 30;
  protected maxSubSteps = 10;
  protected running = false;
  protected lastTime = 0;

  characters: { [name: string]: Body } = {};

  constructor(
    public name: string,
    mapConfig: MapConfig,
    worldOptions?: WorldOptions
  ) {
    super({
      gravity: [0, 0],
      ...worldOptions,
    });
    loadMapConfig(this, mapConfig);
  }

  addCharacter(name: string, x: number, y: number) {
    if (this.characters[name]) {
      console.warn(`The character '${name}' is already on the ${this.name}`);
      return;
    }
    const body = new Body({ mass: 5, position: [x, y] });
    const circle = new Circle({ radius: 16 });
    body.addShape(circle);
    this.addBody(body);
    this.characters[name] = body;
  }

  moveCharacter(name: string, [x, y]: DirectionVector) {
    if (this.characters[name]) {
      this.characters[name].velocity = [x * 4, y * 4];
      console.log(
        `Moving ${name}`,
        [x, y],
        "from",
        this.characters[name].position
      );
    }
  }

  removeCharacter(name: string) {
    if (this.characters[name]) {
      this.removeBody(this.characters[name]);
      delete this.characters[name];
    }
  }
  animate = (time: number) => {
    if (this.running) {
      requestAnimationFrame(this.animate);
      const deltaTime = this.lastTime ? time - this.lastTime : 0;
      this.step(this.fixedTimeStep, deltaTime, this.maxSubSteps);
      this.lastTime = time;
    }
  };

  start() {
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.animate);
    }
  }
  async clear() {
    for (const character of Object.keys(this.characters)) {
      await this.removeCharacter(character);
    }
  }

  stop() {
    this.running = false;
  }
}
