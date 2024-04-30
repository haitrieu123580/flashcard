import { Router } from "express";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import VocabularySetController from "@controllers/vocabulary-set/VocabSetController";
import { UploadFile } from "@middleware/UploadFile";
import { isAdmin } from "@middleware/isAdmin";

const router = Router();
const vocabSetController = new VocabularySetController();

router.get("/public-sets", [isValidKey], vocabSetController.get_all_public_sets);

router.get("/:id", [isValidKey], vocabSetController.getSet);

router.post("/", [isValidKey, verifyToken, isAdmin, UploadFile.any()], vocabSetController.createSet);

router.put("/:id", [isValidKey, verifyToken, isAdmin, UploadFile.any()], vocabSetController.updateSet);

router.delete("/:id", [isValidKey, verifyToken, isAdmin], vocabSetController.deleteSet);

// router.post("/add-card", [isValidKey, verifyToken], vocabSetController.addCardToSet);

export default router;