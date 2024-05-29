import 'reflect-metadata';
// import 'module-alias/register';
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@src": `${__dirname}/`,
    "@routers": `${__dirname}/routers`,
    "@controllers": `${__dirname}/controllers`,
    "@services": `${__dirname}/services`,
    "@repositories": `${__dirname}/repositories`,
    "@middleware": `${__dirname}/middleware`,
    "@entity": `${__dirname}/entity`,
    "@dto": `${__dirname}/dto`,
    "@helper": `${__dirname}/helper`,
});
import express, { Request, Response, NextFunction, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './services/oauth/Passport';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import { AppDataSource } from "./data-source"
import authRoutes from '@routers/auth/index';
import userRouter from '@routers/user/index';
import passportRouter from '@routers/passport/index';
import vocabRouter from '@routers/vocabulary-set/index';
import cardRouter from '@routers/card/index';
import questionRouter from '@routers/questions/index';
import multipleChoice from '@routers/multiple-choice-test/index'
import userSetsRouter from '@routers/user-sets/index';
import userCardsRouter from '@routers/user-cards/index';
import testRouter from "@routers/test-sets/index";
import userTestRouter from "@routers/user-tests/index";
import userProgressRouter from "@routers/user-progress/index";
import adminAprroveUserSetRouter from "@routers/approve-sets/index";
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType,
} from './core/ApiError';
dotenv.config();

const app: Application = express();

// Database connection
const connectToDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connection established successfully.");
    } catch (error) {
        console.log(error);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectToDatabase, 5000);
    }
};

connectToDatabase();


// Swagger
try {
    const file = fs.readFileSync(path.resolve(__dirname, '../docs/swagger.yaml'), 'utf8')
    const swaggerDocument = YAML.parse(file);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (error) {

}

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
app.use(session({
    secret: String(process.env.SESSION_KEY),
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)
app.use('/passport', passportRouter)
app.use('/api/vocabulary-set', vocabRouter)
app.use('/api/card', cardRouter)
app.use('/api/question', questionRouter)
app.use('/api/multiple-choice-test', multipleChoice)
app.use('/api/user-sets', userSetsRouter)
app.use('/api/user-cards', userCardsRouter)
app.use('/api/tests', testRouter)
app.use('/api/user-tests', userTestRouter)
app.use('/api/user-progress', userProgressRouter)
app.use('/api/admin/approve-set', adminAprroveUserSetRouter)
// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        console.log("error", err)
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
        console.log("error", err)
    }
});

const port = process.env.PORT || 8000;
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 8000}`)
})
app.get('/', (req, res) => {
    res.send('Server is running');
});
