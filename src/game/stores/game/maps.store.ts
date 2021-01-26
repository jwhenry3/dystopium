import { Remote } from "comlink";
import { useCallback, useEffect } from "react";
import create, { State } from "zustand";
import { MapWorker, startMap } from "../../../server/map/map";
import { useServers } from "../lobby/servers.store";

export interface WorldMap {
  [key: string]: { worker: Worker; mapWorker: Remote<MapWorker> };
}
export interface WorldsState extends State {
  maps: WorldMap;
  loadMaps: () => void;
  destroy: () => void;
}

async function loadMaps() {
  const maps = ["example"];
  const workers = await Promise.all(maps.map((key) => startMap(key)));
  return workers.reduce((acc, worker, i) => {
    acc[maps[i]] = worker;
    console.log("loaded", maps[i]);
    return acc;
  }, {} as WorldMap);
}
export const useWorlds = create<WorldsState>((set, get) => ({
  maps: {},
  loadMaps: async () => {
    set({ maps: await loadMaps() });
  },
  destroy: () => {
    const current = get();
    Object.keys(current.maps).forEach((key) =>
      current.maps[key].worker.terminate()
    );
    set({ maps: {} });
  },
}));
const getHooks = ({ loadMaps, destroy }: WorldsState) => ({
  loadMaps,
  destroy,
});
export const useWorldsLifecycle = () => {
  const type = useServers(({ type }) => type);
  const { loadMaps, destroy } = useWorlds(getHooks);
  useEffect(() => {
    if (type === "offline") {
      loadMaps();
    } else {
      destroy();
    }
  }, [loadMaps, destroy, type]);
};

export const useWorld = (map: string) => {
  return useWorlds(useCallback(({ maps }) => maps[map], [map]));
};
