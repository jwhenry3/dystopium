import create, {State}                                                    from "zustand";
import {PlayerDetails, PlayerEquipment, PlayerIdentity, PlayerStatPoints} from "../state.models";

export interface PlayersData extends State {
  identity: { [id: string]: PlayerIdentity } // player list, name over player in map, race, appearance etc (can view multiple at once)
  equipment: { [id: string]: PlayerEquipment } // displayed equipment over player, inspecting player equipment, etc (can view multiple at once)
  stats: { [id: string]: PlayerStatPoints } // inspecting player details (only see 1~2 at a time, generally)
  update: (data: { [id: string]: Partial<PlayerDetails> }) => void
  remove: (id: string) => void
}

// Preload from file or server
const data = {
  identity: {},
  equipment: {},
  stats: {}
};

export const usePlayers = create<PlayersData>((set, get): PlayersData => ({
  ...data,
  update: (data: { [id: string]: Partial<PlayerDetails> }) => {
    const modified: Partial<PlayersData> = {};
    const {identity, equipment, stats} = get();
    for (let id of Object.keys(data)) {
      if (data[id].identity) {
        modified.identity = identity;
      }
      if (data[id].equipment) {
        modified.equipment = equipment;
      }
      if (data[id].stats) {
        modified.stats = stats;
      }
      identity[id] = data[id].identity || identity[id];
      equipment[id] = data[id].equipment || equipment[id];
      stats[id] = data[id].stats || stats[id];
    }
    set(modified);
  },
  remove: (id) => {
    const {identity, equipment, stats} = get();
    delete identity[id];
    delete equipment[id];
    delete stats[id];
    set({identity, equipment, stats});
  }
}));
