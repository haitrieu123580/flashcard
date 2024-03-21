import dotenv from 'dotenv';
import { S3 } from "aws-sdk";
import { Service } from 'typedi';
import fs from 'fs'
dotenv.config();

@Service()
export class S3Service {
    private s3 = new S3({
        region: process.env.AWS_S3_BUCKGET_REGION,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    })

    public uploadFile = async (file: any): Promise<any> => {
        const blob = fs.readFileSync(file.path)
        return this.s3.upload({
            Bucket: String(process.env.AWS_S3_BUCKGET_NAME),
            Body: blob,
            Key: `${file.filename}`, //with .type aldready
            ContentType: file.mimetype,
        }).promise();
    }
    public getFileStream = async (fileKey: string) => {
        return this.s3.getObject({
            Key: fileKey,
            Bucket: String(process.env.AWS_S3_BUCKGET_NAME),

        }).createReadStream();
    }
    //delete

}
