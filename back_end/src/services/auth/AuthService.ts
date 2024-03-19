import { Container, Service, Inject } from "typedi";
import { Request, Response } from "express";
import dotenv from 'dotenv'
import AuthServiceInterface from "./AuthServiceInterface";
import UserRepoInterface from "@repositories/user/UserRepoInterface";
import UserRepo from "@repositories/user/UseRepo";
import { comparePassword } from "@helper/HashingPassword";
import { genAccessToken, genRefreshToken, verifyToken } from "@helper/JwtHelper";
import { SuccessResponse, FailureMsgResponse, InternalErrorResponse } from "@src/core/ApiResponse";
import { UserProfile } from "@dto/auth/UserProfile";
import { isValidEmail } from "@helper/CheckValidEmail";
import EmailService from "@services/mail/MailService";

dotenv.config();
@Service()
class AuthService implements AuthServiceInterface {
    private userRepo: UserRepoInterface;
    private emailService: any;
    constructor() {
        this.userRepo = Container.get(UserRepo);
        this.emailService = Container.get(EmailService);
    }

    public sign_in = async (req: Request, res: Response): Promise<any> => {
        try {
            const userData = await this.userRepo.getUserByUsername(req.body.username);
            if (userData) {
                if (comparePassword(req.body.password, userData.password)) {
                    const access_token = genAccessToken(userData.id, userData.username);
                    const refresh_token = genRefreshToken(userData.id, userData.username);
                    const result = await this.userRepo.storeToken(userData.id, refresh_token);
                    return new SuccessResponse('Login Success', {
                        access_token, refresh_token, exprires_access_token: "1d"
                    }).send(res);
                }
            }
            return new FailureMsgResponse('Invalid Credentials').send(res);
        } catch (error: any) {
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    };

    public sign_up = async (req: Request, res: Response): Promise<any> => {
        try {
            const isExistedEmail = await this.userRepo.isExistedEmail(req.body.email)
            if (isExistedEmail) {
                return new FailureMsgResponse('Email Existed!').send(res);
            }
            else {
                const newUser = await this.userRepo.createUser(req.body)
                if (!newUser) {
                    return new FailureMsgResponse('Create User Failed').send(res);
                }
                else {
                    const userProfile = await this.userRepo.me(newUser.id);
                    return new SuccessResponse('User Created', userProfile).send(res);
                }
            }
        } catch (error) {
            console.log(error)
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }

    public get_access_token_by_refresh_token = async (req: Request, res: Response): Promise<any> => {
        try {
            const refresh_token = req.body.refresh_token;
            if (!refresh_token) {
                return new FailureMsgResponse('Refresh Token is required').send(res);
            }

            // Check validity with an existing token
            const isExistingToken = await this.userRepo.isExistedToken(String(refresh_token));

            if (isExistingToken) {
                const user = verifyToken(refresh_token);

                const access_token = genAccessToken(user.id, user.username)

                const new_refresh_token = genRefreshToken(user.id, user.username)
                return new SuccessResponse('Token Refreshed', {
                    access_token,
                    refresh_token: new_refresh_token,
                    expires_access_token: String(process.env.TOKEN_EXPIRE_TIME)
                })
                    .send(res);
            } else {
                return new FailureMsgResponse('Token not existed').send(res);
            }
        } catch (error) {
            console.log(error)
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }


    public me = async (data: any, res: Response): Promise<any> => {
        try {
            const id = data.user.id;
            const user = await this.userRepo.me(String(id))
            const userProfile = new UserProfile(user);
            if (user) {
                return new SuccessResponse('User Profile', userProfile).send(res);
            }
            return new FailureMsgResponse('User not found').send(res);
        } catch (error) {
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }
}

export default AuthService;
