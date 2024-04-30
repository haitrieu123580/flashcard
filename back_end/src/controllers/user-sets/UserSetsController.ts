import { Container } from "typedi";
import { IUserSetsService } from "@src/services/user-sets/IUserSetsService";
import { UserSetsService } from "@src/services/user-sets/UserSetsService";
export class UserSetsController {
    private userSetsService: IUserSetsService = Container.get(UserSetsService);
    getUserSetsList = async (req: any, res: any) => {
        await this.userSetsService.getUserSetsList(req, res);
    }
    getUserSetById = async (req: any, res: any) => {

    }
    addCardToUserSet = async (req: any, res: any) => {
        await this.userSetsService.addCardToUserSet(req, res);
    }
}