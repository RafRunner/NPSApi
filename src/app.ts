import 'reflect-metadata';
import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes'
import { RequestError } from './errors/RequestError';

createConnection();
const app: Express = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
	if (err instanceof RequestError) {
		return response.status(err.statusCode).json({
			status: 'Error',
			message: err.message,
		});
	}

	return response.status(500).json({
		status: 'Error',
		message: 'Internal server error',
	})
});

export { app };
