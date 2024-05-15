import { Request, Response } from "express";
import { Container } from 'typedi';
import { IUserCardsService } from "@src/services/user-cards/IUserCardsService";
import { UserCardsService } from "@src/services/user-cards/UserCardsService";
export class UserCardsController {

    private service: IUserCardsService;
    constructor() {
        this.service = Container.get(UserCardsService);
    }

    // Change 'req' type from 'Request' to 'data' after verifyToken middleware, (user id)
    createCard = async (req: any, res: Response): Promise<any> => {
        return this.service.CreateCard(req, res)
    }

    updateCard = async (req: any, res: Response): Promise<any> => {
        return this.service.UpdateCard(req, res);
    }

    deleteCard = async (req: Request, res: Response): Promise<any> => {
        return this.service.DeleteCard(req, res);
    }
}
