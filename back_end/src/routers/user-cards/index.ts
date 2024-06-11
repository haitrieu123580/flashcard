import { Router } from 'express';
import { UserCardsController } from '@src/controllers/user-cards/UserCardsController';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import { UploadFile } from '@middleware/UploadFile';
import isValidRequest from '@middleware/ValidRequest';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';

const controller = new UserCardsController();
const router = Router();

router.post(
  '/',
  [isValidKey, verifyToken, UploadFile.single('image')],
  AsyncHandler(controller.createCard),
);

router.put(
  '/:id',
  [isValidKey, verifyToken, UploadFile.single('image')],
  AsyncHandler(controller.updateCard),
);

router.delete('/:id', [isValidKey, verifyToken], controller.deleteCard);

export = router;
