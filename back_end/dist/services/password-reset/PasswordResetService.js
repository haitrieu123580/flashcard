"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const typedi_1 = require("typedi");
const dotenv_1 = __importDefault(require("dotenv"));
const PasswordResetOtpRepo_1 = require("@repositories/password-reset-otp/PasswordResetOtpRepo");
const UseRepo_1 = __importDefault(require("@repositories/user/UseRepo"));
const ApiResponse_1 = require("@src/core/ApiResponse");
const CheckValidEmail_1 = require("@helper/CheckValidEmail");
const MailService_1 = __importDefault(require("@services/mail/MailService"));
const HashingPassword_1 = require("@helper/HashingPassword");
const Constant_1 = require("@src/core/Constant");
dotenv_1.default.config();
let PasswordResetService = class PasswordResetService {
    constructor() {
        this.forgot_password = async (req, res) => {
            try {
                const email = req.body.email;
                if (!(0, CheckValidEmail_1.isValidEmail)(email)) {
                    return new ApiResponse_1.FailureMsgResponse('Invalid Email').send(res);
                }
                const isExistedEmail = await this.userRepo.isExistedEmail(email);
                if (isExistedEmail) {
                    const passwordResetOtp = await this.passwordResetOtpRepo.createOTP(email);
                    const otp = passwordResetOtp?.otp;
                    await this.emailService.sendMail(email, 'Reset Password', `Your OTP: ${otp}`);
                    return new ApiResponse_1.SuccessResponse('OPT sended', { otp }).send(res);
                }
                return new ApiResponse_1.FailureMsgResponse('Email not existed').send(res);
            }
            catch (error) {
                console.log(error);
                return new ApiResponse_1.InternalErrorResponse('Internal Server Error').send(res);
            }
        };
        this.reset_password = async (req, res) => {
            try {
                const { email, otp, password } = req.body;
                if (!(0, CheckValidEmail_1.isValidEmail)(email)) {
                    return new ApiResponse_1.FailureMsgResponse('Invalid Email').send(res);
                }
                const isExistedEmail = await this.userRepo.isExistedEmail(email);
                if (isExistedEmail) {
                    const passwordResetOtp = await this.passwordResetOtpRepo.getPasswordResetOtp(email);
                    const now_time = new Date().getTime();
                    const time = passwordResetOtp?.updated_at?.getTime() || passwordResetOtp?.created_at?.getTime() || 0;
                    if (passwordResetOtp?.otp === otp) {
                        if ((time + Constant_1.Constants.PASSWORD_RESET_OTP_EXPIRE) >= now_time) {
                            const userData = await this.userRepo.getUserByEmail(email);
                            if (userData) {
                                await this.userRepo.updateUserPassword(userData?.id, (0, HashingPassword_1.hasingPassword)(password).password);
                                return new ApiResponse_1.SuccessMsgResponse('OTP is valid').send(res);
                            }
                            return new ApiResponse_1.InternalErrorResponse('Email not found').send(res);
                        }
                        return new ApiResponse_1.FailureResponse('OTP is expired', { expired: (time + Constant_1.Constants.PASSWORD_RESET_OTP_EXPIRE) - now_time }).send(res);
                    }
                    return new ApiResponse_1.FailureMsgResponse('Invalid OTP').send(res);
                }
                return new ApiResponse_1.FailureMsgResponse('Email not existed').send(res);
            }
            catch (error) {
                console.log(error);
                return new ApiResponse_1.InternalErrorResponse('Internal Server Error').send(res);
            }
        };
        this.userRepo = typedi_1.Container.get(UseRepo_1.default);
        this.emailService = typedi_1.Container.get(MailService_1.default);
        this.passwordResetOtpRepo = typedi_1.Container.get(PasswordResetOtpRepo_1.PasswordResetOtpRepo);
    }
};
PasswordResetService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], PasswordResetService);
exports.PasswordResetService = PasswordResetService;
