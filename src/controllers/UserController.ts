import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { RequestError } from '../errors/RequestError';

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
});

class UserController {
	async create(request: Request, response: Response) {
		const { name, email } = request.body;

		try {
			await validationSchema.validate(request.body, { abortEarly: false });
		} catch (e) {
			return response.status(400).json(e);
		}
		
		const usersRepository = getCustomRepository(UsersRepository);

		const alreadyExists: User = await usersRepository.findOne({email});

		if (alreadyExists) {
			throw new RequestError('User already exists!');
		}

		const user: User = usersRepository.create({
			name, email
		});
		await usersRepository.save(user);

		return response.status(201).json(user);
	}
}

export { UserController }
