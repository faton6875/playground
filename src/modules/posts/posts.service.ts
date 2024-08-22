import { connectToDatabase } from '../../config/mongo.config';
import client from '../../config/redis.config';

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
  await client.del('posts');
  const posts = await client.get('posts');
  if (posts) {
    return JSON.parse(posts);
  } else {
    const res = await collection.find({}).toArray();
    client.set('posts', JSON.stringify(res));
    return res;
  }
};

export { createPost, getPosts };
