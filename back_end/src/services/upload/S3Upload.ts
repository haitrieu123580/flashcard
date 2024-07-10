import fs from 'fs';
import { S3 } from 'aws-sdk';
import { Service } from 'typedi';
import { s3Config } from '@src/core/config';

import { IUploadService } from './IUploadService';

export class S3Upload implements IUploadService {
  private s3 = new S3(s3Config);

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const blob = fs.readFileSync(file.path);
    const result = await this.s3
      .upload({
        Bucket: String(s3Config.bucketName),
        Body: blob,
        Key: `${file.filename}`, //with .type aldready
        ContentType: file.mimetype,
      })
      .promise();
    return result.Location;
    1;
  }
  uploadFile(file: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
