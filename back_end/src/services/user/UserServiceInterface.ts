import { Request } from "express";

interface UserServiceInterface {
    upload_avatar: (user: any, imagePath: string) => Promise<any>;

    editProfile: (userId: string, data: any) => Promise<any>;

    changePassword: (userId: string, data: any) => Promise<any>;

    getMultipleChoiceResult: (userId: string) => Promise<any>;

    getMultipleChoiceTestDetails: (userId: string, recordId: string) => Promise<any>;
}
export = UserServiceInterface;