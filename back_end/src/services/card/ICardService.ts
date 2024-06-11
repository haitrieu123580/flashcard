import { Request, Response } from 'express';
import { Cards } from '@src/entity/Cards';
import { CreateCardDataRequest, UpdateCardDataRequest } from '@dto/cards/index';

export interface ICardService {
  CreateCard(data: CreateCardDataRequest): Promise<Cards | null>;

  UpdateCard(data: UpdateCardDataRequest): Promise<any>;

  DeleteCard(req: any, res: Response): Promise<any>;
}
