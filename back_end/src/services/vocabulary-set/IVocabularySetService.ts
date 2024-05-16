import { Request, Response } from "express";
import { SuccessResponse, FailureMsgResponse, SuccessMsgResponse, FailureResponse } from '@src/core/ApiResponse';
import { GetAllPublicSetRequest } from "@src/dto/set/GetAllPublicSetRequest";
import { SetsListResponse } from "@src/dto/set/SetsListResponse";
import { UpdateSetRequest, createNewSetAndCardsRequest } from "@src/dto/set";
import { Sets } from "@src/entity/Sets";
export interface IVocabularySetService {

    get_all_public_sets: (query: GetAllPublicSetRequest) => Promise<SetsListResponse | null>;

    getSet: (setId: string) => Promise<Sets | null | undefined>;

    CreateSetAndCards: (data: createNewSetAndCardsRequest) => Promise<any>;

    deleteSet: (req: Request, res: Response) => Promise<SuccessResponse<any> | FailureMsgResponse | SuccessMsgResponse | FailureResponse<any>>;

    editSet: (data: UpdateSetRequest) => Promise<any>;
}
