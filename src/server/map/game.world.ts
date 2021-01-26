import { World, WorldOptions } from "p2";
import { DirectionVector } from "../../game/utils/get-direction";
import { loadMapConfig, MapConfig } from "./loader";
import { throttle } from "lodash";
import { difference } from "../util";
import PubSub from "pubsub-js";
import { Movable } from "./movable";

export class GameWorld extends World {
  protected fixedTimeStep = 1 / 30;
  protected maxSubSteps = 10;
  protected running = false;
  protected lastTime = 0;

  characters: { [name: string]: Movable } = {};

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
    this.characters[name] = new Movable(x, y);
    this.addBody(this.characters[name]);
  }

  moveCharacter(name: string, [x, y]: DirectionVector) {
    if (this.characters[name]) {
      this.characters[name].fixedVelocity = [
        Math.floor(x * 4),
        Math.floor(y * 4),
      ];
    }
  }

  removeCharacter(name: string) {
    if (this.characters[name]) {
      this.removeBody(this.characters[name]);
      delete this.characters[name];
    }
  }
  protected lastState: { [key: string]: any } = {};
  update = throttle((time) => {
    const diff: any = {};
    let hasDiff = false;
    const state = Object.keys(this.characters).reduce((acc, key) => {
      acc[key] = {
        position: [
          this.characters[key].position[0],
          this.characters[key].position[1],
        ],
      };
      const change = difference(
        acc[key],
        (this.lastState[key as string] as any) || {}
      );
      if (JSON.stringify(change) !== "{}") {
        hasDiff = true;
        diff[key] = change;
      }
      return acc;
    }, {} as any);
    if (hasDiff) {
      PubSub.publish("map:update", diff);
      this.lastState = state;
    }
  }, 200);
  animate = (time: number) => {
    if (this.running) {
      requestAnimationFrame(this.animate);
      const deltaTime = this.lastTime ? time - this.lastTime : 0;
      this.step(this.fixedTimeStep, deltaTime, this.maxSubSteps);
      for (let key of Object.keys(this.characters)) {
        console.log(
          this.characters[key].velocity,
          this.characters[key].fixedVelocity
        );
        this.characters[key].velocity = [
          this.characters[key].fixedVelocity[0],
          this.characters[key].fixedVelocity[1],
        ] as [number, number];
      }
      setTimeout(() => this.update(time));
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
