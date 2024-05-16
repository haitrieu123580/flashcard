import { Request, Response } from "express";
import { CreateCardDataRequest, UpdateCardDataRequest } from '@dto/cards/index';
import { Cards } from "@src/entity/Cards";

export interface ICardService {

    CreateCard(data: CreateCardDataRequest): Promise<Cards | null>;

    UpdateCard(data: UpdateCardDataRequest): Promise<any>;

    DeleteCard(req: any, res: Response): Promise<any>;

}