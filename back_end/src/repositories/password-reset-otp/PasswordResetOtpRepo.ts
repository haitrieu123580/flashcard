import { IPasswordResetOtpRepo } from "./IPasswordResetOtpRepo";
import { PasswordResetOtps } from "@entity/PasswordResetOtps";
import { AppDataSource } from "@src/data-source";
import { User } from "@entity/User";
import { Service } from "typedi";
import { genOTP } from "@src/helper/GenerateOTP";
@Service()
export class PasswordResetOtpRepo implements IPasswordResetOtpRepo {
    private otpDataSource = AppDataSource.getRepository(PasswordResetOtps)
    private userDataSource = AppDataSource.getRepository(User)

    createOTP = async (email: string) => {
        const updateUser = await this.userDataSource.findOne({
            where: {
                email: email
            },
            relations: {
                passwordResetOtps: true
            }
        })
        const gen_otp = genOTP();
        if (updateUser) {
            if (updateUser.passwordResetOtps) {
                updateUser.passwordResetOtps.otp = String(gen_otp);
                updateUser.passwordResetOtps.updated_at = new Date();
                await this.otpDataSource.save(updateUser.passwordResetOtps)
                await this.userDataSource.save(updateUser)
            }
            else {
                const otp = new PasswordResetOtps();
                otp.otp = String(gen_otp);
                updateUser.passwordResetOtps = otp;
                updateUser.passwordResetOtps.created_at = new Date();
                await this.otpDataSource.save(otp)
                await this.userDataSource.save(updateUser)
            }

        }
        return this.getPasswordResetOtp(email);

    }

    getPasswordResetOtp = async (email: string): Promise<PasswordResetOtps | null> => {
        const user = await this.userDataSource.findOne({
            where: {
                email: email
            },
            relations: {
                passwordResetOtps: true
            }
        })
        if (user) {
            return user.passwordResetOtps
        }
        return null;
    }
}