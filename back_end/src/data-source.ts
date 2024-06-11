import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { Cards } from './entity/Cards';
import { PasswordResetOtps } from './entity/PasswordResetOtps';
import { Sets } from './entity/Sets';
import { TestKits } from './entity/TestKit';
import { TestQuestion } from './entity/TestQuestion';
import { TestResultDetails } from './entity/TestResultDetails';
import { Tests } from './entity/Tests';
import { User } from './entity/User';
import { UserProgress } from './entity/UserProgress';
import { MainSeeder } from './seeder/Seeder';

dotenv.config();
const env = String(process.env.NODE_ENV);

let options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  entities: [
    User,
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
};
if (env === 'production' || env === 'delopment') {
  options = {
    ...options,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export const AppDataSource = new DataSource(options);
