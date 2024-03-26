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

router.get("/my-sets", [verifyToken, isValidKey], vocabSetController.get_my_sets);

router.get("/:id", [isValidKey, isAdmin], vocabSetController.getSet);

router.post("/", [isValidKey, isAdmin, UploadFile.any()], vocabSetController.createSet);

router.put("/:id", [isValidKey, isAdmin, UploadFile.any()], vocabSetController.updateSet);

router.delete("/:id", [isValidKey, isAdmin], vocabSetController.deleteSet);


export default router;
