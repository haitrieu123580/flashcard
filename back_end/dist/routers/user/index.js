"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const VerifyToken_1 = __importDefault(require("../../middleware/VerifyToken"));
const UploadAvatarController_1 = __importDefault(require("../../controllers/user/UploadAvatarController"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const uploadAvatarController = new UploadAvatarController_1.default();
const router = (0, express_1.Router)();
router.post('/upload-avatar', [VerifyToken_1.default, upload.single("avatar")], uploadAvatarController.uploadAvatar);
router.get('/images/:key', uploadAvatarController.getAvatar);
module.exports = router;
