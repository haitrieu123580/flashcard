import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"
import { Sets } from "./entity/Sets"
import { PasswordResetOtps } from "./entity/PasswordResetOtps"
import { Cards } from "./entity/Cards"
import { Library } from "./entity/Library"
import * as dotenv from 'dotenv';
import { MainSeeder } from "./seeder/Seeder"
import { SeederOptions } from "typeorm-extension"
dotenv.config();
const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    entities: [User, Sets, PasswordResetOtps, Cards, Library],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    synchronize: true,
    logging: false,
    subscribers: [],
    seeds: [MainSeeder],
}

export const AppDataSource = new DataSource(options)