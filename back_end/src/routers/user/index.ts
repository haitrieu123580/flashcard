import { Router } from 'express';
import { UserProfileController } from '@src/controllers/user/UserProfileController';
import { ChangePasswordRequest } from '@src/dto/user/ChangePasswordRequest';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import { isAdmin } from '@middleware/isAdmin';
import { UploadFile } from '@middleware/UploadFile';
import isValidRequest from '@middleware/ValidRequest';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';

const controller = new UserProfileController();
const router = Router();

router.post(
  '/change-password',
  [isValidKey, verifyToken, isValidRequest(ChangePasswordRequest)],
  controller.changePassword,
);

router.put(
  '',
  [isValidKey, verifyToken, UploadFile.single('image')],
  AsyncHandler(controller.editProfile),
);

router.delete('', [isValidKey, verifyToken], controller.changePassword);

export = router;
