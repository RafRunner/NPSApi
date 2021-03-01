import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { Survey } from '../models/Survey';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
	async create(request: Request, response: Response) {
		const { title, description } = request.body;

		const surveysRepository =  getCustomRepository(SurveysRepository);

		const survey: Survey = surveysRepository.create({
			title,
			description
		});

		await surveysRepository.save(survey);

		return response.status(201).json(survey);
	}

	async show(request: Request, response: Response) {
		const surveysRepository =  getCustomRepository(SurveysRepository);
		
		const allSurveys: Survey[] = await surveysRepository.find();

		return response.json(allSurveys);
	}
}

export default new SurveysController()
