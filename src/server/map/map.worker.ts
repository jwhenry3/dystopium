import { expose } from "comlink";
import "@geckos.io/phaser-on-nodejs";
import "phaser";
import { DirectionVector } from "../../game/utils/get-direction";
const state: {
  game: null;
  scene: null;
  characters: { [name: string]: null };
} = {
  game: null,
  scene: null,
  characters: {},
};

async function load(map: string) {
  if (!state.game) {
    console.log("loading", map);
    if (map === "example") {
      return;
    }
  }
}

async function addCharacter(name: string, x: number, y: number) {
  // if (state.game && state.scene) {
  // state.characters[name] = new Character(state.scene, x, y);
  // }
}
async function moveCharacter(name: string, directions: DirectionVector) {
  // if (state.characters[name]) {
  //   state.characters[name].directions = directions;
  // }
}

const exports = {
  load,
  addCharacter,
  moveCharacter,
};
export declare type MapWorker = typeof exports;

expose(exports);
