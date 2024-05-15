import { Container } from "typedi";
import { UserServiceInterface } from "@src/services/user/UserServiceInterface";
import { UserService } from "@src/services/user/UserService";
export class UserProfileController {
    private userService: UserServiceInterface;

    constructor() {
        this.userService = Container.get(UserService);
    }

    editProfile = async (req: any, res: any) => {
        await this.userService.editProfile(req, res)
    }

    changePassword = async (req: any, res: any) => {
        await this.userService.changePassword(req, res)
    }
}