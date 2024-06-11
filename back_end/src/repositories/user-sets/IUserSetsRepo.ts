import { Cards } from '@entity/Cards';
import { Sets } from '@entity/Sets';
import { User } from '@entity/User';
import { Request } from 'express';

export interface IUserSetsRepo {
  getUserSetsList(userId: string): Promise<[Sets[], number]>;

  addCardToSet(set: Sets, card: Cards): Promise<any>;

  getUserProgress(userId: string, setId: string): Promise<any>;
}
