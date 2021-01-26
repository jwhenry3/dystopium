import { Remote } from "comlink";
import { useCallback, useEffect } from "react";
import create, { State } from "zustand";
import { MapWorker, startMap } from "../../../server/map/map";
import { useServers } from "../lobby/servers.store";

export interface WorldsState extends State {
  maps: { [key: string]: { worker: Worker; mapWorker: Remote<MapWorker> } };
  loadMaps: () => void;
  destroy: () => void;
}

export const useWorlds = create<WorldsState>((set, get) => ({
  maps: {},
  loadMaps: () => {
    startMap("example").then((map) => {
      set({ maps: { ...get().maps, example: map } });
      map.mapWorker.addCharacter("test", 100, 100);
      let dir = 1;
      let dir2 = 1;
      let tick = 0;
      setInterval(() => {
        map.mapWorker.moveCharacter("test", [1 * dir, 1 * dir2]);
        dir = dir * -1;
        if (tick % 10 === 2) {
          dir2 = dir2 * -1;
        }
        tick++;
      }, 2000);
    });
  },
  destroy: () => {
    const current = get();
    for (const key of Object.keys(current.maps)) {
      current.maps[key].worker.terminate();
    }
    set({ maps: {} });
  },
}));

export const useWorldsLifecycle = () => {
  const type = useServers(({ type }) => type);
  const { loadMaps, destroy } = useWorlds(
    useCallback(({ loadMaps, destroy }) => ({ loadMaps, destroy }), [])
  );
  useEffect(() => {
    if (type === "offline") {
      loadMaps();
    } else {
      destroy();
    }
  }, [loadMaps, destroy, type]);
};
