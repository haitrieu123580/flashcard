import dotenv from 'dotenv';
import { Service } from 'typedi';
import { firebaseConfig } from '../../core/config';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import fs from 'fs';

dotenv.config();

@Service()
export class FirebaseUploadService {
    private firebase = initializeApp(firebaseConfig);
    private storage = getStorage(this.firebase);
    public uploadFile = async (file: any): Promise<any> => {
        const storageRef = ref(this.storage, `images/${file.originalname}`);
        const buffer = fs.readFileSync(file.path);
        const metadata = {
            contentType: file.mimetype,
        }
        const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return { ref: snapshot.ref, downloadURL };
    }
}