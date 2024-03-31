"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
// var GoogleStrategy = require('passport-google-oauth20');
const dotenv_1 = __importDefault(require("dotenv"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const UseRepo_1 = __importDefault(require("../../repositories/user/UseRepo"));
dotenv_1.default.config();
const userRepo = new UseRepo_1.default();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    callbackURL: "/passport/google/callback",
}, async function (_accessToken, _refreshToken, profile, done) {
    try {
        const isExist = await userRepo.isExistedEmail(profile.emails[0].value);
        if (isExist) {
            return done(null, profile);
        }
        await userRepo.createUser({
            email: profile.emails[0].value,
            username: profile.displayName,
            avatar: profile.photos[0].value
        });
    }
    catch (error) {
        console.log(error);
    }
    done(null, profile); //done is callback function
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passport_1.default;
