import {PlayerEquipment, PlayerIdentity} from "../shared/state.models";
import create, {State}                   from "zustand";

export interface CharacterData {
  identity: PlayerIdentity;
  equipment: PlayerEquipment;
}

export interface CharactersState extends State {
  character: CharacterData | null;
  characters: CharacterData[];
  changeCharacter: (character: CharacterData | null) => void;
  loadCharacters: (characters: CharacterData[]) => void;
}

const data = {
  character: null,
  characters: []
};
export const getChangeCharacter = ({changeCharacter}: CharactersState) => changeCharacter;
export const getLoadCharacters = ({loadCharacters}: CharactersState) => loadCharacters;
export const useCharacters = create<CharactersState>((set): CharactersState => ({
  ...data,
  changeCharacter: (character: CharacterData | null) => set({character}),
  loadCharacters: (characters: CharacterData[]) => set({character: null, characters})
}));
