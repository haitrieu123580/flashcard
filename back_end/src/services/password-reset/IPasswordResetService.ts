import { Request, Response } from "express";
export interface IPasswordResetService {

    forgot_password: (req: Request, res: Response) => Promise<any>;

    reset_password: (req: Request, res: Response) => Promise<any>;
}
