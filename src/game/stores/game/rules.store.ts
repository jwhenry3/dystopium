import create, { State } from "zustand";

export interface GameRules extends State {
  movementSpeed: number;
}

// Preload from file or server
export const rules: GameRules = {
  movementSpeed: 2,
};

export const useGameRules = create<GameRules>((): GameRules => rules);
