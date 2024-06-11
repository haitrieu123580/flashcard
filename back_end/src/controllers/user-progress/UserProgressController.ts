import { Request, Response } from 'express';
import { Container } from 'typedi';
import {
  FailureMsgResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { Constants } from '@src/core/Constant';
import { UserProgressService } from '@src/services/user-progress/UserProgressService';

import getUser from '../../helper/GetUserRequest';

export class UserProgressController {
  private service: UserProgressService;
  constructor() {
    this.service = Container.get(UserProgressService);
  }
  updateUserProgress = async (req: any, res: Response): Promise<any> => {
    const data = {
      userId: req.user?.id,
      setId: req.body.setId,
      cardId: req.body.cardId,
      status: Constants.CARD_STATUS.KNOWN,
    };
    const response = await this.service.updateUserProgress(data);
    return new SuccessResponse('User progress', response).send(res);
  };

  getUserProgress = async (req: any, res: Response): Promise<any> => {
    const user = req.user?.id;
    const response = await this.service.getUserProgress(user);
    return new SuccessResponse('User progress', response).send(res);
  };

  getUserProgressBySetId = async (req: any, res: Response): Promise<any> => {
    const { setId } = req.params;
    const data = {
      userId: req.user?.id,
      setId,
    };
    const response = await this.service.getUserProgressBySetId(
      data.userId,
      setId,
    );

    return new SuccessResponse('User progress', response).send(res);
  };
}
