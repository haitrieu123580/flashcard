import { Request, Response } from 'express';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  SignInRequestType,
  SignInSuccessResponseType,
  SignUpRequestType,
} from '@src/dto/auth/index';

interface AuthServiceInterface {
  sign_in: (
    data: SignInRequestType,
  ) => Promise<SignInSuccessResponseType | null | undefined>;
  sign_up: (data: SignUpRequestType) => Promise<any>;
  me: (req: Request, res: Response) => Promise<any>;
  get_access_token_by_refresh_token: (refreshToken: string) => Promise<any>;
  sign_in_success_oauth: (req: Request, res: Response) => Promise<any>;
  logout: (req: Request, res: Response) => Promise<any>;
}
export = AuthServiceInterface;
