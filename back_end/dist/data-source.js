"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Sets_1 = require("./entity/Sets");
const PasswordResetOtps_1 = require("./entity/PasswordResetOtps");
const Cards_1 = require("./entity/Cards");
const Library_1 = require("./entity/Library");
const dotenv = __importStar(require("dotenv"));
const Seeder_1 = require("./seeder/Seeder");
dotenv.config();
const options = {
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    entities: [User_1.User, Sets_1.Sets, PasswordResetOtps_1.PasswordResetOtps, Cards_1.Cards, Library_1.Library],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    synchronize: true,
    logging: false,
    subscribers: [],
    seeds: [Seeder_1.MainSeeder],
};
exports.AppDataSource = new typeorm_1.DataSource(options);
