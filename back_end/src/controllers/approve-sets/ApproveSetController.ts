import { Request, Response } from 'express';
import Container from 'typedi';
import { IApproveSetService } from '@services/approve-sets/IApproveSetService';
import { ApproveSetService } from '@src/services/approve-sets/ApproveSetService';
import {
    SuccessResponse,
    SuccessMsgResponse,
    FailureResponse,
    FailureMsgResponse,
    InternalErrorResponse
} from "@src/core/ApiResponse";
import { AuthFailureError } from '@src/core/ApiError';
import { username } from '@src/dto/auth/SignInRequest';
export class ApproveSetController {
    private service: IApproveSetService;
    constructor() {
        this.service = Container.get(ApproveSetService);
    }
    async getPendingSets(req: Request, res: Response) {
    }
    async approveSet(req: any, res: Response) {
        const data = {
            setId: req.body.setId,
            user: req.user
        }
        const response = await this.service.approveSet(data);
        if (response) {
            return new SuccessMsgResponse('Set approved successfully').send(res);
        }
        return new FailureMsgResponse('Set not approved').send(res);
    }
    async rejectSet(req: any, res: Response) {
        const data = {
            setId: req.body.setId,
            user: req.user
        }
        const response = await this.service.rejectSet(data);
        if (response) {
            return new SuccessMsgResponse('Set rejected successfully').send(res);
        }
        return new FailureMsgResponse('Set rejected failed').send(res);
    }
    async getApprovedSets(req: Request, res: Response) {
    }
    async getRejectedSets(req: Request, res: Response) {
    }

}