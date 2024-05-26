import { Router } from "express";
import { Request, Response } from 'express';
import isValidKey from "@middleware/VerifyApiKey";
import verifyToken from "@middleware/VerifyToken";
import { isAdmin } from "@middleware/isAdmin";
import { UploadFile } from "@middleware/UploadFile";
import { AsyncHandler } from "@src/helper/AsyncHandler";
import { UserTestController } from "@src/controllers/user-test/UserTestController";
import { TestController } from "@src/controllers/test-sets/TestController";
const router = Router();
const controller = new UserTestController();
const testController = new TestController();

//api for save user result
router.post('/test-results', [isValidKey, verifyToken], AsyncHandler(controller.saveTestResult));

//api for get get user recent test result
router.get('/:setId', [isValidKey, verifyToken], AsyncHandler(controller.getRecentTestResult));

router.post('/create-test', [isValidKey, verifyToken], AsyncHandler(testController.autoCreateTestSet));

router.get('/test-result/:testId', [isValidKey, verifyToken], AsyncHandler(controller.getUserTestResult));
export = router