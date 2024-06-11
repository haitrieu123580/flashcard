import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';
import { AuthFailureError, BadRequestError } from '@src/core/ApiError';
import {
  FailureMsgResponse,
  FailureResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { Constants } from '@src/core/Constant';
import { ForgotPasswordResponse, ResetPasswordRequest } from '@src/dto/auth';
import { isValidEmail } from '@helper/CheckValidEmail';
import { hasingPassword } from '@helper/HashingPassword';
import EmailService from '@services/mail/MailService';
import { IPasswordResetOtpRepo } from '@repositories/password-reset-otp/IPasswordResetOtpRepo';
import { PasswordResetOtpRepo } from '@repositories/password-reset-otp/PasswordResetOtpRepo';
import UserRepo from '@repositories/user/UseRepo';
import UserRepoInterface from '@repositories/user/UserRepoInterface';

import { IPasswordResetService } from './IPasswordResetService';

dotenv.config();
@Service()
export class PasswordResetService implements IPasswordResetService {
  private userRepo: UserRepoInterface;
  private emailService: any;
  private passwordResetOtpRepo: IPasswordResetOtpRepo;
  constructor() {
    this.userRepo = Container.get(UserRepo);
    this.emailService = Container.get(EmailService);
    this.passwordResetOtpRepo = Container.get(PasswordResetOtpRepo);
  }

  public forgot_password = async (
    email: string,
  ): Promise<ForgotPasswordResponse> => {
    if (!isValidEmail(email)) {
      throw new BadRequestError('Invalid Email');
    }
    const isExistedEmail = await this.userRepo.getUserBy('email', email);
    if (isExistedEmail) {
      const passwordResetOtp = await this.passwordResetOtpRepo.createOTP(email);
      const otp = passwordResetOtp?.otp;
      if (!otp) {
        throw new InternalErrorResponse('Internal Server Error');
      }
      await this.emailService.sendMail(
        email,
        'Reset Password',
        `Your OTP: ${otp}`,
      );
      return {
        email: email,
        otp: otp,
      };
    } else {
      throw new AuthFailureError('Email not existed');
    }
  };

  public reset_password = async (
    data: ResetPasswordRequest,
  ): Promise<boolean> => {
    const { email, otp, password } = data;
    if (!isValidEmail(email)) {
      throw new BadRequestError('Invalid Email');
    }
    const userData = await this.userRepo.getUserBy('email', email);
    if (userData) {
      const passwordResetOtp =
        await this.passwordResetOtpRepo.getPasswordResetOtp(email);
      const now_time = new Date().getTime();
      const time =
        passwordResetOtp?.updated_at?.getTime() ||
        passwordResetOtp?.created_at?.getTime() ||
        0;
      if (passwordResetOtp?.otp === otp) {
        if (time + Constants.PASSWORD_RESET_OTP_EXPIRE >= now_time) {
          return await this.userRepo.updateUserPassword(
            userData?.id,
            hasingPassword(password).password,
          );
        } else {
          throw new BadRequestError(
            `OTP is expired ${time + Constants.PASSWORD_RESET_OTP_EXPIRE - now_time} `,
          );
        }
      } else {
        throw new BadRequestError('Invalid OTP');
      }
    } else {
      throw new AuthFailureError('Email not existed');
    }
  };
}
