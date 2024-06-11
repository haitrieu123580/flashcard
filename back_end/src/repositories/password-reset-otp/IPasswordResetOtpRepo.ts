import { PasswordResetOtps } from '@entity/PasswordResetOtps';

// import
export interface IPasswordResetOtpRepo {
  createOTP: (email: string) => Promise<PasswordResetOtps | null>;

  getPasswordResetOtp: (email: string) => Promise<PasswordResetOtps | null>;
}
