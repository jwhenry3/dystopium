import { PlayerEquipment, PlayerIdentity } from "../stores/shared/state.models";
import { CharacterData } from "../stores/lobby/characters.store";
import { Account } from "../stores/lobby/account.store";
import { CreateCharacterData } from "../../server/contracts";
import Server from "../../server/data/server";

export async function getRemoteCharacters(
  type: "local" | "remote",
  account: Account
): Promise<CharacterData[]> {
  if (type === "local") {
    return Server.getCharacters(account.username).then((characters) => {
      return characters.map(
        (character) =>
          ({
            identity: {
              id: character.id + "",
              name: character.name,
              gender: character.gender,
              race: character.race,
              level: 1,
              map: "tutorial",
            } as PlayerIdentity,
            equipment: {
              weapons: [null],
              head: null,
              neck: null,
              chest: null,
              hands: null,
              waist: null,
              legs: null,
              feet: null,
              back: null,
              leftRing: null,
              rightRing: null,
            } as PlayerEquipment,
          } as CharacterData)
      );
    });
  }
  return [];
}

export async function createRemoteCharacter(
  type: "local" | "remote",
  account: Account,
  data: CreateCharacterData
) {
  if (type === "local") {
    return Server.createCharacter(account!.username, {
      name: data.name,
      gender: data.gender,
      race: data.race,
    });
  }
}

export async function deleteRemoteCharacter(
  type: "local" | "remote",
  account: Account,
  name: string
) {
  if (type === "local") {
    return Server.deleteCharacter(account!.username, name);
  }
}
