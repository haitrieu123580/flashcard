import { UpdateSetRequest } from "@src/dto/set";
import { Request, Response } from "express";
import { SetsListResponse } from "@src/dto/set/SetsListResponse";
import { Sets } from "@src/entity/Sets";
import { CopyCardToSetRequest } from "@src/dto/uset-sets";
export interface IUserSetsService {

    getUserSetsList: (userId: string) => Promise<SetsListResponse | null>

    getUserSetById: (userId: string, setId: string) => Promise<Sets>

    addCardToUserSet: (data: CopyCardToSetRequest) => Promise<any>

    // quickCreateSet: (req: Request, res: Response) => Promise<any>

    updateUserSet: (data: UpdateSetRequest) => Promise<any>

    deleteUserSet: (req: Request, res: Response) => Promise<any>

}