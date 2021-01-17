import {PlayerEquipment, PlayerIdentity} from "../shared/state.models";
import create, {State}                   from "zustand";

export interface CharacterData {
  identity: PlayerIdentity;
  equipment: PlayerEquipment;
}

export interface CharactersData extends State {
  character: CharacterData | null;
  characters: CharacterData[];
  changeCharacter: (character: CharacterData | null) => void;
  loadCharacters: (characters: CharacterData[]) => void;
}

const data = {
  character: null,
  characters: []
};

export const useCharacters = create<CharactersData>((set): CharactersData => ({
  ...data,
  changeCharacter: (character: CharacterData | null) => set({character}),
  loadCharacters: (characters: CharacterData[]) => set({character: null, characters})
}));
