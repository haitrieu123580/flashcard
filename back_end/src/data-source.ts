import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"
import { Sets } from "./entity/Sets"
import { PasswordResetOtps } from "./entity/PasswordResetOtps"
import { Cards } from "./entity/Cards"
import * as dotenv from 'dotenv';
import { MainSeeder } from "./seeder/Seeder"
import { SeederOptions } from "typeorm-extension"
import { UserProgress } from "./entity/UserProgress"
import { Tests } from "./entity/Tests"
import { TestQuestion } from "./entity/TestQuestion"
import { TestResultDetails } from "./entity/TestResultDetails"
import { TestKits } from "./entity/TestKit"

dotenv.config();
const env = String(process.env.NODE_ENV);

let options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    entities: [User,
        Sets,
        PasswordResetOtps,
        Cards,
        UserProgress,
        Tests,
        TestQuestion,
        TestResultDetails,
        TestKits,
    ],
    // migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    synchronize: true,
    logging: false,
    subscribers: [],
    seeds: [MainSeeder],

}
if (env === 'production' || env === 'delopment') {
    options = {
        ...options,
        ssl: {
            rejectUnauthorized: false,
        }
    };

}

export const AppDataSource = new DataSource(options)
