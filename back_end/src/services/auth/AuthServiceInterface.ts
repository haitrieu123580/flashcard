import { Request, Response } from "express";
interface AuthServiceInterface {
    sign_in: (req: Request, res: Response) => Promise<any>;
    sign_up: (req: Request, res: Response) => Promise<any>;
    me: (req: Request, res: Response) => Promise<any>;
    get_access_token_by_refresh_token: (req: Request, res: Response) => Promise<any>;
}
export = AuthServiceInterface;