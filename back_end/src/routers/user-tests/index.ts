import { Router } from "express";
import { Request, Response } from 'express';
import isValidKey from "@middleware/VerifyApiKey";
import verifyToken from "@middleware/VerifyToken";
import { isAdmin } from "@middleware/isAdmin";
import { UploadFile } from "@middleware/UploadFile";
import { AsyncHandler } from "@src/helper/AsyncHandler";
import { UserTestController } from "@src/controllers/user-test/UserTestController";
const router = Router();
const controller = new UserTestController();

//api for save user result
router.post('/test-results', [], AsyncHandler(controller.saveTestResult));

//api for get user progress
router.get('/users/:userId/progress', async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        // const progressList = await getUserProgress(Number(userId));
        // res.status(200).json(progressList);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});
