import { spawn, Thread, Worker } from 'threads';
import { MapWorker } from './map-worker';

export async function startMap(map: string) {
  const worker = await spawn<MapWorker>(
    new Worker('./map-worker', { type: 'module' }),
  );
  await worker.load(map);
  return worker;
}
