import { EditUserProfileRequest } from "@src/dto/user";
import { Request, Response } from "express";

export interface UserServiceInterface {

    editProfile: (data: EditUserProfileRequest) => Promise<any>;

    changePassword: (userId: any, data: any) => Promise<any>;
}
