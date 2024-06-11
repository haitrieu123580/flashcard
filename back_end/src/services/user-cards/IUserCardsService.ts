import { Request, Response } from 'express';
import { CreateCardDataRequest, UpdateCardDataRequest } from '@src/dto/cards';
import { Cards } from '@src/entity/Cards';

export interface IUserCardsService {
  CreateCard(data: CreateCardDataRequest): Promise<Cards | null>;

  UpdateCard(data: UpdateCardDataRequest): Promise<any>;

  DeleteCard(req: any, res: Response): Promise<any>;
}
