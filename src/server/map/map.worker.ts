import { expose } from "comlink";
import { DirectionVector } from "../../game/utils/get-direction";
import { ExampleWorld } from "./example/example.world";
import { BaseWorld } from "./base.world";
const state: {
  world: BaseWorld | null;
} = {
  world: null,
};

async function load(map: string) {
  if (!state.world) {
    console.log("loading", map);
    if (map === "example") {
      state.world = new ExampleWorld();
      state.world.start();
      return;
    }
  }
}

async function start() {
  state.world?.start();
}
async function stop() {
  state.world?.stop();
}

async function addCharacter(name: string, x: number, y: number) {
  state.world?.addCharacter(name, x, y);
}
async function removeCharacter(name: string) {
  state.world?.removeCharacter(name);
}
async function moveCharacter(name: string, directions: DirectionVector) {
  state.world?.moveCharacter(name, directions);
}

const exports = {
  load,
  start,
  stop,
  addCharacter,
  moveCharacter,
  removeCharacter,
};
export declare type MapWorker = typeof exports;

expose(exports);
