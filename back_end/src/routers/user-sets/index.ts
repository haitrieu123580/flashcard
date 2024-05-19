import { Router } from "express";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import { UserSetsController } from "@src/controllers/user-sets/UserSetsController";
import { QuickCreateSetRequest } from "@src/dto/uset-sets/QuickCreateSetRequest";
import { UploadFile } from "@middleware/UploadFile";
import VocabularySetController from '@controllers/vocabulary-set/VocabSetController';
import { AsyncHandler } from "@src/helper/AsyncHandler";
const controller = new UserSetsController();
const setController = new VocabularySetController();
const router = Router();

router.get("/my-sets", [isValidKey, verifyToken], AsyncHandler(controller.getUserSetsList))

router.get("/:id", [isValidKey, verifyToken], AsyncHandler(controller.getUserSetById))

router.post("/quick-create-set", [isValidKey, verifyToken, isValidRequest(QuickCreateSetRequest)], AsyncHandler(controller.quickCreateSet))

router.post("/create-set", [isValidKey, verifyToken, UploadFile.any()], AsyncHandler(setController.createSet))

router.post("/add-card", [isValidKey, verifyToken, UploadFile.any()], AsyncHandler(controller.addCardToUserSet))

router.put("/:id", [isValidKey, verifyToken, UploadFile.any()], AsyncHandler(controller.updateSet))

router.delete("/:id", [isValidKey, verifyToken], controller.deleteMySet)


export = router