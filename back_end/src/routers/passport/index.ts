import { Request, Response, Router } from "express";
import AuthController from "../../controllers/auth/AuthController";
import passport from "passport";
import dotenv from 'dotenv';
import verifyToken from "@middleware/VerifyToken";
dotenv.config();
const router = Router();
const authController = new AuthController();

router.get("/login/success", (req: Request, res: Response) => {
    if (req.user) {
        // console.log("user Login", req.user)
        return authController.sign_in_success_oauth(req, res)
        // return res.status(200).json({ message: "user Login", user: req.user })
    } else {
        return res.status(400).json({ message: "Not Authorized" })
    }
});

router.get("/login/failed", (req: Request, res: Response) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
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