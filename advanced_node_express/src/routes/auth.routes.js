import { Router } from "express";
import passport from "passport";
import {
  signup,
  login,
  logout,
  googleCallbackSuccess,
} from "../controllers/auth.controller.js";
import { loginLimiter } from "../middleware/rateLimiters.js";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", loginLimiter, login);
authRouter.post("/logout", logout);

// Google OAuth
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/fail",
  }),
  googleCallbackSuccess,
);

authRouter.get("/google/fail", (req, res) => {
  res
    .status(401)
    .json({ status: "fail", message: "Google authentication failed" });
});
