import fs from 'fs';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Service } from 'typedi';
import { firebaseConfig } from '@src/core/config';

import { IUploadService } from './IUploadService';

@Service()
export class FirebaseUpload implements IUploadService {
  private firebase = initializeApp(firebaseConfig);
  private storage = getStorage(this.firebase);
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const storageRef = ref(this.storage, `images/${file.originalname}`);
    const buffer = fs.readFileSync(file.path);
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
  uploadFile(file: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
