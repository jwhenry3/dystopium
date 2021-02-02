import { World, WorldOptions } from 'p2';
import { loadMapConfig, MapConfig } from './loader';
import { throttle } from 'lodash';
import { publish } from 'pubsub-js';
import { Movable } from './movable';
import { rules } from '../game-rules';
import { DirectionVector } from '../utils/directions';

export class GameWorld extends World {
  protected fixedTimeStep = 1 / 30;
  protected maxSubSteps = 10;
  protected running = false;
  protected lastTime = 0;

  characters: { [name: string]: Movable } = {};

  constructor(
    public name: string,
    mapConfig: MapConfig,
    worldOptions?: WorldOptions,
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
        Math.floor(x * 4 * rules.movementSpeed),
        Math.floor(y * 4 * rules.movementSpeed),
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
  update = throttle(time => {
    const diff: any = {};
    let hasDiff = false;
    const state = Object.keys(this.characters).reduce((acc, key) => {
      acc[key] = {
        position: [
          this.characters[key].position[0],
          this.characters[key].position[1],
        ],
      };
      const old = this.lastState[key as string];
      if (
        !old ||
        old.position[0] !== acc[key].position[0] ||
        old.position[1] !== acc[key].position[1]
      ) {
        hasDiff = true;
        diff[key] = acc[key];
      }
      return acc;
    }, {} as any);
    if (hasDiff) {
      publish('map:update:broadcast', diff);
      this.lastState = state;
    }
  }, 100);
  animate = (time: number) => {
    if (this.running) {
      this.requestAnimationFrame(this.animate);
      const deltaTime = this.lastTime ? time - this.lastTime : 0;
      this.step(this.fixedTimeStep, deltaTime, this.maxSubSteps);
      publish('map:update', { time, deltaTime });
      setTimeout(() => this.update(time));
      this.lastTime = time;
    }
  };

  start() {
    if (!this.running) {
      this.running = true;
      this.requestAnimationFrame(this.animate);
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
  requestAnimationFrame(f: (time: number) => void) {
    setImmediate(() => f(Date.now()));
  }
}
