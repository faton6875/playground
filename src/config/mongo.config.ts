import { MongoClient, Db } from 'mongodb';

let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) {
    return db;
  }
  const client = new MongoClient('mongodb://root:example@mongo:27017');
  try {
    await client.connect();
    db = client.db('mydatabase');
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
  return db;
};
