import { Express, Request, request, response, Response, Router } from "express";
import createUser from "../controller/createUser";
import getAllUsers from "../controller/getAllUsers";
import signIn from "../controller/signIn";
import authChecker from "../middleware/authCheckMiddleware";
import authCheckerMiddleware from "../middleware/authCheckMiddleware";

const userRoute = Router();

userRoute.get("/getUsers", authCheckerMiddleware, getAllUsers);

userRoute.post("/createUser", createUser);
userRoute.post("/signIn", signIn);

export default userRoute;
