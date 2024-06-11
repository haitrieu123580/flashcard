import { Request, Response } from 'express';
import {
  FailureMsgResponse,
  FailureResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { ForgotPasswordResponse, ResetPasswordRequest } from '@dto/auth/index';

export interface IPasswordResetService {
  forgot_password: (email: string) => Promise<ForgotPasswordResponse>;
  reset_password: (data: ResetPasswordRequest) => Promise<boolean>;
}
