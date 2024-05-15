import { Request } from "express";
import { User } from "@entity/User";
import { Sets } from "@entity/Sets";
import { Cards } from "@entity/Cards";
export interface IUserSetsRepo {

    getUserSetsList(userId: string): Promise<any>

    addCardToSet(set: Sets, card: Cards): Promise<any>

    // getUserSetById(req: Request): Promise<any>

    // createUserSet(req: Request): Promise<any>

    // updateUserSet(req: Request): Promise<any>

    // deleteUserSet(req: Request): Promise<any>

}
