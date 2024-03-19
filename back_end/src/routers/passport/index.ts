import { Request, Response, Router } from "express";
import AuthController from "../../controllers/auth/AuthController";
import isValidRequest from "../../middleware/ValidRequest";
import verifyToken from "../../middleware/VerifyToken";
import SignUpRequest from "../../dto/auth/SignUpRequest";
// import SignInRequest from "../../requests/auth/SignInRequest";
import SignInRequest from "../../dto/auth/SignInRequest";
import isValidKey from "../../middleware/VerifyApiKey";
import passport from "passport";
import dotenv from 'dotenv';
dotenv.config();
const router = Router();

router.get("/login/success", (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });

    }
});

router.get("/login/failed", (req: Request, res: Response) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req: Request, res: Response) => {
    // req.logout();
    res.redirect(String(process.env.CLIENT_URL));
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: String(process.env.CLIENT_URL),
        failureRedirect: "/login/failed",
    })
);

export default router;