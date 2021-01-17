import create, {State} from "zustand";
import {Actions}       from "../../../server/contracts";

export interface ActionData extends State {
  actions: { [id: string]: Actions[] }
  update: (data: { [id: string]: Actions[] }) => void
}


export const useActions = create<ActionData>((set, get) => ({
  actions: {},
  update: (data: { [id: string]: Actions[] }) => set({actions: {...get().actions, ...data}})
}));
