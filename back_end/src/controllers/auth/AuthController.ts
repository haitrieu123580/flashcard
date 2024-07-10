import { Request, Response } from 'express';
import Container from 'typedi';
import {
  FailureMsgResponse,
  FailureResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  SignInRequestType,
  SignUpRequestType,
} from '@src/dto/auth/index';
import AuthService from '@services/auth/AuthService';
import AuthServiceInterface from '@services/auth/AuthServiceInterface';

class AuthController {
  private authService: AuthServiceInterface;
  constructor() {
    this.authService = Container.get(AuthService);
  }
  sign_in = async (req: Request, res: Response): Promise<any> => {
    const data: SignInRequestType = req.body;
    const response = await this.authService.sign_in(data);
    if (response) {
      return new SuccessResponse('Login Success', response).send(res);
    }
  };
  sign_up = async (req: Request, res: Response) => {
    const data: SignUpRequestType = req.body;

    const response = await this.authService.sign_up(data);
    if (response) {
      return new SuccessResponse('Register Success', response).send(res);
    }
  };
  me = async (req: Request, res: Response) => {
    await this.authService.me(req, res);
  };
  refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refresh_token;
    const response =  await this.authService.get_access_token_by_refresh_token(refreshToken);
    return new SuccessResponse('Refresh token success', response).send(res);
  };
  sign_in_success_oauth = async (req: Request, res: Response) => {
    await this.authService.sign_in_success_oauth(req, res);
  };
  logout = async (req: Request, res: Response) => {
    await this.authService.logout(req, res);
  };
}
export default AuthController;
