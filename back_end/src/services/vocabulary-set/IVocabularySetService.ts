import { Request, Response } from "express";
import { SuccessResponse, FailureMsgResponse, SuccessMsgResponse, FailureResponse } from '@src/core/ApiResponse';
import { GetAllPublicSetRequest } from "@src/dto/set/GetAllPublicSetRequest";
import { SetsListResponse } from "@src/dto/set/SetsListResponse";
export interface IVocabularySetService {

    get_all_public_sets: (query: GetAllPublicSetRequest) => Promise<SetsListResponse | null>;

    getSet: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    create_update_Set_and_Cards: (req: any, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    deleteSet: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;
}
