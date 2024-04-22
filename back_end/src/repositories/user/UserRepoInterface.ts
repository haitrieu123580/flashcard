import { Request } from "express";
import { User } from "../../entity/User";
interface UserRepoInterface {

    getUserByUsername: (username: string) => Promise<User | null>;

    isExistedEmail: (email: string) => Promise<boolean>;

    //todo : delete this function
    isExistedToken: (token: string) => Promise<boolean>;

    createUser: (data: any) => Promise<User | null>;

    me: (id: string) => Promise<User | null>;

    updateUser: (userId: string, userData: any) => Promise<boolean | null>;

    //todo : delete this function
    storeToken: (id: string, token: string) => Promise<boolean>;

    updateUserPassword: (id: string, password: string) => Promise<boolean>;

    getUserByEmail: (email: string) => Promise<User | null>;

}
export default UserRepoInterface;