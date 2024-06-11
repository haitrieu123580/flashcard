import { Request, Response } from 'express';
import { UpdateSetRequest } from '@src/dto/set';
import { SetsListResponse } from '@src/dto/set/SetsListResponse';
import {
  CopyCardToSetRequest,
  QuickAddCardToSetRequest,
  RequestToApproveSet,
} from '@src/dto/uset-sets';
import { Sets } from '@src/entity/Sets';

export interface IUserSetsService {
  getUserSetsList: (userId: string) => Promise<SetsListResponse | null>;

  getUserSetById: (userId: string, setId: string) => Promise<Sets>;

  addCardToUserSet: (data: CopyCardToSetRequest) => Promise<any>;

  quickCreateSet: (data: QuickAddCardToSetRequest) => Promise<any>;

  updateUserSet: (data: UpdateSetRequest) => Promise<any>;

  deleteUserSet: (req: Request, res: Response) => Promise<any>;

  requestToPublicSet(data: RequestToApproveSet): Promise<any>;
}
