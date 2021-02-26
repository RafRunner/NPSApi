import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Users', () => {
	beforeAll(async () => {
		const connection = await createConnection();
		await connection.runMigrations();
	});

	it('Should be able to create a new user', async () => {
		const response = await request(app)
		.post('/users')
		.send({
			email: 'user@example.com',
			name: 'User Example',
		})

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
	});

	it('Should not be able to create a user with a repeated email', async () => {
		await request(app)
		.post('/users')
		.send({
			email: 'user2@example.com',
			name: 'User Two Example',
		})

		const response = await request(app)
		.post('/users')
		.send({
			email: 'user2@example.com',
			name: 'User Two Example',
		})

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error');
	})
})
