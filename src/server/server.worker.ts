import "./index";
import PubSub                           from "pubsub-js";
import {CreateCharacterData, Direction} from "./contracts";
import lf                               from "lovefield";

const schema = lf.schema.create('dystopium', 1);
schema.createTable('Account')
      .addColumn('username', lf.Type.STRING)
      .addColumn('password', lf.Type.STRING)
      .addPrimaryKey(['username']);

schema.connect().then(async db => {
  const table = db.getSchema().table('Account');
  const row = table.createRow({
    username: 'test',
    password: 'pass'
  });
  await db.insertOrReplace().into(table).values([row]).exec();
  const results = await db.select().from(table).where(table.username.eq('test')).exec();
  console.log(results);
});

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
