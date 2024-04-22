import { Request, Response, Router } from "express";
import AuthController from "@controllers/auth/AuthController";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import SignUpRequest from "@dto/auth/SignUpRequest";
import SignInRequest from "@dto/auth/SignInRequest";
import isValidKey from "@middleware/VerifyApiKey";
import ForgotPasswordRequest from "@dto/auth/ForgotPasswordRequest";
import ResetPasswordRequest from "@dto/auth/ResetPasswordRequest";
import { PasswordResetController } from '@controllers/password-reset/PasswordResetController';
const router = Router();
const authController = new AuthController();
const passwordResetController = new PasswordResetController();

router.post('/sign-in', [isValidKey, isValidRequest(SignInRequest)], authController.sign_in);

router.post('/sign-up', [isValidKey, isValidRequest(SignUpRequest)], authController.sign_up);

router.get('/logout', [isValidKey, verifyToken], authController.logout);

router.get('/me', [isValidKey, verifyToken], authController.me);

router.post('/get-token', authController.get_token);

router.post('/forgot-password', [isValidKey, isValidRequest(ForgotPasswordRequest)], passwordResetController.forgot_password);

router.post('/reset-password', [isValidKey, isValidRequest(ResetPasswordRequest)], passwordResetController.reset_password);

export default router;
