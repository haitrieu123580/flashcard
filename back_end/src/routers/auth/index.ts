import { Request, Response, Router } from 'express';
import { AsyncHandler } from '@src/helper/AsyncHandler';
import isValidRequest from '@middleware/ValidRequest';
import isValidKey from '@middleware/VerifyApiKey';
import verifyToken from '@middleware/VerifyToken';
import AuthController from '@controllers/auth/AuthController';
import { PasswordResetController } from '@controllers/password-reset/PasswordResetController';
import ForgotPasswordRequest from '@dto/auth/ForgotPasswordRequest';
import ResetPasswordRequest from '@dto/auth/ResetPasswordRequest';
import SignInRequest from '@dto/auth/SignInRequest';
import SignUpRequest from '@dto/auth/SignUpRequest';

const router = Router();
const authController = new AuthController();
const passwordResetController = new PasswordResetController();

router.post(
  '/sign-in',
  [isValidKey, isValidRequest(SignInRequest)],
  AsyncHandler(authController.sign_in),
);

router.post(
  '/sign-up',
  [isValidKey, isValidRequest(SignUpRequest)],
  AsyncHandler(authController.sign_up),
);

router.get(
  '/logout',
  [isValidKey, verifyToken],
  AsyncHandler(authController.logout),
);

router.get('/me', [isValidKey, verifyToken], AsyncHandler(authController.me));

router.post('/refresh-token', AsyncHandler(authController.refreshToken));

router.post(
  '/forgot-password',
  [isValidKey, isValidRequest(ForgotPasswordRequest)],
  AsyncHandler(passwordResetController.forgot_password),
);

router.post(
  '/reset-password',
  [isValidKey, isValidRequest(ResetPasswordRequest)],
  AsyncHandler(passwordResetController.reset_password),
);

export default router;
