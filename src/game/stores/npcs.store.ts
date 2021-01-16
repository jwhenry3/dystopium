import create, {State} from "zustand";
import {Position}      from "./shared/position";

export declare type NpcAction = 'buy' | 'sell' | 'quest';

export interface NpcShop {
  name: string
  sells: { id: string, price: number }[]
  buys: { id: string, price: number }[]
}

export interface NpcQuest {
  questId: string
  progressStep: number
}

export interface NpcIdentity {
  name: string
  sprite: string
  movable: boolean
  movementPattern: Position[]
  actions: NpcAction[]
}

export interface NpcConfig extends State {
  identity: { [id: string]: NpcIdentity }
  shops: { [id: string]: NpcShop }
  quests: { [id: string]: NpcQuest }
}

// Preload from file or server
const config = {
  identity: {},
  shops: {},
  quests: {}
};

export const useNpcData = create<NpcConfig>((): NpcConfig => config);
