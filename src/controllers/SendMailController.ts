import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyAnswerRepository } from "../repositories/SurveyAnswerRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path';
import { RequestError } from "../errors/RequestError";

class SendMailController {
	async registerAnswerAndSendMail(request: Request, response: Response) {
		const { email, survey_id } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveysRepository = getCustomRepository(SurveysRepository);
		const surveyAnswerRepository = getCustomRepository(SurveyAnswerRepository);

		const user = await usersRepository.findOne({email});
		if (!user) {
			throw new RequestError('User does not exist');
		}

		const survey = await surveysRepository.findOne({id: survey_id});
		if (!survey) {
			return response.status(400).json({
				error: 'Survey does not exist'
			});
		}

		const npsPath = resolve(__dirname, '../views/emails/npsMail.hbs');

		const variables = {
			name: user.name,
			title: survey.title,
			description: survey.description,
			link: process.env.URL_MAIL,
		}

		const answerAlreadyExists = await surveyAnswerRepository.findOne({
			where: {user_id: user.id, value: null},
			relations: ['user', 'survey'],
		});
		if (answerAlreadyExists) {
			await SendMailService.sendMail(user.email, survey.title, { ...variables, answer_id: answerAlreadyExists.id }, npsPath);
			return response.status(200).json(answerAlreadyExists);
		}

		const surveyAnswer = surveyAnswerRepository.create({
			user_id: user.id,
			survey_id,
		});
		await surveyAnswerRepository.save(surveyAnswer);

		await SendMailService.sendMail(user.email, survey.title, { ...variables, answer_id: surveyAnswer.id }, npsPath);

		return response.status(201).json(surveyAnswer);
	}
}

export default new SendMailController();
