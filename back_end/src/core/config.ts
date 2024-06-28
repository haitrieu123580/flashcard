import dotenv from 'dotenv';
dotenv.config();

export const firebaseConfig = {
    apiKey: String(process.env.FIREBASE_KEY),
    authDomain: String(process.env.AUTH_DOMAIN),
    projectId: String(process.env.PROJECT_ID),
    storageBucket: String(process.env.STORAGE_BUCKET),
    messagingSenderId: String(process.env.MESSAGING_SENDER_ID),
    appId: String(process.env.APP_ID),
    measurementId: String(process.env.MEASUREMENT_ID),
};

export const s3Config = {
    region: String(process.env.AWS_S3_BUCKGET_REGION),
    accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY),
    bucketName: String(process.env.AWS_S3_BUCKGET_NAME),
}

export const tokenConfig = {
    algorithm: 'HS256',
    expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
}
