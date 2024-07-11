import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import categoryRoutes from './controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/categories', categoryRoutes);

const startServer = async () => {
  try {
    await createConnection();
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

startServer();
