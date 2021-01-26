import { useWorlds } from "../stores/game/maps.store";
import { getType, useServers } from "../stores/lobby/servers.store";
import { DirectionVector } from "../utils/get-direction";

export const useConnection = () => {
  const type = useServers(getType);
  const maps = useWorlds();

  return {
    addCharacter(map: string, name: string, x: number, y: number) {
      if (type === "offline") {
        maps.maps[map]?.mapWorker.addCharacter(name, x, y);
      }
    },
    moveCharacter(map: string, name: string, directions: DirectionVector) {
      if (type === "offline") {
        maps.maps[map]?.mapWorker.moveCharacter(name, directions);
      }
    },
  };
};
