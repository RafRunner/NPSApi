import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyAnswerRepository } from "../repositories/SurveyAnswerRepository";

class NpsController {
	async show(request: Request, response: Response) {
		const survey_id = String(request.params);

		const surveyAnswerRepository =  getCustomRepository(SurveyAnswerRepository);

		const answers = await surveyAnswerRepository.find({
			survey_id,
			value: Not(IsNull()),
		});
		if (answers.length === 0) {
			return response.status(400).json({
				error: 'Survey does not exist or has no answes'
			});
		}

		const detractors = answers.filter(answer => answer.value <= 6).length;
		const promoters = answers.filter(answer => answer.value >= 9).length;
		const total = answers.length;

		const nps = Number((((promoters - detractors) / total) * 100).toFixed(2));

		return response.json({
			promoters,
			detractors,
			passives: total - promoters - detractors,
			total,
			nps
		})
	}
}

export { NpsController };
