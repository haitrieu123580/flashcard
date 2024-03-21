import { Request, Response } from "express";
import { SuccessResponse, FailureMsgResponse, SuccessMsgResponse, FailureResponse } from '@src/core/ApiResponse';

export interface IPasswordResetService {
    forgot_password: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;
    reset_password: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;
}
