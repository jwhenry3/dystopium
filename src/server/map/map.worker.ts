import { expose } from "comlink";
import { DirectionVector } from "../../game/utils/get-direction";
import { GameWorld } from "./game.world";
import { exampleConfig } from "./configs/example.config";
import PubSub from "pubsub-js";

const state: {
  world: GameWorld | null;
} = {
  world: null,
};

async function load(map: string) {
  if (!state.world) {
    console.log("loading", map);
    if (map === "example") {
      state.world = new GameWorld(exampleConfig.name, exampleConfig);
    }
  }
  console.log("starting", map);
  state.world?.clear();
  state.world?.start();
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

async function subscribe(
  event: string,
  callback: (eventName: string, data: any) => void
) {
  return PubSub.subscribe(event, callback);
}

async function unsubscribe(token: string) {
  PubSub.unsubscribe(token);
}
const exports = {
  load,
  start,
  stop,
  addCharacter,
  moveCharacter,
  removeCharacter,
  subscribe,
  unsubscribe,
};
export declare type MapWorker = typeof exports;

expose(exports);
