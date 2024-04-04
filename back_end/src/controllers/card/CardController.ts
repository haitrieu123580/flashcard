import { Request, Response } from "express";
import { Container } from 'typedi';
import { ICardService } from "@src/services/card/ICardService";
import { CardService } from "@src/services/card/CardService";
class CardController {

    private service: ICardService;
    constructor() {
        this.service = Container.get(CardService);
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
export default CardController;