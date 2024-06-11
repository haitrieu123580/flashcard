import { Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthFailureError } from '@src/core/ApiError';
import {
  FailureMsgResponse,
  FailureResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { username } from '@src/dto/auth/SignInRequest';
import { ApproveSetService } from '@src/services/approve-sets/ApproveSetService';
import { IApproveSetService } from '@services/approve-sets/IApproveSetService';

export class ApproveSetController {
  private service: IApproveSetService = Container.get(ApproveSetService);
  constructor() {
    this.service = Container.get(ApproveSetService);
  }
  getPendingSets = async (req: Request, res: Response) => {
    const response = await this.service.getPendingSets();
    if (response) {
      return new SuccessResponse('Pending sets list', response).send(res);
    }
    return new FailureMsgResponse('Pending sets list not found');
  };
  approveSet = async (req: any, res: Response) => {
    const data = {
      setId: req.body.setId,
      user: req.user,
      level: req.body.level,
    };
    await this.service.approveSet(data);
    return new SuccessMsgResponse('Set approved successfully').send(res);
  };
  rejectSet = async (req: any, res: Response) => {
    const data = {
      setId: req.body.setId,
      user: req.user,
    };
    const response = await this.service.rejectSet(data);
    if (response) {
      return new SuccessMsgResponse('Set rejected successfully').send(res);
    }
    return new FailureMsgResponse('Set rejected failed').send(res);
  };

  getSetByAdmin = async (req: any, res: Response) => {
    const data = {
      setId: req.body.setId,
      user: req.user,
    };
    const response = await this.service.getSetByAdmin({
      userId: data.user?.id,
      setId: data.setId,
    });
    if (response) {
      return new SuccessResponse('Set', response).send(res);
    }
    return new FailureMsgResponse('Set not found').send(res);
  };
}
