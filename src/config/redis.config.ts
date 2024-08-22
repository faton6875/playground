import { createClient } from 'redis';
const { REDIS_HOST, REDIS_PORT } = process.env;
const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis', err);
  }
})();

export default client;
