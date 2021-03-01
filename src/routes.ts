import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController'

const router: Router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerControlelr = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

router.post('/sendmail', sendMailController.registerAnswerAndSendMail);

router.get('/answers', answerControlelr.registerAnswer);

router.get('/nps/:id', npsController.show);

export { router };
