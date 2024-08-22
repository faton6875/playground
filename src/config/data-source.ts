import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Categories } from '../modules/categories/categories.entity';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT || '5432'),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Categories],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [],
});
