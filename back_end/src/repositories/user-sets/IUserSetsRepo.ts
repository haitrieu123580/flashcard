import { Request } from "express";
import { User } from "@entity/User";
export interface IUserSetsRepo {

    getUserSetsList(userId: string): Promise<any>

    addCardToSet(setId: string, cardId: string): Promise<any>

    // getUserSetById(req: Request): Promise<any>

    // createUserSet(req: Request): Promise<any>

    // updateUserSet(req: Request): Promise<any>

    // deleteUserSet(req: Request): Promise<any>

}
