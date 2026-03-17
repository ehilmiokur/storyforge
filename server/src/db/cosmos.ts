import { CosmosClient, Container } from '@azure/cosmos';

const DB_NAME = 'storyforge';
const CONTAINER_NAME = 'scripts';

let scriptsContainer: Container | null = null;

export async function getScriptsContainer(): Promise<Container> {
  if (scriptsContainer) return scriptsContainer;

  const connectionString = process.env.COSMOS_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error('COSMOS_CONNECTION_STRING environment variable is not set');
  }

  const client = new CosmosClient(connectionString);

  const { database } = await client.databases.createIfNotExists({ id: DB_NAME });
  const { container } = await database.containers.createIfNotExists({
    id: CONTAINER_NAME,
    partitionKey: { paths: ['/id'] },
  });

  scriptsContainer = container;
  return scriptsContainer;
}
