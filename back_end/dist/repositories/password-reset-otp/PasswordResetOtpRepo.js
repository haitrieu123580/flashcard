"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetOtpRepo = void 0;
const PasswordResetOtps_1 = require("@entity/PasswordResetOtps");
const data_source_1 = require("@src/data-source");
const User_1 = require("@entity/User");
const typedi_1 = require("typedi");
const GenerateOTP_1 = require("@src/helper/GenerateOTP");
let PasswordResetOtpRepo = class PasswordResetOtpRepo {
    constructor() {
        this.otpDataSource = data_source_1.AppDataSource.getRepository(PasswordResetOtps_1.PasswordResetOtps);
        this.userDataSource = data_source_1.AppDataSource.getRepository(User_1.User);
        this.createOTP = async (email) => {
            const updateUser = await this.userDataSource.findOne({
                where: {
                    email: email
                },
                relations: {
                    passwordResetOtps: true
                }
            });
            const gen_otp = (0, GenerateOTP_1.genOTP)();
            if (updateUser) {
                if (updateUser.passwordResetOtps) {
                    updateUser.passwordResetOtps.otp = String(gen_otp);
                    updateUser.passwordResetOtps.updated_at = new Date();
                    await this.otpDataSource.save(updateUser.passwordResetOtps);
                    await this.userDataSource.save(updateUser);
                }
                else {
                    const otp = new PasswordResetOtps_1.PasswordResetOtps();
                    otp.otp = String(gen_otp);
                    updateUser.passwordResetOtps = otp;
                    updateUser.passwordResetOtps.created_at = new Date();
                    await this.otpDataSource.save(otp);
                    await this.userDataSource.save(updateUser);
                }
            }
            return this.getPasswordResetOtp(email);
        };
        this.getPasswordResetOtp = async (email) => {
            const user = await this.userDataSource.findOne({
                where: {
                    email: email
                },
                relations: {
                    passwordResetOtps: true
                }
            });
            if (user) {
                return user.passwordResetOtps;
            }
            return null;
        };
    }
};
PasswordResetOtpRepo = __decorate([
    (0, typedi_1.Service)()
], PasswordResetOtpRepo);
exports.PasswordResetOtpRepo = PasswordResetOtpRepo;
