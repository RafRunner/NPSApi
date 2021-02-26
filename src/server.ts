import 'reflect-metadata';
import express, { Express } from 'express';
import './database';
import { router } from './routes'

const app: Express = express();
const port: Number = 3333;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server is listening at port ${port}`))
