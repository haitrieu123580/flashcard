import AuthServiceInterface from "@services/auth/AuthServiceInterface";
import { Request, Response } from "express";
import Container from 'typedi';
import AuthService from "@services/auth/AuthService";
// import { BadRequestError, AuthFailureError } from "../../core/ApiError";
class AuthController {
    private authService: AuthServiceInterface;
    constructor() {
        this.authService = Container.get(AuthService)
    }
    sign_in = async (req: Request, res: Response): Promise<any> => {
        await this.authService.sign_in(req, res);
    }
    sign_up = async (req: Request, res: Response) => {
        await this.authService.sign_up(req, res);
    }
    me = async (req: Request, res: Response) => {
        await this.authService.me(req, res);
    }
    get_token = async (req: Request, res: Response) => {
        await this.authService.get_access_token_by_refresh_token(req, res);
    }
    sign_in_success_oauth = async (req: Request, res: Response) => {
        await this.authService.sign_in_success_oauth(req, res);
    }
}
export default AuthController;