import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyAnswerRepository } from "../repositories/SurveyAnswerRepository";

class AnswerController {
	async registerAnswer(request: Request, response: Response) {
		const { value, ansid } = request.query;

		const surveyAnswerRepository =  getCustomRepository(SurveyAnswerRepository);

		const answer = await surveyAnswerRepository.findOne({ id: String(ansid) })
		if (!answer) {
			return response.status(400).json({
				error: 'Survey Answer does not exist (verify if the email was sent)'
			});
		}

		answer.value = Number(value);

		await surveyAnswerRepository.save(answer);

		return response.json(answer);
	}
}

export { AnswerController };
