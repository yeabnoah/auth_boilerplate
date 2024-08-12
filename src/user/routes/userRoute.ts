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

// this is working on the client side of the project

userRoute.post("/sendEmailCheck");

export default userRoute;
