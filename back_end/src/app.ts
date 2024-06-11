import 'reflect-metadata';
// prettier-ignore
import moduleAlias from 'module-alias';
// prettier-ignore
moduleAlias.addAliases({
  "@src": `${__dirname}/`,
  "@routers": `${__dirname}/routers`,
  "@controllers": `${__dirname}/controllers`,
  "@s ervices": `${__dirname}/services`,
  "@repositories": `${__dirname}/repositories`,
  "@middleware": `${__dirname}/middleware`,
  "@entity": `${__dirname}/entity`,
  "@dto": `${__dirname}/dto`,
  "@helper": `${__dirname}/helper`,
});


import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import './services/oauth/Passport';

import fs from 'fs';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';
import adminAprroveUserSetRouter from '@routers/approve-sets/index';
import authRoutes from '@routers/auth/index';
import cardRouter from '@routers/card/index';
import passportRouter from '@routers/passport/index';
import testKitRouter from '@routers/test-kit/index';
import testRouter from '@routers/test-sets/index';
import userCardsRouter from '@routers/user-cards/index';
import userProgressRouter from '@routers/user-progress/index';
import userSetsRouter from '@routers/user-sets/index';
import userTestRouter from '@routers/user-tests/index';
import userRouter from '@routers/user/index';
import vocabRouter from '@routers/vocabulary-set/index';

import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from './core/ApiError';
import { AppDataSource } from './data-source';

dotenv.config();

const app: Application = express();

// Database connection
const connectToDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.log(error);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectToDatabase, 5000);
  }
};

connectToDatabase();

// Swagger
try {
  const file = fs.readFileSync(
    path.resolve(__dirname, '../docs/swagger.yaml'),
    'utf8',
  );
  const swaggerDocument = YAML.parse(file);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (error) { }

//cors
const corsOptions = {
  origin: String(process.env.CLIENT_URL),
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport
app.use(
  session({
    secret: String(process.env.SESSION_KEY),
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);
app.use('/passport', passportRouter);
app.use('/api/vocabulary-set', vocabRouter);
app.use('/api/card', cardRouter);
app.use('/api/user-sets', userSetsRouter);
app.use('/api/user-cards', userCardsRouter);
app.use('/api/tests', testRouter);
app.use('/api/user-tests', userTestRouter);
app.use('/api/user-progress', userProgressRouter);
app.use('/api/admin/approve-set', adminAprroveUserSetRouter);
app.use('/api/test-kit', testKitRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    console.log('error', err);
    // if (err.type === ErrorType.INTERNAL)
    // Logger.error(
    //     `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    // );
  } else {
    // Logger.error(
    //     `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    // );
    // Logger.error(err);
    // if (environment === 'development') {
    //     return res.status(500).send(err);
    // }
    ApiError.handle(new InternalError(), res);
    console.log('error', err);
  }
});

const port = process.env.PORT || 8000;
app.listen(Number(port), '0.0.0.0', () => {
  console.log(
    `server is running on http://localhost:${process.env.PORT || 8000}`,
  );
});
app.get('/', (req, res) => {
  res.send('Server is running');
});
