import 'reflect-metadata';
import express, { Express } from 'express';
import createConnection from './database';
import { router } from './routes'

createConnection();
const app: Express = express();

app.use(express.json());
app.use(router);

export { app };
