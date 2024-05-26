import { Router } from "express";
import { Request, Response } from 'express';
import isValidKey from "@middleware/VerifyApiKey";
import verifyToken from "@middleware/VerifyToken";
import { isAdmin } from "@middleware/isAdmin";
import { UploadFile } from "@middleware/UploadFile";
import { AsyncHandler } from "@src/helper/AsyncHandler";
import { TestController } from "@controllers/test-sets/TestController";
const router = Router();
const controller = new TestController();

router.post("/auto-create-test-set", [isValidKey, verifyToken, isAdmin], AsyncHandler(controller.autoCreateTestSet));

//api for creating test
router.post('/', [isValidKey, verifyToken], AsyncHandler(controller.autoCreateTestSet));

export default router;