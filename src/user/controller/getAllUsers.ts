import { Request, Response } from "express";
import User from "../model/user";
import UserInterface from "../interface/user";

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = (await User.find()) as UserInterface[];

  res.json(allUsers);
};

export default getAllUsers;
