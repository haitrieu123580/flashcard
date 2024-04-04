import { Request, Response } from "express";

export interface ICardService {

    CreateCard(req: any, res: Response): Promise<any>;

    UpdateCard(req: any, res: Response): Promise<any>;

    DeleteCard(req: any, res: Response): Promise<any>;

}