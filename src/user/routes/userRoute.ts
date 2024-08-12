import { Request, Response, Router } from "express";
import createUser from "../controller/createUser";
import getAllUsers from "../controller/getAllUsers";
import signIn from "../controller/signIn";
import authCheckerMiddleware from "../middleware/authCheckMiddleware";
import getUserById from "../controller/getUserById";
import authDoubleEmail from "../controller/2fa";
import verifyEmail from "../controller/handleEmailVerification";

const userRoute = Router();

userRoute.get("/getUsers", authCheckerMiddleware, getAllUsers);
userRoute.get("/getUserById/:id", getUserById);
userRoute.get("/verifyEmail/", verifyEmail);

userRoute.post("/createUser", createUser);
userRoute.post("/signIn", signIn);
userRoute.post("/Email2fa", authCheckerMiddleware, authDoubleEmail);

// we need auth Email verification before the stuff works

export default userRoute;
