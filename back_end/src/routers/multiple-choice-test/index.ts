import { Router } from 'express';
import isValidKey from '@middleware/VerifyApiKey';
import isValidRequest from '@middleware/ValidRequest';
import { MultipleChoiceTestController } from '@controllers/multiple-choice-test/MultipleChoiceTestController';
const controller = new MultipleChoiceTestController();
const router = Router();

router.get("/:setId", [isValidKey], controller.getMultipleChoiceTestBySetId);

router.post("/submit", [isValidKey], controller.submitAnswer)

export default router;