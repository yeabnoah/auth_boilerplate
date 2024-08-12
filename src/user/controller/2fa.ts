import { Request, Response } from "express";
import nodemailer from "nodemailer";
import emailSchema from "../validation/emailSchema";

interface userBody {
  email: string;
}

const authDoubleEmail = (req: Request, res: Response) => {
  let errorMessage: string[] = [];
  const { email } = req.body as userBody;

  const checkEmailValidity = emailSchema.safeParse(email);

  if (!checkEmailValidity.success) {
    checkEmailValidity.error.issues.forEach((issue) => {
      errorMessage.push(issue.message);
    });

    res.status(400).json(errorMessage);
  }

  //   const checkIfTheUserIsLoggedIn = true;
  //   //   check userInput = user.userBody

  console.log(email);
};
export default authDoubleEmail;
