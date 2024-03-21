import { Router } from "express";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import VocabularySetController from "@controllers/vocabulary-set/VocabSetController";
import { UploadFile } from "@middleware/UploadFile";

const router = Router();
const vocabSetController = new VocabularySetController();

router.get("/public-sets", [isValidKey], vocabSetController.get_all_public_sets);

router.get("/my-sets", [verifyToken, isValidKey], vocabSetController.get_my_sets);

router.get("/:id", [isValidKey], vocabSetController.getSet);

router.post("/", [verifyToken, isValidKey, UploadFile.any()], vocabSetController.createSet);

router.put("/:id", [verifyToken, isValidKey, UploadFile.any()], vocabSetController.updateSet);

router.delete("/:id", [verifyToken, isValidKey], vocabSetController.deleteSet);


export default router;
