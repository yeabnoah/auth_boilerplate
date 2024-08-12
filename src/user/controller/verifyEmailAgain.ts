import { Request, Response } from "express";
import nodemailer from "nodemailer";
import User from "../model/user";
import emailSender from "../mail/email";
import smtpGenerateToken from "../token/emailGenerateToken";
// import { Request, Response } from "express";

const verifyUserEmailAgain = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }

  const userFound = await User.findById(user?.id);

  const emailVerificationToken = smtpGenerateToken({
    email: userFound?.email as string,
  });

  const verificationLink = `http://localhost:3000/verifyEmail/?token=${emailVerificationToken}`;

  const sendEmailResponse = await emailSender(
    userFound?.email as string,
    verificationLink
  );

  res.status(201).json({
    message: "verification email successfully sent",
    response: sendEmailResponse,
  });
};

export default verifyUserEmailAgain;
