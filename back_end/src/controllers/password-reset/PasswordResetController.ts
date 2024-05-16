import { IPasswordResetService } from "@src/services/password-reset/IPasswordResetService";
import { Request, Response } from "express";
import Container from 'typedi';
import { PasswordResetService } from '@services/password-reset/PasswordResetService';
import { FailureMsgResponse, SuccessMsgResponse, SuccessResponse } from "@src/core/ApiResponse";
export class PasswordResetController {
    private passwordResetService: IPasswordResetService;
    constructor() {
        this.passwordResetService = Container.get(PasswordResetService)
    }
    forgot_password = async (req: Request, res: Response) => {
        const email = req.body.email;
        const response = await this.passwordResetService.forgot_password(email);
        return new SuccessResponse('OTP sended', response.otp).send(res);
    }
    reset_password = async (req: Request, res: Response) => {
        const data = {
            email: req.body.email,
            otp: req.body.otp,
            password: req.body.password
        }
        const response = await this.passwordResetService.reset_password(data);
        if (response) {
            return new SuccessMsgResponse('Password reset successfully').send(res);
        }
        else {
            return new FailureMsgResponse('Password reset failed').send(res);
        }
    }

}
