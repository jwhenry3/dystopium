import "./index";
import PubSub                           from "pubsub-js";
import {CreateCharacterData, Direction} from "./contracts";

export async function processData(data: string) {

  return data;
}

// Account

export async function login(username: string, password: string) {

}

export async function register(username: string, password: string) {

}

// Character

export function getCharacters(token: string) {

}

export async function createCharacter(token: string, data: CreateCharacterData) {

}

export async function deleteCharacter(token: string, character: string) {

}

export async function joinGame(token: string, character: string) {

}

// Presence


// In Game


export async function move(id: string, directions: [Direction] | [Direction, Direction]) {

}

export async function subscribe(event: string, callback: (eventName: string, data: any) => void) {
  PubSub.subscribe(event, callback);
}

setTimeout(() => {
  PubSub.publish('test', {data: 'hello!'});
}, 2000);
