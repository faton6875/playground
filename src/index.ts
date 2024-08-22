import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import categoryRoutes from './modules/categories/categories.controller';
import errorHandler from './middleware';
import postRoutes from './modules/posts/post.controller';
import { AppDataSource } from './config/data-source';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
