import { expose } from 'threads/worker';
import { DirectionVector } from './src/utils/directions';
import { GameWorld } from './src/physics/game.world';
import { exampleConfig } from './src/physics/maps/example.config';
import PubSub from 'pubsub-js';
import { Observable } from 'observable-fns';

const state: {
  world: GameWorld | null;
} = {
  world: null,
};

async function load(map: string) {
  if (!state.world) {
    console.log('loading', map);
    if (map === 'example') {
      state.world = new GameWorld(exampleConfig.name, exampleConfig);
    }
  }
  console.log('starting', map);
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

const observables: { [event: string]: Observable<any> } = {};

function subscribe(event: string) {
  if (!observables[event])
    observables[event] = new Observable(observer => {
      PubSub.subscribe(event, (event, data) => observer.next(data));
    });
  return observables[event];
}

const api = {
  load,
  start,
  stop,
  addCharacter,
  moveCharacter,
  removeCharacter,
  subscribe,
};
export declare type MapWorker = typeof api;

expose(api);
