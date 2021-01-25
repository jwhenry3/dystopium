import { wrap } from "comlink";

export declare type MapWorker = import("./map.worker").MapWorker;
const worker = new Worker("./map.worker", {
  name: "map-worker",
  type: "module",
});
const MapServer: MapWorker = wrap<MapWorker>(worker);

export default MapServer;
