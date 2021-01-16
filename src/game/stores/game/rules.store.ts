import create, {State} from "zustand";

export interface GameRules extends State {
  movementSpeed: number
}

// Preload from file or server
const config = {
  movementSpeed: 1
};

export const useGameRules = create<GameRules>((): GameRules => config);
