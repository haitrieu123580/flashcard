import { Request, Response } from "express";
import { SuccessResponse, FailureMsgResponse, SuccessMsgResponse, FailureResponse } from '@src/core/ApiResponse';

export interface IVocabularySetService {

    get_all_public_sets: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    get_my_sets: (req: any, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    getSet: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    create_update_Set_and_Cards: (req: any, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    deleteSet: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;
}
