import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyAnswerRepository } from "../repositories/SurveyAnswerRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendMailController {
	async registerAnswerAndSendMail(request: Request, response: Response) {
		const { email, survey_id } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveysRepository = getCustomRepository(SurveysRepository);
		const surveyAnswerRepository = getCustomRepository(SurveyAnswerRepository);

		const user = await usersRepository.findOne({email});

		if (!user) {
			return response.status(400).json({
				error: 'User does not exist'
			});
		}

		const survey = await surveysRepository.findOne({id: survey_id});

		if (!survey) {
			return response.status(400).json({
				error: 'Survey does not exist'
			});
		}

		const surveyAnswer = surveyAnswerRepository.create({
			user_id: user.id,
			survey_id,
		});
		await surveyAnswerRepository.save(surveyAnswer);

		return response.status(201).json(surveyAnswer);
	}
}

export { SendMailController };
