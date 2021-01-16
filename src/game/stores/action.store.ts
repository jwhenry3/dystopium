import create, {State} from "zustand";

export enum Actions {
  IDLE,
  BATTLE_IDLE,
  WALKING,
  RUNNING,
  ATTACKING,
  DEFENDING,
  CASTING,
  TAKING_DAMAGE,
  USING_SKILL, // animations would be determined by the skill being used (battle skills, life skills, etc)
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface ActionData extends State {
  actions: { [id: string]: Actions[] }
  update: (data: { [id: string]: Actions[] }) => void
}


export const useActions = create<ActionData>((set, get) => ({
  actions: {},
  update: (data: { [id: string]: Actions[] }) => set({actions: {...get().actions, ...data}})
}));
