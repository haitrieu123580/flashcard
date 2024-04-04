import { Router } from "express";
import isValidKey from "@middleware/VerifyApiKey";
import { UploadFile } from "@middleware/UploadFile";
import { isAdmin } from "@middleware/isAdmin";
import CardController from "@controllers/card/CardController";
const router = Router();
const cardController = new CardController();

router.post("/", [isValidKey, isAdmin, UploadFile.single('image')], cardController.createCard);

router.put("/:id", [isValidKey, isAdmin, UploadFile.single('image')], cardController.updateCard);

router.delete("/:id", [isValidKey, isAdmin], cardController.deleteCard);

export default router;
