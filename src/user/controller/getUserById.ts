import { Request, Response } from "express";
import User from "../model/user";

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  console.log(user);
};

export default getUserById;
