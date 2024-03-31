"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ApiResponse_1 = require("../core/ApiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, user) => {
            if (err)
                return new ApiResponse_1.AccessTokenErrorResponse('Invalid Token').send(res);
            req.user = user;
            next();
        });
    }
    else {
        return new ApiResponse_1.AuthFailureResponse('Token not found').send(res);
    }
};
exports.default = verifyToken;
