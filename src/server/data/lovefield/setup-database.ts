import lf     from "lovefield";
import PubSub from "pubsub-js";

export const state: { db: lf.Database | null } = {
  db: null
};

export async function setupDatabase() {
  const schema = lf.schema.create('dystopium', 1);
  schema.createTable('users')
        .addColumn('username', lf.Type.STRING)
        .addPrimaryKey(['username']);
  schema.createTable('characters')
        .addColumn('id', lf.Type.INTEGER)
        .addColumn('user', lf.Type.STRING)
        .addColumn('name', lf.Type.STRING)
        .addColumn('gender', lf.Type.STRING)
        .addColumn('race', lf.Type.STRING)
        .addPrimaryKey(['id'], true)
        .addUnique('idxCharacterName', ['name'])
        .addIndex('idxUserCharacter', ['user', 'name']);

  state.db = await schema.connect();
  PubSub.publish('db', state.db as lf.Database);
}

export async function waitForDatabase(): Promise<lf.Database> {
  if (!state.db) {
    await new Promise(resolve => PubSub.subscribeOnce('db', resolve));
  }
  return state.db as lf.Database;
}
