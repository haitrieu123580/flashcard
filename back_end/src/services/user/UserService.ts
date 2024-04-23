import { Request } from "express";
import { Service, Container } from "typedi";
import UserServiceInterface from "./UserServiceInterface";
import UserRepoInterface from "../../repositories/user/UserRepoInterface";
import UserRepo from "../../repositories/user/UseRepo";
@Service()
class UserService implements UserServiceInterface {
    private userRepo: UserRepoInterface;
    constructor() {
        this.userRepo = Container.get(UserRepo);
    }
    public upload_avatar = async (user: any, imagePath: string): Promise<any> => {
        try {
            const result = this.userRepo.updateUser(String(user.id), imagePath)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    editProfile = async (userId: string, data: any): Promise<any> => {
        throw new Error("Method not implemented.");
    }

    changePassword = async (userId: string, data: any): Promise<any> => {
        throw new Error("Method not implemented.");
    }

    getMultipleChoiceResult = async (userId: string): Promise<any> => {
        throw new Error("Method not implemented.");
    }

    getMultipleChoiceTestDetails = async (userId: string, recordId: string): Promise<any> => {
        throw new Error("Method not implemented.");
    }
}
export default UserService;