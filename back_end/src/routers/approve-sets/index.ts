import { Router } from 'express';
import { AsyncHandler } from "@src/helper/AsyncHandler";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import { isAdmin } from '@src/middleware/isAdmin';
import { ApproveSetController } from '@src/controllers/approve-sets/ApproveSetController';
const controller = new ApproveSetController();
const router = Router();

router.get('/pending', [verifyToken, isValidKey, isAdmin], AsyncHandler(controller.getPendingSets));
router.post('/approve', [verifyToken, isValidKey, isAdmin], AsyncHandler(controller.approveSet));
router.post('/reject', [verifyToken, isValidKey, isAdmin], AsyncHandler(controller.rejectSet));