import { Router } from "express";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import { AsyncHandler } from "@src/helper/AsyncHandler";
import { UploadFile } from "@middleware/UploadFile";
import { UserCardsController } from "@src/controllers/user-cards/UserCardsController";
const controller = new UserCardsController();
const router = Router();

router.post("/", [isValidKey, verifyToken, UploadFile.single('image')], AsyncHandler(controller.createCard));

router.put("/:id", [isValidKey, verifyToken, UploadFile.single('image')], AsyncHandler(controller.updateCard));

router.delete("/:id", [isValidKey, verifyToken], controller.deleteCard);

export = router;