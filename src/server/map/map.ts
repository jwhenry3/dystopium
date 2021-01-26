import { Remote, wrap } from "comlink";

export declare type MapWorker = import("./map.worker").MapWorker;

export async function startMap(map: string) {
  const worker = new Worker("./map.worker", {
    name: `map-${map}`,
    type: "module",
  });
  const mapWorker = wrap<MapWorker>(worker) as Remote<MapWorker>;
  await mapWorker.load(map);
  return { worker, mapWorker };
}
