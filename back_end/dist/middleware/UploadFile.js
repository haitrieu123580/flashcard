"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
// !todo: change the destination to multer-s3
exports.UploadFile = (0, multer_1.default)({
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now() + "." + file.mimetype.split('/')[1]);
        }
    }),
});
