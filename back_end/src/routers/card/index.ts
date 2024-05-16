import { Router } from "express";
import isValidKey from "@middleware/VerifyApiKey";
import { UploadFile } from "@middleware/UploadFile";
import { isAdmin } from "@middleware/isAdmin";
import { AsyncHandler } from "@src/helper/AsyncHandler";
import verifyToken from "@middleware/VerifyToken";
import CardController from "@controllers/card/CardController";
const router = Router();
const cardController = new CardController();

router.post("/", [isValidKey, verifyToken, isAdmin, UploadFile.single('image')], AsyncHandler(cardController.createCard));

router.put("/:id", [isValidKey, verifyToken, isAdmin, UploadFile.single('image')], AsyncHandler(cardController.updateCard));

router.delete("/:id", [isValidKey, verifyToken, isAdmin], cardController.deleteCard);

export default router;
