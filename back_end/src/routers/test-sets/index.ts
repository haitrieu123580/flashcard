import { Request, Response, Router } from 'express';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import { isAdmin } from '@middleware/isAdmin';
import { UploadFile } from '@middleware/UploadFile';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';
import { TestController } from '@controllers/test-sets/TestController';

const router = Router();
const controller = new TestController();

router.post(
  '/auto-create-test-set',
  [isValidKey, verifyToken, isAdmin],
  AsyncHandler(controller.autoCreateTestSet),
);

export default router;
