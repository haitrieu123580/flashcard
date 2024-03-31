"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genRefreshToken = exports.genAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAccessToken = (data) => {
    const { id, username, role } = data;
    const access_token = jsonwebtoken_1.default.sign({
        id: id,
        username: username,
        role: role,
    }, String(process.env.JWT_SECRET), {
        expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
        algorithm: "HS256"
    });
    return access_token;
};
exports.genAccessToken = genAccessToken;
const genRefreshToken = (data) => {
    const { id, username, role } = data;
    const refresh_token = jsonwebtoken_1.default.sign({
        id: id,
        username: username,
        role: role,
    }, String(process.env.JWT_SECRET), {
        expiresIn: String(process.env.REFRESH_TOKEN_EXPIRE_TIME),
        algorithm: "HS256"
    });
    return refresh_token;
};
exports.genRefreshToken = genRefreshToken;
const verifyToken = (token) => {
    const data = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
    return data;
};
exports.verifyToken = verifyToken;
