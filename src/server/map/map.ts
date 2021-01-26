import { wrap } from "comlink";

export declare type MapWorker = import("./map.worker").MapWorker;

export async function startMap(map: string): Promise<MapWorker> {
  const worker = new Worker("./map.worker", {
    name: `map-${map}`,
    type: "module",
  });
  const workerInstance = wrap<MapWorker>(worker);
  await workerInstance.load(map);

  return workerInstance as MapWorker;
}
