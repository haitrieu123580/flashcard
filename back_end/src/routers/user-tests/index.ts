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
router.post('/test-results', [isValidKey, verifyToken], AsyncHandler(controller.saveTestResult));

//api for get user progress
// router.get('/progress', [isValidKey, verifyToken], AsyncHandler(controller.getUserProgress));
export = router