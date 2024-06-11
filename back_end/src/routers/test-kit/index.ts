import { Request, Response, Router } from 'express';
import { TestKitController } from '@src/controllers/test-kit/TestKitController';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import { isAdmin } from '@middleware/isAdmin';
import { UploadFile } from '@middleware/UploadFile';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';

const router = Router();
const controller = new TestKitController();

router.post(
  '/create-test-kit',
  [isValidKey, verifyToken, isAdmin, UploadFile.any()],
  AsyncHandler(controller.createTestKit),
);

router.get(
  '/get-test-kit:/testKitId',
  [isValidKey, verifyToken, isAdmin],
  AsyncHandler(controller.getTestKit),
);

router.get(
  '/get-all-test-kits/:setId',
  [isValidKey, verifyToken, isAdmin],
  AsyncHandler(controller.getAllTestKits),
);

router.put(
  '/update-test-kit:/testKitId',
  [isValidKey, verifyToken, isAdmin, UploadFile.any()],
  AsyncHandler(controller.updateTestKit),
);

router.delete(
  '/delete-test-kit:/testKitId',
  [isValidKey, verifyToken, isAdmin],
  AsyncHandler(controller.deleteTestKit),
);

router.post(
  '/question/:testKitId',
  [isValidKey, verifyToken, isAdmin, UploadFile.single('image')],
  AsyncHandler(controller.addQuestion),
);

router.post(
  '/question/:testKitId/:questionId',
  [isValidKey, verifyToken, isAdmin, UploadFile.single('image')],
  AsyncHandler(controller.updateQuestion),
);

router.delete(
  '/question/:questionId',
  [isValidKey, verifyToken, isAdmin],
  AsyncHandler(controller.deleteQuestion),
);

export = router;
