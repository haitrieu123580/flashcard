import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Sets } from "./entity/Sets"
import { PasswordResetOtps } from "./entity/PasswordResetOtps"
import { Cards } from "./entity/Cards"
import { Library } from "./entity/Library"
import * as dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    synchronize: true,
    logging: false,
    entities: [User, Sets, PasswordResetOtps, Cards, Library],
    migrations: [],
    subscribers: [],
})
