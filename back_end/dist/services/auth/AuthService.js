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
const typedi_1 = require("typedi");
const dotenv_1 = __importDefault(require("dotenv"));
const UseRepo_1 = __importDefault(require("@repositories/user/UseRepo"));
const HashingPassword_1 = require("@helper/HashingPassword");
const JwtHelper_1 = require("@helper/JwtHelper");
const ApiResponse_1 = require("@src/core/ApiResponse");
const UserProfile_1 = require("@dto/auth/UserProfile");
dotenv_1.default.config();
let AuthService = class AuthService {
    constructor() {
        this.sign_in = async (req, res) => {
            try {
                const userData = await this.userRepo.getUserByUsername(req.body.username);
                if (userData) {
                    if ((0, HashingPassword_1.comparePassword)(req.body.password, userData.password)) {
                        const access_token = (0, JwtHelper_1.genAccessToken)({
                            id: userData.id,
                            username: userData.username,
                            role: userData.role
                        });
                        const refresh_token = (0, JwtHelper_1.genRefreshToken)({
                            id: userData.id,
                            username: userData.username,
                            role: userData.role,
                        });
                        const result = await this.userRepo.storeToken(userData.id, refresh_token);
                        return new ApiResponse_1.SuccessResponse('Login Success', {
                            access_token, refresh_token, exprires_access_token: "1d"
                        }).send(res);
                    }
                }
                return new ApiResponse_1.FailureMsgResponse('Invalid Credentials').send(res);
            }
            catch (error) {
                console.log('Error: ', error);
                return new ApiResponse_1.InternalErrorResponse('Internal Server Error').send(res);
            }
        };
        this.sign_up = async (req, res) => {
            try {
                const isExistedEmail = await this.userRepo.isExistedEmail(req.body.email);
                if (isExistedEmail) {
                    return new ApiResponse_1.FailureMsgResponse('Email Existed!').send(res);
                }
                else {
                    const newUser = await this.userRepo.createUser(req.body);
                    if (!newUser) {
                        return new ApiResponse_1.FailureMsgResponse('Create User Failed').send(res);
                    }
                    else {
                        const userProfile = await this.userRepo.me(newUser.id);
                        return new ApiResponse_1.SuccessResponse('User Created', userProfile).send(res);
                    }
                }
            }
            catch (error) {
                console.log(error);
                return new ApiResponse_1.InternalErrorResponse('Internal Server Error').send(res);
            }
        };
        this.get_access_token_by_refresh_token = async (req, res) => {
            try {
                const refresh_token = req.body.refresh_token;
                if (!refresh_token) {
                    return new ApiResponse_1.FailureMsgResponse('Refresh Token is required').send(res);
                }
                // Check validity with an existing token
                const isExistingToken = await this.userRepo.isExistedToken(String(refresh_token));
                if (isExistingToken) {
                    const user = (0, JwtHelper_1.verifyToken)(refresh_token);
                    const access_token = (0, JwtHelper_1.genAccessToken)({
                        id: user.id,
                        username: user.username,
                        role: user.role
                    });
                    const new_refresh_token = (0, JwtHelper_1.genRefreshToken)({
                        id: user.id,
                        username: user.username,
                        role: user.role
                    });
                    return new ApiResponse_1.SuccessResponse('Token Refreshed', {
                        access_token,
                        refresh_token: new_refresh_token,
                        expires_access_token: String(process.env.TOKEN_EXPIRE_TIME)
                    })
                        .send(res);
                }
                else {
                    return new ApiResponse_1.FailureMsgResponse('Token not existed').send(res);
                }
            }
            catch (error) {
                console.log(error);
                return new ApiResponse_1.InternalErrorResponse('Internal Server Error').send(res);
            }
        };
        this.me = async (data, res) => {
            try {
                const id = data.user.id;
                const user = await this.userRepo.me(String(id));
                const userProfile = new UserProfile_1.UserProfile(user);
                if (user) {
                    return new ApiResponse_1.SuccessResponse('User Profile', user).send(res);
                }
                return new ApiResponse_1.FailureMsgResponse('User not found').send(res);
            }
            catch (error) {
                return new ApiResponse_1.InternalErrorResponse('Internal Server Error').send(res);
            }
        };
        this.userRepo = typedi_1.Container.get(UseRepo_1.default);
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.default = AuthService;
