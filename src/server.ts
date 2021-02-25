import 'reflect-metadata';
import express, { Response, Request, Server } from 'express';
import './database';
import { router } from './routes'

const app: Server = express();
const port: Number = 3333;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server is listening at port ${port}`))
