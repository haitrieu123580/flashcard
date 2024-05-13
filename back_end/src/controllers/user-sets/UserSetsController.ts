import { Container } from "typedi";
import { IUserSetsService } from "@src/services/user-sets/IUserSetsService";
import { UserSetsService } from "@src/services/user-sets/UserSetsService";
import { Request, Response } from "express";
export class UserSetsController {
    private userSetsService: IUserSetsService = Container.get(UserSetsService);
    getUserSetsList = async (req: any, res: any) => {
        await this.userSetsService.getUserSetsList(req, res);
    }
    getUserSetById = async (req: any, res: any) => {
        await this.userSetsService.getUserSetById(req, res);
    }
    addCardToUserSet = async (req: any, res: any) => {
        await this.userSetsService.addCardToUserSet(req, res);
    }
    createSetByUser = async (req: any, res: any) => {
        // await this.userSetsService.createSetByUser(req, res);
    }

    quickCreateSet = async (req: any, res: any) => {
        await this.userSetsService.quickCreateSet(req, res);
    }

    updateSet = async (req: Request, res: Response) => {
        return this.userSetsService.updateUserSet(req, res);
    }

    removeCardFromMySet = async (req: Request, res: Response) => {
    }

    deleteMySet = async (req: Request, res: Response) => {
        await this.userSetsService.deleteUserSet(req, res);
    }
}