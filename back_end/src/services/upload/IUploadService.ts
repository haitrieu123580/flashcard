export interface IUploadService {
  uploadImage(file: Express.Multer.File | any): Promise<string>;
  uploadFile(file: Express.Multer.File | any): Promise<string>;
}
