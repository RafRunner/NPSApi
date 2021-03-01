import { Router } from 'express';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NpsController';
import SendMailController from './controllers/SendMailController';
import SurveysController from './controllers/SurveysController';
import UserController from './controllers/UserController'

const router: Router = Router();

router.post('/users', UserController.create);

router.get('/surveys', SurveysController.show);
router.post('/surveys', SurveysController.create);

router.post('/sendmail', SendMailController.registerAnswerAndSendMail);

router.get('/answers', AnswerController.registerAnswer);

router.get('/nps/:survey_id', NpsController.show);

export { router };
