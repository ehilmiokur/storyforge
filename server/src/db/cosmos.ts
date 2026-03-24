import { CosmosClient, Container } from '@azure/cosmos';

const DB_NAME = 'storyforge-db';
const SCRIPTS_CONTAINER = 'scripts';
const USERS_CONTAINER = 'users';

let scriptsContainer: Container | null = null;
let usersContainer: Container | null = null;

function getClient(): CosmosClient {
  const connectionString = process.env.COSMOS_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error('COSMOS_CONNECTION_STRING environment variable is not set');
  }
  return new CosmosClient(connectionString);
}

export async function getScriptsContainer(): Promise<Container> {
  if (scriptsContainer) return scriptsContainer;

  const client = getClient();
  const { database } = await client.databases.createIfNotExists({ id: DB_NAME });
  const { container } = await database.containers.createIfNotExists({
    id: SCRIPTS_CONTAINER,
    partitionKey: { paths: ['/id'] },
  });

  scriptsContainer = container;
  return scriptsContainer;
}

export async function getUsersContainer(): Promise<Container> {
  if (usersContainer) return usersContainer;

  const client = getClient();
  const { database } = await client.databases.createIfNotExists({ id: DB_NAME });
  const { container } = await database.containers.createIfNotExists({
    id: USERS_CONTAINER,
    partitionKey: { paths: ['/id'] },
  });

  usersContainer = container;
  return usersContainer;
}
