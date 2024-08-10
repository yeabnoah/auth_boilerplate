import { Express, Request, request, response, Response, Router } from "express";
import createUser from "../controller/createUser";
import getAllUsers from "../controller/getAllUsers";

const userRoute = Router();

userRoute.get("/getUsers", getAllUsers);

userRoute.post("/createUser", createUser);

export default userRoute;
