"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = require("aws-sdk");
const typedi_1 = require("typedi");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
let S3Service = class S3Service {
    constructor() {
        this.s3 = new aws_sdk_1.S3({
            region: process.env.AWS_S3_BUCKGET_REGION,
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        });
        this.uploadFile = async (file) => {
            const blob = fs_1.default.readFileSync(file.path);
            return this.s3.upload({
                Bucket: String(process.env.AWS_S3_BUCKGET_NAME),
                Body: blob,
                Key: `${file.filename}`,
                ContentType: file.mimetype,
            }).promise();
        };
        this.getFileStream = async (fileKey) => {
            return this.s3.getObject({
                Key: fileKey,
                Bucket: String(process.env.AWS_S3_BUCKGET_NAME),
            }).createReadStream();
        };
        //delete
    }
};
S3Service = __decorate([
    (0, typedi_1.Service)()
], S3Service);
exports.S3Service = S3Service;
