import { Request, Response } from "express";

export interface UserServiceInterface {

    editProfile: (req: any, res: Response) => Promise<any>;

    changePassword: (userId: any, data: any) => Promise<any>;
}
