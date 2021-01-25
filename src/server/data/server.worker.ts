import "../services";
import PubSub from "pubsub-js";
import { CreateCharacterData, Direction } from "../contracts";
import { setupDatabase, waitForDatabase } from "./lovefield/setup-database";
import { CharacterModel } from "./lovefield/entities";
import { op } from "lovefield";
import { expose } from "comlink";

setupDatabase().then();

async function addUser(username: string) {
  try {
    const db = await waitForDatabase();
    const users = db.getSchema().table("users");
    await db
      .insertOrReplace()
      .into(users)
      .values([
        users.createRow({
          username,
        }),
      ])
      .exec();
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

// Character

async function getCharacters(username: string): Promise<CharacterModel[]> {
  try {
    const db = await waitForDatabase();
    const characters = db.getSchema().table("characters");
    return (await db
      .select()
      .from(characters)
      .where(characters.user.eq(username))
      .exec()) as CharacterModel[];
  } catch (e) {
    console.warn(e);
    return [];
  }
}

async function createCharacter(username: string, data: CreateCharacterData) {
  try {
    const db = await waitForDatabase();
    const characters = db.getSchema().table("characters");
    await db
      .insertOrReplace()
      .into(characters)
      .values([
        characters.createRow({
          user: username,
          name: data.name,
          race: data.race,
          gender: data.gender,
        }),
      ])
      .exec();
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

async function deleteCharacter(username: string, character: string) {
  try {
    const db = await waitForDatabase();
    const characters = db.getSchema().table("characters");
    await db
      .delete()
      .from(characters)
      .where(
        op.and(characters.user.eq(username), characters.name.eq(character))
      )
      .exec();
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

async function joinGame(token: string, character: string) {}

// Presence

// In Game

async function move(
  id: string,
  directions: [Direction] | [Direction, Direction]
) {}

async function subscribe(
  event: string,
  callback: (eventName: string, data: any) => void
) {
  PubSub.subscribe(event, callback);
}

setTimeout(() => {
  PubSub.publish("test", { data: "hello!" });
}, 2000);

const exports = {
  addUser,
  getCharacters,
  createCharacter,
  deleteCharacter,
  subscribe,
  move,
  joinGame,
};
export type ServerWorker = typeof exports;

expose(exports);
