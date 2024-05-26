import { Router } from "express";
import { Request, Response } from 'express';
import isValidKey from "@middleware/VerifyApiKey";
import verifyToken from "@middleware/VerifyToken";
import { isAdmin } from "@middleware/isAdmin";
import { UploadFile } from "@middleware/UploadFile";
import { AsyncHandler } from "@src/helper/AsyncHandler";
import { UserProgressController } from "@src/controllers/user-progress/UserProgressController";
const router = Router();
const controller = new UserProgressController();

//api update flashcard status of user progress
router.post('/', [isValidKey, verifyToken], AsyncHandler(controller.updateUserProgress));

//api for get user progress all sets
router.get('/progress', [isValidKey, verifyToken], AsyncHandler(controller.getUserProgress));

//api for get user progress by setId
router.get('/progress/:setId', [isValidKey, verifyToken], AsyncHandler(controller.getUserProgressBySetId));

export = router