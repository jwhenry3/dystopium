import create, {State} from "zustand";


export interface EffectData extends State {
  effects: { [id: string]: string[] } // combination of graphical effects
  update: (data: { [id: string]: string[] }) => void
}


export const useEffects = create<EffectData>((set, get) => ({
  effects: {},
  update: (data: { [id: string]: string[] }) => set({effects: {...get().effects, ...data}})
}));
