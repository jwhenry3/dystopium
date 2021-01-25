import { expose } from "comlink";

async function load(map: string) {
  console.log("loading", map);
}

const exports = {
  load,
};
export declare type MapWorker = typeof exports;

expose(exports);
