import { Router } from "express";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import { UserSetsController } from "@src/controllers/user-sets/UserSetsController";
import { QuickCreateSetRequest } from "@src/dto/uset-sets/QuickCreateSetRequest";
import { UploadFile } from "@middleware/UploadFile";
import VocabularySetController from '@controllers/vocabulary-set/VocabSetController';
const controller = new UserSetsController();
const setController = new VocabularySetController();
const router = Router();

router.get("/my-sets", [isValidKey, verifyToken], controller.getUserSetsList)

router.get("/:setId", [isValidKey, verifyToken], controller.getUserSetById)

router.post("/add-card", [isValidKey, verifyToken], controller.addCardToUserSet)

router.post("/quick-create-set", [isValidKey, verifyToken, isValidRequest(QuickCreateSetRequest)], controller.quickCreateSet)

//todo: create set by user
router.post("/create-set", [isValidKey, verifyToken, UploadFile.any()], setController.createSet
)

//todo: add new card into set
router.post("/add-new-card", [isValidKey, verifyToken], controller.addCardToUserSet)

export = router