import { Container, Service, Inject } from "typedi";
import { Request, Response } from "express";
import dotenv from 'dotenv'
import { IPasswordResetService } from "./IPasswordResetService";
import { PasswordResetOtpRepo } from "@repositories/password-reset-otp/PasswordResetOtpRepo";
import UserRepoInterface from "@repositories/user/UserRepoInterface";
import UserRepo from "@repositories/user/UseRepo";
import { SuccessResponse, FailureMsgResponse, InternalErrorResponse, SuccessMsgResponse, FailureResponse } from "@src/core/ApiResponse";
import { isValidEmail } from "@helper/CheckValidEmail";
import EmailService from "@services/mail/MailService";
import { IPasswordResetOtpRepo } from "@repositories/password-reset-otp/IPasswordResetOtpRepo";
import { hasingPassword } from "@helper/HashingPassword";
import { Constants } from "@src/core/Constant";

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

    public forgot_password = async (req: Request, res: Response): Promise<any> => {
        try {
            const email = req.body.email;
            if (!isValidEmail(email)) {
                return new FailureMsgResponse('Invalid Email').send(res);
            }
            const isExistedEmail = await this.userRepo.getUserBy("email", email);
            if (isExistedEmail) {
                const passwordResetOtp = await this.passwordResetOtpRepo.createOTP(email);
                const otp = passwordResetOtp?.otp;
                await this.emailService.sendMail(email, 'Reset Password', `Your OTP: ${otp}`);
                return new SuccessResponse('OPT sended', { otp }).send(res);
            }
            return new FailureMsgResponse('Email not existed').send(res);
        } catch (error) {
            console.log(error);
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }

    public reset_password = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, otp, password } = req.body;
            if (!isValidEmail(email)) {
                return new FailureMsgResponse('Invalid Email').send(res);
            }
            const userData = await this.userRepo.getUserBy("email", email);
            if (userData) {
                const passwordResetOtp = await this.passwordResetOtpRepo.getPasswordResetOtp(email);
                const now_time = new Date().getTime();
                const time = passwordResetOtp?.updated_at?.getTime() || passwordResetOtp?.created_at?.getTime() || 0;
                if (passwordResetOtp?.otp === otp) {
                    if ((time + Constants.PASSWORD_RESET_OTP_EXPIRE) >= now_time) {
                        // const userData = await this.userRepo.getUserBy("email", email);
                        await this.userRepo.updateUserPassword(userData?.id, hasingPassword(password).password);
                        return new SuccessMsgResponse('OTP is valid').send(res);
                        // if (userData) {
                        // }
                        // return new InternalErrorResponse('Email not found').send(res);
                    }
                    return new FailureResponse('OTP is expired', { expired: (time + Constants.PASSWORD_RESET_OTP_EXPIRE) - now_time }).send(res);

                }
                return new FailureMsgResponse('Invalid OTP').send(res);

            }
            return new FailureMsgResponse('Email not existed').send(res);

        } catch (error) {
            console.log(error);
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }
}
