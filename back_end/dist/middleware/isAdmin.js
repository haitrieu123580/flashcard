"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ApiResponse_1 = require("../core/ApiResponse"); // Removed 'InternalErrorResponse' import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Added 'JwtPayload' import
const Constant_1 = require("@src/core/Constant");
dotenv_1.default.config();
const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
            if (err)
                return new ApiResponse_1.AccessTokenErrorResponse('Invalid Token').send(res);
            const user = decoded; // Added type assertion
            req.user = user;
            Number(user?.role) == Constant_1.Constants.USER_ROLE.ADMIN ? next() : new ApiResponse_1.AuthFailureResponse('Unauthorized').send(res);
        });
    }
    else {
        return new ApiResponse_1.AuthFailureResponse('Token not found').send(res);
    }
};
exports.isAdmin = isAdmin;
