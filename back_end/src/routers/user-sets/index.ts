import { Router } from 'express';
import { UserSetsController } from '@src/controllers/user-sets/UserSetsController';
import { QuickCreateSetRequest } from '@src/dto/uset-sets/QuickCreateSetRequest';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import { UploadFile } from '@middleware/UploadFile';
import isValidRequest from '@middleware/ValidRequest';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';
import VocabularySetController from '@controllers/vocabulary-set/VocabSetController';

const controller = new UserSetsController();
const setController = new VocabularySetController();
const router = Router();

router.get(
  '/my-sets',
  [isValidKey, verifyToken],
  AsyncHandler(controller.getUserSetsList),
);

router.get(
  '/:id',
  [isValidKey, verifyToken],
  AsyncHandler(controller.getUserSetById),
);

router.post(
  '/quick-create-set',
  [isValidKey, verifyToken, isValidRequest(QuickCreateSetRequest)],
  AsyncHandler(controller.quickCreateSet),
);

router.post(
  '/create-set',
  [isValidKey, verifyToken, UploadFile.any()],
  AsyncHandler(setController.createSet),
);

router.post(
  '/add-card',
  [isValidKey, verifyToken, UploadFile.any()],
  AsyncHandler(controller.addCardToUserSet),
);

router.put(
  '/:id',
  [isValidKey, verifyToken, UploadFile.any()],
  AsyncHandler(controller.updateSet),
);

router.delete('/:id', [isValidKey, verifyToken], controller.deleteMySet);

router.post(
  '/request-to-approve-set',
  [isValidKey, verifyToken],
  AsyncHandler(controller.requestToPublicSet),
);
export = router;
