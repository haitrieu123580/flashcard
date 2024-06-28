import { IUploadService } from "./IUploadService";
import { firebaseConfig } from "@src/core/config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import { Service } from 'typedi';

@Service()
export class FirebaseUpload implements IUploadService{
    private firebase = initializeApp(firebaseConfig);
    private storage = getStorage(this.firebase);
    async uploadImage(file: Express.Multer.File): Promise<string> {
         const storageRef = ref(this.storage, `images/${file.originalname}`);
        const buffer = fs.readFileSync(file.path);
        const metadata = {
            contentType: file.mimetype,
        }
        const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }
    uploadFile(file: Express.Multer.File): Promise<string> {
        throw new Error("Method not implemented.");
    }
}