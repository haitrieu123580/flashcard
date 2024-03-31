"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetController = void 0;
const typedi_1 = __importDefault(require("typedi"));
const PasswordResetService_1 = require("@services/password-reset/PasswordResetService");
class PasswordResetController {
    constructor() {
        this.forgot_password = async (req, res) => {
            await this.passwordResetService.forgot_password(req, res);
        };
        this.reset_password = async (req, res) => {
            await this.passwordResetService.reset_password(req, res);
        };
        this.passwordResetService = typedi_1.default.get(PasswordResetService_1.PasswordResetService);
    }
}
exports.PasswordResetController = PasswordResetController;
