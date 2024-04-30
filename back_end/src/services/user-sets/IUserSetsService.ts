import { Request, Response } from "express";

export interface IUserSetsService {

    getUserSetsList: (req: Request, res: Response) => Promise<any>

    getUserSetById: (req: Request, res: Response) => Promise<void>

    // // quick create set
    createSetByUser: (req: Request, res: Response) => Promise<any>

    addCardToUserSet: (req: Request, res: Response) => Promise<any>

    // updateUserSet: (req: Request, res: Response) => Promise<void>

    // deleteUserSet: (req: Request, res: Response) => Promise<void>

    // createCardByUser: (req: Request, res: Response) => Promise<void>

    // publicSetRequest: (req: Request, res: Response) => Promise<void>
}