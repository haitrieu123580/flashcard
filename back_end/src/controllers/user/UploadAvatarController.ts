import { Request, Response } from "express";
import { Container, Inject } from 'typedi';
import UserService from "../../services/user/UserService";
import UserServiceInterface from "../../services/user/UserServiceInterface";
import { S3Service } from "@services/s3/S3Service";
import multer from "multer";
import getUser from "../../helper/GetUserRequest";
const upload = multer();
class UploadAvatarController {

    private userService: UserServiceInterface;
    private s3Service: S3Service;

    constructor() {
        this.userService = Container.get(UserService);
        this.s3Service = Container.get(S3Service);
    }

    uploadAvatar = async (req: Request, res: Response) => {
        try {
            const file = req.file;
            const result = await this.s3Service.uploadFile(file);
            // **? should get user by doing this way
            const user = await getUser(req)
            await this.userService.upload_avatar(user, String(result.Key))
            return res.status(200).json({ imagePath: result.Key })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "error" })

        }
    }

    getAvatar = async (req: Request, res: Response) => {
        try {
            const key = req.params.key; // key of image in s3
            const readStream = await this.s3Service.getFileStream(key);
            readStream.pipe(res)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}
export default UploadAvatarController;