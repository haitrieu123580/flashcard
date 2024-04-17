import { Router } from 'express';
import { Request, Response } from 'express';
import isValidKey from '@middleware/VerifyApiKey';
import { isAdmin } from '@middleware/isAdmin';
import { QuestionController } from '@controllers/questions/QuestionController';
import { CreateQuestionRequest } from '@dto/questions/CreateQuestionRequest';
import isValidRequest from '@middleware/ValidRequest';
const controller = new QuestionController();
const router = Router();

// router.get('/get-set-questions', [isValidKey], (req: Request, res: Response) => { });

//get all question in a set
router.get('/list/:setId', [isValidKey], controller.getQuestionList);

router.get('/:id', [isValidKey], controller.getQuestion);

router.post('/', [isValidKey, isAdmin, isValidRequest(CreateQuestionRequest)], controller.createQuestion);

router.put('/:id', [isValidKey], controller.updateQuestion);

router.delete('/:id', [isValidKey], controller.deleteQuestion);

export default router;