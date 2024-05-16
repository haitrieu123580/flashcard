import { CreateCardDataRequest, UpdateCardDataRequest } from "@src/dto/cards";
import { Cards } from "@src/entity/Cards";
import { Request, Response } from "express";

export interface IUserCardsService {

    CreateCard(data: CreateCardDataRequest): Promise<Cards | null>;

    UpdateCard(data: UpdateCardDataRequest): Promise<any>;

    DeleteCard(req: any, res: Response): Promise<any>;

}