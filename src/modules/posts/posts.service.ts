import { Collection } from 'mongodb';
import { connectToDatabase } from '../../config/mongo.config';
import client from '../../config/redis.config';
import event from '../../logger';
import { Post } from './interfaces';

let collection: Collection;

connectToDatabase().then((db) => {
  collection = db.collection('posts');
});

const createPost = async (body: Post) => {
  const newPost = await collection.insertOne({
    title: body.title,
    text: body.text,
  });

  event.emit('createPost', {
    title: body.title,
    text: body.text,
  });

  return newPost;
};

const getPosts = async () => {
  // await client.del('posts');
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
