import { connectToDatabase } from '../mongo.config';
import client from '../redis.config';

let collection;
connectToDatabase().then((db) => {
  collection = db.collection('posts');
});

const createPost = async (body) => {
  return await collection.insertOne({
    title: body.title,
    text: body.text,
  });
};

const getPosts = async () => {
  client.set('posts', 'dfdf');
  const posts = await client.get('posts');
  console.log(posts);
  return await collection.find({}).toArray();
};

export { createPost, getPosts };
