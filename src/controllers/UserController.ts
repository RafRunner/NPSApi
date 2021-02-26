import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
	async create(request: Request, response: Response) {
		const { name, email } = request.body;
		
		const usersRepository = getCustomRepository(UsersRepository);

		const alreadyExists: User = await usersRepository.findOne({
			email
		});

		if (alreadyExists) {
			return response.status(400).json({
				error: 'user already exists!'
			})
		}

		const user: User = usersRepository.create({
			name, email
		});
		await usersRepository.save(user);

		return response.json(user);
	}
}

export { UserController }
