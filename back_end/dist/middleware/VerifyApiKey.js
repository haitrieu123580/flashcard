"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ApiResponse_1 = require("../core/ApiResponse");
dotenv_1.default.config();
const isValidKey = (req, res, next) => {
    if (req.headers['x-api-key'] !== process.env.API_KEY)
        return new ApiResponse_1.AuthFailureResponse('Invalid API Key').send(res);
    next();
};
exports.default = isValidKey;
