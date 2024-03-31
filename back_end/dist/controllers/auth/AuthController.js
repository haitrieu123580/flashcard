"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const AuthService_1 = __importDefault(require("@services/auth/AuthService"));
// import { BadRequestError, AuthFailureError } from "../../core/ApiError";
class AuthController {
    constructor() {
        this.sign_in = async (req, res) => {
            await this.authService.sign_in(req, res);
        };
        this.sign_up = async (req, res) => {
            await this.authService.sign_up(req, res);
        };
        this.me = async (req, res) => {
            await this.authService.me(req, res);
        };
        this.get_token = async (req, res) => {
            await this.authService.get_access_token_by_refresh_token(req, res);
        };
        this.authService = typedi_1.default.get(AuthService_1.default);
    }
}
exports.default = AuthController;
