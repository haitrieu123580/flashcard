import { IPasswordResetService } from "@src/services/password-reset/IPasswordResetService";
import { Request, Response } from "express";
import Container from 'typedi';
import { PasswordResetService } from '@services/password-reset/PasswordResetService';
export class PasswordResetController {
    private passwordResetService: IPasswordResetService;
    constructor() {
        this.passwordResetService = Container.get(PasswordResetService)
    }
    forgot_password = async (req: Request, res: Response) => {
        await this.passwordResetService.forgot_password(req, res);
    }
    reset_password = async (req: Request, res: Response) => {
        await this.passwordResetService.reset_password(req, res);
    }

}
