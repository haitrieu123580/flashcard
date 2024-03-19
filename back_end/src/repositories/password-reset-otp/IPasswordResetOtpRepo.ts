import { PasswordResetOtps } from '@entity/PasswordResetOtps';
export interface IPasswordResetOtpRepo {
    createOTP: (email: string) => Promise<any>;

    getPasswordResetOtp: (email: string) => Promise<PasswordResetOtps | null>;
}