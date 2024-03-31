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
import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieSession from 'cookie-session';
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
// Passport
app.use(session({
    secret: String(process.env.SESSION_KEY),
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)
app.use('/passport', passportRouter)
app.use('/api/vocabulary-set', vocabRouter)

const port = process.env.PORT || 8000;
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 8000}`)
})
app.get('/', (req, res) => {
    res.send('Server is running');
});
