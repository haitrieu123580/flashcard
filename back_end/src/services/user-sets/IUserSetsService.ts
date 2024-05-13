import { Request, Response } from "express";

export interface IUserSetsService {

    getUserSetsList: (req: Request, res: Response) => Promise<any>

    getUserSetById: (req: Request, res: Response) => Promise<any>

    // createSetByUser: (req: Request, res: Response) => Promise<any>

    addCardToUserSet: (req: Request, res: Response) => Promise<any>

    quickCreateSet: (req: Request, res: Response) => Promise<any>

    updateUserSet: (req: Request, res: Response) => Promise<any>

    deleteUserSet: (req: Request, res: Response) => Promise<any>

}