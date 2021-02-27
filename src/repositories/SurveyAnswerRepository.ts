import { EntityRepository, Repository } from "typeorm";
import { SurveyAnswer } from "../models/SurveyAnswer";

@EntityRepository(SurveyAnswer)
class SurveyAnswerRepository extends Repository<SurveyAnswer> {}

export { SurveyAnswerRepository }
