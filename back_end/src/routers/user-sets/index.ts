import { Router } from "express";
import isValidRequest from "@middleware/ValidRequest";
import verifyToken from "@middleware/VerifyToken";
import isValidKey from "@middleware/VerifyApiKey";
import { UserSetsController } from "@src/controllers/user-sets/UserSetsController";
const controller = new UserSetsController();
const router = Router();

router.get("/my-sets", [isValidKey, verifyToken], controller.getUserSetsList)

router.post("/add-card", [isValidKey, verifyToken], controller.addCardToUserSet)

export = router