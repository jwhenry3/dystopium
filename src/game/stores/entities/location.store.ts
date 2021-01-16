import create, {State} from "zustand";
import {Position}      from "../shared/position";

export interface LocationData extends State {
  entities: { [id: string]: Position }
  update: (data: { [id: string]: Position }) => void
  remove: (id: string) => void
}

// Preload from file or server
const data = {
  scene: 'example',
  entities: {
    testNpc: {x: 100, y: 100}
  }
};

export const useLocation = create<LocationData>((set, get): LocationData => ({
  ...data,
  update: (data) => set({entities: {...get().entities, ...data}}),
  remove: (id) => {
    const {entities} = get();
    delete entities[id];
    set({entities});
  }
}));
