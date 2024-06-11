import { Router } from 'express';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import { isAdmin } from '@middleware/isAdmin';
import { UploadFile } from '@middleware/UploadFile';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';
import CardController from '@controllers/card/CardController';

const router = Router();
const cardController = new CardController();

router.post(
  '/',
  [isValidKey, verifyToken, isAdmin, UploadFile.single('image')],
  AsyncHandler(cardController.createCard),
);

router.put(
  '/:id',
  [isValidKey, verifyToken, isAdmin, UploadFile.single('image')],
  AsyncHandler(cardController.updateCard),
);

router.delete(
  '/:id',
  [isValidKey, verifyToken, isAdmin],
  cardController.deleteCard,
);

export default router;
