import { Request, Response, Router } from "express";
import createUser from "../controller/createUser";
import getAllUsers from "../controller/getAllUsers";
import signIn from "../controller/signIn";
import authCheckerMiddleware from "../middleware/authCheckMiddleware";
import getUserById from "../controller/getUserById";
import authDoubleEmail from "../controller/2fa";
import verifyEmail from "../controller/handleEmailVerification";
import verifyEmailAgain from "../controller/verifyEmailAgain";
import nodemailer from "nodemailer";
import checkEmailVerificationMiddleware from "../middleware/checkEmailMiddleware";
import resetPassword from "../controller/resetPassword";
import resetPasswordHandler from "../controller/resetPasswordHandler";
import resetPasswordMiddleware from "../middleware/resetPassMiddleware";
import githubOauth from "../controller/auth/github/githubOauth";
import githubCallback from "../controller/auth/github/githubCallback";
import googleOauth from "../controller/auth/google/googleOath";

const userRoute = Router();

userRoute.get(
  "/getUsers",
  authCheckerMiddleware,
  checkEmailVerificationMiddleware,
  getAllUsers
);
userRoute.get(
  "/getUserById/:id",
  authCheckerMiddleware,
  checkEmailVerificationMiddleware,
  getUserById
);

userRoute.get("/verifyEmail/", authCheckerMiddleware, verifyEmail);

userRoute.post("/createUser", createUser);
userRoute.post("/signIn", signIn);
userRoute.post(
  "/Email2fa",
  authCheckerMiddleware,
  checkEmailVerificationMiddleware,
  authDoubleEmail
);
userRoute.post("/verifyEmailAgain", authCheckerMiddleware, verifyEmailAgain);

userRoute.post(
  "/resetPassword",
  authCheckerMiddleware,
  checkEmailVerificationMiddleware,
  resetPassword
);

userRoute.post(
  "/resetPasswordHandler",
  authCheckerMiddleware,
  checkEmailVerificationMiddleware,
  resetPasswordMiddleware,
  resetPasswordHandler
);

//oauth with oauth like github and Google

userRoute.get("/auth/github", githubOauth);
userRoute.get("/auth/github/callback", githubCallback);

userRoute.get("auth/google", googleOauth);

export default userRoute;
