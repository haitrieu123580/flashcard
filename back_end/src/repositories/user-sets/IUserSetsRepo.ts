import { Request } from "express";
import { User } from "@entity/User";
import { Sets } from "@entity/Sets";
import { Cards } from "@entity/Cards";
export interface IUserSetsRepo {

    getUserSetsList(userId: string): Promise<[Sets[], number]>

    addCardToSet(set: Sets, card: Cards): Promise<any>

    getUserProgress(userId: string, setId: string): Promise<any>

}
