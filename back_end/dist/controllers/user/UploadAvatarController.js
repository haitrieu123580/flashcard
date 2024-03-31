"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const UserService_1 = __importDefault(require("../../services/user/UserService"));
const S3Service_1 = require("@services/s3/S3Service");
const multer_1 = __importDefault(require("multer"));
const GetUserRequest_1 = __importDefault(require("../../helper/GetUserRequest"));
const upload = (0, multer_1.default)();
class UploadAvatarController {
    constructor() {
        this.uploadAvatar = async (req, res) => {
            try {
                const file = req.file;
                const result = await this.s3Service.uploadFile(file);
                // **? should get user by doing this way
                const user = await (0, GetUserRequest_1.default)(req);
                await this.userService.upload_avatar(user, String(result.Key));
                return res.status(200).json({ imagePath: result.Key });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "error" });
            }
        };
        this.getAvatar = async (req, res) => {
            try {
                const key = req.params.key; // key of image in s3
                const readStream = await this.s3Service.getFileStream(key);
                readStream.pipe(res);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        };
        this.userService = typedi_1.Container.get(UserService_1.default);
        this.s3Service = typedi_1.Container.get(S3Service_1.S3Service);
    }
}
exports.default = UploadAvatarController;
